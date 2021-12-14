import Web3 from 'web3'
import React from "react"
import {COLORS} from "./Colors"
import SongCard from "./SongCard"
import Loader from "react-loader-spinner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones, faStore, faUser, faGift } from '@fortawesome/free-solid-svg-icons'

class Audience extends React.Component {

    constructor(props){
      super(props)
      this.web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
      this.state = {name : "", audienceID: "", store : [], library: [], songsMapping: {}, supportArtistUsername:"", donation:""}
    }
  
    componentDidMount(){
        this.loadStore().then(()=>{ console.log("Loaded Store")
            this.loadAudienceDetails().then(() => { console.log("Loaded Audience's Details")
                this.loadSongDetails().then(() => { console.log("Loaded Songs")})})
        })
    }

    async loadStore(){
      const contractInstance = await this.props.contract.deployed()
      const count = await contractInstance.getNumSongs({from:this.props.account})
      let mapping = {}
      for(let i=1;i<parseInt(count.toString())+1;i++){
        mapping[i] = 0;
      }
      this.setState({songsMapping: mapping})
    }

    async loadAudienceDetails(){
      const contractInstance = await this.props.contract.deployed()
      const audienceDetails = await contractInstance.getAudienceDetails({from:this.props.account})
      let mapping = this.state.songsMapping
      for(let i=0;i<audienceDetails[2].length;i++){
        mapping[parseInt(audienceDetails[2][i].toString())] = 1
      }
      this.setState({
        name:audienceDetails[0].toString(),
        audienceID:audienceDetails[1].toString(),
        songsMapping:mapping
      })
    }

    async loadSongDetails(){
      const contractInstance = await this.props.contract.deployed()
      let n = Object.keys(this.state.songsMapping).length
      let newSongs = []
      let purchasedSongs = []

      for(let i=1;i<n+1;i++){
        let songDetails = await contractInstance.getSongDetails(i, {from:this.props.account})
        if(this.state.songsMapping[i]===1)
        {
          purchasedSongs.push({
            'name': songDetails[0],
            'artist' : songDetails[1],
            'genre': songDetails[2],
            'hash': songDetails[3],
            'cost': songDetails[4].toString(),
            'songID': i
          });
        }
        else
        {
          newSongs.push({
            'name': songDetails[0],
            'artist' : songDetails[1],
            'genre': songDetails[2],
            'hash': songDetails[3],
            'cost': songDetails[4].toString(),
            'songID': i
          });
        }
      } 

      this.setState({
        library : purchasedSongs,
        store : newSongs
      })
    }

    onSubmitClick = async (event)=>{
      event.preventDefault()
      if(this.state.supportArtistUsername){
          const contractInstance = await this.props.contract.deployed()
          await contractInstance.donateArtist(this.state.supportArtistUsername, {from:this.props.account, value:this.web3.utils.toWei(this.state.donation, 'milliether')}).then(()=>{
              window.location.reload()
          })
      }
      console.log("Submitted")
    } 


    render(){
      if (this.state.ID === ""){
          return (
              <div style = {styles.main}>
                <Loader type = "Bars" color = {COLORS.black}/>
              </div>
          )
      }

    else{
        return (
            <div style = {styles.main}>
                <div style = {styles.info}>
                      <h1><FontAwesomeIcon icon={faHeadphones}/> {this.state.name}  </h1>
                      <h3> Audience ID : {this.state.audienceID} </h3>
                </div>
                <div style = {styles.area}>
                  <div style = {styles.library}>
                    <h2 style = {{textAlign:"center"}}> <FontAwesomeIcon icon={faUser}/> Library </h2>
                      {this.state.library.map((item,i)=> (
                          <SongCard 
                          type = {"audience"}
                          name = {item.name}
                          artist = {item.artist}
                          genre = {item.genre}
                          hash = {item.hash}
                          songID = {item.songID}
                          key = {i}/>))}
                  </div>
                  <div style = {styles.store}>
                    <h2 style = {{textAlign:"center"}}> <FontAwesomeIcon icon={faStore}/> Store </h2>
                      {this.state.store.map((item,i)=> (
                          <SongCard 
                          contract = {this.props.contract} ipfs = {this.props.ipfs} account = {this.props.account}
                          type = {"shop"}
                          name = {item.name}
                          artist = {item.artist}
                          genre = {item.genre}
                          cost = {item.cost}
                          hash = {item.hash}
                          songID = {item.songID}
                          key = {i}/>))}
                  </div>
                </div>
                <div>
                  <form>
                    <div style = {styles.form}>
                      <h3 style = {{textAlign:"center"}}> <FontAwesomeIcon icon={faGift}/> Sponsor Artist</h3>
                      <input  type="text" placeholder ="Artist Username"  style = {styles.textInput} 
                          value={this.state.supportArtistUsername} required
                          onChange={(x)=>{this.setState({supportArtistUsername:x.target.value})}} />
                      <input  type="text" placeholder ="Amount"  style = {styles.textInput} 
                          value={this.state.donation} required
                          onChange={(x)=>{this.setState({donation:x.target.value})}} />      
                      <input type="submit"  onClick={this.onSubmitClick} style = {styles.button} value="Donate" />
                    </div>
                  </form>
                </div>
            </div>
        )
    }
  }
}
  
const styles = {
  main : {
    padding : "3%",
    display:"flex", 
    flexDirection:"column", 
    justifyContent: "centre", 
    alignItems: "center", 
    height:"100vh",
    gap :"5%",
    background:COLORS.brown,
    },
  info : {
    display:"flex", 
    flexDirection:"column", 
    alignItems: "center", 
    },
  library : {
    height :"100%",
    width :"40%",
    padding :"25px",
    display:"flex", 
    flexDirection:"column",
    borderRadius:"30px",
    border: "3px solid",
    overflow: "auto",
    gap :"10px",
    boxShadow: "2px 5px 2px #191919",
    borderColor :COLORS.black,
    backgroundColor:COLORS.white,
  },
  store : {
    height :"100%",
    width :"60%",
    padding :"25px",
    display:"flex", 
    flexDirection:"column",
    borderRadius:"30px",
    border: "3px solid",
    overflow: "auto",
    gap :"10px",
    boxShadow: "2px 5px 2px #191919",
    borderColor :COLORS.black,
    backgroundColor: COLORS.white,
  },
  area : {
    height :"100%",
    width :"90%",
    display:"flex", 
    flexDirection:"row",
    gap : "5%"
  },
  form:{
    padding :"2%",
    display:"flex", 
    flexDirection:"row",
    alignItems: "center", 
    borderRadius:"10px",
    border: "2px solid",
    gap : "3%",
    borderColor :COLORS.black,
    backgroundColor:COLORS.brown,
  },
  textInput : {
    width : "50%",
    borderRadius:"15px",
    padding: "2%",
  },
  button : {
    padding : "2%",
    borderRadius:"15px", 
    border:"0px", 
    cursor:"pointer",
    background:COLORS.black, 
    color: COLORS.white,
  },
}
  
export default Audience;