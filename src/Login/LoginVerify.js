import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';

//snackbar
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

//images

import img1 from "../Images/Login/Loginbg.svg";
import logo from "../Logo/1.png";
import axios from "axios";

const useStyles = makeStyles({
  Login: {
    // width: "100vw",
    // height: "100vh",
    // display: "flex",
    backgroundColor:'#003db3',
  },
  Loginbg: {
    width: "70vw",
    height: "100vh",
    display: "flex",
    position: "relative",
  },
  loginbtn: {
    width: "100%",
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
resendotp:{
 
  color: "#222",
  '&:hover': {
    color:'#003db3',
    textDecoration: 'underline',
    cursor:'pointer',
 },
}
});



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const VerifyOtp = (props) => {
  const [verifyno, setVerifyno] = useState({
    otp: "",
  });


  //progresbar hooks
  const [waiting,setwaiting] = useState(false);



  const [OtpValidation, setOtpValidation] = useState("");

  const [btnDisable, setbtnDisable] = useState(true);

  const [OpenSnack, setOpenSnack] = useState(false);

  const [OpenSnack1, setOpenSnack1] = useState(false);

  const [OpenSnack2, setOpenSnack2] = useState(false);

  const handleClosee1 = () => {
    setOpenSnack(false);
  }

  const handleClosee2 = () => {
    setOpenSnack1(false);
  }

  const [SnackMsg, setSnackmsg] = useState("");

  const [SnackMsg1, setSnackmsg1] = useState("");

  const [SnackMsg2, setSnackmsg2] = useState("");

  const OtpHandler = (e) => {
    const data = { ...verifyno };
    data[e.target.id] = e.target.value;
    setVerifyno(data);
    console.log(data);
  };

  useEffect(() => {
    console.log();

    if (verifyno.otp.length == 4) {
      setbtnDisable(false);
    } else {
      setbtnDisable(true);
    }
  }, [verifyno.otp]);

  const Otp = (e) => {

    setwaiting(true);

    e.preventDefault();

    if (verifyno.otp.length != 4) {
      setOtpValidation("Please Enter Valid OTP");
    } else {
      setOtpValidation("");
    }

    const url = "https://app.5am5pm.com:3000/commonapi/verifyotp";
    axios
      .post(url, {
        mobile: props.LoginMobileNo,
        otp: verifyno.otp,
      })
      .then((res) => {
  
        const ApiStatus = res.data.status;
        if (ApiStatus == "success") {
          localStorage.setItem("role", res.data.data.role);
          localStorage.setItem("token", res.data.data.token);

          const Role = res.data.data.role;
          const Token = res.data.data.token;

          if (Role == "Student" && Token) {
            studentDashboard();
          } else if (Role == "Staf" && Token) {
            StaffDashboard();
          } else if (Role == "Institute" && Token) {
            InstituteDashboard();
          } else {
            alert("failed");
          }

          setwaiting(false);

        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          setOpenSnack(true);
          setSnackmsg(err.response.data.message);
          setwaiting(false);
        }
      });
  };

  //student Dashboard function
  const studentDashboard = () => {
    window.location.href="/app/studentdashboard";
  }
  //Staff Dashboard function
  const StaffDashboard = () => {
    window.location.href="/app/staffdashboard";
  }
  // Institute Dashboard function
  const InstituteDashboard = () => {
    window.location.href="/app/institutedashboard";
  }

   //snackbar
   const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const ResendOTP = () => {
    const url = `https://app.5am5pm.com:3000/commonapi/resendotp`;
    axios
    .post(url,{
      number:props.LoginMobileNo,
    })
    .then((res) => {
      console.log(res.data);
      if(res.data.status == 'success'){
        setOpenSnack1(true);
        setSnackmsg1("Resend OTP Successfull")
      }else{
        setOpenSnack2(true);
        setSnackmsg2("Resend OTP Failed")
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const { vertical, horizontal, open } = state;


  const classes = useStyles();

 

  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={8} sm={6} xs={12}>
        <div className='responsiveStyle'>
          <div className="loginBG">
            {/* <img src={img1} className={classes.Loginbg}></img> */}
          </div>
        </div>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>

        <div className='loginStyle'>

        <img src={logo} width="150px" className={classes.imagestyle}></img>
              
        <Grid container>
          <Grid item md={12} sm={12} xs={12}>

        
          <div className="loginstylepadding">
            <p>ENTER YOUR OTP</p>
            <Box
              sx={{
                width: "100%",
                
              }}
            >
              <TextField
                fullWidth
                label="ENTER YOUR 4 DIGIT OTP"
                autoComplete="off"
                id="otp"
                onChange={(e) => OtpHandler(e)}
                helperText={OtpValidation}
              />
            </Box>
            <br></br>
            <Box
              sx={{
                width: "100%",
              
              }}
            >
              <Button
                disabled={btnDisable}
                onClick={(e) => Otp(e)}
                className={classes.loginbtn}
                variant="contained"
                style={{backgroundColor:'#003db3',borderRadius:0}}
              >
                VERIFY OTP &nbsp;

              {/* progress bar */}

              <Box sx={{ display: 'flex' }}>
              <CircularProgress size={20} style={{color:'#fff'}} variant={(waiting) ? 'indeterminate' : 'determinate'} />
              </Box>

              </Button>
              <Box sx={{textAlign:'center',pt:'10px'}}>
              <Typography variant="p" onClick={ResendOTP} className={classes.resendotp}>Resend Your OTP</Typography>
              </Box>
            </Box>

       

          </div>
          </Grid>
          </Grid>
          </div>
        </Grid>
      </Grid>

      <div>
     
     <Snackbar
       anchorOrigin={{vertical:"top", horizontal:"right"}}
       open={OpenSnack}
   
       key={vertical + horizontal}
       autoHideDuration={6000}
       onClose={handleClosee1}
     >

<Alert severity="error" sx={{ width: '100%' }}>
{SnackMsg}
  </Alert>
  </Snackbar>
   </div>




   <div>
     
     <Snackbar
       anchorOrigin={{vertical:"top", horizontal:"right"}}
       open={OpenSnack1}
   
       key={vertical + horizontal}
       autoHideDuration={6000}
       onClose={handleClosee2}
     >

<Alert severity="success" sx={{ width: '100%' }}>
{SnackMsg1}
  </Alert>
  </Snackbar>
   </div>


   <div>
     
     <Snackbar
       anchorOrigin={{vertical:"top", horizontal:"right"}}
       open={OpenSnack2}
   
       key={vertical + horizontal}
       autoHideDuration={6000}
       onClose={handleClosee2}
     >

<Alert severity="error" sx={{ width: '100%' }}>
{SnackMsg2}
  </Alert>
  </Snackbar>
   </div>



      
    </React.Fragment>
  );
};

export default VerifyOtp;
