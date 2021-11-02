import React from "react"
import Web3 from 'web3'
import Logo from "../Assets/logo.png"
import SwitchSelector from "react-switch-selector"
import contract from 'truffle-contract'
import contractMeta from "../build/contracts/blockstudio.json"

import {create} from 'ipfs-http-client'
const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

class Login extends React.Component {

  constructor(props){
    super(props)
    this.web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    this.contract = contract(contractMeta)
    this.contract.setProvider(this.web3.currentProvider)
    this.state = { account : "", type : "0", choice : "1", hash: ""}
  }

  async loadBlockchain(){
    const accounts = await this.web3.eth.getAccounts()
    this.setState({account:accounts[0]})
  }

  componentDidMount(){
    this.loadBlockchain()
    this.LoginUser()
  }

  LoginUser = async () => {
      const contractInstance = await this.contract.deployed()
      let val = "0"
      await contractInstance.checkUser({from:this.state.account}).then((x)=>{ val = x.toString()})
      
      this.setState({type: val})
  }

  RegisterUser = async () =>{
    this.setState({type:this.state.choice})
    const contractInstance = await this.contract.deployed()
    if (this.state.type === "1")
      contractInstance.addNewArtist("aaa",{from:this.state.account})
    if (this.state.type === "2")
      contractInstance.addNewAudience("bbb",{from:this.state.account})
  }

  captureFile = (event)=>{
    event.preventDefault();
    const file = event.target.files[0]
    const file_reader = new window.FileReader()
    file_reader.readAsArrayBuffer(file)
    file_reader.onloadend = () =>{
      this.setState({buffer: Buffer.from(file_reader.result)})
    }
  }
  onSubmitClick = async (event)=>{
      event.preventDefault()
      if(this.state.buffer){
        const file = await ipfs.add(this.state.buffer)
        const imageHash = file["path"];
        this.setState({hash: imageHash});
      }
    }



  render(){


    if (this.state.type === "1" ){
      return (
        <div style = {styles.body}> 
          <div style = {styles.main}>
            <h2> Artist </h2>
                  <main role="main">
                        <h4>IPFS HASH: {this.state.hash}</h4>
                      <br></br>
                      <div align = 'center'>
                        <img align = 'center' src={`https://ipfs.infura.io/ipfs/${this.state.hash}`}  alt="uploadedimage" />
                        <br></br>
                        <div className="container-form">
                        <form>
                          <input type="file" onChange={this.captureFile}></input>
                          <input type="submit" onClick={this.onSubmitClick}></input>
                        </form>
                        </div>
                      </div>

                  </main>
                </div>
          </div>
          )
    }

    else if (this.state.type === "2"){
      return (
        <div style = {styles.body}>
          <div style = {styles.main}>
            <h2> Audience </h2>
          </div>
        </div>
      )
    }

    else {
      return (
        <div style = {styles.body}>
          <div style = {styles.main}>
            <img style = {styles.img} alt="logo" src = {Logo}/>
            <div style = {styles.switch}> 
              <SwitchSelector
                onChange = {(val) => {this.setState({choice: val})}} 
                options = {[
                  {label: "Artist 🎙", value: "1", selectedBackgroundColor: "#26ae5f",},
                  {label: "Audience 🎧", value: "2", selectedBackgroundColor: "#26ae5f"}
                ]}
                wrapperBorderRadius = {50} 
                optionBorderRadius = {50}
                fontSize = {"20"} 
                fontColor={"rgb(240,240,230)"}
                backgroundColor={"rgb(4,16,13)"} />
            </div>
            <button style = {styles.button} onClick = {this.RegisterUser}> Register </button>
          </div>
        </div>
      );
    }
  }
}

const styles = {
  body : {
    background:"rgb(240,240,230)"
  },
  main : {
    display:"flex", 
    flexDirection:"column", 
    justifyContent: "center", 
    alignItems: "center", 
    height:"100vh"
  },
  button : {
    background:"rgb(4,16,13)", 
    height: "50px",
    width : "15%", 
    fontSize: "1.2rem", 
    fontWeight: "500",
    color: "rgb(240,240,230)",
    borderRadius:"50px", 
    border:"0px", 
    cursor:"pointer", 
    marginTop: 100, 
    boxShadow: "2px 5px 2px #9E9E9E",
  },
  img : {
    borderRadius:"100px", 
    width:"30%"
  },
  switch: {
    width: "25%", 
    height: "7.5%", 
    fontSize: "1.2rem", 
    fontWeight: "500", 
    fontColor:"rgb(240,240,230)", 
    marginTop: 100}
}

export default Login;