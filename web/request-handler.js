var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httphelpers = require('./http-helpers');

var fs = require('fs');

var headers = httphelpers.headers;

var results = '';

exports.handleRequest = function (req, res) {
  
  var statusCode;



  if (req.method === 'GET') {
    statusCode = 200;

    var url;

    if (req.url === '/') {
      url = '/index.html';
      fs.readFile(archive.paths.siteAssets + url, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          statusCode = 404;
          res.writeHead(statusCode, headers);
          res.end(results);
          // console.log(results, statusCode);
        } else {
          results = data;
          res.writeHead(statusCode, headers);
          // console.log(results, statusCode);
          res.end(results);             
        }
      });
    } else {
      url = req.url;
      fs.readFile(archive.paths.archivedSites + url, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          statusCode = 404;
          res.writeHead(statusCode, headers);
          res.end(results);
          // console.log(results, statusCode);
        } else {
          results = data;
          res.writeHead(statusCode, headers);
          // console.log(results, statusCode);
          res.end(results);        
        }
      });
    }

  }

  if (req.method === 'POST') {

    url = req.url;
    
    var newText = '';

    req.on('data', (chunk) => {
      newText += chunk.toString('utf-8').substring(4);
    });

    req.on('end', function() {

      // if file is in the sites folder
        // read the file
        // append the file to the DOM

      // else check if the file is listed in the sites.txt
        // add file to the folder

      archive.isUrlInList(newText, archive.addUrlToList);      
      archive.readListOfUrls(archive.downloadUrls);
      res.writeHead(302, headers);
      res.end('website added');

    });

    // req.on('end', function () {
    //   fs.writeFile(archive.paths.list, newText + '\n', { encoding: 'utf-8' }, (err) => {

    //     if (err) {
    //       statusCode = 400;
    //       res.writeHead(statusCode, headers);
    //       res.end();
    //     } else {
    //       statusCode = 302;
    //       res.writeHead(statusCode, headers);
    //       res.end('website added');
    //     }

    //   });
    // });
    

  }


  //res.end(archive.paths.list);
  
};
