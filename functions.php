<?php

/**
 * Theme setup.
 */
function tailpress_setup() {
    add_theme_support( 'title-tag' );

    register_nav_menus(
        array(
            'primary' => __( 'Primary Menu', 'tailpress' ),
        )
    );

    add_theme_support(
        'html5',
        array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        )
    );

    add_theme_support( 'custom-logo' );
    add_theme_support( 'post-thumbnails' );

    add_theme_support( 'align-wide' );
    add_theme_support( 'wp-block-styles' );

    add_theme_support( 'responsive-embeds' );

    add_theme_support( 'editor-styles' );
    add_editor_style( tailpress_asset('css/editor-style.css') );
}

add_action( 'after_setup_theme', 'tailpress_setup' );

/**
 * Enqueue theme assets.
 */
function tailpress_enqueue_scripts() {
    $theme = wp_get_theme();
    $style_path = tailpress_asset('css/app.css');
    wp_enqueue_style( 'tailpress', $style_path, array(), $theme->get( 'Version' ) );
    wp_enqueue_script( 'tailpress', tailpress_asset( 'js/app.js' ), array(), $theme->get( 'Version' ) );
    
    // Debug output
    error_log('Enqueued Tailpress style: ' . $style_path);
}

add_action( 'wp_enqueue_scripts', 'tailpress_enqueue_scripts' );

/**
 * Get asset path.
 *
 * @param string  $path Path to asset.
 *
 * @return string
 */
function tailpress_asset( $path ) {
    if ( wp_get_environment_type() === 'production' ) {
        return get_stylesheet_directory_uri() . '/' . $path;
    }

    return add_query_arg( 'time', time(),  get_stylesheet_directory_uri() . '/' . $path );
}

/**
 * Adds option 'li_class' to 'wp_nav_menu'.
 *
 * @param string  $classes String of classes.
 * @param mixed   $item The current item.
 * @param WP_Term $args Holds the nav menu arguments.
 *
 * @return array
 */
function tailpress_nav_menu_add_li_class( $classes, $item, $args, $depth ) {
    if ( isset( $args->li_class ) ) {
        $classes[] = $args->li_class;
    }

    if ( isset( $args->{"li_class_$depth"} ) ) {
        $classes[] = $args->{"li_class_$depth"};
    }

    return $classes;
}

add_filter( 'nav_menu_css_class', 'tailpress_nav_menu_add_li_class', 10, 4 );

/**
 * Adds option 'submenu_class' to 'wp_nav_menu'.
 *
 * @param string  $classes String of classes.
 * @param mixed   $item The current item.
 * @param WP_Term $args Holds the nav menu arguments.
 *
 * @return array
 */
function tailpress_nav_menu_add_submenu_class( $classes, $args, $depth ) {
    if ( isset( $args->submenu_class ) ) {
        $classes[] = $args->submenu_class;
    }

    if ( isset( $args->{"submenu_class_$depth"} ) ) {
        $classes[] = $args->{"submenu_class_$depth"};
    }

    return $classes;
}

add_filter( 'nav_menu_submenu_css_class', 'tailpress_nav_menu_add_submenu_class', 10, 3 );

/**
 * Add front-end debug output
 */
function tailpress_footer_debug() {
    echo '<!-- Tailpress Version: ' . wp_get_theme()->get('Version') . ' -->';
    echo '<!-- Tailpress CSS Path: ' . esc_html(tailpress_asset('css/app.css')) . ' -->';
}
add_action('wp_footer', 'tailpress_footer_debug');

/**
 * Increase Tailpress style priority
 */
function tailpress_increase_style_priority() {
    wp_styles()->add_data('tailpress', 'group', 11);
}
add_action('wp_print_styles', 'tailpress_increase_style_priority');

