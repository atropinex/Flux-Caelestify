import {BridgeReply, ThemeColor, UpdatableSettings} from "./spotify/CelestifyContract";
import {BridgeError} from "./models/BridgeModel";

export interface ElectronApi {
    bridgeRequest: (command: string, args?: unknown) => Promise<BridgeReply>; // asks Spotify, through Spicetify
    isBridgeConnected: () => Promise<boolean>;                                 // is Spotify (with the extension) connected?
    getSettings: () => Promise<AppSettings>;
    updateSettings: (changes: UpdatableSettings) => Promise<void>;
    setShortcut: (accelerator: string) => Promise<boolean>; // false if another app already uses it
    listThemes: () => Promise<ThemeList>;
    openThemesFolder: () => void;
    openInSpotify: (uri: string) => void;
    hideOverlay: () => void;
    onVisibilityChange: (callback: (isVisible: boolean) => void) => () => void; // returns "stop listening"
    selectTheme: (id: string) => Promise<Theme>;
    onThemeChanged: (callback: (theme: Theme) => void) => () => void;
}

export interface AppSettings {
    shortcut: string;
    minimizeSpotify: boolean;
    crossFadeEnabled: boolean;
    crossFadeDuration: number;
    theme: string;
}

export interface ThemeLayer {
    type: 'gradient' | 'image';
    value: string;
    opacity: number;
    blur: number;
    size: string;
}

export interface Theme {
    id: string;
    name: string;
    colors: Partial<Record<ThemeColor, string>>;
    dimLayer: string | null;
    layers: ThemeLayer[];
    overrides?: Record<string, Record<string, string>>;
}

export interface ThemeList {
    themes: Theme[];
    errors: string[];
}

export interface Pending {
    command: string;
    startedAt: number;
    resolve: (data: unknown) => void;
    reject: (error: BridgeError) => void;
    timer: NodeJS.Timeout;
}

export interface BridgeClientInfo {
    name: string;
    version: number | null;
    build: string | null;
}



