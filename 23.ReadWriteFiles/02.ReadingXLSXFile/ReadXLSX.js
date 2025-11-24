const xlsx = require('xlsx');
const fs = require('fs');

// Path to your .xlsx file
const filePath = 'Data.xlsx';

// Read the file
const workbook = xlsx.readFile(filePath);

// Get the names of all sheets in the workbook
const sheetNames = workbook.SheetNames;
console.log("Sheet Names:", sheetNames);

// Access the first sheet (or you can choose any sheet by name)
const sheet = workbook.Sheets[sheetNames[0]];

// Convert the sheet to JSON (you can also convert to CSV, or other formats)
const jsonData = xlsx.utils.sheet_to_json(sheet);

console.log("Sheet Data in JSON format:", jsonData);
