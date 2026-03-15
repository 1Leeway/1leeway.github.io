const views = {
  root: {
    menuLabel: "[ ROOT ]",
    title: "ROOT",
    subtitle: "Hub principal du site avec acces direct aux routes cles.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| ROOT_HUB                                                    |",
      "+-------------------------------------------------------------+",
      "| /            -> root_hub                                    |",
      "| /portfolio/ -> main_portfolio                               |",
      "| /ressources/ -> resources_lab                               |",
      "| state        -> online                                      |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Accueil concu comme une console d'aiguillage, pas comme une landing page classique.",
      "> Meme grammaire visuelle que le portfolio: monochrome, typographie terminal, widgets systeme.",
      "> Les actions ouvrent les vraies routes du site directement.",
    ],
    actions: [
      { label: "[ OPEN_PORTFOLIO ]", href: "/portfolio/" },
      { label: "[ OPEN_RESSOURCES ]", href: "/ressources/" },
      { label: "[ OPEN_GITHUB ]", href: "https://github.com/1leeway" },
    ],
    prompt: "root@site:~$ cat /routes/root",
    promptTop: "root@site:~$ panel online",
  },
  portfolio: {
    menuLabel: "[ PORTFOLIO ]",
    title: "PORTFOLIO",
    subtitle: "Route principale pour le parcours, les projets, le stack et le contact.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| PORTFOLIO_ROUTE                                             |",
      "+-------------------------------------------------------------+",
      "| views   -> ID / CV / TAFF / STACK / CONTACT                 |",
      "| style   -> TUI noir, boot, widgets flottants                |",
      "| status  -> ready                                            |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> C'est la route de reference pour le ton visuel et l'interaction du site.",
      "> L'accueil reprend desormais le meme feeling d'execution que cette page.",
      "> Ouverture directe disponible sans ecran intermediaire impose.",
    ],
    actions: [
      { label: "[ ENTER_PORTFOLIO ]", href: "/portfolio/" },
      { label: "[ OPEN_REPOS ]", href: "https://github.com/1leeway?tab=repositories" },
      { label: "[ SEND_MAIL ]", href: "mailto:hello@1leeway.dev" },
    ],
    prompt: "root@site:~$ open /portfolio/",
    promptTop: "root@site:~$ inspect --portfolio",
  },
  ressources: {
    menuLabel: "[ RESSOURCES ]",
    title: "RESSOURCES",
    subtitle: "Zone annexe pour les liens, outils et contenus utiles.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| RESOURCES_LAB                                               |",
      "+-------------------------------------------------------------+",
      "| links   -> fast access                                      |",
      "| tools   -> scripts / utilitaires                            |",
      "| notes   -> contenus d'appui                                 |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Cette route complete le portfolio sans casser l'unite graphique du site.",
      "> Le root agit comme repartiteur visuel entre portfolio et ressources.",
      "> Navigation pensee pour aller vite, sans surcharge decorative.",
    ],
    actions: [
      { label: "[ OPEN_RESSOURCES ]", href: "/ressources/" },
      { label: "[ VIEW_ACCESS ]", view: "access" },
      { label: "[ BACK_ROOT ]", view: "root" },
    ],
    prompt: "root@site:~$ ls /ressources/",
    promptTop: "root@site:~$ inspect --resources",
  },
  access: {
    menuLabel: "[ ACCESS ]",
    title: "ACCESS",
    subtitle: "Points d'entree rapides vers les destinations principales.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| ACCESS_POINTS                                               |",
      "+-------------------------------------------------------------+",
      "| p      -> /portfolio/                                       |",
      "| r      -> /ressources/                                      |",
      "| gh     -> github.com/1leeway                                |",
      "| mail   -> hello@1leeway.dev                                 |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Vue pensee comme un switchboard terminal minimal.",
      "> Les boutons ci-dessous ouvrent immediatement les cibles utiles.",
      "> Les liens externes sortent dans un nouvel onglet quand necessaire.",
    ],
    actions: [
      { label: "[ GO_PORTFOLIO ]", href: "/portfolio/" },
      { label: "[ GO_RESSOURCES ]", href: "/ressources/" },
      { label: "[ GO_GITHUB ]", href: "https://github.com/1leeway" },
    ],
    prompt: "root@site:~$ resolve --shortcuts",
    promptTop: "root@site:~$ map --access",
  },
  contact: {
    menuLabel: "[ CONTACT ]",
    title: "CONTACT",
    subtitle: "Canaux directs pour lancer une discussion projet ou une collaboration.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| CONTACT_CHANNELS                                            |",
      "+-------------------------------------------------------------+",
      "| mail     -> hello@1leeway.dev                               |",
      "| github   -> github.com/1leeway                              |",
      "| response -> usually within 24h                              |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Brief utile: contexte, objectif, contrainte et delai.",
      "> Le portfolio reste la meilleure entree si tu veux voir les details du travail.",
      "> La racine sert ici d'acces rapide, coherent avec le portfolio.",
    ],
    actions: [
      { label: "[ SEND_MAIL ]", href: "mailto:hello@1leeway.dev" },
      { label: "[ OPEN_GITHUB ]", href: "https://github.com/1leeway" },
      { label: "[ BACK_ROOT ]", view: "root" },
    ],
    prompt: "root@site:~$ contact --open",
    promptTop: "root@site:~$ inspect --contact",
  },
};

