'use strict';

var Deployer  = require('deployer');
var solc      = require('solc');
var fs        = require('fs');
var validator = require(process.env.HOME + '/.monax/chains/testchain/testchain_full_000/priv_validator.json');

/* constant */
var URL       = 'http://localhost:1337/rpc';
var QUEUE     = 'Queue.json';

/* start */
let contract  = JSON.parse(fs.readFileSync(QUEUE, 'UTF8'));
let deployer  = new Deployer(URL, Deployer.vali2Acc(validator));

console.log('deploying!');

function push_count(contract, data) {
  return new Promise(function (resolve, reject) {
    contract.push(data, function (err) {
      if (!err) {
        console.log('pushed ' + data);

        contract.count(function (err, data) {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        });
      } else {
        reject(err);
      }
    });
  });
}

function push(contract, data) {
  return new Promise(function (resolve, reject) {
    contract.push(data, function (err, ret) {
      if (!err) {
        resolve(ret);
      } else {
        reject(err);
      }
    });
  });
}

function pop(contract) {
  return new Promise(function (resolve, reject) {
    contract.pop(function (err, ret) {
      if (!err) {
        resolve(ret);
      } else {
        reject(err);
      }
    });
  });
}

deployer.deploy(contract.abi, contract.bytecode).then(function (contract) {
  push(contract, 1776).then(function (data) {
    return push(contract, 1984);
  }).then(function (data) {
    return push(contract, 1976);
  }).then(function (data) {
    return pop(contract);
  }).then(function (data) {
    console.log('pop');
    console.log('ret: ' + data);
    console.log(' ');
    return pop(contract);
  }).then(function (data) {
    console.log('pop');
    console.log('ret: ' + data);
    console.log(' ');
    return pop(contract);
  }).then(function (data) {
    console.log('pop');
    console.log('ret: ' + data);
    console.log(' ');
  });
}).catch(function (err) {
  console.log('err: ' + err);
});
