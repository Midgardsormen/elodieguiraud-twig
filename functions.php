<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */



/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types() {

	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {

	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context = Timber::get_context();
		$context['custom_logo_url'] = wp_get_attachment_image_url(get_theme_mod('custom_logo'));
		if ( is_active_sidebar( 'custom-side-bar' ) ) {
			$context['custom_side_bar'] = Timber::get_widgets( 'custom-side-bar' );
		}
		$context['foo']   = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::context();';
		$context['primary_menu']  = new Timber\Menu('primary');
		$context['top_menu'] = new Timber\Menu('top-menu');
		$context['footer_menu'] = new Timber\Menu('footer-menu');
		$context['site']  = $this;
		return $context;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
	}

	/** This Would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}

}

new StarterSite();
	

// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'primary' => esc_html__( 'Primary', 'custom-base-theme' ),
			'top-menu' => esc_html__( 'Top menu', 'custom-base-theme' ),
			'footer-menu' => esc_html__( 'Footer menu', 'custom-base-theme' ),
		)
	);


 /**
 * Enqueue scripts and styles.
 */
function custom_base_theme_scripts() {
	wp_enqueue_script( 'custom-base-theme-global', get_template_directory_uri() . '/static/js/global.js', array(), false, true );
	add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);
}

function add_type_attribute($tag, $handle, $src) {
    // if not your script, do nothing and return original $tag
    if ( 'custom-base-theme-global' !== $handle ) {
        return $tag;
    }
    // change the script tag by adding type="module" and return it.
    $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
    return $tag;
}
add_action( 'wp_enqueue_scripts', 'custom_base_theme_scripts' );

add_action( 'wp_enqueue_scripts', 'load_dashicons_front_end' );

function load_dashicons_front_end() {
	wp_enqueue_style( 'dashicons' );
}
add_theme_support('custom-logo');

function my_custom_sidebar() {
	register_sidebar(
		array (
			'name' => __( 'Social icon Area', 'your-theme-domain' ),
			'id' => 'custom-side-bar',
			'description' => __( 'This is the custom sidebar that you registered using the code snippet. You can change this text by editing this section in the code.', 'your-theme-domain' ),
			'before_widget' => '<div class="social-icon-container">',
			'after_widget' => "</div>",
			'before_title' => '<h3 class="widget-title">',
			'after_title' => '</h3>',
		)
	);
}
add_action( 'widgets_init', 'my_custom_sidebar' );


// contact form 7 custom tags : 
add_action( 'wpcf7_init', 'wpcf7_add_form_tag_toggle' );
function wpcf7_add_form_tag_toggle() {
	// Add shortcode for the form [toggle]
	wpcf7_add_form_tag( 
		array( 'toggle', 'toggle*'),
		'wpcf7_current_url_form_tag_toggle_handler',
		array(
			'name-attr' => true
		)
	);
}
// Parse the shortcode in the frontend
function wpcf7_current_url_form_tag_toggle_handler( $tag ) {
	$class = wpcf7_form_controls_class( $tag->type, 'wpcf7-wc_order' );
	$value = (string) reset( $tag->values );
	return '<div class="mdg-toggle">
				<input type="checkbox" name="'.$tag['name'].'" id="'.$tag->get_id_option().'" class="mdg-toggle__input '.$tag->get_class_option( $class ).'" value="'.$value.'" />
				<label class="mdg-toggle__label" for="'.$tag->get_id_option().'">
					<span class="mdg-toggle__toggle">&nbsp;</span>'.$value.'</label>
			</div>';
}