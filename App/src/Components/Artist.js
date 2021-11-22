import React from "react"
import {COLORS} from "./Colors"
import SongCard from "./SongCard"
import AddSongCard from "./AddSongCard"
import Loader from "react-loader-spinner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

class Artist extends React.Component {

    constructor(props){
      super(props);
      this.state = {form : false, name: "", artistID: "", rating: "", songIDs: [], songs: []}
      this.openForm = this.openForm.bind(this)
      this.closeForm = this.closeForm.bind(this)
    }
  
    componentDidMount(){
        this.loadArtistDetails().then(() =>{ 
            console.log("Loaded Artist Details")
            this.loadSongDetails().then(() =>{ 
                console.log("Loaded Artist Songs")})
        });
    }

    async loadArtistDetails(){
        const contractInstance = await this.props.contract.deployed()
        const artistDetails = await contractInstance.getArtistDetails({from:this.props.account})
        let songList = []
        for (let i = 0; i < artistDetails[3].length; i++){
            songList.push(artistDetails[3][i].toString())
        }
        this.setState({
            name:artistDetails[0].toString(),
            artistID:artistDetails[1].toString(),
            rating:artistDetails[2].toString(),
            songIDs:songList
        })   
    }

    async loadSongDetails(){
        const contractInstance = await this.props.contract.deployed();
        let songInfoList = []
        for(let i = 0; i < this.state.songIDs.length; i++){
            let songDetails = await contractInstance.getSongDetails(this.state.songIDs[i], {from:this.props.account});
            songInfoList.push({'name': songDetails[0],'genre': songDetails[2],'hash': songDetails[3],'cost': songDetails[4].toString()});
        }
        this.setState({songs:songInfoList})
    }

    openForm(){
        this.setState({form : true})
    }

    closeForm(){
        this.setState({form : false})
    }

    render(){
        
        if (this.state.artistID === ""){
            return (
                <div style = {styles.main}>
                  <Loader type = "Bars" color = {COLORS.black}/>
                </div>
            )
        }

        else{
            return (
                <div style = {styles.main}>
                    <h2><FontAwesomeIcon icon={faMicrophone}/> </h2>
                    <h2> {this.state.name} </h2>
                    <h2> ID : {this.state.artistID} </h2>
                    <h2> Rating : {this.state.rating} </h2>
                    <div style = {styles.box}>
                        {this.state.songs.map((item,i)=> (
                        <SongCard 
                            type = {"artist"}
                            name = {item.name}
                            genre = {item.genre}
                            cost = {item.price}
                            likes = {"0"}
                            hash = {item.hash}
                            key = {i}
                        />))}
                    </div>
                    <h1><FontAwesomeIcon  icon={faPlusSquare} onClick = {()=>{this.openForm()}}/></h1>
                    <AddSongCard contract = {this.props.contract} ipfs = {this.props.ipfs} account = {this.props.account} form = {this.state.form} closeForm = {this.closeForm}/>
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
        padding :"2%",
        display:"flex", 
        flexDirection:"column",
        borderRadius:"30px",
        border: "3px solid",
        overflow: "auto",
        gap :"2%",
        boxShadow: "2px 5px 2px #191919",
        borderColor :COLORS.black,
        backgroundColor:COLORS.white,
    },
}
  
export default Artist;