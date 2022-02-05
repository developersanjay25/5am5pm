import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { formatAMPM } from "../../utils/genFunc";
import { socket } from "../../config";
import { emaill, namejoinn, roomjoinn, rolee } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import { audioo, videoo,chatopenn, disablee, handrise, messagecountt, onlineuserr } from "../../atoms/chatatoms";
import {  toast } from 'react-toastify';
import $, { event } from "jquery";
import avatar from "../../../Images/meetimages/avatar.jpg";
import * as icons from '@material-ui/icons'
import axios from 'axios';
import { SnackbarProvider, useSnackbar } from 'notistack';

import {IconButton,CircularProgress} from '@mui/material';
import { Grow, Typography } from "@material-ui/core";

import '../../../../node_modules/lightgallery.js/src/css/lightgallery.css'
import '../../styles/lightgalleryy.css'

import Picker from 'emoji-picker-react';

// const ENDPOINT = socketport;
// export var socket;



const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const [filename, setFilename] = useState();
  const [fileicon, setFileicon] = useState('none');
  const [messages, setMessages] = useState("");
  const [chatopen, setChatopen] = useRecoilState(chatopenn);
  const [cameraon, setCamera] = useState(false);
  const [audio, setaudio] = useRecoilState(audioo);
  const [video, setvideo] = useRecoilState(videoo);


  const [messagecount, setMessagecount] = useRecoilState(messagecountt);
  const [myMessage, setMymessage] = useState([]);
  const [formessagecount,setforMessageCount] = useState(false);
  const [loadingfile,setLoadingfile] = useState(true);

  const [disable, setDisable] = useRecoilState(disablee);

  const [namejoin, setNamejoin] = useRecoilState(namejoinn);
  const [roomjoin, setRoomjoin] = useRecoilState(roomjoinn);
  const [email, setEmail] = useRecoilState(emaill);

  // For Socket
  const [handrisee, setHandrise] = useRecoilState(handrise);
  const [role, setRole] = useRecoilState(rolee);


// Emoji
  const [emojiopen, setEmojiopen] = React.useState(false);

  
  const onEmojiClick = (event, emojiObject) => {
    // setChosenEmoji(emojiObject.emoji);
    setMessage(message+emojiObject.emoji);
  };

  
  toast.configure();
  const initialRender = useRef(true);
  const [onlineuser,setonlineuser] = useRecoilState(onlineuserr);
    const room = roomjoin;
    const name = namejoin;

    console.log('lightgallery',document.querySelectorAll('.lightgallery'));
    var lightgal = document.querySelectorAll('.lightgallery');
    
    require(['../../../../node_modules/lightgallery.js/src/js/lightgallery.js'], function() {
      // require(["./zoom.js", "../../../../node_modules/lightgallery.js/src/js/thumbnail.js"], function(){
        for(var i=0; i<=lightgal.length; i++){
          
      
        window.lightGallery(lightgal[i]);  
    }
  });  

    
    // window.lightGallery(document.getElementById('lightgallery')); 

  useEffect(() => {
    console.log(roomjoin, namejoin );
    socket.emit("join", { room, name,email,role }, (error) => {
      if (error) {
        alert(error);
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        window.location.reload();
      }
    });
    setMessagecount(0);
    console.log('rendering')

  },[]);



  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.baseURL = 'https://app.5am5pm.com:3000'
    console.log({'Authorization': `Bearer ${token}`});
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

axios.get('https://app.5am5pm.com:3000/commonapi/allProfile').then((resp) => {

    setEmail(resp.data.data[0].mobile);
    console.log(resp.data);

}).catch((err) => {
if(err){
    console.log(err.response);
}
});
}, [])


  //update messages
  // Message
