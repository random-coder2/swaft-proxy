/**
 * Swaft Browser - Chrome-Style Proxy Browser
 * A Chrome-inspired web proxy with tab cloaking and Chrome clone window support
 */

// App State
const BrowserState = {
    tabs: [{ id: 'main', title: 'Swaft Browser', active: true }],
    currentTab: 'main',
    isProxyActive: false,
    currentUrl: '',
    theme: localStorage.getItem('theme') || 'chrome',
    searchEngine: localStorage.getItem('searchEngine') || 'https://www.google.com/search?q=',
    backendServer: localStorage.getItem('backendServer') || '',
    chromeCloneMode: localStorage.getItem('chromeCloneMode') === 'true',
    cloakMode: localStorage.getItem('cloakMode') || 'none',
    showBookmarks: localStorage.getItem('showBookmarks') !== 'false',
    history: JSON.parse(localStorage.getItem('history') || '[]'),
    bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]')
};

// Apps Database
const appsDatabase = [
    { id: 1, name: 'GeForce NOW', category: 'popular', icon: '🎮', desc: 'Cloud gaming', url: 'https://play.geforcenow.com' },
    { id: 2, name: 'Roblox', category: 'popular', icon: '🧊', desc: 'Game platform', url: 'https://www.roblox.com' },
    { id: 3, name: 'Cool Math', category: 'popular', icon: '🔢', desc: 'Math games', url: 'https://www.coolmathgames.com' },
    { id: 4, name: 'Discord', category: 'popular', icon: '💬', desc: 'Chat app', url: 'https://discord.com' },
    { id: 5, name: 'YouTube', category: 'popular', icon: '📺', desc: 'Video platform', url: 'https://youtube.com' },
    { id: 6, name: 'Twitch', category: 'popular', icon: '📡', desc: 'Live streaming', url: 'https://twitch.tv' },
    { id: 7, name: 'Reddit', category: 'popular', icon: '🤖', desc: 'Forum', url: 'https://reddit.com' },
    { id: 8, name: 'Netflix', category: 'popular', icon: '🎬', desc: 'Movies & TV', url: 'https://netflix.com' },
    { id: 9, name: 'Geometry Dash', category: 'games', icon: '📐', desc: 'Rhythm game', url: 'https://geometrydash.io' },
    { id: 10, name: '1v1.LOL', category: 'games', icon: '🔫', desc: 'Shooter', url: 'https://1v1.lol' },
    { id: 11, name: 'Krunker', category: 'games', icon: '💀', desc: 'FPS game', url: 'https://krunker.io' },
    { id: 12, name: 'Shell Shockers', category: 'games', icon: '🥚', desc: 'Egg shooter', url: 'https://shellshock.io' },
    { id: 13, name: 'Slither.io', category: 'games', icon: '🐍', desc: 'Snake game', url: 'https://slither.io' },
    { id: 14, name: 'Agar.io', category: 'games', icon: '🦠', desc: 'Cell game', url: 'https://agar.io' },
    { id: 15, name: 'Zombs Royale', category: 'games', icon: '👑', desc: 'Battle royale', url: 'https://zombsroyale.io' },
    { id: 16, name: 'Minecraft', category: 'games', icon: '⛏️', desc: 'Classic MC', url: 'https://classic.minecraft.net' },
    { id: 17, name: '2048', category: 'games', icon: '🔲', desc: 'Puzzle', url: 'https://2048game.com' },
    { id: 18, name: 'Tetris', category: 'games', icon: '🧱', desc: 'Classic', url: 'https://tetris.com' },
    { id: 19, name: 'Pac-Man', category: 'games', icon: '👻', desc: 'Classic', url: 'https://pacman.com' },
    { id: 20, name: 'Retro Bowl', category: 'games', icon: '🏈', desc: 'Football', url: 'https://retrobowl.me' },
    { id: 21, name: 'Wordle', category: 'games', icon: '📝', desc: 'Word puzzle', url: 'https://www.nytimes.com/games/wordle' },
    { id: 22, name: 'Chess.com', category: 'games', icon: '♟️', desc: 'Chess', url: 'https://chess.com' },
    { id: 23, name: 'CodePen', category: 'tools', icon: '💻', desc: 'Code editor', url: 'https://codepen.io' },
    { id: 24, name: 'Replit', category: 'tools', icon: '🔄', desc: 'Online IDE', url: 'https://replit.com' },
    { id: 25, name: 'StackBlitz', category: 'tools', icon: '⚡', desc: 'Web IDE', url: 'https://stackblitz.com' },
    { id: 26, name: 'GitHub', category: 'tools', icon: '🐙', desc: 'Code hosting', url: 'https://github.com' },
    { id: 27, name: 'Canva', category: 'tools', icon: '🎨', desc: 'Design tool', url: 'https://canva.com' },
    { id: 28, name: 'Figma', category: 'tools', icon: '🖼️', desc: 'Design tool', url: 'https://figma.com' },
    { id: 29, name: 'Photopea', category: 'tools', icon: '📷', desc: 'Photo editor', url: 'https://photopea.com' },
    { id: 30, name: 'Spotify', category: 'tools', icon: '🎵', desc: 'Music streaming', url: 'https://spotify.com' },
    { id: 31, name: 'SoundCloud', category: 'tools', icon: '☁️', desc: 'Music platform', url: 'https://soundcloud.com' },
    { id: 32, name: 'Wikipedia', category: 'tools', icon: '📚', desc: 'Encyclopedia', url: 'https://wikipedia.org' }
];

