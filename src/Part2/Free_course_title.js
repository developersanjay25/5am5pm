import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
    free_courses_title:{
        fontStyle:'normal',
        fontWeight:'600',
        fontSize:'24px',
        lineHeight:'110%',
        textAlign:'center',
        fontFamily:'Promixa Nova,-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif'
    }
})

const Explore_free_courses = () => {
    const classes = useStyles();
    return(
        <React.Fragment>
            <p className={classes.free_courses_title}>Not sure of the above domains?</p>
        </React.Fragment>
    );
}

export default Explore_free_courses;