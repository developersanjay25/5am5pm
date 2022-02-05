import React from "react";

//material ui
import { Button } from "@mui/material";


//files
import NotLogged from './NotLogged';
import IsLogged from "./IsLogged";


const LoginReg = () =>{
   const Role = localStorage.getItem("role");
   const Token = localStorage.getItem("token");

   if(Role && Token){
       return(
        <IsLogged userDetails = {Role} userToken = {Token}/>
       )
   }else{
       return(
        <NotLogged/>
       ) 
    }
}

export default LoginReg;