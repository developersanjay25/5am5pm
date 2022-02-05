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
import CircularProgress from '@mui/material/CircularProgress';


//css
import './Signup.css';

//images
import img1 from '../Images/Login/Loginbg.svg';
import logo from '../Logo/1.png';

//styles

const useStyles = makeStyles({
    Login:{
        width:'100vw',
        height:'100vh',
        display:'flex',
    },
    Loginbg:{
        width:'70vw',
        height:'100vh',
        display:'flex',
        position:'relative',
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

const SignupVerification = (props) => {

    //otp hooks
    const [OTPNUMBER,setOtp] = useState({
        otp:''
    })

    const classes = useStyles();

    const OTPverify = (e) => {
        const data = {...OTPNUMBER};
        data[e.target.id] = e.target.value; 
        setOtp(data)
        console.log(data)
    }

    //progressBar hooks
    const [loading,setLoading] = useState(false)

    //button disable hooks
    const [btnDisable,setbtnDisable] = useState(true)

    useEffect(() => {
        if(OTPNUMBER.otp.length !=4){
            setbtnDisable(true)
        }else{
            setbtnDisable(false)
        }
    },[OTPNUMBER.otp])

    //snackbar hooks
    const [OpenSnack ,setOpenSnack] = useState(false)

    const [Snackmsg, setSnackmsg] = useState("")

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
          {/* <Button color="secondary" size="small" onClick={handleClose}>
          
          </Button> */}
          {/* <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton> */}
        </React.Fragment>
      );
    

    //api call

    const submitOTP = (e) => {

        e.preventDefault();
        setLoading(true);
        console.log(loading)

    e.preventDefault();

    const url = "https://app.5am5pm.com:3000/commonapi/staf_student_signup_otpverify";
    
    axios.post(url,{
        mobile:props.Signupmobileno,
        otp:OTPNUMBER.otp,
    })
    .then((res) => {
        console.log(res.data)
        if(res.data.status == "success"){
          localStorage.setItem('token',res.data.data.token);
          localStorage.setItem('role',res.data.data.role);
            successSignup();
            setLoading(false)
        }
    })
    .catch((err) => {
        if(err.response.data.message){
            setOpenSnack(true)
            setSnackmsg(err.response.data.message)
        }
    })

}

const successSignup = () => {
  window.location.href="/app/studentdashboard";
}

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
              
                <React.Fragment>
               
           









                <div className='signupfieldsAlignment'>

                <img src={logo} width='150px' className={classes.imageStyle}></img> 

              <Grid container>
              <Grid item md={12} sm={12} xs={12}>
                <div className='paddingStyle'>
              <p>ENTER YOUR 4 DIGIT OTP</p>
           
              
                    
           <Box
       sx={{
       width: '100%',
  
           }}
       >
           
       <TextField 
      
       fullWidth label="ENTER YOUR OTP" id="otp"
           onChange={(e) => OTPverify(e)}
       />

     </Box>
           <br></br>
<Box
sx={{
width: '100%',

   }}
>
   <Button
    disabled={btnDisable} 
    className="button-style" 
    variant="contained"
     onClick={(e) => submitOTP (e)}
     style={{borderRadius:0}}
     >SUBMIT &nbsp;<Box sx={{ display: 'flex' }}>
<CircularProgress size={20} variant={(loading) ? 'indeterminate' : 'determinate'} style={{color:'#fff',fontSize:'30px'}}  />
</Box></Button>     
</Box>

</div>
              </Grid>
              </Grid>






              
                </div>

                  
         
                </React.Fragment>
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
    )
}

export default SignupVerification;