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
        if (err) throw err;
        results = data;
      });
    } else {
      url = req.url;
      fs.readFile(archive.paths.archivedSites + url, { encoding: 'utf-8' }, (err, data) => {
        if (err) throw err;
        results = data;
        // console.log(data);
      });
    }


    res.writeHead(statusCode, headers);
    console.log(results);
    res.end(results);
  }


  //res.end(archive.paths.list);
  
};
