const fallbackViews = {
  id: {
    title: "ID",
    subtitle: "Carte d'identite du profil.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| PROFILE_ID                                                  |",
      "+-------------------------------------------------------------+",
      "| Name    : 1LEEWAY                                           |",
      "| Role    : Fullstack Developer                               |",
      "| Focus   : TUI UX, Frontend systems, web performance         |",
      "| Status  : Available for freelance and collab                |",
      "+-------------------------------------------------------------+",
    ],
    meta: ["> Ville: Paris", "> Fuseau: UTC+1", "> Langues: FR / EN"],
    actions: [
      { label: "[ OPEN GITHUB ]", href: "https://github.com/1leeway" },
      { label: "[ SEND MAIL ]", href: "mailto:hello@1leeway.dev" },
    ],
  },
  cv: {
    title: "CV",
    subtitle: "Resume rapide du parcours.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| CURRICULUM_VITAE                                            |",
      "+-------------------------------------------------------------+",
      "| 2026 | Lead frontend architecture on dashboard platform     |",
      "| 2025 | Built high-scale APIs and payment flows             |",
      "| 2024 | Shipped offline-first products for startup teams    |",
      "| 2023 | Crafted design systems and reusable UI libraries    |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Points forts: architecture, DX, quality gates",
      "> Methodes: prototypage rapide puis refactor propre",
      "> Livrables: produit, docs, pipeline CI",
    ],
    actions: [
      { label: "[ DOWNLOAD CV ]", href: "#" },
      { label: "[ CONTACT ]", view: "contact" },
    ],
  },
  taff: {
    title: "TAFF",
    subtitle: "Projets et realisations principales.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| WORK_LOG                                                    |",
      "+-------------------------------------------------------------+",
      "| neural-dashboard :: realtime analytics platform             |",
      "| void-commerce    :: headless checkout engine                |",
      "| tui-editor       :: terminal style layout builder           |",
      "| quantum-notes    :: markdown + sync offline app             |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Stack dominante: React, TypeScript, Node, SQL",
      "> Contraintes gerees: perf, scale, maintainability",
      "> Delivery: production-ready and monitored",
    ],
    actions: [
      { label: "[ PROJECTS REPO ]", href: "https://github.com/1leeway?tab=repositories" },
      { label: "[ MAIL FOR DEMO ]", href: "mailto:hello@1leeway.dev" },
    ],
  },
  stack: {
    title: "STACK",
    subtitle: "Technos et outils utilises au quotidien.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| TECH_STACK                                                  |",
      "+-------------------------------------------------------------+",
      "| Frontend : React, Next.js, Svelte, Tailwind, GSAP          |",
      "| Backend  : Node.js, Express, PostgreSQL, Redis             |",
      "| DevOps   : Docker, GitHub Actions, Vercel, observability   |",
      "| Quality  : Vitest, Playwright, ESLint, typed APIs          |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Approche: pragmatique, orientee resultats",
      "> Objectif: livrer vite sans dette toxique",
      "> Standard: lisible, teste, monitorable",
    ],
    actions: [
      { label: "[ GO TO TAFF ]", view: "taff" },
      { label: "[ GO TO CV ]", view: "cv" },
    ],
  },
  contact: {
    title: "CONTACT",
    subtitle: "Canaux directs pour echanger.",
    ascii: [
      "+-------------------------------------------------------------+",
      "| CONTACT_CHANNELS                                            |",
      "+-------------------------------------------------------------+",
      "| MAIL     : hello@1leeway.dev                               |",
      "| GITHUB   : github.com/1leeway                              |",
      "| LINKEDIN : linkedin.com                                    |",
      "| NOTE     : reponse rapide sur sujets projet                |",
      "+-------------------------------------------------------------+",
    ],
    meta: [
      "> Type de mission: freelance, collaboration, build produit",
      "> Delai habituel de reponse: 24h",
      "> Brief conseille: contexte, objectifs, deadline",
    ],
    actions: [
      { label: "[ SEND MAIL ]", href: "mailto:hello@1leeway.dev" },
      { label: "[ OPEN GITHUB ]", href: "https://github.com/1leeway" },
    ],
  },
};

let views = fallbackViews;

const bootKernelLines = [
  "Linux version 6.8.12-1leeway (gcc 14.2.1) #1 SMP PREEMPT_DYNAMIC",
  "Command line: BOOT_IMAGE=/vmlinuz-linux root=/dev/mapper/vg0-root rw loglevel=3",
  "x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'",
  "x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'",
  "microcode: Current revision: 0x000000f0",
  "BIOS-provided physical RAM map:",
  "  BIOS-e820: [mem 0x0000000000000000-0x000000000009ffff] usable",
  "  BIOS-e820: [mem 0x0000000000100000-0x00000000bfffffff] usable",
  "ACPI: Added _OSI(Module Device)",
  "ACPI: PM-Timer IO Port: 0x808",
  "pci 0000:00:1f.2: AHCI controller initialized",
  "usbcore: registered new interface driver usbfs",
  "usbcore: registered new interface driver hub",
  "thermal_sys: Registered thermal governor 'step_wise'",
  "NET: Registered PF_INET6 protocol family",
  "fscrypt: AES-256-XTS using implementation 'xts-aes-aesni'",
  "e820: update [mem 0x00000000-0x00000fff] usable ==> reserved",
  "clocksource: Switched to clocksource tsc-early",
  "audit: type=2000 audit(0.21:1): state=initialized audit_enabled=0 res=1",
  "random: crng init done",
];

const bootInitrdLines = [
  ":: running early hook [udev]",
  ":: loading kernel modules [amdgpu nvme i915 ext4 dm-crypt]",
  ":: running hook [keymap]",
  ":: running hook [encrypt]",
  ":: waiting for encrypted partition /dev/nvme0n1p3",
  ":: unlocked /dev/nvme0n1p3 as /dev/mapper/cryptroot",
  ":: running hook [lvm2]",
  ":: volume group 'vg0' found",
  ":: activating logical volumes vg0/root vg0/home vg0/swap",
  ":: running late hook [filesystems]",
  ":: Triggering uevents...",
  ":: loading userspace firmware [intel-ucode.img]",
  ":: checking root filesystem integrity",
];

const bootProbeLines = [
  "[drm] Initialized i915 1.6.0 20240212 for 0000:00:02.0 on minor 0",
  "snd_hda_intel 0000:00:1f.3: bound 0000:00:1f.0 (ops avs_hda_bus_dev_release)",
  "Bluetooth: hci0: Found device firmware: intel/ibt-19-0-4.sfi",
  "iwlwifi 0000:00:14.3: Detected Intel(R) Wi-Fi 6 AX201",
  "usb 1-3: New USB device found, idVendor=046d, idProduct=c077",
  "r8169 0000:02:00.0 enp2s0: Link is Down",
  "r8169 0000:02:00.0 enp2s0: Link is Up - 1Gbps/Full - flow control rx/tx",
  "EXT4-fs (dm-0): mounted filesystem with ordered data mode. Opts: (null)",
  "EXT4-fs (dm-1): mounted filesystem 43d9f31b-a4f2-4f2a-9f44-0c53f74c22c1",
  "zram: Added device: zram0",
  "Adding 2097148k swap on /dev/zram0. Priority:100 extents:1 across:2097148k",
  "systemd-random-seed[271]: Kernel entropy pool is not initialized yet, waiting...",
];

const bootServiceEvents = [
  { status: "OK", text: "Created slice Slice /system/getty." },
  { status: "OK", text: "Created slice Slice /system/modprobe." },
  { status: "OK", text: "Created slice Slice /system/systemd-fsck." },
  { status: "OK", text: "Started Journal Service." },
  { status: "OK", text: "Started Rule-based Manager for Device Events and Files." },
  { status: "OK", text: "Started Load Kernel Modules." },
  { status: "OK", text: "Started Remount Root and Kernel File Systems." },
  { status: "OK", text: "Mounted /boot." },
  { status: "OK", text: "Mounted /home." },
  { status: "OK", text: "Mounted /var/log." },
  { status: "OK", text: "Started Apply Kernel Variables." },
  { status: "OK", text: "Started Coldplug All udev Devices." },
  { status: "OK", text: "Reached target Local File Systems." },
  { status: "OK", text: "Started Create Volatile Files and Directories." },
  { status: "OK", text: "Started Flush Journal to Persistent Storage." },
  { status: "OK", text: "Started Network Manager." },
  { status: "OK", text: "Started WPA supplicant." },
  { status: "OK", text: "Started Time & Date Service." },
  { status: "OK", text: "Started OpenSSH Daemon." },
  { status: "WARN", text: "NetworkManager-wait-online.service: start operation timed out." },
  { status: "OK", text: "Started D-Bus System Message Bus." },
  { status: "OK", text: "Started User Login Management." },
  { status: "OK", text: "Started Accounts Service." },
  { status: "OK", text: "Started Polkit Authentication Agent." },
  { status: "OK", text: "Started Getty on tty1." },
  { status: "OK", text: "Started Authorization Manager." },
  { status: "OK", text: "Started TUI Panel Runtime." },
  { status: "OK", text: "Started User Runtime Directory /run/user/0." },
  { status: "OK", text: "Started Login Service Session Manager." },
  { status: "OK", text: "Reached target Multi-User System." },
  { status: "OK", text: "Reached target Graphical Interface." },
];

const bootUserspaceLines = [
  "dbus-daemon[744]: Successfully activated service 'org.freedesktop.hostname1'",
  "NetworkManager[782]: <info>  [boot] networking stack initialized",
  "sshd[966]: Server listening on 0.0.0.0 port 22.",
  "sshd[966]: Server listening on :: port 22.",
  "agetty[1012]: /dev/tty1 is ready for login",
  "login[1048]: pam_unix(login:session): session opened for user root(uid=0)",
  "systemd[1]: Startup finished in 2.043s (kernel) + 1.911s (userspace) = 3.954s",
  "kernel: fbcon: Taking over console",
];

