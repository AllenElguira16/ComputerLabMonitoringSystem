import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";
import * as io from "socket.io-client";

let win: BrowserWindow | null = null;
const socket = io("http://localhost:8000");

async function createWindow() {
  win = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.setAlwaysOnTop(true, "normal");
  win.setMenu(null);
  win.maximize();

  if (isDev) {
    await win.loadURL("http://localhost:3000/home");
  } else {
    // 'build/index.html'
    await win.loadURL(`file://${__dirname}/../index.html`);
  }

  win.on("closed", () => (win = null));

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron"
      ),
      forceHardReset: true,
      hardResetMethod: "exit"
    });
  }

  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  // if (isDev) {
  //   win.webContents.openDevTools();
  // }
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", async () => {
  if (win === null) {
    await createWindow();
  }
});

socket.on("closeWindow", () => {
  setTimeout(() => {
    app.quit();
  }, 5000);
});
