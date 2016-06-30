// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var cheerio = require('cheerio');


// exports.appendHtml = function(sourceFile) {

//   if (archive.isUrlArchived(sourceFile)) {

//     var body;

//     fs.readFile(archive.paths.archivedSites + '/' + sourceFile, { encoding: 'utf-8' }, (err, data) => {
      
//       body = data;

//     });

//     return body;

//   }


// };