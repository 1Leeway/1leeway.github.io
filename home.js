const views = {
  root: {
    title: [
      "+-------------------------------------------------------------+",
      "| ROOT_HUB                                                    |",
      "+-------------------------------------------------------------+",
    ],
    subtitle: "Hub principal du site. Navigation rapide vers le portfolio, les ressources et les accès directs.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| route    | target          | state                          |",
      "+-------------------------------------------------------------+",
      "| /        | root_hub        | online                         |",
      "| /portfolio/ | main_portfolio | synced                       |",
      "| /ressources/ | resources_lab  | synced                      |",
      "| /home.html   | mirror_root    | ready                       |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Usage: utiliser le panneau gauche pour changer de vue sans quitter l'accueil.",
      "> Intention: garder la même grammaire terminale que le portfolio, mais en mode hub.",
      "> Focus: accès rapide, lisibilité, zéro bruit visuel hors TUI.",
    ],
    actions: [
      { label: "[ OPEN_PORTFOLIO ]", href: "/portfolio/" },
      { label: "[ OPEN_RESSOURCES ]", href: "/ressources/" },
      { label: "[ OPEN_GITHUB ]", href: "https://github.com/1leeway" },
    ],
    prompt: "root@site:~$ cat /routes/root",
    topPrompt: "root@site:~$ init --root-hub",
  },
  portfolio: {
    title: [
      "+-------------------------------------------------------------+",
      "| PORTFOLIO_ROUTE                                             |",
      "+-------------------------------------------------------------+",
    ],
    subtitle: "Accès direct au portfolio principal avec ses vues, widgets, boot screen et navigation interne.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| module   | content                                           |",
      "+-------------------------------------------------------------+",
      "| ID       | profil, identité, positionnement                 |",
      "| CV       | parcours, méthode, résumé d'exécution            |",
      "| TAFF     | projets et réalisations                          |",
      "| STACK    | technos, qualité, delivery                       |",
      "| CONTACT  | canaux d'échange                                 |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Le portfolio reste la référence visuelle: noir, mono, widgets flottants, sensation console.",
      "> La page d'accueil reprend cette logique pour éviter une rupture de ton entre les routes.",
      "> Entrée directe disponible sans redirection intermédiaire.",
    ],
    actions: [
      { label: "[ ENTER_PORTFOLIO ]", href: "/portfolio/" },
      { label: "[ OPEN_GITHUB_REPOS ]", href: "https://github.com/1leeway?tab=repositories" },
      { label: "[ MAIL_FOR_PROJECT ]", href: "mailto:hello@1leeway.dev" },
    ],
    prompt: "root@site:~$ open /portfolio/",
    topPrompt: "root@site:~$ inspect --portfolio",
  },
  ressources: {
    title: [
      "+-------------------------------------------------------------+",
      "| RESOURCES_LAB                                               |",
      "+-------------------------------------------------------------+",
    ],
    subtitle: "Zone annexe pour les liens, outils, contenus utiles et utilitaires complémentaires.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| pack     | purpose                                           |",
      "+-------------------------------------------------------------+",
      "| links    | accès rapides et références                      |",
      "| tools    | scripts et automatisations                       |",
      "| notes    | contenus d'appui                                 |",
      "| nav      | sortie directe vers les routes utiles            |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> La section ressources garde la même palette pour rester cohérente avec le reste du site.",
      "> Le hub racine sert de répartiteur, pas de page marketing.",
      "> L'objectif est de trouver vite la bonne route, sans friction.",
    ],
    actions: [
      { label: "[ OPEN_RESSOURCES ]", href: "/ressources/" },
      { label: "[ VIEW_ACCESS ]", view: "access" },
      { label: "[ BACK_ROOT ]", view: "root" },
    ],
    prompt: "root@site:~$ ls /ressources/",
    topPrompt: "root@site:~$ inspect --resources",
  },
  access: {
    title: [
      "+-------------------------------------------------------------+",
      "| ACCESS_POINTS                                               |",
      "+-------------------------------------------------------------+",
    ],
    subtitle: "Points d'entrée rapides vers les zones principales et les contacts externes.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| alias    | destination                                       |",
      "+-------------------------------------------------------------+",
      "| p        | /portfolio/                                      |",
      "| r        | /ressources/                                     |",
      "| gh       | github.com/1leeway                               |",
      "| mail     | hello@1leeway.dev                                |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Cette vue sert de switchboard rapide quand on sait déjà où aller.",
      "> Les actions ci-dessous ouvrent directement les destinations utiles.",
      "> Les liens externes s'ouvrent dans un nouvel onglet si nécessaire.",
    ],
    actions: [
      { label: "[ GO_PORTFOLIO ]", href: "/portfolio/" },
      { label: "[ GO_RESSOURCES ]", href: "/ressources/" },
      { label: "[ GO_GITHUB ]", href: "https://github.com/1leeway" },
    ],
    prompt: "root@site:~$ resolve --shortcuts",
    topPrompt: "root@site:~$ map --access",
  },
  contact: {
    title: [
      "+-------------------------------------------------------------+",
      "| CONTACT_CHANNELS                                            |",
      "+-------------------------------------------------------------+",
    ],
    subtitle: "Canaux de contact directs pour démarrer une discussion projet ou une collaboration.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| medium   | value                                             |",
      "+-------------------------------------------------------------+",
      "| mail     | hello@1leeway.dev                                |",
      "| github   | github.com/1leeway                               |",
      "| response | usually within 24h                               |",
      "| brief    | contexte, objectif, délai                        |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Pour aller vite: envoyer un brief court avec contexte, objectif et date cible.",
      "> Le portfolio reste le meilleur point d'entrée pour voir le niveau de détail du travail.",
      "> Cette page racine sert surtout à orienter immédiatement vers la bonne zone.",
    ],
    actions: [
      { label: "[ SEND_MAIL ]", href: "mailto:hello@1leeway.dev" },
      { label: "[ OPEN_GITHUB ]", href: "https://github.com/1leeway" },
      { label: "[ BACK_ROOT ]", view: "root" },
    ],
    prompt: "root@site:~$ contact --open",
    topPrompt: "root@site:~$ inspect --contact",
  },
};

