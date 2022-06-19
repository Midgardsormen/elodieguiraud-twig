/* eslint-disable no-nested-ternary */
/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */

class MainNavigationMenu {
	constructor( component ) {
		this.component = component;
		this.jsActiveMenusButtons = component.querySelectorAll( '.js-active-menu' );
		this.init();
	}
	init() {
		this.jsActiveMenusButtons.forEach( ( menuButton ) => {
			const mainNavigationToggleButton = new MainNavigationToggle( menuButton );
		} );
	}
}
class MainNavigationToggle {
	constructor( component ) {
		this.component = component;
		this.classToTarget = component.dataset.listtarget;
		this.menuToTarget = this.getClosestParent( component ).querySelector( `.${ this.classToTarget }` );
		this.ariaExtandedValue = component.getAttribute( 'aria-expanded' ) === 'true' ? 'false' : 'true';
		this.parentSiblings = this.getSiblings( this.getClosestParent( component ) );

		this.init();
	}
	init() {
		this.component.addEventListener( 'click', ( ) => {
			this.getClosestParent( this.component ).classList.toggle( 'active' );
			this.toggleBtnAttributes();
			this.menuToTarget.classList.toggle( 'active' );
			this.cleanAllChildrenAttributes();
			this.cleanAllSiblingsAttributes();
			this.parentSiblings = this.getSiblings( this.getClosestParent( this.component ) );
		} );
	}
	getClosestParent( e, liOnly ) {
		return e.closest( 'li' ) ? e.closest( 'li' ) : ! liOnly ? e.closest( 'div.base-main-navigation' ) : false;
	}
	toggleBtnAttributes() {
		this.component.classList.toggle( 'active' );
		this.component.setAttribute( 'aria-expanded', this.ariaExtandedValue );
		this.ariaExtandedValue = ! this.ariaExtandedValue;
	}
	cleanAllChildrenAttributes() {
		this.menuToTarget.querySelectorAll( ' ul ' ).forEach( ( subMenu ) => {
			this.cleanAllAttributes( subMenu );
		} );
	}
	cleanAllSiblingsAttributes() {
		this.parentSiblings.forEach( ( e ) => {
			this.cleanAllAttributes( e );
		} );
	}
	cleanAllAttributes( e ) {
		e.classList.remove( 'active' );
		const closestParent = this.getClosestParent( e, true );
		if ( closestParent ) {
			closestParent.classList.remove( 'active' );
			const closestParentBtn = closestParent.querySelector( ' button ' );
			if ( closestParentBtn ) {
				closestParentBtn.classList.remove( 'active' );
				closestParentBtn.setAttribute( 'aria-expanded', 'false' );
			}
			const closestParentSubMenu = closestParent.querySelector( ' ul ' );
			if ( closestParentSubMenu ) {
				closestParentSubMenu.classList.remove( 'active' );
			}
		}
	}

	getSiblings( element ) {
		// for collecting siblings
		const siblings = [];
		// if no parent, return no sibling
		if ( ! element.parentNode ) {
			return siblings;
		}
		// first child of the parent node
		let sibling = element.parentNode.firstChild;

		// collecting siblings
		while ( sibling ) {
			if ( sibling.nodeType === 1 && sibling !== element ) {
				siblings.push( sibling );
			}
			sibling = sibling.nextSibling;
		}
		return siblings;
	}
}

window.addEventListener( 'load', ( ) => {
	const mainMenuComponent = document.querySelectorAll( `[id^="base-component-main-navigation"]` );
	mainMenuComponent.forEach( ( menu ) => {
		const mainNavigation = new MainNavigationMenu( menu );
	} );
	const jsActiveMenusButtons = document.querySelectorAll( '.js-active-menu' );
} );
