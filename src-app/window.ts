import { BrowserWindow } from 'electron';
import * as path from 'path';
import { setupDatabase } from './db/main.db.ts';
import { getIconPath } from "./main.ts";

export const createMainWindow = async (
  dirname: string,
  getIsQuitting: () => boolean,
  url: string = 'http://localhost:5173/u/23424df/inbox'
): Promise<BrowserWindow> => {
  await setupDatabase();

  const win = new BrowserWindow({
    width: 1124,
    height: 668,
    minWidth: 960,
    minHeight: 600,
    autoHideMenuBar: true,
    frame: false,
    icon: getIconPath(dirname),
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(dirname, 'preload.ts'),
    },
  });

  // ? Window event listeners
  win.on('enter-full-screen', () => {
    win.webContents.send('fullscreen-changed', true);
  });

  win.on('leave-full-screen', () => {
    win.webContents.send('fullscreen-changed', false);
  });

  // win.setContentProtection(true);

  win.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });

  win.on('close', (event) => {
    if (!getIsQuitting()) {
      event.preventDefault();
      win.hide();
    }
  });

  // ? Setup app info
  win.setTitle('JMail');

  // ? Load application frontend
  // const htmlPath = path.join(__dirname, 'dist', 'index.html');
  // win.loadFile(htmlPath);
  win.loadURL(url);

  // ? Open DevTools
  win.webContents.openDevTools();

  return win;
};
