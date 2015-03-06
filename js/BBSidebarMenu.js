(function () {
	// Side menu
	window.BBSidebarMenu = (function(dome){
		// PRIVATE 
		var myClass = {},
			template, 
			html;

		function dynamicEvent(e) {
			var categoryId = this.dataset.categoryId;
		    window.location.hash = '/category/' + categoryId;
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
				items[i].onclick = dynamicEvent
			};
		};



		//pass the data to Handlebars' complite template and display
		myClass.renderUI = function(data) {
			var sidebar = dome.get('#sidebar__menu');
			html = template(data.subCategories);

			sidebar.append(html);
			myClass.bindUIActions(sidebar);
		};
		return myClass;
	}(dome));
}());