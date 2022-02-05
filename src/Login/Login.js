import React from 'react';
import { useState,useEffect } from 'react';
import {Grid,Button} from '@mui/material'
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import VerifyOtp from './LoginVerify';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import MuiPhoneNumber from 'material-ui-phone-number';
import MuiAlert from '@mui/material/Alert';

//css file
import './login.css';



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


//images 

import img1 from '../Images/Login/background.png';
import logo from '../Logo/1.png';


const useStyles = makeStyles({
    Login:{
        // width:'100vw',
        // height:'100vh',
        // display:'flex',
        
    },
    Loginbg:{
        width:'70vw',
        height:'100vh',
        display:'flex',
        position:'relative',
    },
    loginbtn:{
        width:'100%',
       
    },
    imagestyle:{
        display:'block',
        width:'50%',
        marginLeft:'auto',
        marginRight:'auto',
    },
    heightStyle:{
        width:'100%',
        height:'24px',
    },
    countrycodestyle:{
        display:'flex',
        justifyContent:'flex-end'
    }
})


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Login = () => {


  //country code hooks
  


    //preloading hooks
    const[waiting,setwaiting] = useState(false)


        // error snack hooks

        const [SnackErr, setSnackErr] = useState(false);
        const [SnackMsg, setSnackMsg] = useState("");

        const handleClose = () => {
            setSnackErr(false);
        }

    //snackbar
    const [state, setState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
      });

      const { vertical, horizontal, open } = state;

    //Login function

    const [phone,setPhone] = useState("");

    const [mobileErr, setmobileErr] = useState('')
    const [mobileErr2, setmobileErr2] = useState(false)

    //verify hooks

    const [verify, setVerify] = useState(false)

    const loginHandler = (e) => {
        
       
        setPhone(e)
        
    }

    const Login = (e) => {
       
        if(phone == "")
        {
            setmobileErr("please enter a valid number")
            setmobileErr2(true)
        }else{
            setmobileErr("");
            loginapi();
            setmobileErr2(false)    
        }
    }

    const loginapi = () => {
       
        setwaiting(true);
        const url = "https://app.5am5pm.com:3000/commonapi/signin"
        axios
        .post(url,{
            mobile:phone,
        })
        .then((res) => {
          
            const data = res.data.status;
            if(data == "success"){
                setVerify(true)
                setwaiting(false);
            }
        })
        .catch((err) => {
            setSnackErr(true);
            setSnackMsg(err.response.data.message);
            setwaiting(false);
        })
    }

  
    const countryCodeValue = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }
   

    // hooks for country code
    const [Country, setCountry] = React.useState('in');
    //hooks for phone no value
    const [mobile11,setMobile11] = React.useState("")


    const CountryCodeHandler = (e) => {
        setMobile11(e);
    };




useEffect(() => {
    axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=7ba4d5fa9ec044d7b85b3c7b0e50a4d2')
    .then(response => {
        setCountry(response.data.country_code.toLowerCase());
    })
    .catch(error => {
        console.log(error);
    });

},[])
   




    const classes = useStyles();

    if(verify){
       return <VerifyOtp LoginMobileNo = {phone}/>
    }else{
    return(
        <React.Fragment>
         
            <Grid container>
           
                <Grid item md={8} sm={6} xs={12}>
                <div className='responsiveStyle'>
                    
         <div className="loginBG"></div>
         </div>     
                </Grid>

               
               
                <Grid item md={4} sm={6} xs={12}>
                    <div className='responsiveStyle1'>
                
                <div className='loginStyle'>
                <img src={logo} width="150px" className={classes.imagestyle}></img>
              



                {/* getting full grid in md=4 */}

               
                <Grid container>
               
                <Grid item md={12} sm={12} xs={12}>
                <div className='loginstylepadding'>
                      
                        <Box
                             sx={{
                              width: '100%',
                            
                         }}
                         >
                           
                      
                        <p>WELCOME BACK</p>
                        <MuiPhoneNumber autoFormat={false} helperText={mobileErr} error={mobileErr2} label="mobile no" fullWidth variant="outlined" disableAreaCodes enableLongNumbers defaultCountry={Country} onChange={(e) => loginHandler (e)}/>
                         </Box>
                         <br></br>
                         
                      



                         <Box
                            sx={{
                                width: '100%',
                            }}
                         >
                              <Button className={classes.loginbtn} onClick={(e)=>Login(e)} variant="contained" style={{backgroundColor:'#003db3',borderRadius:0}}>Login &nbsp;
                              
                                {/* preloader */}

                                <Box sx={{ display: 'flex' }}>
                                <CircularProgress style={{color:'#fff'}} size={20} variant={(waiting) ? 'indeterminate' : 'determinate'} />
                                </Box>

                              </Button>
                         </Box>




                    </div>


                </Grid>
                </Grid>

                        
                         </div>



                         {/* responsive div */}
                         </div>
                </Grid>
            </Grid>

            {/* snackbar code */}
            <div>
     
     <Snackbar
       anchorOrigin={{vertical:"top", horizontal:"right"}}
       open={SnackErr}
      
       key={vertical + horizontal}
       autoHideDuration={6000}
       onClose={handleClose}
     >
          <Alert severity="error" sx={{ width: '100%' }}>
      {SnackMsg}
       </Alert>
     </Snackbar>
   </div>

        </React.Fragment>
    );   
                        }
}

export default Login;