let mix = require('laravel-mix');
let path = require('path');

mix.setResourceRoot('../');
mix.setPublicPath(path.resolve('./'));

mix.webpackConfig({
    watchOptions: { 
        ignored: [
            path.posix.resolve(__dirname, './node_modules'),
            path.posix.resolve(__dirname, './css'),
            path.posix.resolve(__dirname, './js')
        ] 
    }
});

mix.js('resources/js/app.js', 'js');
mix.postCss("resources/css/app.css", "css", [
    require('tailwindcss'),
    require('autoprefixer'),
]);
mix.postCss("resources/css/editor-style.css", "css", [
    require('tailwindcss'),
    require('autoprefixer'),
]);

if (mix.inProduction()) {
    mix.version();
} else {
    mix.options({ manifest: false });
}