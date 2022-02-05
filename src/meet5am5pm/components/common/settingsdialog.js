import { audiodevicee, audiooutputdevicee, audiostream1, bandwidthh, camerachangee, olddeviceid, opendialogg, settingspreload, videodevicee, videoresolutionn } from "../../atoms/chatatoms";

import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import * as icons from "@material-ui/icons";

import { useRecoilState } from "recoil";

import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import ChangeCamera from "../common/ChangeCamera";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import {devicegetting} from "../conference/devicegetting";
import { useEffect } from "react";


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const iconbtn = {
    color:'white',
  }
  const iconbtn1 ={
    color:'white',
    backgroundColor:'rgb(60, 64, 67)',
    margin:'0 5px'
  }
  

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });


function SettingDialog()
{
// Settings Dialog
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  
  // Settings  Dialog
  const [opendialog, setOpendialog] = useRecoilState(opendialogg);
    
  const [audiodevice, setAudiodevice] = useRecoilState(audiodevicee);
  const [audiooutputdevice, setAudiooutputdevice] = useRecoilState(audiooutputdevicee);
  const [videodevice, setVideodevice] = useRecoilState(videodevicee);
  const [camerachange, setChangecamera] = useRecoilState(camerachangee);
  const [videoresolution, setVideoresolution] = useRecoilState(videoresolutionn);
  const [bandwidth, setBandwidth] = useRecoilState(bandwidthh);
  const [settingspreloader,setSettingspreloader] = useRecoilState(settingspreload);
  const [oldDeviceId,setOldDeviceId] = useRecoilState(olddeviceid);
  const [audiostream, setAudiostream] = useRecoilState(audiostream1);

  const handleClickOpen = () => {
    setOpendialog(true);
  };
  const handleClose = () => {
    // setAudiodevice(olddeviceid);
    setOpendialog(false);

    // audiostream.getTracks().forEach((track) => {
    //   // console.log('old stream stopped');
    //   track.stop();
    // });
  
    navigator.mediaDevices.getUserMedia({audio : { deviceId: oldDeviceId }})
    .then(function(stream) {
      console.log('new device changed to old',oldDeviceId);
      stream.getTracks().forEach((track) => {
        // console.log('old stream stopped');
        track.stop();
      });
    });

  };
  
  // console.log(opendialog)

  const classes = useStyles();

  function onclickok()
  {
    setChangecamera(camerachange ? false : true);
    sessionStorage.setItem('audiodevice',audiodevice);
    sessionStorage.setItem('videodevice',videodevice);
    setOldDeviceId(audiodevice);
    
    navigator.mediaDevices.getUserMedia({audio : { deviceId: audiodevice }})
    .then(function(stream) {
      console.log('new device changed to old',oldDeviceId);
      stream.getTracks().forEach((track) => {
        console.log('old stream stopped');
        console.log('new device id',track.getSettings());
        track.stop();
      });
    });

    setOpendialog(false);
  }
  
  useEffect(() => {
      if(opendialog)
        {
          // setSettingspreloader(true);
  }
},[opendialog]);

useEffect(() => {
  const audiochange = sessionStorage.getItem('audiodevice');
  const videochange = sessionStorage.getItem('videodevice');

  if(audiochange && videochange){
    setAudiodevice(audiochange);
    setVideodevice(videochange);

    console.log(sessionStorage.getItem('audiodevice'));
    console.log(sessionStorage.getItem('videodevice'));
}

    
    sessionStorage.removeItem('audiodevice');
    sessionStorage.removeItem('videodevice');

})  


console.log(audiodevice);
console.log(videodevice);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton style={iconbtn} aria-label="close" className={classes.closeButton} onClick={onClose}>
          <icons.Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


    return (
      <>
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={opendialog}>
    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
      Video & Audio Devices
    </DialogTitle>
    <DialogContent dividers>
    <div style={{display:'inline-block',marginLeft:'-15px', width:'400px'}}>
      
      <select  className='dropdown' id="audio-device" value={audiodevice} onChange={(e) => {setAudiodevice(e.target.value)}}>
      </select>
   
  <br/>
  <br/>
  
      <select  className='dropdown' id="video-device" value={videodevice} onChange={(e) => {setVideodevice(e.target.value)}}>
      </select>

<br/>
<br/>

    <canvas id="audioequilizer" width="100" height="30"></canvas>
    
  <div className='inline'>
  
  <div>
  <FormControl variant="outlined" label='age' fullwidth className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Video Resolution</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Age"
            value={videoresolution}
            onChange={(e) => {setVideoresolution(e.target.value)}}
          >
            <MenuItem value="">
              {/* <em>Auto</em> */}
            </MenuItem>
            <MenuItem value={"lowres"}>320x240</MenuItem>
            <MenuItem value={"lowres-16:9"}>320x180</MenuItem>
            <MenuItem value={"stdres"}>640x480</MenuItem>
            <MenuItem value={"stdres-16:9"}>640x360</MenuItem>
            <MenuItem value={"hires"}>1280x720</MenuItem>
          </Select>
        </FormControl>
        </div>  
  </div>
  
  <div className='inline'>
  
  <div>
  <FormControl variant="outlined" label='age' className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Bandwidth</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Age"
            onChange={(e) => {setBandwidth(e.target.value)}}
            value={bandwidth}
          >
            <MenuItem value="">
              {/* <em>None</em> */}
            </MenuItem>
            <MenuItem value={0}>Auto</MenuItem>
            <MenuItem value={128000}>128 kbits</MenuItem>
            <MenuItem value={256000}>256 kbits</MenuItem>
            <MenuItem value={512000}>512 kbits</MenuItem>
            <MenuItem value={1024000}>1 mbit</MenuItem>
            <MenuItem value={1500000}>1.5 mbit</MenuItem>
            <MenuItem value={2000000}>2 mbit</MenuItem>
          </Select>
        </FormControl>
       </div>
  
  </div>
  
  </div>
    </DialogContent>
    <DialogActions>
    <Button autoFocus onClick={handleClose} variant='contained' color="secondary">
        Cancel
      </Button>
      <Button onClick={onclickok}  variant='contained' color="primary">
        Ok
      </Button>
    </DialogActions>
    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={settingspreloader}
>
  <CircularProgress color="inherit" />
</Backdrop>

   
  </Dialog>
  </>);
}

export default SettingDialog;