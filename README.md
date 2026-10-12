# Rayfield Web

**The browser-based interface for managing and streaming your media.**

Rayfield Web is the web client in the Rayfield self-hosted media platform. It is based on Jellyfin Web and provides the browser-facing experience for connecting to a compatible media server, browsing a library, and playing supported media.

## Project goals

- **A cinematic media experience** with an interface focused on discovering and enjoying your library.
- **Self-hosted by design** so your media experience connects to a server you control.
- **Open source** so the client can be inspected, adapted, and improved by the community.
- **Compatibility-minded development** building on the Jellyfin ecosystem while Rayfield-specific work evolves.

This repository contains the legacy Rayfield Web client. It is distinct from any separate experimental frontend work; changes here apply to this repository only.

## Development

The build instructions below cover installing dependencies, running the client locally, and creating a development build. Review the repository's contributing guidance before making larger changes.

Rayfield is an independent project derived from Jellyfin Web. Preserve the existing license and attribution notices when contributing.

---

## Build Process

### Dependencies

- [Node.js](https://nodejs.org/en/download)
- npm (included in Node.js)

### Getting Started

1. Clone or download this repository.

   ```sh
   git clone https://github.com/jellyfin/jellyfin-web.git
   cd jellyfin-web
   ```

2. Install build dependencies in the project directory.

   ```sh
   npm install
   ```

3. Run the web client with webpack for local development.

   ```sh
   npm start
   ```

4. Build the client with sourcemaps available.

   ```sh
   npm run build:development
   ```

Review the [Contributing Guide](./CONTRIBUTING.md) for more information on our process and tech stack.
