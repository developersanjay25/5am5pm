import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { ModalUnstyled } from "@mui/core";
import { styled } from "@mui/system";
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
import Fade from "@mui/material/Fade";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divider } from "@mui/material";

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
import Menu from "@mui/material/Menu";

//files
import CourseType from "./CourseType";
import BasicInfo from "./BasicInfo";
import Advanceinfo from "./Advancedinfo";

//importing all collected recoil hooks datas to post

import { useRecoilState } from "recoil";
import {
  CType,
  Ccategory,
  CSub_Category,
  Cvideo,
  CLevel,
  CReviews,
  Ccount,
  Cabout,
  Cinstructor,
  Ctitle,
  CaboutTitle,
  Cdate,
  Ctime,
  Cpay,
  Camount,
  Cimage,
  Cname,
  CSubname,
  Ccategoryerr,
  CcategoryTexterr,
  CSub_Categoryerr,
  CSub_Categorytexterr,
  Cnameerr,
  Cnametexterr,
  CSubnameerr,
  CSubnametexterr,
  Cimagetexterr,
  CLeveltexterr,
  CReviewstexterr,
  Ccounttexterr,
  Cabouttexterr,
  Cinstructortexterr,
  Ctitleerr,
  Ctitletexterr,
  CaboutTitleerr,
  CaboutTitletexterr,
  Cdateerr,
  Ctimeerr,
  CTypeButton,
  CpreLoader,
  nextStep,
  checkfornextStep,
} from "./CourseRecoil";

// validation hooks

import { Staff_Course_Type } from "./ValidationHooks";
import { activestepp, dynamicformdataa, inputfieldds, triggersend } from "./dynamicformatoms";

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
    width: "100%",
    backgroundColor: "#003db3 !important",
  },
  modalloginbtn: {
    textAlign: "center",
    cursor: "pointer !important",
    width: "50%",
  },

  stepperSideToolbar: {
    display: "inlineFlex",
    verticalAlign: "middle",
  },
  stepperStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    width: "100%",
    height: "70vh",
  },
});

//stepper form

