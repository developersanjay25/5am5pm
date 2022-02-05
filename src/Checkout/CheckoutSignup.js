import React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";

import SignupVerify from './CheckoutSignupverify'

import { useRecoilState } from "recoil";
import {uMobile} from './CheckoutRecoil';


const CheckoutSignup = () => {

  const[sendmobileno,setsendmobileno] = useRecoilState(uMobile);

    const[abcd,setabcd] = useState(false)

    //hooks
    const[signup,setsignup] = useState({
        first_name:'',
        last_name:'',
        email:'',
        mobile:'',
    })

    const signupHandler = (e) => {
        const Data = {...signup};
        Data[e.target.id] = e.target.value;
        setsignup(Data)
    }

    const signupsubmit = () => {
      setsendmobileno('+91' + signup.mobile);
        const url = "https://app.5am5pm.com:3000/privatestudent/signup";
        axios
        .post(url,{
            first_name:signup.first_name,
            last_name: signup.last_name,
            email:signup.email,
            mobile:'+91' + signup.mobile,
        })
        .then((res) => {
           if(res.data.status == "success"){
            setabcd(true)
           }
        })
        .catch((err) => {
            console.log(err)
        })

    }


if(abcd){

  return<SignupVerify LoginMobileNo = {signup.mobile}/>


}else{
  

    return (
      <React.Fragment>
        <Grid container>
          <Grid md={6}>
            <Box
              sx={{
                width: "95%",
              }}
            >
              <TextField fullWidth label="FIRST NAME" id="first_name" onChange={(e) => signupHandler (e)}/>
            </Box>
          </Grid>
          <Grid md={6}>
          <Box
              sx={{
                width: "95%",
              }}
            >
              <TextField fullWidth label="LAST NAME" id="last_name"   onChange={(e) => signupHandler (e)}/>
            </Box>
          </Grid>
          <div style={{width:'100%',height:"24px"}}></div>
          <Grid md={6}>
          <Box
              sx={{
                width: "95%",
              }}
            >
              <TextField fullWidth label="EMAIL" id="email" onChange={(e) => signupHandler (e)} />
            </Box>
          </Grid>
          <Grid md={6}>
          <Box
              sx={{
                width: "95%",
               
              }}
            >
              <TextField fullWidth label="MOBILE" id="mobile"  onChange={(e) => signupHandler (e)}/>
            </Box>
          </Grid>

              
          <div style={{textAlign:'center' , width:'100%',paddingTop:'20px'}}>
          <Button variant="contained"
           onClick={(e) => signupsubmit (e)}
           style={{backgroundColor:'#003db3',borderRadius:0}}
           >SignUp</Button>
          
              </div>

        </Grid>
      </React.Fragment>
    );
}

 
};

export default CheckoutSignup;
