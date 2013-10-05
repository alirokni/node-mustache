// main.js and can be relative to the template

var  sys = require('sys'),
    http = require('http'),
      fs = require('fs'),
Mustache = require('../../node_modules/mustache'),
    path = require('path'),
template = "./mysite.html";  // relative to its execution path

  var siteData = JSON.parse(fs.readFileSync("./site-dataModel.json", "utf8"));
  
http.createServer(function (request, response) {

  var filePath = '..' + request.url;
      if (filePath == './') {
          filePath = './mysite.html';
      }
  var extname = path.extname(filePath); // .html
  var contentType = 'text/html';
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
      }

      fs.exists(filePath, function(exists) {
        if (exists) {
          fs.readFile(filePath, function(error,template) {
            if (error) {
              response.writeHead(500);
              response.write(err + "\n");
              response.end();
              return;
            } else {
              response.writeHead(200, { 'Content-Type': contentType });
              response.write(Mustache.to_html(template.toString(), siteData, "utf8"));
              response.end();
            }
          });
        } else {
          console.log("not exists: " + filePath);
          response.writeHead(404, {'Content-Type': 'text/plain'});
          response.write('404 Not Found\n');
          response.end();
          return;
        }
      });
    }).listen(1337);
    console.log('Server running at http://127.0.0.1:1337/');