const bootKernelLines = [
  "Linux version 6.8.12-roothub (gcc 14.2.1) #1 SMP PREEMPT_DYNAMIC",
  "Command line: BOOT_IMAGE=/vmlinuz-root root=/dev/mapper/site-root rw quiet",
  "x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'",
  "microcode: Current revision: 0x000000f0",
  "ACPI: Added _OSI(Module Device)",
  "thermal_sys: Registered thermal governor 'step_wise'",
  "NET: Registered PF_INET6 protocol family",
  "random: crng init done",
];

const bootServiceEvents = [
  { status: "OK", text: "Mounted /portfolio." },
  { status: "OK", text: "Mounted /ressources." },
  { status: "OK", text: "Started Root Hub Route Manager." },
  { status: "OK", text: "Started Home Workspace Renderer." },
  { status: "OK", text: "Started Floating Widget Runtime." },
  { status: "WARN", text: "Skipping marketing layer: terminal profile enforced." },
  { status: "OK", text: "Reached target Root Hub Ready." },
];

const bootUserspaceLines = [
  "palette synced with portfolio.css",
  "boot overlay attached",
  "widgets online",
  "workspace ready for input",
];

const TYPE_SPEED = {
  menu: 14,
  status: 11,
  title: 8,
  subtitle: 7,
  ascii: 3,
  meta: 6,
  action: 7,
  boot: 13,
};

const WIDGET_MIN_WIDTH = 180;
const WIDGET_MIN_HEIGHT = 150;
const WIDGET_MAX_WIDTH = 620;
const WIDGET_MAX_HEIGHT = Math.max(320, Math.round(window.innerHeight * 0.82));
const SHELL_BASE_GUTTER = 16;
const SHELL_MIN_WIDTH = 640;
const DOCK_EDGE_TRIGGER_RATIO = 0.09;
const DOCK_MAX_RATIO = 0.24;
const SHELL_LAYOUT_EASE = 0.22;
const SHELL_LAYOUT_SNAP = 0.75;

const appShell = document.getElementById("appShell");
const workspace = document.querySelector(".workspace");
const menuButtons = Array.from(document.querySelectorAll(".menu-btn"));
const viewTitle = document.getElementById("viewTitle");
const viewSubtitle = document.getElementById("viewSubtitle");
const viewAscii = document.getElementById("viewAscii");
const viewMeta = document.getElementById("viewMeta");
const viewActions = document.getElementById("viewActions");
const clock = document.getElementById("clock");
const clockTop = document.getElementById("clockTop");
const year = document.getElementById("year");
const statusLine = document.getElementById("statusLine");
const statusLineTop = document.getElementById("statusLineTop");
const bootScreen = document.getElementById("bootScreen");
const bootLinesContainer = document.getElementById("bootLines");
const bootSkipButton = document.getElementById("bootSkip");
const floatingWindows = Array.from(document.querySelectorAll(".tui-window"));
const resetWidgetsButton = document.getElementById("resetWidgets");
const routesOutput = document.getElementById("routesOutput");
const statusOutput = document.getElementById("statusOutput");
const notesOutput = document.getElementById("notesOutput");

const menuLabelMap = new Map();
const windowHideTimers = new WeakMap();
const shellLayoutMotion = {
  rafId: 0,
  currentWidth: 0,
  currentMarginLeft: 0,
  currentMarginRight: 0,
  targetWidth: 0,
  targetMarginLeft: 0,
  targetMarginRight: 0,
  initialized: false,
};

