import React, { useEffect } from "react";
import { Grid, Box, TextField, Button, Typography, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import MuiPhoneNumber from 'material-ui-phone-number';

//file component import
import StepperForm from './Institute_Signup2';

//css style
import './cpp.css';


//images

import img1 from '../Images/Login/Loginbg.svg';
import { ClassNames } from "@emotion/react";
import img2 from "../Logo/1.png";


//styles

const useStyles = makeStyles({
    Login:{
        width:'100vw',
        height:'100vh',
        display:'flex',
    },
    Loginbg:{
        width:'65vw',
        height:'100vh',
        display:'flex',
        position:'relative',
    },
    loginbtn:{
        width:'100%',
        backgroundColor:'#003db3 !important',
    },
    logintxt:{
        color:'#003db3',
        cursor:'pointer',
    },
    labeltxt:{
        color:'#003db3',
    },
    
    formheight:{
        width:'100%',
        height:'24px'
    },
    imagestyle:{
        display:'block',
        marginLeft:'auto',
        marginRight:'auto',
        width:'50%',
    }

})





const Cpp_signup =() => {
     //phone no hooks
     const[phoneno,setphoneno] = useState("")

     //country code
     const[Country,setCountry] = useState("in")

    useEffect(() => {
        geoAPi();
    },[])

    const geoAPi = () => {
        axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=7ba4d5fa9ec044d7b85b3c7b0e50a4d2')
        .then(response => {
            setCountry(response.data.country_code.toLowerCase());
        })
        .catch(error => {
            console.log(error);
        });
    }
    

    

   
    
//signup data hooks

const [Ins_Signup,setIns_Signup] = useState({
    institute_name:'',
    email:'',
    country:'',
})

//change handler

const SignupHandler = (e) => {
    const data = {...Ins_Signup}
    data[e.target.id]=e.target.value;
    setIns_Signup(data);
    console.log(data);
}

//data validation hooks
const [Ins_name,setIns_name] = useState("")
const [Ins_email,setIns_email] = useState("")
const [Ins_mobile,setIns_mobile] = useState("")
const [Ins_country,setIns_country] = useState("")

//data error handling hooks
const [INErr,setINErr] = useState(false);
const [IEErr,setIEErr] = useState(false);
const [IMErr,setIMErr] = useState(false);
const [ICErr,setICErr] = useState(false);

//snackbar hooks
const [OpenSnack ,setOpenSnack] = useState(false)

const [Snackmsg, setSnackmsg] = useState("")

//progressBar hooks
const [loading,setLoading] = useState(false)

//stepper form hooks
const [successCPP,setSuccessCPP] = useState(false);

//data validation + api call back function

const Institute_Signup = (e) => {

    e.preventDefault();
   

    //ins_name
    if(Ins_Signup.institute_name == ""){
        setIns_name("Please Enter a Institute Name");
        setINErr(true)
    }else{
        setIns_name("");
        setINErr(false)
    }
   
      //email validation

      var mailformat =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(!Ins_Signup.email .match(mailformat))
      {
        setIns_email("Please Enter a Valid E-mail ID")
        setIEErr(true)
          
      }else{
        setIns_email("")
        setIEErr(false)
      }

    //mobile validation

    if(phoneno == ""){
        setIns_mobile("Please Enter an Valid Mobile no")
        setIMErr(true)
    }else{
        setIns_mobile("")
        setIMErr(false)
    }

    //country validation

    if(Ins_Signup.country ==""){
        setIns_country("Please Enter Your Country")
        setICErr(true)
    }else{
        setIns_country("")
        setICErr(false)
    }

    if(Ins_Signup.institute_name !=""  && Ins_Signup.email !="" && phoneno !=="" && Ins_Signup.country != ""){
        SignupApi();
        setLoading(true);
    }

}

//api calling
const SignupApi = () => {
    const url = "https://app.5am5pm.com:3000/institute_admin/signup";
   axios
   .post(url,{
    institute_name:Ins_Signup.institute_name,
    email:Ins_Signup.email,
    mobile:phoneno,
    country:Ins_Signup.country,
   })
   .then((res) => {
       if(res.data.status = "success"){
        setLoading(false)
        setSuccessCPP(true);
       }
   })
   .catch((err) => {
       console.log(err)
    setOpenSnack(true)
    setSnackmsg(err.response.data.message)
   })
}


 //snackbar code

 const [open, setOpen] = React.useState(false);

 const handleClick = () => {
   setOpen(true);
 };

 const handleClose = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }

   setOpenSnack(false);
 };

 const action = (
   <React.Fragment>
  
   </React.Fragment>
 );

