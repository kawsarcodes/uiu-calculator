const gradePoints = {
  A: 4.0,
  "A-": 3.67,
  "B+": 3.33,
  B: 3.0,
  "B-": 2.67,
  "C+": 2.33,
  C: 2.0,
  "C-": 1.67,
  "D+": 1.33,
  D: 1.0,
  F: 0.0,
};
function getOrCreateErrorEl(id, afterElementId) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("small");
    el.id = id;
    el.style.display = "none";
    el.style.color = "#dc2626";
    el.style.fontSize = "12px";
    el.className = "form-error";
    const afterEl = document.getElementById(afterElementId);
    if (afterEl && afterEl.parentNode) {
      afterEl.parentNode.insertBefore(el, afterEl.nextSibling);
    } else {
      document.body.appendChild(el);
    }
  }
  return el;
}
function showError(id, msg, afterElementId) {
  const el = getOrCreateErrorEl(id, afterElementId);
  el.textContent = msg;
  el.style.display = "block";
}
function hideError(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}
function clampToNonNegativeInput(inputEl, errorId, label) {
  const v = inputEl.value;
  if (v === "") {
    showError(errorId, `Please enter ${label}`, inputEl.id);
    return;
  }
  const n = parseFloat(v);
  if (isNaN(n)) {
    showError(errorId, "Please enter a valid number", inputEl.id);
  } else if (n < 0) {
    inputEl.value = 0;
    showError(errorId, `${label} cannot be negative`, inputEl.id);
  } else {
    hideError(errorId);
  }
}
function populateGradeDropdowns() {
  const courseGrade = document.getElementById("courseGrade");
  const previousGrade = document.getElementById("previousGrade");
  const newGrade = document.getElementById("newGrade");
  if (!courseGrade || !previousGrade || !newGrade) return;
  courseGrade.innerHTML = "";
  previousGrade.innerHTML = "";
  newGrade.innerHTML = "";
  Object.keys(gradePoints).forEach((grade) => {
    const option = document.createElement("option");
    option.value = grade;
    option.textContent = `${grade} (${gradePoints[grade].toFixed(2)})`;
    courseGrade.appendChild(option.cloneNode(true));
    previousGrade.appendChild(option.cloneNode(true));
    newGrade.appendChild(option.cloneNode(true));
  });
  courseGrade.value = "A";
  previousGrade.value = "C";
  newGrade.value = "A";
}
let courses = [];
let retakeCourses = [];
function addCourse() {
  const creditEl = document.getElementById("courseCredit");
  const gradeEl = document.getElementById("courseGrade");
  const credit = parseFloat(creditEl.value);
  const grade = gradeEl.value;
  if (isNaN(credit) || credit <= 0) {
    showError(
      "courseCreditError",
      "Please enter a valid course credit (> 0)",
      "courseCredit",
    );
    return;
  } else {
    hideError("courseCreditError");
  }
  courses.push({
    id: Date.now().toString(),
    credit: credit,
    grade: grade,
  });
  updateCoursesTable();
}
function addRetakeCourse() {
  const creditEl = document.getElementById("retakeCourseCredit");
  const previousGrade = document.getElementById("previousGrade").value;
  const newGrade = document.getElementById("newGrade").value;
  const credit = parseFloat(creditEl.value);
  if (isNaN(credit) || credit <= 0) {
    showError(
      "retakeCourseCreditError",
      "Please enter a valid course credit (> 0)",
      "retakeCourseCredit",
    );
    return;
  } else {
    hideError("retakeCourseCreditError");
  }
  retakeCourses.push({
    id: Date.now().toString(),
    credit: credit,
    previousGrade: previousGrade,
    newGrade: newGrade,
  });
  updateRetakeCoursesTable();
}
function removeCourse(id) {
  courses = courses.filter((course) => course.id !== id);
  updateCoursesTable();
}
function removeRetakeCourse(id) {
  retakeCourses = retakeCourses.filter((course) => course.id !== id);
  updateRetakeCoursesTable();
}
let activeEdit = null;
function createModalStyles() {
  if (document.getElementById("uiu-modal-styles")) return;
  const style = document.createElement("style");
  style.id = "uiu-modal-styles";
  style.textContent = `
    .uiu-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);display:none;justify-content:center;align-items:center;padding:16px;z-index:9999}
    .uiu-modal{width:100%;max-width:520px}
    .uiu-modal .card{max-height:85vh;overflow:auto}
    @media (max-width: 480px){.uiu-modal{max-width:96vw}}
  `;
  document.head.appendChild(style);
}
function ensureEditModal() {
  let overlay = document.getElementById("editModalOverlay");
  if (overlay) return overlay;
  overlay = document.createElement("div");
  overlay.id = "editModalOverlay";
  overlay.className = "uiu-modal-overlay";
  overlay.innerHTML = `
    <div class="uiu-modal">
      <div class="card">
        <div class="card-header padding2">
          <h3 id="editModalTitle" class="card-title flex itemsC gap1 text-base">
            <i class="fas fa-pen textG"></i>
            Edit Course
          </h3>
        </div>
        <div class="card-content">
          <div id="editFormBody"></div>
          <div class="flex gap1">
            <button id="editCancelBtn" class="btn flex1 h-9 text-xs flex itemsC gap1">
              <i class="fas fa-times"></i>
              Cancel
            </button>
            <button id="editSaveBtn" class="btn flex1 h-9 text-xs flex itemsC gap1">
              <i class="fas fa-save"></i>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}
function creditLabel(v) {
  return Number.isInteger(v) ? v.toFixed(1) : v.toString();
}
function creditOptionsHtml(selected) {
  const arr = [1, 1.5, 2, 3, 4];
  const selNum = parseFloat(selected);
  return arr
    .map(
      (v) =>
        `<option value="${v}" ${selNum === v ? "selected" : ""}>${creditLabel(v)}</option>`,
    )
    .join("");
}
function gradeOptionsHtml(selected) {
  return Object.keys(gradePoints)
    .map(
      (g) =>
        `<option value="${g}" ${g === selected ? "selected" : ""}>${g} (${gradePoints[g].toFixed(2)})</option>`,
    )
    .join("");
}
function overlayClickHandler(e) {
  const overlay = document.getElementById("editModalOverlay");
  if (e.target === overlay) {
    closeEditModal();
  }
}
function escHandler(e) {
  if (e.key === "Escape") {
    closeEditModal();
  }
}
function generateCustomSelectHtml(id, optionsHtml) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = `<select>${optionsHtml}</select>`;
  const selectedOption =
    tempDiv.querySelector("option[selected]") ||
    tempDiv.querySelector("option");
  const initialLabel = selectedOption
    ? selectedOption.textContent
    : "Select...";
  return `
    <div class="custom-select cs-host" data-custom-select>
      <button type="button"
              class="cs-trigger dark-select h-8"
              id="${id}-trigger"
              aria-haspopup="listbox"
              aria-expanded="false">
        <span class="cs-label">${initialLabel}</span>
        <svg class="cs-caret" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M7 10l5 5 5-5z"></path>
        </svg>
      </button>
      <select id="${id}" class="dark-select h-8 cs-native" name="${id}">
        ${optionsHtml}
      </select>
    </div>
  `;
}
function openEditModal(type, id) {
  const overlay = ensureEditModal();
  const titleEl = overlay.querySelector("#editModalTitle");
  const formBody = overlay.querySelector("#editFormBody");
  const saveBtn = overlay.querySelector("#editSaveBtn");
  const cancelBtn = overlay.querySelector("#editCancelBtn");
  activeEdit = { type, id };
  if (type === "new") {
    const course = courses.find((c) => c.id === id);
    if (!course) return;
    titleEl.innerHTML = `<i class="fas fa-pen textG"></i> Edit New Course`;
    formBody.innerHTML = `
      <div class="grid gridc2 gap2 mb-3">
        <div>
          <label for="editCredit" class="text-xs">Credit Hours</label>
          ${generateCustomSelectHtml("editCredit", creditOptionsHtml(course.credit))}
        </div>
        <div>
          <label for="editGrade" class="text-xs">Grade</label>
          ${generateCustomSelectHtml("editGrade", gradeOptionsHtml(course.grade))}
        </div>
      </div>
    `;
  } else {
    const course = retakeCourses.find((c) => c.id === id);
    if (!course) return;
    titleEl.innerHTML = `<i class="fas fa-pen textG"></i> Edit Retake Course`;
    formBody.innerHTML = `
      <div class="grid gridc1 gap2">
        <div>
          <label for="editRetakeCredit" class="text-xs">Credit Hours</label>
          ${generateCustomSelectHtml("editRetakeCredit", creditOptionsHtml(course.credit))}
        </div>
        <div class="grid gridc2 gap2 mb-3">
          <div>
            <label for="editPrevGrade" class="text-xs">Previous Grade</label>
            ${generateCustomSelectHtml("editPrevGrade", gradeOptionsHtml(course.previousGrade))}
          </div>
          <div>
            <label for="editNewGrade" class="text-xs">New Grade</label>
            ${generateCustomSelectHtml("editNewGrade", gradeOptionsHtml(course.newGrade))}
          </div>
        </div>
      </div>
    `;
  }
  if (typeof initCustomSelects === "function") {
    initCustomSelects();
  }
  saveBtn.onclick = () => {
    if (!activeEdit) return;
    if (activeEdit.type === "new") {
      const course = courses.find((c) => c.id === activeEdit.id);
      if (!course) return;
      const credit = parseFloat(overlay.querySelector("#editCredit").value);
      const grade = overlay.querySelector("#editGrade").value;
      if (isNaN(credit) || credit <= 0 || !gradePoints.hasOwnProperty(grade))
        return;
      course.credit = credit;
      course.grade = grade;
      updateCoursesTable();
    } else {
      const course = retakeCourses.find((c) => c.id === activeEdit.id);
      if (!course) return;
      const credit = parseFloat(
        overlay.querySelector("#editRetakeCredit").value,
      );
      const prev = overlay.querySelector("#editPrevGrade").value;
      const next = overlay.querySelector("#editNewGrade").value;
      if (
        isNaN(credit) ||
        credit <= 0 ||
        !gradePoints.hasOwnProperty(prev) ||
        !gradePoints.hasOwnProperty(next)
      )
        return;
      course.credit = credit;
      course.previousGrade = prev;
      course.newGrade = next;
      updateRetakeCoursesTable();
    }
    closeEditModal();
  };
  cancelBtn.onclick = closeEditModal;
  overlay.style.display = "flex";
  setTimeout(() => {
    const firstTrigger = overlay.querySelector(".cs-trigger");
    if (firstTrigger) firstTrigger.focus();
  }, 100);
  overlay.addEventListener("click", overlayClickHandler);
  document.addEventListener("keydown", escHandler);
}
function closeEditModal() {
  const overlay = document.getElementById("editModalOverlay");
  if (!overlay) return;
  overlay.style.display = "none";
  overlay.removeEventListener("click", overlayClickHandler);
  document.removeEventListener("keydown", escHandler);
  activeEdit = null;
}
function editCourse(id) {
  openEditModal("new", id);
}
function editRetakeCourse(id) {
  openEditModal("retake", id);
}
function updateCoursesTable() {
  const tableBody = document.getElementById("coursesTableBody");
  const coursesList = document.getElementById("coursesList");
  if (!tableBody || !coursesList) return;
  if (courses.length === 0) {
    coursesList.style.display = "none";
    tableBody.innerHTML = "";
    return;
  }
  coursesList.style.display = "block";
  tableBody.innerHTML = "";
  let totalCoursePoints = 0;
  courses.forEach((course) => {
    totalCoursePoints += course.credit * gradePoints[course.grade];
  });
  const currentCGPA =
    parseFloat(document.getElementById("currentCGPA").value) || 0;
  courses.forEach((course) => {
    const gradePoint = gradePoints[course.grade];
    const points = course.credit * gradePoint;
    const percentImpact =
      totalCoursePoints > 0
        ? ((points / totalCoursePoints) * 100).toFixed(1)
        : "0.0";
    let noteClass = "note-g1";
    if (gradePoint < currentCGPA) noteClass = "note-r1";
    else if (gradePoint === currentCGPA) noteClass = "note-b1";
    const row = document.createElement("tr");
    const creditCell = document.createElement("td");
    creditCell.className = "text-xs py-2";
    creditCell.textContent = course.credit;
    const gradeCell = document.createElement("td");
    gradeCell.className = "text-xs py-2";
    gradeCell.textContent = course.grade;
    const gradePointCell = document.createElement("td");
    gradePointCell.className = "text-xs py-2 textG font-semibold";
    gradePointCell.textContent = gradePoint.toFixed(2);
    const actionCell = document.createElement("td");
    actionCell.className = "text-center py-2";
    const editButton = document.createElement("button");
    editButton.className = "btn-outline btn-sm h-6 w-6 p-0";
    editButton.style.marginRight = "6px";
    editButton.title = "Edit";
    editButton.innerHTML = `<i class="fas fa-pen text-white-500"></i>`;
    editButton.onclick = () => editCourse(course.id);
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-destructive btn-sm h-6 w-6 p-0";
    deleteButton.title = "Remove";
    deleteButton.innerHTML = `<i class="fas fa-trash textA"></i>`;
    deleteButton.onclick = () => removeCourse(course.id);
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    row.appendChild(creditCell);
    row.appendChild(gradeCell);
    row.appendChild(gradePointCell);
    row.appendChild(actionCell);
    tableBody.appendChild(row);
    const noteRow = document.createElement("tr");
    const noteCell = document.createElement("td");
    noteCell.colSpan = 4;
    noteCell.className = `text-xs p-3 ${noteClass}`;
    noteCell.innerHTML = `
      <div class="rounded-md p-2">
        <p>${course.credit} × ${gradePoint.toFixed(2)} = ${points.toFixed(2)}</p>
        <p style="color: #10b981; margin-top:0.3rem;">
          <i class="fa fa-chart-line"></i> Contribution to trimester GPA: <strong>${percentImpact}%</strong>
        </p>
      </div>
    `;
    noteRow.appendChild(noteCell);
    tableBody.appendChild(noteRow);
  });
}
function updateRetakeCoursesTable() {
  const tableBody = document.getElementById("retakeCoursesTableBody");
  const retakeCoursesList = document.getElementById("retakeCoursesList");
  if (!tableBody || !retakeCoursesList) return;
  if (retakeCourses.length === 0) {
    retakeCoursesList.style.display = "none";
    tableBody.innerHTML = "";
    return;
  }
  retakeCoursesList.style.display = "block";
  tableBody.innerHTML = "";
  retakeCourses.forEach((course) => {
    const previousGradePoint = gradePoints[course.previousGrade];
    const newGradePoint = gradePoints[course.newGrade];
    const previousPoints = course.credit * previousGradePoint;
    const newPoints = course.credit * newGradePoint;
    const improvement = newPoints - previousPoints;
    let noteClass = "note-b1";
    let message = "";
    if (newGradePoint > previousGradePoint) {
      noteClass = "note-g1";
      message = `<p class="text-xs textG mt-1" style="margin-top:0.3rem;"><i class="fa fa-arrow-up"></i> Your grade improved</p>`;
    } else if (newGradePoint < previousGradePoint) {
      noteClass = "note-r1";
      message = `<p class="text-xs textR mt-1" style="margin-top:0.3rem;"><i class="fa fa-exclamation-triangle"></i> Your previous grade was higher and that will be counted</p>`;
    } else {
      message = `<p class="text-xs text-gray-600 mt-1" style="margin-top:0.3rem;"><i class="fa fa-info-circle"></i> Your grade has not changed</p>`;
    }
    const row = document.createElement("tr");
    const creditCell = document.createElement("td");
    creditCell.className = "text-xs py-2";
    creditCell.textContent = course.credit;
    const previousGradeCell = document.createElement("td");
    previousGradeCell.className = "text-xs py-2";
    previousGradeCell.textContent = course.previousGrade;
    const newGradeCell = document.createElement("td");
    newGradeCell.className = "text-xs py-2";
    newGradeCell.textContent = course.newGrade;
    const improvementCell = document.createElement("td");
    improvementCell.className = "text-xs py-2";
    const colorClass =
      improvement > 0 ? "textG" : improvement < 0 ? "textR" : "text-gray-500";
    improvementCell.innerHTML = `<span class="${colorClass} font-semibold">
      ${improvement >= 0 ? "+" : ""}${improvement.toFixed(2)}
    </span>`;
    const actionCell = document.createElement("td");
    actionCell.className = "text-center py-2";
    const editButton = document.createElement("button");
    editButton.className = "btn-outline btn-sm h-6 w-6 p-0";
    editButton.style.marginRight = "6px";
    editButton.title = "Edit";
    editButton.innerHTML = `<i class="fas fa-pen text-white-500"></i>`;
    editButton.onclick = () => editRetakeCourse(course.id);
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-destructive btn-sm h-6 w-6 p-0";
    deleteButton.title = "Remove";
    deleteButton.innerHTML = `<i class="fas fa-trash textA"></i>`;
    deleteButton.onclick = () => removeRetakeCourse(course.id);
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    row.appendChild(creditCell);
    row.appendChild(previousGradeCell);
    row.appendChild(newGradeCell);
    row.appendChild(improvementCell);
    row.appendChild(actionCell);
    tableBody.appendChild(row);
    const noteRow = document.createElement("tr");
    const noteCell = document.createElement("td");
    noteCell.colSpan = 5;
    noteCell.className = `text-xs p-2 ${noteClass}`;
    noteCell.innerHTML = `
      <p class="text-gray-700">
        ${course.credit} × ${previousGradePoint.toFixed(2)} = ${previousPoints.toFixed(2)} 
        → ${course.credit} × ${newGradePoint.toFixed(2)} = ${newPoints.toFixed(2)}
      </p>
      ${message}
    `;
    noteRow.appendChild(noteCell);
    tableBody.appendChild(noteRow);
  });
}
function calculateCGPA() {
  const completedCreditEl = document.getElementById("completedCredit");
  const currentCGPAEl = document.getElementById("currentCGPA");
  const resultDiv = document.getElementById("cgpaResult");
  const rightPlaceholderDiv = document.getElementById("rightPlaceholder");
  if (!resultDiv) {
    console.error("The #cgpaResult element was not found.");
    return;
  }
  const completedCredit = parseFloat(completedCreditEl.value);
  const currentCGPA = parseFloat(currentCGPAEl.value);
  let isValid = true;
  if (isNaN(completedCredit)) {
    showError(
      "completedCreditError",
      "Please enter your completed credits",
      "completedCredit",
    );
    isValid = false;
  } else if (completedCredit < 0) {
    completedCreditEl.value = 0;
    showError(
      "completedCreditError",
      "Completed credits cannot be negative",
      "completedCredit",
    );
    isValid = false;
  } else {
    hideError("completedCreditError");
  }
  if (isNaN(currentCGPA)) {
    showError(
      "currentCGPAError",
      "Please enter your current CGPA",
      "currentCGPA",
    );
    isValid = false;
  } else {
    hideError("currentCGPAError");
  }
  if (!isValid) return;
  const currentQualityPoints = completedCredit * currentCGPA;
  let newCourseCredits = 0;
  let newCoursePoints = 0;
  courses.forEach((course) => {
    newCourseCredits += course.credit;
    newCoursePoints += course.credit * gradePoints[course.grade];
  });
  const currentTrimesterGPA =
    newCourseCredits > 0 ? newCoursePoints / newCourseCredits : 0;
  let retakeCourseCredits = 0;
  let retakeImprovementPoints = 0;
  retakeCourses.forEach((course) => {
    retakeCourseCredits += course.credit;
    const previousPoints = course.credit * gradePoints[course.previousGrade];
    const newPoints = course.credit * gradePoints[course.newGrade];
    retakeImprovementPoints += newPoints - previousPoints;
  });
  const totalQualityPoints =
    currentQualityPoints + newCoursePoints + retakeImprovementPoints;
  const totalCredits = completedCredit + newCourseCredits;
  const newCGPA = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
  let resultHTML = "";
  if (totalCredits <= 0) {
    resultHTML = `
          <div class="card">
            <div class="card-header bg-red-500/10 padding2">
              <h3 class="card-title flex itemsC gap1 text-base">
                <i class="fas fa-circle-exclamation textA"></i> Invalid Input
              </h3>
            </div>
            <div class="card-content padding3">
              <div class="flex fc itemsC justify-center text-center">
                <i class="fas fa-triangle-exclamation textA" style="font-size: 3rem!important; margin-bottom: 1rem;"></i>
                <h4 class="text-xl font-bold textA mb-3">Total credits cannot be 0</h4>
                <p class="margin1" style="margin-top: 10px; text-align: justify;">
                  Please enter completed credits or add at least one course to calculate CGPA.
                </p>
              </div>
            </div>
          </div>
        `;
  } else if (newCGPA > 4.0) {
    resultHTML = `
          <div class="card">
            <div class="card-header bg-red-500/10 padding2">
              <h3 class="card-title flex itemsC gap1 text-base">
                <i class="fas fa-circle-exclamation textA"></i> Invalid Input Detected
              </h3>
            </div>
            <div class="card-content padding3">
              <div class="flex-c fc itemsC justify-center text-center">
                <i class="fas fa-triangle-exclamation textR" style="font-size: 3rem!important; margin-bottom: 1rem;"></i>
                <h4 class="text-xl font-bold textA mb-3">CGPA Cannot Exceed 4.00</h4>
                <p class="margin1" style="margin-top: 10px; text-align: justify;">
                  The calculated CGPA (${newCGPA.toFixed(2)}) exceeds the maximum possible value of 4.00. 
                  This indicates that you may have entered incorrect information.
                </p>
                <div class="note-r note-r-sp1">
                  <strong>Possible reasons:</strong><br>
                  - Too many retake courses with high grade improvements<br>
                  - Incorrect current CGPA or completed credit hours<br>
                  - Unrealistic expected grades for new courses<br>
                  - Data entry errors in course information
                </div>
                <p class="text-sm margin3" style="text-align: justify;">
                  Please review and correct your input data, then try calculating again.
                </p>
              </div>
            </div>
          </div>
        `;
  } else {
    resultHTML = `
          <div class="grid gridc1 md:gridc1 gap-6">
            <div class="card">
              <div class="card-header bg-muted/30 padding2">
                <h3 class="card-title flex itemsC gap1 text-base">
                  <i class="fas fa-star textA"></i> Projected Final CGPA
                </h3>
              </div>
              <div class="card-content padding3">
                <div>
                  <div class="grad-txt">${newCGPA.toFixed(2)}</div>
                  <div style="text-align: center">
                    <span class="${currentCGPA < newCGPA ? "textG" : "textA"}">
                      ${currentCGPA < newCGPA ? "+" : ""}${(newCGPA - currentCGPA).toFixed(2)}
                    </span>
                    <span class="text-muted-foreground">from current trimester</span>
                  </div>
                  <div class="w-full mt-3">
                    <div class="relative pt-1 w-full">
                      <div class="overflow-hidden h-2 mb-3 text-xs flex rounded bg-muted">
                        <div style="width: ${newCGPA * 25}%" class="shadow-none flex fc text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ${
              courses.length > 0
                ? `
            <div class="card">
              <div class="card-header bg-green-500/10 padding2">
                <h3 class="card-title flex itemsC gap1 text-base">
                  <i class="fas fa-chart-line textG"></i> Projected Trimester GPA
                </h3>
              </div>
              <div class="card-content padding3">
                <div>
                  <div class="grad-txt text-green-600">${currentTrimesterGPA.toFixed(2)}</div>
                  <div style="text-align: center">
                    <span class="text-muted-foreground">Based on ${courses.length} course${courses.length > 1 ? "s" : ""}</span>
                  </div>
                  <div class="w-full mt-3">
                    <div class="relative pt-1 w-full">
                      <div class="overflow-hidden h-2 mb-3 text-xs flex rounded bg-muted">
                        <div style="width: ${currentTrimesterGPA * 25}%" class="shadow-none flex fc text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`
                : ""
            }
            <div class="card">
              <div class="card-header padding2">
                <h3 class="card-title flex itemsC gap1 text-base">
                  <i class="fas fa-table textB"></i> Result Summary
                </h3>
              </div>
              <div class="card-content">
                <div class="space-y-2">
                  <div class="flex justifyC itemsC"><span>Current CGPA</span><span>${currentCGPA.toFixed(2)}</span></div>
                  <div class="flex justifyC itemsC"><span>Completed Credits</span><span>${completedCredit.toFixed(1)}</span></div>
                  <div class="separator"></div>
                  ${
                    courses.length > 0
                      ? `
                  <div class="flex justifyC itemsC"><span>New Courses</span><span class="badge badge-outline">${courses.length}</span></div>
                  <div class="flex justifyC itemsC"><span>New Course Credits</span><span>${newCourseCredits.toFixed(1)}</span></div>
                  <div class="flex justifyC itemsC"><span>Trimester GPA</span><span class="text-green-600 font-semibold">${currentTrimesterGPA.toFixed(2)}</span></div>
                  <div class="separator"></div>
                  `
                      : ""
                  }
                  ${
                    retakeCourses.length > 0
                      ? `
                  <div class="flex justifyC itemsC"><span>Retake Courses</span><span class="badge badge-outline">${retakeCourses.length}</span></div>
                  <div class="flex justifyC itemsC"><span>Retake Course Credits</span><span>${retakeCourseCredits.toFixed(1)}</span></div>
                  <div class="flex justifyC itemsC"><span>Quality Point Improvement</span><span>${retakeImprovementPoints.toFixed(2)}</span></div>
                  <div class="separator"></div>
                  `
                      : ""
                  }
                  <div class="flex justifyC itemsC"><span>Total Credits After Completion</span><span>${totalCredits.toFixed(1)}</span></div>
                </div>
              </div>
            </div>
          </div>
        `;
  }
  resultDiv.innerHTML = resultHTML;
  resultDiv.hidden = false;
  resultDiv.style.display = "block";
  if (rightPlaceholderDiv) {
    rightPlaceholderDiv.hidden = true;
    rightPlaceholderDiv.style.display = "none";
  }
  try {
    document
      .getElementById("backToCalculatorBtn")
      ?.addEventListener("click", hideResults);
    document
      .getElementById("backToCalculatorBtn2")
      ?.addEventListener("click", hideResults);
    document
      .getElementById("resetCGPABtn2")
      ?.addEventListener("click", resetCGPA);
  } catch (e) {
  }
}
function hideResults() {
  const resultDiv = document.getElementById("cgpaResult");
  if (resultDiv) {
    resultDiv.hidden = true;
    resultDiv.style.display = "none";
    resultDiv.innerHTML = ""; 
  }
  const rightPlaceholderDiv = document.getElementById("rightPlaceholder");
  if (rightPlaceholderDiv) {
    rightPlaceholderDiv.hidden = false;
    rightPlaceholderDiv.style.display = "block";
  }
}
function resetCGPA() {
  const completedCreditEl = document.getElementById("completedCredit");
  const currentCGPAEl = document.getElementById("currentCGPA");
  if (completedCreditEl) completedCreditEl.value = "";
  if (currentCGPAEl) currentCGPAEl.value = "";
  courses = [];
  retakeCourses = [];
  updateCoursesTable();
  updateRetakeCoursesTable();
  hideResults();
  hideError("completedCreditError");
  hideError("currentCGPAError");
}
function calculateTuitionFee() {
  const newCreditInput = document.getElementById("newCredit");
  const retakeCreditFirstInput = document.getElementById("retakeCreditFirst");
  const retakeCreditRegularInput = document.getElementById("retakeCreditRegular");

  const perCreditFee = parseFloat(document.getElementById("perCreditFee").value);
  const trimesterFee = parseFloat(document.getElementById("trimesterFee").value);
  const waiverPercent = parseFloat(document.getElementById("waiver").value) || 0;
  const scholarshipPercent = parseFloat(document.getElementById("scholarship").value) || 0;
  const lateRegistration = document.getElementById("lateRegistration").checked;
  const waiverInFirstInstallment = document.getElementById("waiverInFirstInstallment").checked;
  
  const siblingSpouseWaiver = parseFloat(document.getElementById("siblingSpouseWaiver").value) || 0;
  const ethnicTribalWaiver = parseFloat(document.getElementById("ethnicTribalWaiver").value) || 0;
  const disabilityWaiver = parseFloat(document.getElementById("disabilityWaiver").value) || 0;

  const newCredit = parseFloat(newCreditInput.value) || 0;
  const retakeCreditFirst = parseFloat(retakeCreditFirstInput.value) || 0;
  const retakeCreditRegular = parseFloat(retakeCreditRegularInput.value) || 0;

  if (newCredit === 0 && retakeCreditFirst === 0 && retakeCreditRegular === 0) {
    const err = getOrCreateErrorEl("newCreditError", "newCredit");
    err.textContent = "Please enter credits";
    err.style.display = "block";
    return;
  }

  const feeNewTotal = newCredit * perCreditFee;
  const feeRetake1stTotal = retakeCreditFirst * perCreditFee;
  const feeRetakeRegularTotal = retakeCreditRegular * perCreditFee;
  const lateRegistrationFee = lateRegistration ? 500 : 0;
  const adminFees = trimesterFee + lateRegistrationFee;

  const totalGrossFee = feeNewTotal + feeRetake1stTotal + feeRetakeRegularTotal + adminFees;

  let regularDiscountName = "Scholarship";
  let regularDiscountPercent = scholarshipPercent;
  if (waiverPercent > scholarshipPercent) {
    regularDiscountName = "Waiver";
    regularDiscountPercent = waiverPercent;
  }

  const discountNewRegular = (feeNewTotal * regularDiscountPercent) / 100;
  const discountSibling = (feeNewTotal * siblingSpouseWaiver) / 100;
  const discountEthnic = (feeNewTotal * ethnicTribalWaiver) / 100;
  const discountDisability = (feeNewTotal * disabilityWaiver) / 100;
  
  const discountRetake1st = (feeRetake1stTotal * 50) / 100;
  
  const totalNewDiscount = Math.min(feeNewTotal, (discountNewRegular + discountSibling + discountEthnic + discountDisability));
  const finalAmount = (feeNewTotal - totalNewDiscount) + (feeRetake1stTotal - discountRetake1st) + feeRetakeRegularTotal + adminFees;

  let firstInstallment, secondInstallment, thirdInstallment;
  let firstCalc, secondCalc, thirdCalc; 
  let installmentMethod = "";
  let alertBoxHtml = "";
  
  const isOnlyAdminFee = finalAmount <= adminFees;

  if (isOnlyAdminFee) {
      const feeText = lateRegistration ? "Trimester fee & Late fee" : "Trimester fee";
      
      installmentMethod = `100% discount: Only ${feeText} payable`;
      firstInstallment = finalAmount;
      secondInstallment = 0;
      thirdInstallment = 0;
      
      firstCalc = `Full ${feeText}`;
      secondCalc = "No payment required";
      thirdCalc = "No payment required";

      alertBoxHtml = `<div class="note-g"><i class="fas fa-check-circle"></i> <strong>Note:</strong> Since your tuition is fully waived, you only need to pay the ${feeText} in the 1st installment.</div>`;
  } else {
      let targetFirstInstallment;

      if (waiverInFirstInstallment) {
          targetFirstInstallment = Math.round(finalAmount * 0.40);
          installmentMethod = "Custom: 40% of Net Payable";
          firstCalc = "40% of Net Payable";
          alertBoxHtml = `<div class="note-g"><i class="fas fa-check-circle"></i> <strong>Note:</strong> You have chosen to apply the waiver in the 1st installment.</div>`;
      } else {
          targetFirstInstallment = Math.round(totalGrossFee * 0.40);
          installmentMethod = "Standard Rule: 40% of Gross Fee";
          firstCalc = "40% of Gross Fee";
          alertBoxHtml = `<div class="note-g"><i class="fas fa-info-circle"></i> <strong>Note:</strong> 40% of the Gross Fee (Total Fee before scholarship) in the 1st installment.</div>`;
      }

      if (targetFirstInstallment >= finalAmount) {
          firstInstallment = finalAmount;
          secondInstallment = 0;
          thirdInstallment = 0;
          
          if (!waiverInFirstInstallment) {
              firstCalc = "Full Net Payable";
              installmentMethod = "100% Payment in 1st Installment";
          }
          secondCalc = "-";
          thirdCalc = "-";
      } else {
          firstInstallment = targetFirstInstallment;
          
          const remaining = finalAmount - firstInstallment;
          secondInstallment = Math.round(remaining / 2);
          thirdInstallment = remaining - secondInstallment;
          
          secondCalc = "50% of remaining balance";
          thirdCalc = "50% of remaining balance";
      }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-BD", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount) + "৳";
  }

  let discountRowsHtml = "";
  if (regularDiscountPercent > 0) {
    discountRowsHtml += `<tr><td class="textG">${regularDiscountName}</td><td class="text-right textG">${regularDiscountPercent}% on New Courses</td><td class="text-right textG">-${formatCurrency(discountNewRegular)}</td></tr>`;
  }
  if (retakeCreditFirst > 0) {
    discountRowsHtml += `<tr><td class="textG">Retake Waiver</td><td class="text-right textG">50% on 1st Retake Courses</td><td class="text-right textG">-${formatCurrency(discountRetake1st)}</td></tr>`;
  }
  if (siblingSpouseWaiver > 0) {
    discountRowsHtml += `<tr><td class="textG">Sibling/Spouse Waiver</td><td class="text-right textG">${siblingSpouseWaiver}% on New Courses</td><td class="text-right textG">-${formatCurrency(discountSibling)}</td></tr>`;
  }
  if (ethnicTribalWaiver > 0) {
    discountRowsHtml += `<tr><td class="textG">Ethnic/Tribal Waiver</td><td class="text-right textG">${ethnicTribalWaiver}% on New Courses</td><td class="text-right textG">-${formatCurrency(discountEthnic)}</td></tr>`;
  }
  if (disabilityWaiver > 0) {
    discountRowsHtml += `<tr><td class="textG">Disability Waiver</td><td class="text-right textG">${disabilityWaiver}% on New Courses</td><td class="text-right textG">-${formatCurrency(discountDisability)}</td></tr>`;
  }

  const resultDiv = document.getElementById("tuitionResult");
  if (!resultDiv) return;

  const hasDiscount = finalAmount < totalGrossFee;

  resultDiv.innerHTML = `
