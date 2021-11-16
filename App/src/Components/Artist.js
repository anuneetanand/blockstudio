import React from "react"
import {COLORS} from "./Colors"

class Artist extends React.Component {

    constructor(props){
      super(props)
    }
  
    componentDidMount(){
    }

    render(){
        return (
            <div style = {styles.main}>
                <h2> Artist </h2>
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
  }
  
  export default Artist;