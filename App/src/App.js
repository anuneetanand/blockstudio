import React from 'react';
import Web3 from 'web3'

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = { account : ""}
  }

  async loadBlockchain(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    console.log(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
  }

  componentDidMount(){
    this.loadBlockchain()
  }

  render() {
    return (
      <div className="container">
        <h1>Hello World</h1>
        <h2>{this.state.account}</h2>
      </div>
      )
  }
}

export default App;
