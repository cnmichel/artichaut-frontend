import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";

// List of all locales.
export const allLocales = ["en", "fr"];

// Get the locale from local storage if there is one or from navigator
const locale = localStorage.getItem('language');
const navLocale = navigator.language;

// Create Vue I18n instance.
export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: locale ? locale.split('-')[0] : navLocale.split('-')[0],
    fallbackLocale: "en",
    messages: messages,
});

// Set new locale.
export async function setLocale (locale) {
    // Load locale if not available yet.
    if (!i18n.global.availableLocales.includes(locale)) {
        const messages = await loadLocale(locale);

        // fetch() error occurred.
        if (messages === undefined) {
            return;
        }

        // Add locale.
        i18n.global.setLocaleMessage(locale, messages);
    }

    // Set locale.
    i18n.global.locale.value = locale;
}

// Fetch locale.
function loadLocale(locale) {
    return fetch(`./locales/${locale}.json`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Something went wrong!");
        })
        .catch((error) => {
            console.error(error);
        });
}