const STANDARD_CLASSES = [
  'Creche', 'Nursery 1', 'Nursery 2', 'Nursery 3',
  'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
  'JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'
];
const PORTAL_LOGO_URL = new URL('../images/logo.svg', document.currentScript.src).href;

const DEMO_DATA = {
  students: [],
  teachers: [],
  admin: [],
  classes: [],
  subjects: [
    'Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics', 'Economics',
    'Government', 'Literature', 'Computer Science', 'Agricultural Science', 'Geography',
    'Civic Education', 'Financial Accounting', 'Commerce', 'Further Mathematics', 'History', 'Technical Drawing'
  ],
  settings: { schoolName: '' },
  demoAcademicResultsInitialized: true,
  demoQuestionsRemoved: true,
  demoCbtResultsRemoved: true,
  demoActivitiesRemoved: true,
  demoSubjectsRemoved: true,
  demoClassesRemoved: true,
  demoUsersRemoved: true,
  academicResults: [
    { studentId: 'STU001', name: 'John Doe', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'Mathematics', ca: 25, exam: 65, total: 90, grade: 'A', isDemo: true },
    { studentId: 'STU001', name: 'John Doe', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'English Language', ca: 22, exam: 60, total: 82, grade: 'A', isDemo: true },
    { studentId: 'STU001', name: 'John Doe', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'Biology', ca: 20, exam: 58, total: 78, grade: 'A', isDemo: true },
    { studentId: 'STU001', name: 'John Doe', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'Chemistry', ca: 21, exam: 56, total: 77, grade: 'A', isDemo: true },
    { studentId: 'STU001', name: 'John Doe', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'Physics', ca: 24, exam: 62, total: 86, grade: 'A', isDemo: true },
    { studentId: 'STU001', name: 'John Doe', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'Economics', ca: 23, exam: 59, total: 82, grade: 'A', isDemo: true },
    { studentId: 'STU002', name: 'Mary James', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'Mathematics', ca: 22, exam: 60, total: 82, grade: 'A', isDemo: true },
    { studentId: 'STU002', name: 'Mary James', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'English Language', ca: 21, exam: 57, total: 78, grade: 'A', isDemo: true },
    { studentId: 'STU002', name: 'Mary James', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'Biology', ca: 20, exam: 55, total: 75, grade: 'A', isDemo: true },
    { studentId: 'STU002', name: 'Mary James', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'Chemistry', ca: 19, exam: 56, total: 75, grade: 'A', isDemo: true },
    { studentId: 'STU002', name: 'Mary James', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'Physics', ca: 22, exam: 58, total: 80, grade: 'A', isDemo: true },
    { studentId: 'STU002', name: 'Mary James', className: 'SS2', session: '2026/2027', term: 'First Term', subject: 'Economics', ca: 21, exam: 57, total: 78, grade: 'A', isDemo: true }
  ],
  cbtResults: [],
  activities: [],
  questions: []
};

function initPortalApp() {
  attachGlobalActions();
  ensureProfileNavigation();
  initializeSidebarNavigation();
  renderSchoolName();

  const bodyPage = document.body.dataset.page || 'landing';

  switch (bodyPage) {
    case 'login':
      initLoginPages();
      break;
    case 'student-dashboard':
      protectPage('student');
      renderStudentDashboard();
      break;
    case 'student-profile':
      protectPage('student');
      renderProfilePage('student');
      break;
    case 'student-subjects':
      protectPage('student');
      renderStudentSubjects();
      break;
    case 'student-cbt':
      protectPage('student');
      initCbtPage();
      break;
    case 'student-cbt-result':
      protectPage('student');
      renderCbtResult();
      break;
    case 'student-academic-results':
      protectPage('student');
      renderAcademicResultsPage();
      break;
    case 'student-activities':
      protectPage('student');
      renderStudentActivities();
      break;
    case 'teacher-dashboard':
      protectPage('teacher');
      renderTeacherDashboard();
      break;
    case 'teacher-profile':
      protectPage('teacher');
      renderProfilePage('teacher');
      break;
    case 'teacher-students':
      protectPage('teacher');
      renderTeacherStudents();
      break;
    case 'teacher-subjects':
      protectPage('teacher');
      renderTeacherSubjects();
      break;
    case 'teacher-enter-scores':
      protectPage('teacher');
      renderEnterScoresPage();
      break;
    case 'teacher-results':
      protectPage('teacher');
      renderTeacherResults();
      break;
    case 'teacher-cbt-questions':
      protectPage('teacher');
      renderTeacherQuestions();
      break;
    case 'teacher-activities':
      protectPage('teacher');
      renderTeacherActivities();
      break;
    case 'admin-dashboard':
      protectPage('admin');
      renderAdminDashboard();
      break;
    case 'admin-profile':
      protectPage('admin');
      renderProfilePage('admin');
      break;
    case 'admin-students':
      protectPage('admin');
      renderAdminStudents();
      break;
    case 'admin-teachers':
      protectPage('admin');
      renderAdminTeachers();
      break;
    case 'admin-classes':
      protectPage('admin');
      renderAdminClasses();
      break;
    case 'admin-subjects':
      protectPage('admin');
      renderAdminSubjects();
      break;
    case 'admin-cbt':
      protectPage('admin');
      renderAdminCbtResults();
      break;
    case 'admin-academic-results':
      protectPage('admin');
      renderAdminAcademicResults();
      break;
    case 'admin-activities':
      protectPage('admin');
      renderAdminActivities();
      break;
    case 'admin-settings':
      protectPage('admin');
      renderAdminSettings();
      break;
    default:
      break;
  }

  window.addEventListener('storage', (event) => {
    if (event.key !== 'schoolPortalData') return;
    renderSchoolName();
    const session = getSession();
    if (session && ['student', 'teacher'].includes(session.role)) {
      const data = loadData();
      const users = session.role === 'student' ? data.students : data.teachers;
      const user = users.find((item) => item.id === session.id);
      if (!user || user.status === 'Inactive') {
        localStorage.removeItem('schoolPortalSession');
        window.location.href = `../${session.role}/login.html`;
        return;
      }
    }
    if (bodyPage === 'teacher-dashboard') renderTeacherDashboard();
    if (bodyPage === 'student-dashboard') renderStudentDashboard();
    if (bodyPage === 'admin-dashboard') renderAdminDashboard();
  });
}

function renderSchoolName() {
  const schoolName = loadData().settings?.schoolName?.trim() || 'School Name';
  document.querySelectorAll('[data-school-name]').forEach((element) => {
    element.textContent = schoolName;
  });
}

function applyCompanyBranding() {
  const companyName = 'Bluship Media Group';
  if (!document.title.includes(companyName)) {
    document.title = `${companyName} | ${document.title}`;
  }
  const sidebar = document.querySelector('.sidebar');
  if (sidebar && !sidebar.querySelector('.sidebar-company')) {
    const company = document.createElement('p');
    company.className = 'sidebar-company';
    company.textContent = companyName;
    sidebar.appendChild(company);
  }
}

document.addEventListener('DOMContentLoaded', startPortalApp);

async function startPortalApp() {
  applyCompanyBranding();
  document.addEventListener('invalid', (event) => {
    event.preventDefault();
    const field = event.target;
    const form = field.form;
    let message = field.validationMessage;
    if (form?.matches('[data-login-form]') && field.validity.valueMissing) {
      const label = [...form.querySelectorAll('label')].find((item) => item.htmlFor === field.id);
      message = `Please enter your ${label?.textContent.trim() || field.name}.`;
    }
    showErrorModal(message);
  }, true);
  if (window.PortalSync) {
    const ready = await window.PortalSync.boot(document.body.dataset.page || 'landing');
    if (!ready) return;
  }
  ensureDemoData();
  if (window.PortalSync) window.PortalSync.markReady();
  initPortalApp();
}

function mergeDemoUsers(users, defaults) {
  const merged = new Map(defaults.map((user) => [user.id, { ...user }]));
  users.forEach((user) => {
    const existing = merged.get(user.id);
    merged.set(user.id, {
      ...existing,
      ...user,
      password: user.password || existing?.password
    });
  });
  return [...merged.values()];
}

function ensureDemoData() {
  const saved = localStorage.getItem('schoolPortalData');
  const data = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEMO_DATA));
  data.classes = [...new Map((Array.isArray(data.classes) ? data.classes : []).map(normalizeClassName)
    .filter(Boolean).map((className) => [className.toLowerCase(), className])).values()];
  data.subjects = [...new Map((Array.isArray(data.subjects) ? data.subjects : []).map((subject) => String(subject || '').trim())
    .filter(Boolean).map((subject) => [subject.toLowerCase(), subject])).values()];
  data.inactiveClasses = [...new Set((data.inactiveClasses || []).map(normalizeClassName).filter(Boolean))];
  data.inactiveSubjects = [...new Set((data.inactiveSubjects || []).map((subject) => String(subject || '').trim()).filter(Boolean))];
  if (!data.demoSubjectsRemoved) {
    const demoSubjects = [
      'mathematics', 'english language', 'biology', 'chemistry', 'physics', 'economics',
      'government', 'literature', 'computer science', 'agricultural science', 'geography',
      'civic education', 'financial accounting', 'commerce', 'further mathematics', 'history', 'technical drawing'
    ];
    const storedSubjects = data.subjects.map((subject) => subject.toLowerCase()).sort();
    const isUntouchedDemoCatalogue = storedSubjects.length === demoSubjects.length
      && demoSubjects.every((subject) => storedSubjects.includes(subject));
    if (isUntouchedDemoCatalogue) data.subjects = [];
    data.demoSubjectsRemoved = true;
  }
  if (!data.demoUsersRemoved) {
    const demoStudents = new Map([
      ['STU001', 'John Doe|SS2|Active|1234|2026/2027|2008-04-12'],
      ['STU002', 'Mary James|SS2|Active|1234|2026/2027|2008-09-03'],
      ['STU003', 'David Paul|SS2|Active|1234|2026/2027|2008-01-24'],
      ['STU004', 'Grace Okafor|SS1|Active|1234|2026/2027|2009-06-15'],
      ['STU005', 'Daniel Eze|SS2|Active|1234|2026/2027|2008-11-08'],
      ['STU006', 'Chiamaka Nwosu|JSS3|Active|1234|2026/2027|2010-02-19'],
      ['STU007', 'Emmanuel Ade|SS3|Active|1234|2026/2027|2007-07-29'],
      ['STU008', 'Sarah Akin|SS1|Active|1234|2026/2027|2009-12-02'],
      ['STU009', 'Victor Ibe|JSS2|Active|1234|2026/2027|2011-03-10'],
      ['STU010', 'Mercy Bello|SS2|Active|1234|2026/2027|2008-05-21']
    ]);
    const demoTeachers = new Map([
      ['TCH001', 'Mr. John Adebayo|SS2|Active|1234|Mathematics'],
      ['TCH002', 'Mrs. Ada Okafor|SS1|Active|1234|Biology'],
      ['TCH003', 'Mr. Daniel Eze|JSS3|Active|1234|English Language'],
      ['TCH004', 'Mrs. Grace Nwosu|SS3|Active|1234|Physics'],
      ['TCH005', 'Mr. Samuel Bello|SS2|Active|1234|Computer Science']
    ]);
    const isUnchangedDemo = (user, signatures, signature) => signatures.get(user.id) === signature(user)
      && !user.photoDataUrl
      && !user.assignedClasses?.length
      && !user.assignedSubjects?.length;
    data.students = (data.students || []).filter((student) => !isUnchangedDemo(student, demoStudents, (user) => [
      user.name, normalizeClassName(user.className), user.status, user.password, user.session, user.dateOfBirth
    ].join('|')));
    data.teachers = (data.teachers || []).filter((teacher) => !isUnchangedDemo(teacher, demoTeachers, (user) => [
      user.name, normalizeClassName(user.className), user.status, user.password, user.subject
    ].join('|')));
    data.demoUsersRemoved = true;
  }
  if (!data.demoClassesRemoved) {
    const usedClasses = new Set([
      ...(data.students || []).map((student) => normalizeClassName(student.className)),
      ...(data.teachers || []).flatMap((teacher) => [teacher.className, ...(teacher.assignedClasses || [])].map(normalizeClassName))
    ]);
    data.classes = data.classes.filter((className) => !STANDARD_CLASSES.includes(className) || usedClasses.has(className));
    data.demoClassesRemoved = true;
  }
  data.students = mergeDemoUsers(data.students || [], DEMO_DATA.students).map((student) => ({
    ...student,
    className: normalizeClassName(student.className)
  }));
  data.teachers = mergeDemoUsers(data.teachers || [], DEMO_DATA.teachers).map((teacher) => ({
    ...teacher,
    className: normalizeClassName(teacher.className),
    ...(Array.isArray(teacher.assignedClasses)
      ? { assignedClasses: teacher.assignedClasses.map(normalizeClassName) }
      : {})
  }));
  data.admin = mergeDemoUsers(data.admin || [], DEMO_DATA.admin);
  data.settings = { schoolName: '', ...(data.settings || {}) };
  if (!data.demoQuestionsRemoved) {
    const demoQuestionSignatures = new Set([
      'Mathematics|SS2|Algebra|Which of the following is a quadratic equation?',
      'Mathematics|SS2|Algebra|Solve for x: 3x - 9 = 12.',
      'Biology|SS2|Cell|The basic unit of life is the:',
      'Biology|SS2|Cell|Which organelle is responsible for energy production?',
      'Physics|SS2|Motion|The unit of force is:',
      'English Language|SS2|Grammar|Choose the correct sentence.'
    ]);
    data.questions = (data.questions || []).filter((question) => !demoQuestionSignatures.has(
      `${question.subject}|${question.className}|${question.topic}|${question.question}`
    ));
    data.demoQuestionsRemoved = true;
  }
  if (!Array.isArray(data.questions)) data.questions = [];
  data.questions = data.questions.map((question) => ({
    ...question,
    testTitle: String(question.testTitle || '').trim() || (question.subject ? `${question.subject} CBT` : '')
  }));
  if (!data.demoCbtResultsRemoved) {
    const demoCbtResultSignatures = new Set([
      'STU001|Mathematics|36|40|90',
      'STU002|Biology|32|40|80',
      'STU003|Physics|28|40|70',
      'STU004|English Language|35|40|88'
    ]);
    data.cbtResults = (data.cbtResults || []).filter((result) => !demoCbtResultSignatures.has(
      `${result.studentId}|${result.subject}|${result.score}|${result.total}|${result.percentage}`
    ));
    data.demoCbtResultsRemoved = true;
  }
  if (!Array.isArray(data.cbtResults)) data.cbtResults = [];
  if (!data.demoActivitiesRemoved) {
    const demoActivitySignatures = new Set([
      'John Doe|Student|Completed Mathematics CBT|Sept 30|10:30 AM',
      'John Doe|Student|Viewed academic result|Sept 30|09:42 AM',
      'TCH001|Teacher|Entered SS2 Mathematics scores|Sept 30|09:45 AM',
      'TCH002|Teacher|Added a Biology question|Sept 30|08:20 AM',
      'Admin|Admin|Created student STU025|Sept 30|09:20 AM',
      'Mary James|Student|Logged in|Sept 29|08:10 AM'
    ]);
    data.activities = (data.activities || []).filter((activity) => !demoActivitySignatures.has(
      `${activity.user}|${activity.role}|${activity.activity}|${activity.date}|${activity.time}`
    ));
    data.demoActivitiesRemoved = true;
  }
  if (!Array.isArray(data.activities)) data.activities = [];
  if (!data.demoAcademicResultsInitialized) {
    const legacyDemoSignatures = new Set([
      'STU001|2026/2027|First Term|Mathematics|25|65', 'STU001|2026/2027|First Term|English Language|22|60', 'STU001|2026/2027|First Term|Biology|20|58',
      'STU001|2026/2027|Second Term|Mathematics|27|63', 'STU001|2026/2027|Second Term|English Language|24|62', 'STU001|2026/2027|Second Term|Biology|21|57',
      'STU001|2026/2027|Third Term|Mathematics|28|66', 'STU001|2026/2027|Third Term|English Language|25|63', 'STU001|2026/2027|Third Term|Biology|23|62',
      'STU002|2026/2027|First Term|Mathematics|22|60', 'STU002|2026/2027|First Term|Biology|20|55'
    ]);
    data.academicResults = (data.academicResults || []).filter((result) => {
      const signature = `${result.studentId}|${result.session}|${result.term}|${result.subject}|${result.ca}|${result.exam}`;
      return !result.isDemo && !legacyDemoSignatures.has(signature);
    });
    data.academicResults.push(...DEMO_DATA.academicResults);
    data.demoAcademicResultsInitialized = true;
  }
  data.academicResults = (data.academicResults || []).map((result) => {
    const student = data.students.find((item) => item.id === result.studentId);
    return { ...result, className: normalizeClassName(result.className || student?.className) };
  });
  data.cbtResults = (data.cbtResults || []).map((result) => ({
    ...result,
    className: normalizeClassName(result.className)
  }));
  localStorage.setItem('schoolPortalData', JSON.stringify(data));
}

