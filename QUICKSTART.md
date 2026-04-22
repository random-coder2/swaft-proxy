# Swaft Proxy - Quick Start

## 🚀 Deploy in 3 Steps

### Step 1: Create GitHub Repo
1. Go to https://github.com/new
2. Name it `swaft-proxy`
3. Make it **Public**
4. Click **Create repository**

### Step 2: Upload Files
Upload these 3 files from the `public/` folder:
- `index.html`
- `style.css`  
- `app.js`

Or use Git:
```bash
cd swaft-proxy/public
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/swaft-proxy.git
git push -u origin main
```

### Step 3: Access Your Proxy
Your proxy is now live at:
```
https://cdn.jsdelivr.net/gh/YOUR_USERNAME/swaft-proxy@master/public/index.html
```

## ✨ Features Included

- ✅ **Proxy Browser** - Navigate any website
- ✅ **Multi-Search** - Google, DuckDuckGo, Bing, Brave
- ✅ **32+ Apps/Games** - Built-in library
- ✅ **5 Themes** - Dark, Light, Midnight, Forest, Ocean
- ✅ **Tab Cloak** - Hide as Google Classroom
- ✅ **Background Effects** - Dots, grid, gradient
- ✅ **Mobile Responsive** - Works on all devices

## 🔧 Configure Proxy Backend

To make the proxy actually work (not just demo mode), you need a backend server:

1. Go to **Settings** tab
2. Enter your backend server URL:
   ```
   https://your-proxy-server.com
   ```
3. The server should support format: `https://server.com/~/BASE64_ENCODED_URL`

## 📝 Notes

- No build step required - pure HTML/CSS/JS
- Works on any static hosting (GitHub Pages, Netlify, Vercel, etc.)
- jsDelivr caches files, so updates may take a few minutes to appear
- To force fresh version, add `?nocache=1` to URL

## 🌐 Alternative Hosts

Besides jsDelivr, you can also deploy to:
- **GitHub Pages**: Enable in repo settings
- **Netlify**: Drag & drop folder
- **Vercel**: Connect GitHub repo
- **Surge.sh**: `surge public/`
- **Cloudflare Pages**: Connect GitHub repo

## 🎨 Customization

Edit `style.css` to customize:
- Colors in `:root` CSS variables
- Background patterns
- Animations and transitions
- Layout breakpoints

Edit `app.js` to customize:
- Apps list in `appsDatabase` array
- Search engines in dropdown
- Default settings

---

**Original Source**: Forked from DogeUB by rykcbaoolNEW
**License**: Refer to original project
