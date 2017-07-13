'use strict';

// requires
var Contracts = require('@monax/legacy-contracts');

function vali2Acc(validator) {
  return ({ address: validator.address,
    pubKey: validator.pub_key[1],
    privKey: validator.priv_key[1]
  });
}

function Deployer(url, account) {
  var _url  = null;
  var _acc  = null;
  var _dply = null;

  /* handle params */
  if (!url || !account) {
    throw new Error('Deployer requires rpc url & account object as arguments');
  }

  /* assign */
  _url  = url;
  _acc  = account;
  _dply = Contracts.newContractManagerDev(_url, _acc);

  /**
   * functions begin here
   */
  this.deploy = function deploy(abi, bytecode) {
    return new Promise(function (resolve, reject) {
      _dply.newContractFactory(abi).new({ data: bytecode }, function (err, cnt) {
        if (err) {
          reject(err);
        } else {
          resolve(cnt);
        }
      });
    });
  }

  this.at = function at(address, abi) {
    return new Promise(function (resolve, reject) {
      _dply.newContractFactory(abi).at(address, function (err, cnt) {
        if (err) {
          reject(err);
        } else {
          resolve(cnt);
        }
      });
    });
  }
};

module.exports            = Deployer;
module.exports.vali2Acc   = vali2Acc;
