const deptData = {
    sose: [
        { val: "cse",   text: "B.Sc. in Computer Science & Engineering (CSE)" },
        { val: "bsds",  text: "B.Sc. in Data Science (BSDS)" },
        { val: "eee",   text: "B.Sc. in Electrical & Electronic Engineering (EEE)" },
        { val: "ce",    text: "B.Sc. in Civil Engineering (CE)" },
        { val: "mscse", text: "M.Sc. in Computer Science & Engineering (MSCSE)" },
    ],
    sobe: [
        { val: "bba",    text: "Bachelor of Business Administration (BBA)" },
        { val: "bbaais", text: "BBA in Accounting & Information Systems (BBA in AIS)" },
        { val: "emba",   text: "Executive Master of Business Administration (EMBA)" },
        { val: "bseco",  text: "Bachelor of Science in Economics" },
        { val: "mba",    text: "Master of Business Administration (MBA)" },
        { val: "mseco",  text: "Master of Science in Economics" }
    ],
    sohs: [
        { val: "baeng",  text: "BA in English" },
        { val: "bsseds", text: "BSS in Environment and Development Studies (BSSEDS)" },
        { val: "bssmsj", text: "BSS in Media Studies and Journalism (BSSMSJ)" },
        { val: "mds",    text: "Master in Development Studies (MDS)" }
    ],
    sols: [
        { val: "bpharm", text: "Bachelor of Pharmacy (B. Pharm.)" },
        { val: "bsbge",  text: "B.Sc. in Biotechnology and Genetic Engineering (BSBGE)" }
    ]
};

const schoolLabels = {
    sose: "Science and Engineering (SoSE)",
    sobe: "Business and Economics (SoBE)",
    sohs: "Humanities and Social Sciences (SoHS)",
    sols: "Life Sciences (SoLS)"
};

const schoolSelect = document.getElementById('schoolSelector');
const deptSelect   = document.getElementById('deptSelector');

const savedState = JSON.parse(localStorage.getItem('uiu_selection')) || {
    lastSchool: 'sose',
    selections: { sose: 'cse', sobe: 'bba', sohs: 'baeng', sols: 'bpharm' }
};

let isRestoring = false;

function updateDepartments(schoolVal) {
    const savedDept = savedState.selections[schoolVal];
    const depts     = deptData[schoolVal] || [];
    const validDept = depts.find(d => d.val === savedDept) || depts[0];
    isRestoring = true;
    deptSelect.innerHTML = '';
    depts.forEach(dept => {
        const opt       = document.createElement('option');
        opt.value       = dept.val;
        opt.textContent = dept.text;
        deptSelect.appendChild(opt);
    });

    deptSelect.value = validDept.val;
    deptSelect.dispatchEvent(new Event('change', { bubbles: true }));
    isRestoring = false;
}

setTimeout(() => {
    const school = savedState.lastSchool;

    isRestoring = true;
    schoolSelect.value = school;
    schoolSelect.dispatchEvent(new Event('change', { bubbles: true }));
    isRestoring = false;

    updateDepartments(school);
    if (typeof loadTrimesterData === 'function') {
        loadTrimesterData();
    }
}, 100);

schoolSelect.addEventListener('change', function () {
    if (isRestoring) return;
    savedState.lastSchool = this.value;
    localStorage.setItem('uiu_selection', JSON.stringify(savedState));
    updateDepartments(this.value);
    if (typeof loadTrimesterData === 'function') loadTrimesterData();
});

deptSelect.addEventListener('change', function () {
    if (isRestoring) return;
    savedState.selections[savedState.lastSchool] = this.value;
    localStorage.setItem('uiu_selection', JSON.stringify(savedState));
    if (typeof loadTrimesterData === 'function') loadTrimesterData();
});