const appShell = document.querySelector(".app-shell");
const workspace = document.querySelector(".workspace");
const floatingDeck = document.querySelector(".floating-deck");
const menuButtons = document.querySelectorAll(".menu-btn");
const menuList = document.querySelector(".menu-list");
const statusLine = document.querySelector(".status-line");
const statusLineTop = document.querySelector(".status-line-top");
const viewTitle = document.getElementById("viewTitle");
const viewSubtitle = document.getElementById("viewSubtitle");
const viewAscii = document.getElementById("viewAscii");
const asciiCloseButton = document.getElementById("asciiCloseBtn");
const viewMeta = document.getElementById("viewMeta");
const viewActions = document.getElementById("viewActions");
const clock = document.getElementById("clock");
const clockTop = document.getElementById("clockTop");
const year = document.getElementById("year");
const bootScreen = document.getElementById("bootScreen");
const bootLinesContainer = document.getElementById("bootLines");
const bootSkipButton = document.getElementById("bootSkip");
const languageSelect = document.getElementById("languageSelect");
const languageLabel = document.getElementById("languageLabel");
const floatingWindows = Array.from(document.querySelectorAll(".tui-window"));
const resetWidgetsButton = document.getElementById("resetWidgets");
const runFastfetchButton = document.getElementById("runFastfetch");
const fastfetchOutput = document.getElementById("fastfetchOutput");
const monitorOutput = document.getElementById("monitorOutput");
const shellOutput = document.getElementById("shellOutput");

const menuLabelMap = new Map();
const windowDefaults = new Map();
const windowHideTimers = new WeakMap();

let activeView = "id";
let isSwitching = false;
let queuedView = null;
let renderCycle = 0;
let topWindowZ = 18;
let fastfetchCycle = 0;
let monitorTimer;
let shellTimer;
let bootSkipRequested = false;
let bootFinalized = false;
let bootStartTime = 0;
let siteConfig = null;
let activeLanguage = "fr";
let activeLocale = "fr-FR";
let supportedLanguages = ["fr", "en", "es", "de", "ru"];
let widgetsInitialized = false;
let asciiExpanded = false;
let asciiCollapseTimer;

const MOBILE_BREAKPOINT = 860;
const TOUCH_TABLET_BREAKPOINT = 1100;

const monitorBootTime = Date.now();
const monitorCoreCount = Math.min(Math.max(navigator.hardwareConcurrency || 4, 2), 8);
const monitorMemoryTotalMb = (navigator.deviceMemory || 8) * 1024;
const monitorSwapTotalMb = Math.max(512, Math.round(monitorMemoryTotalMb * 0.25));

const monitorState = {
  cpus: Array.from({ length: monitorCoreCount }, () => 18 + Math.random() * 34),
  memUsedMb: monitorMemoryTotalMb * 0.44,
  swapUsedMb: monitorSwapTotalMb * 0.22,
  tasks: 182,
  threads: 624,
  running: 2,
  load: [0.78, 0.72, 0.66],
  processes: [
    {
      pid: 1220,
      user: "root",
      pri: 20,
      ni: 0,
      virt: 1050,
      res: 312,
      cpu: 24.3,
      mem: 5.2,
      time: 392.4,
      state: "R",
      command: "layout-engine",
      volatility: 9,
      maxCpu: 92,
    },
    {
      pid: 1774,
      user: "www",
      pri: 20,
      ni: 0,
      virt: 860,
      res: 224,
      cpu: 13.8,
      mem: 3.4,
      time: 231.9,
      state: "S",
      command: "socket-bridge",
      volatility: 7,
      maxCpu: 72,
    },
    {
      pid: 2181,
      user: "root",
      pri: 19,
      ni: -1,
      virt: 1260,
      res: 448,
      cpu: 28.7,
      mem: 7.9,
      time: 528.2,
      state: "R",
      command: "gpu-process",
      volatility: 11,
      maxCpu: 97,
    },
    {
      pid: 2540,
      user: "dev",
      pri: 20,
      ni: 0,
      virt: 940,
      res: 286,
      cpu: 9.5,
      mem: 4.7,
      time: 144.7,
      state: "S",
      command: "tab-main",
      volatility: 6,
      maxCpu: 68,
    },
    {
      pid: 2913,
      user: "dev",
      pri: 20,
      ni: 0,
      virt: 640,
      res: 172,
      cpu: 4.2,
      mem: 2.1,
      time: 88.1,
      state: "S",
      command: "service-worker",
      volatility: 4,
      maxCpu: 34,
    },
    {
      pid: 3322,
      user: "root",
      pri: 20,
      ni: 0,
      virt: 580,
      res: 148,
      cpu: 5.6,
      mem: 1.7,
      time: 101.9,
      state: "S",
      command: "event-loop",
      volatility: 5,
      maxCpu: 36,
    },
    {
      pid: 3720,
      user: "sys",
      pri: 20,
      ni: 0,
      virt: 420,
      res: 112,
      cpu: 3.1,
      mem: 1.1,
      time: 72.5,
      state: "S",
      command: "watchdog",
      volatility: 3,
      maxCpu: 22,
    },
    {
      pid: 4131,
      user: "dev",
      pri: 20,
      ni: 0,
      virt: 710,
      res: 196,
      cpu: 6.8,
      mem: 2.6,
      time: 116.4,
      state: "S",
      command: "cache-sync",
      volatility: 5,
      maxCpu: 44,
    },
    {
      pid: 4512,
      user: "root",
      pri: 21,
      ni: 1,
      virt: 380,
      res: 98,
      cpu: 2.2,
      mem: 0.9,
      time: 55.6,
      state: "S",
      command: "tty-refresh",
      volatility: 2,
      maxCpu: 18,
    },
  ],
};

function toLines(lines, text) {
  if (Array.isArray(lines) && lines.length > 0) {
    return lines.map((line) => String(line));
  }

  if (typeof text === "string" && text.length > 0) {
    return text.split(/\r?\n/);
  }

  return [];
}

function normalizeActions(actions) {
  if (!Array.isArray(actions)) {
    return [];
  }

  return actions
    .map((action) => {
      if (!action || typeof action !== "object") {
        return null;
      }

      const label = typeof action.label === "string" ? action.label : "";
      const href = typeof action.href === "string" ? action.href : null;
      const view = typeof action.view === "string" ? action.view : null;

      if (!label || (!href && !view)) {
        return null;
      }

      return href ? { label, href } : { label, view };
    })
    .filter(Boolean);
}

