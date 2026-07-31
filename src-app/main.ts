import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import * as path from "path";

// ? Db
import { setupDatabase } from './db/main.db.ts';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const getIconPath = () => {
  switch (process.platform) {
    case 'win32':
      return path.join(__dirname, '..', 'public/icons/icon.ico');
    case 'darwin':
      return path.join(__dirname, '..', 'public/icons/icon.icns');
    default:
      return path.join(__dirname, '..', 'public/icons/icon.png');
  }
};

export const createWindow = async (url: string = 'http://localhost:5173/u/23424df/inbox') => {
  await setupDatabase();

  const win = new BrowserWindow({
    width: 1124,
    height: 668,
    minWidth: 960,
    minHeight: 600,
    autoHideMenuBar: true,
    frame: false,
    icon: getIconPath(),
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.ts'),
    },
  });

  // ? Window event listeners
  win.on('enter-full-screen', () => {
    win.webContents.send('fullscreen-changed', true);
  });
  win.on('leave-full-screen', () => {
    win.webContents.send('fullscreen-changed', false);
  });
  win.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });

  // ? Setup app info
  win.setTitle('JMail');
  app.setName('JMail');

  // ? Load application frontend
  // const htmlPath = path.join(__dirname, 'dist', 'index.html');
  // win.loadFile(htmlPath);
  win.loadURL(url);

  // ? Open the DevTools.
  win.webContents.openDevTools();

  return win;
};

app.whenReady().then(() => createWindow());
