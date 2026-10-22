
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
document.getElementById('themeToggleMobile')?.addEventListener('click', toggleTheme);

if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('hidden');
});


let currentStep = 1;
let quizAnswers = { frontend: 0, backend: 0, database: 0 };
const questions = [
    {
        step: 1, title: "ما هو المجال التقني الذي تفضل التعمق فيه؟", progress: "33%",
        options: [
            { type: 'frontend', title: 'تصميم الواجهات والصفحات', desc: 'الأشكال والتفاعل البصري.', icon: 'fa-desktop' },
            { type: 'backend', title: 'بناء الخوادم والـ APIs', desc: 'المنطق البرمجي والربط.', icon: 'fa-server' },
            { type: 'database', title: 'إدارة وتصميم قواعد البيانات', desc: 'الجداول، الاستعلامات، والـ SQL.', icon: 'fa-database' }
        ]
    },
    {
        step: 2, title: "ما هي الأدوات التي تميل لاستخدامها أكثر؟", progress: "66%",
        options: [
            { type: 'frontend', title: 'HTML, CSS, JS, React', desc: 'تقنيات متصفح المستخدم.', icon: 'fa-code' },
            { type: 'backend', title: 'Java, Spring Boot, Node.js', desc: 'لغات الخادم والمنطق.', icon: 'fa-network-wired' },
            { type: 'database', title: 'Transact-SQL, MySQL, Oracle', desc: 'إدارة البيانات والجداول.', icon: 'fa-table' }
        ]
    },
    {
        step: 3, title: "كيف تحب أن تكون مخرجات مشروعك النهائي؟", progress: "100%",
        options: [
            { type: 'frontend', title: 'موقع ويب تفاعلي وجذاب', desc: 'تجربة مستخدم مذهلة.', icon: 'fa-eye' },
            { type: 'backend', title: 'نظام خلفي قوي وآمن', desc: 'معالجة طلبات سريعة.', icon: 'fa-shield-halved' },
            { type: 'database', title: 'قاعدة بيانات منظمة ومستقرة', desc: 'تخزين واسترجاع بيانات كفء.', icon: 'fa-hard-drive' }
        ]
    }
];

function renderQuestion() {
    const q = questions[currentStep - 1];
    document.getElementById('quizProgressBar').style.width = q.progress;
    document.getElementById('questionStep').innerText = q.step;
    document.getElementById('questionTitle').innerText = q.title;
    document.getElementById('optionsContainer').innerHTML = q.options.map(opt => `
                <button onclick="selectOption('${opt.type}')" class="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 text-right transition transform hover:scale-105 shadow-sm">
                    <div class="flex items-center space-x-3 space-x-reverse">
                        <div class="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center">
                            <i class="fa-solid ${opt.icon} text-base"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">${opt.title}</h4>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${opt.desc}</p>
                        </div>
                    </div>
                </button>
            `).join('');
}

function selectOption(type) {
    quizAnswers[type]++;
    if (currentStep < questions.length) {
        currentStep++;
        renderQuestion();
    } else {
        document.getElementById('quizContent').classList.add('hidden');
        document.getElementById('quizResult').classList.remove('hidden');

        let maxKey = 'frontend';
        if (quizAnswers.backend > quizAnswers.frontend && quizAnswers.backend >= quizAnswers.database) maxKey = 'backend';
        if (quizAnswers.database > quizAnswers.frontend && quizAnswers.database > quizAnswers.backend) maxKey = 'database';

        const titles = {
            frontend: 'تطوير واجهات المستخدم (Front-End)',
            backend: 'تطوير الخلفيات (Back-End)',
            database: 'برمجيات قواعد البيانات (Databases)'
        };
        const descs = {
            frontend: 'يميل شغفك لتصميم وبناء واجهات المستخدم التفاعلية العصرية.',
            backend: 'يميل شغفك لبناء الخوادم والمنطق البرمجي والـ APIs.',
            database: 'يميل شغفك لتصميم الجداول وإدارة قواعد البيانات المتقدمة!'
        };

        document.getElementById('recommendedPathTitle').innerText = titles[maxKey];
        document.getElementById('recommendedPathDesc').innerText = descs[maxKey];
        switchPath(maxKey);
    }
}

function resetQuiz() {
    currentStep = 1; quizAnswers = { frontend: 0, backend: 0, database: 0 };
    document.getElementById('quizResult').classList.add('hidden');
    document.getElementById('quizContent').classList.remove('hidden');
    renderQuestion();
}
renderQuestion();


