import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Grid} from "@mui/material";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { CType, BasicFun, CourseT, AdvanceI, Back2Basic,CTypeButton } from "./CourseRecoil";
import {Staff_Course_Type} from "./ValidationHooks"; 
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';

//css file
import './createCourse.css';

import pvtimg from '../Images/courseType/private.png';
import pubimg from '../Images/courseType/public.png';


const useStyles = makeStyles({
  typeTitle:{
    fontSize:"1.875rem",
    fontWeight:"300",
    lineHeight:'1.2',
    fontFamily:'Jotia !important',
    textAlign:'center',
  }
})

const CourseType = () => {


  const classes = useStyles();

    const[Pvt,setPvt] = useRecoilState(CType)
    const[privateorpublic,setprivateorpublic] = useRecoilState(Staff_Course_Type);
    const[courseButton,setcourseButton] = useRecoilState(CTypeButton);

    const courseHandling = (e) => {
        setPvt(e.target.value);
        console.log(e.target.value);
        setcourseButton(false);
    }

    console.log("checking",Pvt);


  return (
    <React.Fragment>
         <Grid  container
  direction="column"
  justifyContent="center"
  alignItems="center">
            <Grid item md={12}>
       {/* <FormControl component="fieldset">
        <FormLabel component="legend" style={{color:'#003db3'}}>What Type Of Course That You Wanted To Create?</FormLabel><br></br>
        <RadioGroup
          onChange={(e) => courseHandling (e)}
          defaultValue="Public"
        >
          <FormControlLabel value="Private" control={<Radio />} label="Private(Only invited Users)"/><br></br>
          <FormControlLabel value="Public" control={<Radio />}  label="Public(Anyone can see)"/>
        </RadioGroup>
      </FormControl>  */}






      </Grid>
      </Grid> 

  
       <Grid container>
         <Grid item md={12} sm={12} xs={12}>
        
            <Typography className={classes.typeTitle}>WHAT TYPE OF COURSE YOU WANT TO CREATE</Typography>
        
         </Grid>
         <div className="courseTypeStyle">
         <Grid item md={6} sm={6} xs={12}>
         <Typography variant="p" className="typetitlestyle">Private Course</Typography>
          <div className="courseTypeStyle1">
            
          <Tooltip title="Anyone Can See" placement="top" arrow followCursor>
          <label>
            <input type="radio" name="test" value="Private" onChange={(e) => courseHandling (e)}/>
            <img src={pvtimg} width="150px" height="150px"/>
            </label>
            </Tooltip>
            </div>
         </Grid>
         <Grid item md={6} sm={6} xs={12}>
         <Typography variant="p" className="typetitlestyle" color='primary'>Public Course</Typography>
            <div className="courseTypeStyle1">
      
            <Tooltip title="Only Invited Users" placement="top" arrow followCursor>
            
          <label>
          <input type="radio" name="test" value="Public"   onChange={(e) => courseHandling (e)} />
          <img src={pubimg} width="150px" height="150px"/>
          </label>
            </Tooltip>
            </div>
         </Grid>
         </div>
       </Grid>

    </React.Fragment>
  );
};

export default CourseType;
