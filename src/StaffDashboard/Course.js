import React from "react";
import { Typography, Grid, Button, backdropClasses } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { width } from "@mui/system";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Divider } from "@mui/material";
import { useRecoilState } from "recoil";
import { ShowMeetings,ShowSessions } from "./StafRecoil";


import './course.css';

import mygif from "../Images/recording.gif";
import recordingpic from "../Images/recordoff.png";
import share from "../Images/icon-image/share.png";


import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

//css file
import './meeting.css';

const Staff_Course = () => {


//change meetings recoil
const[showCourse,setShowCourse] = useRecoilState(ShowMeetings);

//send sessions id
const[sendSession,setSendSession] = useRecoilState(ShowSessions);

//course handler
const ChangeCourseHandler = (e,_id) => {
    setSendSession(_id);
    setShowCourse(false);
}


    const [tData, setTdata] = useState([]);

  const token = localStorage.getItem("token");

  //fetch meetings api
  useEffect(() => {
    const url = "https://app.5am5pm.com:3000/course/usercourselist";
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` }})
      .then((res) => {
        setTdata(res.data.data);
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return(
      <React.Fragment>
            <Grid container>
        <Grid item md={12}>
          <div style={{ textAlign: "center" }}>
            <Typography variant="body1">
              <span style={{ color: "#003db3" }}>MEETING SCHEDULE</span>
            </Typography>
          </div>
        </Grid>
      </Grid>
      <div style={{ height: "30px" }}></div>

      <Grid container spacing={2}>
    

    {
        tData.map((a) => {
            return(
                <Grid item md={3}>
                      <div>
                      <Card sx={{width:'100%'}}>
      <CardMedia
        component="img"
        height="140"
        image={a.course_image}
        alt="green iguana"
      />
     



              {/* showing live */}


   <div className="showinglive">

              <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
     <Grid item md={1}>
     <img
              src={mygif}
              height="10px"
              width="10px"
              style={{marginTop:'5px',marginLeft:'10px'}}
              />
    
     </Grid>

     <Grid item md={5}>
     <div style={{color:'red'}}>Live</div>
    
     </Grid>

     <Grid item md={6}>
              <div style={{color:'#fff',textAlign:'right',paddingRight:'10px'}}>00:00:11</div>
     </Grid>

     </Grid>
              
           
                
            
   </div>

{/* end of showing live */}



                      {/* showing students live */}

                   <Grid container>
                  <Grid item md={12}>
                  <div className="showstudentslive-container">
                    <PeopleAltIcon 
                  style={{fontSize:'60px'}}
                    /> <span className="showstudentsnumberCount">27</span>
                  </div>
                  </Grid>
                  <Grid item md={12}>
                  <div style={{color:'gray',textAlign:'center'}}>
                    <span>Students Online</span>
                    </div>
                  </Grid>
                   </Grid>


                      {/* showing no of staff */}

                      <Grid container>
                  <Grid item md={12}>
                  <div className="showstudentshare-container">
                    <img src={share} 
                  style={{width:'60px'}}
                    /> <span className="showstudentsnumberCount">33</span>
                  </div>
                  </Grid>
                  <Grid item md={12}>
                  <div style={{color:'gray',textAlign:'center',marginBottom:'20px'}}>
                    <span>New Shared Items</span>
                    </div>
                  </Grid>
                   </Grid>


                     {/* showing no of staff */}

                     <Grid container>
                  <Grid item md={12}>
                 <div style={{textAlign:'center',marginBottom:'20px'}}>
                <Button variant="contained" color="primary" onClick={(e) => ChangeCourseHandler(e,a._id)}>JOIN NOW</Button>
                 </div>
                  </Grid>
                   </Grid>







    </Card>
                      </div>
                </Grid>
            )
        })
    }

      </Grid>
      </React.Fragment>
  );


}

export default Staff_Course;