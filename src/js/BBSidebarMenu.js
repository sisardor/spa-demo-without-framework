/* global Handlebars, dome */
(function () {
	'use strict';

	// Side menu
	window.BBSidebarMenu = (function(dome){
		// PRIVATE 
		var myClass = {},
			template, 
			html,
			menu_rows = [];

		//Menu click listener, 
		function dynamicEvent() {
			var categoryId = this.dataset.categoryId;

			menu_rows.forEach(function(row){
				if( row.attr('data-category-id') === categoryId ) {
					row.addClass('active');
				} else {
					row.removeClass('active');
				}
			});

		    window.location.hash = '/category/' + categoryId;
		}

		//makes menu item active if window.location.hash has category  
		function makeMenuActive(){
			var hash = window.location.hash.split('/');
			if(hash && hash[1] === 'category') {
				var categoryId = hash[2];
				for (var i = 0; i < menu_rows.length; i++) {
					if( menu_rows[i].attr('data-category-id') === categoryId ) {
						menu_rows[i].addClass('active');
						break;
					}
				}
			}
		} 


		// PUBLIC 
		//initialize template with Handlebars.js
		myClass.init = function(templateID){
			var source = dome.get( templateID || '#tmpl-sidebar-menu' )[0].innerHTML;
			template = Handlebars.compile(source);
		};



		myClass.bindUIActions = function(categoryList){
			var items = categoryList.find('li');
			for (var i = 0; i < items.length; i++) {
				items[i].onclick = dynamicEvent;
			}
		};



		//pass the data to Handlebars' complite template and display
		myClass.renderUI = function(data) {
			var sidebar = dome.get('#sidebar__menu');
			html = template(data.subCategories);
			sidebar.append(html);

			var arr = sidebar.find('li');
			for (var i = 0; i < arr.length; i++) {
				menu_rows.push(dome.get(arr[i]));
			}

			myClass.bindUIActions(sidebar);
			makeMenuActive();
		};
		return myClass;
	}(dome));
}());