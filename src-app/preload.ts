import { contextBridge, ipcRenderer } from "electron";

// ? App Window Controls
contextBridge.exposeInMainWorld("app", {
  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close: () => ipcRenderer.send("window-close"),
});
