import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function exampleDirectoryIndexes() {
  const rewrite = (req, _res, next) => {
    if (!req.url) return next();

    const url = new URL(req.url, "http://webmotion.local");
    if (/^\/examples\/[^/]+\/$/.test(url.pathname)) {
      req.url = `${url.pathname}index.html${url.search}`;
    }
    next();
  };

  return {
    name: "webmotion-example-directory-indexes",
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [exampleDirectoryIndexes(), react()],
  server: {
    port: 4188,
    strictPort: true,
  },
});
