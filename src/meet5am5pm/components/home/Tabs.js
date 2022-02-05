import { useEffect, useState, useRef } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useRecoilState, useSetRecoilState } from "recoil";
import { emaill, joinn, namee, namejoinn, roomjoinn, roomm } from "../../atoms/atoms";
import Button from '@material-ui/core/Button'
import queryString from "query-string";
import axios from 'axios'
import { audiostream, videostream } from "../../atoms/chatatoms";

function Tabs() {
  const [namejoin, setNamejoin] = useRecoilState(namejoinn);
  const [room, setRoom] = useRecoilState(roomm);
  const [email, setEmail] = useRecoilState(emaill);
  const [roomjoin, setRoomjoin] = useRecoilState(roomjoinn);
  const [yourName, setName] = useRecoilState(namee);
  const [join, setjoin] = useRecoilState(joinn);

  
  const [mediaStream, setMediaStream] = useRecoilState(videostream);
  const [audiostreamm, setAudioStream] = useRecoilState(audiostream);

  useEffect(() => {
    
    const {room} = queryString.parse(window.location.search);
    setRoomjoin(room);
    console.log('room',window.location.search,room)

    let tabb = document.querySelectorAll(".tabcontent");
    console.log(uuid());
    tabb[0].style.display = "block";
}, []);

useEffect(() => {

  
        const token = localStorage.getItem('token');
        axios.defaults.baseURL = 'https://app.5am5pm.com:3000'
        console.log({'Authorization': `Bearer ${token}`});
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

  axios.get('https://app.5am5pm.com:3000/commonapi/allProfile').then((resp) => {
        
  setNamejoin(resp.data.data[0].first_name);
  setEmail(resp.data.data[0].mobile);
  console.log(resp.data.data[0].first_Name);

        console.log(resp.data);

  }).catch((err) => {
    if(err){
        console.log(err.response);
    }
  });
}, [])


  function refreshjoin() {
    sessionStorage.setItem("name", namejoin);
    sessionStorage.setItem("email", email);
    setjoin(true);

    
    if(audiostreamm){
      audiostreamm.getTracks().forEach((track) => {
        track.stop();
        console.log('stopaudio',track)
      });
    }

    if(mediaStream){
      mediaStream.getTracks().forEach((track) => {
        track.stop();
        console.log('stopvideo',track)
      });
    }
  }

  return (
    <div id="tabcontainer">
      {/* <div className="tabcontent">
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <br />
        <input type="text" placeholder="Room" onChange={(e) => setRoom(e.target.value)} />
        <br />
        <br />

        <Link onClick={(event) => (!yourName || !room ? event.preventDefault() : null)} to={`/conference?room=${uuid()}`}>
          <button onClick={(event) => (!yourName || !room ? event.preventDefault() : refresh(event))}>Create</button>
        </Link>
      </div> */}
      <div className="tabcontent">
        {/* <input type="text" onChange={(e) => setRoomjoin(e.target.value)} value={roomjoin} placeholder="Meeting Link" />
        <br />
        <input type="text" value={namejoin} onChange={(e) => setNamejoin(e.target.value)} placeholder="Your name" />
        <br /> */}
        <Link to={`/conference?room=${roomjoin}`}>
          <button href={`/conference?room=${roomjoin}`} onClick={(event) => (!namejoin || !roomjoin ? event.preventDefault() : refreshjoin())} className="btn">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Tabs;
