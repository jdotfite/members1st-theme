let mix = require('laravel-mix');
let path = require('path');
let fs = require('fs');

// Define paths
const PATHS = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};

// Helper function to safely clean directory contents
function cleanDirectory(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
        return;
    }

    try {
        const files = fs.readdirSync(directory);
        for (const file of files) {
            const filePath = path.join(directory, file);
            try {
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    // Skip certain directories that might be locked
                    if (file !== 'node_modules' && file !== '.git') {
                        cleanDirectory(filePath);
                        try {
                            fs.rmdirSync(filePath);
                        } catch (e) {
                            console.warn(`Warning: Could not remove directory ${filePath}`);
                        }
                    }
                } else {
                    try {
                        fs.unlinkSync(filePath);
                    } catch (e) {
                        console.warn(`Warning: Could not remove file ${filePath}`);
                    }
                }
            } catch (e) {
                console.warn(`Warning: Could not access ${filePath}`);
            }
        }
    } catch (e) {
        console.warn(`Warning: Could not clean directory ${directory}`);
    }
}

// Clean dist directory before build (only if not watching)
if (!process.env.WEBPACK_WATCH) {
    cleanDirectory(PATHS.dist);
}

// Basic configuration
mix.setResourceRoot('../');
mix.setPublicPath('dist');

// Disable notifications
mix.disableNotifications();
mix.disableSuccessNotifications();

// Enable processing of URL references in CSS
mix.options({
    processCssUrls: true,
    notifications: false,
    clearConsole: true,
    hmrOptions: {
        https: false,
        host: 'localhost',
        port: 8080
    }
});

// Webpack configuration
mix.webpackConfig({
    watchOptions: { 
        ignored: [
            '**/node_modules/**',
            '**/dist/**',
            '**/*.woff2',
            '**/*.woff',
            '**/*.ttf'
        ],
        aggregateTimeout: 500,
        poll: false
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/js')
        }
    },
    externals: {
        jquery: 'jQuery'
    },
    stats: {
        children: false,
        warnings: false,
        moduleTrace: false
    },
    output: {
        pathinfo: false
    }
});

// Font handling - Only copy on initial build, not during watch
if (!process.env.WEBPACK_WATCH) {
    const fontsSrc = path.join(PATHS.src, 'fonts');
    const fontsDist = path.join(PATHS.dist, 'fonts');

    if (fs.existsSync(fontsSrc)) {
        try {
            if (!fs.existsSync(fontsDist)) {
                fs.mkdirSync(fontsDist, { recursive: true });
            }
            mix.copyDirectory(fontsSrc, fontsDist);
        } catch (error) {
            console.warn('Warning: Issue with font processing', error.code);
        }
    }
}

// Process main JavaScript files
mix.js('src/js/app.js', 'dist/js')
   .sourceMaps(true, 'source-map');



// CSS processing
mix.postCss('src/css/app.css', 'dist/css', [
    require('tailwindcss'),
    require('autoprefixer'),
])
.options({
    postCss: [
        require('tailwindcss'),
        require('autoprefixer')
    ],
    processCssUrls: false
});

mix.postCss('src/css/editor-style.css', 'dist/css', [
    require('tailwindcss'),
    require('autoprefixer'),
]);

// Development vs Production settings
if (mix.inProduction()) {
    mix.version();
} else {
    mix.options({ 
        manifest: false,
        notifications: false
    });
    
    mix.webpackConfig({
        devtool: 'source-map',
        cache: {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename]
            }
        }
    });
}

// Add version query string in development
if (!mix.inProduction()) {
    mix.version();
}

// Error handling for the entire process
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
});

console.log('Webpack configuration loaded');