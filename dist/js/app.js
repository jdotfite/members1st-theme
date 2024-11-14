/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_themeToggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/modules/themeToggle.js");
/* harmony import */ var _modules_mobileMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/js/modules/mobileMenu.js");
/* harmony import */ var _utilities_analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/js/utilities/analytics.js");
/**
 * Main application entry point
 */




// Initialize all modules when DOM is ready
window.addEventListener('load', function () {
  try {
    // Track page load
    (0,_utilities_analytics__WEBPACK_IMPORTED_MODULE_2__.trackEvent)('Page', 'load', window.location.pathname);

    // Initialize modules
    (0,_modules_themeToggle__WEBPACK_IMPORTED_MODULE_0__.initThemeToggle)();
    (0,_modules_mobileMenu__WEBPACK_IMPORTED_MODULE_1__.initMobileMenu)();
    (0,_modules_themeToggle__WEBPACK_IMPORTED_MODULE_0__.initializeTheme)();
  } catch (error) {
    console.error('Error initializing application:', error);
  }
});

// Track page visibility changes
document.addEventListener('visibilitychange', function () {
  (0,_utilities_analytics__WEBPACK_IMPORTED_MODULE_2__.trackEvent)('Page', 'visibility', document.visibilityState);
});

/***/ }),

/***/ "./src/js/config/settings.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config)
/* harmony export */ });
/**
 * Global settings and configuration
 */
var config = {
  selectors: {
    themeToggle: 'theme-toggle',
    mobileMenu: {
      button: 'menu-toggle',
      menu: 'primary-menu'
    }
  },
  storage: {
    themeKey: 'color-theme'
  },
  themes: {
    dark: 'dark',
    light: 'light'
  },
  classes: {
    hidden: 'hidden',
    darkMode: 'dark'
  }
};

/***/ }),

/***/ "./src/js/modules/mobileMenu.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initMobileMenu: () => (/* binding */ initMobileMenu)
/* harmony export */ });
/* harmony import */ var _utilities_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/utilities/dom.js");
/* harmony import */ var _utilities_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/js/utilities/analytics.js");
/* harmony import */ var _config_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/js/config/settings.js");



var initMobileMenu = function initMobileMenu() {
  try {
    var menuToggle = (0,_utilities_dom__WEBPACK_IMPORTED_MODULE_0__.getElement)(_config_settings__WEBPACK_IMPORTED_MODULE_2__.config.selectors.mobileMenu.button);
    var primaryMenu = (0,_utilities_dom__WEBPACK_IMPORTED_MODULE_0__.getElement)(_config_settings__WEBPACK_IMPORTED_MODULE_2__.config.selectors.mobileMenu.menu);
    if (menuToggle && primaryMenu) {
      menuToggle.addEventListener('click', function () {
        (0,_utilities_dom__WEBPACK_IMPORTED_MODULE_0__.toggleClass)(primaryMenu, _config_settings__WEBPACK_IMPORTED_MODULE_2__.config.classes.hidden);
        var isVisible = !primaryMenu.classList.contains(_config_settings__WEBPACK_IMPORTED_MODULE_2__.config.classes.hidden);
        (0,_utilities_analytics__WEBPACK_IMPORTED_MODULE_1__.trackMenuToggle)(isVisible ? 'open' : 'closed');
      });

      // Close menu on ESC key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !primaryMenu.classList.contains(_config_settings__WEBPACK_IMPORTED_MODULE_2__.config.classes.hidden)) {
          primaryMenu.classList.add(_config_settings__WEBPACK_IMPORTED_MODULE_2__.config.classes.hidden);
          (0,_utilities_analytics__WEBPACK_IMPORTED_MODULE_1__.trackMenuToggle)('closed');
        }
      });
    }
  } catch (error) {
    console.error('Error initializing mobile menu:', error);
  }
};

/***/ }),

/***/ "./src/js/modules/themeToggle.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initThemeToggle: () => (/* binding */ initThemeToggle),
/* harmony export */   initializeTheme: () => (/* binding */ initializeTheme)
/* harmony export */ });
/* harmony import */ var _utilities_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/utilities/dom.js");
/* harmony import */ var _utilities_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/js/utilities/analytics.js");
/* harmony import */ var _config_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/js/config/settings.js");