function normalizeClassName(className) {
  const value = String(className || '').trim().replace(/\s+/g, ' ');
  const compactValue = value.replace(/\s/g, '').toLowerCase();
  return STANDARD_CLASSES.find((item) => item.replace(/\s/g, '').toLowerCase() === compactValue) || value;
}

function loadData() {
  return JSON.parse(localStorage.getItem('schoolPortalData') || JSON.stringify(DEMO_DATA));
}

function saveData(data) {
  localStorage.setItem('schoolPortalData', JSON.stringify(data));
  if (window.PortalSync) window.PortalSync.queuePush();
}

function recordActivity(data, user, role, activity) {
  const now = new Date();
  data.activities = data.activities || [];
  data.activities.unshift({
    user,
    role,
    activity,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
}

function compressImageFile(file, maxDimension = 640) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        try {
          const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          const context = canvas.getContext('2d');
          if (!context) {
            reject(new Error('Image processing is unavailable.'));
            return;
          }
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        } catch (error) {
          reject(new Error('The selected image could not be processed.'));
        }
      };
      image.onerror = () => reject(new Error('The selected file is not a supported image.'));
      image.src = reader.result;
    };
    reader.onerror = () => reject(new Error('The photo could not be loaded. Please try another image.'));
    reader.readAsDataURL(file);
  });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function parseCsv(content) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < content.length; index += 1) {
    const character = content[index];
    if (character === '"' && quoted && content[index + 1] === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(field.trim());
      field = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && content[index + 1] === '\n') index += 1;
      row.push(field.trim());
      if (row.some((value) => value !== '')) rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }

  row.push(field.trim());
  if (row.some((value) => value !== '')) rows.push(row);
  return rows;
}

function upsertAcademicResult(data, result) {
  const index = data.academicResults.findIndex((item) => item.studentId === result.studentId
    && item.subject === result.subject
    && item.term === result.term
    && (item.session || result.session) === result.session);
  if (index === -1) data.academicResults.push(result);
  else {
    const updatedResult = { ...data.academicResults[index], ...result };
    delete updatedResult.isDemo;
    data.academicResults[index] = updatedResult;
  }
}

function attachGlobalActions() {
  const showPagePreloader = () => {
    let preloader = document.getElementById('pagePreloader');
    if (!preloader) {
      preloader = document.createElement('div');
      preloader.id = 'pagePreloader';
      preloader.className = 'page-preloader';
      preloader.setAttribute('role', 'status');
      preloader.setAttribute('aria-live', 'polite');
      preloader.innerHTML = `<img class="page-preloader-logo" src="${PORTAL_LOGO_URL}" alt="" /><span>Loading...</span>`;
      document.body.appendChild(preloader);
    }
    preloader.classList.add('is-visible');
    preloader.setAttribute('aria-hidden', 'false');
  };

  document.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const destination = new URL(link.href, window.location.href);
    if (destination.protocol !== window.location.protocol || destination.host !== window.location.host) return;
    if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
    showPagePreloader();
  });

  window.addEventListener('beforeunload', showPagePreloader);

  document.querySelectorAll('[data-role-link]').forEach((button) => {
    button.addEventListener('click', () => {
      const role = button.dataset.roleLink;
      window.location.href = `../${role}/login.html`;
    });
  });

  const sidebar = document.querySelector('.sidebar');
  const menuBtn = sidebar?.querySelector('[data-mobile-menu]');
  if (sidebar && menuBtn) {
    sidebar.id = sidebar.id || 'portalSidebar';
    menuBtn.setAttribute('aria-controls', sidebar.id);

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-trigger';
    mobileMenuBtn.type = 'button';
    mobileMenuBtn.textContent = '☰';
    mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
    mobileMenuBtn.setAttribute('aria-controls', sidebar.id);
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.appendChild(mobileMenuBtn);

    const menuBackdrop = document.createElement('div');
    menuBackdrop.className = 'mobile-menu-backdrop';
    menuBackdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(menuBackdrop);

    const setMenuOpen = (isOpen) => {
      const isDesktop = window.matchMedia('(min-width: 981px)').matches;
      if (isDesktop) {
        const isCollapsed = !isOpen;
        sidebar.classList.toggle('collapsed', isCollapsed);
        sidebar.classList.remove('mobile-open');
        document.body.classList.remove('mobile-menu-open');
        menuBackdrop.classList.remove('is-visible');
        sessionStorage.setItem('portalSidebarCollapsed', String(isCollapsed));
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        menuBtn.setAttribute('aria-label', isCollapsed ? 'Expand navigation' : 'Collapse navigation');
        menuBtn.title = isCollapsed ? 'Expand navigation' : 'Collapse navigation';
        menuBtn.textContent = isCollapsed ? '›' : '×';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        return;
      }
      sidebar.classList.remove('collapsed');
      sidebar.classList.toggle('mobile-open', isOpen);
      document.body.classList.toggle('mobile-menu-open', isOpen);
      menuBackdrop.classList.toggle('is-visible', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      menuBtn.title = isOpen ? 'Close navigation menu' : 'Open navigation menu';
      menuBtn.textContent = isOpen ? '×' : '☰';
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    };
    const syncMenuForViewport = () => {
      const isDesktop = window.matchMedia('(min-width: 981px)').matches;
      if (isDesktop) setMenuOpen(sessionStorage.getItem('portalSidebarCollapsed') !== 'true');
      else setMenuOpen(sidebar.classList.contains('mobile-open'));
    };
    syncMenuForViewport();
    menuBtn.addEventListener('click', () => {
      const isDesktop = window.matchMedia('(min-width: 981px)').matches;
      const isOpen = isDesktop ? !sidebar.classList.contains('collapsed') : sidebar.classList.contains('mobile-open');
      setMenuOpen(!isOpen);
      if (!isDesktop && isOpen) mobileMenuBtn.focus();
    });
    mobileMenuBtn.addEventListener('click', () => {
      setMenuOpen(!sidebar.classList.contains('mobile-open'));
      if (sidebar.classList.contains('mobile-open')) {
        sidebar.querySelector('nav a')?.focus();
      }
    });
    menuBackdrop.addEventListener('click', () => {
      setMenuOpen(false);
      mobileMenuBtn.focus();
    });
    window.addEventListener('resize', syncMenuForViewport);
    sidebar.querySelector('nav')?.addEventListener('click', (event) => {
      if (!window.matchMedia('(min-width: 981px)').matches && event.target.closest('a')) setMenuOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
        setMenuOpen(false);
        mobileMenuBtn.focus();
      }
    });
  }
}

function initializeSidebarNavigation() {
  document.querySelectorAll('.sidebar nav a').forEach((link) => {
    const label = link.textContent.trim();
    link.title = label;
    link.setAttribute('aria-label', label);
    if (link.querySelector('.nav-icon')) return;
    const icon = document.createElement('span');
    icon.className = 'nav-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = label.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase();
    const text = document.createElement('span');
    text.className = 'nav-label';
    text.textContent = label;
    link.replaceChildren(icon, text);
  });
}

function ensureProfileNavigation() {
  const session = getSession();
  const nav = document.querySelector('.sidebar nav');
  if (!session || !nav || nav.querySelector('a[href="profile.html"]')) return;

  const link = document.createElement('a');
  link.href = 'profile.html';
  link.textContent = 'My Profile';
  link.classList.toggle('active', document.body.dataset.page === `${session.role}-profile`);
  const dashboardLink = nav.querySelector('a[href="dashboard.html"]');
  nav.insertBefore(link, dashboardLink?.nextSibling || nav.firstChild);
}

function showToast(message) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

function showErrorModal(message) {
  let modal = document.getElementById('appErrorModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'appErrorModal';
    modal.className = 'error-modal';
    modal.setAttribute('role', 'alertdialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'appErrorTitle');
    modal.setAttribute('aria-describedby', 'appErrorMessage');

    const box = document.createElement('div');
    box.className = 'error-modal-box';
    const title = document.createElement('h2');
    title.id = 'appErrorTitle';
    title.textContent = 'Portal message';
    const description = document.createElement('p');
    description.id = 'appErrorMessage';
    const closeButton = document.createElement('button');
    closeButton.className = 'btn btn-primary';
    closeButton.type = 'button';
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', closeErrorModal);

    box.append(title, description, closeButton);
    modal.appendChild(box);
    document.body.appendChild(modal);
  }

  if (!modal.classList.contains('open')) {
    showErrorModal.previousFocus = document.activeElement;
  }
  modal.querySelector('#appErrorMessage').textContent = String(message);
  modal.classList.add('open');
  modal.querySelector('button').focus();
  clearTimeout(showErrorModal.timer);
  showErrorModal.timer = setTimeout(closeErrorModal, 3000);
}

function closeErrorModal() {
  const modal = document.getElementById('appErrorModal');
  if (!modal) return;
  modal.classList.remove('open');
  clearTimeout(showErrorModal.timer);
  if (showErrorModal.previousFocus?.isConnected) showErrorModal.previousFocus.focus();
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

function getSession() {
  const session = localStorage.getItem('schoolPortalSession');
  return session ? JSON.parse(session) : null;
}

function setSession(role, id) {
  localStorage.setItem('schoolPortalSession', JSON.stringify({ role, id }));
}

function logout() {
  localStorage.removeItem('schoolPortalSession');
  if (window.PortalSync) window.PortalSync.logout();
  window.location.href = '../index.html';
}

function protectPage(expectedRole) {
  const session = getSession();
  const data = loadData();
  const records = expectedRole === 'student' ? data.students : expectedRole === 'teacher' ? data.teachers : data.admin;
  const user = records.find((record) => record.id === session?.id);
  if (!session || session.role !== expectedRole || !user || user.status === 'Inactive') {
    localStorage.removeItem('schoolPortalSession');
    window.location.href = expectedRole === 'admin' ? '../admin/login.html' : `../${expectedRole}/login.html`;
    return false;
  }
  return true;
}

function getCurrentStudent() {
  const session = getSession();
  const data = loadData();
  return data.students.find((student) => student.id === session?.id) || data.students[0];
}

function getCurrentTeacher() {
  const session = getSession();
  const data = loadData();
  return data.teachers.find((teacher) => teacher.id === session?.id) || data.teachers[0];
}

function getActiveClasses(data = loadData()) {
  const inactive = new Set((data.inactiveClasses || []).map(normalizeClassName));
  return data.classes.filter((className) => !inactive.has(normalizeClassName(className)));
}

function getActiveSubjects(data = loadData()) {
  const inactive = new Set((data.inactiveSubjects || []).map((subject) => subject.toLowerCase()));
  return data.subjects.filter((subject) => !inactive.has(subject.toLowerCase()));
}

function getTeacherAssignedClasses(teacher = getCurrentTeacher(), data = loadData()) {
  const assignments = Array.isArray(teacher?.assignedClasses) ? teacher.assignedClasses : [teacher?.className];
  const activeClasses = new Set(getActiveClasses(data));
  return assignments.map(normalizeClassName).filter((className) => className && activeClasses.has(className));
}

function getTeacherAssignedSubjects(teacher = getCurrentTeacher(), data = loadData()) {
  const assignments = Array.isArray(teacher?.assignedSubjects) ? teacher.assignedSubjects : [teacher?.assignedSubjects];
  const assignedSubjects = new Set([...assignments, teacher?.subject].filter(Boolean).map((subject) => subject.toLowerCase()));
  return getActiveSubjects(data).filter((subject) => assignedSubjects.has(subject.toLowerCase()));
}

function teacherCanAccessClass(className, teacher = getCurrentTeacher()) {
  return getTeacherAssignedClasses(teacher).includes(normalizeClassName(className));
}

function getCurrentAdmin() {
  const session = getSession();
  const data = loadData();
  return data.admin.find((admin) => admin.id === session?.id) || data.admin[0];
}

function showLoginLoader(text, done) {
  let loader = document.getElementById('loginLoader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'loginLoader';
    loader.className = 'login-loader';
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-live', 'polite');
    const box = document.createElement('div');
    box.className = 'login-loader-box';
    const spinner = document.createElement('span');
    spinner.className = 'login-loader-spinner';
    const label = document.createElement('p');
    label.id = 'loginLoaderText';
    box.append(spinner, label);
    loader.appendChild(box);
    document.body.appendChild(loader);
  }
  loader.classList.toggle('done', Boolean(done));
  loader.querySelector('#loginLoaderText').textContent = text;
  loader.classList.add('open');
}

function hideLoginLoader() {
  const loader = document.getElementById('loginLoader');
  if (loader) loader.classList.remove('open', 'done');
}

function initLoginPages() {
  document.querySelectorAll('[data-login-form]').forEach((form) => {
    const message = form.querySelector('.form-message');
    form.querySelector('[data-request-password]')?.addEventListener('click', (event) => {
      event.preventDefault();
      showErrorModal('Please contact your school administrator to request a new password.');
    });

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const role = form.dataset.role;
      const id = form.querySelector('input[name="id"]').value.trim().toUpperCase();
      const password = form.querySelector('input[name="password"]').value;
      const button = form.querySelector('button[type="submit"]');
      message.textContent = '';
      if (button) button.disabled = true;
      showLoginLoader('Checking database...');
      let loggedIn = false;
      try {
        const result = await window.PortalSync.login(role, id, password);
        if (!result.ok) {
          hideLoginLoader();
          showErrorModal(result.message);
          return;
        }
        loggedIn = true;
        showLoginLoader('Login successful. Opening your dashboard...', true);
        window.location.href = `../${role}/dashboard.html`;
      } catch (error) {
        hideLoginLoader();
        showErrorModal(navigator.onLine === false
          ? 'No internet connection. Check your connection and try again.'
          : 'Cannot connect to the server. Please try again shortly.');
      } finally {
        if (button && !loggedIn) button.disabled = false;
      }
    });
  });
}