let activeView = "root";
let renderCycle = 0;
let topWindowZ = 18;
let bootSkipRequested = false;
let bootFinalized = false;
let bootStartTime = 0;
let statusTimer = 0;
let notesTimer = 0;
let shellLayoutScheduleRafId = 0;
let notesFrame = 0;

const monitorBootTime = Date.now();
const monitorCoreCount = Math.min(Math.max(navigator.hardwareConcurrency || 4, 2), 8);
const monitorMemoryTotalMb = (navigator.deviceMemory || 8) * 1024;
const monitorSwapTotalMb = Math.max(512, Math.round(monitorMemoryTotalMb * 0.25));
const monitorState = {
  cpus: Array.from({ length: monitorCoreCount }, () => 18 + Math.random() * 34),
  memUsedMb: monitorMemoryTotalMb * 0.44,
  swapUsedMb: monitorSwapTotalMb * 0.22,
  load: [0.78, 0.72, 0.66],
};

const shellTips = [
  "ls /portfolio/      # route principale",
  "ls /ressources/     # zone annexe",
  "open github         # repo public",
  "mail hello@1leeway.dev",
  "cat /routes/root    # vue active",
  "boot --skip         # passer l'intro",
];

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function formatClock() {
  return `[ ${new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date())} ]`;
}

function updateClocks() {
  const value = formatClock();
  if (clock) {
    clock.textContent = value;
  }
  if (clockTop) {
    clockTop.textContent = value;
  }
}

function setTypingState(element, isTyping) {
  if (element) {
    element.classList.toggle("is-typing", isTyping);
  }
}

function pulseButton(element) {
  if (!element) {
    return;
  }

  element.classList.remove("is-hit");
  void element.offsetWidth;
  element.classList.add("is-hit");
}

async function typeText(element, text, speed, cycleId = null, step = 1, guard = null) {
  if (!element) {
    return;
  }

  const nextText = String(text ?? "");
  element.textContent = "";
  setTypingState(element, true);

  for (let index = 0; index <= nextText.length; index += step) {
    const cancelled = guard ? guard() : cycleId !== null && cycleId !== renderCycle;
    if (cancelled) {
      setTypingState(element, false);
      return;
    }

    const safeIndex = Math.min(index, nextText.length);
    element.textContent = nextText.slice(0, safeIndex);
    if (safeIndex < nextText.length) {
      await wait(speed);
    }
  }

  element.textContent = nextText;
  setTypingState(element, false);
}

function bootStatusTag(status) {
  if (status === "OK") {
    return "[  OK  ]";
  }
  if (status === "WARN") {
    return "[ WARN ]";
  }
  if (status === "FAILED") {
    return "[FAILED]";
  }
  return "[ .... ]";
}

function bootToneFromStatus(status) {
  if (status === "OK") {
    return "boot-ok";
  }
  if (status === "WARN") {
    return "boot-warn";
  }
  if (status === "FAILED") {
    return "boot-fail";
  }
  return "boot-info";
}

function bootTimestamp() {
  const elapsed = (performance.now() - bootStartTime) / 1000;
  return elapsed.toFixed(3).padStart(7, " ");
}

async function appendBootLine(text, tone = "boot-info", speed = TYPE_SPEED.boot, step = 2) {
  if (!bootLinesContainer) {
    return;
  }

  const line = document.createElement("p");
  line.className = tone;
  bootLinesContainer.appendChild(line);
  bootLinesContainer.scrollTop = bootLinesContainer.scrollHeight;
  await typeText(line, text, speed, null, step, () => bootSkipRequested);
  bootLinesContainer.scrollTop = bootLinesContainer.scrollHeight;
}

function createAction(action) {
  if (action.view) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "action-btn";
    button.dataset.view = action.view;
    button.addEventListener("click", () => {
      pulseButton(button);
      switchView(action.view);
    });
    return button;
  }

  const link = document.createElement("a");
  link.className = "action-btn";
  link.href = action.href;
  if (/^https?:\/\//.test(action.href)) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }
  return link;
}

async function renderActionButtons(actions, cycleId) {
  if (!viewActions) {
    return;
  }

  viewActions.innerHTML = "";

  for (const action of actions) {
    if (cycleId !== renderCycle) {
      return;
    }

    const actionElement = createAction(action);
    viewActions.appendChild(actionElement);
    await typeText(actionElement, action.label, TYPE_SPEED.action, cycleId);
    await wait(24);
  }
}

