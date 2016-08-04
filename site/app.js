// main.js and can be relative to the template

var  sys = require('util'),
     http = require('http'),
       fs = require('fs'),
 Mustache = require('mustache'),
     path = require('path'),
 template = '',
appServer = '';

// Model, json data,  site content
var siteData = JSON.parse(fs.readFileSync("release/js/site-dataModel.json", "utf8"));
  
appServer = http.createServer(function (request, response) {

  var filePath = request.url;  // relative to its execution path

  if ( filePath.indexOf('html') != -1 ) { 
    filePath = 'release/view' + filePath; // checking html
  } else {
    filePath = 'release/' + (request.url).substring(1);  // To remove extra / in path for non html files
  }

  var fileExtName = path.extname(filePath),
      contentType = {
        'html': 'text/html',
        'js':   'text/javascript',
        'css':  'text/css',
        'json': 'text/json',
        'png':  'image/png',
        'svg':  'image/svg+xml',
        'ico':  'image/x-icon',
        'gif':  'image/gif'
      },
      contentType = contentType[fileExtName.substring(1)] || 'text/html';

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
              if( contentType === 'image/png' || contentType === 'image/x-icon' ){
                response.write(new Buffer(template));
              } else {
                response.write(Mustache.render(template.toString(), siteData, "utf8"));
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
    });

appServer.listen(1337, "localhost");
console.log('Server running at http://127.0.0.1:1337/');
