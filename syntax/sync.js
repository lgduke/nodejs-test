var fs = require('fs');
//readFileSync

var fn = 'syntax/sample.txt';

/*
console.log('A');
var result = fs.readFileSync(fn,'utf8');
console.log(result);
console.log('C');
*/

console.log('A');
fs.readFile(fn, 'utf8' ,function(err, result) {
  console.log(result);
});
console.log('C');
