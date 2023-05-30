const winston = require('winston');
const process = require('process');
const fs = require('fs');
const util = require('util');

process.env.NODE_ENV = "production";
const env = process.env.NODE_ENV;

const logDir = 'applicationlog';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const errorLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
          let className = "";
          let fileName = "";

          if (info.stack) {
            const stackList = info.stack.split('\n');
            const callerIndex = stackList.findIndex(stack => stack.includes('\\pages\\'));
            const callerIndexOfTest = stackList.findIndex(stack => stack.includes('\\tests\\'));

            if (callerIndex !== -1) {
              className = stackList[callerIndex].split('\\pages\\')[1].replace('\\\\', '\\');
              className = className.substring(0, className.length - 1);
            }

            if (callerIndexOfTest !== -1) {
              fileName = stackList[callerIndexOfTest].split('\\tests\\')[1].replace('\\\\', '\\');
              fileName = fileName.substring(0, fileName.length - 1);
            }
          }

          return `[${info.timestamp}] [${info.level}] ${className ? `[${className}]` : ""} ${fileName ? `[${fileName}]` : ""} ${info.message}`;
        })
      )
    }),
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/-errors.log`,
      datePattern: 'dd-MM-yyyy',
      prepend: true,
      level: "error",
      timestamp: function () {
        return getDateTime();
      }
    })
  ]
});

const successLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
          let className = "";
          let fileName = "";

          if (info.stack) {
            const stackList = info.stack.split('\n');
            const callerIndex = stackList.findIndex(stack => stack.includes('\\pages\\'));
            const callerIndexOfTest = stackList.findIndex(stack => stack.includes('\\tests\\'));

            if (callerIndex !== -1) {
              className = stackList[callerIndex].split('\\pages\\')[1].replace('\\\\', '\\');
              className = className.substring(0, className.length - 1);
            }

            if (callerIndexOfTest !== -1) {
              fileName = stackList[callerIndexOfTest].split('\\tests\\')[1].replace('\\\\', '\\');
              fileName = fileName.substring(0, fileName.length - 1);
            }
          }

          return `[${info.timestamp}] [${info.level}] ${className ? `[${className}]` : ""} ${fileName ? `[${fileName}]` : ""} ${info.message}`;
        })
      )
    }),
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/-results.log`,
      datePattern: 'dd-MM-yyyy',
      prepend: true,
      level: "info",
      timestamp: function () {
        return getDateTime();
      }
    })
  ]
});

if (env === "production") {
  errorLogger.remove(winston.transports.Console);
  successLogger.remove(winston.transports.Console);
}

function getDateTime() {
  const currentdate = new Date();
  const datetime = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
  return datetime;
}

function formatArgs(args) {
  return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}

console.log = function () {
  successLogger.info.apply(successLogger, formatArgs(arguments));
};

console.error = function () {
  errorLogger.error.apply(errorLogger, formatArgs(arguments));
};

module.exports = {
  successlog: {
    info: (msg) => {
      successLogger.info(msg, new Error());
    }
  },
  errorlog: errorLogger
};
