import React from "react"
import {COLORS} from "./Colors"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faCompactDisc, faHeart, faMicrophone, faPlay, faPause, faTag, faShoppingCart} from '@fortawesome/free-solid-svg-icons'

class SongCard extends React.Component {

    constructor(props){
        super(props)
        this.state = {playing : false}
      }

    buySong = async () =>{
        
    }
    
    playSong = async () =>{
        this.setState({playing : true})
    }

    pauseSong = async () =>{
        this.setState({playing : false})
    }

    render(){
        if (this.props.type === "artist")
            return (
                <div style = {styles.card}>
                    <h3> <FontAwesomeIcon icon={faCompactDisc} /> {this.props.name} </h3>
                    <h3> <FontAwesomeIcon icon={faTag} /> {this.props.genre} </h3>
                    <h3> <FontAwesomeIcon icon={faCoins} /> {this.props.cost} </h3>
                    <h3> <FontAwesomeIcon icon={faHeart} /> {this.props.likes} </h3>
                </div>    
            )
        else if (this.props.type === "audience")
            return (
                <div style = {styles.card}>
                    <h3> <FontAwesomeIcon icon={faCompactDisc}  spin = {this.state.playing}/> {this.props.name} </h3>
                    <h3> <FontAwesomeIcon icon={faTag} /> {this.props.genre} </h3>
                    <h3> <FontAwesomeIcon icon={faMicrophone} /> {this.props.artistName} </h3>
                    {   this.state.playing? 
                            <h3> <FontAwesomeIcon onClick={this.pauseSong} icon={faPause} /> </h3> 
                        :   <h3> <FontAwesomeIcon onClick={this.playSong} icon={faPlay} /> </h3>
                    }
                </div>    
            )
        else
            return (
                <div style = {styles.card}>
                    <h3> <FontAwesomeIcon icon={faCompactDisc} /> {this.props.name} </h3>
                    <h3> <FontAwesomeIcon icon={faTag} /> {this.props.genre} </h3>
                    <h3> <FontAwesomeIcon icon={faCoins} /> {this.props.cost} </h3>
                    <h3> <FontAwesomeIcon onClick={this.buySong} icon={faShoppingCart} /> </h3>
                </div>
            )
    }
}
  
const styles = {
    card : {
        height :"20%",
        width :"100%",
        padding :"10px",
        display:"flex", 
        flexDirection:"row", 
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius:"10px",
        border: "2px solid",
        borderColor :COLORS.black,
        backgroundColor:COLORS.brown,
        boxShadow: "1px 3px 1px #191919",
    }
}
  
  export default SongCard;