function findUserByCredentials(role, id, password) {
  const data = loadData();
  if (role === 'student') {
    return data.students.find((student) => student.id === id && student.password === password && student.status !== 'Inactive');
  }
  if (role === 'teacher') {
    return data.teachers.find((teacher) => teacher.id === id && teacher.password === password && teacher.status !== 'Inactive');
  }
  if (role === 'admin') {
    return data.admin.find((admin) => admin.id === id && admin.password === password);
  }
  return null;
}

function renderStudentDashboard() {
  const student = getCurrentStudent();
  document.getElementById('studentWelcome').textContent = student.name;
  document.getElementById('studentId').textContent = student.id;
  document.getElementById('studentClass').textContent = student.className;
  document.getElementById('studentSession').textContent = student.session;

  const data = loadData();
  const subjectCount = getActiveSubjects(data).length;
  const cbtResults = data.cbtResults.filter((entry) => entry.studentId === student.id && !entry.isDemo);
  const averageCbt = cbtResults.length ? Math.round((cbtResults.reduce((sum, item) => sum + item.percentage, 0) / cbtResults.length)) : 0;
  const academicResults = data.academicResults.filter((item) => item.studentId === student.id && !item.isDemo);
  const averageAcademic = academicResults.length ? Math.round(academicResults.reduce((sum, item) => sum + item.total, 0) / academicResults.length) : 0;

  document.getElementById('subjectsCount').textContent = String(subjectCount);
  document.getElementById('cbtTaken').textContent = String(cbtResults.length);
  document.getElementById('avgCbt').textContent = `${averageCbt}%`;
  document.getElementById('avgAcademic').textContent = `${averageAcademic}%`;

  const resultsBody = document.getElementById('recentCbtResults');
  if (resultsBody) {
    const recentRows = cbtResults.slice(0, 3).map((item) => `
      <tr>
        <td>${item.subject}</td>
        <td>${item.score}/${item.total}</td>
        <td>${item.percentage}%</td>
        <td>${item.date}</td>
      </tr>
    `).join('');
    resultsBody.innerHTML = recentRows || '<tr><td colspan="4" class="empty-state">No CBT results yet.</td></tr>';
  }

  const upcomingCbtList = document.getElementById('upcomingCbtList');
  if (upcomingCbtList) {
    const upcomingTests = getUpcomingCbtTests(student, data);
    upcomingCbtList.innerHTML = upcomingTests.length ? upcomingTests.map((test) => `
      <a class="list-item cbt-upcoming-item" href="cbt.html?test=${encodeURIComponent(test.id)}">
        <span class="cbt-upcoming-details"><strong>${escapeHtml(test.title)}</strong><small>${escapeHtml(test.subject)} · ${test.questionCount} questions</small></span>
        <span class="cbt-start-link">Start test</span>
      </a>
    `).join('') : '<div class="list-item empty-state">No upcoming CBT tests have been assigned to your class.</div>';
  }

  const recentActivity = document.getElementById('recentActivityList');
  if (recentActivity) {
    const activities = data.activities.filter((item) => item.role === 'Student'
      && (item.user === student.name || item.user === student.id)).slice(0, 4);
    recentActivity.innerHTML = activities.length ? activities.map((item) => `
      <li class="list-item"><span>${escapeHtml(item.activity)}</span><span class="muted">${escapeHtml(item.date)} ${escapeHtml(item.time)}</span></li>
    `).join('') : '<li class="list-item empty-state">No recent activity yet.</li>';
  }
}

function getCbtTestId(question) {
  return [normalizeClassName(question.className), question.subject, question.testTitle]
    .map((value) => String(value || '').trim().toLowerCase())
    .join('::');
}

function getUpcomingCbtTests(student, data) {
  const tests = new Map();
  (data.questions || []).filter((question) => String(question.testTitle || '').trim()
    && getActiveSubjects(data).includes(question.subject)
    && normalizeClassName(question.className) === normalizeClassName(student.className))
    .forEach((question) => {
      const id = getCbtTestId(question);
      const test = tests.get(id) || {
        id,
        title: question.testTitle.trim(),
        subject: question.subject,
        questionCount: 0
      };
      test.questionCount += 1;
      tests.set(id, test);
    });
  const completedTestIds = new Set((data.cbtResults || [])
    .filter((result) => result.studentId === student.id)
    .map((result) => result.testId));
  return [...tests.values()].filter((test) => !completedTestIds.has(test.id));
}

function renderProfilePage(role) {
  const data = loadData();
  const user = role === 'student' ? getCurrentStudent() : role === 'teacher' ? getCurrentTeacher() : getCurrentAdmin();
  const assignedClasses = role === 'teacher' ? getTeacherAssignedClasses(user).join(', ') : user.className;
  const studentSubjects = Array.isArray(user.subjects) ? new Set(user.subjects.map((subject) => subject.toLowerCase())) : null;
  const subjects = role === 'teacher'
    ? getTeacherAssignedSubjects(user, data).join(', ')
    : role === 'student' ? getActiveSubjects(data).filter((subject) => !studentSubjects || studentSubjects.has(subject.toLowerCase())).join(', ') : 'Not applicable';
  const values = {
    className: role === 'teacher' ? assignedClasses || 'Not assigned' : role === 'student' ? user.className : 'Not applicable',
    subjects: subjects || 'Not assigned',
    session: user.session || '2026/2027',
    status: user.status || 'Active',
    dateOfBirth: user.dateOfBirth || 'Not provided'
  };

  document.getElementById('profileRole').textContent = role.charAt(0).toUpperCase() + role.slice(1);
  document.getElementById('profileName').textContent = user.name;
  document.getElementById('profileId').textContent = user.id;
  document.querySelectorAll('[data-profile-field]').forEach((field) => {
    field.textContent = values[field.dataset.profileField] || 'Not provided';
  });

  const photo = document.getElementById('profilePhoto');
  const placeholder = document.getElementById('profilePhotoPlaceholder');
  const updatePhoto = (photoDataUrl) => {
    photo.hidden = !photoDataUrl;
    placeholder.hidden = Boolean(photoDataUrl);
    if (photoDataUrl) photo.src = photoDataUrl;
  };
  updatePhoto(user.photoDataUrl);

  document.getElementById('profilePhotoInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const message = document.getElementById('profilePhotoMessage');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showErrorModal('Choose a valid image file.');
      event.target.value = '';
      return;
    }
    compressImageFile(file).then((photoDataUrl) => {
      const currentData = loadData();
      const currentUsers = role === 'student' ? currentData.students : role === 'teacher' ? currentData.teachers : currentData.admin;
      const savedUser = currentUsers.find((item) => item.id === user.id);
      if (!savedUser) return;
      savedUser.photoDataUrl = photoDataUrl;
      try {
        saveData(currentData);
        updatePhoto(savedUser.photoDataUrl);
        message.textContent = 'Profile photo updated.';
      } catch (error) {
        showErrorModal('There is not enough browser storage for this photo.');
      }
    }).catch((error) => {
      showErrorModal(error.message);
    });
  });
}

function renderStudentSubjects() {
  const data = loadData();
  const list = document.getElementById('subjectsList');
  list.innerHTML = getActiveSubjects(data).map((subject) => `
    <li class="list-item">
      <span>${subject}</span>
      <div class="row-actions">
        <button type="button" class="btn-secondary">View</button>
        <button type="button" class="btn-primary">Take CBT</button>
      </div>
    </li>
  `).join('');
}

function initCbtPage() {
  const data = loadData();
  const student = getCurrentStudent();
  const testId = new URLSearchParams(window.location.search).get('test');
  const pageQuestions = (data.questions || []).filter((question) => testId
    && getCbtTestId(question) === testId
    && getActiveSubjects(data).includes(question.subject)
    && normalizeClassName(question.className) === normalizeClassName(student.className));
  if (!pageQuestions.length) {
    document.querySelector('.question-panel').hidden = true;
    document.getElementById('cbtEmptyState').hidden = false;
    return;
  }
  const testTitle = pageQuestions[0].testTitle.trim();
  const subject = pageQuestions[0].subject;
  document.getElementById('cbtPageTitle').textContent = testTitle;
  const state = {
    questions: pageQuestions,
    testId,
    testTitle,
    subject,
    currentIndex: 0,
    selected: {}
  };

  renderQuestion(state);
  const timerText = document.getElementById('timerText');
  let timeLeft = 24 * 60 + 35;
  const timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitCbt(state);
      return;
    }
    timeLeft -= 1;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerText.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);

  document.getElementById('previousQuestion').addEventListener('click', () => {
    state.currentIndex = Math.max(0, state.currentIndex - 1);
    renderQuestion(state);
  });

  document.getElementById('nextQuestion').addEventListener('click', () => {
    state.currentIndex = Math.min(state.questions.length - 1, state.currentIndex + 1);
    renderQuestion(state);
  });

  document.getElementById('submitTest').addEventListener('click', () => {
    openModal('confirmSubmitModal');
  });

  document.getElementById('confirmSubmit').addEventListener('click', async () => {
    clearInterval(timer);
    if (await submitCbt(state)) closeModal('confirmSubmitModal');
  });

  document.getElementById('cancelSubmit').addEventListener('click', () => closeModal('confirmSubmitModal'));
}

function submitCbt(state) {
  if (state.submitted) return true;
  state.submitted = true;
  const result = computeCbtResult(state);
  const data = loadData();
  data.cbtResults = data.cbtResults || [];
  const previousResult = data.cbtResults.findIndex((item) => item.studentId === result.studentId && item.testId === result.testId);
  if (previousResult === -1) data.cbtResults.push(result);
  else data.cbtResults[previousResult] = result;
  const now = new Date();
  data.activities = data.activities || [];
  data.activities.unshift({
    user: result.student,
    role: 'Student',
    activity: `Completed ${result.testTitle}`,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  saveData(data);
  localStorage.setItem('schoolPortalLastCbt', JSON.stringify(result));
  (window.PortalSync ? window.PortalSync.flush() : Promise.resolve()).then(() => {
    window.location.href = 'cbt-result.html';
  });
  return true;
}

function renderQuestion(state) {
  const question = state.questions[state.currentIndex];
  const current = `${state.currentIndex + 1} of ${state.questions.length}`;
  document.getElementById('questionIndexText').textContent = `Question ${current}`;
  document.getElementById('questionText').textContent = `${state.currentIndex + 1}. ${question.question}`;
  document.getElementById('questionSubject').textContent = `${state.testTitle} · ${state.subject}`;

  const options = document.getElementById('questionOptions');
  options.innerHTML = question.options.map((option, index) => {
    const label = ['A', 'B', 'C', 'D'][index];
    const selected = state.selected[state.currentIndex] === label ? 'selected' : '';
    return `
      <button class="option-button ${selected}" type="button" data-option="${label}">
        <span class="option-letter">${label}.</span>
        <span>${option}</span>
      </button>
    `;
  }).join('');

  const nav = document.getElementById('questionNav');
  nav.innerHTML = state.questions.map((item, index) => `
    <button type="button" class="question-number ${index === state.currentIndex ? 'active' : ''}" data-index="${index}">${index + 1}</button>
  `).join('');

  nav.querySelectorAll('.question-number').forEach((button) => {
    button.addEventListener('click', () => {
      state.currentIndex = Number(button.dataset.index);
      renderQuestion(state);
    });
  });

  document.querySelectorAll('.option-button').forEach((button) => {
    button.addEventListener('click', () => {
      state.selected[state.currentIndex] = button.dataset.option;
      renderQuestion(state);
    });
  });
}

function computeCbtResult(state) {
  const questions = state.questions;
  let score = 0;
  questions.forEach((question, index) => {
    if (state.selected[index] === question.answer) score += 1;
  });

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  return {
    studentId: getCurrentStudent().id,
    student: getCurrentStudent().name,
    className: getCurrentStudent().className,
    testId: state.testId,
    testTitle: state.testTitle,
    subject: state.subject,
    score,
    total,
    percentage,
    correct: score,
    wrong: total - score,
    timeUsed: '24 minutes',
    date: new Date().toLocaleDateString()
  };
}

function renderCbtResult() {
  const result = JSON.parse(localStorage.getItem('schoolPortalLastCbt') || '{}');
  document.getElementById('resultSubject').textContent = result.subject || 'Mathematics';
  document.getElementById('resultScore').textContent = `${result.score || 36} / ${result.total || 40}`;
  document.getElementById('resultPercentage').textContent = `${result.percentage || 90}%`;
  document.getElementById('correctAnswers').textContent = `${result.correct || 36}`;
  document.getElementById('wrongAnswers').textContent = `${result.wrong || 4}`;
  document.getElementById('timeUsed').textContent = result.timeUsed || '24 minutes';
}

const REPORT_AFFECTIVE = ['Punctuality', 'Politeness', 'Neatness', 'Honesty', 'Leadership Skill', 'Cooperation', 'Attentiveness', 'Perseverance', 'Attitude to Work'];
const REPORT_PSYCHOMOTOR = ['Handwriting', 'Verbal Fluency', 'Sports', 'Handling Tools', 'Drawing & Painting'];
const REPORT_GRADING = [['A', '80-100'], ['B', '60-79'], ['C', '55-59'], ['D', '45-54'], ['F', '0-44']];
const CA_MAX = 20;
const EXAM_MAX = 60;

// Report card grading (A 80-100, B 60-79, C 55-59, D 45-54, F 0-44). Separate from getGrade() so other pages are unaffected.
function getReportGrade(total) {
  if (total >= 80) return 'A';
  if (total >= 60) return 'B';
  if (total >= 55) return 'C';
  if (total >= 45) return 'D';
  return 'F';
}

function ordinal(number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const remainder = number % 100;
  return number + (suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]);
}

function formatLongDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (!isoDate || Number.isNaN(date.getTime())) return '';
  return `${ordinal(date.getDate())} ${date.toLocaleString('en-GB', { month: 'short' })} ${date.getFullYear()}`;
}

function getStudentAge(dateOfBirth) {
  const birth = new Date(`${dateOfBirth}T00:00:00`);
  if (!dateOfBirth || Number.isNaN(birth.getTime())) return '';
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) age -= 1;
  return age >= 0 ? String(age) : '';
}

function getReportDetails(data, studentId, term, session) {
  return (data.reportDetails || {})[[studentId, term, session].join('|')] || {};
}

function getReportMeta(data, className, term, session) {
  return (data.reportMeta || {})[[normalizeClassName(className), term, session].join('|')] || {};
}

