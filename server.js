const { chromium } = require("playwright");

(async () => {
  const browserServer = await chromium.launchServer({
    executablePath: "/usr/bin/brave-browser",
    headless: true,

    proxy: {
      server: "http://sing-box:8080"
    },

    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check"
    ],

    host: "0.0.0.0",
    port: 3000,
    wsPath: "/playwright"
  });

  console.log(`Playwright server running at ${browserServer.wsEndpoint()}`);

  const shutdown = async () => {
    await browserServer.close();
    process.exit(0);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
})();