const bootLines = [
  "[ OK ] mounting root hub assets",
  "[ OK ] syncing terminal palette with portfolio",
  "[ OK ] hydrating route table /portfolio /ressources",
  "[ OK ] attaching scanlines and ambient glow",
  "[ OK ] starting live widgets",
  "[ OK ] enabling home workspace",
  "[ OK ] root hub ready",
];

const notesFrames = [
  [
    "Hint 01",
    "--------",
    "Le panneau gauche change la vue locale.",
    "Les boutons du workspace ouvrent les vraies routes.",
  ],
  [
    "Hint 02",
    "--------",
    "Le portfolio reste la page principale de présentation.",
    "Le root sert surtout de routeur visuel cohérent.",
  ],
  [
    "Hint 03",
    "--------",
    "Fermer un widget fait apparaître [ REOPEN_WIDGETS ].",
    "Sur mobile, les widgets flottants s'effacent pour garder la lisibilité.",
  ],
];

const routesOutput = document.getElementById("routesOutput");
const statusOutput = document.getElementById("statusOutput");
const notesOutput = document.getElementById("notesOutput");
const viewTitle = document.getElementById("viewTitle");
const viewSubtitle = document.getElementById("viewSubtitle");
const viewAscii = document.getElementById("viewAscii");
const viewMeta = document.getElementById("viewMeta");
const viewActions = document.getElementById("viewActions");
const menuButtons = Array.from(document.querySelectorAll(".menu-btn"));
const floatingWindows = Array.from(document.querySelectorAll(".tui-window"));
const resetWidgetsButton = document.getElementById("resetWidgets");
const bootScreen = document.getElementById("bootScreen");
const bootLinesContainer = document.getElementById("bootLines");
const bootSkipButton = document.getElementById("bootSkip");
const appShell = document.getElementById("appShell");
const clock = document.getElementById("clock");
const clockTop = document.getElementById("clockTop");
const statusLine = document.getElementById("statusLine");
const statusLineTop = document.getElementById("statusLineTop");
const year = document.getElementById("year");

let activeView = "root";
let renderToken = 0;
let bootComplete = false;
let bootSkipRequested = false;
let notesIndex = 0;
const widgetStartTime = Date.now();

function wait(duration) {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
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
  clock.textContent = value;
  clockTop.textContent = value;
}

function markTyping(element, enabled) {
  element.classList.toggle("is-typing", enabled);
}

async function typeInto(element, text, speed, token) {
  element.textContent = "";
  markTyping(element, true);

  for (let index = 0; index < text.length; index += 1) {
    if (token !== renderToken) {
      markTyping(element, false);
      return false;
    }

    element.textContent += text[index];
    await wait(speed);
  }

  markTyping(element, false);
  return true;
}

function createAction(action) {
  if (action.view) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "action-btn";
    button.textContent = action.label;
    button.addEventListener("click", () => renderView(action.view));
    return button;
  }

  const link = document.createElement("a");
  link.className = "action-btn";
  link.textContent = action.label;
  link.href = action.href;

  if (/^https?:\/\//.test(action.href)) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }

  return link;
}

