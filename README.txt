SCHOOL PORTAL - SUPABASE SETUP
==============================

Browser configuration
---------------------
js/supabase-config.js contains the Supabase Project URL and matching anon /
publishable key. These are the only Supabase values needed in the browser.
Never put a service_role/secret key, database password, or database port in
browser code.

ID and password login
---------------------
The portal converts a user ID to an Auth email using EMAIL_DOMAIN:
  ADMIN101 -> admin101@school.local
  STU001   -> stu001@school.local

Each ID must have a matching Supabase Auth user with that email and a password,
plus a matching row in public.profiles.
Passwords are managed by Supabase Auth and must not be added to public.profiles
as plain text. If login reports invalid credentials, verify the mapped email
under Authentication -> Users and reset that user's password in the Dashboard.

Supabase setup
--------------
1. Database schema, policies, and admin account setup are managed in the
   Supabase project; no local SQL script is required for the portal to run.
2. Deploy supabase-function/manage-users.ts as an Edge Function named exactly
   manage-users. The function uses Supabase server environment secrets; never
   expose the service-role key in browser code.
3. Sign in at admin/login.html with ADMIN101 and its Supabase Auth password.

If login fails, check the Supabase Auth user email and the Response body of the
failed token request in browser Developer Tools. Never share passwords or
secret/service-role keys.
