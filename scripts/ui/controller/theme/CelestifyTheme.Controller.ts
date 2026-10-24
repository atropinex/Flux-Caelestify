
import type { Theme } from "../../../common/CommonInteface";

let initialized = false;
let currentTheme: Theme | null = null;
let unsubscribeTheme: (() => void) | null = null;

function applyOverrides(theme: Theme): void {
    let style = document.querySelector<HTMLStyleElement>(
        "style[data-celestify-theme]"
    );

    if (!style) {
        style = document.createElement("style");
        style.dataset.celestifyTheme = "";
        document.head.appendChild(style);
    }

    style.textContent = Object.entries(theme.overrides ?? {})
        .map(([target, properties]) => {
            const declarations = Object.entries(properties)
                .filter(([property, value]) =>
                    /^-?[a-z][a-z0-9-]*$/i.test(property) &&
                    (typeof value === "string" || typeof value === "number")
                )
                .map(([property, value]) => `${property}: ${value};`)
                .join("\n");

            return declarations
                ? `[data-theme=${JSON.stringify(target)}] {\n${declarations}\n}`
                : "";
        })
        .filter(Boolean)
        .join("\n");
}

export function applyTheme(theme: Theme): void {
    console.log("[Theme] Applying:", theme.name, theme.overrides);

    currentTheme = theme;
    applyOverrides(theme);
}
export async function initializeTheme(): Promise<void> {
    if (initialized) return;
    initialized = true;

    if (!window.api) {
        initialized = false;
        console.error("[Theme] Electron API is unavailable. Check the preload script.");
        return;
    }

    unsubscribeTheme = window.api.onThemeChanged(applyTheme);

    try {
        const [result, settings] = await Promise.all([
            window.api.listThemes(),
            window.api.getSettings()
        ]);

        const theme =
            result.themes.find((item: Theme) => item.id === settings.theme) ??
            result.themes[0];

        console.log("[Theme] YAML loaded:", theme?.name);
        console.log("[Theme] YAML overrides:", theme?.overrides);
        

        if (theme && !currentTheme) {
            applyTheme(theme);
        }
    } catch (error) {
        initialized = false;
        console.error("[Theme] Failed to load theme:", error);
    }
}

export function disposeTheme(): void {
    unsubscribeTheme?.();
    unsubscribeTheme = null;
    currentTheme = null;
    initialized = false;
}