const staticI18n = {
  fr: {
    locale: "fr-FR",
    htmlLang: "fr",
    languageLabel: "LANGUE",
    navAriaLabel: "Navigation principale",
    bootSkipAria: "Passer le boot",
    statusTop: "Leeway@Portfolio:~$ panel online",
    statusBottom: "Leeway@Portfolio:~$ ~/.config/me",
    resetWidgets: "[ REOPEN_WIDGETS ]",
    fastfetchRefresh: "[ RAFRAICHIR_FASTFETCH ]",
    fastfetchLoading: "Demarrage fastfetch...",
    monitorLoading: "Demarrage du monitor...",
    shellLoading: "Chargement des notes shell...",
    windows: {
      fastfetch: {
        title: "fastfetch@OS :: ~/sys/info",
        label: "+--------------- FASTFETCH_LIVE --------------+",
        closeAria: "Fermer fastfetch",
      },
      monitor: {
        title: "monitor@OS :: htop.live",
        label: "+---------------- SYS_MON ----------------+",
        closeAria: "Fermer monitor",
      },
      shell: {
        title: "shell@OS :: neon.exec",
        label: "+---------------- SHELL_NOTES ----------------+",
        closeAria: "Fermer shell",
      },
    },
    fastfetch: {
      collecting: "collecte des diagnostics navigateur...",
      profileTitle: "PROFIL WEB FASTFETCH",
      privacy: "mode-prive: donnees exposees par le navigateur seulement",
      refreshHint: "refresh: met a jour les metriques runtime et reseau",
      labels: {
        host: "Hote",
        os: "OS",
        browser: "Navigateur",
        engine: "Moteur",
        protocol: "Protocole",
        ip: "IP",
        locale: "Locale",
        languages: "Langues",
        timezone: "Fuseau",
        resolution: "Resolution",
        cpuThreads: "Threads CPU",
        gpu: "GPU",
        cookies: "Cookies",
        touch: "Touch",
        uptime: "Uptime",
      },
    },
    monitor: {
      prefix: "htop@web",
      tasks: "Taches",
      running: "actives",
      avgCpu: "CPU moy",
    },
    shellTips: [
      "ls -la          # lister les fichiers",
      "cd ..           # dossier parent",
      "grep -R foo .   # chercher du texte",
      "du -sh *        # taille des dossiers",
      "cat ~/.bashrc   # config shell",
      "ipconfig        # infos reseau",
      "git status      # etat du repo",
    ],
  },
  en: {
    locale: "en-US",
    htmlLang: "en",
    languageLabel: "LANGUAGE",
    navAriaLabel: "Main navigation",
    bootSkipAria: "Skip boot",
    statusTop: "Leeway@Portfolio:~$ panel online",
    statusBottom: "Leeway@Portfolio:~$ ~/.config/me",
    resetWidgets: "[ REOPEN_WIDGETS ]",
    fastfetchRefresh: "[ REFRESH_FASTFETCH ]",
    fastfetchLoading: "Booting fastfetch...",
    monitorLoading: "Starting monitor stream...",
    shellLoading: "Loading shell notes...",
    windows: {
      fastfetch: {
        title: "fastfetch@OS :: ~/sys/info",
        label: "+--------------- FASTFETCH_LIVE --------------+",
        closeAria: "Close fastfetch",
      },
      monitor: {
        title: "monitor@OS :: htop.live",
        label: "+---------------- SYS_MON ----------------+",
        closeAria: "Close monitor",
      },
      shell: {
        title: "shell@OS :: neon.exec",
        label: "+---------------- SHELL_NOTES ----------------+",
        closeAria: "Close shell",
      },
    },
    fastfetch: {
      collecting: "collecting browser diagnostics...",
      profileTitle: "FASTFETCH WEB PROFILE",
      privacy: "privacy-mode: browser-exposed data only",
      refreshHint: "refresh: updates runtime metrics and network state",
      labels: {
        host: "Host",
        os: "OS",
        browser: "Browser",
        engine: "Engine",
        protocol: "Protocol",
        ip: "IP",
        locale: "Locale",
        languages: "Languages",
        timezone: "Timezone",
        resolution: "Resolution",
        cpuThreads: "CPU Threads",
        gpu: "GPU",
        cookies: "Cookies",
        touch: "Touch",
        uptime: "Uptime",
      },
    },
    monitor: {
      prefix: "htop@web",
      tasks: "Tasks",
      running: "running",
      avgCpu: "Avg CPU",
    },
    shellTips: [
      "ls -la          # list files",
      "cd ..           # go parent",
      "grep -R foo .   # search text",
      "du -sh *        # folder sizes",
      "cat ~/.bashrc   # shell config",
      "ipconfig        # network info",
      "git status      # repo state",
    ],
  },
  es: {
    locale: "es-ES",
    htmlLang: "es",
    languageLabel: "IDIOMA",
    navAriaLabel: "Navegacion principal",
    bootSkipAria: "Saltar boot",
    statusTop: "Leeway@Portfolio:~$ panel en linea",
    statusBottom: "Leeway@Portfolio:~$ ~/.config/me",
    resetWidgets: "[ REABRIR_WIDGETS ]",
    fastfetchRefresh: "[ ACTUALIZAR_FASTFETCH ]",
    fastfetchLoading: "Iniciando fastfetch...",
    monitorLoading: "Iniciando monitor...",
    shellLoading: "Cargando notas shell...",
    windows: {
      fastfetch: {
        title: "fastfetch@OS :: ~/sys/info",
        label: "+--------------- FASTFETCH_LIVE --------------+",
        closeAria: "Cerrar fastfetch",
      },
      monitor: {
        title: "monitor@OS :: htop.live",
        label: "+---------------- SYS_MON ----------------+",
        closeAria: "Cerrar monitor",
      },
      shell: {
        title: "shell@OS :: neon.exec",
        label: "+---------------- SHELL_NOTES ----------------+",
        closeAria: "Cerrar shell",
      },
    },
    fastfetch: {
      collecting: "recopilando diagnosticos del navegador...",
      profileTitle: "PERFIL WEB FASTFETCH",
      privacy: "modo-privado: solo datos expuestos por el navegador",
      refreshHint: "refresh: actualiza metricas runtime y estado de red",
      labels: {
        host: "Host",
        os: "SO",
        browser: "Navegador",
        engine: "Motor",
        protocol: "Protocolo",
        ip: "IP",
        locale: "Idioma",
        languages: "Lenguajes",
        timezone: "Zona horaria",
        resolution: "Resolucion",
        cpuThreads: "Hilos CPU",
        gpu: "GPU",
        cookies: "Cookies",
        touch: "Touch",
        uptime: "Uptime",
      },
    },
    monitor: {
      prefix: "htop@web",
      tasks: "Tareas",
      running: "activas",
      avgCpu: "CPU prom",
    },
    shellTips: [
      "ls -la          # listar archivos",
      "cd ..           # carpeta padre",
      "grep -R foo .   # buscar texto",
      "du -sh *        # tamano de carpetas",
      "cat ~/.bashrc   # config shell",
      "ipconfig        # info de red",
      "git status      # estado del repo",
    ],
  },
  de: {
    locale: "de-DE",
    htmlLang: "de",
    languageLabel: "SPRACHE",
    navAriaLabel: "Hauptnavigation",
    bootSkipAria: "Boot uberspringen",
    statusTop: "Leeway@Portfolio:~$ panel online",
    statusBottom: "Leeway@Portfolio:~$ ~/.config/me",
    resetWidgets: "[ WIDGETS_NEU_OEFFNEN ]",
    fastfetchRefresh: "[ FASTFETCH_AKTUALISIEREN ]",
    fastfetchLoading: "Fastfetch startet...",
    monitorLoading: "Monitor startet...",
    shellLoading: "Shell-Notizen laden...",
    windows: {
      fastfetch: {
        title: "fastfetch@OS :: ~/sys/info",
        label: "+--------------- FASTFETCH_LIVE --------------+",
        closeAria: "Fastfetch schliessen",
      },
      monitor: {
        title: "monitor@OS :: htop.live",
        label: "+---------------- SYS_MON ----------------+",
        closeAria: "Monitor schliessen",
      },
      shell: {
        title: "shell@OS :: neon.exec",
        label: "+---------------- SHELL_NOTES ----------------+",
        closeAria: "Shell schliessen",
      },
    },
    fastfetch: {
      collecting: "Browser-Diagnose wird gesammelt...",
      profileTitle: "FASTFETCH WEB PROFIL",
      privacy: "privacy-mode: nur browser-offengelegte daten",
      refreshHint: "refresh: aktualisiert runtime-metriken und netzwerkstatus",
      labels: {
        host: "Host",
        os: "OS",
        browser: "Browser",
        engine: "Engine",
        protocol: "Protokoll",
        ip: "IP",
        locale: "Locale",
        languages: "Sprachen",
        timezone: "Zeitzone",
        resolution: "Auflosung",
        cpuThreads: "CPU Threads",
        gpu: "GPU",
        cookies: "Cookies",
        touch: "Touch",
        uptime: "Uptime",
      },
    },
    monitor: {
      prefix: "htop@web",
      tasks: "Tasks",
      running: "aktiv",
      avgCpu: "CPU schnitt",
    },
    shellTips: [
      "ls -la          # dateien listen",
      "cd ..           # zum elternordner",
      "grep -R foo .   # text suchen",
      "du -sh *        # ordnergroessen",
      "cat ~/.bashrc   # shell config",
      "ipconfig        # netzwerk info",
      "git status      # repo status",
    ],
  },
  ru: {
    locale: "ru-RU",
    htmlLang: "ru",
    languageLabel: "YAZYK",
    navAriaLabel: "Glavnaya navigatsiya",
    bootSkipAria: "Propustit boot",
    statusTop: "Leeway@Portfolio:~$ panel online",
    statusBottom: "Leeway@Portfolio:~$ ~/.config/me",
    resetWidgets: "[ OTKRYT_WIDGETS ]",
    fastfetchRefresh: "[ OBNOVIT_FASTFETCH ]",
    fastfetchLoading: "Zapusk fastfetch...",
    monitorLoading: "Zapusk monitor potoka...",
    shellLoading: "Zagruzka shell zametok...",
    windows: {
      fastfetch: {
        title: "fastfetch@OS :: ~/sys/info",
        label: "+--------------- FASTFETCH_LIVE --------------+",
        closeAria: "Zakryt fastfetch",
      },
      monitor: {
        title: "monitor@OS :: htop.live",
        label: "+---------------- SYS_MON ----------------+",
        closeAria: "Zakryt monitor",
      },
      shell: {
        title: "shell@OS :: neon.exec",
        label: "+---------------- SHELL_NOTES ----------------+",
        closeAria: "Zakryt shell",
      },
    },
    fastfetch: {
      collecting: "sbor diagnostiki brauzera...",
      profileTitle: "FASTFETCH WEB PROFIL",
      privacy: "privacy-mode: tolko dannye iz brauzera",
      refreshHint: "refresh: obnovlyaet runtime metriky i setevoe sostoyanie",
      labels: {
        host: "Host",
        os: "OS",
        browser: "Brauzer",
        engine: "Dvizhok",
        protocol: "Protokol",
        ip: "IP",
        locale: "Lokal",
        languages: "Yazyki",
        timezone: "Poyas",
        resolution: "Razreshenie",
        cpuThreads: "CPU Potoki",
        gpu: "GPU",
        cookies: "Cookies",
        touch: "Touch",
        uptime: "Uptime",
      },
    },
    monitor: {
      prefix: "htop@web",
      tasks: "Zadachi",
      running: "aktivny",
      avgCpu: "CPU sred",
    },
    shellTips: [
      "ls -la          # spisok faylov",
      "cd ..           # roditelskaya papka",
      "grep -R foo .   # poisk teksta",
      "du -sh *        # razmer papok",
      "cat ~/.bashrc   # config shell",
      "ipconfig        # setevaya info",
      "git status      # sostoyanie repo",
    ],
  },
};

function getLanguagePack(languageCode) {
  return staticI18n[languageCode] || staticI18n.fr;
}

function normalizeViewsFromConfig(config, languageCode = "fr") {
  if (!config || !Array.isArray(config.categories)) {
    return null;
  }

  const normalizedViews = {};

  config.categories.forEach((category) => {
    if (!category || typeof category !== "object") {
      return;
    }

    const translationMap =
      category.translations && typeof category.translations === "object" ? category.translations : {};
    const localizedCategory =
      translationMap[languageCode] && typeof translationMap[languageCode] === "object"
        ? translationMap[languageCode]
        : {};

    const viewId = typeof category.id === "string" ? category.id.trim() : "";
    const title =
      typeof localizedCategory.title === "string"
        ? localizedCategory.title
        : typeof category.title === "string"
          ? category.title
          : "";
    if (!viewId || !title) {
      return;
    }

    const textZone = category.textZone && typeof category.textZone === "object" ? category.textZone : {};
    const localizedTextZone =
      localizedCategory.textZone && typeof localizedCategory.textZone === "object"
        ? localizedCategory.textZone
        : {};
    const ascii = toLines(
      Array.isArray(localizedTextZone.asciiLines)
        ? localizedTextZone.asciiLines
        : Array.isArray(textZone.asciiLines)
          ? textZone.asciiLines
          : category.ascii,
      typeof localizedTextZone.asciiText === "string" ? localizedTextZone.asciiText : textZone.asciiText
    );
    const meta = toLines(
      Array.isArray(localizedTextZone.metaLines)
        ? localizedTextZone.metaLines
        : Array.isArray(textZone.metaLines)
          ? textZone.metaLines
          : category.meta,
      typeof localizedTextZone.metaText === "string" ? localizedTextZone.metaText : textZone.metaText
    );

    normalizedViews[viewId] = {
      title,
      subtitle:
        typeof localizedCategory.subtitle === "string"
          ? localizedCategory.subtitle
          : typeof category.subtitle === "string"
            ? category.subtitle
            : "",
      ascii,
      meta,
      actions: normalizeActions(
        Array.isArray(localizedCategory.actions) ? localizedCategory.actions : category.actions
      ),
    };
  });

  return Object.keys(normalizedViews).length > 0 ? normalizedViews : null;
}

