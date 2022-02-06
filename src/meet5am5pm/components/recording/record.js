
   
import React from 'react';
import { useRecoilState } from 'recoil';
import { Recordon } from '../../atoms/chatatoms';
import axios from 'axios';
var chunk = [];
// var mediaRecorder;
var btnStartRecording = document.querySelector('#startrecording');
var stream;

// Progress
import CircularProgress from '@mui/material/CircularProgress'
import {Box,Typography} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { courseidd } from '../../atoms/atoms';

var mediaRecord;

function Recording(){


    const [isRecordon, setIsRecordOn] = useRecoilState(Recordon);
    const [courseid, setCourseid] = useRecoilState(courseidd);
    const [record, setRecord] = React.useState(false);
    const [mediaRecorder, setMediaRecorder] = React.useState();
    const [percentCompleted, setPercentcompleted] = React.useState(0);
    const [recordupload, setRecordUpload] = React.useState(false);
  
    
  const queryParams = new URLSearchParams(window.location.search);
  const room = queryParams.get("room");
  
    const firstRender = React.useRef(true);  
    
    var commonConfig = {
    onMediaCaptured: function(streamm) {
        stream = streamm;
        // if(button.mediaCapturedCallback) {
        //     button.mediaCapturedCallback();
        // }
        console.log('stream',stream)
        // button.innerHTML = 'Stop Recording';
        // button.disabled = false;
        setRecord(false);
},
};




React.useEffect(() => {
    console.log(firstRender.current)
    if(!firstRender.current){
    if(isRecordon){
    startstoprecord();
    }
    else{
        console.log('record',stream)
        if(stream) {
            // mediaRecorder.stop();
            setRecord(false);
            // stream = null;
        }

        if(stream instanceof Array) {
            stream.forEach(function(stream) {
                stream.stop();
            });
            stream = null;
        }

    }
    }
    firstRender.current = false;
},[isRecordon])

function startstoprecord()
{
    console.log(record);
    if(record) {
        // stopStream();
    console.log('stopped',stream,stream.stop);
        function stopStream() {
            if(stream) {
                // mediaRecorder.stop();
                setRecord(false);
                // stream = null;
            }

            if(stream instanceof Array) {
                stream.forEach(function(stream) {
                    stream.stop();
                });
                stream = null;
            }

        }
                    stopStream();
         
        return;
    }
    else{
        captureAudioPlusScreen(commonConfig);
        // button.value = 'Stop Recording';
    }
}




let formdata =  new FormData();
var config = {
    onUploadProgress: function(progressEvent) {
      var percentCompletedd = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      setPercentcompleted(percentCompletedd);
    }
  };


function apicall(blob){
    formdata.append('file',blob);
    
    const token = localStorage.getItem('token');
    setRecordUpload(true);
    console.log(formdata,blob);
    axios.patch(`https://app.5am5pm.com:3000/staf/upload_blob?meeting_id=${room}&course_id=${courseid}`,formdata,config, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }).then((data) => {
            console.log('blobb',data);
            setRecordUpload(false);
    }).catch((err) => {
        console.log('blobb',err.response);
        setRecordUpload(false);
    }
    )}
    
function addStreamStopListener(stream, callback) {
    stream.addEventListener('ended', function() {
        callback();
        callback = function() {};
    }, false);
    stream.addEventListener('inactive', function() {
        callback();
        callback = function() {};
    }, false);
    stream.getTracks().forEach(function(track) {
        track.addEventListener('ended', function() {
            mediaRecord.stop();
            callback();
            callback = function() {};
        }, false);
        track.addEventListener('inactive', function() {
            callback();
            callback = function() {};
        }, false);
    });
}

function captureAudioPlusScreen(config) {
    if (navigator.getDisplayMedia) {
        navigator.getDisplayMedia({
            video: true
        }).then(screenStream => {
            navigator.mediaDevices.getUserMedia({audio:true}).then(function(mic) {
                screenStream.addTrack(mic.getTracks()[0]);
                
                // streamrecord(screenStream);

                addStreamStopListener(screenStream, function() {
                });

                // setVideoURL(screenStream, true);
            });
        }).catch(function(error) {
            config.onMediaCapturingFailed(error);
        });
    } else if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({
            video: true,
            preferCurrentTab : true,
            // audio : true
        }).then(screenStream => {
            navigator.mediaDevices.getUserMedia({audio:true}).then(function(mic) {
                screenStream.addTrack(mic.getTracks()[0]);

                config.onMediaCaptured(screenStream);
                setRecord(true);
                // stream = screenStream;
                mediaRecord = new MediaRecorder(screenStream);
                
                // mediaRecorder = mediaRecord;


                mediaRecord.start();
                console.log('media recorder',mediaRecord.state);

                // setMediaRecorder(mediaRecord);

                mediaRecord.ondataavailable = function(e){
                    chunk.push(e.data);
                    console.log('data',e.data);
                }

                mediaRecord.onstop = function(e){
                    console.log('mediarecord stopped');
                    screenStream.getTracks()[0].stop();
                    setIsRecordOn(false);
                    var blobb = new Blob(chunk, { type : chunk[0].type});
                    console.log(URL.createObjectURL(blobb));
                    apicall(blobb);
                } 

                addStreamStopListener(screenStream, function() {
                    screenStream.getTracks()[0].stop();
                    setRecord(false)
                });

            });
        }).catch(function(error) {
            // config.onMediaCapturingFailed(error);
            console.log(error);
        });
    } else {
        var error = 'getDisplayMedia API are not supported in this browser.';
        config.onMediaCapturingFailed(error);
        alert(error);
    }
}




return <>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={recordupload}
>
<CircularProgressWithLabel value={percentCompleted} />
</Backdrop>
</>;
}


function CircularProgressWithLabel(
    props
  ) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }
export default Recording;