async function renderMeta(metaLines, cycleId) {
  if (!viewMeta) {
    return;
  }

  viewMeta.innerHTML = "";

  for (const line of metaLines) {
    if (cycleId !== renderCycle) {
      return;
    }

    const paragraph = document.createElement("p");
    paragraph.className = "meta-line";
    viewMeta.appendChild(paragraph);
    await typeText(paragraph, line, TYPE_SPEED.meta, cycleId);
  }
}

function setActiveButton(nextView) {
  menuButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === nextView);
  });
}

async function renderView(viewKey, cycleId) {
  const view = views[viewKey];
  if (!view) {
    return;
  }

  await typeText(viewTitle, view.title, TYPE_SPEED.title, cycleId);
  if (cycleId !== renderCycle) {
    return;
  }

  await typeText(viewSubtitle, view.subtitle, TYPE_SPEED.subtitle, cycleId);
  if (cycleId !== renderCycle) {
    return;
  }

  await typeText(viewAscii, view.ascii.join("\n"), TYPE_SPEED.ascii, cycleId, 2);
  if (cycleId !== renderCycle) {
    return;
  }

  await renderMeta(view.meta, cycleId);
  if (cycleId !== renderCycle) {
    return;
  }

  await renderActionButtons(view.actions, cycleId);
}

async function switchView(nextView, options = {}) {
  const view = views[nextView];
  if (!view) {
    return;
  }

  activeView = nextView;
  renderCycle += 1;
  const cycleId = renderCycle;

  setActiveButton(nextView);

  if (statusLine) {
    statusLine.dataset.fullText = view.prompt;
    if (options.skipTransition) {
      statusLine.textContent = view.prompt;
    }
  }

  if (statusLineTop) {
    statusLineTop.dataset.fullText = view.promptTop;
    if (options.skipTransition) {
      statusLineTop.textContent = view.promptTop;
    }
  }

  if (!workspace || options.skipTransition) {
    await renderView(nextView, cycleId);
    return;
  }

  workspace.classList.add("is-switching");
  await wait(170);

  if (cycleId !== renderCycle) {
    return;
  }

  workspace.classList.remove("is-switching");
  workspace.classList.add("is-entering-view");
  await renderView(nextView, cycleId);
  window.setTimeout(() => {
    workspace.classList.remove("is-entering-view");
  }, 240);
}

async function finalizeBootSequence(skipTyping = false) {
  if (bootFinalized) {
    return;
  }

  bootFinalized = true;
  if (bootScreen) {
    bootScreen.classList.add("is-hidden");
  }
  if (appShell) {
    appShell.classList.remove("is-hidden");
    appShell.classList.add("is-visible");
  }

  if (skipTyping) {
    menuButtons.forEach((button) => {
      button.textContent = menuLabelMap.get(button) || button.textContent;
    });
    if (statusLine) {
      statusLine.textContent = statusLine.dataset.fullText || "";
    }
    if (statusLineTop) {
      statusLineTop.textContent = statusLineTop.dataset.fullText || "";
    }
  } else {
    for (const button of menuButtons) {
      await typeText(button, menuLabelMap.get(button) || button.textContent, TYPE_SPEED.menu);
      await wait(24);
    }
    await typeText(statusLineTop, statusLineTop?.dataset.fullText || "", TYPE_SPEED.status);
    await typeText(statusLine, statusLine?.dataset.fullText || "", TYPE_SPEED.status);
  }

  await switchView(activeView, { skipTransition: true });
  scheduleShellLayoutFromDocks({ immediate: true });
}

function requestBootSkip() {
  bootSkipRequested = true;
  finalizeBootSequence(true);
}

async function runBootSequence() {
  bootStartTime = performance.now();

  for (const line of bootKernelLines) {
    if (bootSkipRequested) {
      break;
    }
    await appendBootLine(`[${bootTimestamp()}] ${line}`, "boot-dim", TYPE_SPEED.boot, 2);
  }

  for (const event of bootServiceEvents) {
    if (bootSkipRequested) {
      break;
    }
    await appendBootLine(`${bootStatusTag(event.status)} ${event.text}`, bootToneFromStatus(event.status));
  }

  for (const line of bootUserspaceLines) {
    if (bootSkipRequested) {
      break;
    }
    await appendBootLine(`${bootTimestamp()} root-hub: ${line}`, "boot-info", TYPE_SPEED.boot, 2);
  }

  await finalizeBootSequence(false);
}

