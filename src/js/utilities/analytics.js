/**
 * Analytics utility functions
 */
export const trackEvent = (category, action, label = null) => {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
};

export const trackThemeChange = (theme) => {
    trackEvent('Theme', 'change', theme);
};

export const trackMenuToggle = (state) => {
    trackEvent('Mobile Menu', 'toggle', state);
};
