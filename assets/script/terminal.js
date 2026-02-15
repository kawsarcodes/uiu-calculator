(() => {
  const CONFIG = {
    STORAGE_KEY: "uiu-terminal-state",
    HISTORY_KEY: "uiu-terminal-history",
    MAX_HISTORY: 50,
    ANIMATION_DURATION: 220,
  };

  const ABOUT_INFO = {
    name: "UIU Calculator",
    version: "2.3.2",
    developer: "Kawsar Ahmed",
    bio: "Computer Science and Engineering",
    contact: {
      github: "https://github.com/kawsarcodes",
      youtube: "https://youtube.com/@kawsarcodes",
      facebook: "https://facebook.com/kawsarshaikat",
      instragram: "https://instragram.com/kawsarshaikat",
    },
  };

  const JOKES = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "Why do Java developers wear glasses? Because they can't C#!",
    "What's a programmer's favorite hangout place? Foo Bar!",
    "Why did the programmer quit his job? He didn't get arrays!",
    "What do you call a programmer from Finland? Nerdic!",
    "Why do programmers hate nature? It has too many bugs.",
    "What's the object-oriented way to become wealthy? Inheritance!",
  ];

  const FORTUNES = [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "The only way to learn a new programming language is by writing programs in it.",
    "Programs must be written for people to read, and only incidentally for machines to execute.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Experience is the name everyone gives to their mistakes.",
    "The best error message is the one that never shows up.",
  ];

  const ASCII_ART = `    ██╗   ██╗██╗██╗   ██╗    ███╗   ██╗███████╗██████╗ ██████╗ ███████╗
    ██║   ██║██║██║   ██║    ████╗  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝
    ██║   ██║██║██║   ██║    ██╔██╗ ██║█████╗  ██████╔╝██║  ██║███████╗
    ██║   ██║██║██║   ██║    ██║╚██╗██║██╔══╝  ██╔══██╗██║  ██║╚════██║
    ╚██████╔╝██║╚██████╔╝    ██║ ╚████║███████╗██║  ██║██████╔╝███████║
     ╚═════╝ ╚═╝ ╚═════╝     ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝
                                                                        
                                                                        
                                    UIU Nerds v1.0.0  `;

 
  const terminalState = {
    isOpen: false,
    isFullscreen: true,
    history: [],
    historyIndex: -1,
    currentInput: "",
    suggestions: [],
    currentLine: null,
    cursorPosition: 0,
  };

  let elements = {};


  function saveState() {
    const stateToSave = {
      isOpen: terminalState.isOpen,
      isFullscreen: terminalState.isFullscreen,
    };
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(stateToSave));
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        terminalState.isOpen = false;
        terminalState.isFullscreen = state.isFullscreen || false;
      }
    } catch (e) {
      console.warn("Failed to load terminal state:", e);
    }
  }

  function getFormattedTermName() {
    let username = localStorage.getItem("username") || "UIUian";
    return username.replace(/\s+/g, "_").replace(/\./g, "");
  }

  function updateAllTerminalUsernames() {
    const newName = getFormattedTermName();
    const allTermUsernames = document.querySelectorAll(".uiu-term-username");
    allTermUsernames.forEach((span) => {
      span.textContent = newName;
    });
  }


  function saveHistory() {
    try {
      localStorage.setItem(
        CONFIG.HISTORY_KEY,
        JSON.stringify(terminalState.history),
      );
    } catch (e) {
      console.warn("Failed to save terminal history:", e);
    }
  }

  function loadHistory() {
    try {
      const saved = localStorage.getItem(CONFIG.HISTORY_KEY);
      if (saved) {
        terminalState.history = JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load terminal history:", e);
    }
  }

  function addToHistory(command) {
    if (
      command.trim() &&
      terminalState.history[terminalState.history.length - 1] !== command
    ) {
      terminalState.history.push(command);
      if (terminalState.history.length > CONFIG.MAX_HISTORY) {
        terminalState.history.shift();
      }
      saveHistory();
    }
    terminalState.historyIndex = -1;
  }

  function formatTimestamp() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offset) / 60);
    const offsetMinutes = Math.abs(offset) % 60;
    const offsetSign = offset <= 0 ? "+" : "-";
    const timezone = `GMT${offsetSign}${offsetHours.toString().padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")}`;

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `Date: ${now.getDate().toString().padStart(2, "0")} ${months[now.getMonth()]} ${now.getFullYear()} (${days[now.getDay()]})\nTime: ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")} (${timezone})`;
  }

  function appendOutput(content, className = "") {
    const line = document.createElement("div");
    line.className = `uiu-term-line ${className}`;

    if (typeof content === "string") {
      line.textContent = content;
    } else {
      line.appendChild(content);
    }

    elements.output.appendChild(line);
    elements.output.scrollTop = elements.output.scrollHeight;
  }

  function appendPromptLine(command) {
    const line = document.createElement("div");
    line.className = "uiu-term-line";

    const username = getFormattedTermName();

    const prompt = document.createElement("span");
    prompt.className = "uiu-term-prompt";
    prompt.innerHTML = `🐧<span class="uiu-term-username">${username}</span>@uiunerds:~$ `;

    const cmd = document.createElement("span");
    cmd.className = "uiu-term-command";
    cmd.textContent = command;

    line.appendChild(prompt);
    line.appendChild(cmd);
    elements.output.appendChild(line);
    elements.output.scrollTop = elements.output.scrollHeight;
  }

  const commands = {
    help: {
      description: "Show available commands and keyboard shortcuts",
      usage: "help",
      handler: () => {
        const lines = [
          "--------------------------------------------------------------",
          "⌨️ KEYBOARD SHORTCUTS",
          "--------------------------------------------------------------",
          "  Ctrl+`                  --> Toogle Terminal (Windows/Linux)",
          "  Cmd+`                   --> Toogle Terminal (Mac)",
          "  Esc                     --> Close Terminal",
          "  Ctrl+L                  --> Clear Terminal",
          "  Up(↑)/Down(↓) arrows    --> Command History",
          "  Tab                     --> Autocomplete",
          "--------------------------------------------------------------",
          "⚙️ UTILITY",
          "--------------------------------------------------------------",
          "  clear, cls              --> Clear terminal output",
          "  echo <text>             --> Print text to terminal",
          "--------------------------------------------------------------",
          "📊 CALCULATORS",
          "--------------------------------------------------------------",
          "  cgpa                    --> CGPA calculator",
          "  planner                 --> CGPA planner",
          "  tuition                 --> Tuition fee calculator",
          "--------------------------------------------------------------",
          "🎮 GAMES",
          "--------------------------------------------------------------",
          "  snake                   --> Play Snake Game",
          "  rps                     --> Play Rock Paper Scissors",
          "  ttt                     --> Play Tic Tac Toe",
          "--------------------------------------------------------------",
          "🔮 OTHER COMMANDS",
          "--------------------------------------------------------------",
          "  setname <your_name>     --> Change your username",
          "  whoami                  --> Show current username",
          "  about                   --> Developer Information",
          "  ascii",
          "  date",
          "  joke",
          "  fortune",
          "--------------------------------------------------------------",
        ];

        const headings = new Set([
          "--------------------------------------------------------------",
          "⌨️ KEYBOARD SHORTCUTS",
          "⚙️ UTILITY",
          "📊 CALCULATORS",
          "🎮 GAMES",
          "🔮 OTHER COMMANDS",
        ]);

        lines.forEach((line) => {
          const trimmed = line.trim();
          const cls = headings.has(trimmed)
            ? "uiu-term-heading"
            : trimmed.startsWith("---")
              ? "uiu-term-sep"
              : "uiu-term-info";

          appendOutput(line, cls);
        });
      },
    },

    about: {
      description: "Show developer information",
      usage: "about",
      handler: () => {
        const aboutText = `--> ${ABOUT_INFO.name} v${ABOUT_INFO.version}

--> Developer: ${ABOUT_INFO.developer}    
    (${ABOUT_INFO.bio})

--> Contact Information:
  - GitHub: ${ABOUT_INFO.contact.github}
  - YouTube: ${ABOUT_INFO.contact.youtube}
  - Facebook: ${ABOUT_INFO.contact.facebook}
  - Instagram: ${ABOUT_INFO.contact.instragram}
        `;
        appendOutput(aboutText.trim(), "uiu-term-info");
      },
    },

    setname: {
      description: "Change your terminal username",
      usage: "setname <new_username>",
      handler: (args) => {
        if (!args || args.length === 0) {
          appendOutput("Type: setname <new_username>", "uiu-term-error");
          return;
        }
        let newUsername = args.join(" ");
        localStorage.setItem("username", newUsername);
        window.dispatchEvent(new Event("usernameUpdated"));
        updateAllTerminalUsernames();
        appendOutput(`Username changed to: ${newUsername}`, "uiu-term-success");
        if (terminalState.currentLine) {
          terminalState.currentLine.remove();
        }
      },
    },

    date: {
      description: "Display current date and time",
      usage: "date",
      handler: () => {
        appendOutput(formatTimestamp(), "uiu-term-success");
      },
    },

    joke: {
      description: "Get a random programming joke",
      usage: "joke",
      handler: () => {
        const joke = JOKES[Math.floor(Math.random() * JOKES.length)];
        appendOutput(joke, "uiu-term-success");
      },
    },

    fortune: {
      description: "Get a random fortune or quote",
      usage: "fortune",
      handler: () => {
        const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
        appendOutput(`"${fortune}"`, "uiu-term-success");
      },
    },

    ascii: {
      description: "Display ASCII art banner",
      usage: "ascii",
      handler: () => {
        appendOutput(ASCII_ART, "uiu-term-ascii");
      },
    },

    cgpa: {
      description: "Open CGPA calculator",
      usage: "cgpa [--new]",
      handler: (args) => {
        const url = "/calculator/cgpa/index.html";
        if (args.includes("--new")) {
          window.open(url, "_blank");
          appendOutput(
            "Opening CGPA calculator in new tab...",
            "uiu-term-success",
          );
        } else {
          window.location.href = url;
        }
      },
    },

    planner: {
      description: "Open CGPA planner",
      usage: "planner [--new]",
      handler: (args) => {
        const url = "/calculator/target-cgpa/index.html";
        if (args.includes("--new")) {
          window.open(url, "_blank");
          appendOutput(
            "Opening CGPA planner in new tab...",
            "uiu-term-success",
          );
        } else {
          window.location.href = url;
        }
      },
    },

    tuition: {
      description: "Open tuition fee calculator",
      usage: "tuition [--new]",
      handler: (args) => {
        const url = "/calculator/tuitionfee/index.html";
        if (args.includes("--new")) {
          window.open(url, "_blank");
          appendOutput(
            "Opening tuition fee calculator in new tab...",
            "uiu-term-success",
          );
        } else {
          window.location.href = url;
        }
      },
    },

    clear: {
      description: "Clear terminal output",
      usage: "clear",
      handler: () => {
        elements.output.innerHTML = "";
      },
    },

    cls: {
      description: "Clear terminal output (alias for clear)",
      usage: "cls",
      handler: () => {
        elements.output.innerHTML = "";
      },
    },

    whoami: {
      description: "Show current user",
      usage: "whoami",
      handler: () => {
        let username = localStorage.getItem("username") || "UIUian";
        appendOutput(username, "uiu-term-success");
      },
    },

    echo: {
      description: "Print text to terminal",
      usage: "echo <text>",
      handler: (args) => {
        const text = args.join(" ");
        appendOutput(text || "", "uiu-term-success");
      },
    },


    snake: {
      description: "Play Snake inside your terminal!",
      usage:
        "snake [--stop|--pause|--resume|--reset|--wrap|--nowrap|--size <n>|--speed <ms>]",
      handler: (args = []) => {
        const raw = args.map(String);
        const a = raw.map((s) => s.toLowerCase());

        if (a.includes("--stop")) {
          snakeStop();
          appendOutput("Snake stopped.", "uiu-term-info");
          return;
        }

        const ensureStarted = () => {
          if (!snakeContainer) {
            appendOutput(
              "Starting Snake! Use Arrow Keys or WASD. Space = pause, Q/Esc = quit. `snake --stop` to quit.",
              "uiu-term-info",
            );
            snakeStart();
          }
        };

        if (a.includes("--pause")) {
          ensureStarted();
          snakePause();
          appendOutput("Snake paused.", "uiu-term-info");
          return;
        }
        if (a.includes("--resume")) {
          ensureStarted();
          snakeResume();
          appendOutput("Snake resumed.", "uiu-term-info");
          return;
        }
        if (a.includes("--reset")) {
          ensureStarted();
          snakeReset();
          appendOutput("Snake reset.", "uiu-term-info");
          return;
        }
        if (a.includes("--wrap")) {
          ensureStarted();
          snakeSetWrap(true);
          appendOutput("Wrap mode ON.", "uiu-term-info");
        } else if (a.includes("--nowrap")) {
          ensureStarted();
          snakeSetWrap(false);
          appendOutput("Wrap mode OFF (walls kill).", "uiu-term-info");
        }

        const sizeIdx = a.indexOf("--size");
        if (sizeIdx !== -1) {
          const n = parseInt(raw[sizeIdx + 1], 10);
          if (Number.isInteger(n)) {
            ensureStarted();
            snakeSetSize(n);
            snakeReset();
            appendOutput(
              `Grid size set to ${snakeGridSize}x${snakeGridSize}.`,
              "uiu-term-info",
            );
          }
        }
        const speedIdx = a.indexOf("--speed");
        if (speedIdx !== -1) {
          const ms = parseInt(raw[speedIdx + 1], 10);
          if (Number.isInteger(ms)) {
            ensureStarted();
            snakeSetSpeed(ms);
            appendOutput(
              `Snake speed set to ${snakeSpeed}ms.`,
              "uiu-term-info",
            );
          }
        }

        const dirMap = {
          up: { x: 0, y: -1 },
          down: { x: 0, y: 1 },
          left: { x: -1, y: 0 },
          right: { x: 1, y: 0 },
        };
        const dirArg = Object.keys(dirMap).find((k) => a.includes(k));
        if (dirArg) {
          ensureStarted();
          snakeQueueDir(dirMap[dirArg]);
        }

        if (!snakeContainer) {
          ensureStarted();
        }
      },
    },

    rps: {
      description: "Play Rock, Paper, Scissors!",
      usage: "rps [rock|paper|scissors|--reset|--stop]",
      handler: (args = []) => {
        const a = args.map((x) => String(x).toLowerCase());
        const validMoves = ["rock", "paper", "scissors"];

        if (a.includes("--stop")) {
          stopRPS();
          appendOutput("RPS stopped.", "uiu-term-info");
          return;
        }

        if (a.includes("--reset")) {
          if (!rpsContainer) startRPS();
          rpsReset();
          appendOutput("RPS score reset.", "uiu-term-info");
          return;
        }

        const move = validMoves.find((m) => a.includes(m));
        if (move) {
          if (!rpsContainer) {
            appendOutput(
              "Starting RPS! Use buttons or keys (R/P/S). `rps --stop` to quit.",
              "uiu-term-info",
            );
            startRPS();
          }
          rpsChoose(move);
        } else {
          appendOutput(
            "Starting RPS! Pick with buttons or keys (R/P/S). `rps rock|paper|scissors` to play, `rps --reset` to reset, `rps --stop` to quit.",
            "uiu-term-info",
          );
          startRPS();
        }
      },
    },

    ttt: {
      description: "Play Tic Tac Toe inside your terminal!",
      usage: "ttt [--stop]",
      handler: (args) => {
        if (args.includes("--stop")) {
          stopTtt();
          appendOutput("Tic Tac Toe stopped.", "uiu-term-info");
        } else {
          appendOutput(
            "Starting Tic Tac Toe! Click or press 1–9 to place. `ttt --stop` to quit.",
            "uiu-term-info",
          );
          startTtt();
        }
      },
    },
  };

  let rpsContainer = null;
  let rpsScore = { player: 0, cpu: 0, draws: 0 };
  let rpsLast = { player: null, cpu: null, outcome: null };
  let rpsKeyHandler = null;
  let rpsScoreEl = null;
  let rpsResultEl = null;
  const RPS_CHOICES = ["rock", "paper", "scissors"];
  const RPS_EMOJI = { rock: "💎", paper: "📜", scissors: "✂️" };
  const RPS_BEATS = { rock: "scissors", paper: "rock", scissors: "paper" };
  const RPS_VERB = {
    rock: { scissors: "crushes" },
    paper: { rock: "covers" },
    scissors: { paper: "cut" },
  };

  function startRPS() {
    stopRPS();
    rpsContainer = document.createElement("div");
    rpsContainer.className = "uiu-rps-container";
    rpsContainer.style.display = "grid";
    rpsContainer.style.gridTemplateColumns = "1fr";
    rpsContainer.style.gap = "8px";
    rpsContainer.style.padding = "12px";
    rpsContainer.style.width = "100%";
    rpsContainer.style.maxWidth = "380px";
    rpsContainer.style.background = "#0b0b0b";
    rpsContainer.style.border = "1px solid #222";
    rpsContainer.style.borderRadius = "6px";
    rpsContainer.style.color = "#eee";
    rpsContainer.style.fontFamily =
      "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

    const title = document.createElement("div");
    title.className = "uiu-rps-title";
    title.textContent = "ROCK|PAPER|SCISSORS";
    title.style.textAlign = "center";
    title.style.fontWeight = "700";
    title.style.letterSpacing = "0.3px";
    title.style.color = "#d1d5db";

    rpsScoreEl = document.createElement("div");
    rpsScoreEl.style.textAlign = "center";
    rpsScoreEl.style.fontSize = "14px";
    rpsScoreEl.style.color = "#cfcfcf";

    rpsResultEl = document.createElement("div");
    rpsResultEl.style.textAlign = "center";
    rpsResultEl.style.minHeight = "24px";
    rpsResultEl.style.fontWeight = "600";

    const actions = document.createElement("div");
    actions.style.display = "grid";
    actions.style.gridTemplateColumns = "repeat(3, 1fr)";
    actions.style.gap = "8px";
    actions.appendChild(makeRpsButton("💎 Rock", "rock", "#374151"));
    actions.appendChild(makeRpsButton("📜 Paper", "paper", "#1f2937"));
    actions.appendChild(makeRpsButton("✂️ Scissors", "scissors", "#111827"));

    const controls = document.createElement("div");
    controls.className = "uiu-rps-controls";
    controls.style.display = "grid";
    controls.style.gridTemplateColumns = "1fr 1fr";
    controls.style.gap = "8px";
    controls.style.marginTop = "4px";

    const resetBtn = makeMiniButton("", () => rpsReset());
    resetBtn.innerHTML = `<i class="fa-solid fa-rotate-left" aria-hidden="true"></i> <span>Reset</span>`;
    resetBtn.setAttribute("aria-label", "Reset");

    const closeBtn = makeMiniButton("", () => {
      stopRPS();
      appendOutput("RPS closed.", "uiu-term-info");
    });
    closeBtn.innerHTML = `<i class="fa-solid fa-xmark" aria-hidden="true"></i> <span>Close</span>`;
    closeBtn.setAttribute("aria-label", "Close");

    controls.appendChild(resetBtn);
    controls.appendChild(closeBtn);

    const help = document.createElement("div");
    help.className = "help-control";
    help.textContent = "Play: R/P/S keys • Q/Esc = quit";

    rpsContainer.appendChild(title);
    rpsContainer.appendChild(rpsScoreEl);
    rpsContainer.appendChild(rpsResultEl);
    rpsContainer.appendChild(actions);
    rpsContainer.appendChild(controls);
    rpsContainer.appendChild(help);
    appendOutput(rpsContainer);

    rpsKeyHandler = (e) => {
      const k = e.key.toLowerCase();
      if (k === "r") rpsChoose("rock");
      if (k === "p") rpsChoose("paper");
      if (k === "s") rpsChoose("scissors");
      if (k === "q" || k === "escape") {
        stopRPS();
        appendOutput("RPS closed.", "uiu-term-info");
      }
    };
    document.addEventListener("keydown", rpsKeyHandler);
    rpsRender();
  }

  function stopRPS() {
    if (rpsKeyHandler) {
      document.removeEventListener("keydown", rpsKeyHandler);
      rpsKeyHandler = null;
    }
    if (rpsContainer) rpsContainer.remove();
    rpsContainer = null;
    rpsScoreEl = null;
    rpsResultEl = null;
  }

  function rpsReset() {
    rpsScore = { player: 0, cpu: 0, draws: 0 };
    rpsLast = { player: null, cpu: null, outcome: null };
    rpsRender();
  }

  function rpsChoose(playerMove) {
    const player = String(playerMove).toLowerCase();
    if (!RPS_CHOICES.includes(player)) return;
    const cpu = RPS_CHOICES[Math.floor(Math.random() * 3)];
    let outcome = "draw";
    if (player !== cpu) {
      outcome = RPS_BEATS[player] === cpu ? "win" : "lose";
    }
    if (outcome === "win") rpsScore.player++;
    if (outcome === "lose") rpsScore.cpu++;
    if (outcome === "draw") rpsScore.draws++;
    rpsLast = { player, cpu, outcome };
    rpsRender();
    let username = localStorage.getItem("username") || "UIUian";
    const summary = `RPS: You ${outcome === "win" ? "won" : outcome === "lose" ? "lost" : "drew"} [${prettyMove(player)} vs ${prettyMove(cpu)}] • Score: ${username} ${rpsScore.player} - ${rpsScore.cpu} NerdsBot (draws ${rpsScore.draws}).`;
    appendOutput(
      summary,
      outcome === "lose" ? "uiu-term-error" : "uiu-term-info",
    );
  }

  function rpsRender() {
    if (!rpsContainer) return;
    if (rpsScoreEl) {
      let username = localStorage.getItem("username") || "UIUian";
      rpsScoreEl.textContent = `${username} ${rpsScore.player} - ${rpsScore.cpu} NerdsBot  ·  Draws ${rpsScore.draws}`;
    }
    if (rpsResultEl) {
      const colors = {
        win: "#34d399",
        lose: "#f87171",
        draw: "#facc15",
        none: "#cfcfcf",
      };
      if (!rpsLast.outcome) {
        rpsResultEl.style.color = colors.none;
        rpsResultEl.textContent = "Make your move!";
      } else {
        const { player, cpu, outcome } = rpsLast;
        rpsResultEl.style.color = colors[outcome];
        if (outcome === "draw") {
          rpsResultEl.textContent = `Draw, you both chose ${prettyMove(player)}`;
        } else if (outcome === "win") {
          rpsResultEl.textContent = `You win! ${prettyMove(player)} ${winVerb(player, cpu)} ${prettyMove(cpu)}`;
        } else {
          rpsResultEl.textContent = `You lose! ${prettyMove(cpu)} ${winVerb(cpu, player)} ${prettyMove(player)}`;
        }
      }
    }
  }
  function makeRpsButton(label, value, bg = "#1f2937") {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.style.cursor = "pointer";
    btn.style.padding = "10px 12px";
    btn.style.background = bg;
    btn.style.color = "#e5e7eb";
    btn.style.border = "1px solid #374151";
    btn.style.borderRadius = "6px";
    btn.style.fontWeight = "600";
    btn.style.userSelect = "none";
    btn.onmouseenter = () => (btn.style.background = "#374151");
    btn.onmouseleave = () => (btn.style.background = bg);
    btn.addEventListener("click", () => rpsChoose(value));
    return btn;
  }
  function prettyMove(m) {
    return `${RPS_EMOJI[m]} ${m[0].toUpperCase() + m.slice(1)}`;
  }
  function winVerb(winner, loser) {
    return (RPS_VERB[winner] && RPS_VERB[winner][loser]) || "beats";
  }

  let snakeContainer = null,
    snakeGridEl = null,
    snakePopupsEl = null,
    snakeTimer = null,
    snakePaused = false;
  let snakeGridSize = 20,
    snakeSpeed = 150,
    snakeWrapMode = false;
  let snake = [],
    snakeDir = { x: 1, y: 0 },
    snakeNextDir = null,
    snakeFood = null,
    snakeScore = 0,
    snakeHigh = 0;
  let snakeScoreEl = null,
    snakeHighEl = null,
    snakeInfoEl = null,
    snakePauseBtn = null,
    snakeModeEl = null,
    snakeSizeEl = null,
    snakeSpeedEl = null;
  const SNAKE_HS_KEY = "uiu_snake_highscore";
  const GAP_PX = 1;
  const SNAKE_FOODS = [
    { label: "A", points: 4.0 },
    { label: "A-", points: 3.67 },
    { label: "B+", points: 3.33 },
    { label: "B", points: 3.0 },
    { label: "B-", points: 2.67 },
    { label: "C+", points: 2.33 },
    { label: "C", points: 2.0 },
    { label: "C-", points: 1.67 },
    { label: "D+", points: 1.33 },
    { label: "D", points: 1.0 },
  ];
  function fmtPts(n) {
    return (Math.round(n * 100) / 100).toFixed(2);
  }
  function snakeApplyGridMetrics() {
    if (!snakeGridEl) return;
    snakeGridEl.style.setProperty("--grid-size", snakeGridSize);
    snakeGridEl.style.setProperty("--gap", `${GAP_PX}px`);
  }
  function snakeStart() {
    snakeStop();
    const hs = parseFloat(localStorage.getItem(SNAKE_HS_KEY) || "0");
    snakeHigh = Number.isFinite(hs) ? hs : 0;
    snakeContainer = document.createElement("div");
    snakeContainer.className = "uiu-snake-container";
    const title = document.createElement("div");
    title.className = "uiu-snake-title";
    title.textContent = "SNAKEGAME";
    const stats = document.createElement("div");
    stats.className = "uiu-snake-stats";
    snakeScoreEl = document.createElement("div");
    snakeScoreEl.className = "uiu-snake-score";
    snakeHighEl = document.createElement("div");
    snakeHighEl.className = "uiu-snake-high";
    snakeInfoEl = document.createElement("div");
    snakeInfoEl.className = "uiu-snake-info";
    stats.appendChild(snakeScoreEl);
    stats.appendChild(snakeHighEl);
    stats.appendChild(snakeInfoEl);
    snakePopupsEl = document.createElement("div");
    snakePopupsEl.className = "uiu-snake-popups";
    snakeGridEl = document.createElement("div");
    snakeGridEl.className = "uiu-snake-grid";
    snakeApplyGridMetrics();
    const dpad = makeDPad();
    const controls = document.createElement("div");
    controls.className = "uiu-snake-controls";
    snakePauseBtn = makeMiniButton("", () => snakeTogglePause());
    snakePauseBtn.innerHTML = `<i class="fa-solid fa-pause" aria-hidden="true"></i> <span>Pause</span>`;
    snakePauseBtn.setAttribute("aria-label", "Pause");
    const resetBtn = makeMiniButton("", () => snakeReset());
    resetBtn.innerHTML = `<i class="fa-solid fa-rotate-left" aria-hidden="true"></i> <span>Reset</span>`;
    resetBtn.setAttribute("aria-label", "Reset");
    const wrapBtn = makeMiniButton("", () => snakeSetWrap(!snakeWrapMode));
    wrapBtn.innerHTML = `<i class="fa-solid fa-arrows-left-right" aria-hidden="true"></i> <span>Wrap</span>`;
    wrapBtn.setAttribute("aria-label", "Wrap");
    const closeBtn = makeMiniButton("", () => {
      snakeStop();
      appendOutput("Snake closed.", "uiu-term-info");
    });
    closeBtn.innerHTML = `<i class="fa-solid fa-xmark" aria-hidden="true"></i> <span>Close</span>`;
    closeBtn.setAttribute("aria-label", "Close");
    controls.appendChild(snakePauseBtn);
    controls.appendChild(resetBtn);
    controls.appendChild(wrapBtn);
    controls.appendChild(closeBtn);
    const infoLine = document.createElement("div");
    infoLine.className = "uiu-snake-info-line";
    snakeModeEl = document.createElement("div");
    snakeSizeEl = document.createElement("div");
    snakeSpeedEl = document.createElement("div");
    infoLine.appendChild(snakeModeEl);
    infoLine.appendChild(snakeSizeEl);
    infoLine.appendChild(snakeSpeedEl);
    const help = document.createElement("div");
    help.className = "uiu-snake-help";
    if (window.innerWidth > 800) {
      help.className = "help-control";
      help.textContent =
        "Controls: WASD/Arrow Keys • Space = Pause • Q/Esc = Quit";
    }
    snakeContainer.appendChild(title);
    snakeContainer.appendChild(stats);
    snakeContainer.appendChild(snakePopupsEl);
    snakeContainer.appendChild(snakeGridEl);
    snakeContainer.appendChild(dpad);
    snakeContainer.appendChild(controls);
    snakeContainer.appendChild(infoLine);
    snakeContainer.appendChild(help);
    appendOutput(snakeContainer);
    snakeReset();
    document.addEventListener("keydown", snakeHandleKey);
  }
  function snakeStop() {
    snakeStopLoop();
    document.removeEventListener("keydown", snakeHandleKey);
    if (snakeContainer) snakeContainer.remove();
    snakeContainer = null;
    snakeGridEl = null;
    snakePopupsEl = null;
    snakeScoreEl = null;
    snakeHighEl = null;
    snakeInfoEl = null;
    snakePauseBtn = null;
    snakeModeEl = null;
    snakeSizeEl = null;
    snakeSpeedEl = null;
  }
  function snakeReset() {
    const mid = Math.floor(snakeGridSize / 2);
    snake = [
      { x: mid, y: mid },
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid },
    ];
    snakeDir = { x: 1, y: 0 };
    snakeNextDir = null;
    snakeScore = 0;
    snakePaused = false;
    if (snakePauseBtn)
      snakePauseBtn.innerHTML =
        '<i class="fa-solid fa-pause" aria-hidden="true"></i> <span>Pause</span>';
    if (snakeGridEl) {
      snakeGridEl.classList.remove("is-gameover", "is-paused");
      snakeGridEl.removeAttribute("data-message");
    }
    if (snakeInfoEl) {
      snakeInfoEl.classList.remove("paused", "gameover");
    }
    if (snakePopupsEl) snakePopupsEl.innerHTML = "";
    snakeApplyGridMetrics();
    snakeFood = snakeSpawnFood();
    snakeStartLoop();
    snakeRender();
  }
  function snakeStartLoop() {
    snakeStopLoop();
    snakeTimer = setInterval(snakeTick, snakeSpeed);
  }
  function snakeStopLoop() {
    if (snakeTimer) clearInterval(snakeTimer);
    snakeTimer = null;
  }
  function snakePause() {
    if (snakePaused) return;
    snakePaused = true;
    snakeStopLoop();
    if (snakePauseBtn) {
      snakePauseBtn.innerHTML = `<i class="fa-solid fa-play" aria-hidden="true"></i> <span>Resume</span>`;
      snakePauseBtn.setAttribute("aria-label", "Resume");
    }
    if (snakeGridEl) snakeGridEl.classList.add("is-paused");
    if (snakeInfoEl) snakeInfoEl.classList.add("paused");
    snakeRender();
  }
  function snakeResume() {
    if (!snakePaused) return;
    snakePaused = false;
    snakeStartLoop();
    if (snakePauseBtn) {
      snakePauseBtn.innerHTML = `<i class="fa-solid fa-pause" aria-hidden="true"></i> <span>Pause</span>`;
      snakePauseBtn.setAttribute("aria-label", "Pause");
    }
    if (snakeGridEl) snakeGridEl.classList.remove("is-paused");
    if (snakeInfoEl) snakeInfoEl.classList.remove("paused");
    snakeRender();
  }
  function snakeTogglePause() {
    if (snakePaused) snakeResume();
    else snakePause();
  }
  function snakeSetSpeed(ms) {
    const clamped = Math.max(50, Math.min(500, ms | 0));
    snakeSpeed = clamped;
    if (!snakePaused && snakeTimer) snakeStartLoop();
    snakeRender();
  }
  function snakeSetSize(n) {
    const size = Math.max(10, Math.min(40, n | 0));
    snakeGridSize = size;
    snakeApplyGridMetrics();
    snakeRender();
  }
  function snakeSetWrap(on) {
    snakeWrapMode = !!on;
    snakeRender();
  }
  function snakeQueueDir(dir) {
    const current = snakeNextDir || snakeDir;
    if (current.x + dir.x === 0 && current.y + dir.y === 0) return;
    snakeNextDir = dir;
  }
  function snakeTick() {
    if (!snake || snake.length === 0) return;
    if (snakeNextDir) {
      snakeDir = snakeNextDir;
      snakeNextDir = null;
    }
    let nx = snake[0].x + snakeDir.x;
    let ny = snake[0].y + snakeDir.y;
    if (snakeWrapMode) {
      nx = (nx + snakeGridSize) % snakeGridSize;
      ny = (ny + snakeGridSize) % snakeGridSize;
    } else {
      if (nx < 0 || nx >= snakeGridSize || ny < 0 || ny >= snakeGridSize)
        return snakeGameOver();
    }
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === nx && snake[i].y === ny) return snakeGameOver();
    }
    snake.unshift({ x: nx, y: ny });
    if (snakeFood && nx === snakeFood.x && ny === snakeFood.y) {
      snakeScore = parseFloat(fmtPts(snakeScore + snakeFood.points));
      if (snakeScore > snakeHigh) {
        snakeHigh = snakeScore;
        localStorage.setItem(SNAKE_HS_KEY, String(snakeHigh));
      }
      snakeShowGain(snakeFood.points);
      snakeFood = snakeSpawnFood();
    } else {
      snake.pop();
    }
    snakeRender();
  }
  function snakeGameOver() {
    const username = localStorage.getItem("username") || "UIUian";
    snakeStopLoop();
    appendOutput(
      `💀 Snake: Game Over, ${username}! Score ${fmtPts(snakeScore)}. Use 'snake' to play again.`,
      "uiu-term-error",
    );
    if (snakeGridEl) {
      snakeGridEl.dataset.message = `Game Over, ${username}!!☹️`;
      snakeGridEl.classList.add("is-gameover");
    }
    if (snakeInfoEl) {
      snakeInfoEl.textContent = `Game Over 💀`;
      snakeInfoEl.classList.add("gameover");
    }
  }
  function snakeRandomFreeCell() {
    const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
    const free = [];
    for (let y = 0; y < snakeGridSize; y++) {
      for (let x = 0; x < snakeGridSize; x++) {
        const key = `${x},${y}`;
        if (!occupied.has(key)) free.push({ x, y });
      }
    }
    if (free.length === 0) return { x: 0, y: 0 };
    return free[Math.floor(Math.random() * free.length)];
  }
  function snakeSpawnFood() {
    const pos = snakeRandomFreeCell();
    const item = SNAKE_FOODS[Math.floor(Math.random() * SNAKE_FOODS.length)];
    return { x: pos.x, y: pos.y, label: item.label, points: item.points };
  }
  function snakeShowGain(points) {
    if (!snakePopupsEl) return;
    const chip = document.createElement("div");
    chip.className = "uiu-snake-popup";
    chip.textContent = `+${fmtPts(points)}`;
    snakePopupsEl.appendChild(chip);
    chip.addEventListener("animationend", () => chip.remove());
  }
  function snakeRender() {
    if (!snakeGridEl) return;
    if (snakeScoreEl) snakeScoreEl.textContent = `Score: ${fmtPts(snakeScore)}`;
    if (snakeHighEl) snakeHighEl.textContent = `Highest: ${fmtPts(snakeHigh)}`;
    if (snakeInfoEl) {
      snakeInfoEl.textContent = snakePaused
        ? "Paused"
        : snakeWrapMode
          ? "Mode: Wrap"
          : "Mode: Walls";
    }
    snakeGridEl.classList.toggle("is-paused", snakePaused);
    snakeGridEl.innerHTML = "";
    snake.forEach((part, idx) => {
      const d = document.createElement("div");
      d.className = "uiu-snake-cell" + (idx === 0 ? " is-head" : "");
      d.style.gridColumnStart = part.x + 1;
      d.style.gridRowStart = part.y + 1;
      snakeGridEl.appendChild(d);
    });
    if (snakeFood) {
      const f = document.createElement("div");
      f.className = "uiu-snake-food";
      f.style.gridColumnStart = snakeFood.x + 1;
      f.style.gridRowStart = snakeFood.y + 1;
      f.textContent = snakeFood.label;
      f.title = `${snakeFood.label} (+${fmtPts(snakeFood.points)})`;
      snakeGridEl.appendChild(f);
    }
  }
  function snakeHandleKey(e) {
    const k = e.key.toLowerCase();
    if (k === " " || k === "spacebar") {
      e.preventDefault();
      snakeTogglePause();
      return;
    }
    if (k === "q" || k === "escape") {
      snakeStop();
      appendOutput("Snake closed.", "uiu-term-info");
      return;
    }
    if (["arrowup", "w"].includes(k)) snakeQueueDir({ x: 0, y: -1 });
    else if (["arrowdown", "s"].includes(k)) snakeQueueDir({ x: 0, y: 1 });
    else if (["arrowleft", "a"].includes(k)) snakeQueueDir({ x: -1, y: 0 });
    else if (["arrowright", "d"].includes(k)) snakeQueueDir({ x: 1, y: 0 });
  }
  function makeMiniButton(label, onClick) {
    const btn = document.createElement("button");
    btn.className = "uiu-btn uiu-btn--mini";
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }
  function makeDPad() {
    const wrap = document.createElement("div");
    wrap.className = "uiu-snake-dpad";
    const grid = document.createElement("div");
    grid.className = "uiu-snake-dpad-grid";
    grid.appendChild(makeArrowButton("↑", { x: 0, y: -1 }, "is-up", "Up"));
    grid.appendChild(makeArrowButton("←", { x: -1, y: 0 }, "is-left", "Left"));
    grid.appendChild(makeArrowButton("→", { x: 1, y: 0 }, "is-right", "Right"));
    grid.appendChild(makeArrowButton("↓", { x: 0, y: 1 }, "is-down", "Down"));
    wrap.appendChild(grid);
    return wrap;
  }
  function makeArrowButton(label, dir, extraClass = "", aria = "") {
    const btn = document.createElement("button");
    btn.className = `uiu-btn uiu-btn--arrow ${extraClass}`.trim();
    btn.textContent = label;
    if (aria) btn.setAttribute("aria-label", aria);
    btn.addEventListener("click", () => snakeQueueDir(dir));
    btn.addEventListener("pointerdown", (e) => e.preventDefault());
    return btn;
  }

  let tttContainer = null,
    tttGridEl = null,
    tttInfoEl = null,
    tttStatsEl = { wins: null, losses: null, draws: null };
  let tttModeEl = null,
    tttMarkEl = null,
    tttFirstEl = null,
    tttBoard = Array(9).fill(null);
  let tttPlayerMark = "X",
    tttCpuMark = "O",
    tttCurrent = "X",
    tttPlayerFirst = true,
    tttDifficulty = "hard",
    tttGameOver = false,
    tttWinLine = null,
    tttLockInput = false;
  const TTT_STATS_KEY = "uiu_ttt_stats_v1";
  const TTT_WIN_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  function startTtt() {
    tttStart();
  }
  function stopTtt() {
    tttStop();
  }
  function tttStart() {
    tttStop();
    const raw = localStorage.getItem(TTT_STATS_KEY);
    const stats = raw ? JSON.parse(raw) : { wins: 0, losses: 0, draws: 0 };
    tttContainer = document.createElement("div");
    tttContainer.className = "uiu-ttt-container";
    const title = document.createElement("div");
    title.className = "uiu-ttt-title";
    title.textContent = "TICTACTOE";
    const statsRow = document.createElement("div");
    statsRow.className = "uiu-ttt-stats";
    tttStatsEl.wins = document.createElement("div");
    tttStatsEl.draws = document.createElement("div");
    tttStatsEl.losses = document.createElement("div");
    statsRow.appendChild(tttStatsEl.wins);
    statsRow.appendChild(tttStatsEl.draws);
    statsRow.appendChild(tttStatsEl.losses);
    tttGridEl = document.createElement("div");
    tttGridEl.className = "uiu-ttt-grid";
    const controls = document.createElement("div");
    controls.className = "uiu-ttt-controls";
    const resetBtn = makeMiniButton("", () => tttReset());
    resetBtn.innerHTML = `<i class="fa-solid fa-rotate-left" aria-hidden="true"></i> <span>New</span>`;
    resetBtn.setAttribute("aria-label", "New game");
    const swapMarkBtn = makeMiniButton("", () => tttSwapPlayerMark());
    swapMarkBtn.innerHTML = `<i class="fa-solid fa-shuffle" aria-hidden="true"></i> <span>Play as</span>`;
    swapMarkBtn.setAttribute("aria-label", "Swap X/O");
    const firstBtn = makeMiniButton("", () => tttToggleFirst());
    firstBtn.innerHTML = `<i class="fa-solid fa-forward-step" aria-hidden="true"></i> <span>First</span>`;
    firstBtn.setAttribute("aria-label", "Toggle who goes first");
    const diffBtn = makeMiniButton("", () => tttToggleDifficulty());
    diffBtn.innerHTML = `<i class="fa-solid fa-brain" aria-hidden="true"></i> <span>AI</span>`;
    diffBtn.setAttribute("aria-label", "Toggle difficulty");
    const closeBtn = makeMiniButton("", () => {
      tttStop();
      appendOutput("Tic Tac Toe closed.", "uiu-term-info");
    });
    closeBtn.innerHTML = `<i class="fa-solid fa-xmark" aria-hidden="true"></i> <span>Close</span>`;
    closeBtn.setAttribute("aria-label", "Close");
    controls.appendChild(resetBtn);
    controls.appendChild(swapMarkBtn);
    controls.appendChild(firstBtn);
    controls.appendChild(diffBtn);
    controls.appendChild(closeBtn);
    const infoLine = document.createElement("div");
    infoLine.className = "uiu-ttt-info-line";
    tttMarkEl = document.createElement("div");
    tttFirstEl = document.createElement("div");
    tttModeEl = document.createElement("div");
    infoLine.appendChild(tttMarkEl);
    infoLine.appendChild(tttFirstEl);
    infoLine.appendChild(tttModeEl);
    const help = document.createElement("div");
    help.className = "uiu-ttt-help";
    if (window.innerWidth > 800) {
      help.className = "help-control";
      help.textContent = "Controls: Click or press 1–9 • Q/Esc = Quit";
    }
    tttInfoEl = document.createElement("div");
    tttInfoEl.className = "uiu-ttt-info";
    tttContainer.appendChild(title);
    tttContainer.appendChild(statsRow);
    tttContainer.appendChild(tttGridEl);
    tttContainer.appendChild(controls);
    tttContainer.appendChild(infoLine);
    tttContainer.appendChild(tttInfoEl);
    tttContainer.appendChild(help);
    appendOutput(tttContainer);
    document.addEventListener("keydown", tttHandleKey);
    tttSetStats(stats);
    tttReset();
  }
  function tttStop() {
    document.removeEventListener("keydown", tttHandleKey);
    if (tttContainer) tttContainer.remove();
    tttContainer = null;
    tttGridEl = null;
    tttInfoEl = null;
    tttStatsEl = { wins: null, losses: null, draws: null };
    tttModeEl = null;
    tttMarkEl = null;
    tttFirstEl = null;
    tttBoard = Array(9).fill(null);
    tttGameOver = false;
    tttWinLine = null;
    tttLockInput = false;
  }
  function tttSetStats(stats) {
    const username = localStorage.getItem("username") || "UIUian";
    const summary = `${username} ${stats.wins} - ${stats.losses} NerdsBot · Draws ${stats.draws}`;
    if (tttStatsEl?.wins) tttStatsEl.wins.textContent = summary;
    if (tttStatsEl?.losses) tttStatsEl.losses.textContent = "";
    if (tttStatsEl?.draws) tttStatsEl.draws.textContent = "";
  }
  function tttSaveStats(delta) {
    const raw = localStorage.getItem(TTT_STATS_KEY);
    const stats = raw ? JSON.parse(raw) : { wins: 0, losses: 0, draws: 0 };
    stats.wins += delta.wins || 0;
    stats.losses += delta.losses || 0;
    stats.draws += delta.draws || 0;
    localStorage.setItem(TTT_STATS_KEY, JSON.stringify(stats));
    tttSetStats(stats);
  }
  function tttReset() {
    tttBoard = Array(9).fill(null);
    tttGameOver = false;
    tttWinLine = null;
    tttLockInput = false;
    if (tttGridEl) {
      tttGridEl.classList.remove("is-gameover");
      tttGridEl.removeAttribute("data-message");
    }
    if (tttInfoEl) {
      tttInfoEl.classList.remove("gameover");
    }
    tttCpuMark = tttPlayerMark === "X" ? "O" : "X";
    tttCurrent = tttPlayerFirst ? tttPlayerMark : tttCpuMark;
    tttRender();
    if (tttCurrent === tttCpuMark) {
      tttInfo("CPU thinking…");
      tttLockInput = true;
      setTimeout(() => {
        tttCpuMove();
        tttLockInput = false;
      }, 250);
    } else {
      tttInfo(`Your turn (${tttPlayerMark})`);
    }
  }
  function tttSwapPlayerMark() {
    tttPlayerMark = tttPlayerMark === "X" ? "O" : "X";
    tttReset();
  }
  function tttToggleFirst() {
    tttPlayerFirst = !tttPlayerFirst;
    tttReset();
  }
  function tttToggleDifficulty() {
    tttDifficulty = tttDifficulty === "easy" ? "hard" : "easy";
    tttRender();
  }
  function tttRender() {
    if (!tttGridEl) return;
    if (tttMarkEl) tttMarkEl.textContent = `Play as: ${tttPlayerMark}`;
    if (tttFirstEl)
      tttFirstEl.textContent = `First: ${tttPlayerFirst ? "Player" : "CPU"}`;
    if (tttModeEl)
      tttModeEl.textContent = `AI: ${tttDifficulty === "hard" ? "Hard" : "Easy"}`;
    tttGridEl.innerHTML = "";
    tttBoard.forEach((val, i) => {
      const cell = document.createElement("div");
      cell.className = "uiu-ttt-cell";
      if (val === "X") cell.classList.add("is-x");
      if (val === "O") cell.classList.add("is-o");
      if (tttWinLine && tttWinLine.includes(i)) cell.classList.add("is-win");
      cell.textContent = val ? val : "";
      cell.setAttribute("data-idx", String(i));
      if (tttGameOver || tttCurrent !== tttPlayerMark || val)
        cell.classList.add("is-disabled");
      else cell.addEventListener("click", () => tttPlayerMove(i));
      tttGridEl.appendChild(cell);
    });
  }
  function tttInfo(msg) {
    if (!tttInfoEl) return;
    tttInfoEl.textContent = msg;
  }
  function tttHandleKey(e) {
    const k = e.key.toLowerCase();
    if (k === "q" || k === "escape") {
      tttStop();
      appendOutput("Tic Tac Toe closed.", "uiu-term-info");
      return;
    }
    if (k === "r" || k === "n") {
      tttReset();
      return;
    }
    if (k >= "1" && k <= "9") {
      const idx = parseInt(k, 10) - 1;
      if (!tttGameOver && tttCurrent === tttPlayerMark && !tttBoard[idx])
        tttPlayerMove(idx);
    }
  }
  function tttPlayerMove(idx) {
    if (
      tttLockInput ||
      tttGameOver ||
      tttCurrent !== tttPlayerMark ||
      tttBoard[idx]
    )
      return;
    tttBoard[idx] = tttPlayerMark;
    const end = tttCheckEnd(tttBoard);
    if (end.done) return tttFinish(end);
    tttCurrent = tttCpuMark;
    tttRender();
    tttInfo("CPU thinking…");
    tttLockInput = true;
    setTimeout(() => {
      tttCpuMove();
      tttLockInput = false;
    }, 250);
  }
  function tttCpuMove() {
    if (tttGameOver) return;
    const idx =
      tttDifficulty === "hard"
        ? tttBestMoveMinimax(tttBoard, tttCpuMark, tttPlayerMark).index
        : tttRandomMove(tttBoard);
    if (idx != null && tttBoard[idx] == null) tttBoard[idx] = tttCpuMark;
    const end = tttCheckEnd(tttBoard);
    if (end.done) return tttFinish(end);
    tttCurrent = tttPlayerMark;
    tttRender();
    tttInfo(`Your turn (${tttPlayerMark})`);
  }
  function tttRandomMove(board) {
    const empties = board
      .map((v, i) => (v ? null : i))
      .filter((v) => v != null);
    if (empties.length === 0) return null;
    return empties[Math.floor(Math.random() * empties.length)];
  }
  function tttCheckEnd(board) {
    for (const line of TTT_WIN_LINES) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[b] === board[c])
        return { done: true, winner: board[a], line };
    }
    if (board.every(Boolean)) return { done: true, winner: null, line: null };
    return { done: false };
  }
  function tttFinish(res) {
    tttGameOver = true;
    tttWinLine = res.line;
    tttRender();
    const username = localStorage.getItem("username") || "UIUian";
    if (res.winner === tttPlayerMark) {
      tttInfoEl && tttInfoEl.classList.add("gameover");
      tttInfo(`You win! 🎉`);
      if (tttGridEl) {
        tttGridEl.dataset.message = `You win, ${username}! 🎉`;
        tttGridEl.classList.add("is-gameover");
      }
      tttSaveStats({ wins: 1 });
      appendOutput(
        `🏆 TTT: ${username} won as ${tttPlayerMark}.`,
        "uiu-term-info",
      );
    } else if (res.winner === tttCpuMark) {
      tttInfoEl && tttInfoEl.classList.add("gameover");
      tttInfo(`CPU wins 💀`);
      if (tttGridEl) {
        tttGridEl.dataset.message = `CPU wins! 💀`;
        tttGridEl.classList.add("is-gameover");
      }
      tttSaveStats({ losses: 1 });
      appendOutput(
        `💀 TTT: CPU beat ${username} (${tttPlayerMark}).`,
        "uiu-term-error",
      );
    } else {
      tttInfoEl && tttInfoEl.classList.add("gameover");
      tttInfo(`Draw 🤝`);
      if (tttGridEl) {
        tttGridEl.dataset.message = `Draw 🤝`;
        tttGridEl.classList.add("is-gameover");
      }
      tttSaveStats({ draws: 1 });
      appendOutput(`🤝 TTT: Draw for ${username}.`, "uiu-term-info");
    }
  }
  function tttBestMoveMinimax(board, ai, human) {
    const res = tttMinimax(board.slice(), ai, ai, human, 0);
    return { index: res.index };
  }
  function tttMinimax(board, player, ai, human, depth) {
    const end = tttCheckEnd(board);
    if (end.done) {
      if (end.winner === ai) return { score: 10 - depth };
      if (end.winner === human) return { score: depth - 10 };
      return { score: 0 };
    }
    const empties = [];
    for (let i = 0; i < 9; i++) if (!board[i]) empties.push(i);
    let best = null;
    for (const idx of empties) {
      board[idx] = player;
      const next = tttMinimax(
        board,
        player === ai ? human : ai,
        ai,
        human,
        depth + 1,
      );
      const move = { index: idx, score: next.score };
      board[idx] = null;
      if (player === ai) {
        if (!best || move.score > best.score) best = move;
      } else {
        if (!best || move.score < best.score) best = move;
      }
    }
    return best;
  }

  function getAutocompleteSuggestions(input) {
    const parts = input.trim().split(/\s+/);
    const command = parts[0];
    if (parts.length === 1) {
      return Object.keys(commands).filter((cmd) => cmd.startsWith(command));
    }
    return [];
  }

  function showSuggestions(suggestions) {
    if (suggestions.length === 0) {
      elements.suggestions.style.display = "none";
      return;
    }
    elements.suggestionsTitle.textContent = `Suggestions (${suggestions.length}): [press Tab]`;
    elements.suggestionsList.innerHTML = "";
    suggestions.forEach((suggestion) => {
      const span = document.createElement("span");
      span.className = "uiu-term-suggestion";
      span.textContent = suggestion;
      span.onclick = () => {
        const parts = elements.output
          .querySelector(".uiu-term-inline-input")
          .textContent.trim()
          .split(/\s+/);
        parts[parts.length - 1] = suggestion;
        elements.output.querySelector(".uiu-term-inline-input").textContent =
          parts.join(" ") + " ";
        elements.output.querySelector(".uiu-term-inline-input").focus();
        elements.suggestions.style.display = "none";
      };
      elements.suggestionsList.appendChild(span);
    });
    elements.suggestions.style.display = "block";
  }

  function executeCommand(commandLine) {
    const trimmed = commandLine.trim();
    if (!trimmed) return;
    if (terminalState.currentLine) {
      terminalState.currentLine.remove();
      terminalState.currentLine = null;
    }
    appendPromptLine(trimmed);
    addToHistory(trimmed);
    const parts = trimmed.split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const command = commands[commandName];
    if (command) {
      try {
        command.handler(args);
      } catch (error) {
        appendOutput(
          `Error executing command: ${error.message}`,
          "uiu-term-error",
        );
      }
    } else {
      appendOutput(
        `Command not found: ${commandName}. Type 'help' for available commands.`,
        "uiu-term-error",
      );
    }
    createInputLine();
  }

  function createInputLine() {
    const line = document.createElement("div");
    line.className = "uiu-term-line uiu-term-input-line-active";

    const username = getFormattedTermName();
    const prompt = document.createElement("span");
    prompt.className = "uiu-term-prompt";
    prompt.innerHTML = `🐧<span class="uiu-term-username">${username}</span>@uiunerds:~$ `;

    const input = document.createElement("span");
    input.className = "uiu-term-inline-input";
    input.contentEditable = true;
    input.setAttribute("spellcheck", "false");
    input.setAttribute("autocomplete", "off");

    const cursor = document.createElement("span");
    cursor.className = "uiu-term-cursor";
    cursor.textContent = "█";

    line.appendChild(prompt);
    line.appendChild(input);
    line.appendChild(cursor);

    elements.output.appendChild(line);
    terminalState.currentLine = line;
    elements.output.scrollTop = elements.output.scrollHeight;

    setTimeout(() => {
      input.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(input);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }, 10);

    return { line, input, cursor };
  }

  function toggleTerminal() {
    terminalState.isOpen = !terminalState.isOpen;
    if (terminalState.isOpen) {
      elements.panel.classList.add("uiu-term-open");
      elements.overlay.classList.add("uiu-term-visible");
      elements.panel.setAttribute("aria-modal", "true");
      if (terminalState.isFullscreen) {
        elements.panel.classList.add("uiu-term-fullscreen");
        elements.fullscreenBtn.innerHTML =
          '<i class="fas fa-compress" aria-hidden="true"></i>';
        elements.fullscreenBtn.setAttribute("aria-label", "Exit fullscreen");
      }
      setTimeout(() => {
        if (!terminalState.currentLine) {
          createInputLine();
        } else {
          const input = elements.output.querySelector(".uiu-term-inline-input");
          if (input) {
            input.focus();
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(input);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }, CONFIG.ANIMATION_DURATION);
    } else {
      elements.panel.classList.remove("uiu-term-open");
      elements.overlay.classList.remove("uiu-term-visible");
      elements.panel.removeAttribute("aria-modal");
      elements.suggestions.style.display = "none";
    }
    saveState();
  }

  function toggleFullscreen() {
    terminalState.isFullscreen = !terminalState.isFullscreen;
    if (terminalState.isFullscreen) {
      elements.panel.classList.add("uiu-term-fullscreen");
      elements.fullscreenBtn.innerHTML =
        '<i class="fas fa-compress" aria-hidden="true"></i>';
      elements.fullscreenBtn.setAttribute("aria-label", "Exit fullscreen");
    } else {
      elements.panel.classList.remove("uiu-term-fullscreen");
      elements.fullscreenBtn.innerHTML =
        '<i class="fas fa-expand" aria-hidden="true"></i>';
      elements.fullscreenBtn.setAttribute("aria-label", "Enter fullscreen");
    }
    saveState();
  }

  function closeTerminal() {
    if (terminalState.isOpen) {
      toggleTerminal();
    }
  }

  function handleKeydown(event) {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const ctrlOrCmd = isMac ? event.metaKey : event.ctrlKey;
    if (event.code === "Backquote" && ctrlOrCmd) {
      event.preventDefault();
      toggleTerminal();
      return;
    }
    if (event.key === "Escape" && terminalState.isOpen) {
      event.preventDefault();
      closeTerminal();
      return;
    }
    if (!terminalState.isOpen) return;

    const activeInput = elements.output.querySelector(".uiu-term-inline-input");
    if (!activeInput) return;

    if (event.key === "Enter") {
      event.preventDefault();
      const command = activeInput.textContent || "";
      executeCommand(command);
    } else if (event.key === "Tab") {
      event.preventDefault();
      const suggestions = getAutocompleteSuggestions(
        activeInput.textContent || "",
      );
      if (suggestions.length === 1) {
        const parts = (activeInput.textContent || "").trim().split(/\s+/);
        parts[parts.length - 1] = suggestions[0];
        activeInput.textContent = parts.join(" ") + " ";
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(activeInput);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        elements.suggestions.style.display = "none";
      } else if (suggestions.length > 1) {
        showSuggestions(suggestions);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (terminalState.history.length > 0) {
        if (terminalState.historyIndex === -1) {
          terminalState.currentInput = activeInput.textContent || "";
          terminalState.historyIndex = terminalState.history.length - 1;
        } else if (terminalState.historyIndex > 0) {
          terminalState.historyIndex--;
        }
        activeInput.textContent =
          terminalState.history[terminalState.historyIndex];
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(activeInput);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (terminalState.historyIndex !== -1) {
        if (terminalState.historyIndex < terminalState.history.length - 1) {
          terminalState.historyIndex++;
          activeInput.textContent =
            terminalState.history[terminalState.historyIndex];
        } else {
          terminalState.historyIndex = -1;
          activeInput.textContent = terminalState.currentInput;
        }
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(activeInput);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } else if (event.key === "l" && ctrlOrCmd) {
      event.preventDefault();
      elements.output.innerHTML = "";
      createInputLine();
    }
  }

  function handleInput(event) {
    const activeInput = event.target;
    if (
      !activeInput ||
      !activeInput.classList.contains("uiu-term-inline-input")
    )
      return;
    const suggestions = getAutocompleteSuggestions(
      activeInput.textContent || "",
    );
    if (suggestions.length > 0 && (activeInput.textContent || "").trim()) {
      showSuggestions(suggestions);
    } else {
      elements.suggestions.style.display = "none";
    }
  }

  function createTerminalHTML() {
    return `
      <div class="uiu-term-overlay"></div>
      <div class="uiu-term-panel" role="dialog" aria-labelledby="uiu-term-title">
        <div class="uiu-term-header">
          <a href="/index.html" class="uiu-term-logo">
            <img height="30px" src="/assets/image/uiuNerdsLogoTerminal.png" style="display: block;" alt="UIU Calculator Logo">
          </a>
          <div class="uiu-term-header-actions">
            <button class="uiu-term-header-btn" id="uiu-term-fullscreen-btn" aria-label="Toggle fullscreen">
              <i class="fas fa-expand" aria-hidden="true"></i>
            </button>
            <button class="uiu-term-header-btn" id="uiu-term-close-btn" aria-label="Close terminal">
              <i class="fas fa-xmark" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div class="uiu-term-content">
          <div class="uiu-term-output" role="log" aria-live="polite" aria-label="Terminal output"></div>
          <div class="uiu-term-suggestions" style="display: none;">
            <div class="uiu-term-suggestions-title"></div>
            <div class="uiu-term-suggestions-list"></div>
          </div>
        </div>
      </div>
      <button class="uiu-term-toggle-btn" aria-label="Toggle terminal">
        <i class="fas fa-terminal" aria-hidden="true"></i>
      </button>
    `;
  }

  function initializeElements(container) {
    container.innerHTML = createTerminalHTML();
    elements = {
      overlay: container.querySelector(".uiu-term-overlay"),
      panel: container.querySelector(".uiu-term-panel"),
      output: container.querySelector(".uiu-term-output"),
      toggleBtn: container.querySelector(".uiu-term-toggle-btn"),
      fullscreenBtn: container.querySelector("#uiu-term-fullscreen-btn"),
      closeBtn: container.querySelector("#uiu-term-close-btn"),
      suggestions: container.querySelector(".uiu-term-suggestions"),
      suggestionsTitle: container.querySelector(".uiu-term-suggestions-title"),
      suggestionsList: container.querySelector(".uiu-term-suggestions-list"),
    };
    elements.toggleBtn.addEventListener("click", toggleTerminal);
    elements.fullscreenBtn.addEventListener("click", toggleFullscreen);
    elements.closeBtn.addEventListener("click", closeTerminal);
    elements.overlay.addEventListener("click", closeTerminal);
    elements.output.addEventListener("input", handleInput);
    elements.output.addEventListener("click", (e) => {
      if (terminalState.isOpen) {
        const activeInput = elements.output.querySelector(
          ".uiu-term-inline-input",
        );
        if (activeInput && !activeInput.contains(e.target)) {
          activeInput.focus();
          const range = document.createRange();
          const sel = window.getSelection();
          range.selectNodeContents(activeInput);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    });
    elements.panel.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("keydown", handleKeydown);
  }

  function initUiuTerminal(options = {}) {
    const container = options.mount || document.body;
    loadState();
    loadHistory();
    initializeElements(container);
    if (terminalState.isFullscreen) {
      elements.panel.classList.add("uiu-term-fullscreen");
      elements.fullscreenBtn.innerHTML =
        '<i class="fas fa-compress" aria-hidden="true"></i>';
      elements.fullscreenBtn.setAttribute("aria-label", "Exit fullscreen");
    }
    appendOutput("", "uiu-term-success");
    let username = localStorage.getItem("username") || "UIUian";
    appendOutput(
      `Hi ${username} 👋, Type "help" for available commands.`,
      "uiu-term-info",
    );
    return {
      toggle: toggleTerminal,
      close: closeTerminal,
      execute: executeCommand,
      isOpen: () => terminalState.isOpen,
    };
  }

  window.addEventListener("usernameUpdated", updateAllTerminalUsernames);
  document.addEventListener("input", (e) => {
    if (e.target && e.target.id === "usernameInput") {
      updateAllTerminalUsernames();
    }
  });

  window.initUiuTerminal = initUiuTerminal;
})();

document.addEventListener("DOMContentLoaded", function () {
  if (typeof initUiuTerminal === "function") {
    initUiuTerminal({
      mount: document.getElementById("uiu-terminal-root") || document.body,
    });
  } else {
    console.error("UIU Terminal failed to load.");
  }
});
