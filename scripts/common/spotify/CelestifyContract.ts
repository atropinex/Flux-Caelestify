import {AppSettings} from "../CommonInteface";


// === Settings that Changes without having to re-register the keybind === //
export type UpdatableSettings = Partial<Omit<AppSettings, 'shortcut'>>;
export const THEME_COLORS = ['ink', 'dim', 'accent', 'surface', 'line', 'deep'] as const;
export type ThemeColor = (typeof THEME_COLORS[number]);
export type BridgeReply = { ok: true; data: unknown } | { ok: false; error: { message: string; status?: number } };



