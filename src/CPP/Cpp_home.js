import React from "react";
import { Grid, Typography,Box } from "@mui/material";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

//images

import img1 from "../Images/CPP/1.png";
import img4 from "../Images/CPP/4.png";
import { Translate } from "@mui/icons-material";
import { border, height } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  buttonPosition: {
   paddingLeft:'25px',
   color:'#003db3',
  },
  // buttonStyle: {
  //   width: "200%",
  //   padding: "50px",
  //   backgroundColor:'#fff !important',
  //   color:'#003db3 !important',
  // },
  cppcontentposition:{
    position:'absolute',
    width:'100%',
    height:'600px',
    top:0
  },
  cpptextContainer:{
    width:'50%',
    height:'600px',
    display:'flex',
    alignItems:'start',
    justifyContent:'center',
    flexDirection:'column',
    paddingLeft:'24px',
    color:'#fff',
  },
  title:{
    [theme.breakpoints.down('sm')]: {
      fontSize:'1.5rem !important',
      lineHeight:0,
     },
     [theme.breakpoints.down('xs')]: {
       fontSize:'0.83rem !important',
       lineHeight:0,
     
      },
  },
  subtitle:{
    [theme.breakpoints.down('sm')]: {
      fontSize:'1.5rem !important',
      lineHeight:0,
     },
     [theme.breakpoints.down('xs')]: {
       fontSize:'0.83rem !important',
       lineHeight:0,
     
      },
      textAlign:'left'
  }
}));

const Institute_Signup = () => {
  window.location.href = "/createuniversity";
};

const Cpp_Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
      <div style={{ position: "relative" }}>
        <div>
          <img src={img4} width="100%" height="600px"></img>
          <div className={classes.cppcontentposition}>


          <div className={classes.cpptextContainer}>
            <Box sx={{mb:'24px'}}>
          <Typography variant="h2" className={classes.title}>CAMPUS PARTNER PROGRAM</Typography>
          </Box>
          <Box sx={{mb:'24px'}}>
          <Typography variant="h3" className={classes.subtitle}>Campus Partner Program (CPP) is a 5am5pm.com Initiative to connect and partner with Campuses that believe in Empowering learners with the right access to quality education.</Typography>
          </Box>
          
          <Button
            variant="outlined"
            onClick={Institute_Signup}
            style={{backgroundColor:'#fff',color:'#003db3',borderRadius:0,fontWeight:600}}
          >
            IT's Free, Get Strated
          </Button>
          </div>




          </div>
        </div>
       
      </div>
      </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Cpp_Home;
