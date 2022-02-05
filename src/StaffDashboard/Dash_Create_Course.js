import React from 'react';
import { Grid,Button, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { makeStyles } from '@mui/styles';



//material icons
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import VideocamIcon from '@mui/icons-material/Videocam';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const useStyles = makeStyles({
    createCourseButton:{
     display:'flex',
     width:'100%',
     height:'70vh',
     justifyContent:'flex-end',
     alignItems:'flex-end'
    }
  })


  const CreateCourse = () => {
    window.location.href="/Course-Creation"
}

const actions = [
    { icon: <VideoCameraFrontIcon onClick={(e) => CreateCourse (e)} color="primary"/>, name: 'Create Course' },
    { icon: <MeetingRoomIcon color="primary"/>, name: 'Create Meeting' },
    { icon: <VideocamIcon color="primary"/>, name: 'Video Conference' },
  ];


const Dash_Create_Course = () => {

   
    return(
        <React.Fragment>
        <Grid contianer>
            <Grid item md={12}>
                <div className='createCourseButton'>
                   
                {/* <Button variant='contained' style={{backgroundColor:'#003db3'}} onClick={CreateCourse}>CREATE COURSE +</Button> */}
                <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        tooltipTitle="Create Course"
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
             
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        
        ))}
      
      </SpeedDial>
      
    </Box>
              
                </div>
            </Grid>
        </Grid>
    </React.Fragment>
    );
}

export default Dash_Create_Course;