import React from "react"
import {COLORS} from "./Colors"
import SongCard from "./SongCard"
import AddSongCard from "./AddSongCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

class Artist extends React.Component {

    constructor(props){
      super(props)
      this.state = {form : false}
      this.openForm = this.openForm.bind(this)
      this.closeForm = this.closeForm.bind(this)
    }
  
    componentDidMount(){
    }

    openForm(){
        this.setState({form : true})
    }

    closeForm(){
        this.setState({form : false})
    }

    render(){
        return (
            <div style = {styles.main}>
                <h1><FontAwesomeIcon icon={faMicrophone}/></h1>
                <h1> Artist </h1>
                <div style = {styles.box}>
                    <SongCard type = "artist" name = "Blinding Lights" genre = "Pop" cost = "50" likes = "25"/>
                    <SongCard type = "artist" name = "Starboy" genre = "Pop" cost = "100" likes = "25"/>
                </div>
                <h1><FontAwesomeIcon  icon={faPlusSquare} onClick = {()=>{this.openForm()}}/></h1>
                <AddSongCard form = {this.state.form} closeForm = {this.closeForm}/>
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