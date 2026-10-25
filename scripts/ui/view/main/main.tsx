import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "../../main.css";
import CelestifyApp from "../app/CelestifyApp";
import {initializeTheme} from "../../controller/theme/CelestifyTheme.Controller";


async function startApp() {
    console.log("[Theme] Initializing...");

    await initializeTheme();

    console.log("[Theme] Initialization finished");

    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <CelestifyApp />
        </StrictMode>
    );
}

void startApp();
