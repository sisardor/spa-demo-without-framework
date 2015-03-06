
// My custom JQuery ajax wrapper
function BBClient (url) {
	this.baseURL = 'http://localhost:3000/';
	if(arguments.length === 1) {
		this.baseURL = url;
	}

	//PRIVATE
	//define client to access this within other scopes
	var client = this;

	//private API request method for wrappers
	var apiRequest = function(requestPath, requestMethod, requestData) {
		var responseData;
		var endpointURL = client.baseURL + requestPath;
        responseData = $.ajax({
            url: endpointURL,
            jsonp : 'callback',
            dataType: 'jsonp'
        });
		return responseData
	}


	client.products = {};
	client.products.all = function(){
		return apiRequest('api/v2/json/search?categoryid=departments', 'GET');
	};
	client.products.show = function(sku) {
		return apiRequest('api/v2/json/product/' + sku,'GET')
	}
	client.products.search = function(queryParameter){ 
		return apiRequest('api/v2/json/search', 'GET', queryParameter);
	};
	client.products.categories = function(){
		return apiRequest('api/v2/json/category/Departments', 'GET');
	};
}