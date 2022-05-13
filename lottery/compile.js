const path=require('path');

const fs=require('fs');
const solc = require('solc');

const LotteryPath=path.resolve(__dirname,'contracts','Lottery.sol');
const source=fs.readFileSync(LotteryPath,'utf8');
//  var input = {
//      language: 'Solidity',
//      sources: {
//          'Lottery.sol' : {
//              content: source
//          }
//      },
//      settings: {
//           outputSelection: {
//               '*': {
//                   '*': [ '*' ]
//               }
//           }
//       }
//  }; 
//  var output = JSON.parse(solc.compile(JSON.stringify(input)));

//  var outputContracts = output.contracts['Lottery.sol']['Lottery']

//  // exports ABI interface
//  module.exports.interface = outputContracts.abi;

//  // exports bytecode from smart contract
//  module.exports.bytecode = outputContracts.evm.bytecode.object;
module.exports = solc.compile(source,1).contracts[':Lottery'];
//console.log(solc.compile(source,1));