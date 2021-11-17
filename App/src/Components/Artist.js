import React from "react"
import {COLORS} from "./Colors"
import SongCard from "./SongCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone} from '@fortawesome/free-solid-svg-icons'

class Artist extends React.Component {

    constructor(props){
      super(props)
    }
  
    componentDidMount(){
    }

    render(){
        return (
            <div style = {styles.main}>
                <FontAwesomeIcon icon={faMicrophone} size="3x"/>
                <h1> Artist </h1>
                <div style = {styles.box}>
                    <SongCard type = "artist" name = "Blinding Lights" genre = "Pop" cost = "50" likes = "25"/>
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
        background:COLORS.brown
      },
    box : {
        height :"50%",
        width :"60%",
        padding :"25px",
        display:"flex", 
        flexDirection:"column",
        borderRadius:"30px",
        border: "3px solid",
        boxShadow: "2px 5px 2px #191919",
        borderColor :COLORS.black,
        backgroundColor:COLORS.white,
        overflow: "auto",
        gap :"10px"
    }
  }
  
  export default Artist;