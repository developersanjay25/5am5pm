import React, { useEffect, useState } from "react";
import MenuBar from '../Home/AppBar/AppBar';
import AppBar2 from "../Home/AppBar2/AppBar2";
import axios from "axios";

//react helmet for document title
import {Helmet} from "react-helmet";

//search parms
import { useSearchParams } from "react-router-dom";

//video js
import VideoPlayer from 'react-video-js-player';

//video file
import linus from '../video/sample.mp4';

//material ui
import { Grid, Button, Typography } from "@mui/material";

//images
import img1 from '../Images/allcourses/Gv.jpg';

//css styles
import './CourseDetails.css';

//files
import CourseOverview from "./CourseOverview";
import Footer from "../Home/Footer/Footer";

const CourseDetails = () => {

    const enroll = () => {
        window.location.href="/Enrolment"
    }

    const queryParams = new URLSearchParams(window.location.search);
    const CourseId = queryParams.get("cid");

    // const [searchParams, setSearchParams] = useSearchParams();
    // searchParams.get("course-id")
    
    //  console.log("hello",searchParams);


    //title storing hooks
    const[data1,setdata1] = useState([])

    //setting for window title
    const [wtitle,setWtitle] = useState([]);



    //api call for title
    useEffect(() => {
        axios
        .get(`https://app.5am5pm.com:3000/commonapi/checkout_courseBYID/${CourseId}`)
        .then((res) => {
            setdata1(res.data.data)
          
            setWtitle(res.data.data[0].course_name)
        })
        .catch((err) => {
            console.log(err)
        })

    },[])

    return(
        <React.Fragment>
             <MenuBar/>
            <AppBar2/> 
            <Helmet>
            <meta charSet="utf-8" />
                <title>{wtitle}</title>
            </Helmet>
            {/* contents */}

            
                            {
                                data1.map((data) => {
                                    return(
                                        <Grid container>
                                        <Grid item md={12}>
                                            <div style={{position:'relative'}}>
                                                <div>
                                                    <img src={data.course_image} width="100%" height="400px"></img>
                                                    <div className="titlecontainer">
                                                  

<Grid container>


<Grid item md={6} sm={6} xs={6}>
<Typography variant="h1" className="titleStyle">{data.course_name}</Typography>
</Grid>


<Grid item md={6} sm={6} xs={6}>




<VideoPlayer
                    controls={true}
                    src="https://app.5am5pm.com:3000/uploads/1643531218708_blob.mp4"
                    poster={data.course_image}
                    height="400px"
                    width="auto"
                />














</Grid>


</Grid>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
                                    );
                                })
                            }
                          
            <CourseOverview/> 
            <Footer/>
        </React.Fragment>
    );
}

export default CourseDetails;