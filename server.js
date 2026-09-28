const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launchServer({
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
    port: 3000,
    host: "0.0.0.0"
  });

  console.log(`Playwright server running at ${browser.wsEndpoint()}`);

  process.on("SIGTERM", async () => {
    await browser.close();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    await browser.close();
    process.exit(0);
  });
})();
