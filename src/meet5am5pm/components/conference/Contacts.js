import React, { useState, useEffect, useRef, Component } from "react";
import io from "socket.io-client";
import $, { event } from "jquery";

import avatar from "../../../Images/meetimages/avatar.jpg";
import camera from "../../icons/video-camera.png";
import mic from "../../icons/mic.png";
import mutedmic from "../../icons/mutedmic.png";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";

import { socket } from "../../config";
import { audioo, onlineuserr, permissionn } from "../../atoms/chatatoms";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { namejoinn, rolee, roomjoinn } from "../../atoms/atoms";
import * as icons from "@material-ui/icons"
import { IconButton , Tooltip } from "@material-ui/core";

const Contacts = (props) => {
  const [audio, setaudio] = useRecoilState(audioo);
  const [cameraon, setCamera] = useState(false);
  const [roomjoin, setRoomjoin] = useRecoilState(roomjoinn);
  const [namejoin, setnamejoin] = useRecoilState(namejoinn);
  const [join, setjoin] = useState(false);  
  const [onlineuser,setonlineuser] = useRecoilState(onlineuserr);
  const [permission,setPermission] = useRecoilState(permissionn);
  const [role,setRole] = useRecoilState(rolee);


  toast.configure();
  const name = namejoin;
  const room = roomjoin;

function permissio(mail,permission)
{
  console.log(mail.emailOrphone)
  socket.emit('user-permision',{'room' : room , 'email' : mail.emailOrphone, permission : permission});
}

  console.log("inside chat", name, room);
  useEffect(() => {

    // socket.emit("join", { name, room }, (error) => {
    //   if (error) {
    //     alert(error);
    //     localStorage.removeItem("name");
    //     setjoin(true);
    //     $("#messageonline").hide();
    //   }
    // });
  }, []);

  // //peoples

  // useEffect(() => {
  //   socket.on("online", (online) => {
  //     console.log("online", online);
  //     document.getElementById("online").innerHTML = " ";
  //     for (let i = 0; i < online.length; i++) {
  //       document.getElementById("online").innerHTML += `<div id="onlinebackground"><ul>
  //       <li><img id="avatar" src=${avatar} ></li>
  //       <li id="onlinepeoplename">${online[i].name}</li> 
  //       <li><section id="icons"><img id="camera" src=${camera}></li>
  //       <li><img id="micmute" src=${audio ? mic : mutedmic}></li>
  //       </ul></br></section></div>`;
  //       localStorage.removeItem("name");
  //     }
  //   });
  // }, [audio, cameraon]);

  // conference
  return (
    <div id="contacts">
    <div id="online">
    {onlineuser.map((user) => (
      <div id="onlinebackground"><ul>
       <li><img id="avatar" src={avatar} /></li>
       <li>
         <ul>
       <li id="onlinepeoplename"><p style={{margin : 0}} >{user.name}</p><p id='role'>{user.role}</p> </li>
        </ul> 
       </li>

       <li>
       <section id="icons">
       <li id="handrise">{user.handrise ? '✋' : ' '}</li> 
       <li>{(user.audio) ? <icons.MicOutlined style={{color:"green"}}/> :<icons.MicOffOutlined style={{color:'red'}}/>}</li>
       <li>{(user.video) ? <icons.VideocamOutlined style={{color:'green'}}/> :<icons.VideocamOffOutlined style={{color:'red'}}/>}</li>
       <li>{(role == 'Staf') ? <a style={{marginTop:"5px"}} onClick={(e) => permissio(user,!user.permission) }>{user.permission ? <Tooltip   title="Lock permission"><icons.LockOpenOutlined/></Tooltip> : <Tooltip  title="Un Lock permission"><icons.LockOpenOutlined/></Tooltip>}</a> : <></>}</li>
      {/* <li><img id="micmute" src={audio ? mic : mutedmic}/></li> */}
      </section><li/></li></ul></div>
    ))}

    </div>
  </div>
  );
};
       {/* <li>{(role == 'Staf') ? <a style={{marginTop:"10px"}} onClick={(e) => permissio(user,!user.permission) }>{user.permission ? <icons.Mic/> : <icons.MicOff/>}</a> : <></>}</li> */}

Contacts.propTypes = {};

export default Contacts;
