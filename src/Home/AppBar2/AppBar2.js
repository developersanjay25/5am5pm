import { AppBar, Toolbar, Container, Grid, Button } from "@mui/material";
import React from "react";
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



//site logo
import SiteLogo from '../../Logo/1.png';

//menu image
import menuicon from '../../Images/menuicon/1.png'

//import css file
import './AppBar2.css';
import InstitutePage from "../../InstitutePage/InstitutePage";

//material ui icons
import MenuIcon from '@mui/icons-material/Menu';


//importing files
import LoginReg from "./loginsignup/LogReg";

const AppBar2 = () => {

 




    const Home = () => {
        window.location.href="/"
    }
    const coursePage = () => {
        window.location.href="/allcourses"
    }



    const InstitutePage = () => {
        window.location.href="/institute";
    }


    //side drawer
    const [state, setState] = React.useState({
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
         
         
        </Box>
      );

      const preventDefault = (event) => event.preventDefault();


    return(
        <React.Fragment>
           
            <AppBar style={{position:'relative'}}>
                <Toolbar className="Header-top-2">
            
                
                      <Grid container spacing={2}  className="menuhide1">
                       
                        <Grid item md={1} sm={1} xs={1}>
                            <div style={{paddingTop:'8px'}}>
                            <img src={SiteLogo} width={'100%'} height={'auto'} style={{cursor:'pointer'}} onClick={Home}></img>
                            </div>
                        </Grid>
                      <Grid item md={1} sm={1} xs={1}>

                      </Grid>
                      <Grid item md={6} sm={6} xs={6}>
                  
                      <Box
      sx={{
        lineHeight:'64px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'left',
        paddingTop:'8px',
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 2,
        },
      }}
      onClick={preventDefault}
    >
      <Link className="menustyle1" onClick={Home} underline="hover">
        {'HOME'}
      </Link>
      <Link className="menustyle1" onClick={coursePage} underline="hover">
        {'COURSES'}
      </Link>
      <Link className="menustyle1" onClick={InstitutePage} underline="hover">
        {'INSTITUTES'}
      </Link>
    </Box>
   
                      </Grid>

                      <Grid item md={4} sm={4} xs={4}>
                          <div style={{textAlign:'right'}}>
                           <LoginReg/>
                            </div>
                      </Grid>
                      

                      </Grid>
                  


                <div className="menuhide2">
                  <Grid container>
                   
                    <Grid item md={12} sm={12} xs={12}>
                      <div style={{textAlign:'right !important'}}>
                      <img src={menuicon} width="32px" height="32px"></img>
                      </div>
                    </Grid>
                  </Grid>
                </div>


                </Toolbar>
            </AppBar>


        </React.Fragment>
    );
}

export default AppBar2;