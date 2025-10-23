# 🚀 Google Apps Script DevContainer Environment

Welcome to the **complete development environment** for **Google Apps Script** with **TypeScript**, **CLASP**, and **VSCode DevContainers**!

This project gives you a fully containerized, ready-to-code environment that includes everything you need to build, test, and deploy Google Apps Script projects using modern development tools.

---

## 🌟 What This Is

This is a **plug-and-play development environment** for Google Apps Script that:

- 🐳 Uses **VSCode's DevContainer** for instant, isolated development
- 📝 Supports **Google Apps Script** development with **TypeScript**
- 🤖 Includes **Gemini CLI** for AI-assisted coding
- 🔐 Integrates **1Password CLI** for secure secret management
- 🎨 Features **Oh My Zsh** with user-friendly terminal themes
- ⚡ Provides **automated workflows** with VSCode tasks and aliases

Everything runs in a container — no global installations or system pollution!

---

## 🧰 Prerequisites

You need these tools installed on your host machine:

1. **[VSCode](https://code.visualstudio.com/)**
2. **VSCode Dev Containers Extension** (search: `Dev Containers`)
3. **Docker Desktop** or **Rancher Desktop** with Docker compatibility
4. **Google Account** (for Apps Script deployment)

Optional but recommended:
- **Gemini API key** (for AI coding assistance)
- **1Password account** (for secure credential management)

---

## 🔄 Development Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Google Apps Script DevContainer Workflow                 │
└─────────────────────────────────────────────────────────────────────────────┘

    🖥️  Host Machine                    🐳 DevContainer Environment
    ┌──────────────────────┐            ┌──────────────────────────────────────┐
    │                      │            │                                      │
    │  1. Clone Repo       │  ───────▶  │  2. Auto-install dependencies        │
    │  2. Open VSCode      │            │     • Node.js + TypeScript           │
    │  3. Reopen in        │            │     • CLASP CLI                      │
    │     Container        │            │     • ESLint + Prettier              │
    │                      │            │     • Oh My Zsh + themes             │
    └──────────────────────┘            │                                      │
                                        │  3. Authenticate with Google         │
                                        │     gas-login                        │
    ┌──────────────────────┐            │                                      │
    │  🌐 Google Apps      │  ◀─────────  │  4. Development Cycle:               │
    │     Script Editor    │            │     • Write TypeScript (src/)       │
    │                      │            │     • Auto-format & lint             │
    │  • View logs         │            │     • Build: gas-build               │
    │  • Test functions    │            │     • Push: gas-push                 │
    │  • Manage triggers   │            │     • Deploy: gas-deploy             │
    │  • Set permissions   │            │     • Open: gas-open                 │
    └──────────────────────┘            └──────────────────────────────────────┘
```

---

## 🪄 Quick Start

### Step 1: Initial Setup

1. **Clone this repository**
   ```bash
   git clone https://github.com/your-username/appscript-devcontainer.git
   cd appscript-devcontainer
   ```

2. **Open in VSCode**
   ```bash
   code .
   ```

3. **Reopen in Container**
   - VSCode will detect the DevContainer configuration
   - Click "Reopen in Container" when prompted
   - Or use Command Palette: `Dev Containers: Reopen in Container`

### Step 2: First-Time Authentication

4. **Authenticate with Google Apps Script**
   ```bash
   gas-login
   # Follow the browser authentication flow
   ```

5. **Set up your project** (choose one):

   **Option A: Create a new Apps Script project**
   ```bash
   clasp create --title "My New Project" --type standalone
   ```

   **Option B: Clone an existing project**
   ```bash
   clasp clone YOUR_SCRIPT_ID
   ```

   **Option C: Use the sample project**
   ```bash
   # Copy the template configuration
   cp .clasp.json.template .clasp.json
   # Edit .clasp.json with your script ID
   ```

### Step 3: Development Workflow

6. **Daily Development Cycle**
   ```bash
   # Edit your TypeScript files in src/
   # Files auto-format on save with Prettier

   # Build and push to Google Apps Script
   gas-dev

   # Or run individual commands:
   gas-build    # Compile TypeScript
   gas-push     # Upload to Google Apps Script
   gas-deploy   # Create new deployment
   gas-open     # Open in browser
   ```

---

## 🛠️ Available Commands

The DevContainer includes helpful aliases for common tasks:

| Alias | Command | Description |
|-------|---------|-------------|
| `gas-build` | `npm run build` | Compile TypeScript to JavaScript |
| `gas-push` | `npm run clasp:push` | Upload files to Google Apps Script |
| `gas-deploy` | `npm run clasp:deploy` | Create a new deployment |
| `gas-open` | `npm run clasp:open` | Open project in Apps Script editor |
| `gas-dev` | `npm run dev` | Quick build + push workflow |
| `gas-login` | `npm run clasp:login` | Authenticate with Google |
| `gas-lint` | `npm run lint` | Check code quality |
| `gas-format` | `npm run format` | Format code with Prettier |

## 🎯 VSCode Tasks

Use `Ctrl+Shift+P` → "Tasks: Run Task" to access:

- **TypeScript: Build** - Compile with error checking
- **TypeScript: Watch** - Auto-compile on file changes
- **CLASP: Push** - Build and upload to Google Apps Script
- **CLASP: Deploy** - Create new deployment
- **Development: Build and Push** - Quick development cycle
- **Lint: Check/Fix** - Code quality tools
- **Format: Check/Fix** - Code formatting

---

## 📁 Project Structure

```
📦 appscript-devcontainer/
├── 📁 .devcontainer/          # DevContainer configuration
│   ├── devcontainer.json      # Container settings & extensions
│   └── Dockerfile             # Custom image with tools
├── 📁 .vscode/                # VSCode workspace settings
│   ├── settings.json          # Editor configuration
│   ├── extensions.json        # Recommended extensions
│   └── tasks.json             # Automated tasks
├── 📁 src/                    # Your TypeScript source code
│   ├── Code.ts                # Main Apps Script file
│   ├── appsscript.json        # Apps Script manifest
│   └── README.md              # Sample project documentation
├── 📄 .clasp.json.template    # CLASP configuration template
├── 📄 .env.example            # Environment variables template
├── 📄 tsconfig.json           # TypeScript compiler settings
├── 📄 package.json            # Dependencies and scripts
├── 📄 .eslintrc.js            # Code linting rules
├── 📄 .prettierrc             # Code formatting rules
└── 📄 CLASP_SETUP.md          # Detailed CLASP guide
```

---

## 🔧 Advanced Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Copy the template
cp .env.example .env

# Edit with your values
# GEMINI_API_KEY=your-api-key-here
# GOOGLE_OAUTH_CLIENT_ID=your-client-id
# GOOGLE_OAUTH_CLIENT_SECRET=your-client-secret
```

### 1Password Integration

For secure secret management:

```bash
# Store secrets in 1Password and reference them
op run -- gas-dev

# Or set up 1Password CLI integration
op account add --signin-address your-account.1password.com
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

**🚨 "Permission denied" errors**
```bash
# Re-authenticate with CLASP
gas-login
```

**🚨 "Script file not found" errors**
```bash
# Ensure files are built first
gas-build
# Check that .clasp.json points to the right directory
```

**🚨 TypeScript compilation errors**
```bash
# Check for syntax errors
gas-lint
# Fix formatting issues
gas-format
```

**🚨 "User has not enabled the Apps Script API"**
1. Visit [Google Apps Script API](https://console.cloud.google.com/apis/library/script.googleapis.com)
2. Enable the API for your project
3. Try authentication again

### DevContainer Issues

**🚨 Container won't start**
- Check Docker is running
- Try: `Dev Containers: Rebuild Container`

**🚨 Extensions not working**
- Reload window: `Ctrl+Shift+P` → "Developer: Reload Window"
- Check extensions are installed in container context

**🚨 Terminal theme not working**
- Restart terminal: `Ctrl+Shift+P` → "Terminal: Kill All Terminals"
- Ensure Oh My Zsh installed correctly

---

## 🎨 Customization

### Terminal Theme

The container uses Oh My Zsh with the Agnoster theme. Customize in `.zshrc`:

```bash
# Change theme
ZSH_THEME="powerlevel10k/powerlevel10k"

# Add more plugins
plugins=(git node npm docker vscode zsh-autosuggestions zsh-syntax-highlighting kubectl)
```

### VSCode Settings

Modify `.vscode/settings.json` for your preferences:

```json
{
  "editor.fontSize": 14,
  "terminal.integrated.fontSize": 12,
  "workbench.colorTheme": "GitHub Dark"
}
```

---

## 📚 Additional Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [CLASP Documentation](https://github.com/google/clasp)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Apps Script TypeScript Guide](https://developers.google.com/apps-script/guides/typescript)
- [DevContainers Documentation](https://containers.dev/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test in the DevContainer environment
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Coding!** 🚀 Build amazing Google Apps Script projects with the power of TypeScript and modern development tools!
