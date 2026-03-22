class StoreSiteApp {
    constructor() {
        this.currentPage = document.body.dataset.page || 'guns';
        this.backendBaseUrl = localStorage.getItem('backendBaseUrl') || window.location.origin;
        this.discordClientId = '1474585191531155516';
        this.adminDiscordUsername = '1leeway';
        this.adminDiscordId = '1111779326707388596';

        this.baseItems = {
            portfolio: [
                {
                    id: 'ghost-shell',
                    title: 'Ghost Shell Toolkit',
                    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80',
                    download: 'https://example.com/download/ghost-shell',
                    installSteps: [
                        '1. Clique sur Download.',
                        '2. Decompresse le package dans un dossier propre.',
                        '3. Lance setup.bat en administrateur.',
                        '4. Redemarre le terminal puis teste la commande gs --help.'
                    ]
                },
                {
                    id: 'delta-ui',
                    title: 'Delta UI Injector',
                    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
                    download: 'https://example.com/download/delta-ui',
                    installSteps: [
                        '1. Download le zip.',
                        '2. Ouvre l executable et autorise les dependances.',
                        '3. Selectionne ton dossier d installation.',
                        '4. Active le profil standard dans le panneau settings.'
                    ]
                },
                {
                    id: 'runtime-lab',
                    title: 'Runtime Lab Pack',
                    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=900&q=80',
                    download: 'https://example.com/download/runtime-lab',
                    installSteps: [
                        '1. Download puis execute l installateur.',
                        '2. Valide le chemin par defaut.',
                        '3. Execute la commande runtime-lab init.',
                        '4. Verifie les logs dans le dossier /logs.'
                    ]
                }
            ],
            ressources: [
                {
                    id: 'guide-opsec',
                    title: 'Guide OPSEC Debutant',
                    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=80',
                    download: 'https://example.com/download/guide-opsec.pdf',
                    installSteps: [
                        '1. Download le PDF.',
                        '2. Ouvre le chapitre 1.',
                        '3. Applique la checklist securite locale.',
                        '4. Continue avec les procedures de hardening.'
                    ]
                },
                {
                    id: 'net-basics',
                    title: 'Network Basics Toolkit',
                    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
                    download: 'https://example.com/download/network-basics.zip',
                    installSteps: [
                        '1. Download le package.',
                        '2. Installe Wireshark si besoin.',
                        '3. Lance le script start-lab.ps1.',
                        '4. Suis le TP sur les captures reseau.'
                    ]
                },
                {
                    id: 'script-recipes',
                    title: 'Script Recipes v3',
                    image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=900&q=80',
                    download: 'https://example.com/download/script-recipes.zip',
                    installSteps: [
                        '1. Download et extrais le dossier.',
                        '2. Lis README-first.',
                        '3. Lance les scripts de ton choix.',
                        '4. Personnalise les variables de configuration.'
                    ]
                }
            ]
        };

        this.items = this.loadItems();
        this.filteredItems = {
            portfolio: [...this.items.portfolio],
            ressources: [...this.items.ressources]
        };

        this.auth = {
            user: null,
            isAdmin: false
        };

        this.gridObservers = new Map();

        this.init();
    }

    init() {
        this.setupMorphLayer();
        this.runPageEnterMorph();
        this.bindPageSwitchMorph();
        this.markActiveMenu();
        this.runInterfaceAnimations();
        this.runTypewriterAnimations();
        this.bindSearch();
        this.bindHomeStats();
        this.bindModal();
        this.bindAdminForm();
        this.bindAuthButtons();
        this.renderStore('portfolio');
        this.renderStore('ressources');
        this.startClock();
        this.restoreAuth();
        this.handleOAuthCallback();
    }

    setupMorphLayer() {
        let overlay = document.querySelector('.page-morph-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'page-morph-overlay';
            document.body.appendChild(overlay);
        }
        this.morphOverlay = overlay;
    }

    runPageEnterMorph() {
        const shell = document.querySelector('.app-shell');
        if (!shell) {
            return;
        }

        shell.classList.add('morph-enter');
        setTimeout(() => {
            shell.classList.remove('morph-enter');
        }, 600);

        const fromSwitch = sessionStorage.getItem('morphPageSwitch') === '1';
        if (fromSwitch && this.morphOverlay) {
            this.morphOverlay.classList.remove('enter');
            this.morphOverlay.classList.add('exit');
            setTimeout(() => {
                this.morphOverlay.classList.remove('exit');
                this.morphOverlay.style.opacity = '0';
            }, 440);
            sessionStorage.removeItem('morphPageSwitch');
        }
    }

    bindPageSwitchMorph() {
        const links = Array.from(document.querySelectorAll('a.menu-link[href]'));
        if (!links.length) {
            return;
        }

        links.forEach((link) => {
            link.addEventListener('click', (event) => {
                if (event.defaultPrevented) {
                    return;
                }

                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                    return;
                }

                const href = link.getAttribute('href');
                if (!href || href.startsWith('#')) {
                    return;
                }

                const destination = new URL(href, window.location.href);
                if (destination.href === window.location.href) {
                    return;
                }

                event.preventDefault();
                document.body.classList.add('is-page-switching');

                if (this.morphOverlay) {
                    this.morphOverlay.classList.remove('exit');
                    this.morphOverlay.classList.add('enter');
                }

                sessionStorage.setItem('morphPageSwitch', '1');

                setTimeout(() => {
                    window.location.href = destination.href;
                }, 360);
            });
        });
    }

    runInterfaceAnimations() {
        const blocks = Array.from(document.querySelectorAll('.header-box, .box, .auth-box, .status-bar'));
        if (!blocks.length) {
            return;
        }

        blocks.forEach((block, index) => {
            block.classList.add('ui-reveal');
            setTimeout(() => {
                block.classList.add('revealed');
            }, 90 * index);
        });
    }

    runTypewriterAnimations(root = document) {
        const candidates = Array.from(
            root.querySelectorAll(
                '.subline, .page-description, .box-title span, .stat-label, .platform-item, .menu-link, .card-title, .admin-help, .btn'
            )
        );

        const textTargets = candidates.filter((element) => {
            if (element.dataset.twDone === '1') {
                return false;
            }

            if (!element || element.childElementCount > 0) {
                return false;
            }

            const key = element.textContent.trim();
            if (!key) {
                return false;
            }

            return true;
        });

        textTargets.forEach((element, index) => {
            const fullText = element.textContent;
            element.textContent = '';
            element.classList.add('typewriter-caret');

            let charIndex = 0;
            const startDelay = 120 + index * 70;
            const speed = 12;

            setTimeout(() => {
                const timer = setInterval(() => {
                    charIndex += 1;
                    element.textContent = fullText.slice(0, charIndex);

                    if (charIndex >= fullText.length) {
                        clearInterval(timer);
                        element.dataset.twDone = '1';
                        setTimeout(() => {
                            element.classList.remove('typewriter-caret');
                        }, 380);
                    }
                }, speed);
            }, startDelay);
        });
    }

    markActiveMenu() {
        document.querySelectorAll('.menu-link').forEach((link) => {
            link.classList.toggle('active', link.dataset.page === this.currentPage);
        });

        const status = document.getElementById('status-page');
        if (status) {
            status.textContent = `[ ${this.currentPage.toUpperCase()} ]`;
        }
    }

    loadItems() {
        let custom = { portfolio: [], ressources: [] };
        try {
            const raw = localStorage.getItem('storeItemsCustom');
            if (raw) {
                const parsed = JSON.parse(raw);
                custom = {
                    portfolio: Array.isArray(parsed.portfolio) ? parsed.portfolio : [],
                    ressources: Array.isArray(parsed.ressources) ? parsed.ressources : []
                };
            }
        } catch (error) {
            console.warn('Impossible de lire storeItemsCustom:', error);
        }

        return {
            portfolio: [...custom.portfolio, ...this.baseItems.portfolio],
            ressources: [...custom.ressources, ...this.baseItems.ressources]
        };
    }

    saveCustomItems(item, target) {
        let custom = { portfolio: [], ressources: [] };
        try {
            const raw = localStorage.getItem('storeItemsCustom');
            if (raw) {
                const parsed = JSON.parse(raw);
                custom.portfolio = Array.isArray(parsed.portfolio) ? parsed.portfolio : [];
                custom.ressources = Array.isArray(parsed.ressources) ? parsed.ressources : [];
            }
        } catch (error) {
            console.warn('Ecriture custom reset:', error);
        }

        custom[target].unshift(item);
        localStorage.setItem('storeItemsCustom', JSON.stringify(custom));
    }

    bindSearch() {
        document.querySelectorAll('.search-input').forEach((input) => {
            input.addEventListener('input', () => {
                const target = input.dataset.target;
                const query = input.value.trim().toLowerCase();

                this.filteredItems[target] = this.items[target].filter((item) => {
                    return item.title.toLowerCase().includes(query);
                });

                this.renderStore(target);
            });
        });
    }

    bindHomeStats() {
        const usernameInput = document.getElementById('github-username');
        const loadButton = document.getElementById('github-load');

        if (!usernameInput || !loadButton) {
            return;
        }

        const runLoad = () => {
            this.loadGithubStats(usernameInput.value.trim());
        };

        loadButton.addEventListener('click', runLoad);
        usernameInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                runLoad();
            }
        });

        runLoad();
    }

    async loadGithubStats(username) {
        const accountEl = document.getElementById('gh-account');
        const followersEl = document.getElementById('gh-followers');
        const followingEl = document.getElementById('gh-following');
        const reposEl = document.getElementById('gh-repos');
        const starsEl = document.getElementById('gh-stars');
        const noteEl = document.getElementById('gh-note');
        const profileLink = document.getElementById('gh-profile-link');

        if (!accountEl || !followersEl || !followingEl || !reposEl || !starsEl || !noteEl || !profileLink) {
            return;
        }

        const cleanUsername = String(username || '').replace(/^@/, '').trim();
        if (!cleanUsername) {
            noteEl.textContent = 'Entre un pseudo GitHub valide.';
            return;
        }

        accountEl.textContent = `@${cleanUsername}`;
        followersEl.textContent = '...';
        followingEl.textContent = '...';
        reposEl.textContent = '...';
        starsEl.textContent = '...';
        noteEl.textContent = 'Chargement des stats GitHub...';

        try {
            const [userResponse, reposResponse] = await Promise.all([
                fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}`),
                fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}/repos?per_page=100`)
            ]);

            if (!userResponse.ok) {
                throw new Error('GitHub user not found');
            }

            const user = await userResponse.json();

            let stars = 0;
            if (reposResponse.ok) {
                const repos = await reposResponse.json();
                if (Array.isArray(repos)) {
                    stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
                }
            }

            accountEl.textContent = `@${user.login}`;
            followersEl.textContent = this.formatNumber(user.followers || 0);
            followingEl.textContent = this.formatNumber(user.following || 0);
            reposEl.textContent = this.formatNumber(user.public_repos || 0);
            starsEl.textContent = this.formatNumber(stars);
            noteEl.textContent = `Derniere mise a jour: ${new Date().toLocaleString('fr-FR')}`;
            profileLink.href = user.html_url;
            profileLink.textContent = user.html_url;
        } catch (error) {
            noteEl.textContent = 'Impossible de charger les stats GitHub pour ce pseudo.';
            profileLink.href = '#';
            profileLink.textContent = 'Profil indisponible';
            console.warn('GitHub stats error:', error);
        }
    }

    formatNumber(value) {
        return new Intl.NumberFormat('fr-FR').format(Number(value) || 0);
    }

    renderStore(target) {
        const grid = document.getElementById(`grid-${target}`);
        const count = document.getElementById(`count-${target}`);
        if (!grid || !count) {
            return;
        }

        const source = this.filteredItems[target];
        grid.innerHTML = '';

        if (!source.length && target !== 'ressources') {
            const empty = document.createElement('div');
            empty.className = 'store-card';
            empty.innerHTML = '<div class="card-image"></div><div class="card-title">Aucun resultat.</div><div class="card-actions"><button class="btn" disabled>Download</button></div>';
            grid.appendChild(empty);
            count.textContent = '0 resultat';
            return;
        }

        const displaySource = [...source];
        if (target === 'ressources' && displaySource.length < 11) {
            for (let i = displaySource.length + 1; i <= 11; i += 1) {
                displaySource.push({
                    id: `placeholder-${i}`,
                    title: `Slot ${i} (vide)`,
                    image: '',
                    download: '',
                    installSteps: [],
                    isPlaceholder: true
                });
            }
        }

        displaySource.forEach((item) => {
            const card = document.createElement('article');
            if (target === 'ressources') {
                if (item.isPlaceholder) {
                    card.className = 'store-card resource-card resource-placeholder';
                    card.innerHTML = `
                        <div class="resource-overlay">
                            <h3 class="resource-title">${this.escapeHtml(item.title)}</h3>
                            <div class="resource-actions">
                                <button class="btn" disabled>Bientot</button>
                            </div>
                        </div>
                    `;
                } else {
                    card.className = 'store-card resource-card';
                    card.style.backgroundImage = `linear-gradient(180deg, rgba(2,3,3,0.15), rgba(2,3,3,0.45)), url('${this.escapeAttr(item.image)}')`;
                    card.innerHTML = `
                        <div class="resource-overlay">
                            <h3 class="resource-title">${this.escapeHtml(item.title)}</h3>
                            <div class="resource-actions">
                                <button class="btn btn-accent" data-action="resource-guide" data-page="${target}" data-id="${item.id}">Download</button>
                            </div>
                        </div>
                    `;
                }
            } else {
                card.className = 'store-card';
                card.innerHTML = `
                    <div class="card-image" style="background-image: linear-gradient(180deg, rgba(2,3,3,0.2), rgba(2,3,3,0.72)), url('${this.escapeAttr(item.image)}');"></div>
                    <h3 class="card-title">${this.escapeHtml(item.title)}</h3>
                    <div class="card-actions">
                        <button class="btn btn-accent" data-action="download" data-page="${target}" data-id="${item.id}">Download</button>
                        <button class="btn" data-action="install" data-page="${target}" data-id="${item.id}">Install</button>
                    </div>
                `;
            }
            grid.appendChild(card);
        });

        this.runTypewriterAnimations(grid);
        this.setupGridScrollAnimations(grid);

        if (target === 'ressources') {
            const realCount = source.length;
            count.textContent = `${realCount}/11 remplis`;
        } else {
            count.textContent = `${source.length} resultat${source.length > 1 ? 's' : ''}`;
        }

        grid.querySelectorAll('button[data-action="download"]').forEach((button) => {
            button.addEventListener('click', () => {
                this.downloadItem(button.dataset.page, button.dataset.id);
            });
        });

        grid.querySelectorAll('button[data-action="install"]').forEach((button) => {
            button.addEventListener('click', () => {
                this.openInstallModal(button.dataset.page, button.dataset.id);
            });
        });

        grid.querySelectorAll('button[data-action="resource-guide"]').forEach((button) => {
            button.addEventListener('click', () => {
                this.openInstallModal(button.dataset.page, button.dataset.id);
            });
        });
    }

    setupGridScrollAnimations(grid) {
        if (!grid) {
            return;
        }

        if (this.gridObservers.has(grid)) {
            this.gridObservers.get(grid).disconnect();
            this.gridObservers.delete(grid);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const card = entry.target;
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.28) {
                        card.classList.add('card-in-view');
                        card.classList.remove('card-out-view');
                    } else {
                        card.classList.remove('card-in-view');
                        card.classList.add('card-out-view');
                    }
                });
            },
            {
                root: grid,
                threshold: [0.1, 0.28, 0.6]
            }
        );

        const cards = grid.querySelectorAll('.store-card');
        cards.forEach((card) => {
            card.classList.add('card-out-view');
            observer.observe(card);
        });

        this.gridObservers.set(grid, observer);
    }

    bindModal() {
        const modal = document.getElementById('install-modal');
        const closeButton = document.getElementById('close-modal');
        if (!modal || !closeButton) {
            return;
        }

        closeButton.addEventListener('click', () => {
            modal.classList.remove('open');
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('open');
            }
        });
    }

    openInstallModal(page, id) {
        const modal = document.getElementById('install-modal');
        const titleEl = document.getElementById('install-title');
        const wrapper = document.getElementById('install-steps');
        if (!modal || !titleEl || !wrapper) {
            return;
        }

        const item = this.items[page].find((entry) => entry.id === id);
        if (!item) {
            return;
        }

        titleEl.textContent = `Installation - ${item.title}`;
        const downloadLine =
            page === 'ressources' && item.download && item.download !== '#'
                ? `<p><a class="btn btn-accent" href="${this.escapeAttr(item.download)}" target="_blank" rel="noopener">Telecharger la ressource</a></p>`
                : '';

        wrapper.innerHTML = `${downloadLine}${item.installSteps.map((step) => `<p>${this.escapeHtml(step)}</p>`).join('')}`;
        modal.classList.add('open');
    }

    downloadItem(page, id) {
        const item = this.items[page].find((entry) => entry.id === id);
        if (!item || !item.download || item.download === '#') {
            return;
        }

        const anchor = document.createElement('a');
        anchor.href = item.download;
        anchor.target = '_blank';
        anchor.rel = 'noopener';
        anchor.click();
    }

    bindAdminForm() {
        const form = document.getElementById('admin-panel');
        const fileInput = document.getElementById('admin-file');
        if (!form || !fileInput) {
            return;
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!this.auth.isAdmin) {
                alert('Acces refuse: admin uniquement.');
                return;
            }

            const target = document.getElementById('admin-target').value;
            const title = document.getElementById('admin-title').value.trim();
            const imageFromInput = document.getElementById('admin-image').value.trim();
            const downloadFromInput = document.getElementById('admin-download').value.trim();
            const stepsRaw = document.getElementById('admin-steps').value.trim();
            const file = fileInput.files[0];

            if (!title || !stepsRaw) {
                return;
            }

            const objectUrl = file ? URL.createObjectURL(file) : '';
            const newItem = {
                id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                title,
                image: imageFromInput || 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80',
                download: downloadFromInput || objectUrl || '#',
                installSteps: stepsRaw
                    .split(/\r?\n/)
                    .map((step, index) => {
                        const cleaned = step.trim();
                        if (!cleaned) {
                            return null;
                        }
                        return `${index + 1}. ${cleaned}`;
                    })
                    .filter(Boolean)
            };

            this.items[target].unshift(newItem);
            this.saveCustomItems(newItem, target);

            const queryInput = document.getElementById(`search-${target}`);
            const query = queryInput ? queryInput.value.trim().toLowerCase() : '';
            this.filteredItems[target] = this.items[target].filter((entry) => entry.title.toLowerCase().includes(query));
            this.renderStore(target);

            form.reset();
            alert(`Carte ajoutee dans ${target}.`);
        });
    }

    bindAuthButtons() {
        const loginButton = document.getElementById('discord-login');
        const logoutButton = document.getElementById('discord-logout');

        if (loginButton) {
            loginButton.addEventListener('click', () => {
                this.startDiscordLogin();
            });
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                this.logoutDiscord();
            });
        }
    }

    startDiscordLogin() {
        if (!this.backendBaseUrl) {
            alert('Configure backendBaseUrl dans Sources/scripts.js.');
            return;
        }

        const authUrl = `${this.backendBaseUrl.replace(/\/$/, '')}/api/auth/discord/login`;
        window.location.href = authUrl;
    }

    async handleOAuthCallback() {
        const params = new URLSearchParams(window.location.search);
        const authError = params.get('auth_error');
        const authOk = params.get('auth');

        if (!authError && !authOk) {
            return;
        }

        if (authError) {
            alert('Connexion Discord indisponible. Verifie ton backend /api/auth/discord.');
        }

        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
        this.restoreAuth();
    }

    async restoreAuth() {
        try {
            const response = await fetch(`${this.backendBaseUrl.replace(/\/$/, '')}/api/auth/discord/me`, {
                credentials: 'include'
            });

            if (!response.ok) {
                this.updateAuthUI();
                return;
            }

            const user = await response.json();
            this.setAuthUser(user);
        } catch (error) {
            this.updateAuthUI();
        }
    }

    async logoutDiscord() {
        try {
            await fetch(`${this.backendBaseUrl.replace(/\/$/, '')}/api/auth/discord/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.warn('Logout Discord non confirme par le backend.');
        }

        this.auth.user = null;
        this.auth.isAdmin = false;
        this.updateAuthUI();
    }

    setAuthUser(user) {
        this.auth.user = user;

        const username = (user.username || '').toLowerCase();
        const isAdminByName = username === this.adminDiscordUsername.toLowerCase();
        const isAdminById = this.adminDiscordId !== 'CHANGE_ME_ADMIN_DISCORD_ID' && user.id === this.adminDiscordId;

        // Le backend doit aussi verifier ce role pour securiser les uploads.
        this.auth.isAdmin = isAdminByName || isAdminById;
        this.updateAuthUI();
    }

    updateAuthUI() {
        const badge = document.getElementById('auth-badge');
        const userBox = document.getElementById('auth-user');
        const loginButton = document.getElementById('discord-login');
        const logoutButton = document.getElementById('discord-logout');
        const adminPanel = document.getElementById('admin-panel');

        if (!badge || !userBox || !loginButton || !logoutButton || !adminPanel) {
            return;
        }

        if (this.auth.user) {
            const user = this.auth.user;
            badge.textContent = this.auth.isAdmin ? 'Admin' : 'Membre';
            userBox.innerHTML = `
                <span>Connecte: ${this.escapeHtml(user.username || 'unknown')}#${this.escapeHtml(user.discriminator || '0000')}</span>
                <span>${this.auth.isAdmin ? 'Permissions admin actives.' : 'Compte standard: lecture uniquement.'}</span>
            `;

            loginButton.classList.add('hidden');
            logoutButton.classList.remove('hidden');
        } else {
            badge.textContent = 'Invite';
            userBox.innerHTML = '<span>Non connecte</span><span>Connecte-toi pour debloquer le mode admin.</span>';
            loginButton.classList.remove('hidden');
            logoutButton.classList.add('hidden');
        }

        adminPanel.classList.toggle('visible', this.auth.isAdmin);
    }

    startClock() {
        const clock = document.getElementById('clock');
        if (!clock) {
            return;
        }

        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clock.textContent = `${hours}:${minutes}:${seconds}`;
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    escapeAttr(value) {
        return this.escapeHtml(value).replace(/`/g, '&#96;');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.storeSiteApp = new StoreSiteApp();
});
