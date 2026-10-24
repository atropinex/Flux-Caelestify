import {app, globalShortcut} from "electron";
import {CelestifyOverlayController} from "./CelestifyOverlayController";

export interface CelestifyKeybinds {
    closeUI?: string;
    quitApp?: string;
}

export class CelestifyKeybindController {
    private registeredKeybinds: string[] = [];

    constructor(private overlay: CelestifyOverlayController) {}

    register(keybinds: CelestifyKeybinds): void {
        this.unregister();

        this.registerKeybind(keybinds.closeUI, () => this.overlay.hide());
        this.registerKeybind(keybinds.quitApp, () => app.quit());
    }

    unregister(): void {
        for (const keybind of this.registeredKeybinds) {
            globalShortcut.unregister(keybind);
        }

        this.registeredKeybinds = [];
    }

    private registerKeybind(
        accelerator: string | undefined,
        action: () => void
    ): void {
        if (!accelerator) return;

        try {
            if (globalShortcut.register(accelerator, action)) {
                this.registeredKeybinds.push(accelerator);
            } else {
                console.warn(`[Keybind] Could not register "${accelerator}".`);
            }
        } catch (error) {
            console.warn(`[Keybind] Invalid accelerator "${accelerator}".`, error);
        }
    }
}
