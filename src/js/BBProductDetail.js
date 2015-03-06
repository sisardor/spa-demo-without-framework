/*global Handlebars, $, dome */
(function () { 
	'use strict';
	
	// Product detail class, it will open modal and display detailed view
	window.BBProductDetail = (function(dome){
		// PRIVATE 
		var myClass = {},
			template,
			html;



		// PUBLIC 
		//initialize template with Handlebars.js
		myClass.init = function(templateID){
			var source = dome.get(templateID || '#bb-detailed-view')[0].innerHTML;
			template = Handlebars.compile(source);


		};

		myClass.CloseModal = function(){
			dome.get('#product__detail').removeClass('md-show');
	        window.history.replaceState( {}, 'title 1', window.location.hash.split('?')[0]);
	        $(window).trigger('hashchange');
		};


		myClass.bindUIActions = function(modal){
			var button = modal.find('button');
			button[0].onclick = myClass.CloseModal;
		};


		//pass the data to Handlebars' complite template and display
		myClass.renderUI = function(data){
			var modal = dome.get('#product__detail');
			html = template(data);
			modal.append(html);
			myClass.bindUIActions(modal);

			// Delaying for css animation
			setTimeout(function(){
				dome.get('#product__detail').addClass('md-show');
			}, 10);
		};

		return myClass;
	}(dome));
}());