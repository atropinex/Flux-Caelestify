import {app} from 'electron';
import {existsSync, mkdirSync, readdirSync, readFileSync, statSync} from 'fs';
import {homedir} from 'os';
import {extname, join} from 'path';
import {parse} from 'yaml';
import {Theme, ThemeLayer, ThemeList} from '../CommonInteface';
import {THEME_COLORS} from '../spotify/CelestifyContract';

const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
const IMAGE_TYPES: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif'
};
type Raw = Record<string, any>;
const asText = (value: unknown): string | null => typeof value === 'string' && value.trim() ? value.trim() : null;
const asNumber = (value: unknown, fallback: number): number => typeof value === 'number' && Number.isFinite(value) ? value : fallback;
const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

/** Themes are YAML files in a folder. This reads and checks them. */
export class ThemeModel {
    readonly folder = join(app.getAppPath(), 'themes');

    constructor() {
        if (!existsSync(this.folder)) {
            mkdirSync(this.folder, {recursive: true});
        }
    }

    /** Reads every theme file. A broken file is reported without stopping the others. */
    load(): ThemeList {
        const themes: Theme[] = [];
        const errors: string[] = [];

        const files = readdirSync(this.folder)
            .filter((file) => /\.ya?ml$/i.test(file))
            .sort();

        for (const file of files) {
            try {
                const content = readFileSync(join(this.folder, file), 'utf8');
                const raw = parse(content) as Raw | null;

                themes.push(this.toTheme(file.replace(/\.ya?ml$/i, ''), raw));
            } catch (error) {
                errors.push(`${file}: ${error instanceof Error ? error.message : String(error)}`);
            }
        }

        return {themes, errors};
    }

    private toTheme(id: string, raw: Raw | null): Theme {
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
            throw new Error('the file is empty or is not a YAML mapping');
        }

        const colors: Theme['colors'] = {};

        for (const key of THEME_COLORS) {
            const value = asText(raw.colors?.[key]);

            if (value) {
                colors[key] = value;
            }
        }

        const background: Raw = raw.background ?? {};
        const layers = Array.isArray(background.layers)
            ? background.layers.map((layer: Raw, index: number) => this.toLayer(layer, index))
            : [];

        return {
            id,
            name: asText(raw.name) ?? id,
            colors,
            dimLayer: asText(background.dim),
            layers,
            overrides: this.toOverrides(raw.overrides)
        };
    }

    private toLayer(raw: Raw, index: number): ThemeLayer {
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
            throw new Error(`layer ${index + 1} must be a mapping`);
        }

        const type = raw.type === 'image' ? 'image' : 'gradient';
        const value = asText(raw.value);
        
        if (!value) {
            throw new Error(`layer ${index + 1} needs a "value"`);
        }
        
        return {
            type,
            value: type === 'image' ? this.imageSource(value) : value,
            opacity: clamp(asNumber(raw.opacity, 1), 0, 1),
            blur: Math.max(0, asNumber(raw.blur, 0)),
            size: asText(raw.size) ?? 'cover'
        };
    }
    
    private imageSource(value: string): string {
        if (/^(https?:|data:)/i.test(value)) {
            return value;
        }
        
        const path = value.startsWith('~')
            ? join(homedir(), value.slice(1))
            : value;

        const mime = IMAGE_TYPES[extname(path).toLowerCase()];

        if (!mime) {
            throw new Error(`"${value}" must be a png, jpg, webp or gif`);
        }
        
        if (!existsSync(path)) {
            throw new Error(`image not found: ${value}`);
        }
        
        if (statSync(path).size > MAX_IMAGE_BYTES) {
            throw new Error(`image is bigger than 20 MB: ${value}`);
        }

        return `data:${mime};base64,${readFileSync(path).toString('base64')}`;
    }

    private toOverrides(raw: unknown): Theme['overrides'] {
        if (raw === undefined) {
            return {};
        }

        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
            throw new Error('"overrides" must be a mapping');
        }

        const overrides: NonNullable<Theme['overrides']> = {};

        for (const [target, styles] of Object.entries(raw)) {
            if (!styles || typeof styles !== 'object' || Array.isArray(styles)) {
                throw new Error(`overrides.${target} must be a mapping`);
            }

            const properties: Record<string, string> = {};

            for (const [property, value] of Object.entries(styles)) {
                if (typeof value !== 'string' && typeof value !== 'number') {
                    throw new Error(`overrides.${target}.${property} must be a string or number`);
                }

                properties[property] = String(value);
            }

            overrides[target] = properties;
        }

        return overrides;
    }
}