useEffect(() => {
  socket.on(`message`,(message) =>{
    
    if(role == 'Staf')
    socket.emit('user-permision',{'room' : roomjoin , 'email' : email, permission : true});

  setMessage([...messages,message])
  console.log('message',message);
  setFileicon('none')
  setMessage('');
  setforMessageCount(!formessagecount);
  console.log('count message woking',messagecount)

  let today = new Date(),
  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
  time = date +", "+ formatAMPM(new Date);

  $('#messages').animate({
      scrollTop: $('#messages').get(0).scrollHeight
  }, 2000);

  if(message.file){
    var extention = get_url_extension(message.file);
    if(extentioncheck(extention)){
      message.file = 'https://docs.google.com/viewer?embedded=true&url='+message.file;
    console.log(message);
  }
}
console.log('email',parseInt(message.email),email.toString())   

          if(message.user === "admin")
          {
            // console.log(message);
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("email"); 
          }       
          else if(parseInt(message.email) === email){
      
                if(message.file){
                  if(imagextension(extention)){
                    $("#messages").append("<div id='mychat'><div><img class='myavatar' src='"+avatar+"'/></div><div class='myfile'><div class='lightgallery'><a href="+message.file+"><embed class='files' allow='fullscreen;' data-lightbox='image' src='"+message.file+"'/></a></div><div class='mycreatedtime'>"+ message.text.time +"</div></div></div>");
                  }
                  else{
                  $("#messages").append("<div id='mychat'><div><img class='myavatar' src='"+avatar+"'/></div><div class='myfile'><embed class='files' allow='fullscreen;' src='"+message.file+"'/><div class='mycreatedtime'>"+ message.text.time +"</div></div></div>");
                }
                }
            else{
              $("#messages").append("<div id='mychat'><div><img class='myavatar' src='"+avatar+"'/></div><div class='mychat'><p class='mymsg'>"+message.text.message +"</p><div class='mycreatedtime'>"+ message.text.time +"</div></div></div>");
              $("#send").val('');
            }
          }
          else{     
            if(message.file){ 
              if(imagextension(extention)){
                $("#messages").append("<div class='msg'><div><img class='avatar' src='"+avatar+"'/></div> <div class='file'><p class='username'>"+ message.user + "</p><div class='lightgallery'><a href="+message.file+"><embed class='files' allow='fullscreen;' src='"+message.file+"'/></a></div><div class='created'>"+ message.text.time +"</div></div></div>");
                
              } 
              else{
              $("#messages").append("<div class='msg'><div><img class='avatar' src='"+avatar+"'/></div> <div class='file'><p class='username'>"+ message.user + "</p><embed class='files' allow='fullscreen;' src='"+message.file+"'/><div class='created'>"+ message.text.time +"</div></div></div>");
             }
             }
             else{
              $("#messages").append("<div class='msg'><div><img class='avatar' src='"+avatar+"'/></div><div><p class='username'>"+ message.user + "</p><div class='message left-top'>"+ message.text.message +"<div class='created'>"+ message.text.time +"</div></div></div></div>");
              $("#send").val('');
              }
                }
  });



  function get_url_extension( url ) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }
  
  function extentioncheck(extension)
  {
  const excel = ['xls' , 'xlsx' , 'xlsx' , 'xlt' , 'xlsm' , 'xltm' , 'xlam' , 'txt'];
  var word = ['doc' , 'docx' , 'docm' , 'dot' , 'dotx' , 'dotm' , 'rtf'];
  var powerpoint = ['ppt' , 'pptx' , 'pptm' , 'pps' , 'ppsx' , 'ppsm' , 'pot' , 'potx' , 'potm' , 'odp']

  var forreturn = false;
  excel.map((ex) => {if(ex===extension) { forreturn = true; }});
  word.map((ex) => {console.log('extension',ex,extension,(ex===extension));  
  if(ex===extension)  
{  
  console.log('extension',ex,extension,(ex===extension));
  forreturn = true;
}
});
  powerpoint.map((ex) => {console.log('extension',ex,extension,(ex===extension));  if(ex===extension) {forreturn = true; }});

  return forreturn;   
}

function imagextension(extension){
  var image = ['jpg' , 'png' , 'jpeg', 'gif', 'tif' , 'tiff' , 'bmp' , 'eps'];

  var forreturn = false;

  image.map((ex) => {if(ex===extension) { forreturn = true;}});
  return forreturn;
}

socket.on('loadmsg',(loadmsg) => {
  console.log("sending old messages",loadmsg);
  for(let i=0 ; i<loadmsg.length; i++){

    if(loadmsg[i].file){
  //  Defining file link
  console.log('extension file');
    var extention = get_url_extension(loadmsg[i].file);
    console.log('extension',extentioncheck(extention));
    if(extentioncheck(extention)){
      loadmsg[i].file = 'https://docs.google.com/viewer?embedded=true&url='+loadmsg[i].file;
      console.log(loadmsg[i]);
    }
  }
  console.log('email',parseInt(loadmsg[i].email),email);

  if(parseInt(loadmsg[i].email) === email){
    if(loadmsg[i].file){
      if(imagextension(extention)){
        $("#messages").append("<div id='mychat'><div><img class='myavatar' src='"+avatar+"'/></div><div class='myfile'><div class='lightgallery'><a href="+loadmsg[i].file+"><embed class='files' allow='fullscreen;' data-lightbox='image' src='"+loadmsg[i].file+"'/></a></div><div class='mycreatedtime'>"+ loadmsg[i].created +"</div></div></div>");
      }
      else{
      $("#messages").append("<div id='mychat'><div><img class='myavatar' src='"+avatar+"'/></div><div class='myfile'><embed class='files' allow='fullscreen;' src='"+loadmsg[i].file+"'/><div class='mycreatedtime'>"+ loadmsg[i].created +"</div></div></div>");
   }
  }
    else{
      $("#messages").append("<div id='mychat'><div><img class='myavatar' src='"+avatar+"'/></div><div class='mychat'><p class='mymsg'>"+loadmsg[i].text +"</p><div class='mycreatedtime'>"+ loadmsg[i].created +"</div></div></div>");
    }
        }  
        else{    
        if(loadmsg[i].file){  
          if(imagextension(extention)){
            $("#messages").append("<div class='msg'><div><img class='avatar' src='"+avatar+"'/></div> <div class='file'><p class='username'>"+ loadmsg[i].user + "</p><div class='lightgallery'><a href="+loadmsg[i].file+"><embed class='files' allow='fullscreen;' src='"+loadmsg[i].file+"'/></a><div><div class='created'>"+ loadmsg[i].created +"</div></div></div>");
          }
          else{
            $("#messages").append("<div class='msg'><div><img class='avatar' src='"+avatar+"'/></div> <div class='file'><p class='username'>"+ loadmsg[i].user + "</p><embed class='files' allow='fullscreen;' src='"+loadmsg[i].file+"'/><div class='created'>"+ loadmsg[i].created +"</div></div></div>");
           }}
           else{
          $("#messages").append("<div class='msg'><div><img class='avatar' src='"+avatar+"'/></div><div><p class='username'>"+ loadmsg[i].user + "</p><div class='message left-top'>"+ loadmsg[i].text +"<div class='created'>"+ loadmsg[i].created +"</div></div></div></div>");
          $("#send").val('');
        }  
        }}
});


// Listen hand rise
  socket.on('hand-rise',(handrise) => {
    
  $('#messages').animate({
    scrollTop: $('#messages').get(0).scrollHeight
}, 2000);

    $("#messages").append("<div style='text-align:center; padding:5px; font-size:12px; clear:both; color:#2e2e2e;'>"+ handrise.name+ " Raised hand ✋</div>"); 
  })

  socket.on('permission-grantdeny',(permission) => {
      setDisable(!permission);  
  })
  
},[]);