function clampWindowPosition(windowEl, left, top) {
  const rect = windowEl.getBoundingClientRect();
  const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
  const maxTop = Math.max(8, window.innerHeight - rect.height - 8);
  return {
    left: Math.min(Math.max(8, left), maxLeft),
    top: Math.min(Math.max(8, top), maxTop),
  };
}

function clampWindowSize(windowEl, width, height) {
  const rect = windowEl.getBoundingClientRect();
  const maxByViewportWidth = Math.max(WIDGET_MIN_WIDTH, window.innerWidth - rect.left - 8);
  const maxByViewportHeight = Math.max(WIDGET_MIN_HEIGHT, window.innerHeight - rect.top - 8);
  return {
    width: Math.min(Math.max(WIDGET_MIN_WIDTH, width), Math.min(WIDGET_MAX_WIDTH, maxByViewportWidth)),
    height: Math.min(
      Math.max(WIDGET_MIN_HEIGHT, height),
      Math.min(WIDGET_MAX_HEIGHT, maxByViewportHeight)
    ),
  };
}

function isWidgetVisible(windowEl) {
  if (windowEl.classList.contains("is-hidden") || windowEl.classList.contains("is-closing-tv")) {
    return false;
  }
  const style = getComputedStyle(windowEl);
  return !(style.display === "none" || style.visibility === "hidden");
}

function updateResetWidgetsVisibility() {
  if (!resetWidgetsButton) {
    return;
  }
  const hasClosedWindow = floatingWindows.some((windowEl) => windowEl.classList.contains("is-hidden"));
  resetWidgetsButton.classList.toggle("is-visible", hasClosedWindow);
}

function computeDockOffsets() {
  const viewportWidth = window.innerWidth;
  const edgeTrigger = viewportWidth * DOCK_EDGE_TRIGGER_RATIO;
  const reserveGap = 12;
  let leftDock = 0;
  let rightDock = 0;

  floatingWindows.forEach((windowEl) => {
    if (!isWidgetVisible(windowEl)) {
      return;
    }

    const rect = windowEl.getBoundingClientRect();
    const isLeft = rect.left <= edgeTrigger;
    const isRight = rect.right >= viewportWidth - edgeTrigger;

    if (isLeft && !isRight) {
      leftDock = Math.max(leftDock, rect.right + reserveGap);
      return;
    }

    if (isRight && !isLeft) {
      rightDock = Math.max(rightDock, viewportWidth - rect.left + reserveGap);
      return;
    }

    if (isLeft && isRight) {
      leftDock = Math.max(leftDock, rect.right + reserveGap);
      rightDock = Math.max(rightDock, viewportWidth - rect.left + reserveGap);
    }
  });

  const maxDock = viewportWidth * DOCK_MAX_RATIO;
  return {
    left: Math.min(Math.max(leftDock, 0), maxDock),
    right: Math.min(Math.max(rightDock, 0), maxDock),
  };
}

function cancelShellLayoutAnimation() {
  if (shellLayoutMotion.rafId) {
    cancelAnimationFrame(shellLayoutMotion.rafId);
    shellLayoutMotion.rafId = 0;
  }
}

function applyShellLayout(width, marginLeft, marginRight) {
  if (!appShell) {
    return;
  }
  appShell.style.width = `${Math.round(width)}px`;
  appShell.style.marginLeft = `${Math.round(marginLeft)}px`;
  appShell.style.marginRight = `${Math.round(marginRight)}px`;
}

