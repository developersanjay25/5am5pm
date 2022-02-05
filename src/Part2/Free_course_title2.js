import React from "react";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    free_course_title:{
        fontStyle:'normal',
        fontWeight:'700',
        fontSize:'48px',
        lineHeight:'120%',  
        textAlign:'center',
        fontFamily:'Promixa Nova,-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif'
    }
})

const Free_course_title2 = () => {

    const classes = useStyles();
    return(
        <React.Fragment>
            <p className={classes.free_course_title}>Explore Free Courses</p>
        </React.Fragment>
    );
}

export default Free_course_title2;