import React from 'react'
import Web3 from 'web3'
import Login from './Pages/Login.js'


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
      <Login/>
      )
  }
}

export default App;
