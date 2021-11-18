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
      this.state = {}
    }
  
    componentDidMount(){
    }

    render(){
        return (
            <div style = {styles.main}>
                <FontAwesomeIcon icon={faHeadphones} size="3x" />
                <h1> Audience </h1>
                <div style = {styles.box}>
                    <SongCard type = "audience" name = "Blinding Lights" artistName = "The Weeknd" genre ="Pop"/>
                    <SongCard name = "Blinding Lights" genre ="Pop" cost = "50"/>
                    {/* <ReactAudioPlayer style = {{width:"100%"}} src={MySong} controls controlsList="nodownload noplaybackrate"/> */}
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