import { app } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import {AppSettings} from "../CommonInteface";

const DEFAULTS: AppSettings = {
    shortcut: 'CommandOrControl+Alt+M',
    minimizeSpotify: true,
    crossFadeEnabled: false,
    crossFadeDuration: 6,
    theme: 'default'
};

/** The overlay's settings, saved on this computer. */
export class SettingsModel {
    private file = join(app.getPath('userData'), 'settings.json');
    private settings: AppSettings = this.load();

    get(): AppSettings {
        return { ...this.settings };
    }

    update(changes: Partial<AppSettings>): void {
        this.settings = { ...this.settings, ...changes };
        writeFileSync(this.file, JSON.stringify(this.settings));
    }

    private load(): AppSettings {
        try {
            return { ...DEFAULTS, ...JSON.parse(readFileSync(this.file, 'utf8')) };
        } catch {
            return { ...DEFAULTS };
        }
    }
}