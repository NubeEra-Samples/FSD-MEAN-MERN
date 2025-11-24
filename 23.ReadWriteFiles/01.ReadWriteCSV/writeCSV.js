// writeCSV.js
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'iris.csv');

function appendToCSV(dataObj) {
  // Convert object to a CSV row string
  const row = `${dataObj["sepal.length"]},${dataObj["sepal.width"]},${dataObj["petal.length"]},${dataObj["petal.width"]},"${dataObj["variety"]}"\n`;

  fs.appendFileSync(csvPath, row, 'utf8');
}

module.exports = appendToCSV;
