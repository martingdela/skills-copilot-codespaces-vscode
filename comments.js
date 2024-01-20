// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server
var server = http.createServer(function(request,response){
    // 2.1 get url
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    // 2.2 remove first slash
    if(resource == '/'){
        resource = '/index.html';
    }
    // 2.3 read file from web folder
    var resourcePath = '.' + resource;
    console.log(resourcePath);
    fs.readFile(resourcePath, 'utf-8', function(error, data){
        if(error){
            response.writeHead(500, {'Content-Type':'text/html'});
            response.end('500 Internal Server '+error);
        }else{
            response.writeHead(200, {'Content-Type':'text/html'});
            response.end(data);
        }
    });
});