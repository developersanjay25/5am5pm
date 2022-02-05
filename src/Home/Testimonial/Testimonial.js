import React from "react";

//images
import TestimonialImage from '../../Images/Testimonial/1.png';

//files
import TestimonialCard from "./TestimonialCard";

//mui styles
import { makeStyles } from '@mui/styles';
import { Box, height } from "@mui/system";
import { Typography } from "@mui/material";


const useStyles = makeStyles({
    TestimonialContainer:{
        position:'absolute',
        width:'100%',
        height:'fit-content',
        top:0,
    },
    TestimonialHeading:{
        color:'#fff',
        fontSize:'37px',
        fontWeight:600,
        textAlign:'center',
    },
    testimonialslider:{
       width:'100%',
     
       
    }
})

const Testimonial = () => {

    const classes = useStyles();

    return(
        <React.Fragment>
          
            <div style={{position:'relative'}}>
            <img src={TestimonialImage} width='100%' height='600px'></img>
            <div className={classes.TestimonialContainer}> 
            <Box sx={{pt:'24px',pb:'24px'}}>
            <Typography variant="h2" className={classes.TestimonialHeading}>TESTIMONIAL</Typography>
            </Box>
            <div className={classes.testimonialslider}>
               
            <TestimonialCard/>
            </div>
            </div>
            </div>
        </React.Fragment>
    )
}

export default Testimonial;