// Class positions, subject position/highest/lowest/average for one student's class, term and session.
function getClassReportStats(data, student, term, session) {
  const className = normalizeClassName(student.className);
  const classmates = data.students.filter((item) => normalizeClassName(item.className) === className && item.status !== 'Inactive');
  const studentById = new Map(classmates.map((item) => [item.id, item]));
  const rows = data.academicResults.filter((result) => studentById.has(result.studentId)
    && result.term === term
    && (result.session || studentById.get(result.studentId).session) === session);
  const bySubject = new Map();
  const byStudent = new Map();
  rows.forEach((result) => {
    const total = Number(result.total || 0);
    if (!bySubject.has(result.subject)) bySubject.set(result.subject, []);
    bySubject.get(result.subject).push({ studentId: result.studentId, total });
    if (!byStudent.has(result.studentId)) byStudent.set(result.studentId, []);
    byStudent.get(result.studentId).push(total);
  });
  const subjectStats = new Map();
  bySubject.forEach((entries, subject) => {
    const totals = entries.map((entry) => entry.total);
    const mine = entries.find((entry) => entry.studentId === student.id);
    subjectStats.set(subject, {
      position: mine ? 1 + totals.filter((total) => total > mine.total).length : null,
      highest: Math.max(...totals),
      lowest: Math.min(...totals),
      average: Math.round(totals.reduce((sum, total) => sum + total, 0) / totals.length)
    });
  });
  const averages = [...byStudent.entries()].map(([id, totals]) => ({ id, average: totals.reduce((sum, total) => sum + total, 0) / totals.length }));
  const mineOverall = averages.find((entry) => entry.id === student.id);
  return {
    classSize: classmates.length,
    subjectStats,
    overallPosition: mineOverall ? 1 + averages.filter((entry) => entry.average > mineOverall.average).length : null
  };
}

// Builds the full report card HTML for one student/term/session. Used by the student and admin pages.
function buildReportCardHtml(data, student, term, session) {
  const results = data.academicResults.filter((item) => item.studentId === student.id);
  const cell = (value) => (value === undefined || value === null || value === '' ? '—' : escapeHtml(value));
  const skillTable = (title, labels, scores) => `
    <table class="rc-panel">
      <thead><tr><th colspan="2">${title}</th></tr></thead>
      <tbody>${labels.map((label) => `<tr><td>${escapeHtml(label)}</td><td class="rc-score">${cell((scores || {})[label])}</td></tr>`).join('')}</tbody>
    </table>`;

  const settings = data.settings || {};
  const activeSubjects = getActiveSubjects(data);
  const rows = activeSubjects
    .map((subject) => results.find((item) => item.subject === subject && item.term === term && (item.session || student.session) === session))
    .filter(Boolean);
  const stats = getClassReportStats(data, student, term, session);
  const details = getReportDetails(data, student.id, term, session);
  const meta = getReportMeta(data, student.className, term, session);
  const classTeacher = data.teachers.find((teacher) => normalizeClassName(teacher.className) === normalizeClassName(student.className)
    || (Array.isArray(teacher.assignedClasses) && teacher.assignedClasses.map(normalizeClassName).includes(normalizeClassName(student.className))));

  const total = rows.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const average = rows.length ? total / rows.length : 0;
  const daysInTerm = meta.daysInTerm === undefined || meta.daysInTerm === '' ? '' : Number(meta.daysInTerm);
  const daysPresent = details.daysPresent === undefined || details.daysPresent === '' ? '' : Number(details.daysPresent);
  const daysAbsent = daysInTerm !== '' && daysPresent !== '' ? Math.max(daysInTerm - daysPresent, 0) : '';
  const gender = student.gender ? `<span>Gender: <b>${escapeHtml(student.gender)}</b></span><i> | </i>` : '';
  const age = getStudentAge(student.dateOfBirth);

  const subjectRows = rows.length ? rows.map((item) => {
    const subjectStat = stats.subjectStats.get(item.subject) || {};
    const itemTotal = Number(item.total || 0);
    return `<tr>
      <td>${escapeHtml(item.subject)}</td>
      <td>${cell(item.ca1 !== undefined ? item.ca1 : item.ca)}</td>
      <td>${cell(item.ca2)}</td>
      <td>${cell(item.exam)}</td>
      <td><b>${itemTotal}</b></td>
      <td>${getReportGrade(itemTotal)}</td>
      <td>${subjectStat.position ? ordinal(subjectStat.position) : '—'}</td>
      <td>${cell(subjectStat.highest)}</td>
      <td>${cell(subjectStat.lowest)}</td>
      <td>${cell(subjectStat.average)}</td>
    </tr>`;
  }).join('') : '<tr><td colspan="10" class="empty-state">No academic results have been recorded.</td></tr>';

  const vertical = ['1st CA (20)', '2nd CA (20)', 'Exam (60)', 'Total (100)', 'Grade', 'Subject Position', 'Subject Highest', 'Subject Lowest', 'Subject Average']
    .map((label) => `<th class="rc-vert"><span>${label}</span></th>`).join('');

  return `
      <header class="rc-head">
        <div>${settings.logoDataUrl ? `<img class="rc-logo" src="${settings.logoDataUrl}" alt="School logo" />` : ''}</div>
        <div>
          <h2 class="rc-school">${escapeHtml(settings.schoolName || 'School Name')}</h2>
          ${settings.motto ? `<p class="rc-line">Motto: ${escapeHtml(settings.motto)}</p>` : ''}
          ${settings.address ? `<p class="rc-line"><i>${escapeHtml(settings.address)}</i></p>` : ''}
          ${settings.phone || settings.email ? `<p class="rc-line">${settings.phone ? `TEL: ${escapeHtml(settings.phone)}` : ''}${settings.phone && settings.email ? ', ' : ''}${settings.email ? `EMAIL: ${escapeHtml(settings.email)}` : ''}</p>` : ''}
          <p class="rc-title">«« STUDENT'S ACADEMIC REPORT CARD»»</p>
        </div>
        <div class="rc-photo-wrap">
          ${student.photoDataUrl ? `<img class="rc-photo" src="${student.photoDataUrl}" alt="Student photo" />` : '<div class="rc-photo rc-photo-empty">Photo</div>'}
          <strong class="rc-position">${stats.overallPosition ? ordinal(stats.overallPosition) : ''}</strong>
        </div>
      </header>
      <h3 class="rc-name">${escapeHtml(student.name)}</h3>
      <p class="rc-idline">${gender}<span>Admission Number: <b>${escapeHtml(student.id)}</b></span><i> | </i><span>Age: <b>${escapeHtml(age)}</b></span></p>
      <div class="rc-info">
        <div><p>Term: <b>${escapeHtml(term)}</b></p><p>Session: <b>${escapeHtml(session)}</b></p><p>Resumption: <b>${escapeHtml(formatLongDate(meta.resumption))}</b></p></div>
        <div><p>Class: <b>${escapeHtml(normalizeClassName(student.className))}</b></p><p>Students in Class: <b>${stats.classSize}</b></p><p>Class Teacher: <b>${escapeHtml(classTeacher?.name || '')}</b></p></div>
        <div><p>Total Days In Term: <b>${cell(daysInTerm).replace('—', '')}</b></p><p>Total Days Present: <b>${cell(daysPresent).replace('—', '')}</b></p><p>Total Days Absent: <b>${cell(daysAbsent).replace('—', '')}</b></p></div>
      </div>
      <div class="rc-body">
        ${settings.logoDataUrl ? `<img class="rc-watermark" src="${settings.logoDataUrl}" alt="" />` : ''}
        <div class="rc-table-wrap">
          <table class="rc-table">
            <thead><tr><th class="rc-subject-head">SUBJECTS</th>${vertical}</tr></thead>
            <tbody>${subjectRows}</tbody>
          </table>
        </div>
        <aside class="rc-side">
          ${skillTable('AFFECTIVE SKILLS', REPORT_AFFECTIVE, details.affective)}
          ${skillTable('PSYCHOMOTOR SKILLS', REPORT_PSYCHOMOTOR, details.psychomotor)}
          <table class="rc-panel">
            <thead><tr><th colspan="2">GRADING SYSTEM</th></tr></thead>
            <tbody>${REPORT_GRADING.map(([grade, range]) => `<tr><td class="rc-score">${grade}</td><td>${range}</td></tr>`).join('')}</tbody>
          </table>
        </aside>
      </div>
      <div class="rc-bottom">
        <div>
          <table class="rc-summary">
            <thead><tr><th colspan="3">SUMMARY</th></tr></thead>
            <tbody><tr>
              <td>TOTAL SCORE: <b>${rows.length ? `${total} / ${rows.length * 100}` : ''}</b></td>
              <td>AVG. SCORE: <b>${rows.length ? `${average.toFixed(1)} %` : ''}</b></td>
              <td>GRADE: <b>${rows.length ? getReportGrade(average) : ''}</b></td>
            </tr></tbody>
          </table>
          <p class="rc-remark">CLASS TEACHER REMARKS: <u>${escapeHtml(details.teacherRemark || '')}</u></p>
          <p class="rc-remark">SCHOOL HEAD REMARKS: <u>${escapeHtml(details.headRemark || '')}</u></p>
        </div>
        <div class="rc-stamp"><strong>SIGNATURE / STAMP</strong><div></div></div>
      </div>
      ${meta.parentsNote ? `<p class="rc-parents"><b>INFO TO PARENTS:</b> ${escapeHtml(meta.parentsNote)}</p>` : ''}
    `;
}

function renderAcademicResultsPage() {
  const student = getCurrentStudent();
  const data = loadData();
  const termSelect = document.getElementById('termSelect');
  const sessionSelect = document.getElementById('resultSessionSelect');
  const card = document.getElementById('reportCard');
  if (!student) {
    card.innerHTML = '<p class="empty-state">No student record found.</p>';
    return;
  }
  const results = data.academicResults.filter((item) => item.studentId === student.id);
  const sessions = [...new Set([student.session, ...results.map((item) => item.session).filter(Boolean)])].filter(Boolean);
  sessionSelect.innerHTML = sessions.map((session) => `<option value="${escapeHtml(session)}">${escapeHtml(session)}</option>`).join('');

  const renderCard = () => {
    card.innerHTML = buildReportCardHtml(data, student, termSelect.value, sessionSelect.value);
  };

  termSelect.addEventListener('change', renderCard);
  sessionSelect.addEventListener('change', renderCard);
  document.getElementById('downloadResult').addEventListener('click', () => window.print());
  renderCard();
}

function renderStudentActivities() {
  const activities = [
    { action: 'Completed Mathematics CBT', date: 'Sept 30', time: '10:30 AM' },
    { action: 'Viewed academic result', date: 'Sept 30', time: '09:42 AM' },
    { action: 'Logged in', date: 'Sept 29', time: '08:15 AM' },
    { action: 'Started Biology CBT', date: 'Sept 29', time: '07:55 AM' }
  ];

  const list = document.getElementById('studentActivityList');
  list.innerHTML = activities.map((item) => `
    <li class="list-item">
      <span>${item.action}</span>
      <span class="muted">${item.date} • ${item.time}</span>
    </li>
  `).join('');
}

function renderTeacherDashboard() {
  const teacher = getCurrentTeacher();
  const data = loadData();
  const assignedClasses = getTeacherAssignedClasses(teacher);
  const activeClasses = getActiveClasses(data).filter((className) => assignedClasses.includes(className));
  const students = data.students.filter((student) => student.status !== 'Inactive'
    && activeClasses.includes(normalizeClassName(student.className)));
  const subjects = getTeacherAssignedSubjects(teacher, data);
  const tests = new Set(data.questions.filter((question) => activeClasses.includes(normalizeClassName(question.className))
    && subjects.some((subject) => subject.toLowerCase() === String(question.subject || '').toLowerCase())
    && String(question.testTitle || '').trim()).map(getCbtTestId));
  document.getElementById('teacherWelcome').textContent = teacher.name;
  document.getElementById('teacherSubjectCount').textContent = String(subjects.length);
  document.getElementById('teacherStudentCount').textContent = String(students.length);
  document.getElementById('teacherCbtCount').textContent = String(tests.size);
  const teacherPhoto = document.getElementById('teacherDashboardPhoto');
  teacherPhoto.hidden = !teacher.photoDataUrl;
  if (teacher.photoDataUrl) teacherPhoto.src = teacher.photoDataUrl;

  const subjectList = document.getElementById('teacherSubjectList');
  subjectList.innerHTML = subjects.length
    ? subjects.map((item) => `<li class="list-item"><span>${escapeHtml(item)}</span></li>`).join('')
    : '<li class="list-item empty-state">No active subjects assigned.</li>';

  const activityList = document.getElementById('teacherActivityList');
  const activities = data.activities.filter((item) => item.role === 'Teacher'
    && (item.user === teacher.name || item.user === teacher.id)).slice(0, 4);
  activityList.innerHTML = activities.length ? activities.map((item) => `
    <li class="list-item"><span>${escapeHtml(item.activity)}</span><span class="muted">${escapeHtml(item.date)} ${escapeHtml(item.time)}</span></li>
  `).join('') : '<li class="list-item empty-state">No recent activity yet.</li>';
}

function renderTeacherStudents() {
  const table = document.getElementById('teacherStudentsTableBody');
  const data = loadData();
  const teacher = getCurrentTeacher();
  const assignedClasses = getTeacherAssignedClasses(teacher);
  const students = data.students.filter((student) => teacherCanAccessClass(student.className, teacher));

  function renderRows(rows) {
    table.innerHTML = rows.map((student) => `
      <tr>
        <td>${student.photoDataUrl ? `<img class="student-table-photo" src="${student.photoDataUrl}" alt="">` : '<span class="student-table-photo-placeholder">-</span>'}</td>
        <td>${escapeHtml(student.id)}</td>
        <td>${escapeHtml(student.name)}</td>
        <td>${escapeHtml(student.dateOfBirth || 'Not provided')}</td>
        <td>${escapeHtml(student.className)}</td>
        <td>${escapeHtml(student.session || 'Not provided')}</td>
        <td><span class="badge success">${escapeHtml(student.status)}</span></td>
      </tr>
    `).join('');
  }

  const search = document.getElementById('teacherStudentSearch');
  const filter = document.getElementById('teacherClassFilter');
  const availableClasses = getActiveClasses(data).filter((className) => assignedClasses.includes(className));
  filter.innerHTML = `<option value="">All assigned classes</option>${availableClasses.map((className) => `<option value="${escapeHtml(className)}">${escapeHtml(className)}</option>`).join('')}`;
  search.addEventListener('input', () => renderRows(filterStudents(students, search.value, filter.value)));
  filter.addEventListener('change', () => renderRows(filterStudents(students, search.value, filter.value)));
  renderRows(students);
}

function filterStudents(students, searchValue, classFilter) {
  return students.filter((student) => {
    const matchesText = !searchValue || student.name.toLowerCase().includes(searchValue.toLowerCase()) || student.id.toLowerCase().includes(searchValue.toLowerCase());
    const matchesClass = !classFilter || classFilter === 'All' || student.className === classFilter;
    return matchesText && matchesClass;
  });
}

function renderTeacherSubjects() {
  const list = document.getElementById('teacherSubjectsList');
  const teacher = getCurrentTeacher();
  const subjects = getTeacherAssignedSubjects(teacher, loadData());
  list.innerHTML = subjects.length
    ? subjects.map((subject) => `<li class="list-item"><span>${escapeHtml(subject)}</span></li>`).join('')
    : '<li class="list-item empty-state">No active subjects are allocated to your account.</li>';
}