function normalizeSupportedLanguages(config) {
  if (!config || !Array.isArray(config.supportedLanguages)) {
    return ["fr", "en", "es", "de", "ru"];
  }

  const valid = config.supportedLanguages.filter(
    (code) => typeof code === "string" && staticI18n[code]
  );
  return valid.length > 0 ? valid : ["fr", "en", "es", "de", "ru"];
}

function syncLanguageSelectorOptions() {
  if (!languageSelect) {
    return;
  }

  Array.from(languageSelect.options).forEach((option) => {
    const isSupported = supportedLanguages.includes(option.value);
    option.hidden = !isSupported;
    option.disabled = !isSupported;
  });
}

function refreshMenuLabels() {
  menuButtons.forEach((button) => {
    const viewKey = button.dataset.view;
    const view = views[viewKey];
    const fallbackLabel = menuLabelMap.get(button) || `[ ${String(viewKey || "").toUpperCase()} ]`;
    const label = view && view.title ? `[ ${view.title} ]` : fallbackLabel;
    menuLabelMap.set(button, label);

    if (bootFinalized) {
      button.textContent = label;
    }
  });
}

function applyWindowI18n(languagePack) {
  const windows = ["fastfetch", "monitor", "shell"];

  windows.forEach((windowId) => {
    const windowEl = document.querySelector(`[data-window="${windowId}"]`);
    const windowTexts = languagePack.windows?.[windowId];
    if (!windowEl || !windowTexts) {
      return;
    }

    const titleEl = windowEl.querySelector(".window-title");
    const labelEl = windowEl.querySelector(".window-label");
    const closeEl = windowEl.querySelector("[data-window-close]");

    if (titleEl && typeof windowTexts.title === "string") {
      titleEl.textContent = windowTexts.title;
    }

    if (labelEl && typeof windowTexts.label === "string") {
      labelEl.textContent = windowTexts.label;
    }

    if (closeEl && typeof windowTexts.closeAria === "string") {
      closeEl.setAttribute("aria-label", windowTexts.closeAria);
    }
  });
}

function applyStaticUiTexts(languagePack) {
  document.documentElement.lang = languagePack.htmlLang || activeLanguage;

  if (languageLabel) {
    languageLabel.textContent = languagePack.languageLabel || "LANGUE";
  }

  if (menuList) {
    menuList.setAttribute("aria-label", languagePack.navAriaLabel || "Navigation");
  }

  if (bootSkipButton) {
    bootSkipButton.setAttribute("aria-label", languagePack.bootSkipAria || "Skip boot");
  }

  if (statusLineTop) {
    statusLineTop.textContent = languagePack.statusTop || "Leeway@Portfolio:~$ panel online";
  }

  if (statusLine) {
    statusLine.dataset.fullText = languagePack.statusBottom || "Leeway@Portfolio:~$ ~/.config/me";
    if (bootFinalized) {
      statusLine.textContent = statusLine.dataset.fullText;
    }
  }

  if (resetWidgetsButton) {
    resetWidgetsButton.textContent = languagePack.resetWidgets || "[ REOPEN_WIDGETS ]";
  }

  if (runFastfetchButton) {
    runFastfetchButton.textContent = languagePack.fastfetchRefresh || "[ REFRESH_FASTFETCH ]";
  }

  if (!fastfetchOutput?.textContent || fastfetchOutput.textContent.includes("Booting fastfetch")) {
    fastfetchOutput.textContent = languagePack.fastfetchLoading || "Booting fastfetch...";
  }

  if (!monitorOutput?.textContent || monitorOutput.textContent.includes("Starting monitor stream")) {
    monitorOutput.textContent = languagePack.monitorLoading || "Starting monitor stream...";
  }

  if (!shellOutput?.textContent || shellOutput.textContent.includes("Loading shell notes")) {
    shellOutput.textContent = languagePack.shellLoading || "Loading shell notes...";
  }

  applyWindowI18n(languagePack);
}

function setLanguage(languageCode, options = {}) {
  const nextLanguage = supportedLanguages.includes(languageCode) ? languageCode : "fr";
  const persist = options.persist || false;

  activeLanguage = nextLanguage;
  const languagePack = getLanguagePack(activeLanguage);
  activeLocale = languagePack.locale || "fr-FR";

  applyStaticUiTexts(languagePack);
  views = normalizeViewsFromConfig(siteConfig, activeLanguage) || fallbackViews;
  refreshMenuLabels();

  if (!views[activeView]) {
    const firstView = Object.keys(views)[0];
    if (firstView) {
      activeView = firstView;
    }
  }

  setActiveButton(activeView);

  if (languageSelect) {
    languageSelect.value = activeLanguage;
  }

  if (bootFinalized) {
    switchView(activeView, { skipTransition: true });
    renderMonitorWidget();
    renderShellWidget();
  }

  if (persist) {
    try {
      localStorage.setItem("portfolio-language", activeLanguage);
    } catch {
      // Ignore persistence errors in restricted contexts.
    }
  }

  updateClock();
}

function getInitialLanguage(config) {
  const configDefault =
    config && typeof config.defaultLanguage === "string" ? config.defaultLanguage.toLowerCase() : "fr";

  let savedLanguage = "";
  try {
    savedLanguage = localStorage.getItem("portfolio-language") || "";
  } catch {
    savedLanguage = "";
  }

  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  if (supportedLanguages.includes(configDefault)) {
    return configDefault;
  }

  return "fr";
}

