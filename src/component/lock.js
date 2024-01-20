import React from "react";
import { Link } from "react-router-dom";
import "./lock.css"

const Lock =()=>
{

    return(
        <>
        <h1>Welcome</h1>
        <h1>Rajeev's Money Tracker.</h1>
        <p>Enter security code to proceed</p>
        <input type="text" className="pass" id="val" placeholder="Enter the security code" required/>
        <p id="res"></p>
        <button className="btnl" onClick={check} >Enter</button>
        </>
    )
}
export default Lock;

function check(){
    var p=document.getElementById("val").value;
    if(p==="RR299")
    {
        //alert(p);
        window.open("https://money-tracker-frontend-dun.vercel.app/","_self")
    }
    else
    {
        document.getElementById("res").innerHTML="Incorrect Password.";
    }
    //alert(p);
}