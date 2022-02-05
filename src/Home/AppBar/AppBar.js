import React from "react";
import { makeStyles } from '@mui/styles';

import AppBar from '@mui/material/AppBar';
import { Toolbar,Grid, Container, Button, TextField, useScrollTrigger, Box, Typography } from "@mui/material";




import { height, lineHeight } from "@mui/system";

//icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

//css import
import './AppBar.css';



const useStyles =  makeStyles({
    AppBar_Style1:{
        height: '40px',
        backgroundColor:'#003db3',
    },
})

function ElevationScroll (props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
      });

      return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      });
    }

    const loginPage = () => {
        window.location.href="/Login"
    }

   const SignupPage = () => {
       window.location.href="/Signup"
   }

const MenuBar = (props) => {

    const classes = useStyles();

    const homepage = () => {
        window.location.href="/";
    }

    return(
        <React.Fragment>

        <div className="all">
        {/* Appbar & Toolbar component */}
        <ElevationScroll {...props}>
            <div className="header-top">
                <Container maxWidth="xl">
                <Grid container>
                    <Grid item md={8} sm={8} xs={8}>
                        <ul>
                            <li>
                            <i class="fa fa-envelope" aria-hidden="true" style={{color:'#fff'}}></i>&nbsp;
                            <a>hello@5am5pm.com</a>
                            </li>
                           
                        </ul>
                    </Grid>

                    <Grid item md={4} sm={4} xs={4}>
                        <div className="header-left">
                            <ul>
                                <li>
                                    <a><i class="fa fa-facebook" aria-hidden="true" style={{color:'#fff'}}></i>&nbsp;</a>
                                </li>
                                <li>
                                    <a><i class="fa fa-twitter" aria-hidden="true" style={{color:'#fff'}}></i>&nbsp;</a>
                                </li>
                                <li>
                                    <a><i class="fa fa-instagram" aria-hidden="true" style={{color:'#fff'}}></i>&nbsp;</a>
                                </li>
                                <li>
                                    <a><i class="fa fa-linkedin" aria-hidden="true" style={{color:'#fff'}}></i>&nbsp;</a>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>
                </Container>
            </div>

             

         </ElevationScroll>


        {/* Carousel component */}
        



        </div>
        </React.Fragment>
    );
}

export default MenuBar;

