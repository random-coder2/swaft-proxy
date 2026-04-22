/**
 * Swaft Proxy - Main Application
 * A web proxy solution forked from DogeUB
 */

// App State
const AppState = {
    currentPage: 'home',
    isProxyActive: false,
    theme: localStorage.getItem('theme') || 'dark',
    bgEffect: localStorage.getItem('bgEffect') || 'none',
    searchEngine: localStorage.getItem('searchEngine') || 'https://www.google.com/search?q=',
    proxyEngine: localStorage.getItem('proxyEngine') || 'auto',
    backendServer: localStorage.getItem('backendServer') || '',
    cloakEnabled: localStorage.getItem('cloakEnabled') === 'true',
    cloakTitle: localStorage.getItem('cloakTitle') || 'Google Classroom',
    cloakIcon: localStorage.getItem('cloakIcon') || 'https://ssl.gstatic.com/classroom/favicon.png',
    history: JSON.parse(localStorage.getItem('history') || '[]'),
    bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]')
};

// Apps & Games Database
const appsDatabase = [
    { id: 1, name: 'GeForce NOW', category: 'popular', icon: '🎮', desc: 'Cloud gaming', url: 'https://play.geforcenow.com' },
    { id: 2, name: 'Roblox', category: 'popular', icon: '🧊', desc: 'Game platform', url: 'https://www.roblox.com' },
    { id: 3, name: 'Cool Math Games', category: 'popular', icon: '🔢', desc: 'Math games', url: 'https://www.coolmathgames.com' },
    { id: 4, name: 'Discord', category: 'popular', icon: '💬', desc: 'Chat app', url: 'https://discord.com' },
    { id: 5, name: 'YouTube', category: 'popular', icon: '📺', desc: 'Video platform', url: 'https://youtube.com' },
    { id: 6, name: 'Twitch', category: 'popular', icon: '📡', desc: 'Live streaming', url: 'https://twitch.tv' },
    { id: 7, name: 'Reddit', category: 'popular', icon: '🤖', desc: 'Forum', url: 'https://reddit.com' },
    { id: 8, name: 'Netflix', category: 'popular', icon: '🎬', desc: 'Movies & TV', url: 'https://netflix.com' },
    { id: 9, name: 'Geometry Dash', category: 'games', icon: '📐', desc: 'Rhythm game', url: 'https://geometrydash.io' },
    { id: 10, name: '1v1.LOL', category: 'games', icon: '🔫', desc: 'Shooter', url: 'https://1v1.lol' },
    { id: 11, name: 'Krunker.io', category: 'games', icon: '💀', desc: 'FPS game', url: 'https://krunker.io' },
    { id: 12, name: 'Shell Shockers', category: 'games', icon: '🥚', desc: 'Egg shooter', url: 'https://shellshock.io' },
    { id: 13, name: 'Slither.io', category: 'games', icon: '🐍', desc: 'Snake game', url: 'https://slither.io' },
    { id: 14, name: 'Agar.io', category: 'games', icon: '🦠', desc: 'Cell game', url: 'https://agar.io' },
    { id: 15, name: 'Zombs Royale', category: 'games', icon: '👑', desc: 'Battle royale', url: 'https://zombsroyale.io' },
    { id: 16, name: 'Minecraft Classic', category: 'games', icon: '⛏️', desc: 'Classic MC', url: 'https://classic.minecraft.net' },
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

// DOM Elements
const elements = {
    pages: document.querySelectorAll('.page'),
    navBtns: document.querySelectorAll('.nav-btn'),
    proxyUrl: document.getElementById('proxy-url'),
    goBtn: document.getElementById('go-btn'),
    clearUrlBtn: document.getElementById('clear-url'),
    proxyFrame: document.getElementById('proxy-frame'),
    statusBar: document.getElementById('status-bar'),
    statusText: document.getElementById('status-text'),
    frameOverlay: document.getElementById('frame-overlay'),
    quickBtns: document.querySelectorAll('.quick-btn'),
    themeToggle: document.getElementById('theme-toggle'),
    fullscreenBtn: document.getElementById('fullscreen-btn'),
    appsGrid: document.getElementById('apps-grid'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    searchQuery: document.getElementById('search-query'),
    searchBtn: document.getElementById('search-btn'),
    searchEngine: document.getElementById('search-engine'),
    themeSelect: document.getElementById('theme-select'),
    bgEffect: document.getElementById('bg-effect'),
    proxyEngine: document.getElementById('proxy-engine'),
    backendServer: document.getElementById('backend-server'),
    cloakEnabled: document.getElementById('cloak-enabled'),
    cloakOptions: document.getElementById('cloak-options'),
    cloakTitle: document.getElementById('cloak-title'),
    cloakIcon: document.getElementById('cloak-icon'),
    resetSettings: document.getElementById('reset-settings'),
    toastContainer: document.getElementById('toast-container')
};

// Utility Functions
const utils = {
    showToast: (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span>${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ️'}</span>
            <span>${message}</span>
        `;
        elements.toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    setLoading: (isLoading, text = 'Loading...') => {
        if (isLoading) {
            elements.statusBar.classList.remove('hidden');
            elements.statusText.textContent = text;
            elements.frameOverlay.classList.remove('hidden');
        } else {
            elements.statusBar.classList.add('hidden');
            elements.frameOverlay.classList.add('hidden');
        }
    },

    encodeUrl: (url) => {
        // Base64 encoding for proxy
        return btoa(url);
    },

    sanitizeUrl: (input) => {
        if (!input) return null;
        
        // Check if it's a search query or URL
        let url = input.trim();
        
        // Add protocol if missing
        if (!url.match(/^https?:\/\//i)) {
            // Check if it looks like a URL or search query
            if (url.includes('.') && !url.includes(' ')) {
                url = 'https://' + url;
            } else {
                // It's a search query
                return { type: 'search', query: url };
            }
        }
        
        return { type: 'url', url: url };
    },

    saveToHistory: (url, title = '') => {
        const item = { url, title, timestamp: Date.now() };
        AppState.history.unshift(item);
        if (AppState.history.length > 50) AppState.history.pop();
        localStorage.setItem('history', JSON.stringify(AppState.history));
    },

    updateTabCloak: () => {
        if (AppState.cloakEnabled) {
            document.title = AppState.cloakTitle;
            // Update favicon
            let favicon = document.querySelector('link[rel="icon"]');
            if (!favicon) {
                favicon = document.createElement('link');
                favicon.rel = 'icon';
                document.head.appendChild(favicon);
            }
            favicon.href = AppState.cloakIcon;
        } else {
            document.title = 'Swaft Proxy';
        }
    }
};

// Proxy Functions
const proxy = {
    navigate: async (input) => {
        const result = utils.sanitizeUrl(input);
        
        if (!result) {
            utils.showToast('Please enter a valid URL or search query', 'error');
            return;
        }
        
        let targetUrl;
        
        if (result.type === 'search') {
            targetUrl = AppState.searchEngine + encodeURIComponent(result.query);
        } else {
            targetUrl = result.url;
        }
        
        utils.setLoading(true, `Loading ${targetUrl}...`);
        utils.saveToHistory(targetUrl);
        
        try {
            // Check for backend server
            let proxyUrl;
            if (AppState.backendServer) {
                const encoded = utils.encodeUrl(targetUrl);
                proxyUrl = `${AppState.backendServer}/~/${encoded}`;
            } else {
                // Direct navigation (will be blocked by CORS for most sites)
                // In production, use a proper proxy backend
                proxyUrl = targetUrl;
            }
            
            elements.proxyFrame.src = proxyUrl;
            AppState.isProxyActive = true;
            
            elements.proxyFrame.onload = () => {
                utils.setLoading(false);
                utils.showToast('Page loaded successfully', 'success');
            };
            
            elements.proxyFrame.onerror = () => {
                utils.setLoading(false);
                utils.showToast('Failed to load page', 'error');
            };
            
        } catch (error) {
            utils.setLoading(false);
            utils.showToast(`Error: ${error.message}`, 'error');
            console.error('Navigation error:', error);
        }
    },

    search: () => {
        const query = elements.searchQuery.value.trim();
        if (!query) {
            utils.showToast('Please enter a search query', 'error');
            return;
        }
        
        const searchUrl = AppState.searchEngine + encodeURIComponent(query);
        proxy.navigate(searchUrl);
        switchPage('home');
        elements.proxyUrl.value = searchUrl;
    }
};

// Navigation Functions
function switchPage(pageName) {
    // Update page visibility
    elements.pages.forEach(page => page.classList.remove('active'));
    document.getElementById(`${pageName}-page`).classList.add('active');
    
    // Update nav buttons
    elements.navBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageName);
    });
    
    AppState.currentPage = pageName;
    
    // Update URL hash
    window.location.hash = pageName === 'home' ? '' : pageName;
}

// Apps Functions
function renderApps(category = 'all') {
    const filtered = category === 'all' 
        ? appsDatabase 
        : appsDatabase.filter(app => app.category === category);
    
    elements.appsGrid.innerHTML = filtered.map(app => `
        <div class="app-card" data-url="${app.url}">
            <div class="app-icon">${app.icon}</div>
            <div class="app-name">${app.name}</div>
            <div class="app-desc">${app.desc}</div>
        </div>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('click', () => {
            const url = card.dataset.url;
            elements.proxyUrl.value = url;
            proxy.navigate(url);
            switchPage('home');
        });
    });
}

// Settings Functions
function loadSettings() {
    // Theme
    document.body.setAttribute('data-theme', AppState.theme);
    elements.themeSelect.value = AppState.theme;
    elements.themeToggle.textContent = AppState.theme === 'light' ? '☀️' : '🌙';
    
    // Background
    document.body.setAttribute('data-bg', AppState.bgEffect);
    elements.bgEffect.value = AppState.bgEffect;
    
    // Search engine
    elements.searchEngine.value = AppState.searchEngine;
    
    // Proxy settings
    elements.proxyEngine.value = AppState.proxyEngine;
    elements.backendServer.value = AppState.backendServer;
    
    // Cloak
    elements.cloakEnabled.checked = AppState.cloakEnabled;
    elements.cloakOptions.style.display = AppState.cloakEnabled ? 'flex' : 'none';
    elements.cloakTitle.value = AppState.cloakTitle;
    elements.cloakIcon.value = AppState.cloakIcon;
    
    // Apply tab cloak
    utils.updateTabCloak();
}

function saveSettings() {
    localStorage.setItem('theme', AppState.theme);
    localStorage.setItem('bgEffect', AppState.bgEffect);
    localStorage.setItem('searchEngine', AppState.searchEngine);
    localStorage.setItem('proxyEngine', AppState.proxyEngine);
    localStorage.setItem('backendServer', AppState.backendServer);
    localStorage.setItem('cloakEnabled', AppState.cloakEnabled);
    localStorage.setItem('cloakTitle', AppState.cloakTitle);
    localStorage.setItem('cloakIcon', AppState.cloakIcon);
}

// Event Listeners
function initEventListeners() {
    // Navigation
    elements.navBtns.forEach(btn => {
        btn.addEventListener('click', () => switchPage(btn.dataset.page));
    });
    
    // Proxy
    elements.goBtn.addEventListener('click', () => proxy.navigate(elements.proxyUrl.value));
    elements.proxyUrl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') proxy.navigate(elements.proxyUrl.value);
    });
    
    elements.clearUrlBtn.addEventListener('click', () => {
        elements.proxyUrl.value = '';
        elements.clearUrlBtn.classList.add('hidden');
    });
    
    elements.proxyUrl.addEventListener('input', () => {
        elements.clearUrlBtn.classList.toggle('hidden', !elements.proxyUrl.value);
    });
    
    // Quick links
    elements.quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.dataset.url;
            elements.proxyUrl.value = url;
            proxy.navigate(url);
        });
    });
    
    // Search page
    elements.searchBtn.addEventListener('click', proxy.search);
    elements.searchQuery.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') proxy.search();
    });
    elements.searchEngine.addEventListener('change', (e) => {
        AppState.searchEngine = e.target.value;
        saveSettings();
    });
    
    // Apps filter
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderApps(btn.dataset.category);
        });
    });
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', () => {
        AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', AppState.theme);
        elements.themeSelect.value = AppState.theme;
        elements.themeToggle.textContent = AppState.theme === 'light' ? '☀️' : '🌙';
        saveSettings();
        utils.showToast(`Theme changed to ${AppState.theme}`, 'success');
    });
    
    // Fullscreen
    elements.fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
    
    // Settings
    elements.themeSelect.addEventListener('change', (e) => {
        AppState.theme = e.target.value;
        document.body.setAttribute('data-theme', AppState.theme);
        elements.themeToggle.textContent = AppState.theme === 'light' ? '☀️' : '🌙';
        saveSettings();
    });
    
    elements.bgEffect.addEventListener('change', (e) => {
        AppState.bgEffect = e.target.value;
        document.body.setAttribute('data-bg', AppState.bgEffect);
        saveSettings();
    });
    
    elements.proxyEngine.addEventListener('change', (e) => {
        AppState.proxyEngine = e.target.value;
        saveSettings();
    });
    
    elements.backendServer.addEventListener('change', (e) => {
        AppState.backendServer = e.target.value;
        saveSettings();
    });
    
    elements.cloakEnabled.addEventListener('change', (e) => {
        AppState.cloakEnabled = e.target.checked;
        elements.cloakOptions.style.display = AppState.cloakEnabled ? 'flex' : 'none';
        utils.updateTabCloak();
        saveSettings();
    });
    
    elements.cloakTitle.addEventListener('change', (e) => {
        AppState.cloakTitle = e.target.value;
        utils.updateTabCloak();
        saveSettings();
    });
    
    elements.cloakIcon.addEventListener('change', (e) => {
        AppState.cloakIcon = e.target.value;
        utils.updateTabCloak();
        saveSettings();
    });
    
    elements.resetSettings.addEventListener('click', () => {
        localStorage.clear();
        AppState.theme = 'dark';
        AppState.bgEffect = 'none';
        AppState.cloakEnabled = false;
        loadSettings();
        utils.showToast('Settings reset to defaults', 'success');
    });
    
    // Hash change for navigation
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'home';
        switchPage(hash);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + L to focus URL bar
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            elements.proxyUrl.focus();
            elements.proxyUrl.select();
        }
        
        // Escape to stop loading
        if (e.key === 'Escape') {
            utils.setLoading(false);
        }
    });
}

// Initialize App
function init() {
    console.log('🚀 Swaft Proxy initializing...');
    
    // Load settings
    loadSettings();
    
    // Render apps
    renderApps();
    
    // Setup event listeners
    initEventListeners();
    
    // Check for hash navigation
    const hash = window.location.hash.slice(1);
    if (hash && ['home', 'search', 'apps', 'settings'].includes(hash)) {
        switchPage(hash);
    }
    
    // Check for URL param
    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get('url');
    if (urlParam) {
        elements.proxyUrl.value = urlParam;
        proxy.navigate(urlParam);
    }
    
    console.log('✅ Swaft Proxy ready!');
    utils.showToast('Welcome to Swaft Proxy!', 'success');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
