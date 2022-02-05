import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Container,
  AppBar,
  Toolbar,
  Button,
  TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

//files
import MenuBar from '../Home/AppBar/AppBar';
import AppBar2 from "../Home/AppBar2/AppBar2";

//style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  modalloginbtn: {
    textAlign: "center",
    cursor: "pointer !important",
    width: "50%",
  },
});

const Enrolement = () => {
  const classes = useStyles();
  const queryParams = new URLSearchParams(window.location.search);
  const Course_id_enrolPage = queryParams.get("Course-id");

  //storing the carousel course enroled
  const [Enrol1, setEnrol1] = useState([]);


  useEffect(() => {
    axios
      .get(
        `https://app.5am5pm.com:3000/commonapi/getpubliccourseById/${Course_id_enrolPage}`
      )
      .then((res) => {
        console.log(res.data.data);
        setEnrol1(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //enroll signup hooks
  const [SignupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
  });
   //preloader hooks
   const[waiting,setWaiting] = useState(false)

  //modal box hooks
  const [open, setOpen] = React.useState(false);
  //modal box-2 hooks
  const [open1, setOpen1] = React.useState(false);

  const handleClose2 = () => {
    setOpen(false);
    setWaiting(false);
  }

  const handleClose1 = () => setOpen1(false);




 



  //enrol signup
  const EnrolSignup = (e) => {
    const Role = localStorage.getItem("role");
    const Token = localStorage.getItem("token");

    if (Role == "Student" && Token) {
      OpenPurchasePage();
    } else {
      openmodalboxSignup();
    }
  };

  //open purchase page function
  const OpenPurchasePage = () => {
    window.location.href="/Payment?course_id=" + Course_id_enrolPage;
  };

  //open modalboxsignup
  const openmodalboxSignup = () => {
    setOpen(true);
  };

  //enroll signup handler
  const enrolSignupHandler = (e) => {
    const Data = { ...SignupData };
    Data[e.target.id] = e.target.value;
    console.log(Data);
    setSignupData(Data);
  };

  const EnrolSignupSubmit = (e) => {

    EnrolSignupValidation();
  };


   //helper text hooks
   const[helpFN,setHelpFN] = useState("");
   const[helpLN,setHelpLN] = useState("");
   const[helpE,setHelpE] = useState("");
   const[helpM,setHelpM] = useState("");
 
   //error handling validatuion hooks
   const[EFN,setEFN] = useState(false);
   const[ELN,setLN] = useState(false);
   const[EEmail,setEEmail] = useState(false);
   const[EMobile,setEMobile] = useState(false);

  const EnrolSignupValidation = () => {
    if(SignupData.first_name == ""){
      setHelpFN("Enter Your First Name");
      setEFN(true)
    }else{
      setHelpFN("");
      setEFN(false)
    }
    if(SignupData.last_name == ""){
      setHelpLN("Enter Your Last Name");
      setLN(true)
    }else{
      setHelpLN("");
      setLN(false)
    }
    //email validation

    var mailformat =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!SignupData.email .match(mailformat))
    {
      setHelpE("Please Enter a Valid E-mail ID")
      setEEmail(true)
    }else{
      setHelpE("")
      setEEmail(false)
    }

    if(SignupData.mobile.length != 10){
      setHelpM("Please Enter Valid Mobile No")
      setEMobile(true)
    }else{
      setHelpM("");
      setEMobile(false);
    }

    if(SignupData.first_name !="" && SignupData.last_name !="" && SignupData.EEmail !="" && SignupData.mobile.length == 10){
      submitEnrolSignupData();
    }

  }

  const submitEnrolSignupData = () => {
    setWaiting(true);
    const url = "https://app.5am5pm.com:3000/privatestudent/signup";
    axios
      .post(url, {
        first_name: SignupData.first_name,
        last_name: SignupData.last_name,
        email: SignupData.email,
        mobile: "+91" + SignupData.mobile,
      })
      .then((result) => {
        console.log(result.data);
        if(result.data.status == "success"){
          setWaiting(false);
          OpenSecondModal();
        }
      })
      .catch((err) => {
        console.log("huii",err)
        setOpenSnack(true);
        setSnackmsg(err.response.data.message);
        setWaiting(false);
      });
  }



  const OpenSecondModal = () => {
    setOpen(false);
    setOpen1(true);
  }

  const [OpenSnack, setOpenSnack] = useState(false);

  const handleClosee1 = () => {
    setOpenSnack(false);
  }

  const [SnackMsg, setSnackmsg] = useState("");

     //snackbar
     const [state, setState] = React.useState({
      vertical: 'top',
      horizontal: 'center',
    });
  
    const { vertical, horizontal, open9 } = state;






    //---------------------verify OTP API call --------------------------------------------//

    //api data hooks
    const[verifyOtp,setVerifyOtp] = useState({
      mobile:'',
      otp:''
    })

    //button disabling hooks
    const[onbtn,setonbtn] = useState(true);

    const OTPHandler = (e) => {
      const NewData = {...verifyOtp};
      NewData[e.target.id] = e.target.value;
      setVerifyOtp(NewData);
    }

    useEffect(() => {
      if(verifyOtp.otp.length == 4){
        setonbtn(false);
      }else{
        setonbtn(true);
      }
    },[verifyOtp.otp])

    const VerifymobileOTP = (e) => {
        e.preventDefault();
        const url = "https://app.5am5pm.com:3000/privatestudent/otpverify";
        axios
        .post(url,{
          mobile: "+91" + SignupData.mobile,
          otp:verifyOtp.otp,
        })
        .then((res) => {
         if(res.data.status == "success"){
           localStorage.setItem('role',res.data.data.role);
           localStorage.setItem('token',res.data.data.token);
           redirecttoPurchase();
         }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
    }

    const redirecttoPurchase = () => {
      window.location.href="/Payment?course_id=" + Course_id_enrolPage;
    }



    const gotologin = () => {
      window.location.href="/Login";
    }


if(Course_id_enrolPage){

  return (
    <React.Fragment>
   <MenuBar/>
   <AppBar2/>
      <div style={{ height: "64px" }}></div>
      {Enrol1.map((data) => {
        return (
          <Container maxWidth="xl">
            <Grid container>
              <Grid item md={12}>
                <Typography variant="h5">
                  {data.course_name} Certification Training Course
                </Typography>
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={4}>
              <Grid item md={3}>
                <div>
                  <img src={data.course_image} width={"100%"}></img>
                </div>
              </Grid>
              <Grid item md={6}>
                <div style={{ textAlign: "justify" }}>
                  <html lang="en">
                    <body>{data.course_subtitle}</body>
                  </html>
                </div>
              </Grid>
              <Grid item={3}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#003db3" }}
                  onClick={(e) => EnrolSignup(e)}
                >
                  ENROLL THE COURSE
                </Button>
              </Grid>
            </Grid>
            <br></br>
            <Grid container>
              <Grid item md={12}>
                <Typography variant="subtitle1">
                  {data.about_instructor}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        );
      })}

      {/* modal box code */}
      <div>
        <Modal
          open={open}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} width={"100%"}>
            <Typography
              style={{ textAlign: "center", color: "#003db3" }}
              id="modal-modal-title"
              variant="h6"
            >
              SIGN-UP
            </Typography>
            <div style={{ height: "15px" }}></div>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  error={EFN}
                  fullWidth
                  type="text"
                  id="first_name"
                  onChange={(e) => enrolSignupHandler(e)}
                  label="First Name"
                  helperText={helpFN}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  error={ELN}
                  fullWidth
                  type="text"
                  id="last_name"
                  onChange={(e) => enrolSignupHandler(e)}
                  label="Last Name"
                  helperText={helpLN}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  error={EEmail}
                  fullWidth
                  type="text"
                  id="email"
                  onChange={(e) => enrolSignupHandler(e)}
                  label="Email"
                  helperText={helpE}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  error={EMobile}
                  fullWidth
                  type="text"
                  id="mobile"
                  onChange={(e) => enrolSignupHandler(e)}
                  label="Mobile"
                  helperText={helpM}
                />
              </Grid>

              <Grid item md={12}>


              <div style={{ textAlign: "center" }}>
                      <Button
                        className={classes.modalloginbtn}
                        onClick={(e) => EnrolSignupSubmit(e)}
                        variant="contained"
                        color="primary"
                      >
                      &nbsp;  SUBMIT &nbsp;
                        <Box sx={{ display: "flex" }}>
                          <CircularProgress
                            size={20}
                            variant={waiting ? "indeterminate" : "determinate"}
                            style={{ color: "#fff", fontSize: "30px" }}
                          />
                        </Box>
                      </Button>
                    </div>

              </Grid>
              
              <Grid container>
                <Grid item md={12}>
                <div style={{textAlign:'center'}}>
                <br></br>
                  <Typography variant="subtitle1">Already An User <span style={{color:'#003db3',cursor:'pointer'}} onClick={gotologin}>Login</span> Here</Typography>
                </div>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>

      {/* second modal box for otp */}
      <div>
        <Modal
          open={open1}
          onClose={handleClose1}
        >
          <Box sx={style1} width={"100%"}>
            <Typography
              style={{ textAlign: "center", color: "#003db3" }}
              id="modal-modal-title"
              variant="h6"
            >
              VERIFY YOUR 4 DIGIT OTP
            </Typography>
      <div style={{height:'20px'}}></div>
      <Grid container>
        <Grid item md={12}>
          <div style={{textAlign:'center'}}>
          <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="ENTER YOUR OTP" onChange={(e) => OTPHandler (e)} id="otp" />
    </Box>
          </div>
        </Grid>
      </Grid>
      <div style={{height:'20px'}}>
      </div>
      <Grid container>
        <Grid item md={12}>
          <div style={{textAlign:'center'}}>
            <Button
            disabled={onbtn}
            variant="contained" 
            style={{backgroundColor:'#003db3'}}
             onClick={(e) => VerifymobileOTP(e)}>
               VERIFY OTP
             </Button>
          </div>
        </Grid>
      </Grid>
          </Box>
        </Modal>
      </div>

      {/* snackbar code */}
      <div>
     
     <Snackbar
       anchorOrigin={{ vertical, horizontal }}
       open={OpenSnack}
       message={SnackMsg}
       key={vertical + horizontal}
       autoHideDuration={6000}
       onClose={handleClosee1}
     />
   </div>


    </React.Fragment>
  );

}else{
  window.location.href="/"
}

  
};
export default Enrolement;
