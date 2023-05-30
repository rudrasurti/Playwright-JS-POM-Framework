const fs = require('fs');

/*
function readConfig(callback){
  fs.readFile('config/config.json', 'utf8', function(err, contents) {
    if (err) {
      console.log("error" + err.message);
      // we have a problem because the Error object was returned
    } else {
      const data  = JSON.parse(contents);
      console.log("*" + data);
      console.log("-" + data.applicationUrl);
      return data;
    }
});
}

var configData = readConfig();
console.log("-----> " + configData);*/

module.exports = JSON.parse(fs.readFileSync('global/config/config.json','utf8'));