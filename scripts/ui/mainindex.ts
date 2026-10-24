import { app } from 'electron';
import {CelestifyOverlayController} from "../common/spotify/controller/CelestifyOverlayController";
import {SettingsModel} from "../common/models/SettingsModel";
import {CelestifyAppModel} from "../common/models/CelestifyAppModel";
import {BridgeModel} from "../common/models/BridgeModel";
import {CelestifyConnectionController} from "../common/spotify/controller/CelestifyConnectionController";
import {ThemeModel} from "../common/models/ThemeModel";
import {TrayController} from "../common/spotify/controller/CelestifyTrayController";
// Only one copy may run, otherwise two overlays would fight over the keybind.
if (!app.requestSingleInstanceLock()) app.quit();

app.whenReady().then(() => {
    app.dock?.hide();
    
    const settings = new SettingsModel();
    const overlay = new CelestifyOverlayController(settings ,new CelestifyAppModel);
    // Spicetify extension for Spotify connects here.
    const bridge = new BridgeModel();
    bridge.start();
    
    app.on('will-quit', () => bridge.stop());
    new CelestifyConnectionController(settings, new ThemeModel(), overlay, bridge).register();
    overlay.start();
    new TrayController(overlay).start();
    
    overlay.show();
});