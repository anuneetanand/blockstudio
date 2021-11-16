import React from "react"
import {COLORS} from "./Colors"

class Audience extends React.Component {

    constructor(props){
      super(props)
    }
  
    componentDidMount(){
    }

    render(){
        return (
            <div style = {styles.main}>
                <h2> Audience </h2>
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
  
  export default Audience;