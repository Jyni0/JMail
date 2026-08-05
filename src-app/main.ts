import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import * as path from "path";

// ? IPCs
import { RegisterAllIPCs } from "./ipcs/ipcs-register.ts";

// ? Windows
import { createMainWindow } from './window.ts';

// ? Trays
import { createTray } from './tray.ts';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const getIconPath = (dirname?: string) => {
  switch (process.platform) {
    case 'win32':
      return path.join(dirname || __dirname, '..', 'public/icons/icon.ico');
    case 'darwin':
      return path.join(dirname || __dirname, '..', 'public/icons/icon.icns');
    default:
      return path.join(dirname || __dirname, '..', 'public/icons/icon.png');
  }
};

let mainWindow: BrowserWindow | null = null;
let isQuitting = false;

RegisterAllIPCs();

app.setName('JMail');

app.whenReady().then(async () => {
  mainWindow = await createMainWindow(__dirname, () => isQuitting);

  createTray(mainWindow, __dirname, () => {
    isQuitting = true;
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow(__dirname, () => isQuitting).then((win) => {
        mainWindow = win;
      });
    } else if (mainWindow) {
      mainWindow.show();
    }
  });
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' && isQuitting) {
    app.quit();
  }
});
