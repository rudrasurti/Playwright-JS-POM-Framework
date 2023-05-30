const { min } = require('underscore');

const successlog = require('../../global/util/logger').successlog;

module.exports.generateRandomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};


exports.getCurrentDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  today = mm + '/' + dd + '/' + yyyy + '-' + minutes + '-' + seconds;
  successlog.info("Date is generated :" + today);
  return today;
};

exports.generateRandomTime = () => {
  var hours = Math.floor(Math.random() * 24);  // Generate a random number between 0 and 23 for hours
  var minutes = Math.floor(Math.random() * 60); // Generate a random number between 0 and 59 for minutes

  // Format the hours and minutes to have leading zeros if necessary
  var formattedHours = (hours < 10) ? "0" + hours : hours.toString();
  var formattedMinutes = (minutes < 10) ? "0" + minutes : minutes.toString();

  // Concatenate the hours and minutes with a colon separator
  var time = formattedHours + ":" + formattedMinutes;

  return time;

  successlog.info("TImea is generated :" + time);
};



exports.generateRandomNumber = (min, max) => {
   var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
   return randomNumber;
   successlog.info("NUmber is generated :" + randomNumber);
}




