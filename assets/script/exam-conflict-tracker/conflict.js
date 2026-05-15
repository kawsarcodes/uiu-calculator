let db = [];
let selectedIds = [];
const listEl = document.getElementById("trackerCourseContainer");
const gridEl = document.getElementById("trackerGrid");
const searchEl = document.getElementById("trackerSearchInput");
const deptSelector = document.getElementById("deptSelector");
const conflictBox = document.getElementById("alertConflictBox");
const warningBox = document.getElementById("alertWarningBox");
const termDisplay = document.getElementById("currentTrimester");
const updateDisplay = document.getElementById("lastUpdatedTime");
const resetBtn = document.getElementById("resetBtn");
const GITHUB_USER = "kawsarcodes";
const REPO_NAME = "exam-conflict-api";
const BASE_API_URL = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/main/departments/`;

function formatDate(dateString) {
  if (!dateString || dateString === "Unknown") return "N/A";
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-GB", options)
    .replace(/ /g, " ")
    .replace(/(\d+)/, "$1");
}

async function loadTrimesterData() {
  const dept = deptSelector ? deptSelector.value : null;
  if (!dept) return;

  try {
    listEl.innerHTML =
      '<div class="tracker-empty-state"><i class="fas fa-spinner fa-spin"></i> Fetching...</div>';

    const [metaRes, deptRes] = await Promise.all([
      fetch(
        `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/main/metadata.json`,
      ),
      fetch(`${BASE_API_URL}${dept}.json`),
    ]);

    if (!metaRes.ok || !deptRes.ok) throw new Error("API Fetch Failed");

    const metaData = await metaRes.json();
    const deptData = await deptRes.json();

    if (termDisplay) {
      const deptCode = deptData.slug
        ? deptData.slug.toUpperCase()
        : dept.toUpperCase();
      termDisplay.innerHTML = `${deptCode} (${metaData.currentTerm})`;
    }

    if (updateDisplay) {
      const directFileUrl = `https://github.com/${GITHUB_USER}/${REPO_NAME}/blob/main/departments/${dept}.json`;

      const rawDate = deptData.lastUpdated || "Unknown";
      const formattedDate = formatDate(rawDate);

      updateDisplay.innerHTML = `
    <style>
        .update-info {
            font-size: 14px;
            white-space: nowrap;
        }

        @media (max-width: 480px) {
            .update-info {
                font-size: 11px;
            }
        }
    </style>

    <span class="update-info">
        <i class="far fa-clock"></i> Last Updated:
        <span style="font-weight: 700;">${formattedDate}</span>
        <span style="margin-left: 2px; margin-right: 2px;">|</span>
        <a href="${directFileUrl}" target="_blank" style="color: var(--text); text-decoration: none;">
            <i class="fab fa-github" style="margin-right: 3px"></i> Contribute on GitHub
        </a>
    </span>
`;
    }

    const isUpdated = metaData.updatedDepartments.includes(dept);

    if (!isUpdated) {
      listEl.classList.remove("tracker-list-scroll");

      if (updateDisplay) updateDisplay.innerHTML = "";

      const directFileUrl = `https://github.com/${GITHUB_USER}/${REPO_NAME}/blob/main/departments/${dept}.json`;

      listEl.innerHTML = `
        <style>
            .lastUpdatedTime{
                display: none!important;
            }
        </style>

        <div class="fallback-container action-card">
            <div class="fallback-visual">
                <svg class="animated no-data-svg" id="freepik_stories-no-data" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><style>svg#freepik_stories-no-data:not(.animated) .animable {opacity: 0;}svg#freepik_stories-no-data.animated #freepik--window-no-data--inject-2 {animation: 1.0s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideDown,1.5s Infinite  linear floating;animation-delay: 0s,1s;}svg#freepik_stories-no-data.animated #freepik--Character--inject-2 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideUp;animation-delay: 0s;}            @keyframes slideDown {                0% {                    opacity: 0;                    transform: translateY(-30px);                }                100% {                    opacity: 1;                    transform: translateY(0);                }            }                    @keyframes floating {                0% {                    opacity: 1;                    transform: translateY(0px);                }                50% {                    transform: translateY(-10px);                }                100% {                    opacity: 1;                    transform: translateY(0px);                }            }                    @keyframes slideUp {                0% {                    opacity: 0;                    transform: translateY(30px);                }                100% {                    opacity: 1;                    transform: inherit;                }            }        .animator-hidden { display: none; }</style><g id="freepik--background-complete--inject-2" class="animable animator-hidden" style="transform-origin: 250px 228.23px;"><rect y="382.4" width="500" height="0.25" style="fill: rgb(235, 235, 235); transform-origin: 250px 382.525px;" id="elz8457agocnb" class="animable"></rect><rect x="416.78" y="398.49" width="33.12" height="0.25" style="fill: rgb(235, 235, 235); transform-origin: 433.34px 398.615px;" id="elk0oardaef7b" class="animable"></rect><rect x="322.53" y="401.21" width="8.69" height="0.25" style="fill: rgb(235, 235, 235); transform-origin: 326.875px 401.335px;" id="eljb5gcslg4y" class="animable"></rect><rect x="396.59" y="389.21" width="19.19" height="0.25" style="fill: rgb(235, 235, 235); transform-origin: 406.185px 389.335px;" id="ell7wkbw45ab" class="animable"></rect><rect x="52.46" y="390.89" width="43.19" height="0.25" style="fill: rgb(235, 235, 235); transform-origin: 74.055px 391.015px;" id="el8xg77u7t7a8" class="animable"></rect><rect x="104.56" y="390.89" width="6.33" height="0.25" style="fill: rgb(235, 235, 235); transform-origin: 107.725px 391.015px;" id="eli67stgyi2ul" class="animable"></rect><rect x="131.47" y="395.11" width="93.68" height="0.25" style="fill: rgb(235, 235, 235); transform-origin: 178.31px 395.235px;" id="el9qdxki4dd5s" class="animable"></rect><path d="M237,337.8H43.91a5.71,5.71,0,0,1-5.7-5.71V60.66A5.71,5.71,0,0,1,43.91,55H237a5.71,5.71,0,0,1,5.71,5.71V332.09A5.71,5.71,0,0,1,237,337.8ZM43.91,55.2a5.46,5.46,0,0,0-5.45,5.46V332.09a5.46,5.46,0,0,0,5.45,5.46H237a5.47,5.47,0,0,0,5.46-5.46V60.66A5.47,5.47,0,0,0,237,55.2Z" style="fill: rgb(235, 235, 235); transform-origin: 140.46px 196.4px;" id="eluf8xj6ukp7" class="animable"></path><path d="M453.31,337.8H260.21a5.72,5.72,0,0,1-5.71-5.71V60.66A5.72,5.72,0,0,1,260.21,55h193.1A5.71,5.71,0,0,1,459,60.66V332.09A5.71,5.71,0,0,1,453.31,337.8ZM260.21,55.2a5.47,5.47,0,0,0-5.46,5.46V332.09a5.47,5.47,0,0,0,5.46,5.46h193.1a5.47,5.47,0,0,0,5.46-5.46V60.66a5.47,5.47,0,0,0-5.46-5.46Z" style="fill: rgb(235, 235, 235); transform-origin: 356.75px 196.4px;" id="elqaz8uv3ysfo" class="animable"></path><g id="elw0z955q5kv9"><rect x="289.69" y="83.83" width="137.78" height="90.23" style="fill: rgb(230, 230, 230); transform-origin: 358.58px 128.945px; transform: rotate(180deg);" class="animable"></rect></g><g id="el22s45s53cbnh"><rect x="285.49" y="83.83" width="140.02" height="90.23" style="fill: rgb(240, 240, 240); transform-origin: 355.5px 128.945px; transform: rotate(180deg);" class="animable"></rect></g><g id="elxwszxedp6mo"><rect x="289.69" y="174.06" width="137.78" height="17.71" style="fill: rgb(230, 230, 230); transform-origin: 358.58px 182.915px; transform: rotate(180deg);" class="animable"></rect></g><g id="elpr35id8gfgo"><rect x="278.48" y="174.06" width="140.02" height="17.71" style="fill: rgb(240, 240, 240); transform-origin: 348.49px 182.915px; transform: rotate(180deg);" class="animable"></rect></g><g id="eljrz9kyk7ajl"><rect x="316.27" y="64.82" width="78.46" height="128.25" style="fill: rgb(250, 250, 250); transform-origin: 355.5px 128.945px; transform: rotate(90deg);" class="animable"></rect></g><polygon points="390.7 168.17 374.32 89.72 348.76 89.72 365.14 168.17 390.7 168.17" style="fill: rgb(255, 255, 255); transform-origin: 369.73px 128.945px;" id="elekh4cvxl2x4" class="animable"></polygon><path d="M416.9,162.32a.42.42,0,0,0,.42-.43V93.55a.42.42,0,0,0-.42-.42.41.41,0,0,0-.42.42v68.34A.42.42,0,0,0,416.9,162.32Z" style="fill: rgb(240, 240, 240); transform-origin: 416.9px 127.725px;" id="el9ur1cawno7j" class="animable"></path><polygon points="359.65 168.17 343.27 89.72 333.3 89.72 349.69 168.17 359.65 168.17" style="fill: rgb(255, 255, 255); transform-origin: 346.475px 128.945px;" id="eluwfa9n71zpq" class="animable"></polygon><g id="el71ox5w1bz02"><rect x="252.52" y="128.57" width="78.46" height="0.75" style="fill: rgb(230, 230, 230); transform-origin: 291.75px 128.945px; transform: rotate(90deg);" class="animable"></rect></g><g id="el6ktehq77vc7"><polygon points="284.1 98.59 421.88 98.59 422.42 92 284.64 92 284.1 98.59" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 353.26px 95.295px;" class="animable"></polygon></g><g id="ely4bby20t41i"><polygon points="284.1 109.39 421.88 109.39 422.42 102.81 284.64 102.81 284.1 109.39" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 353.26px 106.1px;" class="animable"></polygon></g><g id="el6l01lmpihbv"><polygon points="284.1 120.19 421.88 120.19 422.42 113.61 284.64 113.61 284.1 120.19" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 353.26px 116.9px;" class="animable"></polygon></g><g id="elqg9l9775nb"><polygon points="284.1 131 421.88 131 422.42 124.41 284.64 124.41 284.1 131" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 353.26px 127.705px;" class="animable"></polygon></g><g id="elo3opw4tdzsf"><polygon points="284.1 141.8 421.88 141.8 422.42 135.21 284.64 135.21 284.1 141.8" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 353.26px 138.505px;" class="animable"></polygon></g><g id="elyhw5m5f72q"><polygon points="284.1 152.6 421.88 152.6 422.42 146.01 284.64 146.01 284.1 152.6" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 353.26px 149.305px;" class="animable"></polygon></g><rect x="378.8" y="316.78" width="28.89" height="5.7" style="fill: rgb(230, 230, 230); transform-origin: 393.245px 319.63px;" id="elwt4g5ih0l9n" class="animable"></rect><g id="el2whkphj0hsw"><rect x="324.31" y="251.33" width="5.33" height="131.07" style="fill: rgb(230, 230, 230); transform-origin: 326.975px 316.865px; transform: rotate(180deg);" class="animable"></rect></g><g id="el2mov06q1ebz"><rect x="305.84" y="316.78" width="72.96" height="5.7" style="fill: rgb(245, 245, 245); transform-origin: 342.32px 319.63px; transform: rotate(180deg);" class="animable"></rect></g><rect x="378.8" y="347.95" width="28.89" height="5.7" style="fill: rgb(230, 230, 230); transform-origin: 393.245px 350.8px;" id="els33s8a40cp" class="animable"></rect><g id="elldbtis4ux4"><rect x="305.84" y="347.95" width="72.96" height="5.7" style="fill: rgb(245, 245, 245); transform-origin: 342.32px 350.8px; transform: rotate(180deg);" class="animable"></rect></g><rect x="378.8" y="254.45" width="28.89" height="5.7" style="fill: rgb(230, 230, 230); transform-origin: 393.245px 257.3px;" id="elvxf56c9cobh" class="animable"></rect><g id="elrhtwrpgz4qh"><rect x="305.84" y="254.45" width="72.96" height="5.7" style="fill: rgb(245, 245, 245); transform-origin: 342.32px 257.3px; transform: rotate(180deg);" class="animable"></rect></g><rect x="378.8" y="285.61" width="28.89" height="5.7" style="fill: rgb(230, 230, 230); transform-origin: 393.245px 288.46px;" id="elr5z2nkm2xm" class="animable"></rect><g id="elpzddesqhmb"><rect x="305.84" y="285.61" width="72.96" height="5.7" style="fill: rgb(245, 245, 245); transform-origin: 342.32px 288.46px; transform: rotate(180deg);" class="animable"></rect></g><g id="elkpr2nh6k7w"><rect x="397.27" y="251.33" width="5.33" height="131.07" style="fill: rgb(230, 230, 230); transform-origin: 399.935px 316.865px; transform: rotate(180deg);" class="animable"></rect></g><g id="elo3qyknq0gxj"><rect x="373.47" y="251.33" width="5.33" height="131.07" style="fill: rgb(245, 245, 245); transform-origin: 376.135px 316.865px; transform: rotate(180deg);" class="animable"></rect></g><g id="elfi21ub081bm"><rect x="305.84" y="251.33" width="5.33" height="131.07" style="fill: rgb(245, 245, 245); transform-origin: 308.505px 316.865px; transform: rotate(180deg);" class="animable"></rect></g><g id="eliae2u81ni49"><rect x="65.37" y="276.51" width="54.58" height="105.89" style="fill: rgb(230, 230, 230); transform-origin: 92.66px 329.455px; transform: rotate(180deg);" class="animable"></rect></g><polygon points="79.95 382.4 65.37 382.4 65.37 367.78 95.23 367.78 79.95 382.4" style="fill: rgb(250, 250, 250); transform-origin: 80.3px 375.09px;" id="els0cs78nsmim" class="animable"></polygon><g id="elvxpvc98c0u"><rect x="214.18" y="276.51" width="54.58" height="105.89" style="fill: rgb(230, 230, 230); transform-origin: 241.47px 329.455px; transform: rotate(180deg);" class="animable"></rect></g><g id="elah8p8j4np0k"><rect x="65.37" y="276.51" width="161.53" height="100.86" style="fill: rgb(250, 250, 250); transform-origin: 146.135px 326.94px; transform: rotate(180deg);" class="animable"></rect></g><polygon points="212.33 382.4 226.9 382.4 226.9 367.78 197.05 367.78 212.33 382.4" style="fill: rgb(250, 250, 250); transform-origin: 211.975px 375.09px;" id="elb2o56f7ym0g" class="animable"></polygon><g id="elbqx4nmq3ab"><rect x="76.68" y="314.09" width="138.92" height="25.24" style="fill: rgb(240, 240, 240); transform-origin: 146.14px 326.71px; transform: rotate(180deg);" class="animable"></rect></g><g id="eleffmatb2r6r"><rect x="76.68" y="344.73" width="138.92" height="25.24" style="fill: rgb(240, 240, 240); transform-origin: 146.14px 357.35px; transform: rotate(180deg);" class="animable"></rect></g><g id="elofbzvfy0ulr"><path d="M103.08,311.9h86.11a4.58,4.58,0,0,1,4.58,4.58v.31a0,0,0,0,1,0,0H98.51a0,0,0,0,1,0,0v-.31A4.58,4.58,0,0,1,103.08,311.9Z" style="fill: rgb(250, 250, 250); transform-origin: 146.14px 314.345px; transform: rotate(180deg);" class="animable"></path></g><g id="el132tgy4mivb"><rect x="76.68" y="283.46" width="138.92" height="25.24" style="fill: rgb(240, 240, 240); transform-origin: 146.14px 296.08px; transform: rotate(180deg);" class="animable"></rect></g><g id="eloggz9p2gb37"><path d="M103.08,281.27h86.11a4.58,4.58,0,0,1,4.58,4.58v.31a0,0,0,0,1,0,0H98.51a0,0,0,0,1,0,0v-.31A4.58,4.58,0,0,1,103.08,281.27Z" style="fill: rgb(250, 250, 250); transform-origin: 146.14px 283.715px; transform: rotate(180deg);" class="animable"></path></g><g id="elaanh4dmeiip"><path d="M103.08,342.54h86.11a4.58,4.58,0,0,1,4.58,4.58v.31a0,0,0,0,1,0,0H98.51a0,0,0,0,1,0,0v-.31A4.58,4.58,0,0,1,103.08,342.54Z" style="fill: rgb(250, 250, 250); transform-origin: 146.14px 344.985px; transform: rotate(180deg);" class="animable"></path></g><g id="el6xznbu1122"><rect x="74.07" y="83.83" width="137.78" height="90.23" style="fill: rgb(230, 230, 230); transform-origin: 142.96px 128.945px; transform: rotate(180deg);" class="animable"></rect></g><g id="elrbn2jr1812j"><rect x="69.86" y="83.83" width="140.02" height="90.23" style="fill: rgb(240, 240, 240); transform-origin: 139.87px 128.945px; transform: rotate(180deg);" class="animable"></rect></g><g id="elypgghnqpjor"><rect x="74.07" y="174.06" width="137.78" height="17.71" style="fill: rgb(230, 230, 230); transform-origin: 142.96px 182.915px; transform: rotate(180deg);" class="animable"></rect></g><g id="elh58zszjq8wi"><rect x="62.86" y="174.06" width="140.02" height="17.71" style="fill: rgb(240, 240, 240); transform-origin: 132.87px 182.915px; transform: rotate(180deg);" class="animable"></rect></g><g id="el7289oiw9pfq"><rect x="100.65" y="64.82" width="78.46" height="128.25" style="fill: rgb(250, 250, 250); transform-origin: 139.88px 128.945px; transform: rotate(90deg);" class="animable"></rect></g><polygon points="175.08 168.17 158.7 89.72 133.14 89.72 149.52 168.17 175.08 168.17" style="fill: rgb(255, 255, 255); transform-origin: 154.11px 128.945px;" id="el683nvvjp0yw" class="animable"></polygon><path d="M201.27,162.32a.42.42,0,0,0,.42-.43V93.55a.41.41,0,0,0-.42-.42.42.42,0,0,0-.42.42v68.34A.42.42,0,0,0,201.27,162.32Z" style="fill: rgb(240, 240, 240); transform-origin: 201.27px 127.725px;" id="elx3olej4hhg8" class="animable"></path><polygon points="144.03 168.17 127.65 89.72 117.68 89.72 134.06 168.17 144.03 168.17" style="fill: rgb(255, 255, 255); transform-origin: 130.855px 128.945px;" id="elj4fn8xzbg6p" class="animable"></polygon><g id="elmtcysdym57q"><rect x="36.9" y="128.57" width="78.46" height="0.75" style="fill: rgb(230, 230, 230); transform-origin: 76.13px 128.945px; transform: rotate(90deg);" class="animable"></rect></g><g id="eloh183z15vg"><polygon points="68.47 98.59 206.25 98.59 206.79 92 69.01 92 68.47 98.59" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 137.63px 95.295px;" class="animable"></polygon></g><g id="elwcheicrzjp"><polygon points="68.47 102.31 206.25 102.31 206.79 95.72 69.01 95.72 68.47 102.31" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 137.63px 99.015px;" class="animable"></polygon></g><g id="el99jzqs9xcjb"><polygon points="68.47 106.02 206.25 106.02 206.79 99.44 69.01 99.44 68.47 106.02" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 137.63px 102.73px;" class="animable"></polygon></g><g id="el2ikjce17i8b"><polygon points="68.47 109.74 206.25 109.74 206.79 103.15 69.01 103.15 68.47 109.74" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 137.63px 106.445px;" class="animable"></polygon></g><g id="ely9zmc34ptc"><polygon points="68.47 113.45 206.25 113.45 206.79 106.87 69.01 106.87 68.47 113.45" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 137.63px 110.16px;" class="animable"></polygon></g><g id="elihd0pgm6vs8"><polygon points="68.47 117.17 206.25 117.17 206.79 110.58 69.01 110.58 68.47 117.17" style="fill: rgb(235, 235, 235); opacity: 0.6; transform-origin: 137.63px 113.875px;" class="animable"></polygon></g><g id="eliuw1cymwjm8"><rect x="96.01" y="220.18" width="4.76" height="53.09" style="fill: rgb(245, 245, 245); transform-origin: 98.39px 246.725px; transform: rotate(180deg);" class="animable"></rect></g><g id="elr40cawsfvvf"><rect x="96.63" y="220.14" width="1.35" height="53.09" style="fill: rgb(250, 250, 250); transform-origin: 97.305px 246.685px; transform: rotate(180deg);" class="animable"></rect></g><g id="elz0m0815fmml"><rect x="98.54" y="220.14" width="0.53" height="53.09" style="fill: rgb(250, 250, 250); transform-origin: 98.805px 246.685px; transform: rotate(180deg);" class="animable"></rect></g><g id="elzqlnx4lbt2p"><path d="M80.76,272.06H116a0,0,0,0,1,0,0v0a4.44,4.44,0,0,1-4.44,4.44H85.21a4.44,4.44,0,0,1-4.44-4.44v0A0,0,0,0,1,80.76,272.06Z" style="fill: rgb(240, 240, 240); transform-origin: 98.38px 274.28px; transform: rotate(180deg);" class="animable"></path></g><path d="M89.84,253.14h0a1.38,1.38,0,0,0,1.37-1.37V217a1.37,1.37,0,0,0-1.37-1.37h0A1.37,1.37,0,0,0,88.46,217v34.81A1.38,1.38,0,0,0,89.84,253.14Z" style="fill: rgb(240, 240, 240); transform-origin: 89.835px 234.385px;" id="elrklj5v0350f" class="animable"></path><polygon points="77.07 232.8 119.72 232.8 114.81 203 81.98 203 77.07 232.8" style="fill: rgb(224, 224, 224); transform-origin: 98.395px 217.9px;" id="el2ib08ise86j" class="animable"></polygon></g><g id="freepik--Shadow--inject-2" class="animable animator-hidden" style="transform-origin: 250px 416.24px;"><ellipse id="freepik--path--inject-2" cx="250" cy="416.24" rx="193.89" ry="11.32" style="fill: rgb(245, 245, 245); transform-origin: 250px 416.24px;" class="animable"></ellipse></g><g id="freepik--window-no-data--inject-2" class="animable animator-active" style="transform-origin: 224.924px 233.29px;"><g id="el78gcj3iyn5m"><rect x="103.78" y="202.37" width="1" height="18.49" style="fill: var(--theme-color); transform-origin: 104.28px 211.615px; transform: rotate(-4.12deg);" class="animable"></rect></g><g id="elfh7tgk02xow"><rect x="105.38" y="230.35" width="1" height="6.96" style="fill: var(--theme-color); transform-origin: 105.88px 233.83px; transform: rotate(-4.12deg);" class="animable"></rect></g><path d="M337.71,315.16H123.55a9.65,9.65,0,0,1-9.44-8.81L103.59,160.22a8.1,8.1,0,0,1,8.17-8.8H325.92a9.65,9.65,0,0,1,9.44,8.8l10.52,146.13A8.11,8.11,0,0,1,337.71,315.16Z" style="fill: var(--theme-color); transform-origin: 224.735px 233.29px;" id="elcugbt4eythn" class="animable"></path><path d="M338.53,315.16H124.37a9.65,9.65,0,0,1-9.44-8.81L104.41,160.22a8.1,8.1,0,0,1,8.17-8.8H326.74a9.65,9.65,0,0,1,9.44,8.8L346.7,306.35A8.1,8.1,0,0,1,338.53,315.16Z" style="fill: var(--theme-color); transform-origin: 225.555px 233.29px;" id="els2xkhd95me" class="animable"></path><g id="elgfkxc4r374k"><path d="M338.53,315.16H124.37a9.65,9.65,0,0,1-9.44-8.81L104.41,160.22a8.1,8.1,0,0,1,8.17-8.8H326.74a9.65,9.65,0,0,1,9.44,8.8L346.7,306.35A8.1,8.1,0,0,1,338.53,315.16Z" style="fill: rgb(255, 255, 255); opacity: 0.5; transform-origin: 225.555px 233.29px;" class="animable"></path></g><path d="M327.06,155.82H112.9l-.72,0c-5.47.45-4.35,8.78,1.17,8.78H327.87c5.53,0,5.45-8.33-.09-8.78Z" style="fill: var(--theme-color); transform-origin: 220.288px 160.21px;" id="elz23j6g71lzi" class="animable"></path><path d="M118.48,160.22a1.85,1.85,0,0,1-1.88,2,2.2,2.2,0,0,1-2.16-2,1.85,1.85,0,0,1,1.87-2A2.2,2.2,0,0,1,118.48,160.22Z" style="fill: rgb(250, 250, 250); transform-origin: 116.46px 160.22px;" id="el9fvkuywh1c" class="animable"></path><path d="M125.35,160.22a1.85,1.85,0,0,1-1.88,2,2.2,2.2,0,0,1-2.16-2,1.85,1.85,0,0,1,1.87-2A2.2,2.2,0,0,1,125.35,160.22Z" style="fill: rgb(250, 250, 250); transform-origin: 123.33px 160.22px;" id="elu7vsvi7gegr" class="animable"></path><path d="M132.21,160.22a1.85,1.85,0,0,1-1.87,2,2.19,2.19,0,0,1-2.16-2,1.84,1.84,0,0,1,1.87-2A2.2,2.2,0,0,1,132.21,160.22Z" style="fill: rgb(250, 250, 250); transform-origin: 130.195px 160.22px;" id="elneb4sb8lnus" class="animable"></path><path d="M332.85,300.58H128a3.49,3.49,0,0,1-3.42-3.2l-8.65-120.17a2.92,2.92,0,0,1,3-3.19h204.9a3.48,3.48,0,0,1,3.42,3.19l8.66,120.17A2.94,2.94,0,0,1,332.85,300.58Z" style="fill: rgb(255, 255, 255); transform-origin: 225.92px 237.301px;" id="elzs2jbjy6jl" class="animable"></path><polygon points="246.53 254.8 243.19 208.48 233.09 202.4 205.28 202.4 209.06 254.8 246.53 254.8" style="fill: rgb(255, 255, 255); transform-origin: 225.905px 228.6px;" id="elfso0f2dv5ln" class="animable"></polygon><path d="M246.53,255.28H209.06a.48.48,0,0,1-.49-.45l-3.77-52.4a.47.47,0,0,1,.13-.36.48.48,0,0,1,.35-.16h27.81a.55.55,0,0,1,.25.07l10.1,6.08a.48.48,0,0,1,.24.38L247,254.76a.46.46,0,0,1-.13.37A.47.47,0,0,1,246.53,255.28Zm-37-1H246l-3.28-45.55L233,202.88H205.8Z" style="fill: var(--theme-color); transform-origin: 225.901px 228.595px;" id="elwjlt1v483f" class="animable"></path><polygon points="243.19 208.48 233.09 202.4 236.8 210.46 243.19 208.48" style="fill: rgb(235, 235, 235); transform-origin: 238.14px 206.43px;" id="el9r1s6ekpwa" class="animable"></polygon><path d="M236.8,210.94a.49.49,0,0,1-.44-.28l-3.71-8.06a.5.5,0,0,1,.11-.57.5.5,0,0,1,.58-.05l10.1,6.08a.5.5,0,0,1,.24.48.49.49,0,0,1-.34.4l-6.4,2Zm-2.61-7.32,2.87,6.25,5-1.53Z" style="fill: var(--theme-color); transform-origin: 238.144px 206.425px;" id="eljri23otwfu9" class="animable"></path><path d="M221,226a2,2,0,0,1-2,2.11,2.31,2.31,0,0,1-2.26-2.11,1.94,1.94,0,0,1,2-2.12A2.32,2.32,0,0,1,221,226Z" style="fill: var(--theme-color); transform-origin: 218.867px 225.994px;" id="elipy8a8zwr" class="animable"></path><path d="M234.7,226a1.94,1.94,0,0,1-2,2.11,2.32,2.32,0,0,1-2.27-2.11,2,2,0,0,1,2-2.12A2.31,2.31,0,0,1,234.7,226Z" style="fill: var(--theme-color); transform-origin: 232.567px 225.996px;" id="el6vx1l5ezx3w" class="animable"></path><path d="M238.58,239.74a.49.49,0,0,1-.48-.45c-.25-3.41-5.59-6.18-11.9-6.18-4.19,0-7.95,1.25-9.81,3.25a3.74,3.74,0,0,0-1.14,2.86.49.49,0,0,1-1,.07,4.76,4.76,0,0,1,1.4-3.59c2-2.19,6.07-3.56,10.52-3.56,6.93,0,12.58,3.11,12.86,7.08a.48.48,0,0,1-.45.51Z" style="fill: var(--theme-color); transform-origin: 226.638px 235.948px;" id="el3euc5ojbzjq" class="animable"></path><path d="M213.17,221.72a.51.51,0,0,1-.33-.13.49.49,0,0,1,0-.69l2.13-2.29a.49.49,0,0,1,.68,0,.48.48,0,0,1,0,.68l-2.13,2.29A.48.48,0,0,1,213.17,221.72Z" style="fill: var(--theme-color); transform-origin: 214.245px 220.096px;" id="el5z7zqua1wf9" class="animable"></path><path d="M237.58,221.72a.55.55,0,0,1-.33-.13l-2.45-2.29a.48.48,0,0,1,0-.69.49.49,0,0,1,.68,0l2.45,2.29a.48.48,0,0,1,0,.68A.52.52,0,0,1,237.58,221.72Z" style="fill: var(--theme-color); transform-origin: 236.362px 220.096px;" id="eldpfq9ahwq19" class="animable"></path><path d="M202.26,265.15h2.26l3.26,4.34-.31-4.34h2.28l.56,7.84H208l-3.24-4.31.31,4.31h-2.28Z" style="fill: var(--theme-color); transform-origin: 206.285px 269.07px;" id="elzmv7clqmak" class="animable"></path><path d="M211.33,269.07a3.8,3.8,0,0,1,.86-3,3.76,3.76,0,0,1,2.9-1.07,4.38,4.38,0,0,1,3.09,1.05,4.32,4.32,0,0,1,1.27,2.94,4.77,4.77,0,0,1-.3,2.25,3,3,0,0,1-1.24,1.37,4.16,4.16,0,0,1-2.14.49,5.25,5.25,0,0,1-2.23-.42,3.62,3.62,0,0,1-1.5-1.34A4.66,4.66,0,0,1,211.33,269.07Zm2.43,0a2.73,2.73,0,0,0,.56,1.7,1.59,1.59,0,0,0,1.24.52,1.38,1.38,0,0,0,1.17-.51A2.75,2.75,0,0,0,217,269a2.57,2.57,0,0,0-.56-1.62,1.64,1.64,0,0,0-1.25-.51,1.38,1.38,0,0,0-1.14.52A2.53,2.53,0,0,0,213.76,269.09Z" style="fill: var(--theme-color); transform-origin: 215.384px 269.047px;" id="el5ba1oxyf1rb" class="animable"></path><path d="M224.15,265.15h3.6a4.51,4.51,0,0,1,1.74.29,3.06,3.06,0,0,1,1.14.83,3.76,3.76,0,0,1,.71,1.25,6.3,6.3,0,0,1,.3,1.52,5.08,5.08,0,0,1-.15,1.95,2.8,2.8,0,0,1-.71,1.16,2.3,2.3,0,0,1-1,.62,5.6,5.6,0,0,1-1.43.22h-3.59Zm2.55,1.78.31,4.28h.59a2.45,2.45,0,0,0,1.07-.17,1,1,0,0,0,.46-.59,3.54,3.54,0,0,0,.08-1.36,2.72,2.72,0,0,0-.53-1.7,1.81,1.81,0,0,0-1.38-.46Z" style="fill: var(--theme-color); transform-origin: 227.912px 269.069px;" id="elu5c0820p03" class="animable"></path><path d="M237.45,271.69H234.7l-.29,1.3h-2.47l2.38-7.84H237l3.51,7.84h-2.54Zm-.63-1.69-1.06-2.82L235.1,270Z" style="fill: var(--theme-color); transform-origin: 236.225px 269.07px;" id="elqqd9qdse2m" class="animable"></path><path d="M239.37,265.15h7.36l.14,1.94H244.4l.42,5.9H242.4l-.42-5.9h-2.47Z" style="fill: var(--theme-color); transform-origin: 243.12px 269.07px;" id="el6glcmodjqsh" class="animable"></path><path d="M252.37,271.69h-2.75l-.29,1.3h-2.47l2.38-7.84h2.64l3.5,7.84h-2.53Zm-.63-1.69-1.07-2.82L250,270Z" style="fill: var(--theme-color); transform-origin: 251.12px 269.07px;" id="eloid04c6u6ra" class="animable"></path></g><g id="freepik--Character--inject-2" class="animable" style="transform-origin: 336.555px 264.616px;"><path d="M353.69,173.08c.89-.45,2-1,2.94-1.57s2-1.12,3-1.72c1.95-1.21,3.93-2.4,5.8-3.72a76.94,76.94,0,0,0,10.52-8.66c.41-.38.77-.8,1.16-1.21l.57-.61.28-.3.14-.16s0,0,0,0l0,0c-.14.27,0,.19,0-.07a5.28,5.28,0,0,0,.15-1.09,30.6,30.6,0,0,0-.73-6.32c-.89-4.48-2.24-9.1-3.57-13.62l3.88-1.7a81.31,81.31,0,0,1,6.11,13.6,31.67,31.67,0,0,1,1.72,7.89,12,12,0,0,1-.08,2.51,7.71,7.71,0,0,1-1.22,3.29l-.17.23-.13.16-.15.19-.31.38-.62.75c-.41.49-.81,1-1.25,1.47A71.85,71.85,0,0,1,370.35,173c-2,1.48-4.12,2.9-6.29,4.19-1.07.65-2.16,1.27-3.27,1.88s-2.19,1.17-3.47,1.77Z" style="fill: rgb(255, 181, 115); transform-origin: 369.691px 156.585px;" id="el4te6zcxz04x" class="animable"></path><path d="M344.79,408.18a10.27,10.27,0,0,0,2.22-.3.22.22,0,0,0,.15-.16.21.21,0,0,0-.09-.2c-.29-.19-2.83-1.83-3.81-1.39a.68.68,0,0,0-.39.56,1.13,1.13,0,0,0,.33,1.05A2.35,2.35,0,0,0,344.79,408.18Zm1.65-.58c-1.45.29-2.55.24-3-.15a.77.77,0,0,1-.2-.71.3.3,0,0,1,.17-.25C343.94,406.26,345.41,407,346.44,407.6Z" style="fill: var(--theme-color); transform-origin: 345.004px 407.122px;" id="el5di0rcdgs87" class="animable"></path><path d="M347,407.88l.1,0a.21.21,0,0,0,.1-.17c0-.11,0-2.52-.92-3.32a1,1,0,0,0-.84-.27.69.69,0,0,0-.67.55c-.19,1,1.33,2.75,2.13,3.21A.18.18,0,0,0,347,407.88Zm-1.43-3.39a.66.66,0,0,1,.44.17,4.53,4.53,0,0,1,.78,2.64c-.8-.64-1.75-2-1.63-2.57,0-.09.07-.21.32-.24Z" style="fill: var(--theme-color); transform-origin: 345.977px 405.998px;" id="ellx0nv0w5nbf" class="animable"></path><path d="M346.22,148.07c-1,5-3,15,.45,18.35,0,0-1.36,5-10.59,5-10.16,0-4.85-5-4.85-5,5.54-1.32,5.39-5.43,4.43-9.3Z" style="fill: rgb(255, 181, 115); transform-origin: 338.257px 159.745px;" id="elx0417mo9p3d" class="animable"></path><path d="M329.28,168.42c-1.59.22-.23-3.91.41-4.34,1.5-1,20.86-2.39,20.73,0-.08,1-.56,3-1.4,3.66S343.2,166.34,329.28,168.42Z" style="fill: rgb(38, 50, 56); transform-origin: 339.479px 165.594px;" id="eltqtkr4vfslk" class="animable"></path><path d="M332.44,167c-1.27.43-1.15-3.73-.72-4.23,1-1.16,16.67-5.18,17.13-2.91.18,1,.27,3-.27,3.71S343.44,163.11,332.44,167Z" style="fill: rgb(38, 50, 56); transform-origin: 340.206px 163.104px;" id="elul2v9k895e" class="animable"></path><path d="M326.61,139.11a.4.4,0,0,1-.33-.15,3.18,3.18,0,0,0-2.59-1.23.39.39,0,0,1-.44-.35.4.4,0,0,1,.35-.43,3.91,3.91,0,0,1,3.29,1.51.4.4,0,0,1-.05.56A.5.5,0,0,1,326.61,139.11Z" style="fill: rgb(38, 50, 56); transform-origin: 325.115px 138.028px;" id="elo7o1rrshoub" class="animable"></path><path d="M324.67,144a17.91,17.91,0,0,1-2,4.53,2.9,2.9,0,0,0,2.44.21Z" style="fill: rgb(255, 86, 82); transform-origin: 323.89px 146.458px;" id="el52q7t5zhk8a" class="animable"></path><path d="M325.16,142.79c.07.67-.24,1.25-.68,1.29s-.85-.46-.91-1.14.24-1.25.67-1.29S325.09,142.11,325.16,142.79Z" style="fill: rgb(38, 50, 56); transform-origin: 324.366px 142.865px;" id="el1lm2s47fr6m" class="animable"></path><path d="M324.44,141.67l-1.66-.31S323.73,142.54,324.44,141.67Z" style="fill: rgb(38, 50, 56); transform-origin: 323.61px 141.675px;" id="elzw2wwhwl5dr" class="animable"></path><polygon points="356.7 407.69 348.32 407.69 348.98 388.29 357.36 388.29 356.7 407.69" style="fill: rgb(255, 181, 115); transform-origin: 352.84px 397.99px;" id="elsw20iaztbt" class="animable"></polygon><path d="M347.66,406.72h9.41a.66.66,0,0,1,.67.57l1.07,7.44a1.34,1.34,0,0,1-1.34,1.49c-3.28-.05-4.86-.25-9-.25-2.55,0-6.27.27-9.78.27s-3.71-3.48-2.24-3.79c6.56-1.42,7.6-3.36,9.81-5.22A2.21,2.21,0,0,1,347.66,406.72Z" style="fill: rgb(38, 50, 56); transform-origin: 347.203px 411.48px;" id="elzea0hfa3fk" class="animable"></path><g id="el4toeoom2ode"><g style="opacity: 0.2; transform-origin: 353px 393.29px;" class="animable"><polygon points="357.36 388.29 348.98 388.29 348.64 398.29 357.02 398.29 357.36 388.29" id="elpfh09qsdfe9" class="animable" style="transform-origin: 353px 393.29px;"></polygon></g></g><path d="M323.37,178a162.48,162.48,0,0,1-15.05-6.75,91.24,91.24,0,0,1-14.4-8.77,34.31,34.31,0,0,1-3.42-3.07c-.28-.3-.56-.58-.83-.93a11.32,11.32,0,0,1-.88-1.13,7.9,7.9,0,0,1-1.34-3.61,8.22,8.22,0,0,1,.49-3.62,10.64,10.64,0,0,1,1.41-2.6,18.13,18.13,0,0,1,3.39-3.52,42,42,0,0,1,7.3-4.67c1.24-.66,2.5-1.25,3.78-1.8s2.54-1.07,3.91-1.54l1.77,3.85c-4.36,2.75-8.88,5.78-12.2,9.16a13.86,13.86,0,0,0-1.95,2.49c-.48.79-.47,1.38-.39,1.33s0,0,.14.1l.4.43c.15.18.36.36.55.55a25.62,25.62,0,0,0,2.69,2.16,62.92,62.92,0,0,0,6.44,4c2.25,1.26,4.57,2.45,6.93,3.59,4.72,2.26,9.6,4.43,14.39,6.41Z" style="fill: rgb(255, 181, 115); transform-origin: 306.959px 156.995px;" id="elxhqpngimhus" class="animable"></path><path d="M312,137.15l1.38-3L307.06,132s-2,5.91.37,8.63h0A6.05,6.05,0,0,0,312,137.15Z" style="fill: rgb(255, 181, 115); transform-origin: 309.826px 136.315px;" id="elluoref2ts8" class="animable"></path><polygon points="313.35 127.66 308.32 126.2 307.06 131.96 313.35 134.15 313.35 127.66" style="fill: rgb(255, 181, 115); transform-origin: 310.205px 130.175px;" id="elzz06hclszb" class="animable"></polygon><path d="M378.35,134.44l.73-7L372.6,129s-.1,6.58,3.33,7.62Z" style="fill: rgb(255, 181, 115); transform-origin: 375.84px 132.03px;" id="elh7jb6d44enn" class="animable"></path><polygon points="375.96 122.51 371.73 124.48 372.6 128.95 379.08 127.42 375.96 122.51" style="fill: rgb(255, 181, 115); transform-origin: 375.405px 125.73px;" id="el0wxzuwt1da6" class="animable"></polygon><path d="M347.54,138.25c.31,8.31.61,11.82-3.14,16.47-5.65,7-15.92,5.55-18.7-2.5-2.5-7.24-2.58-19.61,5.18-23.69A11.34,11.34,0,0,1,347.54,138.25Z" style="fill: rgb(255, 181, 115); transform-origin: 335.951px 143.207px;" id="elu9v80weuw7q" class="animable"></path><path d="M343.92,154.71c8.16-3.53,13.52-11,11.26-22.58-2.17-11.11-9.67-12.21-12.77-9.91s-10.83-1.13-15.47,2.77c-8,6.77-.44,14,3.52,18.37C332.82,148.22,335.92,158.16,343.92,154.71Z" style="fill: rgb(38, 50, 56); transform-origin: 339.556px 138.327px;" id="elc4xiddcgm2" class="animable"></path><path d="M340.53,130.14a8.29,8.29,0,1,0,1.83-11.92A8.53,8.53,0,0,0,340.53,130.14Z" style="fill: var(--theme-color); transform-origin: 347.118px 125.043px;" id="ellkvo7gbst2d" class="animable"></path><path d="M342.65,123c-1.17-6.7,5.16-11.86,13.64-9.37s4,10,2.25,16,2.83,11.72,4.73,7.15-1.3-6-1.3-6,9,2.33.64,12.48-15.93-1.06-13.88-7.67C350.39,130.28,343.76,129.33,342.65,123Z" style="fill: rgb(38, 50, 56); transform-origin: 354.339px 130.164px;" id="els5j7lc9533k" class="animable"></path><path d="M334.18,125.53c-3.87-2-10.42-3.65-14.15,2.63-1.76,3-1.08,7-1.08,7l11.39.75Z" style="fill: rgb(38, 50, 56); transform-origin: 326.5px 129.819px;" id="elng78hia5ocl" class="animable"></path><path d="M317.61,133.18h0a.26.26,0,0,1-.24-.27c0-.17.29-4.19,2.72-6.71,5.87-6.1,12.75-1,14.71.65a.25.25,0,0,1-.32.38c-1.89-1.62-8.47-6.47-14-.69-2.3,2.39-2.58,6.36-2.58,6.4A.25.25,0,0,1,317.61,133.18Z" style="fill: rgb(38, 50, 56); transform-origin: 326.119px 128.233px;" id="elefmsguuqs" class="animable"></path><path d="M331.85,143a6.89,6.89,0,0,1-1.65,4.28c-1.38,1.62-3,.82-3.33-1-.33-1.61,0-4.4,1.74-5.37S331.87,141.18,331.85,143Z" style="fill: rgb(255, 181, 115); transform-origin: 329.303px 144.363px;" id="el6ar6xy93l8f" class="animable"></path><path d="M330.05,219.12s.54,58.15,5.58,90.55c4.08,26.17,11.61,86.69,11.61,86.69h11.43s1.11-58.43-1-84.31c-5.23-65.5,8.28-77.75-2.62-92.93Z" style="fill: rgb(38, 50, 56); transform-origin: 344.743px 307.74px;" id="elw7zyfdu6xrq" class="animable"></path><g id="elh091e070wjf"><path d="M330.05,219.12s.54,58.15,5.58,90.55c4.08,26.17,11.61,86.69,11.61,86.69h11.43s1.11-58.43-1-84.31c-5.23-65.5,8.28-77.75-2.62-92.93Z" style="fill: rgb(255, 255, 255); opacity: 0.1; transform-origin: 344.743px 307.74px;" class="animable"></path></g><g id="elu6brv825jk"><path d="M336.06,245.5c4,17.55.81,45.19-1.38,57.36-2.32-18.48-3.49-42.43-4.07-60C332.68,239.52,334.64,239.3,336.06,245.5Z" style="opacity: 0.3; transform-origin: 334.289px 271.702px;" class="animable"></path></g><polygon points="345.68 396.58 360.23 396.58 360.99 391.48 345.6 390.96 345.68 396.58" style="fill: var(--theme-color); transform-origin: 353.295px 393.77px;" id="el1ffji8z3ktd" class="animable"></polygon><path d="M349.83,170c1.37-2.72,8.73-4.43,12.75-4.42l3,13.36s-8,11.89-11.34,10.63C350.31,188.12,346.9,175.87,349.83,170Z" style="fill: var(--theme-color); transform-origin: 357.154px 177.622px;" id="el5rgfv1gpd1" class="animable"></path><g id="elmk2hq1h9rz"><path d="M349.83,170c1.37-2.72,8.73-4.43,12.75-4.42l3,13.36s-8,11.89-11.34,10.63C350.31,188.12,346.9,175.87,349.83,170Z" style="opacity: 0.4; transform-origin: 357.154px 177.622px;" class="animable"></path></g><path d="M341.35,393.31a.19.19,0,0,0,0-.19.2.2,0,0,0-.21-.11c-.42.07-4.12.65-4.62,1.71a.65.65,0,0,0,0,.63,1.1,1.1,0,0,0,.86.57c1.21.12,3-1.56,3.9-2.58Zm-4.44,1.54c.34-.56,2.26-1.08,3.72-1.35-1.32,1.34-2.48,2.09-3.16,2a.71.71,0,0,1-.56-.38.25.25,0,0,1,0-.25S336.9,394.86,336.91,394.85Z" style="fill: var(--theme-color); transform-origin: 338.907px 394.467px;" id="eluhkd0oz0zwa" class="animable"></path><path d="M341.35,393.31a.05.05,0,0,0,0,0,.19.19,0,0,0,0-.19c-.06-.07-1.54-1.78-2.91-1.87a1.44,1.44,0,0,0-1.09.37c-.41.37-.37.69-.27.89.43.86,3.09,1.16,4.16.93A.18.18,0,0,0,341.35,393.31Zm-3.91-1.26a.79.79,0,0,1,.16-.18,1,1,0,0,1,.79-.27,4.6,4.6,0,0,1,2.39,1.47c-1.19.1-3.11-.26-3.37-.78A.24.24,0,0,1,337.44,392.05Z" style="fill: var(--theme-color); transform-origin: 339.194px 392.38px;" id="el57wk2yi956x" class="animable"></path><polygon points="350.08 389.76 342.42 393.17 339.01 386.06 334.55 376.76 334.02 375.68 341.68 372.27 342.27 373.49 346.59 382.5 350.08 389.76" style="fill: rgb(255, 181, 115); transform-origin: 342.05px 382.72px;" id="elnhhcs70c718" class="animable"></polygon><g id="el7naw5okyozl"><polygon points="346.59 382.5 339.01 386.06 334.55 376.76 342.27 373.49 346.59 382.5" style="opacity: 0.2; transform-origin: 340.57px 379.775px;" class="animable"></polygon></g><path d="M321.07,219.12S296.6,280,303.23,308.6c6,25.89,32.5,74.92,32.5,74.92L346,378.38s-16.39-59.19-18.16-72.05c-3.46-25,18.77-60.33,18.77-87.21Z" style="fill: rgb(38, 50, 56); transform-origin: 324.35px 301.32px;" id="eloaxja9u7xth" class="animable"></path><g id="elc0iizr0fn6w"><path d="M321.07,219.12S296.6,280,303.23,308.6c6,25.89,32.5,74.92,32.5,74.92L346,378.38s-16.39-59.19-18.16-72.05c-3.46-25,18.77-60.33,18.77-87.21Z" style="fill: rgb(255, 255, 255); opacity: 0.1; transform-origin: 324.35px 301.32px;" class="animable"></path></g><path d="M341.06,392.1l7.6-5.53a.66.66,0,0,1,.88.06l5.25,5.39a1.35,1.35,0,0,1-.21,2c-2.69,1.88-4.08,2.66-7.42,5.09-2.06,1.5-6.16,4.81-9,6.88s-5-.63-4-1.74c4.48-5,5.42-8.1,6.12-10.91A2.17,2.17,0,0,1,341.06,392.1Z" style="fill: rgb(38, 50, 56); transform-origin: 344.525px 396.59px;" id="el7g4tncrkgy" class="animable"></path><polygon points="335.07 385.69 348.3 379.64 346.61 374.25 332.44 380.71 335.07 385.69" style="fill: var(--theme-color); transform-origin: 340.37px 379.97px;" id="el87enh4m08iw" class="animable"></polygon><path d="M327.56,169.36c-1.09-2.84-10.65-6-15.45-7L310,178.08s7.84,11.26,11.27,10.33C325.33,187.31,329.92,175.45,327.56,169.36Z" style="fill: var(--theme-color); transform-origin: 319.102px 175.412px;" id="el8mxwyvzk18c" class="animable"></path><g id="el20wx66fmo9u"><path d="M327.56,169.36c-1.09-2.84-10.65-6-15.45-7L310,178.08s7.84,11.26,11.27,10.33C325.33,187.31,329.92,175.45,327.56,169.36Z" style="opacity: 0.4; transform-origin: 319.102px 175.412px;" class="animable"></path></g><path d="M317.07,168.57s-4,1.4,4,50.55h34c-.57-13.84-.59-22.38,6-50.8a100.28,100.28,0,0,0-14.45-1.9,107.4,107.4,0,0,0-15.44,0C324.59,167,317.07,168.57,317.07,168.57Z" style="fill: var(--theme-color); transform-origin: 338.57px 192.631px;" id="el43voh56znui" class="animable"></path><g id="elvy5y2i8oghd"><path d="M317.07,168.57s-4,1.4,4,50.55h34c-.57-13.84-.59-22.38,6-50.8a100.28,100.28,0,0,0-14.45-1.9,107.4,107.4,0,0,0-15.44,0C324.59,167,317.07,168.57,317.07,168.57Z" style="opacity: 0.4; transform-origin: 338.57px 192.631px;" class="animable"></path></g><path d="M355.6,217.13l1.53,3c.12.24-.16.48-.55.48H320.9c-.31,0-.56-.15-.58-.35l-.31-3c0-.21.25-.39.58-.39H355A.61.61,0,0,1,355.6,217.13Z" style="fill: var(--theme-color); transform-origin: 338.584px 218.736px;" id="el0xkcigqby67r" class="animable"></path><g id="elp48yunyeezq"><path d="M355.6,217.13l1.53,3c.12.24-.16.48-.55.48H320.9c-.31,0-.56-.15-.58-.35l-.31-3c0-.21.25-.39.58-.39H355A.61.61,0,0,1,355.6,217.13Z" style="fill: rgb(255, 255, 255); opacity: 0.3; transform-origin: 338.584px 218.736px;" class="animable"></path></g><path d="M351,221h.92c.19,0,.33-.1.31-.21l-.43-4c0-.12-.17-.21-.35-.21h-.93c-.18,0-.32.09-.31.21l.43,4C350.63,220.88,350.79,221,351,221Z" style="fill: rgb(38, 50, 56); transform-origin: 351.221px 218.79px;" id="eld8ls5mjl3e" class="animable"></path><path d="M328.61,221h.92c.18,0,.32-.1.31-.21l-.43-4c0-.12-.17-.21-.36-.21h-.92c-.19,0-.32.09-.31.21l.43,4C328.26,220.88,328.42,221,328.61,221Z" style="fill: rgb(38, 50, 56); transform-origin: 328.83px 218.79px;" id="elbjrs2opbcjh" class="animable"></path></g><defs>     <filter id="active" height="200%">         <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="2"></feMorphology>                <feFlood flood-color="#32DFEC" flood-opacity="1" result="PINK"></feFlood>        <feComposite in="PINK" in2="DILATED" operator="in" result="OUTLINE"></feComposite>        <feMerge>            <feMergeNode in="OUTLINE"></feMergeNode>            <feMergeNode in="SourceGraphic"></feMergeNode>        </feMerge>    </filter>    <filter id="hover" height="200%">        <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="2"></feMorphology>                <feFlood flood-color="#ff0000" flood-opacity="0.5" result="PINK"></feFlood>        <feComposite in="PINK" in2="DILATED" operator="in" result="OUTLINE"></feComposite>        <feMerge>            <feMergeNode in="OUTLINE"></feMergeNode>            <feMergeNode in="SourceGraphic"></feMergeNode>        </feMerge>            <feColorMatrix type="matrix" values="0   0   0   0   0                0   1   0   0   0                0   0   0   0   0                0   0   0   1   0 "></feColorMatrix>    </filter></defs></svg>
            </div>

            <div class="fallback-content">
                <h3 class="status-heading grad-txt">Data Not Available</h3>

                <p class="status-message">
                    The courses for <strong>${metaData.currentTerm}</strong> (${deptData.department}) hasn't been updated yet.
                </p>

                <div style="display: flex; gap: 10px; justify-content: center;">
                    <a href="${directFileUrl}" target="_blank" class="repo-link-btn item">
                        <i class="fab fa-github"></i> Contribute on GitHub
                    </a>

                    <a href="https://youtu.be/4iYUDeuZRJU" target="_blank" class="repo-link-btn item">
                        <i class="fab fa-youtube"></i> How to contribute
                    </a>
                </div>
            </div>
        </div>
    `;

      db = [];
    } else {
      listEl.classList.add("tracker-list-scroll");

      db = deptData.courses;
      renderSidebar();
    }

    initGridStructure();
    updateVisualization();
    updateResetButtonState();
  } catch (error) {
    console.error("Error:", error.message);
    listEl.innerHTML = `<div class="tracker-empty-state">Failed to load data.</div>`;
  }
}

