var fs = require('fs');

var inputFile1 = 'file1.csv';
var inputFile2 = 'file2.txt';

fs.readFile(inputFile1, 'utf8', (err, data) => {
    const finalData = [];

    console.log(data)

    let results = data.split('\n');
    // console.log('resut here', results)

    results.forEach((row, index) => {
        if (index > 0) {
            // console.log(row.split(',')[2]); 

            
            const nNumber = /^\d{3}$/;
            const found = row.match(nNumber);
            // console.log(found)
            
        } 
        // console.log('this is the found data: ', finalData);
    })
    
    fs.writeFile('writeMe.txt', results, (err) => {
        if(err) throw err;
        console.log('The file has been saved!');
    });
    
})