import React from "react"

class Artist extends React.Component {

    constructor(props){
      super(props)
    }
  
    componentDidMount(){
    }

    // captureFile = (event)=>{
    //     event.preventDefault();
    //     const file = event.target.files[0]
    //     const file_reader = new window.FileReader()
    //     file_reader.readAsArrayBuffer(file)
    //     file_reader.onloadend = () =>{
    //       this.setState({buffer: Buffer.from(file_reader.result)})
    //     }
    //   }
    //   onSubmitClick = async (event)=>{
    //       event.preventDefault()
    //       if(this.state.buffer){
    //         const file = await this.state.ipfs.add(this.state.buffer)
    //         const imageHash = file["path"];
    //         this.setState({hash: imageHash});
    //       }
    //     }

    render(){
        // return (
        //     <div>
        //         <div style = {styles.body}> 
        //   <div style = {styles.main}>
        //     <h2> Artist </h2>
        //           <main role="main">
        //                 <h4>IPFS HASH: {this.state.hash}</h4>
        //               <br></br>
        //               <div align = 'center'>
        //                 <img align = 'center' src={`https://ipfs.infura.io/ipfs/${this.state.hash}`}  alt="uploadedimage" />
        //                 <br></br>
        //                 <div className="container-form">
        //                 <form>
        //                   <input type="file" onChange={this.captureFile}></input>
        //                   <input type="submit" onClick={this.onSubmitClick}></input>
        //                 </form>
        //                 </div>
        //               </div>
        //           </main>
        //         </div>
        //   </div>
        //     </div>
        // )
        return (
            <div>
                <h2>Artist</h2>
            </div>
        )
    }
}
  
  const styles = {
    
  }
  
  export default Artist;