const pathsData = {
    frontend: {
        title: "مسار تطوير واجهات المستخدم (Front-End)",
        skills: [
            { id: 'fe_1', name: 'أساسيات HTML5 & CSS3', desc: 'هيكلة وتنسيق صفحات الويب باحترافية.', level: 'مبتدئ', icon: 'fa-code', resources: ['دورة عبدالرحمن جمال', 'MDN Web Docs'] },
            { id: 'fe_2', name: 'أساسيات JavaScript', desc: 'التحكم بعناصر الصفحة وكتابة المنطق.', level: 'مبتدئ', icon: 'fa-square-js', resources: ['JavaScript.info', 'FreeCodeCamp'] },
            { id: 'fe_3', name: 'إتقان Tailwind CSS', desc: 'بناء واجهات عصرية فائقة السرعة.', level: 'متوسط', icon: 'fa-wind', resources: ['التوثيق الرسمي', 'Tailwind Labs'] },
            { id: 'fe_4', name: 'Git & GitHub', desc: 'إدارة ورفع الأكواد على الإنترنت.', level: 'متوسط', icon: 'fa-code-branch', resources: ['دورة حسونة أكاديمي', 'GitHub Guides'] },
            { id: 'fe_5', name: 'مكتبة React.js', desc: 'بناء تطبيقات ويب تفاعلية متطورة.', level: 'متقدم', icon: 'fa-brands fa-react', resources: ['React Docs', 'Scrimba Course'] }
        ]
    },
    backend: {
        title: "مسار تطوير الخلفيات (Back-End)",
        skills: [
            { id: 'be_1', name: 'أساسيات لغة Java', desc: 'فهم مفاهيم البرمجة كائنية التوجه (OOP).', level: 'مبتدئ', icon: 'fa-cup-hot', resources: ['حسونة أكاديمي (Java)', 'Oracle Java Docs'] },
            { id: 'be_2', name: 'أساسيات Node.js', desc: 'تشغيل الجافا سكريبت خارج المتصفح.', level: 'مبتدئ', icon: 'fa-node-js', resources: ['Node.js Docs', 'NetNinja Course'] },
            { id: 'be_3', name: 'إطار العمل Spring Boot', desc: 'بناء تطبيقات ويب قوية بلغة جافا.', level: 'متوسط', icon: 'fa-leaf', resources: ['Spring.io Guides', 'Baeldung'] },
            { id: 'be_4', name: 'بناء واجهات الـ REST APIs', desc: 'ربط الخادم بقواعد البيانات وواجهات المستخدم.', level: 'متوسط', icon: 'fa-network-wired', resources: ['Postman Learning', 'FreeCodeCamp'] },
            { id: 'be_5', name: 'أمان وتوثيق الخوادم (Security)', desc: 'حماية البيانات المصادقة (JWT & OAuth).', level: 'متقدم', icon: 'fa-shield-halved', resources: ['OWASP Top 10', 'Spring Security Docs'] }
        ]
    },
    database: {
        title: "مسار برمجيات قواعد البيانات (Databases)",
        skills: [
            { id: 'db_1', name: 'مفاهيم قواعد البيانات العلائقية', desc: 'تصميم الجداول والعلاقات (ERD).', level: 'مبتدئ', icon: 'fa-database', resources: ['المقرر الجامعي', 'Database Design Basics'] },
            { id: 'db_2', name: 'لغة الاستعلام Transact-SQL', desc: 'كتابة استعلامات (Select, Join, Insert).', level: 'مبتدئ', icon: 'fa-table', resources: ['SQLZoo', 'W3Schools SQL'] },
            { id: 'db_3', name: 'الاجراءات المخزنة (Stored Procedures)', desc: 'برمجة منطق قاعدة البيانات.', level: 'متوسط', icon: 'fa-gears', resources: ['SQL Server Docs', 'Hassouna Academy'] },
            { id: 'db_4', name: 'المخازن المؤقتة والـ Triggers', desc: 'أتمتة العمليات داخل قاعدة البيانات.', level: 'متوسط', icon: 'fa-bolt', resources: ['Advanced T-SQL', 'DB Documentation'] },
            { id: 'db_5', name: 'إدارة قواعد البيانات والنسخ الاحتياطي', desc: 'عمل نسخ احتياطية واستعادة البيانات (Backup & Restore).', level: 'متقدم', icon: 'fa-hard-drive', resources: ['Database Administration Guides', 'Oracle Docs'] }
        ]
    }
};

