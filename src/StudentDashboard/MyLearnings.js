import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@material-ui/core";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { StudentSessions,StudentCrs_id } from "./StudentRecoil";

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import mygif from "../Images/recording.gif";
import recordingpic from "../Images/recordoff.png";
import share from "../Images/icon-image/share.png";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


const MyLearnings = () => {
  const token = localStorage.getItem("token");
  const url = "https://app.5am5pm.com:3000/student/purchase_details_student";

  //storing hooks
  const [Data1, setData1] = useState([]);

  useEffect(() => {
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.data[0].purchase_details);
        setData1(res.data.data[0].purchase_details);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //recoil
  const[changePage,setChangePage] = useRecoilState(StudentSessions);
  const[sendCrsId,setSendCrsId] = useRecoilState(StudentCrs_id);

  const StudentSessionClass = (e,course_id) => {
    setSendCrsId(course_id);
    setChangePage(false);
  }



  //linear progress bard
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h5">My Courses</Typography>
      <hr></hr>
      <div style={{width:'100%',height:'24px'}}></div>
       <Grid container spacing={2}>
      {Data1.map((data) => {
        return (
         
            <Grid item md={3}>
              {/* <Card sx={{ width:'100%', height:'400px'}} onClick={(e) => StudentSessionClass (e,data.course_id)}>
               <Grid container>
                <Grid item md={12}>
                  <div style={{position:'relative'}}>
                  <img src={data.course_image} width="100%" height="200px"></img>
                  <div className="studentcardstyle">
                  <Button variant="contained"
                  style={{backgroundColor:'#003db3',borderRadius:0}}
                  >
                    
                    STATUS</Button>
                  </div>
                  </div>
                </Grid>
                
               </Grid>

              <div style={{width:'100%',height:'10px'}}></div>

              <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                  <div className="studentCrsCardTitle">
                  <Typography variant="h6">{data.course_name}</Typography>
                  </div>
                </Grid>
              </Grid>



            <Grid container>
              <Grid item md={12} sm={12} xs={12}>
              <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
              </Grid>
            </Grid>



              <div className="heightStyle"></div>

            <Grid container>
              <Grid item md={6}>
              <Typography variant="h6" style={{textAlign:'center'}}>{new Date(data.date).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{textAlign:'center'}}>22/22/2222</Typography>
              </Grid>
            </Grid>




              </Card> */}







               <Card sx={{width:'100%'}}>
      <CardMedia
        component="img"
        height="140"
        image={data.course_image}
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
                <Button variant="contained" color="primary" onClick={(e) => StudentSessionClass (e,data.course_id)}>JOIN NOW</Button>
                 </div>
                  </Grid>
                   </Grid>







    </Card>





            </Grid>
        
        );
      })}
        </Grid>
    </React.Fragment>
  );
};

export default MyLearnings;
