/**
 * DOM utility functions
 */

/**
 * Safely get element by ID with type checking
 */
export const getElement = (id) => {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with id "${id}" not found`);
    }
    return element;
};

/**
 * Safely toggle class on element
 */
export const toggleClass = (element, className) => {
    if (!element) {
        console.warn('Cannot toggle class on null element');
        return;
    }
    element.classList.toggle(className);
};

/**
 * Safely add class to element
 */
export const addClass = (element, className) => {
    if (!element) {
        console.warn('Cannot add class to null element');
        return;
    }
    element.classList.add(className);
};

/**
 * Safely remove class from element
 */
export const removeClass = (element, className) => {
    if (!element) {
        console.warn('Cannot remove class from null element');
        return;
    }
    element.classList.remove(className);
};
