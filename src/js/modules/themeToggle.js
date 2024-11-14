import { getElement } from '../utilities/dom';
import { trackThemeChange } from '../utilities/analytics';
import { config } from '../config/settings';

export const initThemeToggle = () => {
    try {
        const themeToggle = getElement(config.selectors.themeToggle);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.documentElement.classList.toggle(config.themes.dark);
                const newTheme = document.documentElement.classList.contains(config.themes.dark) 
                    ? config.themes.dark 
                    : config.themes.light;
                
                localStorage.setItem(config.storage.themeKey, newTheme);
                trackThemeChange(newTheme);
            });
        }
    } catch (error) {
        console.error('Error initializing theme toggle:', error);
    }
};

export const initializeTheme = () => {
    try {
        const prefersDark = (!('color-theme' in localStorage) && 
            window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (localStorage.getItem(config.storage.themeKey) === config.themes.dark || prefersDark) {
            document.documentElement.classList.add(config.themes.dark);
        }
    } catch (error) {
        console.error('Error initializing theme:', error);
    }
};
