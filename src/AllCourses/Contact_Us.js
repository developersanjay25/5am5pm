import React from "react";
import { Grid, Button } from "@mui/material";

//css styles
import './contactus.css';

const ContactUs = () => {

    return(
        <React.Fragment>
            <div style={{backgroundColor:'#003db3',height:'200px'}}>
            <Grid container>
                <Grid item md={10}>
                    <div className="contactus-align">
                <h3>Do You Have Questions ?</h3>  
                <span>We'll help you to grow your career and growth.</span>
                </div>
                </Grid>
                <Grid item md={2}>
                <div className="contactus-align2">
                <Button variant="outlined" style={{color:'#fff'}}>Contact Us Today</Button>
                </div>
                </Grid>
            </Grid>
            </div>
            
        </React.Fragment>
    );

}

export default ContactUs;