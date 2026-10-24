import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';
import {CelestifyIPC} from "../common/spotify/CelestifyConnection";
import {ElectronApi} from "../common/CommonInteface";


const api: ElectronApi = {
    bridgeRequest: (command, args) => ipcRenderer.invoke(CelestifyIPC.bridgeRequest, command, args),
    isBridgeConnected: () => ipcRenderer.invoke(CelestifyIPC.bridgeStatus),
    getSettings: () => ipcRenderer.invoke(CelestifyIPC.getSettings),
    updateSettings: (changes) => ipcRenderer.invoke(CelestifyIPC.updateSettings, changes),
    setShortcut: (accelerator) => ipcRenderer.invoke(CelestifyIPC.setShortcut, accelerator),
    listThemes: () => ipcRenderer.invoke(CelestifyIPC.listThemes),
    openThemesFolder: () => ipcRenderer.send(CelestifyIPC.openThemesFolder),
    openInSpotify: (uri) => ipcRenderer.send(CelestifyIPC.openInSpotify, uri),
    hideOverlay: () => ipcRenderer.send(CelestifyIPC.hideOverlay),
    onVisibilityChange: (callback) => {
        const listener = (_event: IpcRendererEvent, isVisible: boolean) => callback(isVisible);
        ipcRenderer.on(CelestifyIPC.visibility, listener);
        return () => ipcRenderer.removeListener(CelestifyIPC.visibility, listener);
    }
};

contextBridge.exposeInMainWorld('api', api);