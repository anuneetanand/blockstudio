import React from "react"
import {COLORS} from "./Colors"
import SongCard from "./SongCard"
import Loader from "react-loader-spinner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones, faStore, faUser } from '@fortawesome/free-solid-svg-icons'
class Audience extends React.Component {

    constructor(props){
      super(props)
      this.state = {name : "", audienceID: "", store : [], library: [], songsMapping: {}}
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
            </div>
        )
    }
  }
}
  
const styles = {
  main : {
    display:"flex", 
    flexDirection:"column", 
    justifyContent: "center", 
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
    height :"75%",
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
    height :"75%",
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
    height :"75%",
    width :"90%",
    display:"flex", 
    flexDirection:"row",
    gap : "5%"
  }
}
  
export default Audience;