//loginpage link

const LoginPage = () => {
    window.location.href="/Login";
}

    const classes = useStyles();

    const cppsignupphonenoHandler = (e) => {
        setphoneno(e)
    }

    if(successCPP){
      return  <StepperForm InsMobile={phoneno} />
    }else{

    return(
        <React.Fragment>
            <Grid container>
                <Grid item md={8} sm={6} xs={12}>
                <div className='responsiveStyle'>
                    <div className='backgroundStyle'>
                    
                    </div>
                </div>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <div>

                    <div className="signupfieldsAlignment">
                       
                    <Grid container>
                        <Grid item md={12} sm={12} xs={12}>


                        <div className="paddingStyle">



                        <Box
                sx={{
                width: '100%',
                    }}
                > 
                <img src={img2} width="150px" className={classes.imagestyle}></img>
                <div className={classes.formheight}></div>
                <Typography variant="h5" style={{textAlign:'center'}}>CAMPUS SIGN-UP</Typography> 
                <div className={classes.formheight}></div>
            
                <TextField 
                error={INErr}
                fullWidth label="INSTITUTE NAME" id="institute_name" onChange={(e) => SignupHandler (e)}
                helperText={Ins_name}
                />
                <div className={classes.formheight}></div>
           
                
                <TextField 
                error={IEErr}
                fullWidth label="INSTITUTE EMAIL" id="email" onChange={(e) => SignupHandler (e)}
                helperText={Ins_email}
                />
                 <div className={classes.formheight}></div>
             
                

                <Box
                             sx={{
                              width: '100%',
                            
                         }}
                         >

                        <MuiPhoneNumber autoFormat={false} label="mobile no" fullWidth variant="outlined" helperText={Ins_mobile} error={IMErr} disableAreaCodes enableLongNumbers defaultCountry={Country} onChange={(e) => cppsignupphonenoHandler (e)}/>
                         </Box>
              

               
                   



                 <div className={classes.formheight}></div>
               
                <TextField 
                error={ICErr}
                fullWidth label="COUNTRY" id="country" onChange={(e) => SignupHandler (e)}
                helperText={Ins_country}
                />
                 <div className={classes.formheight}></div>
                
                <Button variant="contained" style={{borderRadius:0}} onClick = {(e) => Institute_Signup(e)} className={classes.loginbtn}>
               
                    SUBMIT &nbsp;
                    
                    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={20} variant={(loading) ? 'indeterminate' : 'determinate'} style={{color:'#fff',fontSize:'30px'}}  />
        </Box>
                    
                    </Button>
                
              
              </Box>





                        </div>


                        </Grid>
                    </Grid>


            
                    <br></br>
                <div style={{textAlign:'center'}}><Typography variant="body">Already Having an Account <span className={classes.logintxt} onClick={LoginPage}>Login</span> Here</Typography></div>
                  
               
                </div>
                    </div>
                </Grid>
            </Grid>

            <div>
     
     <Snackbar
       open={OpenSnack}
       autoHideDuration={6000}
       onClose={handleClose}
       message={Snackmsg}
       action={action}
     />
   </div>

        </React.Fragment>
    );
}
}

export default Cpp_signup;