function renderEnterScoresPage() {
  const tableHead = document.getElementById('scoreTableHead');
  const table = document.getElementById('scoreTableBody');
  const classSelect = document.getElementById('scoreClassSelect');
  const studentSelect = document.getElementById('scoreStudentSelect');
  const termSelect = document.getElementById('scoreTermSelect');
  const sessionSelect = document.getElementById('scoreSessionSelect');
  const sheet = document.getElementById('scoreSheet');
  const empty = document.getElementById('scoreEmpty');
  const detailsBox = document.getElementById('reportDetails');
  const status = document.getElementById('scoreSaveStatus');
  const teacher = getCurrentTeacher();
  const data = loadData();
  const assignedClasses = getTeacherAssignedClasses(teacher, data);
  const subjects = getTeacherAssignedSubjects(teacher, data);
  const sessions = [...new Set([...data.students.map((student) => student.session), ...data.academicResults.map((result) => result.session)].filter(Boolean))];

  classSelect.innerHTML = assignedClasses.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join('');
  sessionSelect.innerHTML = sessions.map((session) => `<option value="${escapeHtml(session)}">${escapeHtml(session)}</option>`).join('');
  if (sessions.includes('2026/2027')) sessionSelect.value = '2026/2027';

  function fillStudents() {
    const list = loadData().students.filter((student) => normalizeClassName(student.className) === classSelect.value && student.status === 'Active');
    studentSelect.innerHTML = list.map((student) => `<option value="${escapeHtml(student.id)}">${escapeHtml(student.name)} (${escapeHtml(student.id)})</option>`).join('');
  }

  const currentStudent = () => loadData().students.find((student) => student.id === studentSelect.value);
  const numberValue = (value) => (value === undefined || value === null ? '' : escapeHtml(value));

  function skillSelects(group, labels, saved) {
    return labels.map((label) => `
      <div><label>${escapeHtml(label)}</label>
        <select data-skill-group="${group}" data-skill="${escapeHtml(label)}">
          <option value=""></option>${[1, 2, 3, 4, 5].map((n) => `<option value="${n}"${String((saved || {})[label]) === String(n) ? ' selected' : ''}>${n}</option>`).join('')}
        </select>
      </div>`).join('');
  }

  function renderSheet() {
    const student = currentStudent();
    if (!assignedClasses.length || !subjects.length || !student) {
      sheet.hidden = true;
      empty.hidden = false;
      empty.textContent = !subjects.length ? 'No active subjects are assigned to your account.'
        : !assignedClasses.length ? 'No classes are assigned to your account.'
          : 'No active students in this class.';
      return;
    }
    empty.hidden = true;
    sheet.hidden = false;
    const latest = loadData();
    const term = termSelect.value;
    const session = sessionSelect.value;
    tableHead.innerHTML = `<tr><th>Subject</th><th>1st CA (${CA_MAX})</th><th>2nd CA (${CA_MAX})</th><th>Exam (${EXAM_MAX})</th><th>Total (100)</th><th>Grade</th></tr>`;
    table.innerHTML = subjects.map((subject) => {
      const saved = latest.academicResults.find((result) => result.studentId === student.id
        && result.subject === subject && result.term === term && (result.session || student.session) === session);
      const first = saved ? (saved.ca1 !== undefined ? saved.ca1 : saved.ca) : '';
      const label = `${student.name} ${subject}`;
      return `<tr data-subject-row="${escapeHtml(subject)}">
        <td>${escapeHtml(subject)}</td>
        <td><input type="number" min="0" max="${CA_MAX}" step="any" value="${numberValue(first)}" data-field="ca1" aria-label="${escapeHtml(label)} 1st CA" /></td>
        <td><input type="number" min="0" max="${CA_MAX}" step="any" value="${numberValue(saved?.ca2)}" data-field="ca2" aria-label="${escapeHtml(label)} 2nd CA" /></td>
        <td><input type="number" min="0" max="${EXAM_MAX}" step="any" value="${numberValue(saved?.exam)}" data-field="exam" aria-label="${escapeHtml(label)} exam" /></td>
        <td data-field="total">${saved ? escapeHtml(saved.total) : '—'}</td>
        <td data-field="grade">${saved ? getReportGrade(Number(saved.total)) : '—'}</td>
      </tr>`;
    }).join('');

    const details = getReportDetails(latest, student.id, term, session);
    const meta = getReportMeta(latest, student.className, term, session);
    detailsBox.innerHTML = `
      <fieldset><legend>Class details (same for every student in ${escapeHtml(classSelect.value)}, ${escapeHtml(term)})</legend>
        <div class="rd-grid">
          <div><label for="rdDaysInTerm">Total days in term</label><input id="rdDaysInTerm" type="number" min="0" value="${numberValue(meta.daysInTerm)}" /></div>
          <div><label for="rdResumption">Resumption date</label><input id="rdResumption" type="date" value="${escapeHtml(meta.resumption || '')}" /></div>
          <div style="grid-column: 1 / -1;"><label for="rdParentsNote">Info to parents</label><textarea id="rdParentsNote" rows="2">${escapeHtml(meta.parentsNote || '')}</textarea></div>
        </div>
      </fieldset>
      <fieldset><legend>${escapeHtml(student.name)}: attendance and remarks</legend>
        <div class="rd-grid">
          <div><label for="rdDaysPresent">Total days present</label><input id="rdDaysPresent" type="number" min="0" value="${numberValue(details.daysPresent)}" /></div>
          <div><label>Total days absent</label><div id="rdDaysAbsent" class="rd-readonly">—</div></div>
          <div style="grid-column: 1 / -1;"><label for="rdTeacherRemark">Class teacher remarks</label><input id="rdTeacherRemark" type="text" value="${escapeHtml(details.teacherRemark || '')}" /></div>
          <div style="grid-column: 1 / -1;"><label for="rdHeadRemark">School head remarks</label><input id="rdHeadRemark" type="text" value="${escapeHtml(details.headRemark || '')}" /></div>
        </div>
      </fieldset>
      <fieldset><legend>Affective skills (1 to 5)</legend><div class="rd-grid">${skillSelects('affective', REPORT_AFFECTIVE, details.affective)}</div></fieldset>
      <fieldset><legend>Psychomotor skills (1 to 5)</legend><div class="rd-grid">${skillSelects('psychomotor', REPORT_PSYCHOMOTOR, details.psychomotor)}</div></fieldset>
    `;
    updateAbsent();
  }

  function updateAbsent() {
    const days = document.getElementById('rdDaysInTerm');
    const present = document.getElementById('rdDaysPresent');
    const absent = document.getElementById('rdDaysAbsent');
    if (!days || !present || !absent) return;
    absent.textContent = days.value !== '' && present.value !== '' ? String(Math.max(Number(days.value) - Number(present.value), 0)) : '—';
  }

  // Saves the scores and report details for the student on screen. Returns how many subjects were saved and which were invalid.
  function saveCurrent() {
    const student = currentStudent();
    const result = { saved: 0, invalid: [], student };
    if (!student) return result;
    const latest = loadData();
    const term = termSelect.value;
    const session = sessionSelect.value;
    table.querySelectorAll('tr[data-subject-row]').forEach((row) => {
      const subject = row.dataset.subjectRow;
      const raw = (field) => row.querySelector(`[data-field="${field}"]`).value;
      if (raw('ca1') === '' && raw('ca2') === '' && raw('exam') === '') return;
      const ca1 = Number(raw('ca1'));
      const ca2 = Number(raw('ca2'));
      const exam = Number(raw('exam'));
      const valid = raw('ca1') !== '' && raw('ca2') !== '' && raw('exam') !== ''
        && [ca1, ca2, exam].every(Number.isFinite)
        && ca1 >= 0 && ca1 <= CA_MAX && ca2 >= 0 && ca2 <= CA_MAX && exam >= 0 && exam <= EXAM_MAX;
      if (!valid) {
        result.invalid.push(subject);
        return;
      }
      const total = ca1 + ca2 + exam;
      upsertAcademicResult(latest, {
        studentId: student.id,
        name: student.name,
        className: student.className,
        session,
        subject,
        term,
        ca1,
        ca2,
        ca: ca1 + ca2,
        exam,
        total,
        grade: getReportGrade(total)
      });
      result.saved += 1;
    });

    const skills = (group) => Object.fromEntries([...detailsBox.querySelectorAll(`[data-skill-group="${group}"]`)]
      .filter((select) => select.value !== '').map((select) => [select.dataset.skill, Number(select.value)]));
    latest.reportDetails = latest.reportDetails || {};
    latest.reportDetails[[student.id, term, session].join('|')] = {
      daysPresent: document.getElementById('rdDaysPresent').value,
      teacherRemark: document.getElementById('rdTeacherRemark').value.trim(),
      headRemark: document.getElementById('rdHeadRemark').value.trim(),
      affective: skills('affective'),
      psychomotor: skills('psychomotor')
    };
    latest.reportMeta = latest.reportMeta || {};
    latest.reportMeta[[normalizeClassName(student.className), term, session].join('|')] = {
      daysInTerm: document.getElementById('rdDaysInTerm').value,
      resumption: document.getElementById('rdResumption').value,
      parentsNote: document.getElementById('rdParentsNote').value.trim()
    };
    if (result.saved) recordActivity(latest, teacher.name, 'Teacher', `Saved ${result.saved} subject results for ${student.name}`);
    saveData(latest);
    return result;
  }

  // Live total and grade while typing, plus absent-days calculation.
  sheet.addEventListener('input', (event) => {
    const row = event.target.closest('tr[data-subject-row]');
    if (row) {
      const values = ['ca1', 'ca2', 'exam'].map((field) => row.querySelector(`[data-field="${field}"]`).value);
      const complete = values.every((value) => value !== '');
      const total = values.reduce((sum, value) => sum + Number(value || 0), 0);
      row.querySelector('[data-field="total"]').textContent = complete ? String(total) : '—';
      row.querySelector('[data-field="grade"]').textContent = complete ? getReportGrade(total) : '—';
    }
    updateAbsent();
  });

  // Autosave whenever a field is committed.
  sheet.addEventListener('change', () => {
    const result = saveCurrent();
    if (result.invalid.length) {
      status.textContent = '';
      showErrorModal(`Enter all three scores for: ${result.invalid.join(', ')}. 1st CA and 2nd CA must be up to ${CA_MAX}; exam must be up to ${EXAM_MAX}.`);
      return;
    }
    status.textContent = `Autosaved for ${result.student?.name || 'student'}.`;
  });

  classSelect.addEventListener('change', () => { fillStudents(); renderSheet(); });
  [studentSelect, termSelect, sessionSelect].forEach((select) => select.addEventListener('change', renderSheet));

  document.getElementById('saveScores').addEventListener('click', () => {
    const result = saveCurrent();
    if (result.invalid.length) {
      showErrorModal(`Enter valid scores for: ${result.invalid.join(', ')}.`);
      return;
    }
    showToast(`Report details saved for ${result.student?.name || 'student'}.`);
    status.textContent = `Saved ${result.saved} subject results for ${result.student?.name || 'student'}.`;
    renderSheet();
  });

  document.getElementById('downloadCsvTemplate').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob(['studentId,subject,term,session,ca1,ca2,exam\n'], { type: 'text/csv;charset=utf-8' }));
    link.download = 'result-scores-template.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  });

  document.getElementById('scoreCsvFile').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const rows = parseCsv(String(reader.result || ''));
        if (rows.length < 2) throw new Error('The CSV file has no score rows.');
        const headers = rows[0].map((header) => header.replace(/^\uFEFF/, '').toLowerCase().replace(/[^a-z0-9]/g, ''));
        const column = (name) => headers.indexOf(name);
        const required = ['studentid', 'subject', 'term', 'session', 'ca1', 'ca2', 'exam'];
        if (required.some((header) => column(header) === -1)) throw new Error('CSV needs studentId, subject, term, session, ca1, ca2, and exam columns.');
        const latest = loadData();
        let imported = 0;
        let skipped = 0;
        rows.slice(1).forEach((values) => {
          const value = (header) => values[column(header)] || '';
          const student = latest.students.find((item) => item.id.toLowerCase() === value('studentid').toLowerCase());
          const ca1 = Number(value('ca1'));
          const ca2 = Number(value('ca2'));
          const exam = Number(value('exam'));
          const subject = value('subject');
          if (!student || !assignedClasses.includes(normalizeClassName(student.className)) || !subjects.includes(subject)
            || !value('term') || !value('session') || [value('ca1'), value('ca2'), value('exam')].some((item) => item === '')
            || ![ca1, ca2, exam].every(Number.isFinite)
            || ca1 < 0 || ca1 > CA_MAX || ca2 < 0 || ca2 > CA_MAX || exam < 0 || exam > EXAM_MAX) {
            skipped += 1;
            return;
          }
          const total = ca1 + ca2 + exam;
          upsertAcademicResult(latest, {
            studentId: student.id,
            name: student.name,
            className: student.className,
            session: value('session'),
            subject,
            term: value('term'),
            ca1,
            ca2,
            ca: ca1 + ca2,
            exam,
            total,
            grade: getReportGrade(total)
          });
          imported += 1;
        });
        if (imported) recordActivity(latest, teacher.name, 'Teacher', `Imported ${imported} academic subject results`);
        saveData(latest);
        renderSheet();
        if (skipped) showErrorModal(`Imported ${imported} results; skipped ${skipped} invalid rows.`);
        else showToast(`Imported ${imported} results.`);
      } catch (error) {
        showErrorModal(error.message || 'Could not read this CSV file.');
      } finally {
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  });

  fillStudents();
  renderSheet();
}

function getGrade(total) {
  if (total >= 75) return 'A';
  if (total >= 65) return 'B';
  if (total >= 55) return 'C';
  if (total >= 45) return 'D';
  return 'F';
}

function renderAcademicGrid(tableHead, tableBody, students, results, subjects) {
  const fixedHeaders = ['Student', 'Class', 'Student ID', 'Term', 'Session'];
  tableHead.innerHTML = `
    <tr>${fixedHeaders.map((label) => `<th rowspan="2">${label}</th>`).join('')}${subjects.map((subject) => `<th colspan="5">${escapeHtml(subject)}</th>`).join('')}</tr>
    <tr>${subjects.map(() => '<th>CA</th><th>Exam</th><th>Total</th><th>Grade</th><th>Remark</th>').join('')}</tr>
  `;
  const columnCount = fixedHeaders.length + subjects.length * 5;
  if (!results.length) {
    tableBody.innerHTML = `<tr><td colspan="${columnCount}" class="empty-state">No academic results have been recorded.</td></tr>`;
    return;
  }

  const studentMap = new Map(students.map((student) => [student.id, student]));
  const groups = new Map();
  results.forEach((result) => {
    const student = studentMap.get(result.studentId);
    const session = result.session || student?.session || '';
    const key = `${result.studentId}|${result.term}|${session}`;
    if (!groups.has(key)) {
      groups.set(key, {
        studentId: result.studentId,
        name: result.name || student?.name || result.studentId,
        className: normalizeClassName(result.className || student?.className),
        term: result.term || '',
        session,
        subjects: new Map()
      });
    }
    groups.get(key).subjects.set(result.subject, result);
  });

  const rows = [...groups.values()].sort((first, second) => first.name.localeCompare(second.name)
    || first.session.localeCompare(second.session)
    || first.term.localeCompare(second.term));
  tableBody.innerHTML = rows.map((row) => `
    <tr>
      <td>${escapeHtml(row.name)}</td>
      <td>${escapeHtml(row.className)}</td>
      <td>${escapeHtml(row.studentId)}</td>
      <td>${escapeHtml(row.term)}</td>
      <td>${escapeHtml(row.session)}</td>
      ${subjects.map((subject) => {
        const result = row.subjects.get(subject);
        return `<td>${result ? escapeHtml(result.ca) : '—'}</td><td>${result ? escapeHtml(result.exam) : '—'}</td><td>${result ? escapeHtml(result.total) : '—'}</td><td>${result ? escapeHtml(result.grade) : '—'}</td><td>${escapeHtml(result?.teacherRemark || '—')}</td>`;
      }).join('')}
    </tr>
  `).join('');
}