async function loadSiteConfig() {
  try {
    const response = await fetch("./views-zones.json", { cache: "no-store" });
    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

const WIDGET_MIN_WIDTH = 180;
const WIDGET_MIN_HEIGHT = 150;
const WIDGET_MAX_WIDTH = 620;
const WIDGET_MAX_HEIGHT = 620;

const SHELL_BASE_GUTTER = 16;
const SHELL_MIN_WIDTH = 680;
const DOCK_EDGE_TRIGGER_RATIO = 0.2;
const DOCK_MAX_RATIO = 0.38;
const SHELL_LAYOUT_EASE = 0.22;
const SHELL_LAYOUT_SNAP = 0.5;

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

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomHex(length) {
  const alphabet = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += alphabet[randomInt(0, alphabet.length - 1)];
  }
  return out;
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
  const line = document.createElement("p");
  line.className = tone;
  bootLinesContainer.appendChild(line);
  bootLinesContainer.scrollTop = bootLinesContainer.scrollHeight;

  await typeText(line, text, speed, null, step, () => bootSkipRequested);
  bootLinesContainer.scrollTop = bootLinesContainer.scrollHeight;
}

async function finalizeBootSequence(skipTyping = false) {
  if (bootFinalized) {
    return;
  }

  bootFinalized = true;
  bootScreen.classList.add("is-hidden");
  appShell.classList.add("is-visible");

  if (skipTyping) {
    menuButtons.forEach((button) => {
      button.textContent = menuLabelMap.get(button);
    });

    if (statusLine) {
      statusLine.textContent = statusLine.dataset.fullText;
    }
  } else {
    for (const button of menuButtons) {
      const label = menuLabelMap.get(button);
      await typeText(button, label, TYPE_SPEED.menu);
      await wait(24);
    }

    if (statusLine) {
      await typeText(statusLine, statusLine.dataset.fullText, TYPE_SPEED.status);
    }
  }

  switchView(activeView, { skipTransition: true });
}

function requestBootSkip() {
  bootSkipRequested = true;
  finalizeBootSequence(true);
}

function pulseButton(element) {
  element.classList.remove("is-hit");
  void element.offsetWidth;
  element.classList.add("is-hit");
}

function setTypingState(element, isTyping) {
  element.classList.toggle("is-typing", isTyping);
}

async function typeText(element, text, speed, cycleId, step = 1, guard = null) {
  element.textContent = "";
  setTypingState(element, true);

  for (let index = 0; index <= text.length; index += step) {
    const cancelled = guard ? guard() : cycleId && cycleId !== renderCycle;
    if (cancelled) {
      setTypingState(element, false);
      return;
    }

    const safeIndex = Math.min(index, text.length);
    element.textContent = text.slice(0, safeIndex);

    if (safeIndex < text.length) {
      await wait(speed);
    }
  }

  element.textContent = text;

  setTypingState(element, false);
}

function typeTextDelayed(element, text, speed, delay, cycleId, step = 1) {
  setTimeout(() => {
    typeText(element, text, speed, cycleId, step);
  }, delay);
}

function padRight(text, width) {
  return text.length >= width ? text : `${text}${" ".repeat(width - text.length)}`;
}

function fitText(text, width) {
  if (text.length <= width) {
    return text;
  }

  if (width <= 3) {
    return text.slice(0, width);
  }

  return `${text.slice(0, width - 3)}...`;
}

function makeInfoBox(lines, width) {
  const top = `+${"-".repeat(width + 2)}+`;
  return [top, ...lines.map((line) => `| ${padRight(fitText(line, width), width)} |`), top];
}

function getOsLogoLines(os) {
  if (os === "Windows") {
    return [
      "        ,.=:!!t3Z3z.,",
      "       :tt:::tt333EE3",
      "       Et:::ztt33EEEL @Ee.,      ..,",
      "      ;tt:::tt333EE7 ;EEEEEEttttt33#",
      "     :Et:::zt333EEQ. $EEEEEttttt33QL",
      "     it::::tt333EEF @EEEEEEttttt33F",
      "    ;3=*^```\"*4EEV :EEEEEEttttt33@.",
      "    ,.=::::!t=.,` @EEEEEEtttz33QF",
      "   ;::::::::zt33)   \"4EEEtttji3P*",
      "  :t::::::::tt33.:Z3z..   `` ,..g.",
      "  i::::::::zt33F AEEEtttt::::ztF",
      " ;:::::::::t33V ;EEEttttt::::t3",
      " E::::::::zt33L @EEEtttt::::z3F",
      "{3=*^```\"*4E3) ;EEEtttt:::::tZ`",
      "             ` :EEEEtttt::::z7",
      "                \"VEzjt:;;z>*`",
    ];
  }

  if (os === "macOS") {
    return [
      "                    c.'",
      "                 ,xNMM.",
      "               .OMMMMo",
      "               OMMM0,",
      "     .;loddo:' loolloddol;.",
      "   cKMMMMMMMMMMNWMMMMMMMMMM0:",
      " .KMMMMMMMMMMMMMMMMMMMMMMMWd.",
      " XMMMMMMMMMMMMMMMMMMMMMMMX.",
      ";MMMMMMMMMMMMMMMMMMMMMMMM:",
      ":MMMMMMMMMMMMMMMMMMMMMMMM:",
      ".MMMMMMMMMMMMMMMMMMMMMMMMX.",
      " kMMMMMMMMMMMMMMMMMMMMMMMMWd.",
      " .XMMMMMMMMMMMMMMMMMMMMMMMMMMk",
      "  .XMMMMMMMMMMMMMMMMMMMMMMMMK.",
      "    kMMMMMMMMMMMMMMMMMMMMMMd",
      "     ;KMMMMMMMWXXWMMMMMMMk.",
      "       \"cooc*\"    \"*coo'\"",
    ];
  }

  if (os === "Android") {
    return [
      "         -o          o-",
      "          +hydNNNNdyh+",
      "        +mMMMMMMMMMMMMm+",
      "      `dMMm:NMMMMMMN:mMMd`",
      "      hMMMMMMMMMMMMMMMMMMh",
      "  ..  yyyyyyyyyyyyyyyyyyyy  ..",
      ".mMMm`MMMMMMMMMMMMMMMMMMMM`mMMm.",
      ":MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:",
      ":MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:",
      ":MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:",
      ":MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:",
      " -++- +mMMMMMMMMMMMMMMMMm+ -++-",
      "        +mMMMMMMMMMMMMm+",
      "          /MMM/  \\MMM\\",
      "           MMM\\__/MMM",
      "            \\      /",
      "             `----`",
    ];
  }

  if (os === "iOS") {
    return [
      "                 .:;iiiiii;:.",
      "             .;i7777777777777i;.",
      "           :i7777777777777777777i:",
      "         ;777777777777777777777777;",
      "       .777777777777777777777777777.",
      "      :77777777777777777777777777777:",
      "     .777777777777777777777777777777.",
      "     7777777777777777777777777777777",
      "     7777777777777777777777777777777",
      "     7777777777777777777777777777777",
      "     '77777777777777777777777777777'",
      "      .777777777777777777777777777.",
      "       ;7777777777777777777777777;",
      "         :777777777777777777777:",
      "           .;i7777777777777i;.",
      "               `:;iiiii;:'",
    ];
  }

  if (os === "Linux") {
    return [
      "        #######",
      "      ###########",
      "    ###############",
      "   ######     ######",
      "  #####  O   O  #####",
      "  ####     ^     ####",
      "  ####   \\___/   ####",
      "  #####         #####",
      "   ######     ######",
      "    ###############",
      "   #################",
      "  ###################",
      " #####################",
      " ######         ######",
      " #####             #####",
      "  ###               ###",
    ];
  }

  return [
    "       .------------.",
    "      / .----------. \\",
    "     / /  UNKNOWN   \\ \\",
    "    / /   PLATFORM   \\ \\",
    "   /_/_______________\\_\\",
  ];
}

function composeFastfetch(logoLines, infoLines) {
  const logoWidth = Math.max(...logoLines.map((line) => line.length));
  const rows = Math.max(logoLines.length, infoLines.length);
  const out = [];

  for (let i = 0; i < rows; i += 1) {
    const left = logoLines[i] || "";
    const right = infoLines[i] || "";
    out.push(`${padRight(left, logoWidth)}   ${right}`.trimEnd());
  }

  return out;
}

function detectBrowser(ua) {
  if (/Edg\//.test(ua)) {
    return "Microsoft Edge";
  }
  if (/OPR\//.test(ua)) {
    return "Opera";
  }
  if (/Firefox\//.test(ua)) {
    return "Firefox";
  }
  if (/Chrome\//.test(ua)) {
    return "Chrome";
  }
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) {
    return "Safari";
  }
  return "Unknown Browser";
}

function detectBrowserVersion(ua, browser) {
  const patterns = {
    "Microsoft Edge": /Edg\/([\d.]+)/,
    Opera: /OPR\/([\d.]+)/,
    Firefox: /Firefox\/([\d.]+)/,
    Chrome: /Chrome\/([\d.]+)/,
    Safari: /Version\/([\d.]+)/,
  };

  const pattern = patterns[browser];
  if (!pattern) {
    return "unknown";
  }

  const match = ua.match(pattern);
  return match?.[1] || "unknown";
}

function getGpuRenderer() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      return "unavailable";
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) {
      return "webgl";
    }

    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "unavailable";
  } catch {
    return "unavailable";
  }
}

function detectEngine(ua) {
  if (/Gecko\//.test(ua) && /Firefox\//.test(ua)) {
    return "Gecko";
  }
  if (/AppleWebKit\//.test(ua) && /Chrome\//.test(ua)) {
    return "Blink";
  }
  if (/AppleWebKit\//.test(ua)) {
    return "WebKit";
  }
  return "Unknown Engine";
}

function detectOs(ua, platform) {
  if (/Windows NT/.test(ua) || /^Win/.test(platform)) {
    return "Windows";
  }
  if (/Android/.test(ua)) {
    return "Android";
  }
  if (/iPhone|iPad|iPod/.test(ua)) {
    return "iOS";
  }
  if (/Mac OS X/.test(ua) || /^Mac/.test(platform)) {
    return "macOS";
  }
  if (/Linux/.test(ua) || /^Linux/.test(platform)) {
    return "Linux";
  }
  return "Unknown OS";
}

async function getPublicIp() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const response = await fetch("https://api.ipify.org?format=json", {
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return "unavailable";
    }

    const payload = await response.json();
    return payload.ip || "unavailable";
  } catch {
    return "unavailable";
  }
}

async function collectFastfetchInfo() {
  const ua = navigator.userAgent || "unknown";
  const browser = detectBrowser(ua);
  const browserVersion = detectBrowserVersion(ua, browser);
  const engine = detectEngine(ua);
  const platform = navigator.platform || "unknown";
  const os = detectOs(ua, platform);
  const host = location.host || "local";
  const protocol = location.protocol.replace(":", "") || "unknown";
  const language = navigator.language || "unknown";
  const languages = navigator.languages?.join(", ") || language;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
  const resolution = `${window.screen.width}x${window.screen.height}`;
  const pixelRatio = window.devicePixelRatio || 1;
  const cpuThreads = navigator.hardwareConcurrency ?? "unknown";
  const touchPoints = navigator.maxTouchPoints ?? 0;
  const cookieEnabled = navigator.cookieEnabled ? "enabled" : "disabled";
  const pageUptime = `${Math.floor(performance.now() / 1000)}s`;
  const gpu = getGpuRenderer();
  const ip = await getPublicIp();

  return {
    os,
    browser,
    browserVersion,
    engine,
    platform,
    host,
    protocol,
    language,
    languages,
    timeZone,
    resolution,
    pixelRatio,
    cpuThreads,
    touchPoints,
    cookieEnabled,
    pageUptime,
    gpu,
    ip,
  };
}

function buildFastfetchText(info) {
  const languagePack = getLanguagePack(activeLanguage);
  const fastfetchStrings = languagePack.fastfetch || {};
  const labels = fastfetchStrings.labels || {};

  const entries = [
    [labels.host || "Host", info.host],
    [labels.os || "OS", `${info.os} (${info.platform})`],
    [labels.browser || "Browser", `${info.browser} ${info.browserVersion}`],
    [labels.engine || "Engine", info.engine],
    [labels.protocol || "Protocol", info.protocol],
    [labels.ip || "IP", info.ip],
    [labels.locale || "Locale", info.language],
    [labels.languages || "Languages", info.languages],
    [labels.timezone || "Timezone", info.timeZone],
    [labels.resolution || "Resolution", `${info.resolution} @${info.pixelRatio}x`],
    [labels.cpuThreads || "CPU Threads", String(info.cpuThreads)],
    [labels.gpu || "GPU", info.gpu],
    [labels.cookies || "Cookies", info.cookieEnabled],
    [labels.touch || "Touch", `${info.touchPoints}`],
    [labels.uptime || "Uptime", info.pageUptime],
  ];

  const keyWidth = Math.max(...entries.map(([key]) => key.length));
  const infoLines = [
    fastfetchStrings.profileTitle || "FASTFETCH WEB PROFILE",
    "",
    ...entries.map(([key, value]) => `${padRight(key, keyWidth)} : ${value}`),
    "",
    fastfetchStrings.privacy || "privacy-mode: browser-exposed data only",
    fastfetchStrings.refreshHint || "refresh: updates runtime metrics and network state",
  ];

  const boxedInfo = makeInfoBox(infoLines, 56);
  const logo = getOsLogoLines(info.os);
  return composeFastfetch(logo, boxedInfo).join("\n");
}

