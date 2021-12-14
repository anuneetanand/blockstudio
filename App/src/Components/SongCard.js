import React from "react"
import {COLORS} from "./Colors"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faCompactDisc, faHeart, faMicrophone, faPlay, faPause, faTag, faShoppingCart} from '@fortawesome/free-solid-svg-icons'

class SongCard extends React.Component {

    constructor(props){
        super(props)
        this.state = {playing : false, audio: "", hash : ""}
    }

    componentDidMount(){
        this.loadSong()
    }

    buySong = async () =>{
        const contractInstance = await this.props.contract.deployed();
        await contractInstance.buySong(this.props.songID, {from:this.props.account, value: this.props.cost})
    }
    
    loadSong = async () =>{
        let audio_src= "https://ipfs.infura.io/ipfs/"+this.props.hash;
        this.setState({ audio: new Audio(audio_src)})
    }

    playSong = async () =>{
        console.log(this.state.audio)
        if(this.state.audio){
            this.setState({playing : true})
            this.state.audio.play()
        }
    }

    pauseSong = async () =>{
        console.log(this.state.audio)
        if(this.state.audio){
            this.setState({playing : false})
            this.state.audio.pause()
        }
    }

    render(){
        if (this.props.type === "artist")
            return (
                <div style = {styles.card}>
                    <h5> <FontAwesomeIcon icon={faCompactDisc} /> {this.props.name} </h5>
                    <h5> <FontAwesomeIcon icon={faTag} /> {this.props.genre} </h5>
                    <h5> <FontAwesomeIcon icon={faCoins} /> {this.props.cost/1000000000000000} </h5>
                    <h5> <FontAwesomeIcon icon={faHeart} /> {this.props.likes} </h5>
                </div>    
            )
        else if (this.props.type === "audience")
            return (
                <div style = {!this.state.playing? styles.card : styles.cardHiglight}>
                    <h5> <FontAwesomeIcon icon={faCompactDisc}  spin = {this.state.playing}/> {this.props.name} </h5>
                    <h5> <FontAwesomeIcon icon={faTag} /> {this.props.genre} </h5>
                    <h5> <FontAwesomeIcon icon={faMicrophone} /> {this.props.artist} </h5>
                    {   this.state.playing? 
                            <h5> <FontAwesomeIcon onClick={this.pauseSong} icon={faPause} /> </h5> 
                        :   <h5> <FontAwesomeIcon onClick={this.playSong} icon={faPlay} /> </h5>
                    }
                </div>    
            )
        else
            return (
                <div style = {styles.card}>
                    <h5> <FontAwesomeIcon icon={faCompactDisc} /> {this.props.name} </h5>
                    <h5> <FontAwesomeIcon icon={faTag} /> {this.props.genre} </h5>
                    <h5> <FontAwesomeIcon icon={faMicrophone} /> {this.props.artist} </h5>
                    <h5> <FontAwesomeIcon icon={faCoins} /> {this.props.cost/1000000000000000} </h5>
                    <h5> <FontAwesomeIcon onClick={this.buySong} icon={faShoppingCart} /> </h5>
                </div>
            )
    }
}
  
const styles = {
    card : {
        height :"20%",
        width :"100%",
        padding :"2%",
        display:"flex", 
        flexDirection:"row", 
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius:"10px",
        border: "2px solid",
        boxShadow: "1px 3px 1px #191919",
        borderColor :COLORS.black,
        backgroundColor:COLORS.brown,
    },
    cardHiglight : {
        height :"20%",
        width :"100%",
        padding :"2%",
        display:"flex", 
        flexDirection:"row", 
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius:"10px",
        border: "2px solid",
        boxShadow: "1px 3px 1px #191919",
        borderColor :COLORS.black,
        backgroundColor:COLORS.highlight,
    },
}
  
export default SongCard;