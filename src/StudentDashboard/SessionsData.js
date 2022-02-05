import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {StudentCrs_id,showcrstitle,showcrsimg} from './StudentRecoil';

import { CardMedia, Grid } from "@mui/material";

//cards
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//images
// import img1 from '../Images/'

const SessionData = () => {

    //recoil crs id
    const[crsId,setcrsId] = useRecoilState(StudentCrs_id)

    //hooks
    const[StoreData,setStoreData] = useState([])
    const[storedata1,setStoreData1] = useRecoilState(showcrstitle)
    const[storedata2,setStoreData2] = useRecoilState(showcrsimg)

    console.log(crsId);

    const token = localStorage.getItem("token");

    useEffect(() => {
        console.log(crsId);

        axios
        .get(`https://app.5am5pm.com:3000/student/student_sessionsBY_Course/${crsId}`,
        {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
            console.log("thedata",res.data.data.sessions[0].date);
            setStoreData(res.data.data.sessions);
            setStoreData1(res.data.data.course_name);
            setStoreData2(res.data.data.course_image);
           
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const sendstdMeetId = (e,meetingid) => {
        window.location.href=`/conference?room=${meetingid}`;
        setcrsId("")
    }
    
    return(
        <React.Fragment>
            {/* {
                storedata1.map((data1) => {
                    return(
                        <Typography variant="h6">{data1.course_name}</Typography>
                    );
                })
            } */}

<Grid container spacing={2}>
          
            {
                StoreData.map((data) => {


                    return(

                      

                     
                            <Grid item md={3}>
                                 <div>
                                <Card sx={{ width:'100%' }}>
                               <img src={storedata2} width='100%' height="200px"></img>
   
      <CardContent>
          <div style={{textAlign:'center'}}>
                <span style={{fontSize:'12px'}}>Session Title</span>
          </div>
        <Typography variant="h6" style={{textAlign:'center',color:"#003db3"}}>
          {data.title}
        </Typography>
        <div style={{textAlign:'center'}}>
                <span style={{fontSize:'12px'}}>Session Date </span>
                </div>
                <Typography variant="h6" style={{color:'#003db3',textAlign:'center'}}>
                  {new Date(data.date).toLocaleDateString()}
                </Typography>

                <div style={{textAlign:'center'}}>
                <span style={{fontSize:'12px'}}>Session Time </span>
                </div>
                <Typography variant="h6" style={{color:'#003db3',textAlign:'center'}}>
                  {data.time}
                </Typography>
      </CardContent>
      <div style={{textAlign:'center'}}>
                        <Button variant="contained" style={{backgroundColor:'#003db3'}} onClick={(e) => sendstdMeetId (e,data.meetingid)}>Join Meeting</Button>
      </div>
      <br></br>
    </Card>
                                </div> 
                            </Grid>
                      
                    );
                })

               
            }

</Grid>
        </React.Fragment>
    );
}

export default SessionData;