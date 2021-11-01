import React from "react"
import Logo from "../Assets/logo.png"
import SwitchSelector from "react-switch-selector"

function Login() {

  const options = [
    {label: "Artist", value: true, selectedBackgroundColor: "#53d769",},
    {label: "Audience", value: false, selectedBackgroundColor: "#53d769"}
 ];
 
  return (
    <div style = {styles.body}>
      <div style = {styles.main}>
        <img style = {styles.img} alt="logo" src = {Logo} width = '30%'/>
        <br></br><br></br>
        <div style = {styles.switch}> 
          <SwitchSelector options={options} backgroundColor={"rgb(4,16,13)"} fontSize = {"20"} fontColor={"rgb(254,254,238)"}/>
        </div>
        <br></br><br></br>
        <button style = {styles.button}> Register </button>
      </div>
    </div>
  );
}

const styles = {
  body : {background:"rgb(254,254,238)"},
  main : {display:"flex", flexDirection:"column", justifyContent: "center", alignItems: "center", height:"100vh"},
  button : {background:"rgb(4,16,13)", height: "50px", fontSize: "1.2rem", width : "15%", fontWeight: "500",
  color: "rgb(254,254,238)",borderRadius:"20px", border:"0px", cursor:"pointer",},
  img : {borderRadius:"100px",},
  switch: {width: "25%", height: "7.5%", fontSize: "1.2rem", fontWeight: "500", fontColor:"rgb(254,254,238)"}
}

export default Login;