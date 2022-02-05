import { Button,List, ListItemText, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

//logo
import logo from '../../Logo/1.png';


//css style sheet
import './footer.css';

//styles

const useStyles = makeStyles({
    footer_background:{
        // backgroundColor:'#393855',
        backgroundColor:'#222',
        padding:'24px 0px 0px',
    },
    first:{
        color:'#fff',
        fontSize:'14px !important',
        fontFamily:'Roboto'
    },
    footer_btn_style:{
        width:'80%',
    },
    align_1:{
        paddingTop:'20px'
    }
})

const Footer = () =>{

    const classes = useStyles();

    return(
        <React.Fragment>
            <div className={classes.footer_background}>
                <Container maxWidth="xl">
                 
                    <Grid container> 
                    <Grid md={2} sm={2} xs={12}>
                    <img src={logo} width="100%" height="auto" style={{marginTop:'8px'}}></img>
                    <Typography style={{color:'#fff'}}>5am5pm is onlineLearning university</Typography>
                    </Grid>
                      <Grid md={2} sm={2} xs={12}>
                          <div style={{textAlign:'left',color:'#fff',fontWeight:'900',paddingLeft:'16px'}}>PRODUCTS</div>
                          <div style={{textAlign:'left',paddingLeft:'16px'}}>
                        <List>
                            <ListItemText><Typography className={classes.first} >Pricing</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Video Conference</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Remote Desktop</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Screen Sharing</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Online Learing</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Online Courses</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Teach Online</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Teach on 5am5pm</Typography></ListItemText>
                        </List>
                        </div>
                      </Grid>
                      <Grid md={2} sm={2} xs={12}>
                      <div style={{textAlign:'left',color:'#fff',fontWeight:'900',paddingLeft:'16px'}}>USE CASE</div>
                          <div style={{textAlign:'left',paddingLeft:'16px'}}>
                        <List>
                            <ListItemText><Typography className={classes.first} >Team Alignment</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Sales</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Engineering</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Design</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Marketing</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Product Management</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Support</Typography></ListItemText>
                           
                        </List>
                        </div>
                      </Grid>
                      <Grid md={2} sm={2} xs={12}>
                      <div style={{textAlign:'left',color:'#fff',fontWeight:'900',paddingLeft:'16px'}}>RESOURCES</div>
                          <div style={{textAlign:'left',paddingLeft:'16px'}}>
                        <List>
                            <ListItemText><Typography className={classes.first} >Blog</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >eBooks</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Help Center</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Status</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Security</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >What's New</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Roadmap</Typography></ListItemText>
                           
                        </List>
                        </div>
                      </Grid>
                      <Grid md={2} sm={2} xs={12}>
                      <div style={{textAlign:'left',color:'#fff',fontWeight:'900',paddingLeft:'16px'}}>DOWNLOADS</div>
                          <div style={{textAlign:'left',paddingLeft:'16px'}}>
                        <List>
                            <ListItemText><Typography className={classes.first} >Desktop App</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Chrome Extensions</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >MobileApps</Typography></ListItemText>
                           
                           
                        </List>
                        </div>
                      </Grid>

                      <Grid md={2} sm={2} xs={12}>
                      <div style={{textAlign:'left',color:'#fff',fontWeight:'900',paddingLeft:'16px'}}>COMPANY</div>
                          <div style={{textAlign:'left',paddingLeft:'16px'}}>
                        <List>
                            <ListItemText><Typography className={classes.first} >About us</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Diversity,Equity</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Careers</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Press</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Creator Program</Typography></ListItemText>
                            <ListItemText><Typography className={classes.first} >Sitemap</Typography></ListItemText>
                           
                        </List>
                        </div>
                      </Grid>

                    </Grid>







                {/* part2 */}







             

                <div style={{width:'100%',height:'30px'}}></div>
               
                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                    <hr className='hrtagstyle'></hr>
                    <div className='copyrightsection'>
                    <p style={{color:'#fff'}}>© 2021, 5am5pm, Inc. All Rights Reserved.</p>
                    </div>
                    </Grid>
                   
                </Grid>
                </Container>
            </div>
        </React.Fragment>
    );

}

export default Footer;