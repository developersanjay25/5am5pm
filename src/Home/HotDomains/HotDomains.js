import { Grid, Typography, Container, Paper } from "@mui/material";
import React from "react";
import './HotDomains.css'; 

//images
import img1 from '../../Images/HotDomains/Hotdomain1.jpg';
import img2 from '../../Images/HotDomains/DigitalMarketing.jpg';
import img3 from '../../Images/HotDomains/It.jpg';
import img4 from '../../Images/HotDomains/PhotoGraphy.jpg';
import img5 from '../../Images/HotDomains/Research.jpg';
import img6 from '../../Images/HotDomains/Finance.jpg';



const HotDomains = () => {

    const viewAllCourses = () => {
        window.location.href="/allCourses";
    }

    return(
        <React.Fragment>
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                <h2 className="hotDomains">#2021 Hot Domains</h2>
                </Grid>
            </Grid>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item md={4} sm={6} xs={12}>
                            <div className="allcourse-card">
                            <img src={img1} className="HotdoaminImages"></img>
                            <div className="allcourse-content">
                                <span className="Design">Design</span>
                                <p>over <span id="allcoursecontent-span">2500</span> courses</p>
                            </div>
                            </div>
                           
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                 
                    <div className="allcourse-card">
                            <img src={img2} className="HotdoaminImages"></img>
                            <div className="allcourse-content">
                                <span className="Design">DigitalMarketing</span>
                                <p>over <span id="allcoursecontent-span">1500</span> courses</p>
                            </div>
                            </div>
                       
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                    
                    <div className="allcourse-card">
                            <img src={img3} className="HotdoaminImages"></img>
                            <div className="allcourse-content">
                                <span className="Design">It & Security</span>
                                <p>over <span id="allcoursecontent-span">800</span> courses</p>
                            </div>
                            </div>
                        
                    </Grid> 

                    {/* row 2 */}

                    <Grid item md={4} sm={6} xs={12}>
                   
                    <div className="allcourse-card">
                            <img src={img4} className="HotdoaminImages"></img>
                            <div className="allcourse-content">
                                <span className="Design">PhotoGraphy</span>
                                <p>over <span id="allcoursecontent-span">2300</span> courses</p>
                            </div>
                            </div>
                        
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                    
                    <div className="allcourse-card">
                            <img src={img5} className="HotdoaminImages"></img>
                            <div className="allcourse-content">
                                <span className="Design">Research</span>
                                <p>over <span id="allcoursecontent-span">4500</span> courses</p>
                            </div>
                            </div>
                       
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                   
                    <div className="allcourse-card">
                            <img src={img6} className="HotdoaminImages"></img>
                            <div className="allcourse-content">
                                <span className="Design">Finance</span>
                                <p>over <span id="allcoursecontent-span">2500</span> courses</p>
                            </div>
                            </div>
                        
                    </Grid> 
                </Grid>
                

                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        <div style={{textAlign:'center'}}>
                            <button className="course-view-all" onClick={viewAllCourses}>view all Courses &rarr;</button>
                        </div>
                    </Grid>
                </Grid>


            </Container>
        </React.Fragment>
    );
}

export default HotDomains;