const CourseCreation = (props) => {
  const methods = useForm({});
  const [activeStep, setActiveStep] = useRecoilState(activestepp);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  function getSteps() {
    return ["Course Type", "Basic Information", "Advanced Settings","Sending Invitation"];
  }

  const [courseButton, setcourseButton] = useRecoilState(CTypeButton);

  console.log("nxt", courseButton);

  //                                 --------------------- COURSE TYPE FUNCTION --------------------                            //

  const Course_type = () => {
    return (
      <>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <CourseType />
        </Grid>

        <Grid contianer>
          <Grid item md={12}>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Button
                disabled={courseButton}
                variant="contained"
                disableElevation
                color="primary"
                onClick={() => setActiveStep((currentStep) => currentStep + 1)}
              >
                NEXT{" "}
              </Button>{" "}
            </div>{" "}
          </Grid>{" "}
        </Grid>
      </>
    );
  };

  // ----------------------------------- Basic Information ---------------------------------------------//

  const BasicInformation = () => {
    const [Data1, setData1] = useRecoilState(CType);
    const [Data2, setData2] = useRecoilState(Ccategory);
    const [Data2err, setData2err] = useRecoilState(Ccategoryerr);
    const [Data2texterr, setData2texterr] = useRecoilState(CcategoryTexterr);
    const [Data3, setData3] = useRecoilState(CSub_Category);
    const [Data3err, setData3err] = useRecoilState(CSub_Categoryerr);
    const [Data3texterr, setData3texterr] =
      useRecoilState(CSub_Categorytexterr);
    const [Data4, setData4] = useRecoilState(Cvideo);
    const [Data5, setData5] = useRecoilState(CLevel);
    const [Data5texterr, setData5texterr] = useRecoilState(CLeveltexterr);
    const [Data6, setData6] = useRecoilState(CReviews);
    const [Data6texterr, setData6texterr] = useRecoilState(CReviewstexterr);
    const [Data7, setData7] = useRecoilState(Ccount);
    const [Data7texterr, setData7texterr] = useRecoilState(Ccounttexterr);
    const [Data8, setData8] = useRecoilState(Cabout);
    const [Data8texterr, setData8texterr] = useRecoilState(Cabouttexterr);
    const [Data9, setData9] = useRecoilState(Cinstructor);
    const [Data9texterr, setData9texterr] = useRecoilState(Cinstructortexterr);
    const [Data10, setData10] = useRecoilState(Ctitle);
    const [Data11, setData11] = useRecoilState(CaboutTitle);
    const [Data12, setData12] = useRecoilState(Cdate);
    const [Data13, setData13] = useRecoilState(Ctime);
    const [Data14, setData14] = useRecoilState(Cpay);
    const [Data15, setData15] = useRecoilState(Camount);
    const [Data16, setData16] = useRecoilState(Cimage);
    const [Data16texterr, setData16texterr] = useRecoilState(Cimagetexterr);
    const [Data17, setData17] = useRecoilState(Cname);
    const [Data17err, setData17err] = useRecoilState(Cnameerr);
    const [Data17texterr, setData17texterr] = useRecoilState(Cnametexterr);
    const [Data18, setData18] = useRecoilState(CSubname);
    const [Data18err, setData18err] = useRecoilState(CSubnameerr);
    const [Data18texterr, setData18texterr] = useRecoilState(CSubnametexterr);

    function basicifovalidation() {
      // Course category
      if (!Data2) {
        setData2err(true);
        setData2texterr("Please select any of above field");
      } else {
        setData2err(false);
        setData2texterr("");
      }

      //  Course sub category
      if (!Data3) {
        setData3err(true);
        setData3texterr("Please select any of above field");
      } else {
        setData3err(false);
        setData3texterr("");
      }

      //  Course Name
      if (!Data17) {
        setData17err(true);
        setData17texterr("Please enter the field");
      } else {
        setData17err(false);
        setData17texterr("");
      }

      // Course discription
      if (!Data18) {
        setData18err(true);
        setData18texterr("Please enter the field");
      } else {
        setData18err(false);
        setData18texterr("");
      }

      //  upload Image
      if (!Data16) {
        setData16texterr("Please Select image");
      } else {
        setData16texterr("");
      }

      // Instruction level
      if (!Data5) {
        setData5texterr("Please select above field");
      } else {
        setData5texterr("");
      }

      // Reviews and ratings
      if (!Data6) {
        setData6texterr("Please select above field");
      } else {
        setData6texterr("");
      }

      // showlearners count
      if (!Data7) {
        setData7texterr("Please select above field");
      } else {
        setData7texterr("");
      }

      // About the course
      if (!Data8) {
        setData8texterr("Please Enter about this course");
      } else {
        setData8texterr("");
      }

      // Abbout the instructor
      if (!Data8) {
        setData9texterr("Please Enter about Instructor");
      } else {
        setData9texterr("");
      }

      if (
        Data3 &&
        Data5 &&
        Data6 &&
        Data7 &&
        Data8 &&
        Data9 &&
        Data16 &&
        Data16 &&
        Data17 &&
        Data18
      ) {
        setActiveStep((currentStep) => currentStep + 1);
      }
    }

    const backbutton = () => {
      setActiveStep((currentStep) => currentStep - 1);
    };

    return (
      <>
        <Grid container>
          <Grid item md={12}>
            <BasicInfo />
          </Grid>{" "}
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={6}>
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                style={{
                  backgroundColor: "#003db3",
                  color: "#fff",
                  borderRadius: "0",
                }}
                onClick={backbutton}
              >
                BACK{" "}
              </Button>{" "}
            </div>{" "}
          </Grid>{" "}
          <Grid item md={6}>
            <div
              style={{
                textAlign: "left",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                style={{
                  backgroundColor: "#003db3",
                  color: "#fff",
                  borderRadius: "0",
                }}
                onClick={basicifovalidation}
              >
                NEXT{" "}
              </Button>{" "}
            </div>{" "}
          </Grid>{" "}
        </Grid>
      </>
    );
  };

  //------------------------------------------------------- Advanced Settings ---------------------------------------------------//

  const AdvancedSettings = () => {
    //recoil hooks of all data:

    const [Data1, setData1] = useRecoilState(CType);
    const [Data2, setData2] = useRecoilState(Ccategory);
    const [Data2err, setData2err] = useRecoilState(Ccategoryerr);
    const [Data2texterr, setData2texterr] = useRecoilState(CcategoryTexterr);
    const [Data3, setData3] = useRecoilState(CSub_Category);
    const [Data3err, setData3err] = useRecoilState(CSub_Categoryerr);
    const [Data3texterr, setData3texterr] =
      useRecoilState(CSub_Categorytexterr);
    const [Data4, setData4] = useRecoilState(Cvideo);
    const [Data5, setData5] = useRecoilState(CLevel);
    const [Data6, setData6] = useRecoilState(CReviews);
    const [Data7, setData7] = useRecoilState(Ccount);
    const [Data8, setData8] = useRecoilState(Cabout);
    const [Data9, setData9] = useRecoilState(Cinstructor);
    const [Data10, setData10] = useRecoilState(Ctitle);
    const [Data10err, setData10err] = useRecoilState(Ctitleerr);
    const [Data10texterr, setData10texterr] = useRecoilState(Ctitletexterr);
    const [Data11, setData11] = useRecoilState(CaboutTitle);
    const [Data11err, setData11err] = useRecoilState(CaboutTitleerr);
    const [Data11texterr, setData11texterr] =
      useRecoilState(CaboutTitletexterr);
    const [Data12, setData12] = useRecoilState(Cdate);
    const [Data12err, setData12err] = useRecoilState(Cdateerr);
    const [Data13, setData13] = useRecoilState(Ctime);
    const [Data13err, setData13err] = useRecoilState(Ctimeerr);
    const [Data14, setData14] = useRecoilState(Cpay);
    const [Data15, setData15] = useRecoilState(Camount);
    const [Data16, setData16] = useRecoilState(Cimage);
    const [Data17, setData17] = useRecoilState(Cname);
    const [Data17err, setData17err] = useRecoilState(Cnameerr);
    const [Data17texterr, setData17texterr] = useRecoilState(Cnametexterr);
    const [Data18, setData18] = useRecoilState(CSubname);

    const [toast, setToast] = useState(false);
    const [toastmessage, setToastmessage] = useState("");
    const [oneone, setoneone] = useState(false);
    const [dynamicformdata , setDynamicformdata] = useRecoilState(dynamicformdataa);
    const [trigger , setTrigger] = useRecoilState(triggersend);
    // const [inputFields, setInputFields] = useRecoilState(inputfieldds)

    const [advancedNextStep,setadvancedNextStep] = useRecoilState(nextStep);


    //check for next step
    const[checkedfornext,setcheckedfornext]= useRecoilState(checkfornextStep);

    const SubmitCreateCourse = () => {
      setoneone(true);
      setTrigger(!trigger);
      if(checkedfornext){
        setActiveStep((currentStep) => currentStep +1)
      }
    
    //   console.log(Data16);
    //   const token = localStorage.getItem("token");
    //   if (!Data10) {
    //     setData10err(true);
    //     setData10texterr("Enter above field");
    //   } else {
    //     setData10err(false);
    //     setData10texterr("");
    //   }

    //   if (!Data11) {
    //     setData11err(true);
    //     setData11texterr("Enter above field title");
    //   } else {
    //     setData11err(false);
    //     setData11texterr("");
    //   }
    //   if (!Data12) {
    //     setData12err(true);
    //   } else {
    //     setData12err(false);
    //   }

    //   if (!Data13) {
    //     setData13err(true);
    //   } else {
    //     setData13err(false);
    //   }

    //   var mycourseData = new FormData();

      

    //   mycourseData.append("option", "Course");
    //   mycourseData.append("type", Data1);
    //   mycourseData.append("course_name", Data17);
    //   mycourseData.append("description", Data18);
    //   mycourseData.append("course_fee", '589');
    //   mycourseData.append("promotional_video", Data4);
    //   mycourseData.append("course_subtitle", Data8);
    //   mycourseData.append("instructional_level", Data5);
    //   mycourseData.append("reviews_ratings", Data6);
    //   mycourseData.append("learners_count", Data7);
    //   mycourseData.append("about_instructor", Data9);
    //   mycourseData.append("course_keywords", "Website");
    //   mycourseData.append("language", "Tamil");
    //   mycourseData.append("amount", Data15);
    //   mycourseData.append("course_image", Data16);
    //   mycourseData.append("category", Data2);
    //   mycourseData.append("subcategory", Data3);
    //   mycourseData.append("session", dynamicformdata);


    //   // if (dynamicformdata) {\
    //   console.log('course',dynamicformdata);
    //     setPreloader(true);
    //     axios
    //       .post(
    //         "https://app.5am5pm.com:3000/course/create_course",
    //         mycourseData,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       )
    //       .then((res) => {
    //         setPreloader(false);
    //         if (res.data.status == "success") {
    //           window.location.href = "/app/staffdashboard";
    //         }
    //       })
    //       .catch((err) => {
    //         setPreloader(false);
    //         setToast(true);
    //         console.log(err.response);
    //         setToastmessage(err.response.data.message);
    //         console.log(err.response);
    //       });
    //   }
    };

    const handleClose = (event) => {
  

      setToast(false);
    };

    const gofinalSteap = () => {
      console.log("check",checkedfornext)
   
    }

    return (
      <React.Fragment>
        <Advanceinfo />
        <Snackbar
          open={toast}
          autoHideDuration={6000}
          onClose={handleClose}
          message={toastmessage}
          // action={action}
        />
        <Grid container spacing={2}>
          <Grid item md={6}>
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                style={{
                  backgroundColor: "#003db3",
                  color: "#fff",
                  borderRadius: "0",
                }}
                onClick={() => setActiveStep((currentStep) => currentStep - 1)}
              >
                BACK
              </Button>
            </div>
          </Grid>
          <Grid item md={6}>
            <div
              style={{
                textAlign: "left",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                style={{
                  backgroundColor: "#003db3",
                  color: "#fff",
                  borderRadius: "0",
                }}
                onClick={SubmitCreateCourse}
              >
                CREATE COURSE &nbsp;
                <Fade
                  in={oneone}
                  style={{
                    transitionDelay: oneone ? "800ms" : "0ms",
                  }}
                  unmountOnExit
                >
                  <CircularProgress
                    style={{
                      color: "white",
                    }}
                    size={20}
                  />
                </Fade>
              </Button>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };





//------------------------------------------------sending invitation------------------------------------------//

const SendingInvitation = () => {

  const step4bckbtn = () => {
    setActiveStep((currentStep) => currentStep -1)
  }

  return(
    <>
    <h1>stepper 4</h1>
   <Button onClick={step4bckbtn}>back</Button>
    </>
  )
}




  //------------------------------------ Stepper Content ----------------------------------- //

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Course_type />;
      case 1:
        return <BasicInformation />;
      case 2:
        return <AdvancedSettings />;
      case 3:
        return <SendingInvitation />;
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

  const classes = useStyles();

  const backtoStaffDashboard = () => {
    window.location.href = "/app/staffdashboard";
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar
          style={{
            backgroundColor: "#003db3",
            color: "#fff",
          }}
        >
          <Typography variant="body1" noWrap component="div">
            COURSE CREATION{" "}
          </Typography>{" "}
        </Toolbar>{" "}
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar
          onClick={backtoStaffDashboard}
          style={{
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon color="primary" /> &nbsp;
          <div className={classes.stepperSideToolbar}> Back To DashBoard </div>
        </Toolbar>
        <Divider />
        <Grid container>
          <Grid item md={12}>
            <div className={classes.stepperStyle}>
              <Stepper activeStep={activeStep} orientation="vertical">
            
                {steps.map((step, index) => {
                  const labelProps = {};
                  const stepProps = {};
                  return (
                    <Step {...stepProps} key={index}>
                      <StepLabel {...labelProps}> {step} </StepLabel>{" "}
                    </Step>
                  );
                })}
              </Stepper>
            </div>
          </Grid>
        </Grid>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
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

export default CourseCreation;
