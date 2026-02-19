(function () {
  const gradingSystem = [
    { grade: "A", points: 4.0, min: 90, max: 100, description: "Outstanding" },
    { grade: "A-", points: 3.67, min: 86, max: 89, description: "Excellent" },
    { grade: "B+", points: 3.33, min: 82, max: 85, description: "Very Good" },
    { grade: "B", points: 3.0, min: 78, max: 81, description: "Good" },
    {
      grade: "B-",
      points: 2.67,
      min: 74,
      max: 77,
      description: "Above Average",
    },
    { grade: "C+", points: 2.33, min: 70, max: 73, description: "Average" },
    { grade: "C", points: 2.0, min: 66, max: 69, description: "Below Average" },
    { grade: "C-", points: 1.67, min: 62, max: 65, description: "Poor" },
    { grade: "D+", points: 1.33, min: 58, max: 61, description: "Very poor" },
    { grade: "D", points: 1.0, min: 55, max: 57, description: "Pass" },
    { grade: "F", points: 0.0, min: 0, max: 54, description: "Fail" },
  ];

  let currentMode = "next-trimester";
  let multiSemChart = null;
  let graduationChart = null;
  let whatIfChart = null;

  function getCssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function hexToRgba(hex, alpha) {
    if (!hex) return hex;
    let h = hex.replace("#", "").trim();
    if (h.length === 3) {
      h = h.split("").map(function (ch) { return ch + ch; }).join("");
    }
    if (h.length !== 6) return hex;
    var r = parseInt(h.slice(0, 2), 16);
    var g = parseInt(h.slice(2, 4), 16);
    var b = parseInt(h.slice(4, 6), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  }
  
  document.querySelectorAll(".tabs-trigger").forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.id.replace("-tab", "");
      switchTab(tabId);
    });
  });