function downloadTableCsv(table, filename) {
  const rows = [...table.querySelectorAll('tr')].map((row) => [...row.children].map((cell) => {
    const input = cell.querySelector('input, textarea, select');
    const value = input ? input.value : cell.innerText.replace(/\s+/g, ' ').trim();
    return `"${String(value).replace(/"/g, '""')}"`;
  }).join(','));
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([rows.join('\r\n')], { type: 'text/csv;charset=utf-8' }));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function renderTeacherResults() {
  const table = document.getElementById('resultsTableBody');
  const tableHead = document.getElementById('resultsTableHead');
  const data = loadData();
  const classSelect = document.getElementById('resultClassFilter');
  const termSelect = document.getElementById('resultTermFilter');
  const sessionSelect = document.getElementById('resultSessionFilter');
  const teacher = getCurrentTeacher();
  const assignedClasses = getTeacherAssignedClasses(teacher);
  const subjects = getTeacherAssignedSubjects(teacher, data);
  classSelect.innerHTML = assignedClasses.map((className) => `<option value="${escapeHtml(className)}">${escapeHtml(className)}</option>`).join('');
  if (assignedClasses.length) classSelect.value = assignedClasses[0];
  const fillFilter = (select, values) => {
    const options = [...new Set(values.filter(Boolean))];
    select.innerHTML = `<option value="">All</option>${options.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('')}`;
  };
  fillFilter(termSelect, data.academicResults.map((result) => result.term));
  fillFilter(sessionSelect, [...data.students.map((student) => student.session), ...data.academicResults.map((result) => result.session)]);

  function renderRows() {
    const latestData = loadData();
    const rows = latestData.academicResults.filter((result) => {
      const student = latestData.students.find((item) => item.id === result.studentId);
      const className = result.className || student?.className;
      return assignedClasses.includes(normalizeClassName(className))
        && (!classSelect.value || normalizeClassName(className) === classSelect.value)
        && subjects.includes(result.subject)
        && (!termSelect.value || result.term === termSelect.value)
        && (!sessionSelect.value || (result.session || student?.session) === sessionSelect.value);
    });
    renderAcademicGrid(tableHead, table, latestData.students, rows, subjects);
  }

  [classSelect, termSelect, sessionSelect].forEach((select) => select.addEventListener('change', renderRows));
  document.getElementById('downloadTeacherResults').addEventListener('click', () => downloadTableCsv(table.closest('table'), 'teacher-academic-results.csv'));
  document.getElementById('printTeacherResults').addEventListener('click', () => window.print());
  renderRows();
}

/* ---------- CSV import for CBT questions ---------- */
function parseCsvText(text) {
  text = String(text || '').replace(/^\uFEFF/, '');
  const firstLine = text.split(/\r?\n/, 1)[0] || '';
  const counts = { ',': 0, ';': 0, '\t': 0 };
  let inQuotes = false;
  for (const ch of firstLine) {
    if (ch === '"') inQuotes = !inQuotes;
    else if (!inQuotes && Object.prototype.hasOwnProperty.call(counts, ch)) counts[ch] += 1;
  }
  let delimiter = ',';
  Object.keys(counts).forEach((key) => { if (counts[key] > counts[delimiter]) delimiter = key; });

  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 1; } else quoted = false;
      } else field += ch;
    } else if (ch === '"' && field === '') {
      quoted = true;
    } else if (ch === delimiter) {
      row.push(field); field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i += 1;
      row.push(field); field = '';
      rows.push(row); row = [];
    } else field += ch;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((cell) => String(cell).trim() !== ''));
}

function csvEscapeCell(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
}

// Turns CSV text into question objects. Pure function: it never touches the page or storage.
function importQuestionsFromCsv(text, opts) {
  const result = { questions: [], errors: [], duplicates: 0, fatal: '' };
  const rows = parseCsvText(text);
  if (rows.length < 2) { result.fatal = 'The file has no question rows. Use the template as a guide.'; return result; }
  if (rows.length - 1 > 500) { result.fatal = 'Import at most 500 questions at a time.'; return result; }

  const header = rows[0].map((h) => String(h || '').toLowerCase().replace(/[^a-z0-9]/g, ''));
  const col = (...names) => header.findIndex((h) => names.includes(h));
  const c = {
    title: col('testtitle', 'title', 'test'), subject: col('subject'), cls: col('class', 'classname'),
    q: col('question', 'questiontext'), a: col('optiona'), b: col('optionb'), c: col('optionc'), d: col('optiond'),
    ans: col('answer', 'correctanswer', 'correct')
  };
  if (c.q < 0 || c.a < 0 || c.b < 0 || c.ans < 0) {
    result.fatal = 'The first row must have these column names: question, option_a, option_b, answer. (option_c, option_d, test_title, subject and class are optional.)';
    return result;
  }

  const get = (r, i) => (i >= 0 && r[i] !== undefined ? String(r[i]).trim() : '');
  const subjectKey = (name) => String(name || '').trim().toLowerCase();
  const classKey = (name) => normalizeClassName(name).replace(/\s+/g, '').toLowerCase();
  const dupKey = (title, subject, className, question) =>
    [title, subjectKey(subject), classKey(className), question].map((v) => String(v || '').trim().toLowerCase()).join('|');
  const seen = new Set((opts.existing || []).map((q) => dupKey(q.testTitle, q.subject, q.className, q.question)));

  rows.slice(1).forEach((r, index) => {
    const line = index + 2; // row number as shown in Excel (row 1 is the header)
    const fail = (reason) => result.errors.push('Row ' + line + ': ' + reason);

    const title = get(r, c.title) || opts.defaults.title;
    if (!title) return fail('no test title (type one above or add a test_title column).');

    const subjectInput = get(r, c.subject) || opts.defaults.subject;
    const subject = opts.allowedSubjects.find((name) => subjectKey(name) === subjectKey(subjectInput));
    if (!subject) return fail('subject "' + subjectInput + '" is not one of your assigned subjects.');

    const classInput = get(r, c.cls) || opts.defaults.className;
    const className = opts.allowedClasses.find((name) => classKey(name) === classKey(classInput));
    if (!className) return fail('class "' + classInput + '" is not one of your classes.');

    const question = get(r, c.q);
    if (!question) return fail('the question is empty.');

    const options = [get(r, c.a), get(r, c.b), get(r, c.c), get(r, c.d)];
    if (!options[0] || !options[1]) return fail('option A and option B are required.');

    let answer = get(r, c.ans).toUpperCase();
    if (!['A', 'B', 'C', 'D'].includes(answer)) {
      const matched = options.findIndex((o) => o && o.toLowerCase() === get(r, c.ans).toLowerCase());
      answer = matched >= 0 ? 'ABCD'[matched] : '';
    }
    if (!answer) return fail('the answer must be A, B, C or D.');
    if (!options['ABCD'.indexOf(answer)]) return fail('the answer ' + answer + ' points to an empty option.');

    const key = dupKey(title, subject, className, question);
    if (seen.has(key)) { result.duplicates += 1; return; }
    seen.add(key);
    result.questions.push({ testTitle: title, subject, className, question, options, answer });
  });
  return result;
}

