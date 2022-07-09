/* eslint-disable linebreak-style */
import MdgNavigationMenu from '../../node_modules/wp-midgardsormen/js/modules/mdg-navigation/mdg-navigation';
import Overlay from '../../node_modules/wp-midgardsormen/js/modules/mdg-overlay';
import Drawer from '../../node_modules/wp-midgardsormen/js/modules/mdg-drawer';

window.addEventListener( 'load', ( ) => {
	new Overlay(); 

	document.querySelectorAll('.js-drawer').forEach(btn =>{
		const id = btn.dataset.drawer;
		const drawer = new Drawer(id);
		btn.addEventListener('click', (e) => {
			drawer.open();
		})
	})
	const editorButtons = document.querySelectorAll('.wp-block-button__link');
	editorButtons.forEach((button)=>{
		if (!button.href){
			button.setAttribute('role','button');
			button.setAttribute('tabindex','0');
			button.setAttribute('aria-pressed','false');
		}
	})
	Array.from(document.querySelectorAll('.mdg-toggle')).forEach((toggle, i) => {
		
		const toggleInput = toggle.querySelector('input');
		console.log('toggleInput', toggleInput)
		const toggleLabel = toggle.querySelector('label');
		const Id = toggleInput.id ? toggleInput.id : `toggle-${i}`;
		toggleInput.id = Id;
		toggleLabel.setAttribute('for',Id);

	  }) 

	

	const mainMenuComponent = document.querySelectorAll( `[id^="mdg-component-main-navigation"]` );
	
	mainMenuComponent.forEach( ( menu ) => {
		const mainNavigation = new MdgNavigationMenu( menu );
	} );

} );
