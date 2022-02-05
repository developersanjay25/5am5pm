import { Button, Container, Grid } from "@mui/material";
import React from "react";

import { makeStyles } from "@mui/styles";
import { display, maxWidth } from "@mui/system";

const useStyles = makeStyles({
    buttonalign:{
        textAlign:'center'
    },

    a_style:{
        justifyContent:'space-evenly',
        minWidth:'440px',
        maxWidth:'440px',
        minHeight:'60px',
        borderRadius:'8px',
        padding:'0',
        backgroundColor:'#003db3',
        boxShadow:'0px 4px 16px rgba(51 51 51 /24%)',
        display:'flex',
        alignItems:'center',
        WebkitBoxPack:'justify',
        margin:'auto',
        cursor:'pointer',
        textDecoration:'none',
        fontWeight:'700',
        lineHeight:'110%',
        color:'#fff',
        fontSize:'24px'
    }
})

const Free_video_Live_clases_btn = () => {

    const classes = useStyles();
    return(
        <React.Fragment>
            <Container>
                <Grid Container>
                    <Grid item md={12}>
                        <div className={classes.buttonalign}>
                        <a href="" className={classes.a_style}> View All Free Videos <i class='fas fa-arrow-right' style={{width:'17px'}}></i></a>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <div style={{width:'100%',height:'100px'}}>

            </div>
        </React.Fragment>
    );
}

export default Free_video_Live_clases_btn;