// Cloak Configurations
const cloakConfigs = {
    none: { title: 'Swaft Browser', icon: '' },
    classroom: { title: 'Google Classroom', icon: 'https://ssl.gstatic.com/classroom/favicon.png' },
    docs: { title: 'Google Docs', icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' },
    drive: { title: 'Google Drive', icon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png' }
};

// DOM Elements
const elements = {
    omniboxInput: document.getElementById('omnibox-input'),
    googleSearch: document.getElementById('google-search'),
    proxyFrame: document.getElementById('proxy-frame'),
    newtabPage: document.getElementById('newtab-page'),
    proxyPage: document.getElementById('proxy-page'),
    appsPage: document.getElementById('apps-page'),
    settingsPage: document.getElementById('settings-page'),
    appsGrid: document.getElementById('apps-grid'),
    chromeMenu: document.getElementById('chrome-menu'),
    chromeCloneWindow: document.getElementById('chrome-clone-window'),
    cloneFrame: document.querySelector('.clone-frame'),
    cloneUrl: document.querySelector('.clone-url'),
    toastContainer: document.getElementById('toast-container'),
    siteIcon: document.getElementById('site-icon')
};

// Utility Functions
const utils = {
    showToast: (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ️'}</span><span>${message}</span>`;
        elements.toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    setLoading: (isLoading) => {
        const loading = document.getElementById('proxy-loading');
        if (loading) {
            loading.style.display = isLoading ? 'flex' : 'none';
        }
    },

    encodeUrl: (url) => btoa(url),

    sanitizeUrl: (input) => {
        if (!input) return null;
        let url = input.trim();
        if (!url.match(/^https?:\/\//i)) {
            if (url.includes('.') && !url.includes(' ')) {
                url = 'https://' + url;
            } else {
                return { type: 'search', query: url };
            }
        }
        return { type: 'url', url: url };
    },

    updateTabTitle: (title) => {
        document.title = title;
        const cloak = cloakConfigs[BrowserState.cloakMode];
        if (cloak && BrowserState.cloakMode !== 'none') {
            document.title = cloak.title;
            let favicon = document.querySelector('link[rel="icon"]');
            if (!favicon) {
                favicon = document.createElement('link');
                favicon.rel = 'icon';
                document.head.appendChild(favicon);
            }
            if (cloak.icon) favicon.href = cloak.icon;
        }
    },

    saveHistory: (url, title = '') => {
        BrowserState.history.unshift({ url, title, timestamp: Date.now() });
        if (BrowserState.history.length > 50) BrowserState.history.pop();
        localStorage.setItem('history', JSON.stringify(BrowserState.history));
    }
};

// Chrome Clone Window Functions
const chromeClone = {
    open: (url) => {
        elements.chromeCloneWindow.style.display = 'flex';
        
        // Encode and load URL
        let proxyUrl;
        if (BrowserState.backendServer) {
            proxyUrl = `${BrowserState.backendServer}/~/${utils.encodeUrl(url)}`;
        } else {
            proxyUrl = url;
        }
        
        elements.cloneFrame.src = proxyUrl;
        elements.cloneUrl.value = url;
        
        // Update clone tab
        const cloneTitle = document.querySelector('.clone-title');
        const cloneFavicon = document.querySelector('.clone-favicon');
        
        try {
            const urlObj = new URL(url);
            cloneTitle.textContent = urlObj.hostname;
            cloneFavicon.src = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
        } catch {
            cloneTitle.textContent = 'New Tab';
        }
        
        utils.showToast('Opened in Chrome clone window', 'success');
    },

    close: () => {
        elements.chromeCloneWindow.style.display = 'none';
        elements.cloneFrame.src = '';
    },

    navigate: (url) => {
        let proxyUrl;
        if (BrowserState.backendServer) {
            proxyUrl = `${BrowserState.backendServer}/~/${utils.encodeUrl(url)}`;
        } else {
            proxyUrl = url;
        }
        elements.cloneFrame.src = proxyUrl;
        elements.cloneUrl.value = url;
    }
};

// Navigation Functions
const navigation = {
    navigate: (input) => {
        const result = utils.sanitizeUrl(input);
        if (!result) {
            utils.showToast('Please enter a valid URL or search query', 'error');
            return;
        }

        let targetUrl;
        if (result.type === 'search') {
            targetUrl = BrowserState.searchEngine + encodeURIComponent(result.query);
        } else {
            targetUrl = result.url;
        }

        // Chrome Clone Mode
        if (BrowserState.chromeCloneMode) {
            chromeClone.open(targetUrl);
            return;
        }

        // Regular navigation
        utils.setLoading(true);
        utils.saveHistory(targetUrl);
        BrowserState.currentUrl = targetUrl;

        let proxyUrl;
        if (BrowserState.backendServer) {
            proxyUrl = `${BrowserState.backendServer}/~/${utils.encodeUrl(targetUrl)}`;
            elements.siteIcon.textContent = '🔒';
        } else {
            proxyUrl = targetUrl;
            elements.siteIcon.textContent = '⚠️';
        }

        elements.omniboxInput.value = targetUrl;
        elements.proxyFrame.src = proxyUrl;
        
        // Show proxy page
        elements.newtabPage.classList.remove('active');
        elements.proxyPage.classList.add('active');
        elements.appsPage.classList.remove('active');
        elements.settingsPage.classList.remove('active');
        
        // Update tab
        const proxyTab = document.querySelector('.chrome-tab[data-tab="proxy"]');
        if (proxyTab) {
            proxyTab.style.display = 'flex';
            proxyTab.querySelector('.tab-title').textContent = new URL(targetUrl).hostname;
        }
        
        // Update active tab
        document.querySelectorAll('.chrome-tab').forEach(t => t.classList.remove('active'));
        if (proxyTab) proxyTab.classList.add('active');

        elements.proxyFrame.onload = () => {
            utils.setLoading(false);
            utils.updateTabTitle(targetUrl);
        };

        elements.proxyFrame.onerror = () => {
            utils.setLoading(false);
            utils.showToast('Failed to load page', 'error');
        };
    },

    back: () => {
        if (elements.proxyFrame.contentWindow && elements.proxyFrame.contentWindow.history) {
            elements.proxyFrame.contentWindow.history.back();
        }
    },

    forward: () => {
        if (elements.proxyFrame.contentWindow && elements.proxyFrame.contentWindow.history) {
            elements.proxyFrame.contentWindow.history.forward();
        }
    },

    refresh: () => {
        elements.proxyFrame.src = elements.proxyFrame.src;
        utils.setLoading(true);
    },

    goHome: () => {
        elements.newtabPage.classList.add('active');
        elements.proxyPage.classList.remove('active');
        elements.appsPage.classList.remove('active');
        elements.settingsPage.classList.remove('active');
        elements.omniboxInput.value = '';
        document.querySelectorAll('.chrome-tab').forEach(t => t.classList.remove('active'));
        document.querySelector('.chrome-tab[data-tab="main"]').classList.add('active');
        utils.updateTabTitle('Swaft Browser');
    }
};

// Apps Functions
function renderApps(filter = 'all') {
    const filtered = filter === 'all' ? appsDatabase : appsDatabase.filter(app => app.category === filter);
    
    elements.appsGrid.innerHTML = filtered.map(app => `
        <div class="app-card-chrome" data-url="${app.url}">
            <div class="app-icon-chrome">${app.icon}</div>
            <div class="app-name-chrome">${app.name}</div>
        </div>
    `).join('');

    document.querySelectorAll('.app-card-chrome').forEach(card => {
        card.addEventListener('click', () => {
            navigation.navigate(card.dataset.url);
        });
    });
}

// Settings Functions
function loadSettings() {
    // Apply theme
    document.body.setAttribute('data-theme', BrowserState.theme);
    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === BrowserState.theme);
    });

    // Show bookmarks
    const bookmarksBar = document.querySelector('.bookmarks-bar');
    if (bookmarksBar) {
        bookmarksBar.style.display = BrowserState.showBookmarks ? 'flex' : 'none';
    }
    const showBookmarksToggle = document.getElementById('show-bookmarks');
    if (showBookmarksToggle) showBookmarksToggle.checked = BrowserState.showBookmarks;

    // Cloak mode
    document.querySelectorAll('input[name="cloak"]').forEach(radio => {
        radio.checked = radio.value === BrowserState.cloakMode;
    });

    // Backend server
    const backendInput = document.getElementById('backend-url');
    if (backendInput) backendInput.value = BrowserState.backendServer;

    // Search engine
    const searchSelect = document.getElementById('default-search');
    if (searchSelect) searchSelect.value = BrowserState.searchEngine;

    // Chrome clone mode
    const cloneToggle = document.getElementById('chrome-clone-mode');
    if (cloneToggle) cloneToggle.checked = BrowserState.chromeCloneMode;

    utils.updateTabTitle('Swaft Browser');
}

function saveSettings() {
    localStorage.setItem('theme', BrowserState.theme);
    localStorage.setItem('searchEngine', BrowserState.searchEngine);
    localStorage.setItem('backendServer', BrowserState.backendServer);
    localStorage.setItem('chromeCloneMode', BrowserState.chromeCloneMode);
    localStorage.setItem('cloakMode', BrowserState.cloakMode);
    localStorage.setItem('showBookmarks', BrowserState.showBookmarks);
}

// Initialize Event Listeners
function initEventListeners() {
    // Omnibox navigation
    elements.omniboxInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') navigation.navigate(elements.omniboxInput.value);
    });

    // Google search box
    elements.googleSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            navigation.navigate(elements.googleSearch.value);
        }
    });

    // Search buttons
    document.getElementById('google-search-btn')?.addEventListener('click', () => {
        navigation.navigate(elements.googleSearch.value);
    });

    document.getElementById('lucky-btn')?.addEventListener('click', () => {
        const randomSites = ['https://www.google.com/doodles', 'https://en.wikipedia.org/wiki/Special:Random'];
        navigation.navigate(randomSites[Math.floor(Math.random() * randomSites.length)]);
    });

    // Navigation buttons
    document.getElementById('back-btn')?.addEventListener('click', navigation.back);
    document.getElementById('forward-btn')?.addEventListener('click', navigation.forward);
    document.getElementById('refresh-btn')?.addEventListener('click', navigation.refresh);
    document.getElementById('home-btn')?.addEventListener('click', navigation.goHome);

    // Tabs
    document.querySelectorAll('.chrome-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            if (tabId === 'main') {
                navigation.goHome();
            } else if (tabId === 'proxy') {
                elements.proxyPage.classList.add('active');
                elements.newtabPage.classList.remove('active');
                elements.appsPage.classList.remove('active');
                elements.settingsPage.classList.remove('active');
            }
            document.querySelectorAll('.chrome-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // New tab button
    document.getElementById('new-tab-btn')?.addEventListener('click', navigation.goHome);

    // Tab close
    document.querySelectorAll('.tab-close').forEach(close => {
        close.addEventListener('click', (e) => {
            e.stopPropagation();
            const tab = close.closest('.chrome-tab');
            if (tab.dataset.tab === 'proxy') {
                tab.style.display = 'none';
                navigation.goHome();
            }
        });
    });

    // Shortcuts
    document.querySelectorAll('.shortcut-tile:not(.add-shortcut)').forEach(tile => {
        tile.addEventListener('click', () => navigation.navigate(tile.dataset.url));
    });

    // Bookmarks
    document.querySelectorAll('.bookmark-item').forEach(bookmark => {
        bookmark.addEventListener('click', () => navigation.navigate(bookmark.dataset.url));
    });

    // Apps filter
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            renderApps(chip.dataset.filter);
        });
    });

    // Menu button
    document.getElementById('menu-btn')?.addEventListener('click', () => {
        const menu = elements.chromeMenu;
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    });

    // Menu items
    document.getElementById('menu-newtab')?.addEventListener('click', () => {
        navigation.goHome();
        elements.chromeMenu.style.display = 'none';
    });

    document.getElementById('menu-apps')?.addEventListener('click', () => {
        elements.newtabPage.classList.remove('active');
        elements.proxyPage.classList.remove('active');
        elements.appsPage.classList.add('active');
        elements.settingsPage.classList.remove('active');
        elements.chromeMenu.style.display = 'none';
    });

    document.getElementById('menu-settings')?.addEventListener('click', () => {
        elements.newtabPage.classList.remove('active');
        elements.proxyPage.classList.remove('active');
        elements.appsPage.classList.remove('active');
        elements.settingsPage.classList.add('active');
        elements.chromeMenu.style.display = 'none';
    });

    // Settings navigation
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.settings-nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
            const section = document.getElementById(`${item.dataset.section}-section`);
            if (section) section.classList.add('active');
        });
    });

    // Theme options
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            BrowserState.theme = option.dataset.theme;
            document.body.setAttribute('data-theme', BrowserState.theme);
            saveSettings();
        });
    });

    // Cloak options
    document.querySelectorAll('input[name="cloak"]').forEach(radio => {
        radio.addEventListener('change', () => {
            BrowserState.cloakMode = radio.value;
            utils.updateTabTitle(BrowserState.currentUrl || 'Swaft Browser');
            saveSettings();
            utils.showToast('Tab cloak updated', 'success');
        });
    });

    // Show bookmarks toggle
    document.getElementById('show-bookmarks')?.addEventListener('change', (e) => {
        BrowserState.showBookmarks = e.target.checked;
        const bookmarksBar = document.querySelector('.bookmarks-bar');
        if (bookmarksBar) {
            bookmarksBar.style.display = BrowserState.showBookmarks ? 'flex' : 'none';
        }
        saveSettings();
    });

    // Backend URL
    document.getElementById('backend-url')?.addEventListener('change', (e) => {
        BrowserState.backendServer = e.target.value.replace(/\/$/, '');
        saveSettings();
        utils.showToast('Proxy server updated', 'success');
    });

    // Search engine
    document.getElementById('default-search')?.addEventListener('change', (e) => {
        BrowserState.searchEngine = e.target.value;
        saveSettings();
    });

    // Chrome clone mode
    document.getElementById('chrome-clone-mode')?.addEventListener('change', (e) => {
        BrowserState.chromeCloneMode = e.target.checked;
        saveSettings();
        utils.showToast(BrowserState.chromeCloneMode ? 'Chrome clone mode enabled' : 'Chrome clone mode disabled', 'success');
    });

    // Chrome clone window controls
    document.querySelector('.clone-close-win')?.addEventListener('click', chromeClone.close);
    document.querySelector('.clone-minimize')?.addEventListener('click', () => {
        elements.chromeCloneWindow.style.transform = 'translate(-50%, -50%) scale(0.8)';
        elements.chromeCloneWindow.style.opacity = '0.5';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#menu-btn') && !e.target.closest('#chrome-menu')) {
            elements.chromeMenu.style.display = 'none';
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+L - Focus omnibox
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            elements.omniboxInput.focus();
            elements.omniboxInput.select();
        }
        // Ctrl+T - New tab
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            navigation.goHome();
        }
        // Escape - Stop loading
        if (e.key === 'Escape') {
            utils.setLoading(false);
        }
    });
}

// Initialize App
function init() {
    console.log('🚀 Swaft Browser initializing...');
    
    loadSettings();
    renderApps();
    initEventListeners();
    
    console.log('✅ Swaft Browser ready!');
    utils.showToast('Welcome to Swaft Browser!', 'success');
}

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
