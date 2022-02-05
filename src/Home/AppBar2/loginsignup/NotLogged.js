import React from "react";


//material ui
import { Button } from "@mui/material";

const NotLogged = (props) => {

   

    const login = () => {
        window.location.href="/login"
    }

    const signup = () => {
        window.location.href="/signup"
    }

    return(
        <React.Fragment>
             <Button variant="contained"
            style={{backgroundColor:'#003db3',
            color:'#fff',borderRadius:0
        }}
        onClick={login}
            >LOGIN</Button>  
    &emsp;

<Button variant="outlined"
            style={{
            color:'#003db3',borderRadius:0
        }}

        onClick={signup}
            >REGISTER</Button>  

        </React.Fragment>
    );
}

export default NotLogged;