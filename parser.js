const csv = require('csvtojson');

var inputFile1 = 'file1.csv';
var inputFile2 = 'file2.txt';

// invoking csv returns a promise 

// csv File
// const converter = csv().fromFile(inputFile1)
//                     .then((json) => {
//                         console.log(json);
//                     })

// txt File
const converter = csv().fromFile(inputFile2)
                    .then((json) => {
                        console.log(json);
                    })