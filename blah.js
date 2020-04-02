var fs = require('fs');
var csv = require('csvtojson');

var inputFile1 = 'file1.csv';
var inputFile2 = 'file2.txt';

fs.readFile(inputFile2, 'utf8', (err, data) => {
    const finalData = [];
 
    csv({ noheader: true, output: "csv" })
        .fromString(data)
        .then((csvRow)=> { 
            // console.log(csvRow)
            debugger;
            let indexOfN;

            // Check which index the nNumber is located and assign to indexOfN
            csvRow[1].forEach( (element, i) => {
                let digits = element.match(/\d+/g);
                
                if (digits && digits[0].length === 5) {
                    indexOfN = i;
                }
                
        });   

        console.log(indexOfN);

        // loop starting from ind = 1
        // at each element, push index of indexOfN to finalData array
        for(let i = 1; i < csvRow.length; i++) {
            finalData.push("N" + csvRow[i][indexOfN].match(/\d+/g)[0]);
        }

        console.log(finalData);
    });

    fs.writeFile('writeMe.txt', finalData, (err) => {
        if(err) throw err;
        console.log('The file has been saved!');
    });
    
})