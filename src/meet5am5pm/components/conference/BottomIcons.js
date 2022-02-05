import React, { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import { IconButton } from "@material-ui/core";
import * as icons from "@material-ui/icons"
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { audioo, disablee, videoo,handrise, Toastt, screensharee, Recordon, ismutedd } from "../../atoms/chatatoms";
import PresentationSetting from "./presentationsettings";
import Recording from "../recording/record"
import { socket } from "../../config";
import { emaill, roomjoinn, rolee } from "../../atoms/atoms";
// import {preShareScreenn, screenshare, unpublishOwnFeedd } from "./StartJanusServerRoom";



// Popper
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const BottomIcons = (props) => {
  const [isMuteOn, setIsMuteOn] = useState(true);
  const [audio, setAudio] = useRecoilState(audioo);
  const [video, setVideo] = useRecoilState(videoo);
  const [disable, setDisable] = useRecoilState(disablee);
  const [handrisee, setHandrise] = useRecoilState(handrise);
  const [isScreenShareOn, setIsScreenShareOn] = useRecoilState(screensharee);
  const [isRecordon, setIsRecordOn] = useRecoilState(Recordon);
  const [isCamRecorderOn, setIsCamRecorderOn] = useState(true);
  const [ismuted,setIsMuted] = useRecoilState(ismutedd);

  const [role, setRole] = useRecoilState(rolee);

  //student Toast 
  const [toast, setToast] = useRecoilState(Toastt);


  const [anchorEl, setAnchorEl] = React.useState(ismuted);

  useEffect(() => {
    const aud =  sessionStorage.getItem('audio');
    const vid =  sessionStorage.getItem('video');
    setAudio(aud == 'true' ? true : false);
    setVideo(vid == 'true' ? true : false);

    // const role = localStorage.getItem('role')
    if(role == 'Staf'){
      setDisable(false);
  }
  else{
    setDisable(true);
  }
  },[]);

  const iconbtn = {
    backgroundColor: '#3c4043',
    color:'white',
    margin:'0 5px',
  }
  return (
    <div>
      <PresentationSetting/>
      
      <Tooltip TransitionComponent={Zoom} title={isScreenShareOn ? "Share Your screen" : "Cancel Screen share"}>
        <IconButton style={iconbtn} id='screen-share' color="default" aria-label="add an alarm" disabled={disable} onClick={() => {disable ? setToast(true) : setIsScreenShareOn((state) => (state ? false : true))}}>
          {isScreenShareOn ? <icons.ScreenShareOutlined /> : <icons.StopScreenShareOutlined />}
        </IconButton>
      </Tooltip>

      {/* <Popover 
      id='poper'
      open={ismuted}
      anchorEl={anchorEl}
      // onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      >
      <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover> */}


      <Tooltip TransitionComponent={Zoom} title={(ismuted ? "Your mic is Muted  by your system settings" : (audio ? "Mute" : "Unmute"))} >
        <IconButton style={iconbtn} color="default" aria-label="add an alarm" onClick={(e) => {disable ? setToast(true) : (ismuted ? e.preventDefault() : (setIsMuteOn((state) => !state), setAudio(!audio) ))}}>
          {audio ? <icons.MicOutlined /> : <icons.MicOffOutlined />}
        </IconButton>
      </Tooltip>
    
      <Tooltip TransitionComponent={Zoom} title={isCamRecorderOn ? "Start Video" : "Stop Video"}>
        <IconButton style={iconbtn} color="default" aria-label="add an alarm" onClick={() => {disable ? setToast(true) : setIsCamRecorderOn((state) => (state ? false : true),setVideo(video ? false : true))}}>
          {video ? <icons.VideocamOutlined /> : <icons.VideocamOffOutlined />}
        </IconButton>
      </Tooltip>
      
      <Tooltip TransitionComponent={Zoom} title={handrisee ? "Hand Rised" : "Hand Rise"}>
        <IconButton style={iconbtn} color="default" onClick={(e) => {setHandrise(handrisee ? false : true)}} aria-label="add an alarm">
          {handrisee ? <icons.PanTool/> : <icons.PanToolOutlined />}
        </IconButton>
      </Tooltip>
       
     <Recording/>
    </div>
  );
};

BottomIcons.propTypes = {};

export default BottomIcons;