let currentActivePath = 'frontend';

function switchPath(pathKey) {
    currentActivePath = pathKey;
    ['frontend', 'backend', 'database'].forEach(key => {
        const btn = document.getElementById(`btn-${key}`);
        if (key === pathKey) {
            btn.className = "px-5 py-2.5 rounded-2xl font-bold text-xs transition transform hover:scale-105 bg-primary-600 text-white shadow-md";
        } else {
            btn.className = "px-5 py-2.5 rounded-2xl font-bold text-xs transition transform hover:scale-105 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800";
        }
    });
    document.getElementById('currentPathHeader').innerText = pathsData[pathKey].title;
    renderSkillTree();
}

function getCompletedSkillsForPath() {
    return JSON.parse(localStorage.getItem(`masari_skills_${currentActivePath}`) || '[]');
}

function renderSkillTree() {
    const currentSkills = pathsData[currentActivePath].skills;
    const completedSkills = getCompletedSkillsForPath();
    const container = document.getElementById('skillTreeContainer');

    container.innerHTML = currentSkills.map(skill => {
        const isDone = completedSkills.includes(skill.id);
        return `
                    <div class="bg-white dark:bg-slate-900 p-5 rounded-3xl border ${isDone ? 'border-emerald-500 shadow-emerald-500/10' : 'border-slate-200 dark:border-slate-800'} shadow-md space-y-3 relative transition transform hover:-translate-y-2 hover:scale-[1.02] duration-300">
                        <div class="flex items-center justify-between">
                            <div class="w-9 h-9 rounded-xl ${isDone ? 'bg-emerald-100 text-emerald-600' : 'bg-primary-50 dark:bg-primary-950 text-primary-600'} flex items-center justify-center text-base font-bold">
                                <i class="fa-solid ${skill.icon}"></i>
                            </div>
                            <span class="text-[10px] px-2.5 py-0.5 rounded-full ${isDone ? 'bg-emerald-100 text-emerald-700 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}">
                                ${isDone ? 'مكتملة ✓' : skill.level}
                            </span>
                        </div>
                        <h3 class="text-sm font-black text-slate-900 dark:text-white">${skill.name}</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${skill.desc}</p>
                        <div class="pt-1 flex items-center gap-2">
                            <button onclick="openSkillModal('${skill.id}')" class="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold transition">التفاصيل</button>
                            <button onclick="toggleSkill('${skill.id}')" class="px-3.5 py-2 rounded-xl ${isDone ? 'bg-emerald-500 text-white' : 'bg-primary-600 text-white'} text-xs font-bold transition transform hover:scale-105">
                                ${isDone ? 'مكتمل' : 'إتمام'}
                            </button>
                        </div>
                    </div>
                `;
    }).join('');

    updateProgressBar();
    renderBadges();
}

function toggleSkill(id) {
    let completedSkills = getCompletedSkillsForPath();
    if (completedSkills.includes(id)) {
        completedSkills = completedSkills.filter(s => s !== id);
    } else {
        completedSkills.push(id);
    }
    localStorage.setItem(`masari_skills_${currentActivePath}`, JSON.stringify(completedSkills));
    renderSkillTree();
}

function updateProgressBar() {
    const currentSkills = pathsData[currentActivePath].skills;
    const completedSkills = getCompletedSkillsForPath();
    const percent = Math.round((completedSkills.length / currentSkills.length) * 100);
    document.getElementById('progressPercent').innerText = `${percent}%`;
    document.getElementById('progressBar').style.width = `${percent}%`;
    document.getElementById('heroProgressText').innerText = `+${percent}% إنجاز`;
}

