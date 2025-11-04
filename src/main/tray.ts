import { app, BrowserWindow, Menu, nativeImage, Tray } from "electron";
import path from "node:path";

let tray = null;

export function createTray(window: BrowserWindow) {
  const iconPath = app.isPackaged
    ? path.join(process.resourcesPath, "resources", "rotionTemplate.png") // quando empacotado
    : path.join(__dirname, "../../resources/rotionTemplate.png");
  tray = new Tray(nativeImage.createFromPath(iconPath));

  const menu = Menu.buildFromTemplate([
    {
      label: "Rotion",
      enabled: false,
    },
    {
      type: "separator",
    },
    {
      label: "Criar novo documento",
      click: () => {
        window.webContents.send("new-document");
      },
    },
    {
      type: "separator",
    },
    {
      label: "Documentos recentes",
      enabled: false,
    },
    {
      label: "Discover",
      accelerator: "CmdOrCtrl+1",
    },
    {
      type: "separator",
    },
    { label: "Sair", role: "quit" },
  ]);

  tray.setToolTip("Rotion");
  tray.setContextMenu(menu);
}
