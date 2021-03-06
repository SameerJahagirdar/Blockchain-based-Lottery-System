const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const {interface,bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach(async () =>{
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(interface)
    .deploy({data : bytecode})
    .send({from : accounts[0] , gas : '1000000'});
});

describe('Lottery contract', ()=>{

    it('deployes a contract',()=>{
        assert.ok(lottery.options.address);
    });

    it('enters into lottery',async ()=>{
        await lottery.methods.enter().send({
            from : accounts[1],
            value : web3.utils.toWei('0.2','ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from : accounts[0]
        });
        assert.equal(accounts[1],players[0]);
    });

    it('can pickwinner', async ()=>{
        await lottery.methods.enter().send({
            from : accounts[1],
            value : web3.utils.toWei('2','ether')
        });
        const beforeval = await web3.eth.getBalance(accounts[1]);
        await lottery.methods.pickWinner().send({
            from : accounts[0]
        });
        const afterval = await web3.eth.getBalance(accounts[1]);

        assert.equal(true , afterval > beforeval);
    })

})