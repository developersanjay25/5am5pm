import { Typography } from '@material-ui/core'
import React, {useEffect} from 'react'
import { useRecoilState } from 'recoil';
import { audiodevicee, olddeviceid, videodevicee } from '../atoms/chatatoms';

export var audiodeviceexport,videodeviceexport;


const Audiovideo = () => {
    const [audiodevice, setAudiodevice] = useRecoilState(audiodevicee);
    const [videodevice, setVideodevice] = useRecoilState(videodevicee);
    const [oldDeviceId,setOldDeviceId] = useRecoilState(olddeviceid);
    const [audiostream, setAudiostream] = React.useState();
    const initialrender = React.useRef();



// Device getting
useEffect(() => {
    console.log('devicegetting is working fine');
  
  
  navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    console.log('all devices',devices);
  devices.forEach(function(device) {
    console.log('all devices',device.kind + ": " + device.label +
                " id = " + device.deviceId);
  
                var label = device.label;
  
                
                if(!label || label === "")
                    label = device.label;
                    // console.log(device);
                var option = $('<option value="' + device.deviceId + '">' + label + '</option>');
                if(device.kind === 'audioinput') {
                    $('#audio-devicee').append(option);
                    $('#audio-devicee').val(audiodeviceexport);
                } else if(device.kind === 'videoinput') {
                    $('#video-devicee').append(option);
                    $('#video-devicee').val(videodeviceexport);
                }
                
  
            });
            
  
          console.log('get user media');
            navigator.mediaDevices.getUserMedia({video : true})
            .then(function(stream) {
  
            stream.getTracks()
                .map( (track) => {
                setVideodevice(track.getSettings().deviceId);
                console.log(track.getSettings().deviceId)
                
                track.stop()
                setSettingspreloader(false);
                })
            })
            .catch(function(err) {
                console.log(err);
            });
  
            // var canvas = document.getElementById('audioequilizer');
  
            // navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
            //   getUserMedia: function (c) {
            //     return new Promise(function (y, n) {
            //       (navigator.mozGetUserMedia ||
            //         navigator.webkitGetUserMedia).call(navigator, c, y, n);
            //     });
            //   }
            // } : null);
            
        navigator.mediaDevices.getUserMedia({audio : true})
        .then(function(stream) {
        /* use the stream */
        // setAudiostream(stream);
        var audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        try {
          var context = new audioContext();
      } 
      catch (e) {
          console.log('not support AudioContext');
        }
    
        try{
            function drawSpectrum(analyser) {
                console.log('unary',new Uint8Array(analyser.frequencyBinCount));
                var canvas = document.getElementById('audioequilizerr'),
                cwidth = canvas.width,
                cheight = canvas.height,
                meterWidth = 8,
                gap = 2,
                meterNum = cwidth / (meterWidth + gap),
            
                ctx = canvas.getContext('2d'),
                gradient = ctx.createLinearGradient(0, 0, 0, cheight);
                gradient.addColorStop(1, '#a467af');
                gradient.addColorStop(0.3, '#ff0');
                gradient.addColorStop(0, '#f00');
                canvas.style.display = 'block';
                ctx.fillStyle = gradient;
                var drawMeter = function () {
                  var array = new Uint8Array(analyser.frequencyBinCount);
                  analyser.getByteFrequencyData(array);
            
                  var step = Math.round(array.length / meterNum);
                  ctx.clearRect(0, 0, cwidth, cheight);
                  for (var i = 0; i < meterNum; i++) {
                    var value = array[i * step];
            
                    ctx.fillRect(i * (meterWidth + gap), cheight - value, meterWidth, cheight);
                  }
                  requestAnimationFrame(drawMeter);
                }
                requestAnimationFrame(drawMeter);
              }
    
    
        var audiostreamm = new MediaStream(stream.getAudioTracks());
        var audioInput = context.createMediaStreamSource(audiostreamm);
        var binaryData = [];
        binaryData.push(audiostreamm);
        var analyser = context.createAnalyser();
        audioInput.connect(analyser);
    
        drawSpectrum(analyser); 
    }
    catch (e) {
        console.log('unary error',e);
    }
    
        stream.getTracks()
            .map( (track) =>{ 
              console.log('olddevice id', olddeviceid)
              if(oldDeviceId){
                setAudiodevice(oldDeviceId);
              }
              else{
              setAudiodevice(track.getSettings().deviceId);
              setOldDeviceId(track.getSettings().deviceId);
            }
            })
        })
        .catch(function(err) {
          console.log(err);
        });
  })
  .catch(function(err) {
  console.log(err.name + ": " + err.message);
  });
  
  
  },[]);
  
  
  
      
  useEffect(() => {

    if(initialrender.current){

    } 
    else{
    navigator.mediaDevices.getUserMedia({audio : { deviceId: audiodevice }})
    .then(function(stream) {
    /* use the stream */
  
    console.log('new stream');
    
    audiostream.getTracks().forEach((track) => {
        console.log('old stream stopped',track);
        track.stop();
      });
  
    // setAudiostream(stream);
    console.log(stream);
  
    var audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    try {
      var context = new audioContext();
    } catch (e) {
      console.log('not support AudioContext');
    }
  
    try{
        function drawSpectrum(analyser) {
            console.log(new Uint8Array(analyser.frequencyBinCount));
            var canvas = document.getElementById('audioequilizer'),
            cwidth = canvas.width,
            cheight = canvas.height,
            meterWidth = 8,
            gap = 2,
            meterNum = cwidth / (meterWidth + gap),
        
            ctx = canvas.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, cheight);
            gradient.addColorStop(1, '#a467af');
            gradient.addColorStop(0.3, '#ff0');
            gradient.addColorStop(0, '#f00');
            canvas.style.display = 'block';
            ctx.fillStyle = gradient;
            var drawMeter = function () {
              var array = new Uint8Array(analyser.frequencyBinCount);
              analyser.getByteFrequencyData(array);
        
              var step = Math.round(array.length / meterNum);
              ctx.clearRect(0, 0, cwidth, cheight);
              for (var i = 0; i < meterNum; i++) {
                var value = array[i * step];
        
                ctx.fillRect(i * (meterWidth + gap), cheight - value, meterWidth, cheight);
              }
              requestAnimationFrame(drawMeter);
            }
            requestAnimationFrame(drawMeter);
          }
  
  
    var audiostreamm = new MediaStream(stream.getAudioTracks());
    var audioInput = context.createMediaStreamSource(audiostreamm);
    var binaryData = [];
    binaryData.push(audiostreamm);
    var analyser = context.createAnalyser();
    audioInput.connect(analyser);
  
    drawSpectrum(analyser); 
  }
  catch (e) {
    console.log(e);
  }
  
    stream.getTracks()
        .map( (track) => {console.log(track.getSettings().deviceId,track)})
    })
    .catch(function(err) {
    });
}
  },[audiodevice])
  



  useEffect(() => {
    sessionStorage.setItem('audiodevice',audiodevice);
    sessionStorage.setItem('videodevice',videodevice);
  
    navigator.mediaDevices.getUserMedia({audio : { deviceId: oldDeviceId }})
      .then(function(stream) {
        console.log('new device changed to old',oldDeviceId);
        stream.getTracks().forEach((track) => {
          console.log('old stream stopped');
          console.log('new device id',track.getSettings());
          track.stop();
        });
      });
        
    setOldDeviceId(audiodevice);
  },[audiodevice,videodevice])

    return <>
    <Typography style={{color:'white'}}>Audio Source</Typography>
      <select  className='dropdownhome' id="audio-devicee" value={audiodevice} onChange={(e) => {setAudiodevice(e.target.value)}}>
      </select>
    
    <br/>

      <Typography style={{color:'white'}}>video Source</Typography>
      <select  className='dropdownhome' id="video-devicee" value={videodevice} onChange={(e) => {setVideodevice(e.target.value)}}>
      </select>

      <canvas id="audioequilizerr" width="150" height="30"></canvas>

    </>
}

export default Audiovideo;