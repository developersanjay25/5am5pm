import React from "react";
import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useRecoilState } from "recoil";
import {ShowSessions} from "./StafRecoil";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from "axios";

const SessionsData = () => {

    //show Sessions Data
const[getSessionsData,setgetSessionsData] = useRecoilState(ShowSessions);

//getting Sessions 

const token = localStorage.getItem("token");

//storing sessions data hooks
const[SessionsStorage1,setSessionsStorage1] = useState([])


useEffect(() => {
   axios
   .get(`https://app.5am5pm.com:3000/course/course_sesionBYID/${getSessionsData}`,
   {
    headers: { Authorization: `Bearer ${token}` },
  }
   )
   .then((res) => {
     console.log(res.data.data)
    setSessionsStorage1(res.data.data);
   })
   .catch((err) => {
       console.log(err)
   })
},[])

    const startMeeting = (e,meetingid) => {
        window.location.href=`/conference?room=${meetingid}`
    }

    return(
        <React.Fragment>
            <p>Test session data{getSessionsData}</p>

        <Grid container spacing={2}>


        {
            SessionsStorage1.map((sessionDataMap) =>{
                return(
                    <Grid item md={3}>

                    <Card sx={{ width:'100%' }}>
              <CardContent>
              <div style={{textAlign:'center'}}>
                <span style={{fontSize:'12px'}}>Session Title</span>
                </div>
                <Typography variant="h6" style={{color:'#003db3',textAlign:'center'}}>
                  {sessionDataMap.title}
                </Typography>

                <div style={{textAlign:'center'}}>
                <span style={{fontSize:'12px'}}>Session Date </span>
                </div>
                <Typography variant="h6" style={{color:'#003db3',textAlign:'center'}}>
                  {new Date(sessionDataMap.date).toLocaleDateString()}
                </Typography>

                    
                <div style={{textAlign:'center'}}>
                <span style={{fontSize:'12px'}}>Session Time </span>
                </div>
                <Typography variant="h6" style={{color:'#003db3',textAlign:'center'}}>
                  {sessionDataMap.time}
                </Typography>


              </CardContent>
             <div style={{textAlign:'center'}}>
             <Button style={{backgroundColor:'#003db3'}} variant="contained" onClick={(e) => startMeeting (e,sessionDataMap.meetingid)}>Start Meeting</Button>
             </div>

                    <br></br>

            </Card>

                    </Grid>
                );
            })
        }
        </Grid>





         
        </React.Fragment>
    )
}

export default SessionsData;