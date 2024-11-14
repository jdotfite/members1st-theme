<?php
/**
 * TailPress Theme Functions
 *
 * @package TailPress
 */

namespace TailPress;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enhanced security headers
 */
function add_security_headers($headers) {
    $headers['Content-Security-Policy'] = "default-src 'self'; " .
        "img-src 'self' data: www.google-analytics.com; " .
        "font-src 'self' data: 'unsafe-inline' blob:; " .  // Added blob: and unsafe-inline for base64 fonts
        "style-src 'self' 'unsafe-inline'; " .
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' www.google-analytics.com; " .
        "connect-src 'self' www.google-analytics.com; " .
        "object-src 'none'";
    return $headers;
}
add_filter('wp_headers', __NAMESPACE__ . '\add_security_headers');

/**
 * Add cache headers for non-logged-in users
 */
function add_cache_headers($headers) {
    if (!is_user_logged_in()) {
        $headers['Cache-Control'] = 'public, max-age=31536000';
        $headers['Expires'] = gmdate('D, d M Y H:i:s', time() + 31536000) . ' GMT';
    }
    return $headers;
}
add_filter('wp_headers', __NAMESPACE__ . '\add_cache_headers');

/**
 * Add resource hints for performance
 */
function add_resource_hints($hints, $relation_type) {
    if ($relation_type === 'dns-prefetch') {
        $hints[] = 'www.google-analytics.com';
    }
    return $hints;
}
add_filter('wp_resource_hints', __NAMESPACE__ . '\add_resource_hints', 10, 2);

/**
 * Remove jQuery Migrate
 */
function remove_jquery_migrate($scripts) {
    if (!is_admin() && isset($scripts->registered['jquery'])) {
        $script = $scripts->registered['jquery'];
        if ($script->deps) {
            $script->deps = array_diff($script->deps, array('jquery-migrate'));
        }
    }
}
add_action('wp_default_scripts', __NAMESPACE__ . '\remove_jquery_migrate');

/**
 * Disable Gravatar completely
 */
function disable_gravatar() {
    add_filter('option_show_avatars', '__return_false');
    add_filter('default_avatar_select', '__return_empty_string');
    add_filter('pre_option_avatar_default', '__return_empty_string');
}
add_action('init', __NAMESPACE__ . '\disable_gravatar');

/**
 * Theme setup.
 */
function setup() {
    // Theme supports
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('post-thumbnails');
    add_theme_support('align-wide');
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'tailpress'),
    ));

    // Add editor styles
    add_editor_style(asset('dist/css/editor-style.css'));
}
add_action('after_setup_theme', __NAMESPACE__ . '\setup');

/**
 * Get asset path.
 *
 * @param string $path Path to asset.
 * @return string Complete asset path
 */
function asset($path) {
    $asset_path = get_stylesheet_directory_uri() . '/' . $path;
    
    // Add timestamp for cache busting in development
    if (wp_get_environment_type() !== 'production') {
        $asset_path = add_query_arg('time', time(), $asset_path);
    }

    return $asset_path;
}

/**
 * Enqueue theme assets.
 */
function enqueue_scripts() {
    $theme = wp_get_theme();
    $version = $theme->get('Version');
    $style_path = asset('dist/css/app.css');

    wp_enqueue_style('tailpress', $style_path, array(), $version);
    wp_enqueue_script('tailpress', asset('dist/js/app.js'), array(), $version, true);

    // Debug output in development only
    if (defined('WP_DEBUG') && WP_DEBUG) {
        error_log('Enqueued Tailpress style: ' . $style_path);
    }
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts');

/**
 * Add custom classes to menu list items.
 */
function nav_menu_add_li_class($classes, $item, $args, $depth) {
    if (isset($args->li_class)) {
        $classes[] = $args->li_class;
    }

    if (isset($args->{"li_class_$depth"})) {
        $classes[] = $args->{"li_class_$depth"};
    }

    return $classes;
}
add_filter('nav_menu_css_class', __NAMESPACE__ . '\nav_menu_add_li_class', 10, 4);

/**
 * Add custom classes to submenu lists.
 */
function nav_menu_add_submenu_class($classes, $args, $depth) {
    if (isset($args->submenu_class)) {
        $classes[] = $args->submenu_class;
    }

    if (isset($args->{"submenu_class_$depth"})) {
        $classes[] = $args->{"submenu_class_$depth"};
    }

    return $classes;
}
add_filter('nav_menu_submenu_css_class', __NAMESPACE__ . '\nav_menu_add_submenu_class', 10, 3);

/**
 * Add custom classes to menu links.
 */
function add_menu_link_classes($atts, $item, $args) {
    if ($args->theme_location === 'primary') {
        $classes = array(
            'block',
            'font-semibold',
            'uppercase',
            'hover:text-m1-red',
            'md:tracking-tighter',
            'lg:tracking-normal',
            'page-scroll'
        );

        // Add active class for current page
        if ($item->current) {
            $classes[] = 'active';
        }

        // Merge with existing classes if any
        $existing_classes = isset($atts['class']) ? explode(' ', $atts['class']) : array();
        $atts['class'] = implode(' ', array_merge($existing_classes, $classes));
    }
    
    return $atts;
}
add_filter('nav_menu_link_attributes', __NAMESPACE__ . '\add_menu_link_classes', 10, 3);

/**
 * Increase Tailpress style priority.
 */
function increase_style_priority() {
    wp_styles()->add_data('tailpress', 'group', 11);
}
add_action('wp_print_styles', __NAMESPACE__ . '\increase_style_priority');

/**
 * Add debug information in footer (development only).
 */
function footer_debug() {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        echo '<!-- Tailpress Version: ' . esc_html(wp_get_theme()->get('Version')) . ' -->';
        echo '<!-- Tailpress CSS Path: ' . esc_html(asset('dist/css/app.css')) . ' -->';
    }
}
add_action('wp_footer', __NAMESPACE__ . '\footer_debug');