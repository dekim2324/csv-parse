var fs = require('fs');
var Promise = require('bluebird');
var readFile = Promise.promisify(fs.readFile);
var writeFile = Promise.promisify(fs.writeFile);
var csv = require('csvtojson');

var promiseArray = [readFile('file1.csv'), readFile('file2.txt')];

Promise.all(promiseArray).then((data)=>{
    // console.log('dataArray', data.toString());
    data = data.toString();
    const finalData = [];
    // Turn csv into column arrays
    csv({ noheader: true, output: "csv" })
        .fromString(data)
        .then((csvRow)=> { 
            console.log(csvRow)
            let indexOfN;

        for(let i = 0; i < csvRow[1].length; i++) {
            let digits = csvRow[1][i].match(/\d+/g);
            
            if (digits && digits[0].length === 5) {
                indexOfN = i;
                break;
            }
        }

        // loop starting from ind = 1
        // at each element, push index of indexOfN to finalData array
        for(let i = 1; i < csvRow.length; i++) {
            if(csvRow[i][indexOfN] !== undefined) {
                finalData.push("N" + csvRow[i][indexOfN].match(/\d+/g)[0]);
            }
        }

        for(let i = 1; i < csvRow.length; i++) {
            let digits;

            if(csvRow[i][indexOfN] !== undefined) {
                digits = csvRow[i][indexOfN].match(/\d+/g);
            }
            if(digits && digits[0].length === 7) {
                finalData.push("N" + csvRow[i][indexOfN].match(/\d+/g)[0]);
                continue;
            }
        }

        console.log(finalData);
    });

    return writeFile('writeMe.txt', finalData);
});