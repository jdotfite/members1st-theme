import { getElement, toggleClass } from '../utilities/dom';
import { trackMenuToggle } from '../utilities/analytics';
import { config } from '../config/settings';

export const initMobileMenu = () => {
    try {
        const menuToggle = getElement(config.selectors.mobileMenu.button);
        const primaryMenu = getElement(config.selectors.mobileMenu.menu);
        
        if (menuToggle && primaryMenu) {
            menuToggle.addEventListener('click', () => {
                toggleClass(primaryMenu, config.classes.hidden);
                const isVisible = !primaryMenu.classList.contains(config.classes.hidden);
                trackMenuToggle(isVisible ? 'open' : 'closed');
            });
            
            // Close menu on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !primaryMenu.classList.contains(config.classes.hidden)) {
                    primaryMenu.classList.add(config.classes.hidden);
                    trackMenuToggle('closed');
                }
            });
        }
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
};
