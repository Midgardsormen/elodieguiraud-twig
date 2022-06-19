/* eslint-disable linebreak-style */

window.addEventListener( 'load', ( ) => {
	const baseOverlay = document.querySelector( '.base-overlay' );
	const siteBody = document.querySelector( 'body' );
	const activeOverlayButtons = document.querySelectorAll( '.js-active-overlay' );
	activeOverlayButtons.forEach( ( e ) => {
		e.addEventListener( 'click', () => {
			if ( baseOverlay ) {
				baseOverlay.classList.toggle( 'active' );
				siteBody.classList.toggle( 'fixed' );
			}
		} );
	} );
	const removeOverlayButtons = document.querySelectorAll( '.js-remove-overlay' );
	removeOverlayButtons.forEach( ( e ) => {
		e.addEventListener( 'click', () => {
			if ( baseOverlay ) {
				baseOverlay.classList.remove( 'active' );
				siteBody.classList.remove( 'fixed' );
			}
		} );
	} );
	baseOverlay.addEventListener( 'click', ( e ) => {
		e.target.classList.remove( 'active' );
		siteBody.classList.remove( 'fixed' );
		const allActiveElements = document.querySelectorAll( '.active' );
		allActiveElements.forEach( ( elm ) => {
			elm.classList.remove( 'active' );
		} );
	} );
} );