function animateShellLayoutStep() {
  const widthDelta = shellLayoutMotion.targetWidth - shellLayoutMotion.currentWidth;
  const leftDelta = shellLayoutMotion.targetMarginLeft - shellLayoutMotion.currentMarginLeft;
  const rightDelta = shellLayoutMotion.targetMarginRight - shellLayoutMotion.currentMarginRight;

  shellLayoutMotion.currentWidth += widthDelta * SHELL_LAYOUT_EASE;
  shellLayoutMotion.currentMarginLeft += leftDelta * SHELL_LAYOUT_EASE;
  shellLayoutMotion.currentMarginRight += rightDelta * SHELL_LAYOUT_EASE;

  const reachedTarget =
    Math.abs(widthDelta) <= SHELL_LAYOUT_SNAP &&
    Math.abs(leftDelta) <= SHELL_LAYOUT_SNAP &&
    Math.abs(rightDelta) <= SHELL_LAYOUT_SNAP;

  if (reachedTarget) {
    shellLayoutMotion.currentWidth = shellLayoutMotion.targetWidth;
    shellLayoutMotion.currentMarginLeft = shellLayoutMotion.targetMarginLeft;
    shellLayoutMotion.currentMarginRight = shellLayoutMotion.targetMarginRight;
  }

  applyShellLayout(
    shellLayoutMotion.currentWidth,
    shellLayoutMotion.currentMarginLeft,
    shellLayoutMotion.currentMarginRight
  );

  if (reachedTarget) {
    shellLayoutMotion.rafId = 0;
    return;
  }

  shellLayoutMotion.rafId = requestAnimationFrame(animateShellLayoutStep);
}

function setShellLayoutTarget(width, marginLeft, marginRight, immediate = false) {
  if (!appShell) {
    return;
  }

  if (!shellLayoutMotion.initialized) {
    const rect = appShell.getBoundingClientRect();
    const computed = getComputedStyle(appShell);
    shellLayoutMotion.currentWidth = rect.width;
    shellLayoutMotion.currentMarginLeft = parseFloat(computed.marginLeft) || SHELL_BASE_GUTTER;
    shellLayoutMotion.currentMarginRight = parseFloat(computed.marginRight) || SHELL_BASE_GUTTER;
    shellLayoutMotion.initialized = true;
  }

  shellLayoutMotion.targetWidth = width;
  shellLayoutMotion.targetMarginLeft = marginLeft;
  shellLayoutMotion.targetMarginRight = marginRight;

  if (immediate) {
    cancelShellLayoutAnimation();
    shellLayoutMotion.currentWidth = width;
    shellLayoutMotion.currentMarginLeft = marginLeft;
    shellLayoutMotion.currentMarginRight = marginRight;
    applyShellLayout(width, marginLeft, marginRight);
    return;
  }

  if (!shellLayoutMotion.rafId) {
    shellLayoutMotion.rafId = requestAnimationFrame(animateShellLayoutStep);
  }
}

function updateShellLayoutFromDocks(options = {}) {
  if (!appShell) {
    return;
  }

  const immediate = options.immediate || false;
  const viewportWidth = window.innerWidth;

  if (viewportWidth <= 700) {
    cancelShellLayoutAnimation();
    shellLayoutMotion.initialized = false;
    appShell.style.width = "";
    appShell.style.marginLeft = "";
    appShell.style.marginRight = "";
    return;
  }

  const { left, right } = computeDockOffsets();
  const leftDocked = left > 0;
  const rightDocked = right > 0;
  const dockCount = (leftDocked ? 1 : 0) + (rightDocked ? 1 : 0);
  const minWidth = Math.min(SHELL_MIN_WIDTH, viewportWidth - SHELL_BASE_GUTTER * 2);
  let shellWidth = 0;
  let marginLeft = SHELL_BASE_GUTTER;
  let marginRight = SHELL_BASE_GUTTER;

  if (dockCount === 0) {
    shellWidth = Math.max(0, viewportWidth - marginLeft - marginRight);
  } else if (dockCount === 1) {
    if (leftDocked) {
      marginLeft = SHELL_BASE_GUTTER + left;
    } else {
      marginRight = SHELL_BASE_GUTTER + right;
    }
    shellWidth = Math.max(0, viewportWidth - marginLeft - marginRight);
  } else {
    const availableWidth = viewportWidth - left - right - SHELL_BASE_GUTTER * 2;
    shellWidth = Math.max(minWidth, Math.min(1280, availableWidth));
    const extraSpace = Math.max(0, availableWidth - shellWidth);
    marginLeft = SHELL_BASE_GUTTER + left + extraSpace / 2;
    marginRight = SHELL_BASE_GUTTER + right + extraSpace / 2;
  }

  setShellLayoutTarget(shellWidth, marginLeft, marginRight, immediate);
}