function renderTeacherQuestions() {
  const table = document.getElementById('questionTableBody');
  const form = document.getElementById('questionForm');
  const saveButton = document.getElementById('saveQuestionButton');
  const cancelEditButton = document.getElementById('cancelQuestionEdit');
  const data = loadData();
  const teacher = getCurrentTeacher();
  const subjectSelect = document.getElementById('questionSubject');
  const classSelect = document.getElementById('questionClass');
  let editingQuestionIndex = null;
  let pendingDeleteQuestionIndex = null;
  subjectSelect.innerHTML = getTeacherAssignedSubjects(teacher, data).map((subject) => `<option value="${escapeHtml(subject)}">${escapeHtml(subject)}</option>`).join('');
  classSelect.innerHTML = getActiveClasses(data).filter((className) => teacherCanAccessClass(className, teacher))
    .map((className) => `<option value="${escapeHtml(className)}">${escapeHtml(className)}</option>`).join('');

  function resetEditor() {
    editingQuestionIndex = null;
    form.reset();
    saveButton.textContent = 'Save Question';
    cancelEditButton.hidden = true;
  }

  function renderRows() {
    const questions = loadData().questions || [];
    table.innerHTML = questions.length ? questions.map((question, index) => `
      <tr>
        <td>${escapeHtml(question.testTitle || '')}</td>
        <td>${escapeHtml(question.subject)}</td>
        <td>${escapeHtml(question.className)}</td>
        <td>${escapeHtml(question.question)}</td>
        <td>${escapeHtml(question.answer)}</td>
        <td><div class="row-actions">
          <button type="button" data-question-action="edit" data-question-index="${index}">Edit</button>
          <button type="button" class="danger" data-question-action="delete" data-question-index="${index}">Delete</button>
        </div></td>
      </tr>
    `).join('') : '<tr><td colspan="6" class="empty-state">No questions have been added yet.</td></tr>';
  }

  table.addEventListener('click', (event) => {
    const button = event.target.closest('[data-question-action]');
    if (!button) return;
    const index = Number(button.dataset.questionIndex);
    const question = loadData().questions[index];
    if (!question) return;

    if (button.dataset.questionAction === 'edit') {
      editingQuestionIndex = index;
      document.getElementById('questionTestTitle').value = question.testTitle || '';
      [subjectSelect, classSelect].forEach((select, selectIndex) => {
        const value = selectIndex === 0 ? question.subject : question.className;
        if (![...select.options].some((option) => option.value === value)) select.add(new Option(value, value));
        select.value = value;
      });
      document.getElementById('questionText').value = question.question || '';
      ['optionA', 'optionB', 'optionC', 'optionD'].forEach((id, optionIndex) => {
        document.getElementById(id).value = question.options?.[optionIndex] || '';
      });
      document.getElementById('correctAnswer').value = question.answer || 'A';
      saveButton.textContent = 'Update Question';
      cancelEditButton.hidden = false;
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    pendingDeleteQuestionIndex = index;
    openModal('deleteQuestionModal');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const latestData = loadData();
    const testTitle = document.getElementById('questionTestTitle').value.trim();
    const subject = subjectSelect.value;
    const className = classSelect.value;
    if (!testTitle || !subject || !className) return;
    const updatedQuestion = {
      testTitle,
      subject,
      className,
      question: document.getElementById('questionText').value,
      options: [
        document.getElementById('optionA').value,
        document.getElementById('optionB').value,
        document.getElementById('optionC').value,
        document.getElementById('optionD').value,
      ],
      answer: document.getElementById('correctAnswer').value
    };
    const wasEditing = editingQuestionIndex !== null;
    if (wasEditing) latestData.questions[editingQuestionIndex] = updatedQuestion;
    else latestData.questions.push(updatedQuestion);
    recordActivity(latestData, teacher.name, 'Teacher', `${wasEditing ? 'Updated' : 'Added'} a question in ${testTitle}`);
    saveData(latestData);
    showToast(wasEditing ? 'Question updated successfully.' : 'Question saved successfully.');
    renderRows();
    if (wasEditing) resetEditor();
    else ['questionText', 'optionA', 'optionB', 'optionC', 'optionD'].forEach((id) => {
      document.getElementById(id).value = '';
    });
  });

  cancelEditButton.addEventListener('click', resetEditor);
  document.getElementById('cancelQuestionDelete').addEventListener('click', () => {
    pendingDeleteQuestionIndex = null;
    closeModal('deleteQuestionModal');
  });
  document.getElementById('confirmQuestionDelete').addEventListener('click', () => {
    if (pendingDeleteQuestionIndex === null) return;
    const latestData = loadData();
    const [removedQuestion] = latestData.questions.splice(pendingDeleteQuestionIndex, 1);
    if (removedQuestion) {
      recordActivity(latestData, teacher.name, 'Teacher', `Deleted a question from ${removedQuestion.testTitle || removedQuestion.subject}`);
      saveData(latestData);
      showToast('Question deleted. Submitted results were preserved.');
    }
    if (editingQuestionIndex !== null) resetEditor();
    pendingDeleteQuestionIndex = null;
    closeModal('deleteQuestionModal');
    renderRows();
  });
  const csvFile = document.getElementById('csvFile');
  if (csvFile) {
    const csvTitle = document.getElementById('csvTestTitle');
    const csvSubject = document.getElementById('csvSubject');
    const csvClass = document.getElementById('csvClass');
    const csvMessage = document.getElementById('csvImportMessage');
    csvSubject.innerHTML = subjectSelect.innerHTML;
    csvClass.innerHTML = classSelect.innerHTML;
    const allowedSubjects = [...subjectSelect.options].map((option) => option.value);
    const allowedClasses = [...classSelect.options].map((option) => option.value);

    document.getElementById('downloadCsvTemplate').addEventListener('click', () => {
      const lines = [
        ['test_title', 'subject', 'class', 'question', 'option_a', 'option_b', 'option_c', 'option_d', 'answer'],
        ['Mid-term Test', allowedSubjects[0] || 'Mathematics', allowedClasses[0] || 'JSS 1', 'What is 2 + 2?', '3', '4', '5', '6', 'B'],
        ['Mid-term Test', allowedSubjects[0] || 'Mathematics', allowedClasses[0] || 'JSS 1', 'Which number is even?', '7', '9', '12', '15', 'C']
      ].map((cells) => cells.map(csvEscapeCell).join(',')).join('\r\n');
      const url = URL.createObjectURL(new Blob(['\uFEFF' + lines], { type: 'text/csv;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cbt-questions-template.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    });

    document.getElementById('importCsvButton').addEventListener('click', async () => {
      csvMessage.textContent = '';
      const file = csvFile.files[0];
      if (!file) { showErrorModal('Choose a .csv file first.'); return; }
      if (!/\.csv$/i.test(file.name)) { showErrorModal('The file must be a .csv file.'); return; }
      if (file.size > 2 * 1024 * 1024) { showErrorModal('The file is too large. Keep it under 2 MB.'); return; }
      let text;
      try { text = await file.text(); } catch (error) { showErrorModal('Could not read that file.'); return; }

      const result = importQuestionsFromCsv(text, {
        defaults: { title: csvTitle.value.trim(), subject: csvSubject.value, className: csvClass.value },
        allowedSubjects,
        allowedClasses,
        existing: loadData().questions || []
      });
      const problems = result.errors.slice(0, 10).join('\n') + (result.errors.length > 10 ? '\n...and ' + (result.errors.length - 10) + ' more.' : '');
      if (result.fatal) { csvMessage.textContent = result.fatal; showErrorModal(result.fatal); return; }
      if (!result.questions.length) {
        csvMessage.textContent = 'No questions were imported.' + (result.duplicates ? ' ' + result.duplicates + ' already existed.' : '') + (problems ? '\n' + problems : '');
        showErrorModal('No questions were imported. See the details under the button.');
        return;
      }

      const latestData = loadData();
      latestData.questions = latestData.questions || [];
      result.questions.forEach((question) => latestData.questions.push(question));
      const firstTitle = result.questions[0].testTitle;
      recordActivity(latestData, teacher.name, 'Teacher', `Imported ${result.questions.length} questions from a CSV file (${firstTitle})`);
      try {
        saveData(latestData);
      } catch (error) {
        showErrorModal('There is not enough browser storage to save these questions.');
        return;
      }
      renderRows();
      csvFile.value = '';

      showLoginLoader('Saving ' + result.questions.length + ' questions to the database...');
      try {
        if (window.PortalSync) await window.PortalSync.flush();
      } finally {
        hideLoginLoader();
      }
      renderRows();
      const unsaved = (loadData().questions || []).filter((question) => !question._id).length;
      const lines = [];
      if (unsaved === 0) {
        lines.push(result.questions.length + ' question(s) imported and saved to the database.');
        showToast(result.questions.length + ' questions imported and saved to the database.');
      } else {
        lines.push(result.questions.length + ' question(s) imported, but ' + unsaved + ' have not reached the database yet. They are kept in this browser and the portal will retry on the next save.');
      }
      if (result.duplicates) lines.push(result.duplicates + ' duplicate row(s) skipped (already in the list).');
      if (result.errors.length) lines.push(result.errors.length + ' row(s) skipped:\n' + problems);
      csvMessage.textContent = lines.join('\n');
    });
  }

  renderRows();
}

function renderTeacherActivities() {
  const table = document.getElementById('teacherActivityTable');
  const rows = loadData().activities.filter((entry) => entry.role === 'Teacher');
  table.innerHTML = rows.map((entry) => `
    <tr>
      <td>${entry.user}</td>
      <td>${entry.activity}</td>
      <td>${entry.date}</td>
      <td>${entry.time}</td>
    </tr>
  `).join('');
}

function renderAdminDashboard() {
  const data = loadData();
  document.getElementById('totalStudents').textContent = String(data.students.filter((student) => student.status !== 'Inactive').length);
  document.getElementById('totalTeachers').textContent = String(data.teachers.filter((teacher) => teacher.status !== 'Inactive').length);
  document.getElementById('totalClasses').textContent = String(getActiveClasses(data).length);
  document.getElementById('totalSubjects').textContent = String(getActiveSubjects(data).length);
  document.getElementById('cbtTests').textContent = String(data.cbtResults.length);
  document.getElementById('academicResultsTotal').textContent = String(data.academicResults.filter((result) => !result.isDemo).length);
}

// ===== Delete / erase helpers (admin) =====
// Shows a confirmation popup and resolves true/false. If requireText is given, the admin must type it to enable the button.
function confirmAction({ title, message, confirmLabel = 'Delete', requireText = '' }) {
  return new Promise((resolve) => {
    const modal = document.createElement('div');
    modal.className = 'modal open';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="modal-box">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(message)}</p>
        ${requireText ? `<div class="filter-group" style="margin-top: 1rem;"><label for="confirmActionInput">Type ${escapeHtml(requireText)} to confirm</label><input id="confirmActionInput" type="text" autocomplete="off" /></div>` : ''}
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" data-confirm="no">Cancel</button>
          <button type="button" class="btn btn-danger" data-confirm="yes"${requireText ? ' disabled' : ''}>${escapeHtml(confirmLabel)}</button>
        </div>
      </div>`;
    const finish = (answer) => {
      document.removeEventListener('keydown', onKey);
      modal.remove();
      resolve(answer);
    };
    const onKey = (event) => { if (event.key === 'Escape') finish(false); };
    document.addEventListener('keydown', onKey);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) finish(false);
      const choice = event.target.closest('[data-confirm]');
      if (choice) finish(choice.dataset.confirm === 'yes');
    });
    document.body.appendChild(modal);
    const input = modal.querySelector('#confirmActionInput');
    if (input) {
      input.addEventListener('input', () => {
        modal.querySelector('[data-confirm="yes"]').disabled = input.value.trim() !== requireText;
      });
      input.focus();
    }
  });
}

function removeStudentRecords(data, studentId) {
  data.students = data.students.filter((student) => student.id !== studentId);
  data.academicResults = (data.academicResults || []).filter((result) => result.studentId !== studentId);
  data.cbtResults = (data.cbtResults || []).filter((result) => result.studentId !== studentId);
  Object.keys(data.reportDetails || {}).forEach((key) => {
    if (key.startsWith(`${studentId}|`)) delete data.reportDetails[key];
  });
}

function removeSubjectRecords(data, subject) {
  const same = (value) => String(value || '').toLowerCase() === subject.toLowerCase();
  data.subjects = data.subjects.filter((item) => !same(item));
  data.inactiveSubjects = (data.inactiveSubjects || []).filter((item) => !same(item));
  data.academicResults = (data.academicResults || []).filter((result) => !same(result.subject));
  data.teachers.forEach((teacher) => {
    if (Array.isArray(teacher.assignedSubjects)) teacher.assignedSubjects = teacher.assignedSubjects.filter((item) => !same(item));
    if (same(teacher.subject)) teacher.subject = '';
  });
}

// Clears people, scores and activity. Keeps admin accounts and school settings. Classes and subjects only if includeStructure is true.
function eraseAllData(data, includeStructure) {
  data.students = [];
  data.teachers = [];
  data.academicResults = [];
  data.cbtResults = [];
  data.questions = [];
  data.activities = [];
  data.reportDetails = {};
  data.reportMeta = {};
  if (includeStructure) {
    data.classes = [];
    data.subjects = [];
    data.inactiveClasses = [];
    data.inactiveSubjects = [];
  }
}

function renderAdminStudents() {
  const table = document.getElementById('adminStudentsTableBody');
  const form = document.getElementById('addStudentForm');
  const classSelect = document.getElementById('studentClass');
  classSelect.innerHTML = getActiveClasses(loadData()).map((className) => `<option value="${escapeHtml(className)}">${escapeHtml(className)}</option>`).join('');
  const renderRows = () => {
    table.innerHTML = loadData().students.map((student) => `
      <tr>
        <td>${escapeHtml(student.id)}</td>
        <td>${escapeHtml(student.name)}</td>
        <td>${escapeHtml(student.className)}</td>
        <td>${escapeHtml(student.dateOfBirth || 'Not provided')}</td>
        <td>${escapeHtml(student.session)}</td>
        <td><span class="badge ${student.status === 'Inactive' ? 'default' : 'success'}">${escapeHtml(student.status || 'Active')}</span></td>
        <td><div class="row-actions">
          <button type="button" class="${student.status === 'Inactive' ? 'btn-primary' : 'danger'}" data-student-status="${escapeHtml(student.id)}">${student.status === 'Inactive' ? 'Activate' : 'Deactivate'}</button>
          <button type="button" class="danger" data-student-delete="${escapeHtml(student.id)}">Delete</button>
        </div></td>
      </tr>
    `).join('');
  };

  table.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('[data-student-delete]');
    if (deleteButton) {
      const target = loadData().students.find((item) => item.id === deleteButton.dataset.studentDelete);
      if (!target) return;
      confirmAction({
        title: `Delete ${target.name}?`,
        message: 'This permanently removes the student and all of their saved academic results, CBT results and report card details. It cannot be undone.'
      }).then((confirmed) => {
        if (!confirmed) return;
        const latest = loadData();
        removeStudentRecords(latest, target.id);
        recordActivity(latest, getCurrentAdmin().name, 'Admin', `Deleted student ${target.name}`);
        saveData(latest);
        renderRows();
        showToast('Student deleted.');
      });
      return;
    }
    const button = event.target.closest('[data-student-status]');
    if (!button) return;
    const data = loadData();
    const student = data.students.find((item) => item.id === button.dataset.studentStatus);
    if (!student) return;
    student.status = student.status === 'Inactive' ? 'Active' : 'Inactive';
    recordActivity(data, getCurrentAdmin().name, 'Admin', `${student.status === 'Inactive' ? 'Deactivated' : 'Activated'} student ${student.name}`);
    saveData(data);
    renderRows();
    showToast(`Student ${student.status.toLowerCase()}.`);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = loadData();
    const id = document.getElementById('studentId').value.trim().toUpperCase();
    const photoFile = document.getElementById('studentPhoto').files[0];
    if (data.students.some((student) => student.id.toLowerCase() === id.toLowerCase())) {
      showErrorModal('That student ID already exists.');
      return;
    }
    const typedStudentPassword = document.getElementById('studentPassword').value.trim();
    if (typedStudentPassword && typedStudentPassword.length < 6) {
      showErrorModal('Password must be at least 6 characters.');
      return;
    }

    const addStudent = (photoDataUrl = '') => {
      data.students.push({
        id,
        name: document.getElementById('studentName').value.trim(),
        className: document.getElementById('studentClass').value,
        dateOfBirth: document.getElementById('studentDateOfBirth').value,
        session: document.getElementById('studentSession').value.trim(),
        password: document.getElementById('studentPassword').value.trim() || '123456',
        status: document.getElementById('studentStatus').value,
        photoDataUrl
      });
      try {
        saveData(data);
      } catch (error) {
        data.students.pop();
        showErrorModal('There is not enough browser storage to save this student.');
        return;
      }
      showToast('Student added successfully.');
      renderRows();
      form.reset();
      document.getElementById('studentSession').value = '2026/2027';
    };

    if (!photoFile) {
      addStudent();
      return;
    }
    if (!photoFile.type.startsWith('image/')) {
      showErrorModal('Choose a valid image file.');
      return;
    }
    compressImageFile(photoFile, 400).then(addStudent).catch((error) => showErrorModal(error.message));
  });
  renderRows();
}

function renderAdminTeachers() {
  const table = document.getElementById('adminTeachersTableBody');
  const form = document.getElementById('addTeacherForm');
  const editForm = document.getElementById('editTeacherForm');
  const classSelect = document.getElementById('teacherClass');
  const subjectOptions = document.getElementById('teacherSubjectOptions');
  const editSubjectOptions = document.getElementById('editTeacherSubjectOptions');
  let editingTeacherId = null;
  const renderSubjectOptions = (container, selectedSubjects = []) => {
    const previouslySelected = [...container.querySelectorAll('input:checked')].map((input) => input.value);
    const selected = new Set((selectedSubjects.length ? selectedSubjects : previouslySelected).map((subject) => subject.toLowerCase()));
    const subjects = getActiveSubjects(loadData());
    container.innerHTML = subjects.length ? subjects.map((subject) => `
      <label class="assignment-option">
        <input type="checkbox" value="${escapeHtml(subject)}" ${selected.has(subject.toLowerCase()) ? 'checked' : ''}>
        <span>${escapeHtml(subject)}</span>
      </label>
    `).join('') : '<span class="muted">Add subjects before assigning them.</span>';
  };
  const refreshAssignmentOptions = () => {
    const data = loadData();
    const currentClass = classSelect.value;
    const activeClasses = getActiveClasses(data);
    classSelect.innerHTML = activeClasses.map((className) => `<option value="${escapeHtml(className)}">${escapeHtml(className)}</option>`).join('');
    if (activeClasses.includes(currentClass)) classSelect.value = currentClass;
    renderSubjectOptions(subjectOptions);
    renderSubjectOptions(editSubjectOptions);
  };
  refreshAssignmentOptions();
  window.addEventListener('storage', (event) => {
    if (event.key === 'schoolPortalData') refreshAssignmentOptions();
  });
  const renderRows = () => {
    table.innerHTML = loadData().teachers.map((teacher) => `
      <tr>
        <td>${teacher.photoDataUrl ? `<img class="student-table-photo" src="${teacher.photoDataUrl}" alt="${escapeHtml(teacher.name)}">` : '<span class="student-table-photo-placeholder">-</span>'}</td>
        <td>${escapeHtml(teacher.id)}</td>
        <td>${escapeHtml(teacher.name)}</td>
        <td>${escapeHtml(getTeacherAssignedSubjects(teacher).join(', '))}</td>
        <td>${escapeHtml(getTeacherAssignedClasses(teacher).join(', '))}</td>
        <td><span class="badge ${teacher.status === 'Active' ? 'success' : 'default'}">${escapeHtml(teacher.status || 'Active')}</span></td>
        <td><div class="row-actions">
          <button type="button" data-teacher-action="view" data-teacher-id="${escapeHtml(teacher.id)}">View</button>
          <button type="button" data-teacher-action="edit" data-teacher-id="${escapeHtml(teacher.id)}">Edit</button>
          <button type="button" data-teacher-action="photo" data-teacher-id="${escapeHtml(teacher.id)}">Photo</button>
          <input id="teacher-photo-${escapeHtml(teacher.id)}" type="file" accept="image/*" data-teacher-photo="${escapeHtml(teacher.id)}" hidden>
          <button type="button" class="danger" data-teacher-action="toggle-status" data-teacher-id="${escapeHtml(teacher.id)}">${teacher.status === 'Inactive' ? 'Activate' : 'Deactivate'}</button>
          <button type="button" class="danger" data-teacher-action="delete" data-teacher-id="${escapeHtml(teacher.id)}">Delete</button>
        </div></td>
      </tr>
    `).join('');
  };

  table.addEventListener('click', (event) => {
    const button = event.target.closest('[data-teacher-action]');
    if (!button) return;
    const id = button.dataset.teacherId;
    const data = loadData();
    const teacher = data.teachers.find((item) => item.id === id);
    if (!teacher) return;

    if (button.dataset.teacherAction === 'delete') {
      confirmAction({
        title: `Delete ${teacher.name}?`,
        message: 'This permanently removes the teacher account. Scores they entered stay with the students. It cannot be undone.'
      }).then((confirmed) => {
        if (!confirmed) return;
        const latest = loadData();
        latest.teachers = latest.teachers.filter((item) => item.id !== id);
        recordActivity(latest, getCurrentAdmin().name, 'Admin', `Deleted teacher ${teacher.name}`);
        saveData(latest);
        renderRows();
        showToast('Teacher deleted.');
      });
      return;
    }
    if (button.dataset.teacherAction === 'photo') {
      button.parentElement.querySelector('[data-teacher-photo]').click();
      return;
    }
    if (button.dataset.teacherAction === 'view') {
      window.alert(`Name: ${teacher.name}\nTeacher ID: ${teacher.id}\nSubjects: ${getTeacherAssignedSubjects(teacher).join(', ')}\nClass: ${getTeacherAssignedClasses(teacher).join(', ')}\nStatus: ${teacher.status || 'Active'}`);
      return;
    }
    if (button.dataset.teacherAction === 'edit') {
      editingTeacherId = id;
      document.getElementById('editTeacherName').value = teacher.name;
      const assignedSubjects = Array.isArray(teacher.assignedSubjects) ? teacher.assignedSubjects : [teacher.subject].filter(Boolean);
      renderSubjectOptions(editSubjectOptions, assignedSubjects);
      document.getElementById('editTeacherClasses').value = getTeacherAssignedClasses(teacher).join(', ');
      openModal('editTeacherModal');
      document.getElementById('editTeacherName').focus();
      return;
    } else {
      teacher.status = teacher.status === 'Inactive' ? 'Active' : 'Inactive';
      recordActivity(data, getCurrentAdmin().name, 'Admin', `${teacher.status === 'Inactive' ? 'Deactivated' : 'Activated'} teacher ${teacher.name}`);
    }

    try {
      saveData(data);
      renderRows();
      showToast(button.dataset.teacherAction === 'edit' ? 'Teacher updated.' : `Teacher ${teacher.status.toLowerCase()}.`);
    } catch (error) {
      showErrorModal('Could not save the teacher changes.');
    }
  });

  document.getElementById('cancelTeacherEdit').addEventListener('click', () => {
    editingTeacherId = null;
    closeModal('editTeacherModal');
  });

  document.getElementById('editTeacherModal').addEventListener('click', (event) => {
    if (event.target.id === 'editTeacherModal') closeModal('editTeacherModal');
  });

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('editTeacherName').value.trim();
    const assignedSubjects = [...editSubjectOptions.querySelectorAll('input:checked')].map((input) => input.value);
    const assignedClasses = [...new Set(document.getElementById('editTeacherClasses').value
      .split(',').map((className) => normalizeClassName(className)).filter(Boolean))];
    if (!name || !assignedSubjects.length || !assignedClasses.length) {
      showErrorModal('Name, at least one subject, and at least one class are required.');
      return;
    }
    const data = loadData();
    const teacher = data.teachers.find((item) => item.id === editingTeacherId);
    if (!teacher) {
      closeModal('editTeacherModal');
      return;
    }
    teacher.name = name;
    teacher.subject = assignedSubjects[0];
    teacher.assignedSubjects = assignedSubjects;
    teacher.className = assignedClasses[0];
    teacher.assignedClasses = assignedClasses;
    try {
      saveData(data);
      editingTeacherId = null;
      closeModal('editTeacherModal');
      renderRows();
      showToast('Teacher updated.');
    } catch (error) {
      showErrorModal('Could not save the teacher changes.');
    }
  });

  table.addEventListener('change', (event) => {
    const input = event.target.closest('[data-teacher-photo]');
    const file = input?.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showErrorModal('Choose a valid image file.');
      input.value = '';
      return;
    }
    compressImageFile(file).then((photoDataUrl) => {
      const data = loadData();
      const teacher = data.teachers.find((item) => item.id === input.dataset.teacherPhoto);
      if (!teacher) return;
      teacher.photoDataUrl = photoDataUrl;
      saveData(data);
      renderRows();
      showToast('Teacher photo updated.');
    }).catch((error) => showErrorModal(error.message));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = loadData();
    const id = document.getElementById('teacherId').value.trim().toUpperCase();
    const photoFile = document.getElementById('teacherPhoto').files[0];
    if (data.teachers.some((teacher) => teacher.id.toLowerCase() === id.toLowerCase())) {
      showErrorModal('That teacher ID already exists.');
      return;
    }
    const typedTeacherPassword = document.getElementById('teacherPassword').value.trim();
    if (typedTeacherPassword && typedTeacherPassword.length < 6) {
      showErrorModal('Password must be at least 6 characters.');
      return;
    }
    const assignedSubjects = [...subjectOptions.querySelectorAll('input:checked')].map((input) => input.value);
    if (!classSelect.value || !assignedSubjects.length) {
      showErrorModal('Add a class and at least one subject before creating a teacher.');
      return;
    }
    if (photoFile && !photoFile.type.startsWith('image/')) {
      showErrorModal('Choose a valid image file.');
      return;
    }
    const addTeacher = (photoDataUrl = '') => {
      const teacher = {
        id,
        name: document.getElementById('teacherName').value.trim(),
        password: document.getElementById('teacherPassword').value.trim() || '123456',
        status: document.getElementById('teacherStatus').value,
        className: normalizeClassName(classSelect.value),
        subject: assignedSubjects[0],
        assignedSubjects,
        photoDataUrl
      };
      data.teachers.push(teacher);
      try {
        saveData(data);
      } catch (error) {
        showErrorModal('Could not save the teacher. Browser storage may be full.');
        return;
      }
      showToast('Teacher added successfully.');
      renderRows();
      form.reset();
    };
    if (photoFile) compressImageFile(photoFile).then(addTeacher).catch((error) => showErrorModal(error.message));
    else addTeacher();
  });
  renderRows();
}

function renderAdminClasses() {
  const table = document.getElementById('adminClassesTableBody');
  const form = document.getElementById('addClassForm');
  const renderRows = () => {
    const data = loadData();
    const inactiveClasses = new Set(data.inactiveClasses || []);
    table.innerHTML = data.classes.map((className) => {
      const inactive = inactiveClasses.has(className);
      return `
        <tr>
          <td>${escapeHtml(className)}</td>
          <td><span class="badge ${inactive ? 'default' : 'success'}">${inactive ? 'Inactive' : 'Active'}</span></td>
          <td><div class="row-actions">
            <button type="button" class="${inactive ? 'btn-primary' : 'danger'}" data-class-status="${escapeHtml(className)}">${inactive ? 'Activate' : 'Deactivate'}</button>
            <button type="button" class="danger" data-class-delete="${escapeHtml(className)}">Delete</button>
          </div></td>
        </tr>
      `;
    }).join('');
  };

  table.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('[data-class-delete]');
    if (deleteButton) {
      const className = deleteButton.dataset.classDelete;
      const studentCount = loadData().students.filter((student) => normalizeClassName(student.className) === className).length;
      if (studentCount) {
        showErrorModal(`${className} still has ${studentCount} student(s). Delete or move them first.`);
        return;
      }
      confirmAction({
        title: `Delete class ${className}?`,
        message: 'This permanently removes the class. It cannot be undone.'
      }).then((confirmed) => {
        if (!confirmed) return;
        const latest = loadData();
        latest.classes = latest.classes.filter((item) => item !== className);
        latest.inactiveClasses = (latest.inactiveClasses || []).filter((item) => item !== className);
        latest.teachers.forEach((teacher) => {
          if (Array.isArray(teacher.assignedClasses)) teacher.assignedClasses = teacher.assignedClasses.filter((item) => item !== className);
        });
        recordActivity(latest, getCurrentAdmin().name, 'Admin', `Deleted class ${className}`);
        saveData(latest);
        renderRows();
        showToast('Class deleted.');
      });
      return;
    }
    const button = event.target.closest('[data-class-status]');
    if (!button) return;
    const data = loadData();
    const className = button.dataset.classStatus;
    data.inactiveClasses = data.inactiveClasses || [];
    const inactive = data.inactiveClasses.includes(className);
    data.inactiveClasses = inactive
      ? data.inactiveClasses.filter((item) => item !== className)
      : [...data.inactiveClasses, className];
    recordActivity(data, getCurrentAdmin().name, 'Admin', `${inactive ? 'Activated' : 'Deactivated'} class ${className}`);
    saveData(data);
    renderRows();
    showToast(`Class ${inactive ? 'activated' : 'deactivated'}.`);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = normalizeClassName(document.getElementById('className').value);
    if (!value) return;
    const data = loadData();
    if (data.classes.some((className) => className.toLowerCase() === value.toLowerCase())) {
      showErrorModal('That class already exists.');
      return;
    }
    data.classes.push(value);
    saveData(data);
    showToast('Class added successfully.');
    renderRows();
    form.reset();
  });
  renderRows();
}

function renderAdminSubjects() {
  const table = document.getElementById('adminSubjectsTableBody');
  const form = document.getElementById('addSubjectFormAdmin');
  const renderRows = () => {
    const data = loadData();
    const inactiveSubjects = new Set((data.inactiveSubjects || []).map((subject) => subject.toLowerCase()));
    table.innerHTML = data.subjects.map((subject) => {
      const inactive = inactiveSubjects.has(subject.toLowerCase());
      return `
        <tr>
          <td>${escapeHtml(subject)}</td>
          <td><span class="badge ${inactive ? 'default' : 'success'}">${inactive ? 'Inactive' : 'Active'}</span></td>
          <td><div class="row-actions">
            <button type="button" class="${inactive ? 'btn-primary' : 'danger'}" data-subject-status="${escapeHtml(subject)}">${inactive ? 'Activate' : 'Deactivate'}</button>
            <button type="button" class="danger" data-subject-delete="${escapeHtml(subject)}">Delete</button>
          </div></td>
        </tr>
      `;
    }).join('');
  };

  table.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('[data-subject-delete]');
    if (deleteButton) {
      const subject = deleteButton.dataset.subjectDelete;
      confirmAction({
        title: `Delete ${subject}?`,
        message: 'This permanently removes the subject, takes it off every teacher, and deletes all saved scores for it. Use Deactivate instead if you only want to hide it. It cannot be undone.'
      }).then((confirmed) => {
        if (!confirmed) return;
        const latest = loadData();
        removeSubjectRecords(latest, subject);
        recordActivity(latest, getCurrentAdmin().name, 'Admin', `Deleted subject ${subject}`);
        saveData(latest);
        renderRows();
        showToast('Subject deleted.');
      });
      return;
    }
    const button = event.target.closest('[data-subject-status]');
    if (!button) return;
    const subject = button.dataset.subjectStatus;
    const data = loadData();
    data.inactiveSubjects = data.inactiveSubjects || [];
    const inactive = data.inactiveSubjects.some((item) => item.toLowerCase() === subject.toLowerCase());
    data.inactiveSubjects = inactive
      ? data.inactiveSubjects.filter((item) => item.toLowerCase() !== subject.toLowerCase())
      : [...data.inactiveSubjects, subject];
    recordActivity(data, getCurrentAdmin().name, 'Admin', `${inactive ? 'Activated' : 'Deactivated'} subject ${subject}`);
    saveData(data);
    renderRows();
    showToast(`Subject ${inactive ? 'activated' : 'deactivated'}. Existing results are preserved.`);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = document.getElementById('adminSubjectName').value.trim();
    if (!value) return;
    const data = loadData();
    if (data.subjects.some((subject) => subject.toLowerCase() === value.toLowerCase())) {
      showErrorModal('That subject already exists.');
      return;
    }
    data.subjects.push(value);
    saveData(data);
    showToast('Subject added successfully.');
    renderRows();
    form.reset();
  });
  renderRows();
}

function renderAdminCbtResults() {
  const table = document.getElementById('adminCbtTableBody');
  const rows = loadData().cbtResults;
  table.innerHTML = rows.map((row) => `
    <tr>
      <td>${row.student}</td>
      <td>${row.className}</td>
      <td>${row.subject}</td>
      <td>${row.score}</td>
      <td>${row.percentage}%</td>
      <td>${row.date}</td>
    </tr>
  `).join('');
}

function renderAdminAcademicResults() {
  const classSelect = document.getElementById('adminResultClassFilter');
  const studentSelect = document.getElementById('adminResultStudentFilter');
  const termSelect = document.getElementById('adminResultTermFilter');
  const sessionSelect = document.getElementById('adminResultSessionFilter');
  const card = document.getElementById('adminReportCard');
  const initialData = loadData();
  const option = (value, label) => `<option value="${escapeHtml(value)}">${escapeHtml(label || value)}</option>`;

  const configuredClasses = getActiveClasses(initialData).map(normalizeClassName);
  const classes = configuredClasses.length ? configuredClasses
    : [...new Set(initialData.students.map((student) => normalizeClassName(student.className)).filter(Boolean))];
  classSelect.innerHTML = classes.map((name) => option(name)).join('');
  termSelect.innerHTML = ['First Term', 'Second Term', 'Third Term'].map((term) => option(term)).join('');
  const sessions = [...new Set([...initialData.students.map((student) => student.session), ...initialData.academicResults.map((result) => result.session)].filter(Boolean))];
  sessionSelect.innerHTML = sessions.map((session) => option(session)).join('');
  if (sessions.includes('2026/2027')) sessionSelect.value = '2026/2027';

  function fillStudents() {
    const list = loadData().students
      .filter((student) => normalizeClassName(student.className) === classSelect.value && student.status !== 'Inactive')
      .sort((first, second) => first.name.localeCompare(second.name));
    studentSelect.innerHTML = list.map((student) => option(student.id, `${student.name} (${student.id})`)).join('');
  }

  function renderReport() {
    const data = loadData();
    const student = data.students.find((item) => item.id === studentSelect.value);
    card.innerHTML = student
      ? buildReportCardHtml(data, student, termSelect.value, sessionSelect.value)
      : '<p class="empty-state">No students in this class.</p>';
  }

  classSelect.addEventListener('change', () => { fillStudents(); renderReport(); });
  [studentSelect, termSelect, sessionSelect].forEach((select) => select.addEventListener('change', renderReport));
  document.getElementById('downloadAdminResults').addEventListener('click', () => {
    const table = card.querySelector('.rc-table');
    if (!table) { showErrorModal('Choose a student with results first.'); return; }
    downloadTableCsv(table, `report-card-${studentSelect.value || 'student'}.csv`);
  });
  document.getElementById('printAdminResults').addEventListener('click', () => window.print());
  fillStudents();
  renderReport();
}

function renderAdminActivities() {
  const table = document.getElementById('adminActivityTable');
  const rows = loadData().activities;
  table.innerHTML = rows.map((entry) => `
    <tr>
      <td>${entry.user}</td>
      <td>${entry.role}</td>
      <td>${entry.activity}</td>
      <td>${entry.date}</td>
      <td>${entry.time}</td>
    </tr>
  `).join('');
}

function renderAdminSettings() {
  const schoolNameInput = document.getElementById('schoolNameSetting');
  const status = document.getElementById('settingStatus');
  schoolNameInput.value = loadData().settings?.schoolName || '';
  document.getElementById('schoolSettingsForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = loadData();
    data.settings = { ...(data.settings || {}), schoolName: schoolNameInput.value.trim() };
    saveData(data);
    status.textContent = data.settings.schoolName ? 'School name saved.' : 'School name cleared.';
    showToast('School settings saved.');
  });

  const eraseButton = document.getElementById('eraseDataButton');
  if (eraseButton) {
    eraseButton.addEventListener('click', () => {
      const includeStructure = document.getElementById('eraseStructure').checked;
      confirmAction({
        title: 'Erase data?',
        message: `This permanently deletes all students, teachers, academic results, CBT questions and results, report card details and activity history${includeStructure ? ', plus all classes and subjects' : ''}. Admin accounts and school settings are kept. It cannot be undone.`,
        confirmLabel: 'Erase data',
        requireText: 'ERASE'
      }).then((confirmed) => {
        if (!confirmed) return;
        const latest = loadData();
        eraseAllData(latest, includeStructure);
        recordActivity(latest, getCurrentAdmin().name, 'Admin', 'Erased portal data');
        saveData(latest);
        showToast('All data erased.');
        document.getElementById('eraseStatus').textContent = 'Data erased.';
      });
    });
  }
}

window.logout = logout;