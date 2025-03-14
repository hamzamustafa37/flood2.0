export const fallbackLng: string = 'en';
export const languages: string[] = [fallbackLng, 'ur'];
export const defaultNS: string = 'translation';
export const cookieName: string = 'i18next';

interface ISettings {
    supportedLngs: string[];
    fallbackLng: string;
    lng: string;
    fallbackNS: string;
    defaultNS: string;
    ns: string;
}

export function getOptions(
    lng: string = fallbackLng,
    ns: string = defaultNS
): ISettings {
    return {
        // debug: true,
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}
