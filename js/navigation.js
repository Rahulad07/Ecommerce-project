/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
	const siteNavigation = document.getElementById( 'site-navigation' );

	// Return early if the navigation doesn't exist.
	if ( ! siteNavigation ) {
		return;
	}

	const button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];

	// Return early if the button doesn't exist.
	if ( 'undefined' === typeof button ) {
		return;
	}

	const menu = siteNavigation.getElementsByTagName( 'ul' )[ 0 ];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( ! menu.classList.contains( 'nav-menu' ) ) {
		menu.classList.add( 'nav-menu' );
	}

	// Toggle the .toggled class and the aria-expanded value each time the button is clicked.
	button.addEventListener( 'click', function() {
		siteNavigation.classList.toggle( 'toggled' );

		if ( button.getAttribute( 'aria-expanded' ) === 'true' ) {
			button.setAttribute( 'aria-expanded', 'false' );
		} else {
			button.setAttribute( 'aria-expanded', 'true' );
		}
	} );

	// Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
	document.addEventListener( 'click', function( event ) {
		const isClickInside = siteNavigation.contains( event.target );

		if ( ! isClickInside ) {
			siteNavigation.classList.remove( 'toggled' );
			button.setAttribute( 'aria-expanded', 'false' );
		}
	} );

	// Get all the link elements within the menu.
	const links = menu.getElementsByTagName( 'a' );

	// Get all the link elements with children within the menu.
	const linksWithChildren = menu.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

	// Toggle focus each time a menu link is focused or blurred.
	for ( const link of links ) {
		link.addEventListener( 'focus', toggleFocus, true );
		link.addEventListener( 'blur', toggleFocus, true );
	}

	// Toggle focus each time a menu link with children receive a touch event.
	for ( const link of linksWithChildren ) {
		link.addEventListener( 'touchstart', toggleFocus, false );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		if ( event.type === 'focus' || event.type === 'blur' ) {
			let self = this;
			// Move up through the ancestors of the current link until we hit .nav-menu.
			while ( ! self.classList.contains( 'nav-menu' ) ) {
				// On li elements toggle the class .focus.
				if ( 'li' === self.tagName.toLowerCase() ) {
					self.classList.toggle( 'focus' );
				}
				self = self.parentNode;
			}
		}

		if ( event.type === 'touchstart' ) {
			const menuItem = this.parentNode;
			event.preventDefault();
			for ( const link of menuItem.parentNode.children ) {
				if ( menuItem !== link ) {
					link.classList.remove( 'focus' );
				}
			}
			menuItem.classList.toggle( 'focus' );
		}
	}
}() );

// //*************** catagories ************
// document.addEventListener("DOMContentLoaded", function () {
// 	let btnToggle = document.querySelector("#btn-toggle");
// 	let rowCards = document.querySelector(".row-cards");
// 	let mainRow = document.querySelector(".main-row");
// 	let colCardAll = document.querySelectorAll(".col-card");
// 	let cardAll = document.querySelectorAll(".card");

// 	btnToggle.addEventListener("click", function () {
// 		if (!rowCards.classList.contains("is-moving")) {
// 			mainRow.classList.toggle("no-menu");

// 			for (i = 0; i < cardAll.length; i++) {
// 				let clone = cardAll[i].cloneNode(true);
// 				clone.classList.add("clone");
// 				cardAll[i].parentElement.insertBefore(clone, cardAll[i]);

// 				let top = clone.getBoundingClientRect().top;
// 				let left = clone.getBoundingClientRect().left;
// 				let width = clone.getBoundingClientRect().width;
// 				let height = clone.getBoundingClientRect().height;

// 				clone.style.position = "fixed";
// 				clone.style.top = top + "px";
// 				clone.style.left = left + "px";
// 				clone.style.width = width + "px";
// 				clone.style.height = height + "px";
// 			}

// 			document.querySelector(".col-menu").classList.toggle("col-0");
// 			document.querySelector(".col-menu").classList.toggle("col-4");
// 			document.querySelector(".col-cards").classList.toggle("col-8");
// 			document.querySelector(".col-cards").classList.toggle("col-12");
// 			for (i = 0; i < colCardAll.length; i++) {
// 				colCardAll[i].classList.toggle("col-4");
// 				colCardAll[i].classList.toggle("col-6");
// 			}
// 			rowCards.classList.add("is-moving");

// 			let cardCloneAll = document.querySelectorAll(".card.clone");
// 			for (i = 0; i < cardCloneAll.length; i++) {
// 				let top = cardAll[i].getBoundingClientRect().top;
// 				let left = cardAll[i].getBoundingClientRect().left;
// 				let width = cardAll[i].getBoundingClientRect().width;
// 				let height = cardAll[i].getBoundingClientRect().height;

// 				cardCloneAll[i].style.top = top + "px";
// 				cardCloneAll[i].style.left = left + "px";
// 				cardCloneAll[i].style.width = width + "px";
// 				cardCloneAll[i].style.height = height + "px";
// 			}

// 			setTimeout(function () {
// 				rowCards.classList.remove("is-moving");
// 				for (i = 0; i < cardCloneAll.length; i++) {
// 					cardCloneAll[i].remove();
// 				}
// 			}, 1000);
// 		}
// 	});

// 	//simulate click for thumbnail
// 	setTimeout(function () {
// 		document.getElementById("btn-toggle").click();
// 	}, 500);
// 	setTimeout(function () {
// 		document.getElementById("btn-toggle").click();
// 	}, 2500);
// });

