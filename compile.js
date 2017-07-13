'use strict';


var solc      = require('solc');
var fs        = require('fs');

/* constant */
var DIR       = './contracts/';

/* actual start */
let files = fs.readdirSync(DIR);

for (let i = 0; i < files.length; i++) {
  let src       = fs.readFileSync(DIR + files[i], 'UTF8');
  let compiled  = solc.compile(src, 1);
  let contracts = compiled.contracts;
  let keys      = Object.keys(contracts);

  for (let j = 0; j < keys.length; j++) {
    let obj = parse_contract(keys[j], contracts[keys[j]]);

    fs.writeFileSync(obj.name + '.json', JSON.stringify(obj), 'UTF8');
  }
}

function parse_contract(key, contract) {
  return {
    name: key.substring(1),
    bytecode: contract.bytecode,
    abi: JSON.parse(contract.interface)
  };
}
