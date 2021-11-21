import React from "react"
import {COLORS} from "./Colors"
import SongCard from "./SongCard"
// import MySong from "../Assets/sample.mp3"
// import ReactAudioPlayer from 'react-audio-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
class Audience extends React.Component {

    constructor(props){
      super(props)
      this.state = {songsCount: 0, songs: [], songsPurchasedMapping: {}}
    }
  
    async componentDidMount(){
      const contractInstance = await window.contract.deployed();
      let songsCount = await contractInstance.getNumSongs({from:this.props.account});
      this.setState({songsCount : parseInt(songsCount.toString())})
      await this.loadSongDetails();
      await this.loadAudienceDetails();
      console.log(this.state.songsPurchasedMapping);
    }

    async loadAudienceDetails(){
      const contractInstance = await window.contract.deployed();
      const audienceDetails = await contractInstance.getAudienceDetails({from:this.props.account});
      this.state.name = audienceDetails[0].toString();
      this.state.audienceID = audienceDetails[1].toString();
      for(let i=0;i<audienceDetails[2].length;i++){
          this.state.songsPurchasedMapping[parseInt(audienceDetails[2][i].toString())] = 1;
      }

  }

    async loadSongDetails(){
      const contractInstance = await window.contract.deployed();

      for(let i=1;i<this.state.songsCount+1;i++){
          let songDetails = await contractInstance.getSongDetails(i, {from:this.props.account});
          this.state.songs.push({'name': songDetails[0],
          'genre': songDetails[2],
          'hash': songDetails[3],
          'price': songDetails[4].toString(),
          });
          this.state.songsPurchasedMapping[i] = 0;
      }

      console.log(this.state.songs);

    }

    async loadPurchasedSongsInfo(){
      const contractInstance = await window.contract.deployed();


      for(let i=1;i<this.state.songsCount+1;i++){
          let songDetails = await contractInstance.getSongDetails(i, {from:this.props.account});
          this.state.songs.push({'name': songDetails[0],
          'genre': songDetails[2],
          'hash': songDetails[3],
          'price': songDetails[4].toString(),
          });
      }

      console.log(this.state.songs);

    }

    render(){
        return (
            <div style = {styles.main}>
                <FontAwesomeIcon icon={faHeadphones} size="3x" />
                <h1> Audience </h1>
                <div style = {styles.box}>
                    {this.state.songs.map((item,i)=> (
                        <SongCard 
                        type = {"audience"}
                        name = {item['name']}
                        genre = {item['genre']}
                        cost = {item['price']}
                        hash = {item['hash']}
                        key = {i}/>))}
                </div>
            </div>
        )
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