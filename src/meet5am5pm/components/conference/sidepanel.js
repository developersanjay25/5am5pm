import React, { useState, useEffect, useRef, Component } from "react";
import io from "socket.io-client";
// import "./main.css";
import $, { event } from "jquery";
import camera from "../../assets/icons/video-camera.png";
import mic from "../../assets/icons/mic.png";
import cancel from "../../assets/icons/math-multiplication.png";
import avatar from "../../assets/icons/anonymous.jpg";
import mutedmic from "../../assets/icons/mutedmic.png";
import { useRecoilState } from "recoil";
import { chatopenn, nameofuser } from "../../atoms/chatatoms";
import { socketport } from "../../config";
import Joinpromt from "../../containers/Joinprompt";
import { audioo, messagecountt } from "../../atoms/chatatoms";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { namejoinn, roomjoinn } from "../../atoms/atoms";
import { SnackbarProvider, useSnackbar } from 'notistack';

// import Chat from "./main";

const ENDPOINT = socketport;
let socket;

const Sidepanel = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  const [chatopen, setChatopen] = useRecoilState(chatopenn);
  const [audio, setaudio] = useRecoilState(audioo);
  const [cameraon, setCamera] = useState(false);
  const [roomjoin, setRoomjoin] = useRecoilState(roomjoinn);
  const [namejoin, setnamejoin] = useRecoilState(namejoinn);
  const [join, setjoin] = useState(false);
  const [messagecount, setMessagecount] = useRecoilState(messagecountt);
  toast.configure();
  const { enqueueSnackbar } = useSnackbar();

  const name = namejoin;
  const room = roomjoin;
  const initialRender = useRef(true);
  console.log("inside chat", name, room);
  useEffect(() => {
    socket = io(ENDPOINT);
    setRoomjoin(room);

    // socket.emit("join", { name, room }, (error) => {
    //   if (error) {
    //     alert(error);
    //     localStorage.removeItem("name");
    //     setjoin(true);
    //     $("#messageonline").hide();
    //   }
    // });
  }, []);

  // Chatt
  const openchat = () => {
    if (!chatopen) {
      $("#messageonline").css("display", "inline");
      $("#onlinwrap").css("display", "none");
      $(".peopleopen").css("border-bottom", "none");
      $(".chatopen").css("border-bottom", "2px solid black");
      $("#messagewrap").css("display", "block");
      setChatopen(true);
      setMessagecount(0);
    } else {
      $("#messageonline").css("display", "none");
      setChatopen(false);
    }
  };

  function micmuteunmute() {
    if (audio) {
      setaudio(false);
      $("#micmute").attr("src", `${mutedmic}`);
    } else {
      $("#micmute").attr("src", `${mic}`);
      setaudio(true);
    }
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (chatopen) {
        setMessagecount(0);
      } else {
        console.log("Counting messages");
        setMessagecount(messagecount + 1);
      }
    }
  }, [message]);

  // Message
  useEffect(() => {
    socket.on(`message`, (message) => {
      setMessage([...messages, message]);
      console.log(message);
      setMessage("");
      function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
      }
      var today = new Date(),
        date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
        time = date + ", " + formatAMPM(new Date());
        enqueueSnackbar("This is snack bar");

      $("#messages").animate(
        {
          scrollTop: $("#messages").get(0).scrollHeight,
        },
        2000
      );
      if (message.user === "admin") {
        // toast(message.user + " : " + message.text);
        
        $("#messages").append(
          "</br><div style='background-color:red;margintop:10px;' id='msg'>" +
            message.user +
            " : " +
            message.text +
            "</div><p style='margin-top:0px' id='time'>" +
            time +
            "</p>"
        );
        $("#send").val("");
      } else if (message.user === name) {
        $("#messages").append(
          "<div id='mychat'><ul><li><img style='float:right; height:auto;' id='avatar' src=" +
            avatar +
            "/></li>" +
            "<p class='mychat'>" +
            message.user +
            " : " +
            message.text +
            "</p></li></ul><div><p id='mytime'>" +
            message.created +
            "</p></div></div>"
        );
        $("#send").val("");
      } else {
        $("#messages").append(
          "</br><div id='msgg'><ul><li><img id='avatar' src=" +
            avatar +
            "/></li>" +
            "<li><p style='background-color:blue;' id='msg'>" +
            message.user +
            " : " +
            message.text +
            "</p></li></li></ul></div><p id='time'>" +
            message.created +
            "</p>"
        );
        $("#send").val("");
      }
    });

    socket.on("loadmsg", (loadmsg) => {
      console.log("sending old messages", loadmsg);
      for (let i = 0; i < loadmsg.length; i++) {
        if (loadmsg[i].user === name) {
          $("#messages").append(
            "<div id='mychat'><ul><li><img style='float:right; height:auto;' id='avatar' src=" +
              avatar +
              "/></li>" +
              "<p class='mychat'>" +
              loadmsg[i].user +
              " : " +
              loadmsg[i].text +
              "</p></li></ul><div><p id='mytime'>" +
              loadmsg[i].created +
              "</p></div></div>"
          );
          $("#send").val("");
        } else {
          $("#messages").append(
            "</br><div id='msgg'><ul><li><img id='avatar' src=" +
              avatar +
              "/></li>" +
              "<li><p style='background-color:blue;' id='msg'>" +
              loadmsg[i].user +
              " : " +
              loadmsg[i].text +
              "</p></li></li></ul></div><p id='time'>" +
              loadmsg[i].created +
              "</p>"
          );
          $("#send").val("");
        }
      }
    });
  }, []);

  $("#micmute").click(function () {
    micmuteunmute();
    setjoin(true);
  });

  //peoples
  useEffect(() => {
    socket.on("online", (online) => {
      document.getElementById("online").innerHTML = " ";
      for (let i = 0; i < online.length; i++) {
        document.getElementById("online").innerHTML += `<div id="onlinebackground"><ul>
        <li><img id="avatar" src=${avatar}></li>
        <li><p id="onlinepeoplename">${online[i].name}</p></li> 
        <li><section id="icons"><img id="camera" src=${camera}></li>
        <li><img id="micmute" src=${audio ? mic : mutedmic}></li>
        </ul></br></section></div>`;
        localStorage.removeItem("name");
      }
    });
  }, [audio, cameraon]);

  function peoplechat(i) {
    if (i == 1) {
      $("#messagewrap").css("display", "none");
      $("#onlinwrap").css("display", "block");
      $(".chatopen").css("border-bottom", "none");
      $(".peopleopen").css("border-bottom", "2px solid black");
    } else {
      $("#onlinwrap").css("display", "none");
      $("#messagewrap").css("display", "block");
      $(".peopleopen").css("border-bottom", "none");
      $(".chatopen").css("border-bottom", "2px solid black");
    }
  }
