import styles from "./CelestifyApp.module.css";
import CelestifyNavbar from "../navbar/CelestifyNavbar";
import CelestifyHomePage from "../home/CelestifyHomePage";

export default function CelestifyApp() {
    return (
        <div className={styles.celestifyBackground}>
            <div className={styles.celestifyGlassCover} />

            <div className={styles.celestifyAppContent}>
                <CelestifyNavbar />
                <CelestifyHomePage />
            </div>
        </div>
    );
}