<div class="card">
  <div class="card-header"><h3 class="card-title flex itemsC gap1"><i class="fas fa-book-open textP"></i> Credits Breakdown</h3></div>
  <div class="card-content">
    <div class="space-y-2">
      <div class="flex justifyC itemsC"><span>New Course Credits:</span><span>${newCredit}</span></div>
      ${retakeCreditFirst > 0 ? `<div class="flex justifyC itemsC"><span>Retake Credits (1st Time):</span><span>${retakeCreditFirst}</span></div>` : ''}
      ${retakeCreditRegular > 0 ? `<div class="flex justifyC itemsC"><span>Retake Credits (2nd+ Time):</span><span>${retakeCreditRegular}</span></div>` : ''}
      <div class="separator"></div>
      <div class="flex justifyC itemsC font-bold"><span>Total Credits Taken:</span><span class="badge badge-outline">${newCredit + retakeCreditFirst + retakeCreditRegular}</span></div>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header"><h3 class="card-title flex itemsC gap1"><i class="fas fa-list-check textB"></i> Detailed Fee Calculation</h3></div>
  <div class="card-content">
    <div class="space-y-2">
      <table class="small-table">
        <thead>
          <tr class="text-muted-foreground text-xs"><th class="text-left">Description</th><th class="text-right">Calculation</th><th class="text-right">Amount</th></tr>
        </thead>
        <tbody>
          <tr><td>New Course Tuition Fee</td><td class="text-right">${newCredit} credits × ${perCreditFee}</td><td class="text-right">${formatCurrency(feeNewTotal)}</td></tr>
          ${retakeCreditFirst > 0 ? `<tr><td>Retake Courses Tuition Fee (1st Time)</td><td class="text-right">${retakeCreditFirst} credits × ${perCreditFee}</td><td class="text-right">${formatCurrency(feeRetake1stTotal)}</td></tr>` : ''}
          ${retakeCreditRegular > 0 ? `<tr><td>Retake Courses Tuition Fee (2nd+ Time)</td><td class="text-right">${retakeCreditRegular} credits × ${perCreditFee}</td><td class="text-right">${formatCurrency(feeRetakeRegularTotal)}</td></tr>` : ''}
          <tr><td>Trimester Fee</td><td class="text-right">Fixed</td><td class="text-right">${formatCurrency(trimesterFee)}</td></tr>
          ${lateRegistration ? `<tr><td>Late Registration Fee</td><td class="text-right">Fixed Fine</td><td class="text-right">${formatCurrency(lateRegistrationFee)}</td></tr>` : ''}
          
          ${hasDiscount ? `
          <tr style="color: var(--theme-color)!important; font-weight: bold;">
            <td>Total Gross Fee</td>
            <td class="text-right text-xs font-normal">All tuition & fees</td>
            <td class="text-right">${formatCurrency(totalGrossFee)}</td>
          </tr>` : ''}

          ${discountRowsHtml ? discountRowsHtml : ''}
          
          <tr class="border-t-2" style="font-weight: bold;"><td class="font-bold" style="color: var(--theme-color);">Total Payable (Net)</td><td></td><td class="text-right font-bold text-lg" style="color: var(--theme-color);">${formatCurrency(finalAmount)}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="grid gridc1 md:gridc2 gap-4">
  <div class="card">
    <div class="card-header bg-muted/30 padding2"><h3 class="card-title flex itemsC gap1 text-base"><i class="fas fa-coins textA"></i> Final Payable Amount</h3></div>
    <div class="card-content padding3">
      <div class="grad-txt">${formatCurrency(finalAmount)}</div>
    </div>
  </div>
  
  <div class="card">
    <div class="card-header">
      <h3 class="card-title flex itemsC gap1"><i class="fas fa-money-bill-wave textG"></i> Installment Breakdown</h3>
      <div class="card-description">${installmentMethod}</div>
    </div>
    <div class="card-content">
      <div class="space-y-2">
        <div class="overflow-hidden border rounded-lg">
          ${alertBoxHtml}
          <table class="small-table">
            <thead><tr class="bg-muted"><th>Installment</th><th class="text-left">Calculation</th><th class="text-right">Amount</th></tr></thead>
            <tbody>
              <tr><td>1st Installment</td><td>${firstCalc}</td><td class="text-right font-semibold">${formatCurrency(firstInstallment)}</td></tr>
              <tr class="${secondInstallment === 0 ? 'text-muted-foreground' : ''}"><td>2nd Installment</td><td>${secondCalc}</td><td class="text-right">${formatCurrency(secondInstallment)}</td></tr>
              <tr class="${thirdInstallment === 0 ? 'text-muted-foreground' : ''}"><td>3rd Installment</td><td>${thirdCalc}</td><td class="text-right">${formatCurrency(thirdInstallment)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>`;
  resultDiv.style.display = "block";
  document.getElementById("rightPlaceholder").style.display = "none";
}
function hideFeeResults() {
  const el = document.getElementById("tuitionResult");
  if (el) el.style.display = "none";
}
function resetTuitionFee() {
  const inputIds = [
    ["newCredit", ""],
    ["retakeCreditFirst", ""],
    ["retakeCreditRegular", ""],
    ["perCreditFee", "6500"], 
    ["trimesterFee", "6500"] 
  ];

  inputIds.forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });

  const late = document.getElementById("lateRegistration");
  if (late) late.checked = false;
  
  const waiveFirst = document.getElementById("waiverInFirstInstallment");
  if (waiveFirst) waiveFirst.checked = false;

  const dropdownIds = [
    "waiver",
    "scholarship",
    "siblingSpouseWaiver",
    "ethnicTribalWaiver",
    "disabilityWaiver"
  ];

  dropdownIds.forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      select.value = "0"; 
      const triggerLabel = document.querySelector(`#${id}-trigger .cs-label`);
      const selectedOption = select.options[select.selectedIndex];
      
      if (triggerLabel && selectedOption) {
        triggerLabel.textContent = selectedOption.textContent;
      }
    }
  });

  const res = document.getElementById("tuitionResult");
  if (res) res.style.display = "none";

  const ph = document.getElementById("rightPlaceholder");
  if (ph) {
      ph.removeAttribute("hidden");
      ph.style.display = "block";
  }

  const errorIds = [
    "perCreditFeeError", 
    "trimesterFeeError", 
    "newCreditError", 
    "retakeCreditFirstError", 
    "retakeCreditRegularError"
  ];
  
  errorIds.forEach(id => {
      const el = document.getElementById(id);
      if(el) el.style.display = "none";
  });
}
function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("tabs-content");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].classList.remove("active");
  }
  const tablinks = document.getElementsByClassName("tabs-trigger");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  const target = document.getElementById(tabName);
  if (target) {
    target.style.display = "block";
    target.classList.add("active");
  }
  evt.currentTarget.classList.add("active");
}
function validateInstallmentCredits() {
  const newCreditInput = document.getElementById("newCredit");
  const retakeCreditInput = document.getElementById("retakeCredit");
  if (!newCreditInput || !retakeCreditInput) return;
  const newCreditError = getOrCreateErrorEl("newCreditError", "newCredit");
  const retakeCreditError = getOrCreateErrorEl(
    "retakeCreditError",
    "retakeCredit",
  );
  const creditTotalError = getOrCreateErrorEl(
    "creditTotalError",
    "retakeCredit",
  );
  newCreditError.style.display = "none";
  retakeCreditError.style.display = "none";
  creditTotalError.style.display = "none";
  const newVal = parseFloat(newCreditInput.value);
  const retVal = parseFloat(retakeCreditInput.value);
  if (!isNaN(newVal) && newVal < 0) {
    newCreditInput.value = 0;
    newCreditError.textContent = "New credit cannot be negative";
    newCreditError.style.display = "block";
  }
  if (!isNaN(retVal) && retVal < 0) {
    retakeCreditInput.value = 0;
    retakeCreditError.textContent = "Retake credit cannot be negative";
    retakeCreditError.style.display = "block";
  }
  const safeNew = isNaN(newVal) ? 0 : newVal;
  const safeRet = isNaN(retVal) ? 0 : retVal;
  if (safeNew === 0 && safeRet === 0) {
    creditTotalError.textContent = "Both credits cannot be 0";
    creditTotalError.style.display = "block";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const rightPlaceholderDiv = document.getElementById("rightPlaceholder");
  populateGradeDropdowns();
  createModalStyles();
  document.getElementById("addCourseBtn")?.addEventListener("click", addCourse);
  document
    .getElementById("addRetakeCourseBtn")
    ?.addEventListener("click", addRetakeCourse);
  document
    .getElementById("calculateCGPABtn")
    ?.addEventListener("click", calculateCGPA);
  document.getElementById("resetCGPABtn")?.addEventListener("click", resetCGPA);
  document
    .getElementById("calculateFeeBtn")
    ?.addEventListener("click", calculateTuitionFee);
  document
    .getElementById("resetFeeBtn")
    ?.addEventListener("click", resetTuitionFee);
  document
    .getElementById("new-courses-tab")
    ?.addEventListener("click", function (evt) {
      openTab(evt, "new-courses");
    });
  document
    .getElementById("retake-courses-tab")
    ?.addEventListener("click", function (evt) {
      openTab(evt, "retake-courses");
    });

    const allCgpaInputs = document.querySelectorAll(".cgpa-input");
    allCgpaInputs.forEach((input) => {
      input.addEventListener("input", function () {
        const value = input.value;
        const errorId = input.id + "Error";
        const cgpaError =
          document.getElementById(errorId) ||
          getOrCreateErrorEl(errorId, input.id);

        if (value === "") {
          cgpaError.style.display = "block";
          cgpaError.textContent = "Please enter your CGPA";
          return;
        }

        const num = parseFloat(value);
        if (num > 4) {
          input.value = 4;
          cgpaError.style.display = "block";
          cgpaError.textContent = "CGPA cannot be more than 4.00";
        } else if (num < 0) {
          input.value = 0;
          cgpaError.style.display = "block";
          cgpaError.textContent = "CGPA cannot be less than 0.00";
        } else {
          cgpaError.style.display = "none";
        }
      });
    });
  const completedCreditInput = document.getElementById("completedCredit");
  if (completedCreditInput) {
    completedCreditInput.addEventListener("input", () => {
      clampToNonNegativeInput(
        completedCreditInput,
        "completedCreditError",
        "Your completed credits",
      );
    });
  }
  document
    .getElementById("newCredit")
    ?.addEventListener("input", validateInstallmentCredits);
  document
    .getElementById("retakeCredit")
    ?.addEventListener("input", validateInstallmentCredits);

    
document.getElementById("retakeCreditFirst")?.addEventListener("input", function() {
    const el = this;
    if(el.value < 0) el.value = 0;
});
document.getElementById("retakeCreditRegular")?.addEventListener("input", function() {
    const el = this;
    if(el.value < 0) el.value = 0;
});


});