async function runFastfetch() {
  if (!fastfetchOutput || !runFastfetchButton) {
    return;
  }

  runFastfetchButton.disabled = true;
  fastfetchCycle += 1;
  const cycleId = fastfetchCycle;
  const fastfetchStrings = getLanguagePack(activeLanguage).fastfetch || {};

  await typeText(
    fastfetchOutput,
    fastfetchStrings.collecting || "collecting browser diagnostics...",
    8,
    cycleId,
    3,
    () => cycleId !== fastfetchCycle
  );
  const info = await collectFastfetchInfo();
  if (cycleId !== fastfetchCycle) {
    runFastfetchButton.disabled = false;
    return;
  }

  const output = buildFastfetchText(info);
  await typeText(fastfetchOutput, output, 1, cycleId, 4, () => cycleId !== fastfetchCycle);
  runFastfetchButton.disabled = false;
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function jitterNumber(value, delta, min, max) {
  const next = value + (Math.random() * 2 - 1) * delta;
  return clampNumber(next, min, max);
}

function formatUptime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatMemoryMb(value) {
  return `${String(Math.round(value)).padStart(5, " ")}M`;
}

function formatProcessTime(seconds) {
  const total = Math.max(0, seconds);
  const minutes = Math.floor(total / 60);
  const wholeSeconds = Math.floor(total % 60);
  const hundredths = Math.floor((total - Math.floor(total)) * 100);
  return `${String(minutes).padStart(3, "0")}:${String(wholeSeconds).padStart(2, "0")}.${String(hundredths).padStart(2, "0")}`;
}

function buildHtopBar(label, value, width = 20) {
  const bounded = clampNumber(value, 0, 100);
  const filled = Math.round((bounded / 100) * width);
  return `${padRight(label, 5)}[${"#".repeat(filled).padEnd(width, ".")}] ${bounded.toFixed(1).padStart(5, " ")}%`;
}

function updateMonitorState() {
  monitorState.cpus = monitorState.cpus.map((cpu) => jitterNumber(cpu, 14, 1.2, 99.2));
  const avgCpu = monitorState.cpus.reduce((sum, cpu) => sum + cpu, 0) / monitorState.cpus.length;

  const memDrift = (avgCpu - 50) * 3.4 + (Math.random() * 2 - 1) * 70;
  monitorState.memUsedMb = clampNumber(
    monitorState.memUsedMb + memDrift,
    monitorMemoryTotalMb * 0.2,
    monitorMemoryTotalMb * 0.95
  );

  const swapDrift = (Math.random() * 2 - 1) * 11 + Math.max(0, avgCpu - 72) * 0.65;
  monitorState.swapUsedMb = clampNumber(
    monitorState.swapUsedMb + swapDrift,
    monitorSwapTotalMb * 0.03,
    monitorSwapTotalMb * 0.9
  );

  monitorState.tasks = Math.round(clampNumber(monitorState.tasks + (Math.random() * 2 - 1) * 3, 140, 280));
  monitorState.threads = Math.round(clampNumber(monitorState.tasks * 3.35 + (Math.random() * 2 - 1) * 14, 420, 980));
  monitorState.running = Math.round(
    clampNumber(avgCpu / 34 + Math.random() * 2, 1, Math.min(10, monitorCoreCount + 2))
  );

  const instantLoad = (avgCpu / 100) * monitorCoreCount;
  monitorState.load[0] = clampNumber(monitorState.load[0] * 0.56 + instantLoad * 0.44, 0, monitorCoreCount * 2.6);
  monitorState.load[1] = clampNumber(monitorState.load[1] * 0.72 + instantLoad * 0.28, 0, monitorCoreCount * 2.3);
  monitorState.load[2] = clampNumber(monitorState.load[2] * 0.86 + instantLoad * 0.14, 0, monitorCoreCount * 2);

  monitorState.processes = monitorState.processes
    .map((process) => {
      const burst = Math.random() < 0.06 ? 9 : 0;
      const cpu = clampNumber(
        process.cpu + (Math.random() * 2 - 1) * process.volatility + (avgCpu - 46) * 0.04 + burst,
        0.1,
        process.maxCpu
      );
      const mem = clampNumber(process.mem + (Math.random() * 2 - 1) * 0.55 + cpu * 0.012, 0.4, 28);
      const time = process.time + cpu / 15;
      const virt = clampNumber(process.virt + (Math.random() * 2 - 1) * 6 + cpu * 0.05, 250, 2200);
      const res = clampNumber(process.res + (Math.random() * 2 - 1) * 4 + mem * 0.25, 64, 980);
      const state = cpu > 35 ? "R" : Math.random() < 0.06 ? "D" : "S";

      return {
        ...process,
        cpu,
        mem,
        time,
        virt,
        res,
        state,
      };
    })
    .sort((a, b) => b.cpu - a.cpu);
}

function renderMonitorWidget() {
  if (!monitorOutput) {
    return;
  }

  updateMonitorState();

  const now = new Date();
  const uptimeSeconds = Math.floor((Date.now() - monitorBootTime) / 1000);
  const avgCpu = monitorState.cpus.reduce((sum, cpu) => sum + cpu, 0) / monitorState.cpus.length;
  const memPercent = (monitorState.memUsedMb / monitorMemoryTotalMb) * 100;
  const swapPercent = (monitorState.swapUsedMb / monitorSwapTotalMb) * 100;
  const monitorStrings = getLanguagePack(activeLanguage).monitor || {};
  const monitorPrefix = monitorStrings.prefix || "htop@web";
  const tasksLabel = monitorStrings.tasks || "Tasks";
  const runningLabel = monitorStrings.running || "running";
  const avgCpuLabel = monitorStrings.avgCpu || "Avg CPU";
  const cpuLines = monitorState.cpus
    .slice(0, 6)
    .map((cpu, index) => buildHtopBar(`CPU${index}`, cpu, 18));

  const processHeader = " PID  USER      PRI  NI   VIRT   RES  S  CPU% MEM%    TIME+  COMMAND";
  const processRows = monitorState.processes.slice(0, 8).map((process) => {
    return `${String(process.pid).padStart(4, " ")}  ${padRight(process.user, 8)}  ${String(process.pri).padStart(3, " ")}  ${String(process.ni).padStart(2, " ")}  ${formatMemoryMb(process.virt)} ${formatMemoryMb(process.res)}  ${process.state}  ${process.cpu.toFixed(1).padStart(5, " ")} ${process.mem.toFixed(1).padStart(4, " ")}  ${formatProcessTime(process.time)}  ${process.command}`;
  });

  const lines = [
    `${monitorPrefix}  ${now.toLocaleTimeString(activeLocale, { hour12: false })}  up ${formatUptime(uptimeSeconds)}  load: ${monitorState.load.map((value) => value.toFixed(2)).join(" ")}`,
    `${tasksLabel}: ${monitorState.tasks}, ${monitorState.threads} thr; ${monitorState.running} ${runningLabel}  |  ${avgCpuLabel}: ${avgCpu.toFixed(1)}%`,
    buildHtopBar("Mem", memPercent, 18) + `  ${formatMemoryMb(monitorState.memUsedMb)}/${formatMemoryMb(monitorMemoryTotalMb)}`,
    buildHtopBar("Swp", swapPercent, 18) + `  ${formatMemoryMb(monitorState.swapUsedMb)}/${formatMemoryMb(monitorSwapTotalMb)}`,
    ...cpuLines,
    "",
    processHeader,
    ...processRows,
  ];

  monitorOutput.textContent = lines.join("\n");
}

function renderShellWidget() {
  if (!shellOutput) {
    return;
  }

  const languagePack = getLanguagePack(activeLanguage);
  const tips = Array.isArray(languagePack.shellTips) ? languagePack.shellTips : staticI18n.fr.shellTips;

  const pick = tips[Math.floor(Math.random() * tips.length)];
  const lines = [
    "shell@linux",
    "------------------------------",
    "$ " + pick,
    "$ echo \"TUI ready\"",
    "TUI ready",
    "$ _",
  ];

  shellOutput.textContent = lines.join("\n");
}

function startSideWidgetStreams() {
  if (monitorTimer) {
    clearInterval(monitorTimer);
  }

  if (shellTimer) {
    clearInterval(shellTimer);
  }

  renderMonitorWidget();
  renderShellWidget();

  monitorTimer = setInterval(renderMonitorWidget, 650);
  shellTimer = setInterval(renderShellWidget, 1300);
}

function stopSideWidgetStreams() {
  if (monitorTimer) {
    clearInterval(monitorTimer);
    monitorTimer = undefined;
  }

  if (shellTimer) {
    clearInterval(shellTimer);
    shellTimer = undefined;
  }
}

function setupFastfetchWidget() {
  if (!runFastfetchButton || !fastfetchOutput) {
    return;
  }

  runFastfetchButton.addEventListener("click", () => {
    pulseButton(runFastfetchButton);
    runFastfetch();
  });

  runFastfetch();
}

function isPhoneMode() {
  const narrowViewport = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
  const shortLandscapeViewport = window.matchMedia(
    "(max-height: 560px) and (orientation: landscape)"
  ).matches;
  const coarseTabletViewport = window.matchMedia(
    `(max-width: ${TOUCH_TABLET_BREAKPOINT}px) and (pointer: coarse)`
  ).matches;
  return narrowViewport || shortLandscapeViewport || coarseTabletViewport;
}

function applyPhoneWidgetVisibility(phoneMode) {
  if (floatingDeck) {
    floatingDeck.style.display = phoneMode ? "none" : "";
  }

  if (resetWidgetsButton) {
    resetWidgetsButton.style.display = phoneMode ? "none" : "";
  }
}

function ensureDesktopWidgetsReady() {
  if (!widgetsInitialized) {
    initializeFloatingWindows();
    setupFastfetchWidget();
    widgetsInitialized = true;
  }

  startSideWidgetStreams();
}

function syncViewportMode() {
  const phoneMode = isPhoneMode();
  applyPhoneWidgetVisibility(phoneMode);

  if (phoneMode) {
    stopSideWidgetStreams();
    cancelShellLayoutAnimation();
    shellLayoutMotion.initialized = false;
    if (appShell) {
      appShell.style.width = "";
      appShell.style.marginLeft = "";
      appShell.style.marginRight = "";
    }
    return;
  }

  setAsciiExpanded(false, { immediate: true });

  ensureDesktopWidgetsReady();
  updateShellLayoutFromDocks();
}

function setAsciiExpanded(expanded, options = {}) {
  if (!viewAscii) {
    return;
  }

  const immediate = options.immediate === true;
  const nextState = Boolean(expanded) && isPhoneMode();

  if (asciiCollapseTimer) {
    clearTimeout(asciiCollapseTimer);
    asciiCollapseTimer = undefined;
  }

  if (nextState) {
    asciiExpanded = true;
    viewAscii.classList.remove("is-collapsing");
    viewAscii.classList.add("is-expanded");

    if (!immediate) {
      viewAscii.classList.remove("is-opening");
      void viewAscii.offsetWidth;
      viewAscii.classList.add("is-opening");
    }

    document.body.classList.add("is-ascii-expanded");

    if (asciiCloseButton) {
      asciiCloseButton.classList.add("is-visible");
    }

    viewAscii.scrollTop = 0;
    return;
  }

  if (!asciiExpanded) {
    viewAscii.classList.remove("is-opening", "is-collapsing", "is-expanded");
    document.body.classList.remove("is-ascii-expanded");
    if (asciiCloseButton) {
      asciiCloseButton.classList.remove("is-visible");
    }
    return;
  }

  if (asciiCloseButton) {
    asciiCloseButton.classList.remove("is-visible");
  }

  if (immediate) {
    asciiExpanded = false;
    viewAscii.classList.remove("is-opening", "is-collapsing", "is-expanded");
    document.body.classList.remove("is-ascii-expanded");
    return;
  }

  viewAscii.classList.remove("is-opening");
  viewAscii.classList.add("is-collapsing");

  asciiCollapseTimer = setTimeout(() => {
    asciiExpanded = false;
    viewAscii.classList.remove("is-collapsing", "is-expanded");
    document.body.classList.remove("is-ascii-expanded");
    asciiCollapseTimer = undefined;
  }, 240);
}

function setupMobileAsciiExpand() {
  if (!viewAscii) {
    return;
  }

  viewAscii.addEventListener("click", () => {
    if (!isPhoneMode()) {
      return;
    }

    if (asciiExpanded || !viewAscii.textContent.trim()) {
      return;
    }

    setAsciiExpanded(true);
  });

  if (asciiCloseButton) {
    asciiCloseButton.addEventListener("click", () => {
      setAsciiExpanded(false);
    });
  }
}

function setActiveButton(nextView) {
  menuButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === nextView);
  });
}