function scheduleShellLayoutFromDocks(options = {}) {
  const immediate = options.immediate === true;

  if (immediate) {
    if (shellLayoutScheduleRafId) {
      cancelAnimationFrame(shellLayoutScheduleRafId);
      shellLayoutScheduleRafId = 0;
    }
    updateShellLayoutFromDocks({ immediate: true });
    return;
  }

  if (shellLayoutScheduleRafId) {
    return;
  }

  shellLayoutScheduleRafId = requestAnimationFrame(() => {
    shellLayoutScheduleRafId = 0;
    updateShellLayoutFromDocks();
  });
}

function makeWindowDraggable(windowEl) {
  const handle = windowEl.querySelector(".window-titlebar");
  const closeButton = windowEl.querySelector("[data-window-close]");
  if (!handle || !closeButton) {
    return;
  }

  handle.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[data-window-close]")) {
      return;
    }

    event.preventDefault();
    const rect = windowEl.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    windowEl.classList.add("is-dragging");
    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.zIndex = String(++topWindowZ);

    const onPointerMove = (moveEvent) => {
      const rawLeft = moveEvent.clientX - offsetX;
      const rawTop = moveEvent.clientY - offsetY;
      const safe = clampWindowPosition(windowEl, rawLeft, rawTop);
      windowEl.style.left = `${safe.left}px`;
      windowEl.style.top = `${safe.top}px`;
      scheduleShellLayoutFromDocks();
    };

    const onPointerUp = () => {
      windowEl.classList.remove("is-dragging");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      scheduleShellLayoutFromDocks();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  });

  closeButton.addEventListener("click", () => {
    if (windowEl.classList.contains("is-hidden") || windowEl.classList.contains("is-closing-tv")) {
      return;
    }

    windowEl.classList.remove("is-dragging", "is-resizing");
    windowEl.classList.add("is-closing-tv");

    const existingTimer = windowHideTimers.get(windowEl);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const hideTimer = window.setTimeout(() => {
      windowEl.classList.remove("is-closing-tv");
      windowEl.classList.add("is-hidden");
      windowHideTimers.delete(windowEl);
      updateResetWidgetsVisibility();
      scheduleShellLayoutFromDocks();
    }, 390);

    windowHideTimers.set(windowEl, hideTimer);
  });
}

function makeWindowResizable(windowEl) {
  const handle = windowEl.querySelector("[data-resize-handle]");
  if (!handle) {
    return;
  }

  handle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const startRect = windowEl.getBoundingClientRect();
    const startWidth = startRect.width;
    const startHeight = startRect.height;
    const startX = event.clientX;
    const startY = event.clientY;

    windowEl.classList.add("is-resizing");
    windowEl.style.zIndex = String(++topWindowZ);

    const onPointerMove = (moveEvent) => {
      const width = startWidth + (moveEvent.clientX - startX);
      const height = startHeight + (moveEvent.clientY - startY);
      const safe = clampWindowSize(windowEl, width, height);
      windowEl.style.width = `${safe.width}px`;
      windowEl.style.height = `${safe.height}px`;
      scheduleShellLayoutFromDocks();
    };

    const onPointerUp = () => {
      windowEl.classList.remove("is-resizing");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      scheduleShellLayoutFromDocks();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  });
}

function buildBar(label, value, width = 18) {
  const safeValue = Math.max(0, Math.min(100, value));
  const filled = Math.round((safeValue / 100) * width);
  return `${label.padEnd(4, " ")} [${"#".repeat(filled)}${"-".repeat(width - filled)}] ${safeValue
    .toFixed(0)
    .padStart(3, " ")}%`;
}

function updateMonitorState() {
  monitorState.cpus = monitorState.cpus.map((value) => {
    const drift = (Math.random() * 2 - 1) * 9;
    return Math.max(7, Math.min(98, value + drift));
  });
  const avgCpu = monitorState.cpus.reduce((sum, value) => sum + value, 0) / monitorState.cpus.length;
  monitorState.memUsedMb = Math.max(
    1100,
    Math.min(monitorMemoryTotalMb * 0.92, monitorState.memUsedMb + (avgCpu - 50) * 2.8)
  );
  monitorState.swapUsedMb = Math.max(
    64,
    Math.min(monitorSwapTotalMb * 0.86, monitorState.swapUsedMb + (Math.random() * 2 - 1) * 9)
  );
  monitorState.load = [0, 1, 2].map((index) => {
    const previous = monitorState.load[index] || 0.5;
    const target = (avgCpu / 100) * (1 + index * 0.16) * monitorCoreCount;
    return Math.max(0.05, Math.min(monitorCoreCount * 1.7, previous * 0.72 + target * 0.28));
  });
}

