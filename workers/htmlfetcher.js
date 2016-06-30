// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('../helpers/archive-helpers');


var request = require('request');

request({
  uri: 'http://www.sitepoint.com',
}, function(error, response, body) {
  console.log(body);
});