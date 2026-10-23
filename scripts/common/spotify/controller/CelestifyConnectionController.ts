import { ipcMain, shell } from 'electron';
import {CelestifyIPC} from "../CelestifyConnection";
import {BridgeReply, UpdatableSettings} from "../CelestifyContract";
import {SettingsModel} from "../../models/SettingsModel";
import {ThemeModel} from "../../models/ThemeModel";
import {BridgeError, BridgeModel} from "../../models/BridgeModel";
import {CelestifyOverlayController} from "./CelestifyOverlayController";

/** Keeps only valid values, since this data comes from the page. */
function cleanSettings(changes: UpdatableSettings): UpdatableSettings {
    const clean: UpdatableSettings = {};
    
    if (typeof changes.minimizeSpotify === 'boolean') { 
        clean.minimizeSpotify = changes.minimizeSpotify; 
    }
    
    if (typeof changes.crossFadeEnabled === 'boolean') { 
        clean.crossFadeEnabled = changes.crossFadeEnabled; 
    }
    
    if (typeof changes.crossFadeDuration === 'number' && Number.isFinite(changes.crossFadeDuration)) {
        clean.crossFadeDuration = Math.max(0, Math.min(12, Math.round(changes.crossFadeDuration)));
    }
    
    if (typeof changes.theme === 'string') { 
        clean.theme = changes.theme; 
    }
    return clean;
}

/** Answers requests that the page sends through the preload bridge. */
export class CelestifyConnectionController {
    constructor(
        private settings: SettingsModel,
        private themes: ThemeModel,
        private overlay: CelestifyOverlayController,
        private bridge: BridgeModel
    ) {}

    register(): void {
        ipcMain.handle(CelestifyIPC.bridgeStatus, () => this.bridge.isConnected());
        ipcMain.handle(CelestifyIPC.bridgeRequest, (_event, command: string, args: unknown) => this.askSpotify(command, args));

        ipcMain.handle(CelestifyIPC.getSettings, () => this.settings.get());
        ipcMain.handle(CelestifyIPC.updateSettings, (_event, changes: UpdatableSettings) => this.settings.update(cleanSettings(changes)));
        ipcMain.handle(CelestifyIPC.setShortcut, (_event, accelerator: string) => this.overlay.setShortcut(accelerator));

        ipcMain.handle(CelestifyIPC.listThemes, () => this.themes.load());
        ipcMain.on(CelestifyIPC.openThemesFolder, () => void shell.openPath(this.themes.folder));

        // Only Spotify links, never anything else.
        ipcMain.on(CelestifyIPC.openInSpotify, (_event, uri: string) => {
            if (/^spotify:[a-z]+:[A-Za-z0-9]+$/.test(uri)) void shell.openExternal(uri);
        });

        ipcMain.on(CelestifyIPC.hideOverlay, () => this.overlay.hide());
    }

    /** Errors are returned as data, because Electron would wrap thrown errors in a long technical message. */
    private async askSpotify(command: string, args: unknown): Promise<BridgeReply> {
        if (typeof command !== 'string') {
            return {ok: false, error: {message: 'Bad request.'}};
        }
        try {
            
            return { ok: true, data: await this.bridge.request(command, args) };
        } catch (error) {
            const failure = error instanceof BridgeError ? error : new BridgeError('Something went wrong.');
            return { ok: false, error: { message: failure.message, status: failure.status } };
        }
    }
}