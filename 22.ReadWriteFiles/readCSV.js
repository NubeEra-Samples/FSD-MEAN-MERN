// readCSV.js
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'iris.csv');

function readCSV() {
  try {
    return fs.readFileSync(csvPath, 'utf8');
  } catch (err) {
    return 'CSV file not found or unreadable.';
  }
}

module.exports = readCSV;
