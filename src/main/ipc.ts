import { ipcMain } from "electron";

ipcMain.handle("fetch-documents", () => {
  return [
    { id: "1", title: "Untitled" },
    { id: "2", title: "Discover" },
    { id: "3", title: "Ignite" },
    { id: "4", title: "Rocketseat" },
  ];
});
