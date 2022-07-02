/* eslint-disable linebreak-style */
import MdgNavigationMenu from '../../node_modules/wp-midgardsormen/js/modules/mdg-navigation/mdg-navigation';

window.addEventListener( 'load', ( ) => {
	Array.from(document.querySelectorAll('.mdg-toggle')).forEach((toggle, i) => {
		
		const toggleInput = toggle.querySelector('input');
		console.log('toggleInput', toggleInput)
		const toggleLabel = toggle.querySelector('label');
		const Id = toggleInput.id ? toggleInput.id : `toggle-${i}`;
		toggleInput.id = Id;
		toggleLabel.setAttribute('for',Id);

	  }) 

	const mdgOverlay = document.querySelector( '.mdg-overlay' );
	const siteBody = document.querySelector( 'body' );
	const activeOverlayButtons = document.querySelectorAll( '.js-active-overlay' );
	activeOverlayButtons.forEach( ( e ) => {
		e.addEventListener( 'click', () => {
			if ( mdgOverlay ) {
				mdgOverlay.classList.toggle( 'active' );
				siteBody.classList.toggle( 'fixed' );
			}
		} );
	} );
	const removeOverlayButtons = document.querySelectorAll( '.js-remove-overlay' );
	removeOverlayButtons.forEach( ( e ) => {
		e.addEventListener( 'click', () => {
			if ( mdgOverlay ) {
				mdgOverlay.classList.remove( 'active' );
				siteBody.classList.remove( 'fixed' );
			}
		} );
	} );
	mdgOverlay.addEventListener( 'click', ( e ) => {
		e.target.classList.remove( 'active' );
		siteBody.classList.remove( 'fixed' );
		const allActiveElements = document.querySelectorAll( '.active' );
		allActiveElements.forEach( ( elm ) => {
			elm.classList.remove( 'active' );
		} );
	} );

	const mainMenuComponent = document.querySelectorAll( `[id^="mdg-component-main-navigation"]` );
	
	mainMenuComponent.forEach( ( menu ) => {
		console.log('mainMenuComponent', menu)
		const mainNavigation = new MdgNavigationMenu( menu );
	} );

} );
