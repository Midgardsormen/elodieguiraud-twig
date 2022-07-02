<?php
/**
 * Template Name: Blade type page
 * Description: A Page Template with blades sections.
 */

$context = Timber::context();

$timber_post     = new Timber\Post();
$context['post'] = $timber_post;
Timber::render( array( 'blade-' . $timber_post->post_name . '.twig', 'blade.twig' ), $context );
