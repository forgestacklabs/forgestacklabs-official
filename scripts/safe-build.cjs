const net = require("node:net");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const nextBin = require.resolve("next/dist/bin/next");

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: "127.0.0.1", port });
    socket.setTimeout(800);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => resolve(false));
  });
}

async function main() {
  const devServerRunning = await isPortOpen(3000);

  if (devServerRunning) {
    console.error("\nBuild blocked: Next dev server is running on port 3000.");
    console.error("Stop it first with Ctrl + C, then run npm.cmd run build.");
    console.error("This prevents .next from being rewritten while the browser is using dev chunks.\n");
    process.exit(1);
  }

  const result = spawnSync(process.execPath, [nextBin, "build"], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });

  process.exit(result.status ?? 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