async function renderMeta(meta, token) {
  viewMeta.innerHTML = "";

  for (const line of meta) {
    if (token !== renderToken) {
      return;
    }

    const paragraph = document.createElement("p");
    paragraph.className = "meta-line";
    viewMeta.append(paragraph);
    await typeInto(paragraph, line, 6, token);
  }
}

async function renderView(viewKey) {
  const view = views[viewKey];
  if (!view) {
    return;
  }

  activeView = viewKey;
  renderToken += 1;
  const token = renderToken;

  menuButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === viewKey);
  });

  statusLine.textContent = view.prompt;
  statusLineTop.textContent = view.topPrompt;
  viewActions.innerHTML = "";

  await typeInto(viewTitle, view.title.join("\n"), 2, token);
  if (token !== renderToken) {
    return;
  }

  await typeInto(viewSubtitle, view.subtitle, 9, token);
  if (token !== renderToken) {
    return;
  }

  await typeInto(viewAscii, view.ascii.join("\n"), 2, token);
  if (token !== renderToken) {
    return;
  }

  await renderMeta(view.meta, token);
  if (token !== renderToken) {
    return;
  }

  view.actions.forEach((action) => {
    viewActions.append(createAction(action));
  });
}

function renderRoutesWidget() {
  routesOutput.textContent = [
    "/              -> root hub",
    "/portfolio/    -> main portfolio",
    "/ressources/   -> resources lab",
    "/home.html     -> root mirror",
    "/views-zones   -> ui layout map",
  ].join("\n");
}

function updateStatusWidget() {
  const uptimeSeconds = Math.floor((Date.now() - widgetStartTime) / 1000);
  const hours = String(Math.floor(uptimeSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((uptimeSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(uptimeSeconds % 60).padStart(2, "0");
  const width = window.innerWidth;
  const height = window.innerHeight;
  const memory = navigator.deviceMemory || 8;

  statusOutput.textContent = [
    `uptime     ${hours}:${minutes}:${seconds}`,
    `viewport   ${width}x${height}`,
    `memory     ${memory}GB reported`,
    `lang       ${document.documentElement.lang || "fr"}`,
    `view       ${activeView}`,
  ].join("\n");
}

function updateNotesWidget() {
  notesOutput.textContent = notesFrames[notesIndex].join("\n");
  notesIndex = (notesIndex + 1) % notesFrames.length;
}

function syncResetButton() {
  const hasHiddenWindow = floatingWindows.some((windowEl) => windowEl.classList.contains("is-hidden"));
  resetWidgetsButton.classList.toggle("is-visible", hasHiddenWindow);
}

function hideWindow(windowEl) {
  if (windowEl.classList.contains("is-hidden") || windowEl.classList.contains("is-closing-tv")) {
    return;
  }

  windowEl.classList.add("is-closing-tv");
  window.setTimeout(() => {
    windowEl.classList.remove("is-closing-tv");
    windowEl.classList.add("is-hidden");
    syncResetButton();
  }, 380);
}

function reopenWindows() {
  floatingWindows.forEach((windowEl) => {
    windowEl.classList.remove("is-hidden", "is-closing-tv");
  });
  syncResetButton();
}

async function runBootSequence() {
  bootLinesContainer.innerHTML = "";

  for (const line of bootLines) {
    if (bootSkipRequested) {
      break;
    }

    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    bootLinesContainer.append(paragraph);

    if (bootLinesContainer.children.length > 10) {
      bootLinesContainer.removeChild(bootLinesContainer.firstElementChild);
    }

    await wait(160);
  }

  finalizeBoot();
}

function finalizeBoot() {
  if (bootComplete) {
    return;
  }

  bootComplete = true;
  bootScreen.classList.add("is-hidden");
  appShell.classList.remove("is-hidden");
  window.requestAnimationFrame(() => {
    appShell.classList.add("is-ready");
  });
  renderView(activeView);
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderView(button.dataset.view);
  });
});

document.querySelectorAll("[data-window-close]").forEach((button) => {
  button.addEventListener("click", () => {
    const windowEl = button.closest(".tui-window");
    if (windowEl) {
      hideWindow(windowEl);
    }
  });
});

resetWidgetsButton.addEventListener("click", reopenWindows);

bootSkipButton.addEventListener("click", () => {
  bootSkipRequested = true;
  finalizeBoot();
});

window.addEventListener("resize", updateStatusWidget);

year.textContent = new Date().getFullYear();
updateClocks();
renderRoutesWidget();
updateStatusWidget();
updateNotesWidget();

window.setInterval(updateClocks, 1000);
window.setInterval(updateStatusWidget, 1000);
window.setInterval(updateNotesWidget, 2200);

runBootSequence();