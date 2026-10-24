import styles from "./CelestifyApp.module.css";
import CelestifySettingsPage from "../settings/CelestifySettingsPage";

export default function CelestifyApp() {
    return (
        <div className={styles.celestifyBackground} data-theme="CelestifyApp.celestifyBackground">
            <div className={styles.glassCover} data-theme="CelestifyApp.glassCover">
                <CelestifySettingsPage/>
            </div>
        </div>
    );
}
