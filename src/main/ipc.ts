import { ipcMain } from "electron";
import { IPC } from "../shared/constants/ipc";
import { FetchAllDocumentsResponse } from "../shared/types/ipc";

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: [
        { id: "1", title: "Untitled", content: ''},
        { id: "2", title: "Discover", content: ''},
        { id: "3", title: "Ignite", content: ''},
        { id: "4", title: "Rocketseat", content: ''},
      ],
    };
  }
);
