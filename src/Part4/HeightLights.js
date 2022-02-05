import React from "react";
import HeightLights_content from './HeightLight_content';

import { makeStyles } from "@mui/styles";
import { display } from "@mui/system";

const useStyles = makeStyles({
    backgroundStyle:{
        backgroundColor:'#E5E5E5',
        padding:'0px, 100px',
        width:'100%',
        height:'325px',
    },

    style2:{
        paddingTop:'70px'
    }
})

const HeightLights = () => {

    const classes = useStyles();
    return(
        <React.Fragment>
            <div className={classes.backgroundStyle}>
                <div className={classes.style2}>
                <HeightLights_content/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default HeightLights;