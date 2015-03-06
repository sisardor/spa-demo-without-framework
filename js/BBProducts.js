(function () {
	//BBProducts will display data in li
	window.BBProducts = (function(dome){
		// PRIVATE 
		var myClass = {},
			template,
			html;

		function dynamicEvent(e) {
			var sku = this.dataset.sku;
			var hash = window.location.hash.slice(1);
			var currentHash;
			if(hash === "" || hash==="/") {
				currentHash = '#/';
			} else {
				hash = hash.split('/');
		    	if(hash[0]==='') hash.splice(0,1);
				hash[2] = 'product';
		    	hash[3] = sku;
				currentHash = '#/' + hash[0] +'/' + hash[1].split('?')[0];
			}

			window.history.pushState({sku: sku}, "title 1", currentHash + "?sku="+sku);
			$(window).trigger('hashchange');
		}


		// PUBLIC 
		//initialize template with Handlebars.js
		myClass.init = function(templateID){
			var source = dome.get( templateID || '#bb-card' )[0].innerHTML;
			template = Handlebars.compile(source);
			return;
		};



		//adding click event to display product detail in modal
		myClass.bindUIActions = function(productList){
			var items = productList.find('li');
			for (var i = 0; i < items.length; i++) {
				items[i].onclick = dynamicEvent
			};
		};



		//pass the data to Handlebars' complite template and display
		myClass.renderUI = function(data){
			//console.log(data.products);
			html = template(data.products);

			var list = dome.get('#product__listing');
			list.append(html);
			myClass.bindUIActions(list);
		};

		return myClass;
	}(dome));

}());