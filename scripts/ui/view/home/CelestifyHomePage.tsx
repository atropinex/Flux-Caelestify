import styles from "./CelestifyHomePage.module.css";
import CelestifySettingsPage from "../settings/CelestifySettingsPage";

export default function CelestifyHomePage() {
    return(
        <div className={styles.homepageContainer}>
            <CelestifySettingsPage/>
        </div>
    );
}