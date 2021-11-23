import React from "react"
import {COLORS} from "./Colors"
import SongCard from "./SongCard"
import Loader from "react-loader-spinner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
class Audience extends React.Component {

    constructor(props){
      super(props)
      this.state = {name : "", audienceID: "", allSongsCount: 0, toBuy : [], songs: [], songsPurchasedMapping: {}}
    }
  
    componentDidMount(){
      this.loadSongIDs().then(() => {
        this.loadAudienceDetails().then(() => {
          this.loadSongDetails().then(()=>{console.log("Loaded Songs")})
        })
      })
    }

    async loadSongIDs()
    {
      const contractInstance = await this.props.contract.deployed()
      const count = await contractInstance.getNumSongs({from:this.props.account})
      let mapping = {}
      for(let i=1;i<parseInt(count.toString())+1;i++){
        mapping[i] = 0;
      }
      this.setState({
        allSongsCount : parseInt(count.toString()), 
        songsPurchasedMapping:mapping
      })
    }

    async loadAudienceDetails(){
      const contractInstance = await this.props.contract.deployed()
      const audienceDetails = await contractInstance.getAudienceDetails({from:this.props.account})
      let purchasedSongs = this.state.songsPurchasedMapping
      for(let i=0;i<audienceDetails[2].length;i++){
        purchasedSongs[parseInt(audienceDetails[2][i].toString())] = 1
      }
      this.setState({
        name:audienceDetails[0].toString(),
        audienceID:audienceDetails[1].toString(),
        songsPurchasedMapping:purchasedSongs
      })
    }

    async loadSongDetails(){
      const contractInstance = await this.props.contract.deployed();
      let purchasedSongs = []
      let newSongs = []
      for(let i=1;i<this.state.allSongsCount+1;i++){
        let songDetails = await contractInstance.getSongDetails(i, {from:this.props.account})
        if(this.state.songsPurchasedMapping[i]===1)
        {
          purchasedSongs.push({
            'name': songDetails[0],
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
            'genre': songDetails[2],
            'hash': songDetails[3],
            'cost': songDetails[4].toString(),
            'songID': i
          });
        }
      } 
      console.log(purchasedSongs);
      console.log(newSongs);
      this.setState({
        songs:purchasedSongs,
        toBuy : newSongs
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
                <h2> <FontAwesomeIcon icon={faHeadphones} /></h2>
                <h2> {this.state.name} </h2>
                <h2> ID : {this.state.audienceID} </h2>
                <div style = {styles.box}>
                    {this.state.songs.map((item,i)=> (
                        <SongCard 
                        type = {"audience"}
                        name = {item.name}
                        genre = {item.genre}
                        hash = {item.hash}
                        songID = {item.songID}
                        key = {i}/>))}
                </div>
                <div style = {styles.box}>
                    {this.state.toBuy.map((item,i)=> (
                        <SongCard 
                        contract = {this.props.contract} ipfs = {this.props.ipfs} account = {this.props.account}
                        type = {"shop"}
                        name = {item.name}
                        genre = {item.genre}
                        cost = {item.cost}
                        hash = {item.hash}
                        songID = {item.songID}
                        key = {i}/>))}
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
  box : {
    height :"50%",
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
    backgroundColor:COLORS.white,
  }
}
  
export default Audience;