import React from "react"
import {COLORS} from "./Colors"
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faFileUpload } from '@fortawesome/free-solid-svg-icons'


class AddSongCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {name : "", genre : "", cost: "", file : "" , buffer:"", hash : "", loading: false}
    }
    captureFile = (event)=>{
        event.preventDefault();
        const file = event.target.files[0]
        const file_reader = new window.FileReader()
        file_reader.readAsArrayBuffer(file)
        file_reader.onloadend = () =>{
            this.setState({buffer: Buffer.from(file_reader.result)})
        }
    }
    onSubmitClick = async (event)=>{
        // ipfs -> get hash  
        // blockchain
        event.preventDefault()
        if(this.state.buffer){
            this.setState({ loading: true })
            const file = await this.props.ipfs.add(this.state.buffer);
            const imageHash = file["path"];
            this.setState({hash: imageHash});
            const contractInstance = await window.contract.deployed()
            await contractInstance.addSong(this.state.name, this.state.genre, this.state.hash, this.state.cost, {from:this.props.account});

            this.setState({ loading: false })
            console.log(file);
        }
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
                { this.state.loading
                ? <div><p>Loading...</p></div>
                : <form>
                    
                    <h2 style = {{textAlign:"center"}}> <FontAwesomeIcon icon={faMusic}/> Add Song </h2>
                    <div style = {styles.form} >
                        <h6>hash: {this.state.hash}</h6>
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
                                onChange={this.captureFile}>
                            </input>
                    </div>
                    <input type="submit"  onClick={this.onSubmitClick} style = {styles.button} value="Publish" />
                </form>
                }
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