function initGridStructure() {
  gridEl.innerHTML = `
        <div class="tracker-header-cell">Day</div>
        <div class="tracker-header-cell">
            Slot T1
            <span class="slot-time">09:00 - 11:00</span>
        </div>
        <div class="tracker-header-cell">
            Slot T2
            <span class="slot-time">11:30 - 13:30</span>
        </div>
        <div class="tracker-header-cell">
            Slot T3
            <span class="slot-time">14:00 - 16:00</span>
        </div>
    `;
  for (let i = 1; i <= 7; i++) {
    const dayLabel = document.createElement("div");
    dayLabel.className = "tracker-day-label";
    dayLabel.textContent = `Day ${i}`;
    gridEl.appendChild(dayLabel);
    ["T1", "T2", "T3"].forEach((slot) => {
      const cell = document.createElement("div");
      cell.className = "tracker-slot";
      cell.setAttribute("data-day", `Day ${i}`);
      cell.setAttribute("data-slot", slot);
      gridEl.appendChild(cell);
    });
  }
}

function renderSidebar(filter = "") {
  if (!listEl || (db && db.length === 0)) return;
  listEl.innerHTML = "";
  const term = filter.toLowerCase();

  const filtered = db.filter(
    (c) =>
      (c.code && c.code.toLowerCase().includes(term)) ||
      (c.title && c.title.toLowerCase().includes(term)) ||
      (c.shortName && c.shortName.toLowerCase().includes(term)),
  );

  if (filtered.length === 0) {
    listEl.innerHTML = `
            <div class="tracker-empty-state">
                <div class="tracker-empty-icon"><i class="fas fa-search"></i></div>
                <p class="tracker-empty-title">No results for "<strong style="color: var(--theme-color);">${escapeHtml(filter)}</strong>"</p>
            </div>`;
    return;
  }

  filtered.forEach((course) => {
    const card = document.createElement("div");
    const isActive = selectedIds.includes(course.id);
    card.className = `tracker-card ${isActive ? "active-card" : ""}`;

    const codeDiv = document.createElement("div");
    codeDiv.className = "tracker-card-code";
    codeDiv.textContent = course.code;

    const titleDiv = document.createElement("div");
    titleDiv.className = "tracker-card-title";
    titleDiv.textContent = course.title;

    const metaDiv = document.createElement("div");
    metaDiv.className = "tracker-meta";
    if (course.day === "N/A" || course.slot === "N/A") {
      metaDiv.innerHTML = `<span><i class="fa-solid fa-calendar-xmark" style="margin-right:5px;"></i> No Central Exam</span>`;
      metaDiv.classList.add("meta-na");
    } else {
      metaDiv.textContent = `${course.day} / ${course.slot}`;
    }

    card.appendChild(codeDiv);
    card.appendChild(titleDiv);
    card.appendChild(metaDiv);

    card.addEventListener("click", () => toggleSelection(course.id));
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
    listEl.appendChild(card);
  });
}

