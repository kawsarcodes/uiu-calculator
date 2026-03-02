let db = []; 
let selectedIds = [];
const listEl = document.getElementById('trackerCourseContainer');
const gridEl = document.getElementById('trackerGrid');
const searchEl = document.getElementById('trackerSearchInput');
const conflictBox = document.getElementById('alertConflictBox');
const warningBox = document.getElementById('alertWarningBox');
const termDisplay = document.getElementById('currentTrimester');
async function loadTrimesterData() {
    try {
        const response = await fetch('/assets/script/exam-conflict-tracker/courses-data.json');
        if (!response.ok) {
            throw new Error(`Failed to load JSON: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (termDisplay) {
            termDisplay.innerHTML = `<i class="fa-solid fa-calendar-check"></i> ${data.currentTerm}`;
        }
        db = data.courses; 
        initGridStructure(); 
        renderSidebar();
    } catch (error) {
        console.error("Error loading trimester data:", error.message);
    }
}
function initGridStructure() {
    gridEl.innerHTML = ''; 
    gridEl.innerHTML = `
        <div class="tracker-header-cell">Day</div>
        <div class="tracker-header-cell">Slot T1</div>
        <div class="tracker-header-cell">Slot T2</div>
        <div class="tracker-header-cell">Slot T3</div>
    `;
    const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']; 
    for (let i = 1; i <= 7; i++) {
        const dayLabel = document.createElement('div');
        dayLabel.className = 'tracker-day-label';
        dayLabel.textContent = `Day ${i}`;
        gridEl.appendChild(dayLabel);
        ['T1', 'T2', 'T3'].forEach(slot => {
            const cell = document.createElement('div');
            cell.className = 'tracker-slot';
            cell.setAttribute('data-day', `Day ${i}`);
            cell.setAttribute('data-slot', slot);
            gridEl.appendChild(cell);
        });
    }
}
function renderSidebar(filter = '') {
    if (!listEl || db.length === 0) return;
    listEl.innerHTML = '';
    const term = filter.toLowerCase();
    const filtered = db.filter(c => 
        (c.code && c.code.toLowerCase().includes(term)) || 
        (c.title && c.title.toLowerCase().includes(term)) ||
        (c.shortName && c.shortName.toLowerCase().includes(term))
    );
    filtered.forEach(course => {
        const card = document.createElement('div');
        const isActive = selectedIds.includes(course.id);
        card.className = `tracker-card ${isActive ? 'active-card' : ''}`;
        const codeDiv = document.createElement('div');
        codeDiv.className = 'tracker-card-code';
        codeDiv.textContent = course.code;
        const titleDiv = document.createElement('div');
        titleDiv.className = 'tracker-card-title';
        titleDiv.textContent = course.title;
        const metaDiv = document.createElement('div');
        metaDiv.className = 'tracker-meta';
        if (course.day === 'N/A' || course.slot === 'N/A') {
            metaDiv.innerHTML = `<span><i class="fa-solid fa-calendar-xmark" style="margin-right:5px;"></i> No Central Exam</span>`;
            metaDiv.classList.add('meta-na'); 
        } else {
            metaDiv.textContent = `${course.day} / ${course.slot}`;
        }
        card.appendChild(codeDiv);
        card.appendChild(titleDiv);
        card.appendChild(metaDiv);
        card.addEventListener('click', () => toggleSelection(course.id));
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
        listEl.appendChild(card);
    });
}
function toggleSelection(id) {
    if (selectedIds.includes(id)) {
        selectedIds = selectedIds.filter(x => x !== id);
    } else {
        selectedIds.push(id);
    }
    renderSidebar(searchEl.value); 
    updateVisualization();
}
function updateVisualization() {
    document.querySelectorAll('.tracker-slot').forEach(el => {
        el.innerHTML = '';
        el.classList.remove('conflict-state', 'warning-state');
    });
    conflictBox.classList.remove('show');
    warningBox.classList.remove('show');
    let hasDirectConflict = false;
    let dayCounts = {};
    selectedIds.forEach(id => {
        const course = db.find(c => c.id === id);
        if (!course || course.day === 'N/A') return;
        const cell = document.querySelector(
            `.tracker-slot[data-day="${course.day}"][data-slot="${course.slot}"]`
        );
        if (cell) {
            const chip = document.createElement('div');
            chip.className = 'tracker-chip';
            chip.textContent = `${course.code}: ${course.shortName}`;
            cell.appendChild(chip);
            if (cell.children.length > 1) {
                cell.classList.add('conflict-state');
                hasDirectConflict = true;
            }
        }
        dayCounts[course.day] = (dayCounts[course.day] || 0) + 1;
    });
    let hasWarning = false;
    Object.keys(dayCounts).forEach(day => {
        if (dayCounts[day] > 1) {
            hasWarning = true;
            document.querySelectorAll(`.tracker-slot[data-day="${day}"]`).forEach(c => {
                if (!c.classList.contains('conflict-state') && c.children.length > 0) {
                    c.classList.add('warning-state');
                }
            });
        }
    });
    if (hasDirectConflict) conflictBox.classList.add('show');
    if (hasWarning && !hasDirectConflict) warningBox.classList.add('show');
}
loadTrimesterData(); 
searchEl.addEventListener('input', (e) => renderSidebar(e.target.value));