# Swaft Proxy

A clean, modern web proxy interface built with vanilla HTML/CSS/JS. Forked from DogeUB and redesigned for easy deployment on jsDelivr.

## 🚀 Deploy on jsDelivr

### Quick Deploy

1. **Fork this to a GitHub repository**
   - Create a new repo at https://github.com/new
   - Upload these 3 files: `index.html`, `style.css`, `app.js`

2. **Access via jsDelivr**
   ```
   https://cdn.jsdelivr.net/gh/YOUR_USERNAME/REPO_NAME@master/index.html
   ```

3. **With search path**
   ```
   https://cdn.jsdelivr.net/gh/YOUR_USERNAME/REPO_NAME@master/index.html#/search
   ```

### Example URL
```
https://cdn.jsdelivr.net/gh/taylos/swaft-proxy@master/index.html
```

## ✨ Features

- **Proxy Navigation** - Browse any website through the proxy interface
- **Multi-Engine Search** - Google, DuckDuckGo, Bing, Brave
- **Apps & Games Library** - 32+ built-in apps and games
- **Theme System** - Dark, Light, Midnight, Forest, Ocean themes
- **Background Effects** - Dots, grid, or gradient backgrounds
- **Tab Cloaking** - Hide the proxy as Google Classroom
- **Responsive Design** - Works on mobile and desktop
- **No Build Step** - Pure HTML/CSS/JS, no bundler needed

## 🔧 Configuration

### Backend Server (Required for actual proxy functionality)

To use the proxy feature, you need a backend server. Enter your server URL in Settings:

```
https://your-proxy-server.com
```

The server should support the `/~/BASE64_URL` format.

### Tab Cloak

Enable in Settings to disguise the proxy as Google Classroom:
- Title: "Google Classroom"
- Icon: Google Classroom favicon

## 📁 Files

```
public/
├── index.html    # Main HTML structure
├── style.css     # All styles and themes
├── app.js        # Application logic
└── README.md     # This file
```

## 🎨 Themes

Available themes:
- **Dark** (default) - Deep dark blue theme
- **Light** - Clean light theme
- **Midnight** - Purple accent theme
- **Forest** - Green nature theme
- **Ocean** - Blue water theme

## 🎮 Built-in Apps

**Popular:**
- GeForce NOW, Roblox, Discord, YouTube, Twitch, Netflix

**Games:**
- 1v1.LOL, Krunker.io, Shell Shockers, Slither.io, Agar.io
- Zombs Royale, Geometry Dash, Retro Bowl, Wordle, Chess.com

**Tools:**
- GitHub, CodePen, Replit, StackBlitz
- Canva, Figma, Photopea, Wikipedia

## 📝 License

Forked from DogeUB. Original project by DogeNetwork.