function renderRoutesWidget() {
  if (!routesOutput) {
    return;
  }

  routesOutput.textContent = [
    "route_map",
    "--------",
    "/            -> root hub",
    "/portfolio/  -> portfolio",
    "/ressources/ -> ressources",
    "/home.html   -> mirror route",
  ].join("\n");
}

function renderStatusWidget() {
  if (!statusOutput) {
    return;
  }

  updateMonitorState();
  const uptimeSeconds = Math.floor((Date.now() - monitorBootTime) / 1000);
  const avgCpu = monitorState.cpus.reduce((sum, value) => sum + value, 0) / monitorState.cpus.length;
  const memPercent = (monitorState.memUsedMb / monitorMemoryTotalMb) * 100;
  const swapPercent = (monitorState.swapUsedMb / monitorSwapTotalMb) * 100;

  statusOutput.textContent = [
    `htop@web  uptime ${String(Math.floor(uptimeSeconds / 3600)).padStart(2, "0")}:${String(
      Math.floor((uptimeSeconds % 3600) / 60)
    ).padStart(2, "0")}:${String(uptimeSeconds % 60).padStart(2, "0")}`,
    buildBar("cpu", avgCpu),
    buildBar("mem", memPercent),
    buildBar("swap", swapPercent),
    `load ${monitorState.load.map((value) => value.toFixed(2)).join("  ")}`,
  ].join("\n");
}

function renderNotesWidget() {
  if (!notesOutput) {
    return;
  }

  const first = shellTips[notesFrame % shellTips.length];
  const second = shellTips[(notesFrame + 1) % shellTips.length];
  const third = shellTips[(notesFrame + 2) % shellTips.length];
  notesOutput.textContent = ["quick_notes", "-----------", first, second, third].join("\n");
  notesFrame = (notesFrame + 1) % shellTips.length;
}

function startWidgetStreams() {
  renderRoutesWidget();
  renderStatusWidget();
  renderNotesWidget();

  if (!statusTimer) {
    statusTimer = window.setInterval(renderStatusWidget, 950);
  }
  if (!notesTimer) {
    notesTimer = window.setInterval(renderNotesWidget, 2400);
  }
}

function initializeFloatingWindows() {
  floatingWindows.forEach((windowEl) => {
    windowEl.style.zIndex = String(++topWindowZ);

    if (!windowEl.querySelector("[data-resize-handle]")) {
      const handle = document.createElement("div");
      handle.className = "window-resize-handle";
      handle.dataset.resizeHandle = "";
      handle.setAttribute("aria-hidden", "true");
      windowEl.appendChild(handle);
    }

    makeWindowDraggable(windowEl);
    makeWindowResizable(windowEl);

    windowEl.addEventListener("pointerdown", () => {
      windowEl.style.zIndex = String(++topWindowZ);
    });
  });

  updateResetWidgetsVisibility();
}

menuButtons.forEach((button) => {
  const viewKey = button.dataset.view;
  const view = views[viewKey];
  const fallback = button.textContent.trim();
  const label = view?.menuLabel || fallback;
  menuLabelMap.set(button, label);
  button.textContent = "";

  button.addEventListener("click", () => {
    pulseButton(button);
    switchView(viewKey);
  });
});

if (statusLine) {
  statusLine.dataset.fullText = views[activeView].prompt;
  statusLine.textContent = "";
}

if (statusLineTop) {
  statusLineTop.dataset.fullText = views[activeView].promptTop;
  statusLineTop.textContent = "";
}

if (resetWidgetsButton) {
  resetWidgetsButton.addEventListener("click", () => {
    floatingWindows.forEach((windowEl) => {
      windowEl.classList.remove("is-hidden", "is-closing-tv");
    });
    updateResetWidgetsVisibility();
    scheduleShellLayoutFromDocks();
  });
}

if (bootSkipButton) {
  bootSkipButton.addEventListener("click", requestBootSkip);
}

window.addEventListener("resize", () => {
  scheduleShellLayoutFromDocks({ immediate: true });
  renderStatusWidget();
});

year.textContent = new Date().getFullYear();
updateClocks();
window.setInterval(updateClocks, 1000);
initializeFloatingWindows();
startWidgetStreams();
runBootSequence();