function toggleSelection(id) {
  if (selectedIds.includes(id)) {
    selectedIds = selectedIds.filter((x) => x !== id);
  } else {
    selectedIds.push(id);
  }
  renderSidebar(searchEl.value);
  updateVisualization();
  updateResetButtonState();
}

function updateVisualization() {
  document.querySelectorAll(".tracker-slot").forEach((el) => {
    el.innerHTML = "";
    el.classList.remove("conflict-state", "warning-state");
  });

  conflictBox.classList.remove("show");
  warningBox.classList.remove("show");

  let hasDirectConflict = false;
  let dayCounts = {};

  selectedIds.forEach((id) => {
    const course = db.find((c) => c.id === id);
    if (!course || course.day === "N/A") return;

    const cell = document.querySelector(
      `.tracker-slot[data-day="${course.day}"][data-slot="${course.slot}"]`,
    );
    if (cell) {
      const chip = document.createElement("div");
      chip.className = "tracker-chip";
      chip.textContent = `${course.code}: ${course.shortName}`;
      cell.appendChild(chip);

      if (cell.children.length > 1) {
        cell.classList.add("conflict-state");
        hasDirectConflict = true;
      }
    }
    dayCounts[course.day] = (dayCounts[course.day] || 0) + 1;
  });

  let hasWarning = false;
  Object.keys(dayCounts).forEach((day) => {
    if (dayCounts[day] > 1) {
      hasWarning = true;
      document
        .querySelectorAll(`.tracker-slot[data-day="${day}"]`)
        .forEach((c) => {
          if (
            !c.classList.contains("conflict-state") &&
            c.children.length > 0
          ) {
            c.classList.add("warning-state");
          }
        });
    }
  });

  if (hasDirectConflict) conflictBox.classList.add("show");
  if (hasWarning && !hasDirectConflict) warningBox.classList.add("show");
}

