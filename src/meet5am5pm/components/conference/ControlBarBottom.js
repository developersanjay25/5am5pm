import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/controlBarBottom.css";
import BottomIcons from "./BottomIcons";
import { dateWithTime } from "../../utils/genFunc";
import ChatIcon from "@material-ui/icons/Chat";
import { Fade, IconButton, Slide } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import * as icons from "@material-ui/icons";
import { audiodevicee, camerachangee, messagecountt, opendialogg, videodevicee } from "../../atoms/chatatoms";
import { useRecoilState } from "recoil";

import { chatopenn } from "../../atoms/chatatoms";

import Badge from '@mui/material/Badge';
// import iconbtn from '@material-ui/core/IconButton';


import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import LayoutSetting from "./layoutsetting";


import SettingDialog from "../common/settingsdialog";



const iconbtn = {
  color:'white',
}
const iconbtn1 ={
  color:'white',
  backgroundColor:'rgb(60, 64, 67)',
  margin:'0 5px'
}


const ControlBarBottom = (props) => {
  const [time, setTime] = useState(dateWithTime(new Date()));
  const [messagecount, setMessagecount] = useRecoilState(messagecountt);
  const [opendialog, setOpendialog] = useRecoilState(opendialogg);
  const [chatopen, setChatopen] = useRecoilState(chatopenn);
  const [bottomicon, setBottomicon] = React.useState(true);
  const bottom = React.useRef();


  useEffect(() => {
    const interval = setInterval(() => setTime(dateWithTime(new Date())), 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);



var idleMouseTimer;
var forceMouseHide = false;
$(document).mousemove(function (ev) {
      
        if (!forceMouseHide) {

          setBottomicon(true)

          clearTimeout(idleMouseTimer);
          // if (isEnable) {
              idleMouseTimer = setTimeout(function () {
                setBottomicon(false);
                forceMouseHide = true;
                  setTimeout(function () {
                      forceMouseHide = false;
                  }, 1000);
              }, 5000);
          }
});

document.body.style= "overflow:hidden"

  return (
<Slide direction="up" in={bottomicon} >

    <div id="bottom-icon-bar">

      <div className="icon-bar-left">
        {/* {time} */}
        </div>
      <div className="icon-bar-center">
        <BottomIcons />
        <SettingDialog/>

        <Tooltip TransitionComponent={Zoom} title={"End Meeting"}>
        <IconButton onClick={(e) => {window.location.reload();}} style={{backgroundColor: 'red',color:'white',margin:'0 5px'}} color="secondary" aria-label="add an alarm">
          <icons.CallEndRounded />
        </IconButton>
      </Tooltip>


        <Tooltip TransitionComponent={Zoom} title={"Chat"}>
        <IconButton  style={iconbtn} color="default" aria-label="add an alarm" onClick={() => chatopen ? props.handleDrawerOpen("CHATOFF") : props.handleDrawerOpen("CHAT")}>
          <Badge badgeContent={messagecount} style={{backgroundColor: 'transparent',marginLeft:'2px'}}  
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
>
          <icons.Chat />
          </Badge> 
          {/* <span style={{position:'absolute',top:'4px',right:'4px',fontSize:'15px',fontFamily:'sans-serif'}}>{messagecount}</span> */}
        </IconButton>
        </Tooltip>

   

      
      </div>

      <div className="icon-bar-right">

      <LayoutSetting/>

      <Tooltip TransitionComponent={Zoom} title={"Settings"}>
        <IconButton color="default"  style={iconbtn} onClick={(e) => {setOpendialog(true)}} aria-label="add an alarm">
          <icons.Settings />
        </IconButton>
      </Tooltip>

      <Tooltip TransitionComponent={Zoom} title={"Notification"}>
        <IconButton  style={iconbtn} color="default" aria-label="add an alarm">
          <icons.Notifications/>
        </IconButton>
      </Tooltip>

      </div>
      </div>    
    </Slide>
    );
};

ControlBarBottom.propTypes = {};

export default ControlBarBottom;
