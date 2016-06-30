var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var results = [];

  fs.readFile(exports.paths.list, { encoding: 'utf-8' }, (err, data) => {
    results = data.split('\n');
    callback(results);
  });

};

exports.isUrlInList = function(target, callback) {

  var results = [];
  var exists = false;

  fs.readFile(exports.paths.list, { encoding: 'utf-8' }, (err, data) => {
    results = data.split('\n');

    for (var url of results) {
      if (url === target) {
        exists = true;
      }
    }

    if (!exists) {
      callback(target);      
    }

  });

};

exports.addUrlToList = function(target, callback) {

  var results = [];

  fs.readFile(exports.paths.list, { encoding: 'utf-8' }, (err, data) => {

    results = data.split('\n').slice(0, results.length - 1);
    results.push(target);
    results = results.join('\n');

    fs.writeFile(exports.paths.list, results + '\n', { encoding: 'utf-8'}, (err) => {

      if (err) {
        console.log('error');
        throw error;
      } else {
        console.log('success');

      }

      // callback();
    });
    
  });

};

exports.isUrlArchived = function(target, callback) {
  var exists = false;

  fs.readdir(exports.paths.archivedSites, (err, files) => {
    for (var file of files) {
      if (target === file) {
        exists = true;
      }
    }

    return exists;
    //callback(exists);

  });
};

exports.downloadUrls = function(urlArray) {

  urlArray.forEach((item) => {

    console.log(item, 'heres my url');

    request('http://' + item, function(err, response, body) {
      if (err) { console.log('errrrrror'); }
      console.log(body, 'heres my url againnnn');
      
      fs.writeFile(exports.paths.archivedSites + '/' + item, body, { encoding: 'utf-8'}, (err) => {
        if (err) {
          console.log(`${item} resulted in an error`);
          console.log('error');
          //throw error;
        } else {
          console.log('successsssssssssssss');
        } 
      });
    }
  );

  });
};
