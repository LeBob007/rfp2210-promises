/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
// var fs = require('node:fs/promises');
var Promise = require('bluebird');

var Promisification = require('./promisification.js');
var PromiseConstructor = require('./promiseConstructor.js');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  // PromiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
  //   .then(data => {
  //     Promisification.getGitHubProfileAsync(data)
  //       .then(data => {
  //         data = JSON.stringify(data);
  //         fs.writeFile(writeFilePath, data)
  //           .then(data => {
  //             console.log(data);
  //           });
  //       })
  //       .catch(err => {
  //         console.log('Failed to GET GitHub user data!');
  //       });
  //   })
  //   .catch(err => {
  //     console.log(`Failed to open ${readFilePath}!`);
  //   });
  return PromiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then(line => {
      if (!line || !line.length) {
        throw new Error('Invalid GitHub handle read!');
      } else {
        return line;
      }
    })
    .then(handle => {
      return Promisification.getGitHubProfileAsync(handle);
    })
    .then(user => {
      user = JSON.stringify(user);
      fs.writeFileSync(writeFilePath, user);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
