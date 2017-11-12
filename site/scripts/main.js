/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors: Mladen Mijatov
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile()) {
		Site.mobile_menu = new Caracal.MobileMenu();

		// image slider for food samples mobile
		Site.gallery = new Caracal.Gallery.Slider(1, false);
		Site.gallery
			.images.set_container(document.querySelector('section#food_samples div'))
			.images.set_center(true)
			.controls.attach_next(document.querySelector('section#food_samples a.next'))
			.controls.attach_previous(document.querySelector('section#food_samples a.previous'))
			.controls.set_auto(3000)
			.images.update();


	}

	if (!Site.is_mobile()) {
		// image slider for food samples desktop
		Site.gallery = new Caracal.Gallery.Slider(4, false);
		Site.gallery
			.images.set_container(document.querySelector('section#food_samples div'))
			.images.set_center(true)
			.images.set_spacing(10)
			.controls.attach_next(document.querySelector('section#food_samples a.next'))
			.controls.attach_previous(document.querySelector('section#food_samples a.previous'))
			.controls.set_auto(3000)
			.images.update();
	}

	Site.image_loader = new Caracal.Gallery.Loader();
	Site.image_loader
		.add_gallery(Site.gallery)
		.set_thumbnail_size(300)
		.load_by_group_text_id('food_samples')
		.add_callback(function() {
			Site.lightbox = new LightBox('section#food_samples a.image', true, false, true);
	});


	Site.submit_buttons = document.querySelectorAll('div.controls button.submit');
	for(var i=0; i < Site.submit_buttons.length; i++) {
		Site.submit_buttons[i].innerHTML = 'Send Form';
	}
};


// connect document `load` event with handler function
$(Site.on_load);
