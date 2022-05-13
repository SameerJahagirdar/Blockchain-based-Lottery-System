const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface , bytecode} = require('./compile');

const provider = new HDWalletProvider('twin flee valley chat rally vocal curious measure heavy devote soap banana','https://rinkeby.infura.io/v3/39351c58f9284903a5b668978b52a647');

const web3 = new Web3(provider);

const deploy = async () =>{
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying from=',accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data : bytecode })
    .send({gas : '1000000' , from : accounts[0]});

    console.log(interface);
    console.log('Contract deployed to =',result.options.address);
    provider.engine.stop();
}
deploy();