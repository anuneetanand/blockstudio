import React from "react"
import {COLORS} from "./Colors"
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faFileUpload } from '@fortawesome/free-solid-svg-icons'

class AddSongCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {name : "", genre : "", cost: "", file : "" }
      }
    
      onSubmit = async values => {
        // ipfs -> get hash  
        // blockchain
      }

      componentDidMount(){
      }
  
      render() {
          return(
                <Popup 
                    open = {this.props.form} 
                    onClose = {()=>{this.props.closeForm()}}
                    modal lockScroll repositionOnResize
                    contentStyle={styles.contentStyle} 
                    overlayStyle = {styles.overlayStyle}>
                    <form onSubmit={this.handleSubmit}>
                        <h2 style = {{textAlign:"center"}}> <FontAwesomeIcon icon={faMusic}/> Add Song </h2>
                        <div style = {styles.form} >
                            <input type="text" style = {styles.textInput} 
                                placeholder ="Name"  
                                value={this.state.name} required
                                onChange={(x)=>{this.setState({name:x.target.value})}} />
                            <input type="text" style = {styles.textInput} 
                                placeholder ="Genre"  
                                value={this.state.genre} required
                                onChange={(x)=>{this.setState({genre:x.target.value})}} />        
                            <input type="number" style = {styles.textInput} 
                                placeholder ="Cost"  
                                value={this.state.cost} required
                                onChange={(x)=>{this.setState({cost:x.target.value})}} />
                            <label htmlFor="upload"> <FontAwesomeIcon icon={faFileUpload} size = "3x"/> </label>
                                <input type="file" style={{display:'none'}} id="upload"required
                                    onChange={(x)=>{this.setState({file:x.target.value})}}>
                                </input>
                        </div>
                        <input type="submit"  style = {styles.button} value="Publish" />
                    </form>
                </Popup>
            )
        }
}

const styles = {
    contentStyle : {
        height :"60%",
        width :"30%",
        padding :"1%",
        display:"flex", 
        flexDirection:"column",
        justifyContent: "space-around", 
        borderRadius:"15px",
        border: "2px solid",
        overflow: "auto",
        borderColor :COLORS.black,
        backgroundColor:"#FFFFFF",
    },
    overlayStyle : {
        backgroundColor : COLORS.blurBlack
    },
    arrowStyle : {
    },
    form:{
        marginBottom :"5%",
        marginTop :"5%",
        padding :"5%",
        display:"flex", 
        flexDirection:"column",
        alignItems: "center", 
        borderRadius:"10px",
        border: "2px solid",
        overflow: "auto",
        gap : "20px",
        borderColor :COLORS.black,
        backgroundColor:COLORS.brown,
    },
    textInput : {
        width : "100%",
        borderRadius:"15px",
        padding: "3%",
    },
    button : {
        width : "50%",
        marginLeft: "25%",
        padding : "3%",
        borderRadius:"15px", 
        border:"0px", 
        cursor:"pointer",
        background:COLORS.black, 
        color: COLORS.white,
      },
  }
  

export default AddSongCard;