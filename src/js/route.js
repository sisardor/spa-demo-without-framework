/*global $, BBProducts, BBProductDetail, BBSidebarMenu, bbClient */
'use strict';

$( document ).ready(function() {
    // Initialize all components
    BBProducts.init();
    BBProductDetail.init();
    BBSidebarMenu.init();

    // Get category from BestBuy API and render it
    var sidebarMenu_Json = bbClient.products.categories();
    sidebarMenu_Json.done(function(response){
    	BBSidebarMenu.renderUI(response);
    });


    // Event for url change
    $(window).on('hashchange', function () {
        render( window.location.hash );
    }).trigger('hashchange');


    // Simple routing implementation
    function render(_hash) {
    	var hash = _hash.slice(1).split('/');
        if(hash[0]==='') hash.splice(0,1);

    	var queryString = (hash.length) ? hash[hash.length-1] : '';
        var query = parseQueryString( queryString.split('?')[1] );
        var path = hash.map(function(item){
        	return item.split('?')[0];
        });

        var url = '';
        if(!query && path[0] === 'category' && path[1] !== '') {
        	url = '/category/{id}';
        } else if( query && query.sku ) {
        	url = '/category/{id}?sku={sku}';
        }
        else {
        	url = '';
        }

      	function parseQueryString( queryString ) {
      		if(!queryString) return null;
    	    var params = {}, queries, temp, i, l;
    	    // Split into key/value pairs
    	    queries = queryString.split('&');
    	 
    	    // Convert the array of strings into an object
    	    for ( i = 0, l = queries.length; i < l; i++ ) {
    	        temp = queries[i].split('=');
    	        params[temp[0]] = temp[1];
    	    }
    	    return params;
    	}

    	function homeController(){

    		var products_Json = bbClient.products.all();
    		products_Json.done(function(response) {
    			BBProducts.renderUI(response);
    		});
    	}

    	function productListController(){

    		var products_Json = bbClient.products.search({ categoryid : path[1] });
    		products_Json.done(function(response) {
    			BBProducts.renderUI(response);
    		});

    	}

    	function productDetailController(){

    		var singleProduct_Json = bbClient.products.show( query.sku );
    		singleProduct_Json.done(function(response){
    			BBProductDetail.renderUI(response);
    		});

    	}

    	var	map = {
    		'': homeController,
    		'/category/{id}':productListController,
    		'/category/{id}?sku={sku}': productDetailController
    	};

    	if(map[url]){
    		map[url]();
    	}
    }


});