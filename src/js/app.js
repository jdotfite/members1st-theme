/**
 * Main application entry point
 */
import { initThemeToggle, initializeTheme } from './modules/themeToggle';
import { initMobileMenu } from './modules/mobileMenu';
import { trackEvent } from './utilities/analytics';

// Initialize all modules when DOM is ready
window.addEventListener('load', () => {
    try {
        // Track page load
        trackEvent('Page', 'load', window.location.pathname);

        // Initialize modules
        initThemeToggle();
        initMobileMenu();
        initializeTheme();
        
        
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});

// Track page visibility changes
document.addEventListener('visibilitychange', () => {
    trackEvent('Page', 'visibility', document.visibilityState);
});