function switchTab(tabId) {
  document
    .querySelectorAll(".tabs-trigger")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById(tabId + "-tab").classList.add("active");

  document
    .querySelectorAll(".tabs-content")
    .forEach((content) => content.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");

  currentMode = tabId;

  if (tabId === "multiple-trimesters" && multiSemChart) {
    setTimeout(() => multiSemChart.resize(), 50);
  }
  if (tabId === "graduation" && graduationChart) {
    setTimeout(() => graduationChart.resize(), 50);
  }
  if (tabId === "whatif" && whatIfChart) {
    setTimeout(() => whatIfChart.resize(), 50);
  }
}
  document
    .getElementById("calculateTargetBtn")
    .addEventListener("click", calculate);
  document
    .getElementById("resetTargetBtn")
    .addEventListener("click", resetCalculator);
  document.getElementById("numRetakes").addEventListener("input", function () {
    const num = parseInt(this.value) || 0;
    generateRetakeInputs(num);
  });
  function generateRetakeInputs(num) {
    const container = document.getElementById("retakeCourseInputs");
    const addBtn = document.getElementById("addRetakeCourseBtn");
    if (num === 0) {
      container.innerHTML = "";
      addBtn.style.display = "none";
      return;
    }
    addBtn.style.display = "block";
    let html = "";
    for (let i = 1; i <= num; i++) {
      html += `
                <div class="card margin1" style="background: var(--card-bg); border: 1px solid var(--border-color);">
                    <div class="card-header padding1">
                        <h4 class="text-xs">Course ${i}</h4>
                    </div>
                    <div class="card-content padding1">
                        <div class="grid gridc2 gap2 mb-2">
                            <div class="space-y-1.5">
                                <label for="retakeCredits${i}" class="text-xs">Credit Hours</label>
                                <input id="retakeCredits${i}" type="number" min="1" max="6" step="0.5" placeholder="3" value="3" />
                            </div>
                            <div class="space-y-1.5">
                                <label for="retakeCourseName${i}" class="text-xs">Course Name (Optional)</label>
                                <input id="retakeCourseName${i}" type="text" placeholder="e.g., Calculus I" />
                            </div>
                        </div>
                        <div class="grid gridc2 gap2">
                            <div class="space-y-1.5">
                                <label for="retakeOldGrade${i}" class="text-xs">Current Grade</label>
                                <select id="retakeOldGrade${i}" class="dark-select h-8">
                                    <option value="0.00">F (0.00)</option>
                                    <option value="1.00">D (1.00)</option>
                                    <option value="1.33">D+ (1.33)</option>
                                    <option value="1.67">C- (1.67)</option>
                                    <option value="2.00">C (2.00)</option>
                                    <option value="2.33">C+ (2.33)</option>
                                    <option value="2.67">B- (2.67)</option>
                                </select>
                            </div>
                            <div class="space-y-1.5">
                                <label for="retakeNewGrade${i}" class="text-xs">Expected Grade</label>
                                <select id="retakeNewGrade${i}" class="dark-select h-8">
                                    <option value="4.00">A (4.00)</option>
                                    <option value="3.67">A- (3.67)</option>
                                    <option value="3.33">B+ (3.33)</option>
                                    <option value="3.00" selected>B (3.00)</option>
                                    <option value="2.67">B- (2.67)</option>
                                    <option value="2.00">C (2.00)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }
    container.innerHTML = html;
  }

function renderMultiSemChart(currentCGPA, completedCredits, targetCGPA) {
  const canvas = document.getElementById("multiSemChartCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const numSemesters =
    parseInt(document.getElementById("numSemesters").value) || 0;
  const creditsPerSem =
    parseFloat(document.getElementById("creditsPerSem").value) || 0;

  if (numSemesters <= 0 || creditsPerSem <= 0) return;

  const totalFutureCredits = numSemesters * creditsPerSem;
  const currentPoints = currentCGPA * completedCredits;
  const targetPoints =
    targetCGPA * (completedCredits + totalFutureCredits);
  const requiredPoints = targetPoints - currentPoints;
  const requiredAvgGPA = requiredPoints / totalFutureCredits;

  const labels = [];
  const projectedRequired = [];
  const projectedHigh = [];
  const projectedMid = [];
  const targetLine = [];

  let accCredits = completedCredits;
  let pointsReq = currentPoints;
  let pointsHigh = currentPoints;
  let pointsMid = currentPoints;

  for (let i = 1; i <= numSemesters; i++) {
    labels.push("T" + i);
    accCredits += creditsPerSem;

    if (requiredAvgGPA > 0 && requiredAvgGPA <= 4) {
      pointsReq += requiredAvgGPA * creditsPerSem;
      projectedRequired.push(
        Number((pointsReq / accCredits).toFixed(3))
      );
    } else {
      projectedRequired.push(null);
    }

    pointsHigh += 4.0 * creditsPerSem;
    projectedHigh.push(
      Number((pointsHigh / accCredits).toFixed(3))
    );

    pointsMid += 3.0 * creditsPerSem;
    projectedMid.push(
      Number((pointsMid / accCredits).toFixed(3))
    );

    targetLine.push(targetCGPA);
  }

  const allValues = [];
  projectedRequired.forEach(function (v) { if (v !== null) allValues.push(v); });
  allValues.push.apply(allValues, projectedHigh);
  allValues.push.apply(allValues, projectedMid);
  allValues.push.apply(allValues, targetLine);

  if (!allValues.length) return;

  const minVal = Math.min.apply(null, allValues);
  const maxVal = Math.max.apply(null, allValues);
  const padding = 0.05;

  const yMin = Math.max(0, minVal - padding);
  const yMax = Math.min(4, maxVal + padding);

  if (multiSemChart) {
    multiSemChart.destroy();
  }

  const successColor = getCssVar("--success") || "#10b981";
  const infoColor = getCssVar("--info") || "#03fff5";
  const mutedColor = getCssVar("--muted-foreground") || "#9ca3af";
  const targetColor = getCssVar("--theme-color") || "#f97316";

  const datasets = [];

  if (requiredAvgGPA > 0 && requiredAvgGPA <= 4) {
    datasets.push({
      label: "Required Path",
      data: projectedRequired,
      borderColor: successColor,
      backgroundColor: hexToRgba(successColor, 0.2),
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: successColor,
      spanGaps: true,
    });
  }

  datasets.push(
    {
      label: "If you get 4.00 every term",
      data: projectedHigh,
      borderColor: infoColor,
      backgroundColor: hexToRgba(infoColor, 0.15),
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 2,
      pointBackgroundColor: infoColor,
      spanGaps: false,
    },
    {
      label: "If you get 3.00 every term",
      data: projectedMid,
      borderColor: mutedColor,
      backgroundColor: hexToRgba(mutedColor, 0.15),
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 2,
      pointBackgroundColor: mutedColor,
      spanGaps: false,
    },
    {
      label: "Target CGPA",
      data: targetLine,
      borderColor: targetColor,
      borderDash: [5, 5],
      tension: 0,
      borderWidth: 1.5,
      pointRadius: 0,
    }
  );

  multiSemChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: { size: 10 },
          },
        },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              return ctx.dataset.label + ": " + ctx.parsed.y.toFixed(3);
            },
          },
        },
      },
      scales: {
        y: {
          min: yMin,
          max: yMax,
          ticks: {
            stepSize: (yMax - yMin) <= 0.5 ? 0.05 : 0.1,
          },
          title: { display: true, text: "CGPA" },
        },
        x: {
          title: { display: true, text: "Trimester" },
        },
      },
    },
  });
}
function renderGraduationChart(currentCGPA, completedCredits, targetCGPA) {
  const canvas = document.getElementById("graduationChartCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const totalDegreeCredits =
    parseFloat(document.getElementById("totalDegreeCredits").value) || 0;
  const avgCreditsPerSem =
    parseFloat(document.getElementById("avgCreditsPerSem").value) || 0;

  if (totalDegreeCredits <= 0 || avgCreditsPerSem <= 0) return;

  const remainingCredits = totalDegreeCredits - completedCredits;
  if (remainingCredits <= 0) return;

  const remainingSemesters = Math.ceil(remainingCredits / avgCreditsPerSem);

  const currentPoints = currentCGPA * completedCredits;
  const targetPoints = targetCGPA * totalDegreeCredits;
  const requiredPoints = targetPoints - currentPoints;
  const requiredAvgGPA = requiredPoints / remainingCredits;

  const labels = [];
  const projRequired = [];
  const projHigh = [];
  const projMid = [];
  const targetLine = [];

  let accCreditsReq = completedCredits;
  let accCreditsHigh = completedCredits;
  let accCreditsMid = completedCredits;

  let pointsReq = currentPoints;
  let pointsHigh = currentPoints;
  let pointsMid = currentPoints;

  for (let i = 1; i <= remainingSemesters; i++) {
    labels.push("T" + i);

    const semCredits =
      i === remainingSemesters
        ? remainingCredits - avgCreditsPerSem * (remainingSemesters - 1)
        : avgCreditsPerSem;

    if (requiredAvgGPA > 0 && requiredAvgGPA <= 4) {
      accCreditsReq += semCredits;
      pointsReq += requiredAvgGPA * semCredits;
      projRequired.push(
        Number((pointsReq / accCreditsReq).toFixed(3))
      );
    } else {
      projRequired.push(null);
    }
    accCreditsHigh += semCredits;
    pointsHigh += 4.0 * semCredits;
    projHigh.push(
      Number((pointsHigh / accCreditsHigh).toFixed(3))
    );

    accCreditsMid += semCredits;
    pointsMid += 3.0 * semCredits;
    projMid.push(
      Number((pointsMid / accCreditsMid).toFixed(3))
    );

    targetLine.push(targetCGPA);
  }

  const allValues = [];
  projRequired.forEach(function (v) {
    if (v !== null) allValues.push(v);
  });
  allValues.push.apply(allValues, projHigh);
  allValues.push.apply(allValues, projMid);
  allValues.push.apply(allValues, targetLine);
  allValues.push(currentCGPA);

  if (!allValues.length) return;

  const minVal = Math.min.apply(null, allValues);
  const maxVal = Math.max.apply(null, allValues);
  const padding = 0.05;
  const yMin = Math.max(0, minVal - padding);
  const yMax = Math.min(4, maxVal + padding);

  if (graduationChart) {
    graduationChart.destroy();
  }

  const successColor = getCssVar("--success") || "#10b981";
  const infoColor = getCssVar("--info") || "#03fff5";
  const mutedColor = getCssVar("--muted-foreground") || "#9ca3af";
  const targetColor = getCssVar("--theme-color") || "#f97316";

  const datasets = [];

  if (requiredAvgGPA > 0 && requiredAvgGPA <= 4) {
    datasets.push({
      label: "Required path to target",
      data: projRequired,
      borderColor: successColor,
      backgroundColor: hexToRgba(successColor, 0.2),
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: successColor,
      spanGaps: true,
    });
  }

  datasets.push(
    {
      label: "If you get 4.00 every term",
      data: projHigh,
      borderColor: infoColor,
      backgroundColor: hexToRgba(infoColor, 0.15),
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 2,
      pointBackgroundColor: infoColor,
      spanGaps: false,
    },
    {
      label: "If you get 3.00 every term",
      data: projMid,
      borderColor: mutedColor,
      backgroundColor: hexToRgba(mutedColor, 0.15),
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 2,
      pointBackgroundColor: mutedColor,
      spanGaps: false,
    },
    {
      label: "Target CGPA",
      data: targetLine,
      borderColor: targetColor,
      borderDash: [5, 5],
      borderWidth: 1.5,
      pointRadius: 0,
      tension: 0,
    }
  );

  graduationChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 100,
      plugins: {
        legend: {
          labels: {
            font: { size: 10 },
          },
        },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              return ctx.dataset.label + ": " + ctx.parsed.y.toFixed(3);
            },
          },
        },
      },
      scales: {
        y: {
          min: yMin,
          max: yMax,
          ticks: {
            stepSize: (yMax - yMin) <= 0.5 ? 0.05 : 0.1,
          },
          title: { display: true, text: "CGPA" },
        },
        x: {
          title: { display: true, text: "Trimester until graduation" },
        },
      },
    },
  });
}
function renderWhatIfChart(currentCGPA, completedCredits, targetCGPA) {
  const canvas = document.getElementById("whatIfChartCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const whatifCredits =
    parseFloat(document.getElementById("whatifCredits").value) || 0;

  if (whatifCredits <= 0) return;

  const currentPoints = currentCGPA * completedCredits;
  const newTotalCredits = completedCredits + whatifCredits;

  const gpas = [0.0, 1.0, 1.5, 2.0, 2.5, 3.0, 3.33, 3.67, 4.0];

  const labels = ["Now"].concat(gpas.map(function (g) { return g.toFixed(2); }));
  const dataPoints = [];
  const targetLine = [];

  dataPoints.push(Number(currentCGPA.toFixed(3)));
  targetLine.push(targetCGPA);

  gpas.forEach(function (gpa) {
    const newCGPA =
      (currentPoints + gpa * whatifCredits) / newTotalCredits;
    dataPoints.push(Number(newCGPA.toFixed(3)));
    targetLine.push(targetCGPA);
  });

  const allValues = dataPoints.concat([targetCGPA]);
  const minVal = Math.min.apply(null, allValues);
  const maxVal = Math.max.apply(null, allValues);
  const padding = 0.05;
  const yMin = Math.max(0, minVal - padding);
  const yMax = Math.min(4, maxVal + padding);

  if (whatIfChart) whatIfChart.destroy();

  const successColor = getCssVar("--success") || "#10b981";
  const targetColor = getCssVar("--theme-color") || "#f97316";

  whatIfChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "New CGPA vs GPA (" + whatifCredits + " credits)",
          data: dataPoints,
          borderColor: successColor,
          backgroundColor: hexToRgba(successColor, 0.2),
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: successColor,
        },
        {
          label: "Target CGPA",
          data: targetLine,
          borderColor: targetColor,
          borderDash: [5, 5],
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 100,
      plugins: {
        legend: {
          labels: {
            font: { size: 10 },
          },
        },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              return ctx.dataset.label + ": " + ctx.parsed.y.toFixed(3);
            },
          },
        },
      },
      scales: {
        y: {
          min: yMin,
          max: yMax,
          ticks: {
            stepSize: (yMax - yMin) <= 0.5 ? 0.05 : 0.1,
          },
          title: { display: true, text: "CGPA" },
        },
        x: {
          title: { display: true, text: "Scenario" },
        },
      },
    },
  });
}




  function calculate() {
    document
      .querySelectorAll('[id$="Error"]')
      .forEach((el) => (el.style.display = "none"));
    const currentCGPA =
      parseFloat(document.getElementById("currentCGPA").value) || 0;
    const completedCredits =
      parseFloat(document.getElementById("completedCredits").value) || 0;
    const targetCGPA =
      parseFloat(document.getElementById("targetCGPA").value) || 0;
    if (!validateBaseInputs(currentCGPA, completedCredits, targetCGPA)) {
      return;
    }
    let result = "";
    switch (currentMode) {
      case "next-trimester":
        result = calculateNextSemester(
          currentCGPA,
          completedCredits,
          targetCGPA,
        );
        break;
      case "multiple-trimesters":
        result = calculateMultipleSemesters(
          currentCGPA,
          completedCredits,
          targetCGPA,
        );
        break;
      case "graduation":
        result = calculateGraduation(currentCGPA, completedCredits, targetCGPA);
        break;
      case "whatif":
        result = calculateWhatIf(currentCGPA, completedCredits, targetCGPA);
        break;
      case "retake-impact":
        result = calculateRetakeImpact(
          currentCGPA,
          completedCredits,
          targetCGPA,
        );
        break;
    }
        displayResult(result);

    if (currentMode === "multiple-trimesters") {
      renderMultiSemChart(currentCGPA, completedCredits, targetCGPA);
    } else if (currentMode === "graduation") {
      renderGraduationChart(currentCGPA, completedCredits, targetCGPA);
    } else if (currentMode === "whatif") {
      renderWhatIfChart(currentCGPA, completedCredits, targetCGPA);
    }
  }
  function validateBaseInputs(currentCGPA, completedCredits, targetCGPA) {
    let isValid = true;
    if (currentCGPA < 0 || currentCGPA > 4) {
      document.getElementById("currentCGPAError").style.display = "block";
      isValid = false;
    }
    if (completedCredits < 0) {
      document.getElementById("completedCreditsError").style.display = "block";
      isValid = false;
    }
    if (targetCGPA < 0 || targetCGPA > 4) {
      document.getElementById("targetCGPAError").style.display = "block";
      isValid = false;
    }
    return isValid;
  }
  function calculateNextSemester(currentCGPA, completedCredits, targetCGPA) {
    const nextSemCredits =
      parseFloat(document.getElementById("nextSemCredits").value) || 0;
    if (nextSemCredits <= 0) {
      document.getElementById("nextSemCreditsError").style.display = "block";
      return "";
    }
    const currentPoints = currentCGPA * completedCredits;
    const targetPoints = targetCGPA * (completedCredits + nextSemCredits);
    const requiredPoints = targetPoints - currentPoints;
    const requiredGPA = requiredPoints / nextSemCredits;
    let html = "";
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-info-circle textB"></i>
                        Calculation Summary
                    </h3>
                </div>
                <div class="card-content">
                    <table>
                        <tr>
                            <td class="text-xs">Current CGPA</td>
                            <td class="text-right"><strong>${currentCGPA.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Target CGPA</td>
                            <td class="text-right"><strong>${targetCGPA.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Completed Credits</td>
                            <td class="text-right"><strong>${completedCredits}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Next Trimester Credits</td>
                            <td class="text-right"><strong>${nextSemCredits}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Total Credits After</td>
                            <td class="text-right"><strong>${completedCredits + nextSemCredits}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Current Grade Points</td>
                            <td class="text-right"><strong>${currentPoints.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Target Grade Points</td>
                            <td class="text-right"><strong>${targetPoints.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Additional Points Needed</td>
                            <td class="text-right"><strong class="textB">${requiredPoints.toFixed(2)}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-bullseye ${requiredGPA > 4.0 ? "textR" : "textG"}"></i>
                        Required GPA Analysis
                    </h3>
                </div>
                <div class="card-content">
        `;
    if (requiredGPA > 4.0) {
      html += `
                <div class="alert note-r margin1">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Target Impossible!</strong><br>
                    You would need a GPA of <strong>${requiredGPA.toFixed(2)}</strong> next trimester, which exceeds the maximum 4.00.
                </div>
                <table>
                    <tr>
                        <td class="text-xs">Required GPA</td>
                        <td class="text-right"><strong class="textR" style="font-size: 1.3em;">${requiredGPA.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Maximum Possible GPA</td>
                        <td class="text-right"><strong>4.00</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Gap</td>
                        <td class="text-right"><strong class="textR">${(requiredGPA - 4.0).toFixed(2)}</strong></td>
                    </tr>
                </table>
            `;
    } else if (requiredGPA < 0) {
      const maxAchievable =
        (currentPoints + 4.0 * nextSemCredits) /
        (completedCredits + nextSemCredits);
      html += `
                <div class="alert note-g margin1">
                    <i class="fas fa-check-circle"></i>
                    <strong>Target Already Achieved!</strong><br>
                    Your current CGPA already exceeds your target!
                </div>
                <table>
                    <tr>
                        <td class="text-xs">Current CGPA</td>
                        <td class="text-right"><strong class="textG">${currentCGPA.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Target CGPA</td>
                        <td class="text-right"><strong>${targetCGPA.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Difference</td>
                        <td class="text-right"><strong class="textG">+${(currentCGPA - targetCGPA).toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Max Achievable (with 4.00)</td>
                        <td class="text-right"><strong class="textB">${maxAchievable.toFixed(3)}</strong></td>
                    </tr>
                </table>
            `;
    } else {
      html += `
                <div class="alert note-g margin1">
                    <i class="fas fa-check-circle"></i>
                    <strong>Target Achievable!</strong>
                </div>
                <table>
                    <tr>
                        <td class="text-xs">Required GPA</td>
                        <td class="text-right"><strong class="textB" style="font-size: 1.3em;">${requiredGPA.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Difficulty Level</td>
                        <td class="text-right"><strong class="${requiredGPA >= 3.5 ? "textR" : requiredGPA >= 3.0 ? "textO" : "textG"}">${getDifficultyLevel(requiredGPA)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Letter Grade Needed</td>
                        <td class="text-right"><strong>${getLetterGrade(requiredGPA)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Grade Description</td>
                        <td class="text-right"><strong>${getGradeDescription(requiredGPA)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Minimum Average Score</td>
                        <td class="text-right"><strong>${getMinScore(requiredGPA)}%</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Score Range</td>
                        <td class="text-right"><strong>${getScoreRange(requiredGPA)}</strong></td>
                    </tr>
                </table>
            `;
    }
    html += `
                </div>
            </div>
        `;
    if (requiredGPA > 0 && requiredGPA <= 4.0) {
      html += `
                <div class="card margin1">
                    <div class="card-header padding2">
                        <h3 class="card-title flex itemsC gap1 text-base">
                            <i class="fas fa-chart-pie textG"></i>
                            Grade Distribution Strategies
                        </h3>
                    </div>
                    <div class="card-content">
                        ${generateDetailedGradeDistributions(nextSemCredits, requiredGPA)}
                    </div>
                </div>
            `;
    }
html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-chart-line textG"></i>
                        GPA Impact Scenarios
                    </h3>
                </div>
                <div class="card-content">
                    <table class="small-table">
                        <thead>
                            <tr>
                                <th class="text-xs">Trimester GPA</th>
                                <th class="text-xs">Grade</th>
                                <th class="text-xs">New CGPA</th>
                                <th class="text-xs">Change</th>
                                <th class="text-xs">Target</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
    const scenarios = [4.0, 3.67, 3.33, 3.0, 2.67, 2.33, 2.0];
    scenarios.forEach((gpa) => {
      const newPoints = currentPoints + gpa * nextSemCredits;
      const newCGPA = newPoints / (completedCredits + nextSemCredits);
      const change = newCGPA - currentCGPA;
      const reachesTarget = newCGPA >= targetCGPA;
      html += `
                <tr>
                    <td class="text-xs"><strong>${gpa.toFixed(2)}</strong></td>
                    <td class="text-xs">${getLetterGrade(gpa)}</td>
                    <td class="text-xs"><strong>${newCGPA.toFixed(3)}</strong></td>
                    <td class="text-xs ${change >= 0 ? "textG" : "textR"}">${change >= 0 ? "+" : ""}${change.toFixed(3)}</td>
                    <td class="text-xs">${reachesTarget ? '<span class="textG">✅ Yes</span>' : '<span class="textR">❌ No</span>'}</td>
                </tr>
            `;
    });
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    if (requiredGPA > 4.0) {
      const semestersNeeded = Math.ceil(
        (targetCGPA * completedCredits - currentPoints) /
          (4.0 - targetCGPA) /
          nextSemCredits,
      );
      const creditsNeeded = Math.ceil(
        (targetCGPA * completedCredits - currentPoints) / (4.0 - targetCGPA),
      );
      html += `
                <div class="card margin1">
                    <div class="card-header padding2">
                        <h3 class="card-title flex itemsC gap1 text-base">
                            <i class="fas fa-lightbulb textO"></i>
                            Alternative Pathways
                        </h3>
                    </div>
                    <div class="card-content" style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.6;">
    <p style="margin: 6px 0; font-weight: bold;">
        <i class="fas fa-calendar-alt" style="color: #42a5f5; margin-right: 6px;"></i>
        Option 1: Multiple Trimesters
    </p>
    <p style="margin: 4px 0 10px 22px;">
        Achieve target in approximately 
        <strong style="color: #42a5f5;">${semestersNeeded}</strong> trimesters with perfect 4.00 GPA
    </p>
    <p style="margin: 6px 0; font-weight: bold;">
        <i class="fas fa-book" style="color: #66bb6a; margin-right: 6px;"></i>
        Option 2: Additional Credits
    </p>
    <p style="margin: 4px 0 10px 22px;">
        Take 
        <strong style="color: #42a5f5;">${creditsNeeded}</strong> credits with 4.00 GPA to reach target
    </p>
    <p style="margin: 6px 0; font-weight: bold;">
        <i class="fas fa-redo" style="color: #ffa726; margin-right: 6px;"></i>
        Option 3: Retake Failed Courses
    </p>
    <p style="margin: 4px 0 10px 22px;">
        Consider retaking courses where you got D, F, or low grades
    </p>
</div>
                </div>
            `;
    }
    return html;
  }
  function calculateMultipleSemesters(
    currentCGPA,
    completedCredits,
    targetCGPA,
  ) {
    const numSemesters =
      parseInt(document.getElementById("numSemesters").value) || 0;
    const creditsPerSem =
      parseFloat(document.getElementById("creditsPerSem").value) || 0;
    if (numSemesters <= 0) {
      document.getElementById("numSemestersError").style.display = "block";
      return "";
    }
    if (creditsPerSem <= 0) {
      document.getElementById("creditsPerSemError").style.display = "block";
      return "";
    }
    const totalFutureCredits = numSemesters * creditsPerSem;
    const currentPoints = currentCGPA * completedCredits;
    const targetPoints = targetCGPA * (completedCredits + totalFutureCredits);
    const requiredPoints = targetPoints - currentPoints;
    const requiredAvgGPA = requiredPoints / totalFutureCredits;
    let html = "";
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-info-circle textB"></i>
                        Multi-Trimester Plan Summary
                    </h3>
                </div>
                <div class="card-content">
                    <table>
                        <tr>
                            <td class="text-xs">Current CGPA</td>
                            <td class="text-right"><strong>${currentCGPA.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Target CGPA</td>
                            <td class="text-right"><strong>${targetCGPA.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Number of Trimesters</td>
                            <td class="text-right"><strong>${numSemesters}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Credits per Trimester</td>
                            <td class="text-right"><strong>${creditsPerSem}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Total Future Credits</td>
                            <td class="text-right"><strong class="textB">${totalFutureCredits}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Current Grade Points</td>
                            <td class="text-right"><strong>${currentPoints.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Target Grade Points</td>
                            <td class="text-right"><strong>${targetPoints.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Points Needed</td>
                            <td class="text-right"><strong class="textB">${requiredPoints.toFixed(2)}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-bullseye ${requiredAvgGPA > 4.0 ? "textR" : "textG"}"></i>
                        Required Average GPA
                    </h3>
                </div>
                <div class="card-content">
        `;
    if (requiredAvgGPA > 4.0) {
      html += `
                <div class="alert note-r margin1">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Target Impossible!</strong><br>
                    Required average GPA of <strong>${requiredAvgGPA.toFixed(2)}</strong> exceeds maximum 4.00
                </div>
                <table>
                    <tr>
                        <td class="text-xs">Required Average GPA</td>
                        <td class="text-right"><strong class="textR" style="font-size: 1.3em;">${requiredAvgGPA.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Maximum Possible</td>
                        <td class="text-right"><strong>4.00</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Shortfall</td>
                        <td class="text-right"><strong class="textR">${(requiredAvgGPA - 4.0).toFixed(2)}</strong></td>
                    </tr>
                </table>
            `;
    } else {
      html += `
                <div class="alert note-g margin1">
                    <i class="fas fa-check-circle"></i>
                    <strong>Target Achievable!</strong>
                </div>
                <table>
                    <tr>
                        <td class="text-xs">Required Average GPA</td>
                        <td class="text-right"><strong class="textB" style="font-size: 1.3em;">${requiredAvgGPA.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Difficulty Level</td>
                        <td class="text-right"><strong class="${requiredAvgGPA >= 3.5 ? "textR" : requiredAvgGPA >= 3.0 ? "textO" : "textG"}">${getDifficultyLevel(requiredAvgGPA)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Equivalent Letter Grade</td>
                        <td class="text-right"><strong>${getLetterGrade(requiredAvgGPA)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Average Score Needed</td>
                        <td class="text-right"><strong>${getMinScore(requiredAvgGPA)}%</strong></td>
                    </tr>
                </table>
            `;
    }
    html += `
                </div>
            </div>
        `;
 html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-calendar-alt textY"></i>
                        Trimester-by-Trimester Projection
                    </h3>
                </div>
                <div class="card-content">
                    <div class="chart-container margin1">
  <canvas id="multiSemChartCanvas"></canvas>
</div>
                    <table class="small-table">
                        <thead>
                            <tr>
                                <th class="text-xs">Trimester</th>
                                <th class="text-xs">Credits</th>
                                <th class="text-xs">Sem GPA</th>
                                <th class="text-xs">Cumulative Credits</th>
                                <th class="text-xs">Cumulative Points</th>
                                <th class="text-xs">Projected CGPA</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
    let accCredits = completedCredits;
    let accPoints = currentPoints;
    for (let i = 1; i <= numSemesters; i++) {
      accCredits += creditsPerSem;
      const semPoints = requiredAvgGPA * creditsPerSem;
      accPoints += semPoints;
      const projectedCGPA = accPoints / accCredits;
      html += `
                <tr>
                    <td class="text-xs"><strong>${i}</strong></td>
                    <td class="text-xs">${creditsPerSem}</td>
                    <td class="text-xs"><strong>${requiredAvgGPA.toFixed(2)}</strong></td>
                    <td class="text-xs">${accCredits}</td>
                    <td class="text-xs">${accPoints.toFixed(2)}</td>
                    <td class="text-xs"><strong class="textB">${projectedCGPA.toFixed(3)}</strong></td>
                </tr>
            `;
    }
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-chart-line textG"></i>
                        Alternative GPA Scenarios
                    </h3>
                </div>
                <div class="card-content">
                    <table class="small-table">
                        <thead>
                            <tr>
                                <th class="text-xs">Average GPA</th>
                                <th class="text-xs">Grade</th>
                                <th class="text-xs">Final CGPA</th>
                                <th class="text-xs">vs Target</th>
                                <th class="text-xs">Status</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
    const gpaScenarios = [4.0, 3.67, 3.33, 3.0, 2.67, 2.33];
    gpaScenarios.forEach((avgGPA) => {
      const finalPoints = currentPoints + avgGPA * totalFutureCredits;
      const finalCGPA = finalPoints / (completedCredits + totalFutureCredits);
      const diff = finalCGPA - targetCGPA;
      const achieves = finalCGPA >= targetCGPA;
      html += `
                <tr>
                    <td class="text-xs"><strong>${avgGPA.toFixed(2)}</strong></td>
                    <td class="text-xs">${getLetterGrade(avgGPA)}</td>
                    <td class="text-xs"><strong>${finalCGPA.toFixed(3)}</strong></td>
                    <td class="text-xs ${diff >= 0 ? "textG" : "textR"}">${diff >= 0 ? "+" : ""}${diff.toFixed(3)}</td>
                    <td class="text-xs">${achieves ? '<span class="textG">✅ Achieved</span>' : '<span class="textR">❌ Short</span>'}</td>
                </tr>
            `;
    });
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    return html;
  }
  function calculateGraduation(currentCGPA, completedCredits, targetCGPA) {
    const totalDegreeCredits =
      parseFloat(document.getElementById("totalDegreeCredits").value) || 0;
    const avgCreditsPerSem =
      parseFloat(document.getElementById("avgCreditsPerSem").value) || 0;
    if (totalDegreeCredits <= 0) {
      document.getElementById("totalDegreeCreditsError").style.display =
        "block";
      return "";
    }
    if (avgCreditsPerSem <= 0) {
      document.getElementById("avgCreditsPerSemError").style.display = "block";
      return "";
    }
    const remainingCredits = totalDegreeCredits - completedCredits;
    if (remainingCredits <= 0) {
      return `
                <div class="card margin1">
                    <div class="card-header padding2">
                        <h3 class="card-title flex itemsC gap1 text-base">
                            <i class="fas fa-graduation-cap textG"></i>
                            Graduation Status
                        </h3>
                    </div>
                    <div class="card-content">
                        <div class="alert note-g margin1">
                            <i class="fas fa-check-circle"></i>
                            <strong>Congratulations!</strong><br>
                            You have completed all ${totalDegreeCredits} required credits for graduation!
                        </div>
                        <table>
                            <tr>
                                <td class="text-xs">Final CGPA</td>
                                <td class="text-right"><strong class="textG" style="font-size: 1.3em;">${currentCGPA.toFixed(3)}</strong></td>
                            </tr>
                            <tr>
                                <td class="text-xs">Total Credits</td>
                                <td class="text-right"><strong>${completedCredits}</strong></td>
                            </tr>
                        </table>
                    </div>
                </div>
            `;
    }
    const remainingSemesters = Math.ceil(remainingCredits / avgCreditsPerSem);
    const currentPoints = currentCGPA * completedCredits;
    const targetPoints = targetCGPA * totalDegreeCredits;
    const requiredPoints = targetPoints - currentPoints;
    const requiredAvgGPA = requiredPoints / remainingCredits;
    const maxAchievableCGPA =
      (currentPoints + remainingCredits * 4.0) / totalDegreeCredits;
    const minAchievableCGPA =
      (currentPoints + remainingCredits * 0.0) / totalDegreeCredits;
    let html = "";
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-graduation-cap textB"></i>
                        Graduation Plan Overview
                    </h3>
                </div>
                <div class="card-content">
                    <table>
                        <tr>
                            <td class="text-xs">Current CGPA</td>
                            <td class="text-right"><strong>${currentCGPA.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Target CGPA</td>
                            <td class="text-right"><strong>${targetCGPA.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Completed Credits</td>
                            <td class="text-right"><strong>${completedCredits}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Total Degree Credits</td>
                            <td class="text-right"><strong>${totalDegreeCredits}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Remaining Credits</td>
                            <td class="text-right"><strong class="textB">${remainingCredits}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Completion Progress</td>
                            <td class="text-right"><strong class="textG">${((completedCredits / totalDegreeCredits) * 100).toFixed(1)}%</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Estimated Trimesters Left</td>
                            <td class="text-right"><strong class="textO">${remainingSemesters}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-bullseye ${requiredAvgGPA > 4.0 ? "textR" : "textG"}"></i>
                        Required GPA to Graduate
                    </h3>
                </div>
                <div class="card-content">
        `;
    if (requiredAvgGPA > 4.0) {
      html += `
                <div class="alert note-r margin1">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Target Not Achievable!</strong><br>
                    Would need ${requiredAvgGPA.toFixed(2)} average GPA for remaining credits.
                </div>
                <table>
                    <tr>
                        <td class="text-xs">Required Average GPA</td>
                        <td class="text-right"><strong class="textR" style="font-size: 1.3em;">${requiredAvgGPA.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Maximum Possible GPA</td>
                        <td class="text-right"><strong>4.00</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Gap</td>
                        <td class="text-right"><strong class="textR">${(requiredAvgGPA - 4.0).toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Max Achievable CGPA</td>
                        <td class="text-right"><strong class="textO">${maxAchievableCGPA.toFixed(3)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Shortfall from Target</td>
                        <td class="text-right"><strong class="textR">${(targetCGPA - maxAchievableCGPA).toFixed(3)}</strong></td>
                    </tr>
                </table>
            `;
    } else {
      html += `
                <div class="alert note-g margin1">
                    <i class="fas fa-check-circle"></i>
                    <strong>Target Achievable by Graduation!</strong>
                </div>
                <table>
                    <tr>
                        <td class="text-xs">Required Average GPA</td>
                        <td class="text-right"><strong class="textB" style="font-size: 1.3em;">${requiredAvgGPA.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Difficulty Level</td>
                        <td class="text-right"><strong class="${requiredAvgGPA >= 3.5 ? "textR" : requiredAvgGPA >= 3.0 ? "textO" : "textG"}">${getDifficultyLevel(requiredAvgGPA)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Equivalent Grade</td>
                        <td class="text-right"><strong>${getLetterGrade(requiredAvgGPA)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Average Score Needed</td>
                        <td class="text-right"><strong>${getMinScore(requiredAvgGPA)}%</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Max Achievable CGPA</td>
                        <td class="text-right"><strong class="textG">${maxAchievableCGPA.toFixed(3)}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-xs">Min Achievable CGPA</td>
                        <td class="text-right"><strong class="textR">${minAchievableCGPA.toFixed(3)}</strong></td>
                    </tr>
                </table>
            `;
    }
    html += `
                </div>
            </div>
        `;

    html +=`
    <div class="card">
              <div class="card-header bg-green-500/10 padding2">
                <h3 class="card-title flex itemsC gap1 text-base">
                  <i class="fas fa-graduation-cap textG"></i> Max Achievable CGPA (Without Retake)
                </h3>
              </div>
              <div class="card-content padding3">
                <div>
                  <div class="grad-txt text-green-600">${maxAchievableCGPA.toFixed(3)}</div>
                  <div style="text-align: center">
                    <span class="text-muted-foreground">Assuming you get <strong>4.00 GPA</strong> in all remaining courses.</span>
                  </div>
                  
                </div>
              </div>
            </div>
    `
        
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-chart-bar textY"></i>
                        Possible CGPA Range at Graduation
                    </h3>
                </div>
                <div class="card-content">
                    <table class="small-table">
                        <thead>
                            <tr>
                                <th class="text-xs">Avg GPA</th>
                                <th class="text-xs">Grade</th>
                                <th class="text-xs">Final CGPA</th>
                                <th class="text-xs">vs Target</th>
                                <th class="text-xs">Honors</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
    const gpaScenarios = [4.0, 3.67, 3.33, 3.0, 2.67, 2.33, 2.0];
    gpaScenarios.forEach((avgGPA) => {
      const finalCGPA =
        (currentPoints + avgGPA * remainingCredits) / totalDegreeCredits;
      const diff = finalCGPA - targetCGPA;
      const classification = getClassification(finalCGPA);
      html += `
                <tr>
                    <td class="text-xs"><strong>${avgGPA.toFixed(2)}</strong></td>
                    <td class="text-xs">${getLetterGrade(avgGPA)}</td>
                    <td class="text-xs"><strong>${finalCGPA.toFixed(3)}</strong></td>
                    <td class="text-xs ${diff >= 0 ? "textG" : "textR"}">${diff >= 0 ? "+" : ""}${diff.toFixed(3)}</td>
                    <td class="text-xs">${classification}</td>
                </tr>
            `;
    });
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
if (requiredAvgGPA <= 4.0 && remainingSemesters > 0) {
  html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-calendar-week textG"></i>
                        Trimester-wise Graduation Plan
                    </h3>
                </div>
                <div class="card-content">
                    <div class="chart-container margin1">
                        <canvas id="graduationChartCanvas"></canvas>
                    </div>
                    <table class="small-table">
                            <thead>
                                <tr>
                                    <th class="text-xs">Trimester</th>
                                    <th class="text-xs">Credits</th>
                                    <th class="text-xs">Needed GPA</th>
                                    <th class="text-xs">Total Credits</th>
                                    <th class="text-xs">Projected CGPA</th>
                                </tr>
                            </thead>
                            <tbody>
            `;
      let accCredits = completedCredits;
      let accPoints = currentPoints;
      for (let i = 1; i <= remainingSemesters; i++) {
        const semCredits =
          i === remainingSemesters
            ? remainingCredits - avgCreditsPerSem * (remainingSemesters - 1)
            : avgCreditsPerSem;
        accCredits += semCredits;
        accPoints += requiredAvgGPA * semCredits;
        const projectedCGPA = accPoints / accCredits;
        html += `
                    <tr>
                        <td class="text-xs"><strong>${i}</strong></td>
                        <td class="text-xs">${semCredits}</td>
                        <td class="text-xs"><strong>${requiredAvgGPA.toFixed(2)}</strong></td>
                        <td class="text-xs">${accCredits}</td>
                        <td class="text-xs"><strong class="textB">${projectedCGPA.toFixed(3)}</strong></td>
                    </tr>
                `;
      }
      html += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
    }
    return html;
  }
  function calculateWhatIf(currentCGPA, completedCredits, targetCGPA) {
    const whatifCredits =
      parseFloat(document.getElementById("whatifCredits").value) || 0;
    const whatifGPA =
      parseFloat(document.getElementById("whatifGPA").value) || 0;
    if (whatifCredits <= 0) {
      document.getElementById("whatifCreditsError").style.display = "block";
      return "";
    }
    if (whatifGPA < 0 || whatifGPA > 4) {
      document.getElementById("whatifGPAError").style.display = "block";
      return "";
    }
    const currentPoints = currentCGPA * completedCredits;
    const additionalPoints = whatifGPA * whatifCredits;
    const newTotalCredits = completedCredits + whatifCredits;
    const newCGPA = (currentPoints + additionalPoints) / newTotalCredits;
    const cgpaChange = newCGPA - currentCGPA;
    const targetDifference = targetCGPA - newCGPA;
    let html = "";
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-info-circle textB"></i>
                        What-If Scenario Summary
                    </h3>
                </div>
                <div class="card-content">
                    <table>
                        <tr>
                            <td class="text-xs">Scenario Credits</td>
                            <td class="text-right"><strong>${whatifCredits}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Expected GPA</td>
                            <td class="text-right"><strong>${whatifGPA.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Expected Letter Grade</td>
                            <td class="text-right"><strong>${getLetterGrade(whatifGPA)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Grade Points to Add</td>
                            <td class="text-right"><strong>${additionalPoints.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Current Total Credits</td>
                            <td class="text-right"><strong>${completedCredits}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">New Total Credits</td>
                            <td class="text-right"><strong class="textB">${newTotalCredits}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-chart-line ${cgpaChange >= 0 ? "textG" : "textR"}"></i>
                        CGPA Impact Analysis
                    </h3>
                </div>
                <div class="card-content">
                    ${
                      cgpaChange >= 0
                        ? '<div class="alert note-g margin1"><i class="fas fa-arrow-up"></i> <strong>Positive Impact</strong></div>'
                        : '<div class="alert note-r margin1"><i class="fas fa-arrow-down"></i> <strong>Negative Impact</strong></div>'
                    }
                    <table>
                        <tr>
                            <td class="text-xs">Current CGPA</td>
                            <td class="text-right"><strong>${currentCGPA.toFixed(3)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">New CGPA</td>
                            <td class="text-right">
                                <strong class="${cgpaChange >= 0 ? "textG" : "textR"}" style="font-size: 1.3em;">
                                    ${newCGPA.toFixed(3)} ${cgpaChange >= 0 ? "↑" : "↓"}
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-xs">CGPA Change</td>
                            <td class="text-right">
                                <strong class="${cgpaChange >= 0 ? "textG" : "textR"}">
                                    ${cgpaChange >= 0 ? "+" : ""}${cgpaChange.toFixed(3)}
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-xs">Percentage Change</td>
                            <td class="text-right">
                                <strong class="${cgpaChange >= 0 ? "textG" : "textR"}">
                                    ${cgpaChange >= 0 ? "+" : ""}${((cgpaChange / currentCGPA) * 100).toFixed(2)}%
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-xs">Target CGPA</td>
                            <td class="text-right"><strong>${targetCGPA.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Distance from Target</td>
                            <td class="text-right">
                                ${
                                  targetDifference <= 0
                                    ? '<strong class="textG">Target Achieved! 🎉</strong>'
                                    : `<strong class="textO">${targetDifference.toFixed(3)} remaining</strong>`
                                }
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-th textY"></i>
                        Alternative GPA Scenarios (${whatifCredits} credits)
                    </h3>
                </div>
                <div class="card-content">
                    <div class="chart-container margin1">
                        <canvas id="whatIfChartCanvas"></canvas>
                    </div>
                    <table class="small-table">
                        <thead>
                            <tr>
                                <th class="text-xs">Scenario GPA</th>
                                <th class="text-xs">Grade</th>
                                <th class="text-xs">New CGPA</th>
                                <th class="text-xs">Change</th>
                                <th class="text-xs">Target</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
    const scenarios = [4.0, 3.67, 3.33, 3.0, 2.67, 2.33, 2.0, 1.67, 1.0, 0.0];
    scenarios.forEach((gpa) => {
      const scenarioPoints = currentPoints + gpa * whatifCredits;
      const scenarioCGPA = scenarioPoints / newTotalCredits;
      const scenarioChange = scenarioCGPA - currentCGPA;
      const reachesTarget = scenarioCGPA >= targetCGPA;
      html += `
                <tr>
                    <td class="text-xs"><strong>${gpa.toFixed(2)}</strong></td>
                    <td class="text-xs">${getLetterGrade(gpa)}</td>
                    <td class="text-xs"><strong>${scenarioCGPA.toFixed(3)}</strong></td>
                    <td class="text-xs ${scenarioChange >= 0 ? "textG" : "textR"}">${scenarioChange >= 0 ? "+" : ""}${scenarioChange.toFixed(3)}</td>
                    <td class="text-xs">${reachesTarget ? '<span class="textG">✅</span>' : '<span class="textR">❌</span>'}</td>
                </tr>
            `;
    });
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-book textG"></i>
                        Different Credit Scenarios (${whatifGPA.toFixed(2)} GPA)
                    </h3>
                </div>
                <div class="card-content">
                    <table class="small-table">
                        <thead>
                            <tr>
                                <th class="text-xs">Credits</th>
                                <th class="text-xs">Points Added</th>
                                <th class="text-xs">Total Credits</th>
                                <th class="text-xs">New CGPA</th>
                                <th class="text-xs">Change</th>
                                <th class="text-xs">Target</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
    const creditScenarios = [3, 6, 9, 12, 15, 18, 21, 24];
    creditScenarios.forEach((credits) => {
      const points = whatifGPA * credits;
      const totalCreds = completedCredits + credits;
      const resultCGPA = (currentPoints + points) / totalCreds;
      const change = resultCGPA - currentCGPA;
      const achieves = resultCGPA >= targetCGPA;
      html += `
                <tr>
                    <td class="text-xs"><strong>${credits}</strong></td>
                    <td class="text-xs">${points.toFixed(2)}</td>
                    <td class="text-xs">${totalCreds}</td>
                    <td class="text-xs"><strong>${resultCGPA.toFixed(3)}</strong></td>
                    <td class="text-xs ${change >= 0 ? "textG" : "textR"}">${change >= 0 ? "+" : ""}${change.toFixed(3)}</td>
                    <td class="text-xs">${achieves ? '<span class="textG">✅</span>' : '<span class="textR">❌</span>'}</td>
                </tr>
            `;
    });
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    return html;
  }
  function calculateRetakeImpact(currentCGPA, completedCredits, targetCGPA) {
    const numRetakes =
      parseInt(document.getElementById("numRetakes").value) || 0;
    if (numRetakes === 0) {
      return `
                <div class="card margin1">
                    <div class="card-header padding2">
                        <h3 class="card-title flex itemsC gap1 text-base">
                            <i class="fas fa-redo textG"></i>
                            Retake Impact Analysis
                        </h3>
                    </div>
                    <div class="card-content">
                        <div class="alert alert-info margin1">
                            <i class="fas fa-info-circle"></i>
                            Please enter the number of courses to retake above to see the impact analysis.
                        </div>
                    </div>
                </div>
            `;
    }
    let totalCurrentPoints = currentCGPA * completedCredits;
    let pointsChange = 0;
    let retakeDetails = [];
    for (let i = 1; i <= numRetakes; i++) {
      const credits =
        parseFloat(document.getElementById(`retakeCredits${i}`).value) || 3;
      const oldGrade =
        parseFloat(document.getElementById(`retakeOldGrade${i}`).value) || 0;
      const newGrade =
        parseFloat(document.getElementById(`retakeNewGrade${i}`).value) || 3.0;
      const courseName =
        document.getElementById(`retakeCourseName${i}`).value || `Course ${i}`;
      const appliedGrade = Math.max(oldGrade, newGrade);
      const impact = (appliedGrade - oldGrade) * credits;
      pointsChange += impact;
      retakeDetails.push({
        name: courseName,
        credits: credits,
        oldGrade: oldGrade,
        newGrade: newGrade,
        appliedGrade: appliedGrade,
        impact: impact,
        improved: newGrade > oldGrade,
      });
    }
    const newTotalPoints = totalCurrentPoints + pointsChange;
    const newCGPA = newTotalPoints / completedCredits;
    const cgpaIncrease = newCGPA - currentCGPA;
    let html = "";
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-info-circle textB"></i>
                        Retake Analysis Summary
                    </h3>
                </div>
                <div class="card-content">
                    <p class="text-xs note-b margin1">
                        <i class="fas fa-info-circle"></i> <strong>Policy:</strong> Only the higher grade will be counted towards your CGPA
                    </p>
                    <table>
                        <tr>
                            <td class="text-xs">Number of Courses</td>
                            <td class="text-right"><strong>${numRetakes}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Total Credits Retaking</td>
                            <td class="text-right"><strong>${retakeDetails.reduce((sum, c) => sum + c.credits, 0)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Courses with Improvement</td>
                            <td class="text-right"><strong class="textG">${retakeDetails.filter((c) => c.improved).length}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Courses with No Change</td>
                            <td class="text-right"><strong class="textO">${retakeDetails.filter((c) => !c.improved).length}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Total Grade Points Added</td>
                            <td class="text-right"><strong class="textB">${pointsChange.toFixed(2)}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-chart-line ${cgpaIncrease >= 0 ? "textG" : "textR"}"></i>
                        CGPA Impact
                    </h3>
                </div>
                <div class="card-content">
        `;
    if (newCGPA >= targetCGPA) {
      html += `
                <div class="alert note-g margin1">
                    <i class="fas fa-check-circle"></i>
                    <strong>Target Achieved Through Retakes! 🎉</strong>
                </div>
            `;
    } else if (cgpaIncrease > 0) {
      html += `
                <div class="alert alert-info margin1">
                    <i class="fas fa-arrow-up"></i>
                    <strong>Positive Impact!</strong> You're getting closer to your target.
                </div>
            `;
    } else {
      html += `
                <div class="alert alert-warning margin1">
                    <i class="fas fa-info-circle"></i>
                    <strong>No Impact:</strong> Expected grades are not higher than current grades.
                </div>
            `;
    }
    html += `
                    <table>
                        <tr>
                            <td class="text-xs">Current CGPA</td>
                            <td class="text-right"><strong>${currentCGPA.toFixed(3)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">CGPA After Retakes</td>
                            <td class="text-right">
                                <strong class="${cgpaIncrease > 0 ? "textG" : "textO"}" style="font-size: 1.3em;">${newCGPA.toFixed(3)}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-xs">CGPA Increase</td>
                            <td class="text-right">
                                <strong class="${cgpaIncrease > 0 ? "textG" : "textO"}">
                                    ${cgpaIncrease > 0 ? "+" : ""}${cgpaIncrease.toFixed(3)}
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-xs">Percentage Increase</td>
                            <td class="text-right">
                                <strong class="${cgpaIncrease > 0 ? "textG" : "textO"}">
                                    ${cgpaIncrease > 0 ? "+" : ""}${((cgpaIncrease / currentCGPA) * 100).toFixed(2)}%
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-xs">Target CGPA</td>
                            <td class="text-right"><strong>${targetCGPA.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-xs">Distance from Target</td>
                            <td class="text-right">
                                ${
                                  newCGPA >= targetCGPA
                                    ? '<strong class="textG">Target Reached! ✅</strong>'
                                    : `<strong class="textO">${(targetCGPA - newCGPA).toFixed(3)} remaining</strong>`
                                }
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    html += `
            <div class="card margin1">
                <div class="card-header padding2">
                    <h3 class="card-title flex itemsC gap1 text-base">
                        <i class="fas fa-list textG"></i>
                        Course-by-Course Analysis
                    </h3>
                </div>
                <div class="card-content">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-xs">Course</th>
                                <th class="text-xs">Credits</th>
                                <th class="text-xs">Current</th>
                                <th class="text-xs">Expected</th>
                                <th class="text-xs">Applied</th>
                                <th class="text-xs">CGPA Impact</th>
                                <th class="text-xs">Status</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
    retakeDetails.forEach((course) => {
      const cgpaImpact = course.impact / completedCredits;
      html += `
                <tr>
                    <td class="text-xs"><strong>${course.name}</strong></td>
                    <td class="text-xs">${course.credits}</td>
                    <td class="text-xs">${getLetterGrade(course.oldGrade)} (${course.oldGrade.toFixed(2)})</td>
                    <td class="text-xs">${getLetterGrade(course.newGrade)} (${course.newGrade.toFixed(2)})</td>
                    <td class="text-xs"><strong>${getLetterGrade(course.appliedGrade)} (${course.appliedGrade.toFixed(2)})</strong></td>
                    <td class="text-xs ${course.improved ? "textG" : "textO"}">
                        ${course.improved ? "+" : ""}${cgpaImpact.toFixed(3)}
                    </td>
                    <td class="text-xs">
                        ${
                          course.improved
                            ? '<span class="textG"><i class="fas fa-arrow-up"></i> Improved</span>'
                            : '<span class="textO"><i class="fas fa-minus"></i> No Change</span>'
                        }
                    </td>
                </tr>
            `;
    });
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    if (newCGPA < targetCGPA) {
      const remainingGap = targetCGPA - newCGPA;
      const additionalCreditsNeeded = Math.ceil(
        (remainingGap * completedCredits) / (4.0 - targetCGPA),
      );
      html += `
                <div class="card margin1">
                    <div class="card-header padding2">
                        <h3 class="card-title flex itemsC gap1 text-base">
                            <i class="fas fa-route textO"></i>
                            Next Steps to Reach Target
                        </h3>
                    </div>
                    <div class="card-content">
                        <p class="text-xs margin1">
                            <strong>Remaining Gap:</strong> <span class="textO">${remainingGap.toFixed(3)}</span>
                        </p>
                        <p class="text-xs margin1">
                            <strong><i class="fas fa-book textB"></i> Option 1: Additional Credits</strong><br>
                            Take approximately <strong class="textB">${additionalCreditsNeeded}</strong> credits with 4.00 GPA
                        </p>
                        <p class="text-xs margin1">
                            <strong><i class="fas fa-redo textG"></i> Option 2: Retake More Courses</strong><br>
                            Consider retaking additional low-grade courses
                        </p>
                        <p class="text-xs margin1">
                            <strong><i class="fas fa-calendar-alt textO"></i> Option 3: Future Trimesters</strong><br>
                            Plan for high performance in upcoming trimesters
                        </p>
                    </div>
                </div>
            `;
    }
    return html;
  }
  function getLetterGrade(gpa) {
    for (let grade of gradingSystem) {
      if (gpa >= grade.points - 0.165) {
        return grade.grade;
      }
    }
    return "F";
  }
  function getGradeDescription(gpa) {
    for (let grade of gradingSystem) {
      if (gpa >= grade.points - 0.165) {
        return grade.description;
      }
    }
    return "Fail";
  }
  function getMinScore(gpa) {
    for (let grade of gradingSystem) {
      if (gpa >= grade.points - 0.165) {
        return grade.min;
      }
    }
    return 0;
  }
  function getScoreRange(gpa) {
    for (let grade of gradingSystem) {
      if (gpa >= grade.points - 0.165) {
        return `${grade.min}% - ${grade.max}%`;
      }
    }
    return "0% - 54%";
  }
  function getDifficultyLevel(gpa) {
    if (gpa >= 3.84) return "Very Hard (Perfect Grades)";
    if (gpa >= 3.5) return "Hard (Mostly A's)";
    if (gpa >= 3.0) return "Moderate (B+ to A)";
    if (gpa >= 2.5) return "Achievable (B's)";
    return "Easy (C+ to B)";
  }
  function getClassification(cgpa) {
    if (cgpa >= 3.75) return '<strong class="textG">Summa Cum Laude</strong>';
    else if (cgpa >= 3.5)
      return '<strong class="textG">Magna Cum Laude</strong>';
    else if (cgpa >= 3.25) return '<strong class="textB">Cum Laude</strong>';
    else if (cgpa >= 3.0) return '<strong class="textB">Good Standing</strong>';
    else if (cgpa >= 2.5) return '<strong class="textO">Satisfactory</strong>';
    else if (cgpa >= 2.0) return '<strong class="textO">Pass</strong>';
    else return '<strong class="textR">At Risk</strong>';
  }
  function generateDetailedGradeDistributions(credits, requiredGPA) {
    let html = '<div class="text-xs">';
    html += '<p class="margin1"><strong>Recommended Strategies:</strong></p>';
    if (requiredGPA >= 3.84) {
      html +=
        '<p class="margin1"><i class="fas fa-star" style="color: var(--themeColor)!important;"></i> <strong>Strategy 1:</strong> All courses must be A (4.00)</p>';
      html +=
        '<p class="margin1">This requires perfect or near-perfect scores (90%+) in all courses</p>';
    } else if (requiredGPA >= 3.5) {
      html +=
        '<p class="margin1"><i class="fas fa-chart-bar" style="color: var(--themeColor)!important;"></i> <strong>Strategy 1:</strong> Mix of A and A- grades</p>';
      html +=
        '<p class="margin1" style="padding-left: 20px;">• 75% A (4.00) + 25% A- (3.67)</p>';
      html +=
        '<p class="margin1"><i class="fas fa-chart-bar" style="color: var(--themeColor)!important;"></i> <strong>Strategy 2:</strong> Consistent A- performance</p>';
      html +=
        '<p class="margin1" style="padding-left: 20px;">• All courses A- (3.67)</p>';
    } else if (requiredGPA >= 3.0) {
      html +=
        '<p class="margin1"><i class="fas fa-chart-bar" style="color: var(--themeColor)!important;"></i> <strong>Strategy 1:</strong> Balanced A and B grades</p>';
      html +=
        '<p class="margin1" style="padding-left: 20px;">• 50% A (4.00) + 50% B (3.00)</p>';
      html +=
        '<p class="margin1"><i class="fas fa-chart-bar" style="color: var(--themeColor)!important;"></i> <strong>Strategy 2:</strong> Consistent B+ performance</p>';
      html +=
        '<p class="margin1" style="padding-left: 20px;">• All courses B+ (3.33)</p>';
      html +=
        '<p class="margin1 note-b"><i class="fas fa-chart-bar" style="color: var(--themeColor)!important;"></i> <strong>Strategy 3:</strong> Mix approach</p>';
      html +=
        '<p class="margin1" style="padding-left: 20px;">• 33% A (4.00) + 33% B+ (3.33) + 33% B (3.00)</p>';
    } else if (requiredGPA >= 2.5) {
      html +=
        '<p class="margin1 note-g"><i class="fas fa-chart-bar" style="color: var(--themeColor)!important;"></i> <strong>Strategy 1:</strong> Consistent B performance</p>';
      html +=
        '<p class="margin1" style="padding-left: 20px;">• All courses B (3.00)</p>';
      html +=
        '<p class="margin1 note-g"><i class="fas fa-chart-bar"></i> <strong>Strategy 2:</strong> Mix of B and B- grades</p>';
      html +=
        '<p class="margin1" style="padding-left: 20px;">• 60% B (3.00) + 40% B- (2.67)</p>';
    } else {
      html +=
        '<p class="margin1 note-g"><i class="fas fa-chart-bar"></i> <strong>Strategy 1:</strong> Mix of B and C grades</p>';
      html +=
        '<p class="margin1" style="padding-left: 20px;">• 50% B (3.00) + 50% C+ (2.33)</p>';
      html +=
        '<p class="margin1 note-g"><i class="fas fa-chart-bar"></i> <strong>Strategy 2:</strong> Consistent C+ performance</p>';
      html +=
        '<p class="margin1" style="padding-left: 20px;">• All courses C+ (2.33)</p>';
    }
    html += "</div>";
    return html;
  }


  function displayResult(html) {
    const resultDiv = document.getElementById("targetResult");
    const placeholder = document.getElementById("rightPlaceholder");
    if (html) {
      resultDiv.innerHTML = html;
      resultDiv.style.display = "block";
      placeholder.style.display = "none";
    } else {
      resultDiv.style.display = "none";
      placeholder.style.display = "block";
    }
  }
  function resetCalculator() {
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
    document
      .querySelectorAll("select")
      .forEach((select) => (select.selectedIndex = 0));
    document
      .querySelectorAll('[id$="Error"]')
      .forEach((el) => (el.style.display = "none"));
    displayResult("");
    switchTab("next-trimester");
    document.getElementById("retakeCourseInputs").innerHTML = "";
    document.getElementById("addRetakeCourseBtn").style.display = "none";
  }
})();