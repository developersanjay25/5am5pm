import * as React from "react";
import "./StepperForm.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ModalUnstyled } from "@mui/core";
import { height, styled } from "@mui/system";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import { FormHelperText } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Fade from '@mui/material/Fade';
import axios from "axios";
import MuiPhoneNumber from 'material-ui-phone-number';
import Tooltip from '@mui/material/Tooltip';


//form style
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Container,
  IconButton,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, FormProvider } from "react-hook-form";
import { Code } from "@material-ui/icons";
import Menu from '@mui/material/Menu';

//part 2

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 1);
  -webkit-tap-highlight-color: transparent;
`;

// modal box style

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "50%",
  height: "auto",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  boxShadow: 60,
  p: 4,
};

//styles

const useStyles = makeStyles({
  StepperBtn: {
    backgroundColor: "#003db3",
    width: "400px",
  },
  loginbtn: {
    width:'100%',
    backgroundColor: "#003db3 !important",
    '&:hover': {
      backgroundColor:'#003db3',
   },
 
  },
  modalloginbtn: {
    textAlign: "center",
    cursor: "pointer !important",
    width: "50%",
  },

  nextbtnStyle:{
    borderRadius:0,
    backgroundColor: "#003db3 !important",
    color:'#fff',
    '&:hover': {
      backgroundColor:'#003db3',
      color:'#fff',
  },
},

});

//stepper form

const StepperForm = (props) => {
  const methods = useForm({});
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  function getSteps() {
    return ["OTP", "DOMAIN", "ADD USERS", "SUBSCRIPTIONS", "DASHBOARD"];
  }

  //                                 --------------------- OTP FUNCTION --------------------                            //

  const OTP = () => {
    const [OTPData, setOTPData] = useState({
      verifyotp: "",
    });

    
         // error snack hooks

         const [SnackErr, setSnackErr] = useState(false);
         const [SnackMsg, setSnackMsg] = useState("");
     
         // sncak handle close
     
         const SnackhandleClose = () => {
           setSnackErr(false);
         };

    //otp handler

    const OTPHandler = (e) => {
      const Data = { ...OTPData };
      Data[e.target.id] = e.target.value;
      setOTPData(Data);
      console.log(Data);
    };

    // otp submit btn function

    const verifybtn = () => {
      setLoading(true);

      // api call

      const url = "https://app.5am5pm.com:3000/institute_admin/verifyotp";

      axios
        .post(url, {
          mobile:props.InsMobile,
          // mobile: "+918838464696",
          verifyotp: OTPData.verifyotp,
        })
        .then((res) => {
          console.log(res.data);
          const status = res.data.status;
          if (status == "success") {
            localStorage.setItem("role",res.data.data.role);
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("institute_id", res.data.data.institute_id);
            OTPVerified();
          }
        })
        .catch((err) => {
          setSnackErr(true);
          setSnackMsg(err.response.data.message);
        });
    };

    //otp validation hooks

    const [Otpbtn, setOtpBtn] = useState(false);

    useEffect(() => {
      if (OTPData.verifyotp.length == 4) {
        setOtpBtn(false);
      } else {
        setOtpBtn(true);
      }
    }, [OTPData.verifyotp]);

    const OTPVerified = () => {
      setActiveStep((currentStep) => currentStep + 1);
      setLoading(false);
    };

    //progressBar hooks
    const [loading, setLoading] = useState(false);

    //styles
    const classes = useStyles();

    
      //snackbar code

      const [state, setState] = React.useState({
        open: false,
        vertical: "top",
        horizontal: "center",
      });
  
      const { vertical, horizontal, Sopen } = state;
  
      const handleClick = (newState) => () => {
        setState({ Sopen: true, ...newState });
      };
  
      const handleClose = () => {
        setState({ ...state, Sopen: false });
      };

    


    return (
     
      <>
    
       <Grid container>
      
        <Grid item md={12} sm={12} xs={12}>
          <div className="stepperFormAlignmentStyle">
          <Box
                sx={{
                width: '50%',
                    }}
                > 
                <Typography variant="h6">ENTER YOUR OTP:</Typography>
                <div className="cppheightStyle1"></div>
        <TextField
            fullWidth
            label="VERIFY OTP"
            id="verifyotp"
            onChange={(e) => OTPHandler(e)}
        />
         <div className="cppheightStyle2"></div>
        <Button
            disabled={Otpbtn}
            variant="contained"
            color="primary"
            onClick={verifybtn}
          >
            VERIFY OTP &nbsp;
            <Box sx={{ display: "flex" }}>
              <CircularProgress
                size={20}
                variant={loading ? "indeterminate" : "determinate"}
                style={{ color: "#fff", fontSize: "30px" }}
              />
            </Box>
          </Button>
          </Box>
          </div>
        </Grid>
       
       </Grid>

       <div>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={SnackErr}
            onClose={SnackhandleClose}
            message={SnackMsg}
            key={vertical + horizontal}
            autoHideDuration={6000}
          />
        </div>
      </>
    );
  };

  //                        ----------------------  DOMAIN  ------------------------              //

  const Domain = () => {
    const SkipBtn = () => {
      setActiveStep((currentStep) => currentStep + 1);
    };

       //styles
       const classes = useStyles();

    return (
      <React.Fragment>

        <Grid containe>
          <Grid item md={12} sm={12} xs={12}>
            <div className="domainwhitelableStyle">
              
          <Box
          sx={{
            width: '50%',
           
          }}
        >
          <Typography variant="h6">DOMAIN WHITE LABLE REGISTRATION:</Typography>
          <div className="cppheightStyle1"></div>
          <TextField fullWidth label="Domain" id="Domain" />
          <div className="cppheightStyle2"></div>
          <Button className={classes.loginbtn} variant="contained" onClick={SkipBtn}>
            Skip for now
          </Button>
        </Box>
        </div>
          </Grid>
        </Grid>
        
      </React.Fragment>
    );
  };

  //                                        ------------------ ADD USERS -------------------------              //

  const Users = () => {



    //country code hooks
    const[Country,setCountry] = useState("");

    //counrty code phone no hooks
    const[AddPhone,setAddPhone] = useState("");


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




















    const token = localStorage.getItem("token");

    const Edit = () => {
      alert("edit button");
    };

    const Delete = () => {
      alert("delete button");
    };

    // hooks for table data

    const [tData, settData] = useState([]);

    const rows = tData.map((obj, index) => ({ id: index + 1, ...obj }));

    //display staff and student on that institute

    const columns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "first_name", headerName: "First name", width: 130 },
      { field: "last_name", headerName: "Last name", width: 130 },
      {
        field: "mobile",
        headerName: "mobile",
        width: 150,
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
      },
      {
        field: "role",
        headerName: "Role",
        width: 130,
      },
      {
        field: "Edit",
        headerName: "Edit",
        sortable: false,
        width: 140,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer", color: "#003db3" }}
                onClick={Edit}
              >
                <EditIcon />
              </div>
            </React.Fragment>
          );
        },
      },
      {
        field: "Delete",
        headerName: "Delete",
        sortable: false,
        width: 140,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer", color: "#003db3" }}
                onClick={Delete}
              >
                <DeleteIcon />
              </div>
            </React.Fragment>
          );
        },
      },
    ];

    // change hooks for useEffect

    const [receiveData, setreceiveData] = useState(false);

    // table data api
    useEffect(() => {
      getTableApi();
    }, [receiveData]);

    const getTableApi = () => {
      
      axios
        .get(
          "https://app.5am5pm.com:3000/commonapi/display_staf_student_unique",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status == "success") {
            settData(res.data.data);
            console.log(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // modal box hooks

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    //pre-loader hooks

    const [loading, setLoading] = useState(false);

    //addind staff and students hooks

    const [AddUsers, setAddUsers] = useState({
      first_name: "",
      last_name: "",
      email: "",
      role: "",
    });

    //userHandler
    const UserHandler = (e) => {
      const Data = { ...AddUsers };
      Data[e.target.id] = e.target.value;
      setAddUsers(Data);
      console.log(Data);
    };

    const classes = useStyles();














    // ---------------- Basic select Code ---------------------------- //
    const [Role, setRole] = React.useState("");

    const handleChange = (event) => {
      setRole(event.target.value);
      console.log(event.target.value);
    };

    //data validation hooks
    const [userName1, setuserName1] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userMobile, setUserMobile] = useState("");
    const [userRole, setUserRole] = useState(false);

    //data error handling hooks
    const [fName, setfName] = useState(false);
    const [lName, setlName] = useState(false);
    const [UEmail, setUEmail] = useState(false);
    const [UMobile, setUMobile] = useState(false);
    const [URole, setURole] = useState(false);

    // user Submit 1

    const UserSubmit = () => {
      if (AddUsers.first_name == "") {
        setuserName1("Please Enter First Name");
        setfName(true);
      } else {
        setuserName1("");
        setfName(false);
      }
      if (AddUsers.last_name == "") {
        setUserLastName("Please Enter Last Name");
        setlName(true);
      } else {
        setUserLastName("");
        setlName(false);
      }
      var mailformat =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (AddUsers.email.match(mailformat)) {
        setUserEmail("");
        setUEmail(false);
      } else {
        setUserEmail("Please Enter Valid Email");
        setUEmail(true);
      }
      if (AddPhone == "") {
        setUserMobile("Please Enter Valid Mobile No");
        setUMobile(true);
      } else {
        setUserMobile("");
        setUMobile(false);
      }
      if (AddUsers.role) {
        setUserRole(true);
        setURole(true);
      } else {
        setUserRole(false);
        setURole(false);
      }

      if (
        AddUsers.first_name != "" &&
        AddUsers.last_name != "" &&
        AddUsers.email.match(mailformat) &&
        AddPhone !== ""
      ) {
        UserSubmit1();
      }
    };

    // error snack hooks

    const [SnackErr, setSnackErr] = useState(false);
    const [SnackMsg, setSnackMsg] = useState("");

    // sncak handle close

    const SnackhandleClose = () => {
      setSnackErr(false);
    };

    // users submit api call

    const UserSubmit1 = () => {
      setLoading(true);
     
      const url =
        "https://app.5am5pm.com:3000/commonapi/staf_student_signup_inside";
      axios
        .post(
          url,
          {
            first_name: AddUsers.first_name,
            last_name: AddUsers.last_name,
            email: AddUsers.email,
            mobile: AddPhone,
            role: Role,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          
          const status = res.data.status;
          if (status == "success") {
            console.log(res.data)
            setreceiveData(true);
            setOpen(false);
            setLoading(false);
          }
        })
        .catch((err) => {
          setSnackErr(true);
          setSnackMsg(err.response.data.message);
        });
    };

    // close btn
    const closebtn = () => {
      setOpen(false);
    };

    //snackbar code

    const [state, setState] = React.useState({
      open: false,
      vertical: "top",
      horizontal: "center",
    });

    const { vertical, horizontal, Sopen } = state;

    const handleClick = (newState) => () => {
      setState({ Sopen: true, ...newState });
    };

    const handleClose = () => {
      setState({ ...state, Sopen: false });
    };

    //next button

    const nxtbtn = () => {
      setActiveStep((currentStep) => currentStep + 1);
    };






      //stepper sighnup handler
      
      const steppersignupphonenoHandler = (e) => {
        setAddPhone(e)
      }









    return (
      <React.Fragment>

        <Grid container>
          <Grid item md={12} sm={12} xs={12}>
          <h1 style={{textAlign:'center'}}>USERS</h1>
        </Grid>
        </Grid>  
        <Grid container>
          <Grid item md={12} sm={12} xs={12}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={6}
                rowsPerPageOptions={[6]}
                checkboxSelection
              />
            </div>
          </Grid>
        </Grid>
        <Container>
          <Grid container>
            <Grid item md={12} sm={12} xs={12}>
              <div id="addUsers-container" style={{ textAlign: "right" }}>
              <Tooltip title="Add Staff/Student" placement="left-start">
                <GroupAddIcon id="addUsers" onClick={handleOpen} />
              </Tooltip>
              </div>
            </Grid>
          </Grid>
        </Container>


















        {/* ------------------------------------------    modal box code      ------------------------------------------------- */}











        <div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ textAlign: "center" }}
              >
                ADD STUDENT / STAFF
              </Typography>

              <div>
                <Grid container>
                  <Grid item md={12}>
                    <div style={{ textAlign: "right" }}>
                      <CloseIcon onClick={closebtn} />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <br></br>
              <div>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <TextField
                      error={fName}
                      fullWidth
                      label="First Name"
                      id="first_name"
                      onChange={(e) => UserHandler(e)}
                      helperText={userName1}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={lName}
                      fullWidth
                      label="Last Name"
                      id="last_name"
                      onChange={(e) => UserHandler(e)}
                      helperText={userLastName}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={UEmail}
                      fullWidth
                      label="Email"
                      id="email"
                      onChange={(e) => UserHandler(e)}
                      helperText={userEmail}
                    />
                  </Grid>
                  <Grid item md={6}>
                    {/* <TextField
                      error={UMobile}
                      fullWidth
                      label="Mobile"
                      id="mobile"
                      onChange={(e) => UserHandler(e)}
                      helperText={userMobile}
                    /> */}

                      
                <Box
                             sx={{
                              width: '100%',
                            
                         }}
                         >

                        <MuiPhoneNumber autoFormat={false} label="mobile no" fullWidth variant="outlined"  helperText={userMobile} error={UMobile} disableAreaCodes enableLongNumbers defaultCountry={Country} onChange={(e) => steppersignupphonenoHandler (e)}/>
                         </Box>
              





                  </Grid>
                  <Grid item md={6}>
                    <Box sx={{ minWidth: 120, height: "100px" }}>
                      <FormControl fullWidth error={URole}>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="Role"
                          value={Role}
                          label="Age"
                          onChange={handleChange}
                        >
                          <MenuItem value={"Staff"}>Staff</MenuItem>
                          <br></br>
                          <MenuItem value={"Student"}>Student</MenuItem>
                        </Select>
                        <FormHelperText error={URole}>
                          Please Select Role
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <div style={{ textAlign: "center" }}>
                      <Button
                        className={classes.modalloginbtn}
                        onClick={UserSubmit}
                        variant="contained"
                        color="primary"
                      >
                        SUBMIT &nbsp;
                        <Box sx={{ display: "flex" }}>
                          <CircularProgress
                            size={20}
                            variant={loading ? "indeterminate" : "determinate"}
                            style={{ color: "#fff", fontSize: "30px" }}
                          />
                        </Box>
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Modal>
        </div>

        <div>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={SnackErr}
            onClose={SnackhandleClose}
            message={SnackMsg}
            key={vertical + horizontal}
            autoHideDuration={6000}
          />
        </div>
        
        <Grid container>
          <Grid item md={12} sm={12} xs={12}>
            <div style={{ textAlign: "center" }}>
              <Button className={classes.nextbtnStyle} variant="contained" color="primary" onClick={nxtbtn}>
                NEXT
              </Button>
            </div>
          </Grid>
        </Grid>
     
      </React.Fragment>
    );
  };

  // ----------------------------------------- Subscription --------------------------------------- //

  const Subscription = () => {

    const planspricingbckbtn = () => {
      setActiveStep((currentStep) => currentStep -1)
    }


    //payment gateway razor pay

    function loadScript(src) {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    }


    async function displayRazorpay(e, price, plan_id, package_name) {

      console.log(package_name);
      
      if(price == 0){
        setActiveStep((currentStep)=>currentStep +1)
      }

      //const token = localStorage.getItem("token");

      e.preventDefault();

      const data = {amount:price, plan_id:plan_id, package_name:package_name}


      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      let token = localStorage.getItem("token")

      // creating a new order
      axios.post("https://app.5am5pm.com:3000/payment/create_order",data,{ headers: {"authorization" : `Bearer ${token}`} })
      
      .then((res) => {
          
      console.log("test",res.data.data)
      
      const { amount, id, currency, receipt } = res.data.data;

      const {plan_id,package_name} = res.data.data.notes

      console.log(res.data.data.notes)

      const options = {
        key: "rzp_test_LlNbRaLp6AdCf2", // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: currency,
        name: "Iaaxin Tech Labs.",
        description: "Test Transaction",
        order_id: id,
        handler: async function (response) {
          console.log(response)
          const data = {
            plan_id:plan_id,
            package_name:package_name,
            receipt: receipt,
            amount: amount,
            orderCreationId: id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          await axios
            .post("https://app.5am5pm.com:3000/payment/verify", data,{ headers: {"authorization" : `Bearer ${token}`} })
            .then((result) => {
              console.log("test",result.data);
             const paymentResult = result.data.status;
            if(paymentResult == "success"){
              setActiveStep((currentStep) => currentStep + 1)
            }
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        },
        prefill: {
          name: "Iaaxin",
          email: "Iaaxin@Iaaxin.com",
          contact: "+911111111111",
        },
        notes: {
          address: "Iaaxin Tech Labs",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    })
    .catch((err) => {
      console.log(err.response.data);
    });

    }



    
    // plans hooks
    const [plans,setplans] = useState([]);
    console.log(plans)
    
    //api call for plans
    useEffect(() => {
      axios.get("https://app.5am5pm.com:3000/super_admin/getplandetails")
      .then((res) => {
        setplans(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },[])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [senddata,setsenddata] = useState([])
    const open = Boolean(anchorEl);
    const handleClick = (event, monthly_price,yearly_price,id,planname) => {
      
      setAnchorEl(event.currentTarget);
      setsenddata({monthly_price:monthly_price, yearly_price:yearly_price, id:id, planname:planname })
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const pricePrevious = () =>{
      setActiveStep((currentStep) => currentStep - 1)
    }

    // simple menu
  
    const testbtn = () => {
      setActiveStep((currentStep) => currentStep + 1)
    }
  
    const classes = useStyles();
  
    
    return (
      <React.Fragment>
        <Grid container>
          <Grid item md={12}>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h3">PLANS AND PRICING</Typography>
            </div>
          </Grid>
        </Grid>

      
        <Divider />
        <br></br>
      <Container>
        <Grid container spacing={2}>
          {
            plans.map((x) => {
              return(
                <Grid item md={3} sm={6} xs={12}>
                  <div style={{textAlign:'center'}}>
                    <Card style={{width:'100%',height:'700px'}}>
                      <CardContent>
        <Typography variant="h4">{x.plan_name}</Typography>
        <span id="rupeeSymbol">&#8377;</span><span id="planPrice">{x.monthly_price}</span>
        <br></br>
        <div>
        <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e)=>handleClick(e,x.monthly_price, x.yearly_price ,x._id, x.plan_name)}
                        variant="contained"
                        className={classes.nextbtnStyle}
                      >
                        Buy Now
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={(e)=> displayRazorpay(e, senddata.monthly_price, senddata.id, 'Monthly')} style={{display:'flex',justifyContent:'center'}}> 
                        
                          Monthly
                        
                        </MenuItem><br></br>
                        <MenuItem onClick={(e)=> displayRazorpay(e, senddata.yearly_price, senddata.id, 'yearly')} style={{display:'flex',justifyContent:'center'}}>
                         
                         Yearly

                        </MenuItem>
                      </Menu>
    </div>
        <br></br><br></br>
        <Divider id="divider"/>
        <br></br>
        <Typography variant="h4" style={{backgroundColor:'#F2F2F2',color:'#222'}}>
          Features
        </Typography>
        <br></br>
        <Divider/>
        <br></br>
        <Typography variant="h6">Storage : {x.storage}</Typography>
        <Typography variant="h6">Minitues Of Conference : {x.minitues_of_conference}</Typography>
        <Typography variant="h6">Users Per Meeting : {x.users_per_meeting}</Typography>
        <Typography variant="h6">No of Rooms : {x.no_of_rooms}</Typography>
        <Typography variant="h6">Recommended : {x.recommended}</Typography>
        <Typography variant="h6">Offer Value : {x.offer_value}</Typography>
        <Typography variant="h6">Days : {x.days}</Typography>
        <Typography variant="h6">Monthly Price : {x.monthly_price}</Typography>
        <Typography variant="h6">Yearly Price : {x.yearly_price}</Typography>
      </CardContent>
    </Card>
</div>
                </Grid>
              );
            })
          }
        </Grid>

          <div className="cppheightStyle2"></div>
            <Grid container>
              <Grid item md={12}>
                <div style={{textAlign:'center'}}>
                  <Button 
                  className={classes.nextbtnStyle}
                  onClick={(e) => pricePrevious (e)}
                  >Back</Button>
                </div>
              </Grid>
            </Grid>


       </Container>  
      
      </React.Fragment>
    );
  };

 // ---------------------------- Dashboard ------------------------------------ //

  const Dashboard = () => {

    const classes = useStyles();

    const InsDashboard = () => {
      window.location.href="/app/institutedashboard";
    }

    return(
      <React.Fragment>
       <Grid
         container
         direction="row"
         justifyContent="center"
         alignItems="center"
        >
          <Grid item md={12}>
            <div className="gotoDash">
            <Button variant="contained" className={classes.nextbtnStyle} onClick={InsDashboard}>Go To Dashboard</Button>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  //------------------------------------ Stepper Content ----------------------------------- //

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <OTP />;
      case 1:
        return <Domain/>;
      case 2:
        return <Users />;
      case 3:
        return <Subscription />;
      case 4:
        return <Dashboard/>;
      default:
        return "unknown step";
    }
  }

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    console.log(data);
    if (activeStep == steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          setActiveStep(activeStep + 1);
        });
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar style={{ backgroundColor: "#003db3", color: "#fff" }}>
          <Typography variant="h6" noWrap component="div">
            INSTITUTE SIGNUP
          </Typography>
        </Toolbar>
      </AppBar>

    {/* 1 */}


    <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        >
        

        <Box sx={{ overflow: "auto" }}>
        
        <div className="cppstepperStyle">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => {
              const labelProps = {};
              const stepProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography
                   
                  ></Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }

              return (
                <Step {...stepProps} key={index}>
                  <StepLabel {...labelProps}>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        
        </Box>

       
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Grid contianer>
          <Grid item md={12}>
            <div>
              {activeStep === steps.length ? (
                <Typography variant="h3" align="center">
                  Thank You
                </Typography>
              ) : (
                <>
                  
                    <div {...methods}>
                      <div onSubmit={methods.handleSubmit(handleNext)}>
                        {getStepContent(activeStep)}
                      </div>
                    </div>
                  
                </>
              )}
            </div>
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
};

export default StepperForm;
