<?php
/*
Plugin Name: Bettors Den Slider
Description: Slider wordpress plug built for bettors den homepage.
Version: 1.0.0
Requires PHP: 7.0
Requires at least: 5.0
Author: Ryan Allen
 */

if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

function bettors_den_block_category( $categories, $post ) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'bettors-den-slider',
                'title' => __( 'Bettors Den Slider', 'bettors-den-slider' ),
                'icon'  => 'slides',
            ),
        )
    );
}
add_filter( 'block_categories_all', 'bettors_den_block_category', 10, 2 );


// Load script and styles
function bd_carousel_files()
{
    wp_register_style(
        'bd-carousel-style',
        plugin_dir_url(__FILE__) . 'dist/styles.css'
    );
    wp_register_script(
        'bd-carousel-script',
        plugin_dir_url(__FILE__) . 'dist/script.js'
    );

    // Enqueue the registered script and style
    wp_enqueue_style('bd-carousel-style');
    wp_enqueue_script('bd-carousel-script');
}
add_action('wp_enqueue_scripts', 'bd_carousel_files');

class BettorsDenSlider
{
    function __construct()
    {
        add_action('init', array($this, 'bettorsDenSliderAssets'));
    }

    function bettorsDenSliderAssets()
    {
        wp_register_style(
            'bettors-den-slider-style',
            plugin_dir_url(__FILE__) . 'dist/slider.css'
        );
        wp_register_script(
            'bettors-den-slider-script',
            plugin_dir_url(__FILE__) . 'dist/slider.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n')
        );
        register_block_type('bettors-den-slider/slider', array(
            'editor_script' => 'bettors-den-slider-script',
            'editor_style' => 'bettors-den-slider-style',
            'render_callback' => array($this, 'bettorsDenSliderRender')
        ));
    }

    function bettorsDenSliderRender($attributes, $contents)
    {
        wp_enqueue_style(
            'bettors-den-slider-style',
            plugin_dir_url(__FILE__) . 'dist/slider.css'
        );

        // Generate a unique ID for each slider instance
        $unique_id = 'bettors-den-slider-' . uniqid();

        ob_start();
        // Pass the unique ID to your slider template
        include plugin_dir_path(__FILE__) . 'blocks/slider.php';
        return ob_get_clean();
    }
}

$bettorsDenSlider = new BettorsDenSlider();

class BettorsDenSlide
{
    function __construct()
    {
        add_action('init', array($this, 'bettorsDenSlideAssets'));
    }

    function bettorsDenSlideAssets()
    {
        wp_register_style(
            'bettors-den-slide-style',
            plugin_dir_url(__FILE__) . 'dist/slide.css'
        );
        wp_register_script(
            'bettors-den-slide-script',
            plugin_dir_url(__FILE__) . 'dist/slide.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n')
        );
        register_block_type('bettors-den-slider/slide', array(
            'editor_script' => 'bettors-den-slide-script',
            'editor_style' => 'bettors-den-slide-style',
            'render_callback' => array($this, 'bettorsDenSlideRender')
        ));
    }

    function bettorsDenSlideRender($attributes, $contents)
    {
        wp_enqueue_style(
            'bettors-den-slide-style',
            plugin_dir_url(__FILE__) . 'dist/slide.css'
        );

        // Generate a unique ID for each slide instance
        $unique_id = 'bettors-den-slide-' . uniqid();

        ob_start();
        // Pass the unique ID to your slide template
        include plugin_dir_path(__FILE__) . 'blocks/slide.php';
        return ob_get_clean();
    }
}

$bettorsDenSlide = new BettorsDenSlide();

class BettorsDenVideoSlide
{
    function __construct()
    {
        add_action('init', array($this, 'bettorsDenVideoSlideAssets'));
    }

    function bettorsDenVideoSlideAssets()
    {
        wp_register_script(
            'bettors-den-video-slide-script',
            plugin_dir_url(__FILE__) . 'dist/videoSlide.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n')
        );
        register_block_type('bettors-den-slider/video-slide', array(
            'editor_script' => 'bettors-den-video-slide-script',
            'render_callback' => array($this, 'bettorsDenVideoSlideRender')
        ));
    }

    function bettorsDenVideoSlideRender($attributes, $contents)
    {
        // Generate a unique ID for each video slide instance
        $unique_id = 'bettors-den-video-slide-' . uniqid();

        ob_start();
        // Pass the unique ID to your video slide template
        include plugin_dir_path(__FILE__) . 'blocks/videoSlide.php';
        return ob_get_clean();
    }
}

$bettorsDenVideoSlide = new BettorsDenVideoSlide();