var initThemeToggle = function initThemeToggle() {
  try {
    var themeToggle = (0,_utilities_dom__WEBPACK_IMPORTED_MODULE_0__.getElement)(_config_settings__WEBPACK_IMPORTED_MODULE_2__.config.selectors.themeToggle);
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        document.documentElement.classList.toggle(_config_settings__WEBPACK_IMPORTED_MODULE_2__.config.themes.dark);
        var newTheme = document.documentElement.classList.contains(_config_settings__WEBPACK_IMPORTED_MODULE_2__.config.themes.dark) ? _config_settings__WEBPACK_IMPORTED_MODULE_2__.config.themes.dark : _config_settings__WEBPACK_IMPORTED_MODULE_2__.config.themes.light;
        localStorage.setItem(_config_settings__WEBPACK_IMPORTED_MODULE_2__.config.storage.themeKey, newTheme);
        (0,_utilities_analytics__WEBPACK_IMPORTED_MODULE_1__.trackThemeChange)(newTheme);
      });
    }
  } catch (error) {
    console.error('Error initializing theme toggle:', error);
  }
};
var initializeTheme = function initializeTheme() {
  try {
    var prefersDark = !('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localStorage.getItem(_config_settings__WEBPACK_IMPORTED_MODULE_2__.config.storage.themeKey) === _config_settings__WEBPACK_IMPORTED_MODULE_2__.config.themes.dark || prefersDark) {
      document.documentElement.classList.add(_config_settings__WEBPACK_IMPORTED_MODULE_2__.config.themes.dark);
    }
  } catch (error) {
    console.error('Error initializing theme:', error);
  }
};

/***/ }),

/***/ "./src/js/utilities/analytics.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   trackEvent: () => (/* binding */ trackEvent),
/* harmony export */   trackMenuToggle: () => (/* binding */ trackMenuToggle),
/* harmony export */   trackThemeChange: () => (/* binding */ trackThemeChange)
/* harmony export */ });
/**
 * Analytics utility functions
 */
var trackEvent = function trackEvent(category, action) {
  var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
};
var trackThemeChange = function trackThemeChange(theme) {
  trackEvent('Theme', 'change', theme);
};
var trackMenuToggle = function trackMenuToggle(state) {
  trackEvent('Mobile Menu', 'toggle', state);
};

/***/ }),

/***/ "./src/js/utilities/dom.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClass: () => (/* binding */ addClass),
/* harmony export */   getElement: () => (/* binding */ getElement),
/* harmony export */   removeClass: () => (/* binding */ removeClass),
/* harmony export */   toggleClass: () => (/* binding */ toggleClass)
/* harmony export */ });
/**
 * DOM utility functions
 */

/**
 * Safely get element by ID with type checking
 */
var getElement = function getElement(id) {
  var element = document.getElementById(id);
  if (!element) {
    console.warn("Element with id \"".concat(id, "\" not found"));
  }
  return element;
};

/**
 * Safely toggle class on element
 */
var toggleClass = function toggleClass(element, className) {
  if (!element) {
    console.warn('Cannot toggle class on null element');
    return;
  }
  element.classList.toggle(className);
};

/**
 * Safely add class to element
 */
var addClass = function addClass(element, className) {
  if (!element) {
    console.warn('Cannot add class to null element');
    return;
  }
  element.classList.add(className);
};

/**
 * Safely remove class from element
 */
var removeClass = function removeClass(element, className) {
  if (!element) {
    console.warn('Cannot remove class from null element');
    return;
  }
  element.classList.remove(className);
};

/***/ }),

/***/ "./src/css/app.css":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/editor-style.css":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/editor-style": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktailpress"] = self["webpackChunktailpress"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/editor-style","css/app"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	__webpack_require__.O(undefined, ["css/editor-style","css/app"], () => (__webpack_require__("./src/css/app.css")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/editor-style","css/app"], () => (__webpack_require__("./src/css/editor-style.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map