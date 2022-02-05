import React from 'react';
import { Grid, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';


import { useRecoilState } from 'recoil';
import {userotpverify,uMobile,step1_1,PaymentStep3} from './CheckoutRecoil';

const SignupVerify = (props) => {


    const[xyz,setxyz] = useRecoilState(userotpverify);

    const[loginverified,setloginverified] = useRecoilState(uMobile);

    const[clsExe,setClsExe] = useRecoilState(step1_1);

    const[openPayemtn,setopenPayment] = useRecoilState(PaymentStep3);

   

const [verifyuserotp,setverifyuserotp] = useState({
    otp:''
})

const verifyotpHandler = (e) => {
    const newData = {...verifyuserotp};
    newData[e.target.id] = e.target.value;
    console.log("hello",newData);
    setverifyuserotp(newData);
}

const verifyOtp = () => {
   
    const apiurl = "https://app.5am5pm.com:3000/privatestudent/otpverify"
    axios
    .post(apiurl,{
        mobile: "+91" + props.LoginMobileNo,
        otp:verifyuserotp.otp,
    })
    .then((res) => {
        if(res.data.status == 'success'){
            setxyz(false)
            setClsExe(true)
            localStorage.setItem('role',res.data.data.role);
            localStorage.setItem('token',res.data.data.token);
            window.location.reload();
        }
    })
    .catch((err) => {
        console.log(err);
    })
}


    return(
        <React.Fragment>
            <Grid container>
                <Grid item md={12}>
                    <TextField id='otp' fullWidth placeholder='ENTER YOUR OTP' onChange={(e) => verifyotpHandler (e)}>

                    </TextField>
                   <div style={{height:'20px'}}></div>
                   <div style={{textAlign:'center'}}>
                   <Button
                    onClick={(e) => verifyOtp (e)}
                    style={{backgroundColor:'#003db3',borderRadius:0}}
                     variant="contained">
                       Verify Otp
                   </Button>
                   </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default SignupVerify;