function updateResetButtonState() {
  if (resetBtn) resetBtn.disabled = selectedIds.length === 0;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

searchEl.addEventListener("input", (e) => renderSidebar(e.target.value));
resetBtn.addEventListener("click", () => {
  selectedIds = [];
  searchEl.value = "";
  renderSidebar();
  updateVisualization();
  updateResetButtonState();
});

const STORAGE_KEY = 'exam_conflict_selections';

function loadSavedSelections() {
  if (!deptSelector || !deptSelector.value) return;

  const currentDept = deptSelector.value;
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      if (parsed[currentDept]) {
        selectedIds = parsed[currentDept];
      } else {
        selectedIds = [];
      }
    } catch (e) {
      console.error("Failed to parse saved selections", e);
      selectedIds = [];
    }
  } else {
    selectedIds = [];
  }

  renderSidebar(searchEl?.value || "");
  updateVisualization();
  updateResetButtonState();
}

function saveSelections() {
  if (!deptSelector || !deptSelector.value) return;

  const currentDept = deptSelector.value;
  let savedData = {};

  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) savedData = JSON.parse(existing);
  } catch (e) {
    savedData = {};
  }

  savedData[currentDept] = selectedIds;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
}

const originalToggleSelection = toggleSelection;
toggleSelection = function (id) {
  originalToggleSelection(id);
  saveSelections();
};

const originalResetHandler = resetBtn?.onclick;
resetBtn.onclick = function () {
  if (originalResetHandler) originalResetHandler();
  selectedIds = [];
  saveSelections();
  updateResetButtonState();
};

const originalLoadTrimesterData = loadTrimesterData;
loadTrimesterData = async function () {
  await originalLoadTrimesterData();
  loadSavedSelections();
};

window.addEventListener('beforeunload', saveSelections);