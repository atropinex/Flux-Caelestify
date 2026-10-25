import styles from "./CelestifyNavbar.module.css";

export default function CelestifyNavbar() {
    return (
        <div className={styles.navbar} data-theme="CelestifyNavbar.navbar">
            <div className={styles.navbarContainer} data-theme="CelestifyNavbar.navbarContainer">
                {/* Navbar Title */}
                <div className={styles.navbarContainerContent} data-theme="CelestifyNavbar.navbarContainerContent">
                    <div className={styles.navbarContentText}>
                        Caelestify Player
                    </div>
                </div>

                {/* Navbar Searchbar */}
                <div className={styles.navbarContainerContent} data-theme="CelestifyNavbar.navbarContainerContent">
                    <div className={styles.navbarSearchBar} data-theme="CelestifyNavbar.navbarSearchBar">
                        <svg
                            className={styles.navbarSearchIcon} data-theme="CelestifyNavbar.navbarSearchIcon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>

                        <input
                            className={styles.navbarSearchInput} data-theme="CelestifyNavbar.navbarSearchInput"
                            type="search"
                            placeholder="Search..."
                            aria-label="Search"
                        />
                    </div>
                </div>

                {/* Navbar User Info */}
                <div className={styles.navbarContainerContent} data-theme="CelestifyNavbar.navbarContainerContent">

                </div>
            </div>
        </div>
    );
}