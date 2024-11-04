const theme = require('./theme.json');
const tailpress = require("@jeffreyvr/tailwindcss-tailpress");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
    './*.php', // Match PHP files at the root of the plugin
    '../../plugins/members1st/src/**/*.{js,jsx,ts,tsx}', // All JS/TS files in the src directory
    '../../plugins/members1st/src/**/*.php', // All PHP files in the src directory and its subdirectories
    '../../plugins/members1st/**/*.php', // All PHP files in the members1st directory (for any files outside src)
    '!../../plugins/members1st/node_modules/**', // Exclude node_modules
    './inc/**/*.php', // Example for including PHP files in the 'inc' directory
    './template-parts/**/*.php', // Include files in 'template-parts'
    './resources/css/*.css',
    './resources/js/*.js',
    './src/blocks/**/*.js',
    './safelist.txt'
    ],
    safelist: [

      ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '0rem'
            },
        },
        extend: {
            colors: {
                ...tailpress.colorMapper(tailpress.theme('settings.color.palette', theme)),
                'on-background': 'var(--on-background)',
                'brand-yellow': 'var(--color-brand-yellow)',
                'brand-red': 'var(--color-brand-red)',
                'brand-dark-blue': 'var(--color-brand-dark-blue)',
                'text-primary': 'var(--text-primary)',
                'color-global-white': 'var(--color-global-white)',
                // Gray
                'gray-1': 'var(--gray-1)',
                'gray-2': 'var(--gray-2)',
                'gray-3': 'var(--gray-3)',
                'gray-4': 'var(--gray-4)',
                'gray-5': 'var(--gray-5)',
                'gray-6': 'var(--gray-6)',
                'gray-7': 'var(--gray-7)',
                'gray-8': 'var(--gray-8)',
                'gray-9': 'var(--gray-9)',
                'gray-10': 'var(--gray-10)',
                'gray-11': 'var(--gray-11)',
                'gray-12': 'var(--gray-12)',
                'gray-a1': 'var(--gray-a1)',
                'gray-a2': 'var(--gray-a2)',
                'gray-a3': 'var(--gray-a3)',
                'gray-a4': 'var(--gray-a4)',
                'gray-a5': 'var(--gray-a5)',
                'gray-a6': 'var(--gray-a6)',
                'gray-a7': 'var(--gray-a7)',
                'gray-a8': 'var(--gray-a8)',
                'gray-a9': 'var(--gray-a9)',
                'gray-a10': 'var(--gray-a10)',
                'gray-a11': 'var(--gray-a11)',
                'gray-a12': 'var(--gray-a12)',
                
                'm1-red': '#ee3129',
                'm1-blue-dark': '#213d70',
                'almost-black': '#121212',
                'weak-black': '#212121',
                'ui-btn-red': '#902121',
                'ui-link-red': '#ed7e7e',
                'hover-red': '#ed4840'
                // Add other color variables as needed
            },
            fontSize: {
                ...tailpress.fontSizeMapper(tailpress.theme('settings.typography.fontSizes', theme)),
                '2.5xl': '1.75rem',
                '3.5xl': '2rem',
                '4.5xl': '2.5rem'
            },
            spacing: {
                '4.5': '1.125rem',
                '5.5': '1.375rem',
                '13': '3.25rem',
                '14': '3.5rem',
                '15': '3.75rem',
                '16': '4rem',
                '17': '4.25rem',
                '18': '4.5rem',
                '19': '4.75rem',
                '20': '5rem'
            },
            fontFamily: {
                'primary': ['var(--font-primary)', 'sans-serif'],
                'secondary': ['var(--font-secondary)', 'sans-serif']
            },
        },
        screens: {
            'xs': '480px',
            'sm': '600px',
            'md': '782px',
            'lg': tailpress.theme('settings.layout.contentSize', theme),
            'xl': tailpress.theme('settings.layout.wideSize', theme),
            '2xl': '1440px'
        }
    },
    plugins: [
        tailpress.tailwind
    ]
};