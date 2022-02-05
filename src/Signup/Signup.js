import { Grid, Typography, TextField, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Snackbar from '@mui/material/Snackbar';
import SignupVerification from './SignupVerification';
import MuiPhoneNumber from 'material-ui-phone-number';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';

//images

import img1 from '../Images/Login/Loginbg.svg';
import logo from '../Logo/1.png';

const useStyles = makeStyles({
    BtnAlign:{
        textAlign:'center',
    },
    LoginBtn:{
        width:'100%',
        backgroundColor:'#003db3 !important'
    },

    Login:{
        width:'100%',
        height:'100vh',
        display:'flex',
    },
    Loginbg:{
        width:'70vw',
        height:'100vh',
        display:'flex',
        position:'relative',
    },

    
    image:{
        height:'100vh',
        overflow:'hidden'
    },
   
    logintxt:{
        color:'#003db3',
        cursor:'pointer'
    },
    heightStyle:{
        width:'100%',
        height:'24px',
    },
    imageStyle:{
        display:'block',
        width:'50%',
        marginLeft:'auto',
        marginRight:'auto',
    }

})

const Sign_up = () => {

    useEffect(() => {
        GeoApi();
    },[])



//signup data hooks
const[phoneno,setPhoneno] = useState("");

const signupphonenoHandler = (e) =>{
    setPhoneno(e)
}


//country code hooks
const [Country,setCountry] = useState("in");

//geo location api

const GeoApi = () => {
    axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=7ba4d5fa9ec044d7b85b3c7b0e50a4d2')
    .then(response => {
        setCountry(response.data.country_code.toLowerCase());
    })
    .catch(error => {
        console.log(error);
    });
}



        //preloader hooks
        const[pre,setpre] = useState(false)

    //signup verification hooks

    const [Signup_Verification,setSignupVerification] = useState(false)

    //signup validation hooks

    const [fNam,setfName] = useState("");
    const [ferr,setfErr] = useState(false);
    const [lNam,setlName] = useState("");
    const [lerr,setlErr] = useState(false)
    const [Email,setEmail] = useState("");
    const [Eerr, seteErr] = useState(false)
    const [mobile,setMobile] = useState("");
    const [mErr,setmErr] = useState(false);


    //error hooks
    const [OpenSnack ,setOpenSnack] = useState(false)

    const [Snackmsg, setSnackmsg] = useState("")


    //style
    const classes = useStyles();


    const handleClose = () => {
        setOpenSnack(false)
    }



    //Api for signup

    const [Signup,setSignup] = useState({
        first_name:'',
        last_name:'',
        email:'',
    
    })

    const signupHandler = (e) => {

        const data = {...Signup};
        data[e.target.id] = e.target.value;
        setSignup(data);
        console.log(data);
    }

    const SignupSubmit = () => {

        //signup form validation


        //fistname validation

if(Signup.first_name == ""){
    setfName("Please Enter Your First Name");
    setfErr(true)
}else{
    setfName("")
    setfErr(false)

}

    //lastname validation

    if(Signup.last_name == ""){
        setlName("Please Enter Your Last Name")
        setlErr(true)
    }else{
        setlName("")
        setlErr(false)
      
        
    }

    //email validation

    var mailformat =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!Signup.email .match(mailformat))
    {
        setEmail("Please Enter a Valid E-mail ID")
        seteErr(true)
    }else{
        setEmail("")
        seteErr(false)
       
    }

    if(phoneno == ""){
        setMobile("Please Enter Valid Phone no")
        setmErr(true)
    }else{
        setMobile("")
        setmErr(false)
       
    }
if(Signup.first_name != "" && Signup.last_name != "" && phoneno != "" && Signup.email){
    InitSignup();  
}

     
}


const InitSignup = () => {

    const url = "https://app.5am5pm.com:3000/commonapi/staf_student_signup_outside";

    axios
    .post(url,{
        first_name:Signup.first_name,
        last_name:Signup.last_name,
        email:Signup.email,
        mobile:phoneno,
        role:'Student',
        institute_name:'5am5pm',
    })
    .then((res) => {
        setpre(true)
      const status = res.data.status;
      if(status == "success"){
        setSignupVerification(true)
        setpre(false)
      }
    })
    .catch((err) => {
       
        if(err.response.data.message){
            setOpenSnack(true)
            setSnackmsg(err.response.data.message)
        }
        console.log(err.response.data.message)
    })

}

      //snackbar
   const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  
    const AlreadyAccount = () => {
        window.location.href="/login";
    }


 if(Signup_Verification){
   return (<SignupVerification Signupmobileno = {phoneno}/>);
 }else{
    return(
        <React.Fragment>
          
          <Grid container>
                <Grid item md={8} sm={6} xs={12}>
                    <div className='responsiveStyle'>
                    <div className="backgroundStyle">
                     
                    </div>
                    </div>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>

                <div className='signupfieldsAlignment'>



                <img src={logo} width='150px' className={classes.imageStyle}></img> 







                <Grid container>
                <Grid item md={12} sm={12} xs={12}>


                        <div className='paddingStyle'> 
                <React.Fragment>
                    <Typography variant="h5" style={{textAlign:'center'}}>SIGN-UP FORM</Typography>
                    
                    <Box
                sx={{
                width: '100%',
                    }}
                >
                 
                 <div className={classes.heightStyle}></div>
                  
                <TextField 
                error={ferr}
                fullWidth label="FIRST NAME" id="first_name" onChange={(e) => signupHandler (e)}
                helperText={fNam}
                autoComplete="off"
                />

                <div className={classes.heightStyle}></div>
                    
                <TextField 
                error={lerr}
                fullWidth label="LAST NAME" id="last_name" onChange={(e) => signupHandler (e)}
                helperText={lNam}
                autoComplete="off"
                />

                <div className={classes.heightStyle}></div>
                
                <TextField 
                error={Eerr}
                fullWidth label="E-MAIL" id="email" onChange={(e) => signupHandler (e)}
                helperText={Email}
                autoComplete="off"
                />

                <div className={classes.heightStyle}></div>              
              
                         <Box
                             sx={{
                              width: '100%',
                            
                         }}
                         >

                        <MuiPhoneNumber autoFormat={false} label="mobile no" fullWidth variant="outlined" helperText={mobile} error={mErr} disableAreaCodes enableLongNumbers defaultCountry={Country} onChange={(e) => signupphonenoHandler (e)}/>
                         </Box>
              

                </Box>
                   

                <div style={{width:'100%',height:'25px'}}></div>
     
     
                    
       <Box
       sx={{
        width: '100%',
     
            }}
       >
          
                            <Button className={classes.LoginBtn} onClick={(e) => SignupSubmit (e)} variant="contained">
                                
                            SUBMIT &nbsp;
                            <Fade in={pre}
          style={{
            transitionDelay: pre ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress style={{color:'white'}} size={20}/>
        </Fade>
                         
                          
                            </Button>  <div style={{height:'30px'}}></div>
                            <Typography style={{textAlign:'center'}}>Already Having an Account <span className={classes.logintxt} onClick={AlreadyAccount}>Login</span> Here</Typography>
             </Box>
        
         
                </React.Fragment>



                </div> 



                </Grid>
                </Grid>




                </div>
                </Grid>
            </Grid>


            <div>
     
     <Snackbar
       anchorOrigin={{ vertical, horizontal }}
       open={OpenSnack}
       onClose={handleClose}
       message={Snackmsg}
       key={vertical + horizontal}
       autoHideDuration={6000}
     />
   </div>

        </React.Fragment>
    )
        }
}

export default Sign_up;