import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';
import {CelestifyIPC} from "../common/spotify/CelestifyConnection";
import {ElectronApi, Theme} from "../common/CommonInteface";


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
    selectTheme: (id) => ipcRenderer.invoke(CelestifyIPC.selectTheme, id),
    onVisibilityChange: (callback) => {
        const listener = (_event: IpcRendererEvent, isVisible: boolean) => callback(isVisible);
        ipcRenderer.on(CelestifyIPC.visibility, listener);
        return () => ipcRenderer.removeListener(CelestifyIPC.visibility, listener);
    },
    onThemeChanged: (callback) => {
        const listener = (_event: IpcRendererEvent, theme: Theme) => callback(theme);
        ipcRenderer.on(CelestifyIPC.themeChanged, listener);
        return () => ipcRenderer.removeListener(CelestifyIPC.themeChanged, listener);
    },
};

contextBridge.exposeInMainWorld('api', api);