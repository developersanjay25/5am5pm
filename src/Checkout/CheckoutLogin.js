import React from 'react';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import axios from 'axios';


import CheckoutVerifyOtp from './CheckoutVerifyOtp';

const CheckoutLogin = () => {

    const[loginno,setlogin] = useState({
        mobile:''
    })

    const[afterLogin,setafterLogin] = useState(false)

    const LoginHandler = (e) => {
        const newData = {...loginno};
        newData[e.target.id] = e.target.value;
        console.log(newData);
        setlogin(newData);
    }

    const Login = () => {
        const url = "https://app.5am5pm.com:3000/commonapi/signin"
        axios
        .post(url,{
            mobile:'+91' + loginno.mobile,
        })
        .then((res) => {
            if(res.data.status == "success"){
                setafterLogin(true);
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

if(afterLogin){
    return<CheckoutVerifyOtp LoginMobileNo = {loginno.mobile}/>
}else{
    
    return(
        <React.Fragment>
            <Grid container>
                <Grid item md={12}>
                    <TextField fullWidth id="mobile" onChange={(e) => LoginHandler (e)} placeholder='Enter Your Mobile No'>

                    </TextField>
                    <div style={{height:'20px'}}></div>
                    <div style={{textAlign:'center'}}>
                    <Button variant="contained"
                     onClick={Login}

                     style={{backgroundColor:'#003db3',borderRadius:0}}

                     >Enter Mobile No</Button>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
}

export default CheckoutLogin;