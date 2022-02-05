import React, { useEffect,useLayoutEffect,useState } from "react";
import { Grid,Button,Typography,Paper,Divider,Container, TextField } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Avatar from '@mui/material/Avatar';
import videojs from "video.js";
import axios from "axios";

import './test.css';

import { makeStyles } from '@mui/styles';

//icons
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ShareIcon from '@mui/icons-material/Share';
import GroupsIcon from '@mui/icons-material/Groups';

//video js
import VideoPlayer from 'react-video-js-player';

//video file
import linus from './video/sample.mp4';


//styles
const useStyles = makeStyles({
    heightStyle:{
        width:'100%',
        height:'10px',
    },
    iconStyle:{
        display:'inline-flex',
        verticalAlign:'middle',
        color:'#003db3',
    },
    paperinsidePadding:{
        padding:'16px'
    }
})



  


const HelloTest = () => {

    const classes = useStyles();


    const[record,setRecord] = useState([]);



      //get record api 

      useLayoutEffect(() => {
        axios
        .get('https://app.5am5pm.com:3000/student/getrecording')
        .then((res) => {
            console.log(res.data.data.filepath)
            setRecord(res.data.data)
         
        })
        .catch((err) => {
            console.log(err.resposnse)
        })
    },[])





   return(
       <React.Fragment>

<Container>
    

    {
        record.map((data) => {
            return(
                <>
                   {/* 1st row */}
        <Grid container>
            <Grid item md={12} sm={12} xs={12}>
             <Typography variant="h6"><span><PlayCircleOutlineIcon className={classes.iconStyle}/></span>Lesson1: Welcome to the Course</Typography>
                <Typography variant="caption">Yesterday from 3:55pm - 4:00pm</Typography>
            </Grid>
            <div className={classes.heightStyle}></div>



            {/* 2nd row */}
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="overline">Welcome to your certification Training Course in the first lesson,i'll be covering the course syllabus and schedule,as well as answering any questions about the 5am5pm we'll be using</Typography>
                </Grid>
            </Grid>
        </Grid>




                 
        <div className={classes.heightStyle}></div>

{/* 3rd row */}

<Grid container>

    {/* video section 1st column */}
    <Grid item md={9}>

    <VideoPlayer
            controls={true}
            src={data.filepath}
            poster={"https://wallpapercave.com/wp/wp5480473.jpg"}
            width="100%"
            height="auto"
    />



    </Grid>

    {/* chat column */}
    <Grid item md={3}>
    <Paper elevation={6} style={{width:'100%',height:'400px'}}>
   <div className={classes.paperinsidePadding}>
      
    <Typography variant="body2">
     <span className={classes.iconStyle}> <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></span>   Shara Jones
    </Typography>
    <div className={classes.heightStyle}></div>
    <Divider/>
    <div className={classes.heightStyle}></div>

    <Grid container>
        <Grid item md={12}>
            <Typography variant="h4"><span><ShareIcon/></span>2</Typography>
            <Typography variant="body2">Items Shared</Typography>
        </Grid>
    </Grid>
    <div className={classes.heightStyle}></div>
    <Grid container>
        <Grid item md={12}>
            <Typography variant="h4"><span><GroupsIcon/></span>6</Typography>
            <Typography variant="body2">Students in Attendance</Typography>
        </Grid>
    </Grid>

    </div>
    </Paper>
    </Grid>






    <Grid container>
        <Grid item md={12}>
        <TextField
aria-label="empty textarea"
placeholder="Enter Your Comments here"
style={{ width: '100%',height:'100px'}}
/>
        </Grid>
    </Grid>








</Grid>






                </>
            )
        })
    }


    



{/* 

            2nd copy */}

                    {/* 1st row */}
        <Grid container>
            <Grid item md={12} sm={12} xs={12}>
             <Typography variant="h6"><span><PlayCircleOutlineIcon className={classes.iconStyle}/></span>Lesson1: Welcome to the Course</Typography>
                <Typography variant="caption">Yesterday from 3:55pm - 4:00pm</Typography>
            </Grid>
            <div className={classes.heightStyle}></div>



            {/* 2nd row */}
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="overline">Welcome to your certification Training Course in the first lesson,i'll be covering the course syllabus and schedule,as well as answering any questions about the 5am5pm we'll be using</Typography>
                </Grid>
            </Grid>
        </Grid>

        <div className={classes.heightStyle}></div>

        {/* 3rd row */}

        <Grid container>

            {/* video section 1st column */}
            <Grid item md={9}>

            <VideoPlayer
                    controls={true}
                    src={linus}
                    poster={"https://wallpapercave.com/wp/wp5480473.jpg"}
                    width="100%"
                    height="auto"
            />



            </Grid>

            {/* chat column */}
            <Grid item md={3}>
            <Paper elevation={6} style={{width:'100%',height:'400px'}}>
           <div className={classes.paperinsidePadding}>
              
            <Typography variant="body2">
             <span className={classes.iconStyle}> <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></span>   Shara Jones
            </Typography>
            <div className={classes.heightStyle}></div>
            <Divider/>
            <div className={classes.heightStyle}></div>

            <Grid container>
                <Grid item md={12}>
                    <Typography variant="h4"><span><ShareIcon/></span>2</Typography>
                    <Typography variant="body2">Items Shared</Typography>
                </Grid>
            </Grid>
            <div className={classes.heightStyle}></div>
            <Grid container>
                <Grid item md={12}>
                    <Typography variant="h4"><span><GroupsIcon/></span>6</Typography>
                    <Typography variant="body2">Students in Attendance</Typography>
                </Grid>
            </Grid>

            </div>
            </Paper>
            </Grid>






            <Grid container>
                <Grid item md={12}>
                <TextField
      aria-label="empty textarea"
      placeholder="Enter Your Comments here"
      style={{ width: '100%',height:'100px'}}
    />
                </Grid>
            </Grid>








        </Grid>



            {/* 3rd copy */}


                    {/* 1st row */}
        <Grid container>
            <Grid item md={12} sm={12} xs={12}>
             <Typography variant="h6"><span><PlayCircleOutlineIcon className={classes.iconStyle}/></span>Lesson1: Welcome to the Course</Typography>
                <Typography variant="caption">Yesterday from 3:55pm - 4:00pm</Typography>
            </Grid>
            <div className={classes.heightStyle}></div>



            {/* 2nd row */}
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="overline">Welcome to your certification Training Course in the first lesson,i'll be covering the course syllabus and schedule,as well as answering any questions about the 5am5pm we'll be using</Typography>
                </Grid>
            </Grid>
        </Grid>

        <div className={classes.heightStyle}></div>

        {/* 3rd row */}

        <Grid container>

            {/* video section 1st column */}
            <Grid item md={9}>

            <VideoPlayer
                    controls={true}
                    src={linus}
                    poster={"https://wallpapercave.com/wp/wp5480473.jpg"}
                    width="100%"
                    height="auto"
            />



            </Grid>

            {/* chat column */}
            <Grid item md={3}>
            <Paper elevation={6} style={{width:'100%',height:'400px'}}>
           <div className={classes.paperinsidePadding}>
              
            <Typography variant="body2">
             <span className={classes.iconStyle}> <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></span>   Shara Jones
            </Typography>
            <div className={classes.heightStyle}></div>
            <Divider/>
            <div className={classes.heightStyle}></div>

            <Grid container>
                <Grid item md={12}>
                    <Typography variant="h4"><span><ShareIcon/></span>2</Typography>
                    <Typography variant="body2">Items Shared</Typography>
                </Grid>
            </Grid>
            <div className={classes.heightStyle}></div>
            <Grid container>
                <Grid item md={12}>
                    <Typography variant="h4"><span><GroupsIcon/></span>6</Typography>
                    <Typography variant="body2">Students in Attendance</Typography>
                </Grid>
            </Grid>

            </div>
            </Paper>
            </Grid>






            <Grid container>
                <Grid item md={12}>
                <TextField
      aria-label="empty textarea"
      placeholder="Enter Your Comments here"
      style={{ width: '100%',height:'100px'}}
    />
                </Grid>
            </Grid>








        </Grid>


        </Container>

       </React.Fragment>
   );
   }
export default HelloTest;