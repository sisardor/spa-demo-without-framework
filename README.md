# spa-demo-without-framework
Single page app without javascript framework

You need to run node proxy server and open http://localhost:3002
```
$ node server.js
```
all API calls are going through proxy server, because bestbuy.ca server is not allowing ajax call, 
becouse server needs CORS (Cross-Origin Resource Sharing) enabled
