
import './App.css';
import web3 from './web3';
import React, { Component } from 'react'
import lottery from './lottery';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {manager : '', players : [],balance : '',value :'' , message : ''};
  }
 async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager,players, balance})
    console.log(this.state.manager);
  }
  onSubmit = async (event) =>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message : 'Transaction is being proceed...'});
    await lottery.methods.enter().send({
      from : accounts[0],
      value : web3.utils.toWei(this.state.value , 'ether')
    });
    this.setState({message : 'Successfully entered !'});
  }
  onPick = async (event)=>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message : 'Picking a Winner wait'});
    await lottery.methods.pickWinner().send({
      from : accounts[0]
    })
    this.setState({message : 'Winner has been picked !'});
  }
  render() {
    return (
      <>
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>
          There are {this.state.players.length} players currently playing.
        Winning prize is {web3.utils.fromWei(this.state.balance,'ether')} ether !
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h3>Want to try your luck?</h3>
          <label htmlFor="">Amount of ether to enter</label>
          <input type="text" value={this.state.value} onChange={event =>this.setState({value : event.target.value})}/>
          <button>Enter</button>
        </form>
        <hr />
        <h3>Pick a Winner</h3>
        <button onClick={this.onPick}>PickWinner</button>
        <hr />
        <h3>{this.state.message}</h3>
      </div>
      </>
    )
  }
}
