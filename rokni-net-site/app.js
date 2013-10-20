// main.js and can be relative to the template

var  sys = require('sys'),
    http = require('http'),
      fs = require('fs'),
Mustache = require('../node_modules/mustache'),
    path = require('path'),
template = '';

// Model, json data,  site content
var siteData = JSON.parse(fs.readFileSync("release/js/site-dataModel.json", "utf8"));
  
http.createServer(function (request, response) {

  var filePath = request.url;  // relative to its execution path
  if ( filePath.indexOf('html') != -1 ) { 
	      filePath = 'release/view' + filePath; // checking html
	} else {
        filePath = 'release/' + (request.url).substring(1);  // To remove extra / in path for non html files
	}
	
  var extname = path.extname(filePath),
      contentType = 'text/html;charset=utf-8;';

      switch (extname) {
          case '.js':
            contentType = 'text/javascript';
          break;
          case '.json':
            contentType = 'text/json';
          break;
          case '.css':
            contentType = 'text/css';
          break;
          case '.png':
            contentType = 'image/png';
          break;
          case '.gif':
            contentType = 'image/gif';
          break;
          case '.svg':
            contentType = 'image/svg+xml';
          break;
      }

      fs.exists(filePath, function(exists) {
        if (exists) {
          fs.readFile(filePath, function(error,template) {
            if (error) {
      			  response.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
              response.write('500 - Interanl Service Error \n' + error );
              response.end();
              return;
            } else {
              response.writeHead(200, { 'Content-Type': contentType});
              if( contentType === 'image/png' || contentType === 'image/gif' ){
			  	      response.write(new Buffer(template));
              } else {
              	response.write(Mustache.to_html(template.toString(), siteData, "utf8"));
              }
			        response.end();
              return;
            }
          });
        } else {
          console.log("not exists: " + filePath);
          response.writeHead(404, {'Content-Type': 'text/plain;charset=utf-8'});
          response.write('404 Not Found\n');
          response.end();
          return;
        }
      });
    }).listen(1337);
    console.log('Server running at http://127.0.0.1:1337/');