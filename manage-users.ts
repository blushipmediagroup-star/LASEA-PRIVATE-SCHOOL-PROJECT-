// Supabase Edge Function: manage-users
// Lets a signed-in ADMIN create and delete student/teacher accounts.
// (The browser can't do this itself because it needs the secret service key, which only lives on the server.)
//
// Deploy: Supabase dashboard -> Edge Functions -> Deploy a new function -> "Via Editor"
//         name it exactly:  manage-users   -> paste this whole file -> Deploy.
import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const reply = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 1. Who is asking? Must be a signed-in admin.
    const caller = createClient(url, anon, { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } });
    const { data: { user } } = await caller.auth.getUser();
    if (!user) return reply({ error: "You are not signed in." }, 401);
    const admin = createClient(url, service);
    const { data: me } = await admin.from("profiles").select("role").eq("id", user.id).maybeSingle();
    if (String(me?.role ?? "").toLowerCase() !== "admin") return reply({ error: "Only an administrator can do this." }, 403);

    const body = await req.json();

    // 2. Create an account
    if (body.action === "create") {
      const code = String(body.user_code ?? "").trim().toUpperCase();
      const role = String(body.role ?? "");
      const email = String(body.email ?? "").trim().toLowerCase();
      const password = String(body.password ?? "");
      if (!code || !email) return reply({ error: "ID and email are required." }, 400);
      if (!["student", "teacher"].includes(role)) return reply({ error: "Role must be student or teacher." }, 400);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply({ error: "Enter a valid email address." }, 400);
      if (password.length < 6) return reply({ error: "Password must be at least 6 characters." }, 400);

      const { data: taken } = await admin.from("profiles").select("id").eq("user_code", code).maybeSingle();
      if (taken) return reply({ error: `The ID ${code} is already in use.` }, 409);

      const { data: created, error: createError } = await admin.auth.admin.createUser({
        email, password, email_confirm: true, user_metadata: { user_code: code, role },
      });
      if (createError || !created.user) return reply({ error: createError?.message ?? "Could not create the account." }, 400);

      const { error: profileError } = await admin.from("profiles").upsert({
        id: created.user.id, role, user_code: code, full_name: body.full_name ?? "",
        status: body.status ?? "active", date_of_birth: body.date_of_birth ?? null,
        class_id: body.class_id ?? null, session: body.session ?? null,
      });
      if (profileError) {
        await admin.auth.admin.deleteUser(created.user.id);
        return reply({ error: profileError.message }, 400);
      }
      return reply({ id: created.user.id });
    }

    // 3. Delete an account
    if (body.action === "delete") {
      const id = String(body.user_id ?? "");
      if (!id) return reply({ error: "user_id is required." }, 400);
      if (id === user.id) return reply({ error: "You cannot delete your own account." }, 400);
      const { data: target } = await admin.from("profiles").select("role").eq("id", id).maybeSingle();
      if (String(target?.role ?? "").toLowerCase() === "admin") return reply({ error: "Admin accounts cannot be deleted here." }, 403);
      await admin.from("teacher_classes").delete().eq("teacher_id", id);
      await admin.from("teacher_subjects").delete().eq("teacher_id", id);
      const { error: profileError } = await admin.from("profiles").delete().eq("id", id);
      if (profileError) return reply({ error: profileError.message }, 400);
      const { error: authError } = await admin.auth.admin.deleteUser(id);
      if (authError) return reply({ error: authError.message }, 400);
      return reply({ ok: true });
    }

    // 4. Set a new password for someone (not used by the portal screens yet)
    if (body.action === "set_password") {
      const password = String(body.password ?? "");
      if (password.length < 6) return reply({ error: "Password must be at least 6 characters." }, 400);
      const { error } = await admin.auth.admin.updateUserById(String(body.user_id), { password });
      if (error) return reply({ error: error.message }, 400);
      return reply({ ok: true });
    }

    return reply({ error: "Unknown action." }, 400);
  } catch (error) {
    return reply({ error: error instanceof Error ? error.message : "Something went wrong." }, 500);
  }
});
