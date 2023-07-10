const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = './electrical4all.co.uk.csv';
const desiredColumns = ['Bill-to Name','Customer Email','Shipping Address'];
const extractedData = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const rowData = {};
    desiredColumns.forEach((column) => {
      rowData[column] = row[column];
    });
    extractedData.push(rowData);
  })
  .on('end', () => {
    const jsonFilePath = 'file.json';
    const jsonData = JSON.stringify(extractedData, null, 2);

    fs.writeFile(jsonFilePath, jsonData, (error) => {
      if (error) {
        console.error('Error writing JSON file:', error);
      } else {
        console.log('Data extracted and saved to JSON file:', jsonFilePath);
      }
    });
  });
