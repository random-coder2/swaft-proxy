# Swaft Proxy

A web proxy application forked from DogeUB, renamed and rebranded for deployment via jsDelivr.

## Overview

Swaft Proxy is a browser-based proxy solution that provides:
- Multiple proxy engines (Ultraviolet, Scramjet)
- Built-in games and apps library
- Tabbed browsing interface
- Customizable themes
- Search functionality with multiple engine options

## Deployment on jsDelivr

To deploy this on jsDelivr, follow these steps:

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Create a new public repository named `swaft-proxy`
3. Do not initialize with README, .gitignore, or license (we already have files)

### Step 2: Upload Files

Option A - Using Git:
```bash
cd swaft-proxy
git init
git add .
git commit -m "Initial commit - Swaft Proxy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/swaft-proxy.git
git push -u origin main
```

Option B - Manual Upload:
1. Go to your repository on GitHub
2. Click "Add file" → "Upload files"
3. Drag and drop all the files from this folder
4. Commit the changes

### Step 3: Access via jsDelivr

Once your repository is public, you can access it via jsDelivr at:

```
https://cdn.jsdelivr.net/gh/YOUR_USERNAME/swaft-proxy@master/public/index.html
```

**Full URL with search path:**
```
https://cdn.jsdelivr.net/gh/YOUR_USERNAME/swaft-proxy@master/public/index.html#/search
```

### Alternative: Use the /public folder files
The main application is in the `/public` folder with 3 core files:
- `index.html` - Main entry point
- `style.css` - All styles and themes  
- `app.js` - Application logic

## File Structure

```
swaft-proxy/
├── index.svg           # Legacy entry point (SVG container)
├── noe_mzpT.js         # Main application entry
├── README.md           # This file
├── assets/             # CSS stylesheets
│   ├── B_peBBIS.css
│   ├── BuigefS6.css
│   ├── DXMVrujf.css
│   └── DYbIwV4A.css
├── chunks/             # JavaScript modules
│   ├── vendor-modules.kyFu_h-i.js
│   ├── Home.DAV09KFE.js
│   ├── Nav.BTWa0U0d.js
│   ├── Apps.XpijEFOq.js
│   ├── Apps2.DcurbC4q.js
│   ├── Settings.CN_ricAB.js
│   ├── Player.BnEHKUWU.js
│   ├── localGmLoader.D7XJ6s2_.js
│   └── apps.module.DH41XAHq.js
├── eggs/               # Scramjet proxy files (to be added)
├── ham/                # Additional proxy handlers (to be added)
├── libcurl/            # Libcurl wasm files (to be added)
└── portal/
    └── k12/            # K12 portal files (to be added)
```

## Notes

- The entry point is `index.svg` which uses SVG foreignObject to host the web application
- Service workers for proxy functionality need to be added in `eggs/` and `libcurl/` directories
- The original project used Google Analytics which has been replaced with a placeholder ID

## Original Source

This project is a fork of DogeUB by rykcbaoolNEW, available at:
https://github.com/rykcbaoolNEW/dogeub

## License

Please refer to the original project's license terms.
