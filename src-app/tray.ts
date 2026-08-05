import { Tray, Menu, BrowserWindow, app } from 'electron';
import { getIconPath } from "./main.ts";

let tray: Tray | null = null;

export const createTray = (
  win: BrowserWindow,
  dirname: string,
  onQuit: () => void
): Tray => {
  const iconPath = getIconPath(dirname);
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open JMail',
      click: () => {
        win.show();
        win.focus();
      },
    },
    { type: 'separator' },
    {
      label: 'Exit',
      click: () => {
        onQuit();
        app.quit();
      },
    },
  ]);

  tray.setToolTip('JMail');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
      win.focus();
    }
  });

  return tray;
};
