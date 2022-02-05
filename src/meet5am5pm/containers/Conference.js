import React, { useEffect } from "react";
import "../styles/conference.css";
import { makeStyles } from "@material-ui/core/styles";

import ControlBarBottom from "../components/conference/ControlBarBottom";
import $ from 'jquery';
import ConferenceLayout from "../components/conference/ConferenceLayout";
import ChatAndContactDrawer from "../components/conference/ChatAndContactDrawer";
import { useRecoilState } from "recoil";
import { layout } from "../atoms/conference";
import { emaill, joinn, namejoinn, roomjoinn } from "../atoms/atoms";
import Home from "./Home";
import queryString from "query-string";
import io from "socket.io-client";
import { socket } from "../config";
import { audioo, chatcontactt, chatopenn, messagecountt, renderr, videoo } from "../atoms/chatatoms";
import StartJanusServerRoom from "../components/conference/StartJanusServerRoom";
export var namee;

// const ENDPOINT = socketport;
// let socket;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

function Conference() {
  const classes = useStyles();
  const [openn, setOpenn] = React.useState(false);
  const [chatOrContact, setChatOrContact] = React.useState();
  const [layoutt, setLayout] = useRecoilState(layout);
  const [join, setjoin] = useRecoilState(joinn);
  const [namejoin, setNamejoin] = useRecoilState(namejoinn);
  const [email, setEmail] = useRecoilState(emaill);
  const [roomjoin, setRoomjoin] = useRecoilState(roomjoinn);

  const [chatopen, setChatopen] = useRecoilState(chatopenn);
  const [messagecount, setMessagecount] = useRecoilState(messagecountt);
  const [chatcontact, setChatcontact] = useRecoilState(chatcontactt);
  // const [render, setRender] = useRecoilState(renderr);
  

  
  useEffect(() => {
  
    const { room } = queryString.parse(window.location.search);
    setRoomjoin(room);
    const name = sessionStorage.getItem("name"); 
    namee = sessionStorage.getItem("name"); 
    
    setEmail(sessionStorage.getItem("email")); 
    if (name) {
      setNamejoin(name);
    }

    if (room && name) {
      setjoin(true);
      console.log(join);
      } else {
      setjoin(false);
      console.log(join);
    }
   },[]);

  //  useEffect(() => {

  //   let audiop = sessionStorage.getItem('audio');
  //   let videop = sessionStorage.getItem('video');

  //   console.log('audio',audiop,videop);

  //   if(audiop == 'true'){
  //     setaudio(true);
  //   }
  //   if(videop == 'true')
  //   {
  //       setvideo(true);
  //   }   
  
  //  },[audio,video,join])
  
  

  const handleDrawerOpen = (data) => {
    if(chatOrContact){
        console.log(chatOrContact);
      if(data == "CHATOFF"){
        setChatOrContact('');
        setOpenn(false);
        setChatopen(false);
        setMessagecount(0);        
        console.log(chatOrContact);
      }
      else{
        setChatOrContact(data);
        setOpenn(true);
        setChatopen(true);
        setMessagecount(0);    
        setChatcontact(data)
      }
    }
    else{
    setChatOrContact(data);
    setOpenn(true);
    setChatopen(true);
    setMessagecount(0);
    setChatcontact(data)
    }
    };

  const handleDrawerClose = () => {
    setChatOrContact('');
    setOpenn(false);
    setChatopen(false);
  };

  return join ? (
    <div className={classes.root}>
      <div id="conference">
        <ControlBarBottom handleDrawerOpen={handleDrawerOpen} />
        <div id="conferenceBody">
          <StartJanusServerRoom layout={layoutt}/>
          <ConferenceLayout layout={layoutt} /> 
        </div>
      </div>
      <ChatAndContactDrawer open={openn} chatOrContact={chatOrContact} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
    </div>
  ) : (
    <Home />
  );
}
export default Conference;
