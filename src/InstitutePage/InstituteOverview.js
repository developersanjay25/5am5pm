import React, { useEffect, useState } from "react";
import axios from "axios";

//material ui
import { Container, Divider, Grid, Paper,Button } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//images
import img1 from '../Images/section_2/4.png';

//css
import './institutedetails.css';

//files
import MenuBar from "../Home/AppBar/AppBar";
import AppBar2 from "../Home/AppBar2/AppBar2";
import Footer from "../Home/Footer/Footer";
import InstituteDeatailsPage from './InstituteDetails';


const InstituteOverView = () =>{

    const queryParams = new URLSearchParams(window.location.search);
    const instituterollno = queryParams.get("institute-id");

    const enroll = () => {
        window.location.href="/checkout";
    }

    //institute details storing hooks
    const[insdata,setinsData] = useState([]);

    useEffect(() => {
        axios
        .get(`https://app.5am5pm.com:3000/institute_admin/get_instituteBYID/${instituterollno}`)
        .then((res) => {
            setinsData(res.data.data)
            console.log(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    return(
        <React.Fragment>
            <MenuBar/>
            <AppBar2/>
          
            {
                insdata.map((data) => {
                    return(
                        <div style={{position:'relative'}} className="insimgcntstyle">
                        <img src={(data.images[0] ? data.images[0].institute_image : 'https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg')} width='100%' height='450px'  className="insmainimgstyle"></img>
                        <div className="herocontainer1">
                        <div className="titlecontainer1">
                           
                                <Grid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={3}>
                                    
                                  <Paper>
   
                                    <img src={(data.images[0] ? data.images[0].institute_logo : 'https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg')} width='180px' height='180px'></img>
                                
                                    </Paper>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={9}>
                                  <div className="titleverticalstyle">
                            <Typography variant="h5" className="institutetitlestyle">{data.institute_name}</Typography>
                            <Typography variant="body2" className="institutecountry">{data.country}</Typography>
                            </div>
                                    </Grid>
                                </Grid>
                               
                         
                          
                            
                           
                        </div>
                        </div>

                        <div className="insbtnplacement">
                            <Button 
                            variant="contained"
                            style={{backgroundColor:'#003db3',borderRadius:0}}
                            >Follow Us</Button>
                        </div>
                        </div>
                    );
                })
            }
           

            <div style={{width:'100%', height:'24px'}}></div>

            <InstituteDeatailsPage/>

            <Footer/>
        </React.Fragment>
    );
}

export default InstituteOverView;