useEffect(() => {
  alert('open')
  if(chatopen){
  $("#messages").animate(
    {
      scrollTop: $("#messages").get(0).scrollHeight,
    },1000
  );
}
},[chatopen])

  function onclik(e) {
    e.preventDefault();
    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    }
    console.log("Message emitted", message);
    var today = new Date(),
      date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
      time = date + ", " + formatAMPM(new Date());

    var messages = { message: message, time: time };
    socket.emit("sendmessage", messages, () => {
      setMessage("");
    });
  }

  // conference
  if (join) {
    return <Joinpromt />;
  } else {
    return (
      <div id="body">
        {/* People */}
        <div id="messageonline">
          <img id="cancel" onClick={openchat} src={cancel} />
          <div id="btncontainer">
            <button className="chatopen" onClick={() => peoplechat(0)}>
              Chat
            </button>
            <button className="peopleopen" onClick={() => peoplechat(1)}>
              People
            </button>
          </div>


          {/* Chat */}
          <div id="messagewrap">
            <div id="messages">Sanjay </div>
            <input type="text" id="send" onChange={(event) => setMessage(event.target.value)} placeholder="Say something..." />
            <button className="btn" onClick={(event) => (!message ? event.preventDefault() : onclik(event))}>
              Send
            </button>
          </div>
        </div>
        
    <SnackbarProvider maxSnack={3}>

    </SnackbarProvider>
      </div>
    );
  }
};
export default Sidepanel;
