var fs = require('fs');
var Promise = require('bluebird');
var readFile = Promise.promisify(fs.readFile);
var writeFile = Promise.promisify(fs.writeFile);
var csv = require('csvtojson');

var promiseArray = [readFile('file1.csv'), readFile('file2.txt')];
// var allFiles = ['file1.csv', 'file2.txt'];

const finalData = [];

Promise.map(promiseArray, (data) => {
    
    // console.log('dataArray', data.toString());
    data = data.toString();
    // console.log(data)
    // console.log('ends iteration ------')
    // Turn csv into column arrays
    csv({ noheader: true, output: "csv" })
        .fromString(data)
        .then((csvRow)=> { 
            // console.log(csvRow)
            let indexOfN;

        for(let i = 0; i < csvRow[1].length; i++) {
            let digits = csvRow[1][i].match(/\d+/g);
            
            if (digits && digits[0].length === 5) {
                indexOfN = i;
                break;
            }
        }

        for(let i = 1; i < csvRow.length; i++) {
            let digits;

            if(csvRow[i][indexOfN] !== undefined) {
                digits = csvRow[i][indexOfN].match(/\d+/g);
            }
            if(digits && digits[0].length === 5) {
                finalData.push("N" + csvRow[i][indexOfN].match(/\d+/g)[0]);
                continue;
            }
        }

        console.log('this is the final data:', finalData);
    }); 
})
.then(() => {
        return writeFile('writeMe.txt', finalData);
    })

