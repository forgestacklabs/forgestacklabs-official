const fs = require("node:fs");
const net = require("node:net");
const path = require("node:path");
const { spawn } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const nextDir = path.join(root, ".next");
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
    console.error("\nPort 3000 is already in use.");
    console.error("Stop the existing dev server first with Ctrl + C, then run npm.cmd run dev again.\n");
    process.exit(1);
  }

  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log("Removed stale .next cache.");
  }

  const child = spawn(process.execPath, [nextBin, "dev"], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
