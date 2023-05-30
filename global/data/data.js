const fs = require('fs');
var _=require("underscore");

module.exports = function loadTestCaseData(testCaseName){
    console.log("Test data is loaded :" + testCaseName);
    const testcaseDetails = JSON.parse(fs.readFileSync('global/data/data.json','utf8'));
    return _.where(testcaseDetails.testcase,{name: testCaseName});
}