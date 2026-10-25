import styles from "./CelestifySettingsPage.module.css"
import {useEffect, useState} from "react";

export default function CelestifySettingsPage() {
    const [isActive, setIsActive] = useState(false);
    
    // Remove This
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'F8') {
                setIsActive((prev) => !prev); 
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
       <div className={styles.settingsBackground} data-theme="CelestifySettings.settingsBackground">
           <div className={`${styles.settingsContainer} ${isActive ? styles.settingsActive : ''}`} data-theme="CelestifySettings.settingsContainer"></div>
       </div>
    );
}
