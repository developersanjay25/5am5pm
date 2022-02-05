import { useEffect, useState, useRef } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useRecoilState } from "recoil";
import { audiostream, disablee, videostream } from "../../atoms/chatatoms";
import { IconButton,Tooltip,Snackbar } from "@material-ui/core";
import * as icons from "@material-ui/icons";
import { joinn, rolee } from "../../atoms/atoms";

function Mediacontainer() {
  const [audioswitch, setAudioswitch] = useState(false);
  const [vedioswitch, setVedioswitch] = useState(false);
  const [ismute, setisMuted] = useState(false);
  const [mediaStream, setMediaStream] = useRecoilState(videostream);
  const [audiostreamm, setAudioStream] = useRecoilState(audiostream);
  const [disable, setDisable] = useRecoilState(disablee); 
  const [join, setjoin] = useRecoilState(joinn);

  const [role, setRole] = useRecoilState(rolee);

  const [toast, setToast] = useState(false);

  function audioswitchclick() {
   setAudioswitch(audioswitch  ? false :true);
   sessionStorage.setItem('audio',audioswitch ? false : true);
  }

  const videopreview = document.getElementById("videopreview");
  const initialRender = useRef(true);
  
  useEffect(() =>{
      setDisable((role === 'Staf') ? false : true);
      console.log('role',role)
  },[role])

  console.log(ismute)

  useEffect(() => {
    // const role = localStorage.getItem('role');
    console.log('role',role)
    
    const audio = sessionStorage.getItem('audio');
    const video = sessionStorage.getItem('video');
    if(audio){
      console.log(audio,typeof(audio));  
      setAudioswitch(audio == 'true' ? true : false);
    }
    else{
      sessionStorage.setItem('audio',false);
    }

    if(video)
    {
      setVedioswitch(video =='true' ?  true : false );
    }
    else{
      sessionStorage.setItem('video',false);
    }
},[]);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: vedioswitch });
        setMediaStream(stream);
        videopreview.srcObject = stream;
      } catch (err) {
        // Removed for brevity
      }
    }
    if (initialRender.current) {
      initialRender.current = false;
    } else if (!mediaStream) {
      enableStream();
    } else {
      mediaStream.getTracks().forEach((track) => {
        setMediaStream(null);
        videopreview.srcObject = null;
        track.stop();
      });
    }
  }, [vedioswitch]);

  
  async function enableStream() {
    try {
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: audioswitch });
      console.log('audiostream',stream)
        setisMuted(false);
      setAudioStream(stream)
    } catch (err) {
      // Removed for brevity
      
      if (err.name == 'TypeError') {

          }
      else if(err.name == 'NotAllowedError'){
      console.log('error mic',err.name);
      setisMuted(true);
    }
  }
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else if (!audiostreamm) {
      enableStream();
    } else {
      audiostreamm.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }, [audioswitch]);


  function videoswitchclick() {
      setVedioswitch(vedioswitch ? false  : true);
      sessionStorage.setItem('video',vedioswitch ? false  : true);
  }

  
  const handleClose = () => {
    setToast(false);
  };

  return (
    <div id="mediacontainer">
      <div style={{ display: "flex",position:'relative' }}>
       <div>
         <Snackbar
          open={toast}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Staff only have permission to access"
          // action={action}
        />
         <div style={{position:'absolute',textAlign:'center',bottom:'20px',left:'0',right:'0',zIndex:'2'}}>  
      
      <Tooltip  placement="top" title={ismute ? "Your mic is Muted  by your system settings" : ""}>
        <IconButton style={{backgroundColor:'white',margin:'0 5px',color:'black'}} size='medium' onClick = {(e) => disable ? setToast(true) : audioswitchclick()}>
          {audioswitch ? <icons.MicOutlined /> : <icons.MicOffOutlined />}
                  </IconButton>
      </Tooltip>

        <IconButton style={{backgroundColor:'white',margin:'0 5px',color:'black'}} size='medium' onClick = {(e) => disable ? setToast(true) : videoswitchclick()}>
          {vedioswitch ? <icons.VideocamOutlined /> : <icons.VideocamOffOutlined />}
        </IconButton>
        </div>
        <video id="videopreview" autoPlay="true" className="videoview" height={180} width={450} placeholder="Preview"></video>
      </div>
      </div>
    </div>
  );
}
export default Mediacontainer;