function openSkillModal(id) {
    const currentSkills = pathsData[currentActivePath].skills;
    const skill = currentSkills.find(s => s.id === id);
    const completedSkills = getCompletedSkillsForPath();
    const isDone = completedSkills.includes(id);

    document.getElementById('modalIcon').innerHTML = `<i class="fa-solid ${skill.icon}"></i>`;
    document.getElementById('modalTitle').innerText = skill.name;
    document.getElementById('modalBadge').innerText = skill.level;
    document.getElementById('modalDesc').innerText = skill.desc;
    document.getElementById('modalResources').innerHTML = skill.resources.map(r => `<div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center"><i class="fa-solid fa-link ml-1.5 text-primary-500"></i>${r}</div>`).join('');

    const btn = document.getElementById('modalToggleBtn');
    btn.className = `w-full py-2.5 rounded-xl font-bold text-xs text-white ${isDone ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-600 hover:bg-primary-700'} transition`;
    btn.innerText = isDone ? 'إلغاء التحديد كـ مكتمل' : 'تحديد المهارة كـ مكتملة ✓';
    btn.onclick = () => { toggleSkill(id); closeModal(); };

    document.getElementById('skillModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('skillModal').classList.add('hidden');
}

const libraryData = [
    { title: 'دليل تصميم الواجهات الحديثة', cat: 'تصميم UI/UX', desc: 'كتاب تفاعلي يشرح أساسيات بناء تجارب مستخدم مريحة.', icon: 'fa-book-open' },
    { title: 'أساسيات البرمجة بلغة JavaScript', cat: 'تطوير الويب', desc: 'مرجع شامل للمبتدئين لفهم المنطق والـ DOM.', icon: 'fa-file-code' },
    { title: 'إتقان Tailwind CSS في المشاريع', cat: 'تنسيق وتصميم', desc: 'كيف تبني تصاميم سريعة واحترافية بدون تعقيد.', icon: 'fa-wand-magic-sparkles' },
    { title: 'أساسيات قواعد البيانات و T-SQL', cat: 'قواعد البيانات', desc: 'دليل شامل لإنشاء الجداول وإدارة الاستعلامات.', icon: 'fa-database' }
];

function renderLibrary(items = libraryData) {
    document.getElementById('libraryContainer').innerHTML = items.map(item => `
                <div class="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                    <div class="flex items-center justify-between">
                        <div class="w-9 h-9 rounded-xl bg-secondary-50 dark:bg-secondary-950 text-secondary-600 flex items-center justify-center text-sm font-bold">
                            <i class="fa-solid ${item.icon}"></i>
                        </div>
                        <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-secondary-100 dark:bg-secondary-950 text-secondary-700 dark:text-secondary-300 font-bold">${item.cat}</span>
                    </div>
                    <h3 class="text-sm font-black text-slate-900 dark:text-white">${item.title}</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${item.desc}</p>
                </div>
            `).join('');
}

function filterLibrary() {
    const query = document.getElementById('librarySearch').value.toLowerCase();
    const filtered = libraryData.filter(i => i.title.toLowerCase().includes(query) || i.cat.toLowerCase().includes(query));
    renderLibrary(filtered);
}
renderLibrary();

// Badges
function renderBadges() {
    const completedSkills = getCompletedSkillsForPath();
    const count = completedSkills.length;
    const badges = [
        { title: 'بداية المبرمج', desc: 'أتممت مهارة واحدة بنجاح', icon: 'fa-seedling', unlocked: count >= 1 },
        { title: 'مطور نشط', desc: 'أتممت 3 مهارات أساسية', icon: 'fa-bolt', unlocked: count >= 3 },
        { title: 'محترف المسار', desc: 'أتممت كافة مهارات المسار', icon: 'fa-trophy', unlocked: count >= 5 }
    ];

    document.getElementById('badgesContainer').innerHTML = badges.map(b => `
                <div class="bg-white dark:bg-slate-900 p-5 rounded-3xl border ${b.unlocked ? 'border-accent-500 shadow-accent-500/10' : 'border-slate-200 dark:border-slate-800 opacity-50'} shadow-md text-center space-y-3 transform hover:-translate-y-2 transition duration-300">
                    <div class="w-12 h-12 rounded-2xl ${b.unlocked ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'} mx-auto flex items-center justify-center text-xl font-bold">
                        <i class="fa-solid ${b.icon}"></i>
                    </div>
                    <h3 class="text-sm font-black text-slate-900 dark:text-white">${b.title}</h3>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400">${b.desc}</p>
                    <span class="inline-block text-[10px] px-3 py-1 rounded-full ${b.unlocked ? 'bg-emerald-100 text-emerald-700 font-bold' : 'bg-slate-100 text-slate-500'}">
                        ${b.unlocked ? 'مفتوحة ✓' : 'مقفلة'}
                    </span>
                </div>
            `).join('');
}

renderSkillTree();