function updateResetWidgetsVisibility() {
  const hasClosedWindow = floatingWindows.some((windowEl) => windowEl.classList.contains("is-hidden"));
  if (!resetWidgetsButton) {
    return;
  }

  resetWidgetsButton.classList.toggle("is-visible", hasClosedWindow);
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
  if (style.display === "none" || style.visibility === "hidden") {
    return false;
  }

  return true;
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
      marginRight = SHELL_BASE_GUTTER;
    } else {
      marginLeft = SHELL_BASE_GUTTER;
      marginRight = SHELL_BASE_GUTTER + right;
    }

    // Single-side dock: take the exact remaining width to avoid any weird gap.
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

function makeWindowDraggable(windowEl) {
  const handle = windowEl.querySelector("[data-drag-handle]");
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
      updateShellLayoutFromDocks();
    };

    const onPointerUp = () => {
      windowEl.classList.remove("is-dragging");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      updateShellLayoutFromDocks();
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

    const hideTimer = setTimeout(() => {
      windowEl.classList.remove("is-closing-tv");
      windowEl.classList.add("is-hidden");
      windowHideTimers.delete(windowEl);
      updateResetWidgetsVisibility();
      updateShellLayoutFromDocks();
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
    const startX = event.clientX;
    const startY = event.clientY;

    windowEl.classList.add("is-resizing");
    windowEl.style.zIndex = String(++topWindowZ);

    const onPointerMove = (moveEvent) => {
      const rawWidth = startRect.width + (moveEvent.clientX - startX);
      const rawHeight = startRect.height + (moveEvent.clientY - startY);
      const size = clampWindowSize(windowEl, rawWidth, rawHeight);
      windowEl.style.width = `${size.width}px`;
      windowEl.style.height = `${size.height}px`;
      updateShellLayoutFromDocks();
    };

    const onPointerUp = () => {
      windowEl.classList.remove("is-resizing");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      updateShellLayoutFromDocks();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  });
}

function rectsOverlap(a, b, padding = 12) {
  return !(
    a.right + padding < b.left ||
    a.left > b.right + padding ||
    a.bottom + padding < b.top ||
    a.top > b.bottom + padding
  );
}

function getRandomWidgetPosition(width, height, occupiedRects = []) {
  const margin = 8;
  const maxLeft = Math.max(margin, Math.round(window.innerWidth - width - margin));
  const maxTop = Math.max(margin, Math.round(window.innerHeight - height - margin));

  for (let attempt = 0; attempt < 26; attempt += 1) {
    const left = randomInt(margin, maxLeft);
    const top = randomInt(margin, maxTop);
    const candidate = {
      left,
      top,
      right: left + width,
      bottom: top + height,
    };

    const hasOverlap = occupiedRects.some((rect) => rectsOverlap(candidate, rect));
    if (!hasOverlap) {
      return { left, top };
    }
  }

  return {
    left: randomInt(margin, maxLeft),
    top: randomInt(margin, maxTop),
  };
}

function placeWidgetRandomly(windowEl, occupiedRects = [], preferredSize = null) {
  const rect = windowEl.getBoundingClientRect();
  const targetWidth = preferredSize?.width || rect.width;
  const targetHeight = preferredSize?.height || rect.height;

  const size = clampWindowSize(windowEl, targetWidth, targetHeight);
  const randomPos = getRandomWidgetPosition(size.width, size.height, occupiedRects);
  const safePos = clampWindowPosition(windowEl, randomPos.left, randomPos.top);

  windowEl.style.left = `${safePos.left}px`;
  windowEl.style.top = `${safePos.top}px`;
  windowEl.style.width = `${size.width}px`;
  windowEl.style.height = `${size.height}px`;

  occupiedRects.push({
    left: safePos.left,
    top: safePos.top,
    right: safePos.left + size.width,
    bottom: safePos.top + size.height,
  });

  return {
    left: safePos.left,
    top: safePos.top,
    width: size.width,
    height: size.height,
  };
}

function initializeFloatingWindows() {
  const occupiedRects = [];

  floatingWindows.forEach((windowEl, index) => {
    const placed = placeWidgetRandomly(windowEl, occupiedRects);

    windowDefaults.set(windowEl, {
      width: placed.width,
      height: placed.height,
    });

    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.zIndex = String(topWindowZ + index);
    makeWindowDraggable(windowEl);
    makeWindowResizable(windowEl);
  });

  if (resetWidgetsButton) {
    resetWidgetsButton.addEventListener("click", () => {
      const resetOccupiedRects = [];

      floatingWindows.forEach((windowEl, index) => {
        const defaults = windowDefaults.get(windowEl);

        const hideTimer = windowHideTimers.get(windowEl);
        if (hideTimer) {
          clearTimeout(hideTimer);
          windowHideTimers.delete(windowEl);
        }

        windowEl.classList.remove("is-hidden", "is-closing-tv", "is-dragging", "is-resizing");
        if (defaults) {
          placeWidgetRandomly(windowEl, resetOccupiedRects, {
            width: defaults.width,
            height: defaults.height,
          });
          windowEl.style.zIndex = String(topWindowZ + index);
        }
      });
      updateResetWidgetsVisibility();
      updateShellLayoutFromDocks();
    });
  }

  updateResetWidgetsVisibility();
  updateShellLayoutFromDocks({ immediate: true });
}

function createActionElement(action) {
  if (action.href) {
    const link = document.createElement("a");
    link.className = "action-btn";
    link.href = action.href;
    if (action.href.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
    link.addEventListener("click", () => {
      pulseButton(link);
    });
    return { element: link, label: action.label };
  }

  if (action.view) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "action-btn";
    button.addEventListener("click", () => {
      pulseButton(button);
      switchView(action.view);
    });
    return { element: button, label: action.label };
  }

  return null;
}

function renderActions(actions, cycleId) {
  viewActions.innerHTML = "";

  const typedActions = [];
  actions.forEach((action, index) => {
    const rendered = createActionElement(action);
    if (!rendered) {
      return;
    }

    viewActions.appendChild(rendered.element);
    typedActions.push({ ...rendered, delay: 300 + index * 140, cycleId });
  });

  return typedActions;
}

function renderView(viewKey, cycleId) {
  const view = views[viewKey];
  if (!view) {
    return;
  }

  viewTitle.textContent = "";
  viewSubtitle.textContent = "";
  viewAscii.textContent = "";
  viewMeta.innerHTML = "";

  const viewTitleText = `+---------------- [ ${view.title} ] ----------------+`;
  typeText(viewTitle, viewTitleText, TYPE_SPEED.title, cycleId);
  typeTextDelayed(viewSubtitle, view.subtitle, TYPE_SPEED.subtitle, 70, cycleId);
  typeTextDelayed(viewAscii, view.ascii.join("\n"), TYPE_SPEED.ascii, 80, cycleId, 8);

  view.meta.forEach((line, index) => {
    const item = document.createElement("p");
    item.className = "meta-line";
    viewMeta.appendChild(item);
    typeTextDelayed(item, line, TYPE_SPEED.meta, 240 + index * 125, cycleId);
  });

  const typedActions = renderActions(view.actions, cycleId);
  typedActions.forEach((action) => {
    typeTextDelayed(action.element, action.label, TYPE_SPEED.action, action.delay, cycleId);
  });
}

function finishSwitch() {
  workspace.classList.remove("is-switching");
  workspace.classList.add("is-entering-view");

  setTimeout(() => {
    workspace.classList.remove("is-entering-view");
    isSwitching = false;

    if (queuedView && queuedView !== activeView) {
      const next = queuedView;
      queuedView = null;
      switchView(next);
      return;
    }

    queuedView = null;
  }, 260);
}

function switchView(viewKey, options = {}) {
  const skipTransition = options.skipTransition || false;

  if (asciiExpanded) {
    setAsciiExpanded(false);
  }

  if (!views[viewKey]) {
    return;
  }

  if (isSwitching && !skipTransition) {
    queuedView = viewKey;
    return;
  }

  if (viewKey === activeView && !skipTransition) {
    renderCycle += 1;
    renderView(activeView, renderCycle);
    return;
  }

  activeView = viewKey;
  setActiveButton(viewKey);
  renderCycle += 1;
  const cycleId = renderCycle;

  if (skipTransition) {
    workspace.classList.remove("is-switching", "is-entering-view");
    renderView(viewKey, cycleId);
    return;
  }

  isSwitching = true;
  workspace.classList.remove("is-entering-view");
  workspace.classList.add("is-switching");

  setTimeout(() => {
    renderView(viewKey, cycleId);
    finishSwitch();
  }, 170);
}

async function runBootSequence() {
  bootLinesContainer.innerHTML = "";
  bootSkipRequested = false;
  bootFinalized = false;
  bootStartTime = performance.now();

  const targetBootDurationMs = 5000;
  const bootTypeSpeed = 1;
  const bootTypeStep = 14;
  const sectionPause = async () => {
    await wait(randomInt(4, 10));
  };
  const hardStopTimer = window.setTimeout(() => {
    if (bootFinalized) {
      return;
    }
    bootSkipRequested = true;
    if (bootSkipButton) {
      bootSkipButton.disabled = true;
    }
    finalizeBootSequence(true);
  }, targetBootDurationMs);

  const bootDiskId = randomHex(8);
  const bootMapperId = randomHex(6);
  const bootSessionId = randomHex(4);
  const swapSize = (monitorSwapTotalMb / 1024).toFixed(1);
  const memSize = (monitorMemoryTotalMb / 1024).toFixed(1);

  try {
    if (bootSkipButton) {
      bootSkipButton.disabled = false;
    }

    await appendBootLine(
      `[${bootTimestamp()}] Booting 1LEEWAY TUI kernel on /dev/mapper/vg0-root...`,
      "boot-info",
      bootTypeSpeed,
      bootTypeStep
    );
    if (bootSkipRequested) {
      return;
    }

    const kernelCount = Math.min(bootKernelLines.length, 18);
    const initrdCount = bootInitrdLines.length;
    const probeCount = bootProbeLines.length;
    const serviceCount = Math.min(bootServiceEvents.length, 20);
    const userspaceCount = bootUserspaceLines.length;

    for (const lineText of bootKernelLines.slice(0, kernelCount)) {
      await appendBootLine(`[${bootTimestamp()}] ${lineText}`, "boot-info", bootTypeSpeed, bootTypeStep);
      if (bootSkipRequested) {
        return;
      }
    }

    for (let core = 0; core < Math.min(8, monitorCoreCount); core += 1) {
      await appendBootLine(
        `[${bootTimestamp()}] smpboot: CPU${core} brought up in ${randomInt(82, 190)} ms`,
        "boot-dim",
        bootTypeSpeed,
        bootTypeStep
      );
      if (bootSkipRequested) {
        return;
      }
    }

    await sectionPause();

    await appendBootLine(`[${bootTimestamp()}] nvme0n1: p1 p2 p3`, "boot-dim", bootTypeSpeed, bootTypeStep);
    if (bootSkipRequested) {
      return;
    }

    await appendBootLine(
      `[${bootTimestamp()}] device-mapper: crypt setup on nvme0n1p3 as luks-${bootDiskId}`,
      "boot-dim",
      bootTypeSpeed,
      bootTypeStep
    );
    if (bootSkipRequested) {
      return;
    }

    for (const lineText of bootInitrdLines.slice(0, initrdCount)) {
      await appendBootLine(`${lineText}`, "boot-info", bootTypeSpeed, bootTypeStep);
      if (bootSkipRequested) {
        return;
      }
    }

    for (const percent of [3, 9, 14, 21, 33, 48, 57, 69, 78, 89, 96, 100]) {
      await appendBootLine(
        `[${bootTimestamp()}] fsck.ext4: /dev/mapper/vg0-root progress ${percent}%`,
        "boot-dim",
        bootTypeSpeed,
        bootTypeStep
      );
      if (bootSkipRequested) {
        return;
      }
    }

    await sectionPause();

    await appendBootLine(
      `:: mounted /dev/mapper/vg0-root on /new_root [ext4], ${memSize}G RAM, ${swapSize}G swap`,
      "boot-info",
      bootTypeSpeed,
      bootTypeStep
    );
    if (bootSkipRequested) {
      return;
    }

    await appendBootLine(":: switching to real root", "boot-info", bootTypeSpeed, bootTypeStep);
    if (bootSkipRequested) {
      return;
    }

    for (const lineText of bootProbeLines.slice(0, probeCount)) {
      await appendBootLine(`[${bootTimestamp()}] ${lineText}`, "boot-dim", bootTypeSpeed, bootTypeStep);
      if (bootSkipRequested) {
        return;
      }
    }

    await appendBootLine(
      `[${bootTimestamp()}] systemd[1]: Detected architecture x86-64.`,
      "boot-dim",
      bootTypeSpeed,
      bootTypeStep
    );
    if (bootSkipRequested) {
      return;
    }

    await appendBootLine(
      `[${bootTimestamp()}] systemd[1]: Hostname set to <tui-${bootMapperId}>.`,
      "boot-dim",
      bootTypeSpeed,
      bootTypeStep
    );
    if (bootSkipRequested) {
      return;
    }

    for (const event of bootServiceEvents.slice(0, serviceCount)) {
      const serviceLabel = event.text.replace(/\.$/, "");
      await appendBootLine(
        `[${bootTimestamp()}] systemd[1]: Processing ${serviceLabel.toLowerCase()}...`,
        "boot-dim",
        bootTypeSpeed,
        bootTypeStep
      );
      if (bootSkipRequested) {
        return;
      }

      await appendBootLine(
        `${bootStatusTag(event.status)} ${event.text}`,
        bootToneFromStatus(event.status),
        bootTypeSpeed,
        bootTypeStep
      );
      if (bootSkipRequested) {
        return;
      }
    }

    for (const lineText of bootUserspaceLines.slice(0, userspaceCount)) {
      await appendBootLine(`[${bootTimestamp()}] ${lineText}`, "boot-info", bootTypeSpeed, bootTypeStep);
      if (bootSkipRequested) {
        return;
      }
    }

    await appendBootLine(
      `${bootStatusTag("WARN")} NetworkManager-wait-online.service skipped (fast boot mode).`,
      "boot-warn",
      bootTypeSpeed,
      bootTypeStep
    );
    if (bootSkipRequested) {
      return;
    }

    await appendBootLine(
      `${bootStatusTag("OK")} Reached target Login Prompts.`,
      "boot-ok",
      bootTypeSpeed,
      bootTypeStep
    );
    if (bootSkipRequested) {
      return;
    }

    await appendBootLine(
      `[${bootTimestamp()}] Started Session ${bootSessionId} of user root.`,
      "boot-dim",
      bootTypeSpeed,
      bootTypeStep
    );
    if (bootSkipRequested) {
      return;
    }

    await appendBootLine("Arch Linux 1leeway tty1", "boot-info", bootTypeSpeed, bootTypeStep);
    if (bootSkipRequested) {
      return;
    }

    await appendBootLine("tui login: root", "boot-info", bootTypeSpeed, bootTypeStep);
    if (bootSkipRequested) {
      return;
    }

    await appendBootLine("root@tui ~ # ./start-panel", "boot-ok", bootTypeSpeed, bootTypeStep);
    if (bootSkipRequested || bootFinalized) {
      return;
    }

    const elapsed = performance.now() - bootStartTime;
    if (elapsed < targetBootDurationMs) {
      await wait(targetBootDurationMs - elapsed);
    }

    if (bootSkipRequested || bootFinalized) {
      return;
    }

    if (bootSkipButton) {
      bootSkipButton.disabled = true;
    }

    await finalizeBootSequence(false);
  } finally {
    window.clearTimeout(hardStopTimer);
  }
}

function updateClock() {
  const now = new Date();
  const dateText = `[ ${now.toLocaleDateString(activeLocale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })} ]`;

  if (clock) {
    clock.textContent = dateText;
  }

  if (clockTop) {
    clockTop.textContent = dateText;
  }
}

menuButtons.forEach((button) => {
  const label = button.textContent.trim();
  menuLabelMap.set(button, label);
  button.textContent = "";
  button.addEventListener("click", () => {
    pulseButton(button);
    switchView(button.dataset.view);
  });
});

if (statusLine) {
  statusLine.dataset.fullText = statusLine.textContent;
  statusLine.textContent = "";
}

async function initializeApp() {
  siteConfig = await loadSiteConfig();
  supportedLanguages = normalizeSupportedLanguages(siteConfig);
  syncLanguageSelectorOptions();

  const initialLanguage = getInitialLanguage(siteConfig);
  setLanguage(initialLanguage);

  if (languageSelect) {
    languageSelect.addEventListener("change", (event) => {
      setLanguage(event.target.value, { persist: true });
    });
  }

  year.textContent = new Date().getFullYear();
  setActiveButton(activeView);
  setupMobileAsciiExpand();
  syncViewportMode();

  if (bootSkipButton) {
    bootSkipButton.addEventListener("click", requestBootSkip);
  }

  runBootSequence();
  updateClock();
  setInterval(updateClock, 1000);
  window.addEventListener("resize", syncViewportMode);
}

initializeApp();