// Update role
useEffect(() => {
  socket.emit('update-role',{email : email,role : role})
  },[role])
  
// media toggling
useEffect(() => {
  socket.emit("toggle-device",{email : email,room : room, audio :audio, video : video});
},[audio,video])

  //peoples
  useEffect(() => {
    socket.on("online", (online) => {
      console.log("online", online);
      setonlineuser(online);
    });
  }, [audio, cameraon, video]);

  useEffect(() => {
    console.log('online users',onlineuser);
        localStorage.removeItem("name");
},[onlineuser])

  //message count
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (chatopen) {
        setMessagecount(0);
        console.log("Counting messages 0");
      } else {
        setMessagecount(messagecount + 1);
        console.log("Counting messages");
      }
    }
  }, [formessagecount]);
  console.log(email);

  //send event
  const onclik = (e) => {
    e.preventDefault();
    console.log("Message emitted", message);
    let today = new Date(),
      date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
      time = date + ", " + formatAMPM(new Date());
      let bodyFormData = new FormData();
      // setLoadingfile(false);
      if(file){
        
      }
    else if(message){
    let messages = { message: message, time: time ,email : email};
    socket.emit("sendmessage", messages, () => {
      setMessage("");
    });
  }
  };

  //Enter to send message
  const sendOnKeyUp = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      if(message){
      onclik(event);
    }
  }
  };

  const sendOnChange = (event) => {
    // console.log('event',event.clipboardData.files);
    setMessage(event.target.value);
  };

  // Paste to send file
  const pastechange = (event) => {
    
    if(event.clipboardData.files[0]){
    
    console.log('event',event.clipboardData.files[0].name);
    setFile(event.clipboardData.files[0]);
    document.getElementById('file').files = event.clipboardData.files;
    setFilename(event.clipboardData.files[0].name);
    setFileicon('block');

    

    let today = new Date(),
      date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
      time = date + ", " + formatAMPM(new Date());
      let bodyFormData = new FormData();

    console.log('hiiting api for upload');
    setLoadingfile(false);

    const link = 'https://app.5am5pm.com:3000/chat/add_image/' + room;
    bodyFormData.append('file',event.clipboardData.files[0]);
      axios.post(link,bodyFormData).then((data) => {
          console.log(data);
          if(data){
            setLoadingfile(true);
            let messages = { message: filename , time: time ,email : email,file : data.data.data.filepath};
            console.log('file message',messages)
              socket.emit("sendmessage", messages, () => {                                
                    setFileicon('none');
                    setFile('');
                    setFilename('');
                    document.getElementById('file').value ='';
              });
          }
      }).catch((err) => {
        console.log(err.response);
        console.log(err);
      })
    }
  }

