# ✨ Flux-Caelestify

**A better way to experience Spotify on your desktop.**

Flux-Caelestify is a next-generation desktop application built as the successor to [Flux-Star-Stream](https://github.com/atropinex/Flux-Star-Stream). Designed with a focus on performance, customization, reliability, and user experience, it aims to provide a more seamless way to interact with Spotify through an enhanced desktop interface powered by Electron, React, and TypeScript.

> 🚀 **The next evolution of Flux.** Better architecture, smarter integrations, and a more refined desktop experience.

---

## ✨ Features

- 🎵 **Spotify Integration** — Interact with Spotify playback through Spicetify-powered integrations.
- 📋 **Queue Management** — View and manage the playback queue with improved queue synchronization.
- 🎨 **Theme Customization** — Personalize the application's appearance with a flexible theme system.
- ⌨️ **Global Keybinds** — Configure keyboard shortcuts through YAML to control application behavior.
- 🪟 **Custom Window Experience** — Enjoy a streamlined desktop interface with custom window controls, animations, and minimize behavior.
- 🔌 **Bridge Integration** — Communicate with Spotify and Spicetify through a dedicated integration layer.
- ⚡ **Modern Architecture** — Built with TypeScript and separated application responsibilities for easier maintenance.
- 🛠️ **Developer-Friendly** — A codebase designed to be extended, maintained, and improved over time.
- 📦 **Windows Packaging** — A foundation for distributing the application as a standalone Windows executable.

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| [Electron](https://www.electronjs.org/) | Desktop application runtime |
| [React](https://react.dev/) | User interface |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe application development |
| [Vite](https://vite.dev/) | Development and build tooling |
| [Spicetify](https://spicetify.app/) | Spotify customization and integration |
| YAML | User-configurable settings and keybinds |

## 📋 Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) — A version compatible with the project's dependencies.
- npm — Included with Node.js.
- [Spotify desktop application](https://www.spotify.com/download/)
- [Spicetify CLI](https://spicetify.app/docs/getting-started/)

> **Note:** Spotify and Spicetify integration depends on compatible Spotify and Spicetify versions. Some features may require additional setup.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/atropinex/Flux-Caelestify.git
cd Flux-Caelestify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

> The available scripts and packaging commands may vary depending on the project's current configuration.

## 🎨 Customization

Flux-Caelestify is designed to support configurable themes and keyboard shortcuts.

### Themes

Customize the application's visual appearance through its theme system. Theme configuration and loading are intended to be managed independently from the UI components.

### Keybinds

Configure supported keyboard shortcuts through YAML configuration.

## 🗺️ Roadmap

- [ ] Establish a stable Electron main, preload, and renderer architecture.
- [ ] Improve Spicetify bridge reliability and lifecycle handling.
- [ ] Implement dependable playback queue synchronization and management.
- [ ] Complete theme loading, validation, and error handling.
- [ ] Expand YAML-based keybind customization.
- [ ] Improve Spotify update recovery and Spicetify reapplication workflows.
- [ ] Refine custom window animations and application controls.
- [ ] Add automated checks and regression tests.
- [ ] Improve Windows packaging and installation.
- [ ] Publish stable releases with installation instructions.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and test them.
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/).
5. Open a pull request describing the changes.

Example commit messages:

```text
feat: add queue management
fix: restore Spicetify bridge connection
refactor: improve theme controller
docs: update installation instructions
```

For bugs and feature requests, please open an issue with relevant details and reproduction steps.

## ⚠️ Disclaimer

Flux-Celestify is an independent community project and is not affiliated with, endorsed by, or officially connected to Spotify AB.

Spotify and Spicetify are separate projects with their own terms, requirements, and update schedules. Compatibility may change when Spotify or Spicetify is updated.

## 📄 License

See the [LICENSE](LICENSE) file for licensing information.

---

<p align="center">
  **Flux-Celestify** · Part of the Flux ecosystem
  <br/>
  *Built for a better desktop music experience.*
</p>