// File operations
  const gettingfile = (event) => {
    setFile(document.getElementById('file').files.item(0));
    console.log(document.getElementById('file').files.item(0));
    setFilename(document.getElementById('file').files.item(0).name);
    setFileicon('block');

    
    let today = new Date(),
      date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
      time = date + ", " + formatAMPM(new Date());
      let bodyFormData = new FormData();

    if(document.getElementById('file')){
    console.log('hiiting api for upload');
    const link = 'https://app.5am5pm.com:3000/chat/add_image/' + room;
    bodyFormData.append('file',document.getElementById('file').files.item(0));
      axios.post(link,bodyFormData).then((data) => {
          console.log(data);
          if(data){
            setLoadingfile(true);
            let messages = { message: filename , time: time ,email : email,file : data.data.data.filepath};
              socket.emit("sendmessage", messages, () => {                                
                    setFileicon('none');
                    setFile('');
                    setFilename('');
                    document.getElementById('file').value ='';
              });
          }
      }).catch((err) => {
        console.log(err.response);
      })
    }
  
  }

  const deletefile = () => {
      setFileicon('none');
      setFile('');
      setFilename('');
      document.getElementById('file').value ='';
  } 

  //component destroy
  useLayoutEffect(() => {
    return () => {
      setChatopen(false);
    };
  }, []);
  
  useEffect(() => {
    console.log('messages',myMessage);
  },[myMessage])

  // Hand rise
  useEffect(() => {
      socket.emit('hand-rise',{room :room, name: name, email: email,handrise : handrisee});
      console.log(handrisee);
    },[handrisee])

  return (
    <div id="chat" style={{height:'90%'}}>
      {/* Chat */}

      <div id="messages">
      </div>

      <p style={{display:fileicon}} className='fileicon'>{filename}   <IconButton onClick={deletefile} aria-label="delete" size="small">
        <icons.Delete fontSize="small" />
      </IconButton> &nbsp; <CircularProgress variant={(loadingfile) ? 'determinate' : 'indeterminate'} size={20}/></p>
      <div id="sendChat">
        <div className="sendfield">
        <label for='file' style={{marginLeft:'5px',color:'rgb(0 112 186)' , marginTop : '5px'}}><icons.AttachFile/></label>
       
       
<IconButton aria-label="delete" onClick={() => {setEmojiopen(!emojiopen)}} style={{color: emojiopen ? 'blue' : '#505050'}}>
  <icons.EmojiEmotions/>
</IconButton>
        <input type="text" id="send" autoComplete={"off"} onPaste={pastechange} value={message} onChange={sendOnChange} onKeyUp={sendOnKeyUp} placeholder="Type message..." />
        <button className="btn" id="sendmessage" onClick={(event) =>  onclik(event)}>
          <icons.Send/>
        </button></div>

        
  {/* Emoji */}
  <Grow style={{position : 'absolute', bottom:'60px'}} in={emojiopen}>
  <div>
  <Picker onEmojiClick={onEmojiClick} />
  </div>
</Grow>   
        <div>
        <input type="file" id="file" onChange={gettingfile} style={{display:'none'}} /></div>
      </div>
    </div>
  );
};

Chat.propTypes = {};

function MessageOnline(props){
  return <div>
    <img src={avatar} className='avatar'/>
    <Typography>props.name</Typography>
    <icons.Videocam/>
    <icons.Mic/>
  </div>
}

export default Chat;