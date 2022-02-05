import React,{useEffect, useState,useRef} from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import 'block-ui'
import 'bootstrap'

import $ from "jquery";
import "../../styles/startJanusServerRoom.css";

import {audiodeviceexport,videodeviceexport} from './StartJanusServerRoom';
import 'react-toastify/dist/ReactToastify.min.css';
import { audiodevicee, olddeviceid, opendialogg, settingspreload, videodevicee } from "../../atoms/chatatoms";


const Devicegetting =() => {

    const [opendialog,setOpendialog] = useRecoilState(opendialogg);
    const [settingspreloader,setSettingspreloader] = useRecoilState(settingspreload);
    
	const [audiodevice, setAudiodevice] = useRecoilState(audiodevicee);
	const [videodevice, setVideodevice] = useRecoilState(videodevicee);

    const [oldDeviceId,setOldDeviceId] = useRecoilState(olddeviceid);


    const [audiostream, setAudiostream] = React.useState();
    // const [audiostream, setAudiostream] = useRecoilState(audiostream1);

    const firstRender = useRef(true);

    useEffect(() => {
        if(firstRender.current){
            firstRender.current = false;
        } 
    else{
        console.log('devicegetting is working fine');
// var server = null;
//         // server = "wss://vc.sg1.5am5pm.com:8989";
//     server = 'wss://janusone.nowdigitaleasy.com:8989';
    
//     var janus = null;
//     var echotest = null;
//     var opaqueId = "devicetest-"+Janus.randomString(12);
    
//     var localTracks = {}, localVideos = 0,
//         remoteTracks = {}, remoteVideos = 0;
//     var bitrateTimer = null;
//     var spinner = null;
    
//     var audioDeviceId = null;
//     var videoDeviceId = null;
//      var audio;
//      var video;
       
    // var acodec = (getQueryStringValue("acodec") !== "" ? getQueryStringValue("acodec") : null);
    // var vcodec = (getQueryStringValue("vcodec") !== "" ? getQueryStringValue("vcodec") : null);
    // var vprofile = (getQueryStringValue("vprofile") !== "" ? getQueryStringValue("vprofile") : null);
    // var simulcastStarted = false;
    



    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
        console.log('all devices',devices);
      devices.forEach(function(device) {
        console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
    
                    var label = device.label;

                    
                    if(!label || label === "")
                        label = device.label;
                        // console.log(device);
                    var option = $('<option value="' + device.deviceId + '">' + label + '</option>');
                    if(device.kind === 'audioinput') {
                        $('#audio-device').append(option);
                        $('#audio-device').val(audiodeviceexport);
                    } else if(device.kind === 'videoinput') {
                        $('#video-device').append(option);
                        $('#video-device').val(videodeviceexport);
                    }
                    
                    if(opendialog){


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
                        });

                    navigator.mediaDevices.getUserMedia({audio : true})
                    .then(function(stream) {
                    /* use the stream */
                    setAudiostream(stream);
					

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
                
                
                    var audiostream = new MediaStream(stream.getAudioTracks());
                    var audioInput = context.createMediaStreamSource(audiostream);
                    var binaryData = [];
                    binaryData.push(audiostream);
                    var analyser = context.createAnalyser();
                    audioInput.connect(analyser);
                
                    drawSpectrum(analyser);
                
                
                  
                }
                catch (e) {
                    console.log(e);
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
                    });
                }
                else{
                    // console.log('opendialog running',opendialog,audiostream);
                    if(!opendialog && audiostream){
                        audiostream.getTracks().forEach((track) => {
                            track.stop();
                            console.log('opendialog running',track);
                          });
                    }
                }
                });
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });



    // Helper method to prepare a UI selection of the available devices
    // function initDevices(devices) {
    //     $('#devices').removeClass('hide');
    //     $('#devices').parent().removeClass('hide');
    //     $('#choose-device').click(restartCapture);
    //     $('#audio-device, #video-device').find('option').remove();
    //     console.log(devices)
    
    //     devices.forEach(function(device) {
            
    //         var label = device.label;

    //         setSettingspreloader(false);
            
    //         if(!label || label === "")
    //             label = device.label;
    //             // console.log(device);
    //         var option = $('<option value="' + device.deviceId + '">' + label + '</option>');
    //         if(device.kind === 'audioinput') {
    //             $('#audio-device').append(option);
    //             $('#audio-device').val(audiodeviceexport);
    //         } else if(device.kind === 'videoinput') {
    //             $('#video-device').append(option);
    //             $('#video-device').val(videodeviceexport);

    //         } else if(device.kind === 'audiooutput') {
    //             // $('#audiooutput').append('<li><a href="#" id="' + device.deviceId + '">' + label + '</a></li>');
    //             $('#audiooutput').append('<option value="' + device.deviceId + '">' + label + '</option>');
    //             $('#audiooutput a').unbind('click')
    //                 .click(function() {
    //                     var deviceId = $(this).attr("id");
    //                     var label = $(this).text();
    //                     Janus.log("Trying to set device " + deviceId + " (" + label + ") as sink for the output");
    //                     if($('#peervideo').length === 0) {
    //                         Janus.error("No remote video element available");
    //                         bootbox.alert("No remote video element available");
    //                         return false;
    //                     }
    //                     if(!$('#peervideo').get(0).setSinkId) {
    //                         Janus.error("SetSinkId not supported");
    //                         bootbox.warn("SetSinkId not supported");
    //                         return false;
    //                     }
    //                     $('#peervideo').get(0).setSinkId(deviceId)
    //                         .then(function() {
    //                             Janus.log('Audio output device attached:', deviceId);
    //                             $('#outputdeviceset').html(label + '<span class="caret"></span>').parent().removeClass('open');
    //                         }).catch(function(error) {
    //                             Janus.error(error);
    //                             bootbox.alert(error);
    //                         });
    //                     return false;
    //                 });
    //         }
    //     });
    
    //     $('#audio-device').val(audiodeviceexport);
    //     $('#video-device').val(videodeviceexport);
    
    //     $('#change-devices').click(function() {
    //         // A different device has been selected: hangup the session, and set it up again
    //         $('#audio-device, #video-device').attr('disabled', true);
    //         $('#change-devices').attr('disabled', true);
    //         restartCapture();
    //     });
    // }
    
    // $('#renegotiate').click(()=>{
    //     // alert('clicked');
    //     restartCapture();
    // });

    // function restartCapture() {
    //     // Negotiate WebRTC
    //     var body = { audio: true, video: true };

    //     if(acodec)
    //         body["audiocodec"] = acodec;
    //     if(vcodec)
    //         body["videocodec"] = vcodec;
    //     if(vprofile)
    //         body["videoprofile"] = vprofile;
    //     Janus.debug("Sending message:", body);
    //     echotest.send({ message: body });
    //     Janus.debug("Trying a createOffer too (audio/video sendrecv)");
    //     var replaceAudio = $('#audio-device').val() !== audioDeviceId;
    //     audioDeviceId = $('#audio-device').val();
    //     var replaceVideo = $('#video-device').val() !== videoDeviceId;
    //     videoDeviceId = $('#video-device').val();
        
    //     echotest.createOffer(
    //         {
    //             // We provide a specific device ID for both audio and video
    //             media: {
    //                 audio: {
    //                     deviceId: {
    //                         exact: audioDeviceId
    //                     }
    //                 },
    //                 replaceAudio: replaceAudio,	// This is only needed in case of a renegotiation
    //                 video: {
    //                     deviceId: {
    //                         exact: videoDeviceId
    //                     }
    //                 },
    //                 replaceVideo: replaceVideo,	// This is only needed in case of a renegotiation
    //                 data: true	// Let's negotiate data channels as well
    //             },
    //               success: function(jsep) {
    //                 Janus.debug("Got SDP!", jsep);
    //                 echotest.send({ message: body, jsep: jsep });
    //                 alert('sucess');
    //             },
    //             error: function(error) {
    //                 Janus.error("WebRTC error:", error);
    //                 bootbox.alert("WebRTC error... " + error.message);
    //             }
    //         });
    // }
    
    // $(document).ready(function() {
    //     // Initialize the library (all console debuggers enabled)
    //     Janus.init({debug: "all", callback: function() {
    //             $(this).attr('disabled', true).unbind('click');
    //             // Make sure the browser supports WebRTC
    //             if(!Janus.isWebrtcSupported()) {
    //                 bootbox.alert("No WebRTC support... ");
    //                 return;
    //             }
    //             createsession();
    //     }});
    // });
    

    // function createsession()
    // {
    //     // Create session
    //     janus = new Janus(
    //         {
    //             server: server,
            
    //             success: function() {
    //                 // Attach to EchoTest plugin
    //                 janus.attach(
    //                     {
    //                         plugin: "janus.plugin.echotest",
    //                         opaqueId: opaqueId,
    //                         success: function(pluginHandle) {
    //                             echotest = pluginHandle;
    //                             Janus.log("Plugin attached! (" + echotest.getPlugin() + ", id=" + echotest.getId() + ")");
    //                             // Enumerate devices: that's what we're here for
    //                             Janus.listDevices(initDevices);
    //                             // We wait for the user to select the first device before making a move
    //                             $('#start').removeAttr('disabled').html("Stop")
    //                                 .click(function() {
    //                                     $(this).attr('disabled', true);
    //                                     if(bitrateTimer)
    //                                         clearInterval(bitrateTimer);
    //                                     bitrateTimer = null;
    //                                     janus.destroy();
    //                                 });
    //                         },
    //                         error: function(error) {
    //                             console.error("  -- Error attaching plugin...", error);
    //                             bootbox.alert("Error attaching plugin... " + error);
    //                         },
    //                         consentDialog: function(on) {
    //                             Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
    //                             if(on) {
    //                                 // Darken screen and show hint
                                  
    //                             } else {
    //                                 // Restore screen
    //                                 $.unblockUI();
    //                             }
    //                         },
    //                         iceState: function(state) {
    //                             Janus.log("ICE state changed to " + state);
    //                         },
    //                         mediaState: function(medium, mid, on) {
    //                             Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium + " (mid=" + mid + ")");
    //                         },
    //                         webrtcState: function(on) {
    //                             Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
    //                             $("#videoleft").parent().unblock();
    //                         },
    //                         slowLink: function(uplink, lost, mid) {
    //                             Janus.warn("Janus reports problems " + (uplink ? "sending" : "receiving") +
    //                                 " packets on mid " + mid + " (" + lost + " lost packets)");
    //                         },
    //                         onmessage: function(msg, jsep) {
    //                             Janus.debug(" ::: Got a message :::", msg);
    //                             if(jsep) {
    //                                 Janus.debug("Handling SDP as well...", jsep);
    //                                 echotest.handleRemoteJsep({ jsep: jsep });
    //                             }
    //                             var result = msg["result"];
    //                             if(result) {
    //                                 if(result === "done") {
    //                                     // The plugin closed the echo test
    //                                     bootbox.alert("The Echo Test is over");
    //                                     if(spinner)
    //                                         spinner.stop();
    //                                     spinner = null;
    //                                     return;
    //                                 }
    //                                 // Any loss?
    //                                 var status = result["status"];
    //                                 if(status === "slow_link") {
    //                                     alert("Janus apparently missed many packets we sent, maybe we should reduce the bitrate", "Packet loss?", {timeOut: 2000});
    //                                 }
    //                             }
    //                             // Is simulcast in place?
    //                             var substream = msg["substream"];
    //                             var temporal = msg["temporal"];
    //                             if((substream !== null && substream !== undefined) || (temporal !== null && temporal !== undefined)) {
    //                                 if(!simulcastStarted) {
    //                                     simulcastStarted = true;
    //                                     // addSimulcastButtons(msg["videocodec"] === "vp8" || msg["videocodec"] === "h264");
    //                                 }
    //                                 // We just received notice that there's been a switch, update the buttons
    //                                 // updateSimulcastButtons(substream, temporal);
    //                             }
    //                         },
    //                         onlocaltrack: function(track, on) {
                                
    //                         },
    //                         onremotetrack: function(track, mid, on) {
    //                           },
    //                         oncleanup: function() {
    //                             Janus.log(" ::: Got a cleanup notification :::");
    //                             if(spinner)
    //                                 spinner.stop();
    //                           $('#outputdeviceset').html('Output device<span class="caret"></span>');
    //                           }
    //                     });
    //             },
    //             error: function(error) {
    //                 Janus.error(error);
    //                 alert(error, function() {
    //                     window.location.reload();
    //                 });
    //             },
    //             destroyed: function() {
    //                 window.location.reload();
    //             }
    //         // });
    // });
    // }   
    
    // // Helper to parse query string
    // function getQueryStringValue(name) {
    //     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    //     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
    //     return '';
    // }
}
},[opendialog]);
    
useEffect(() => {
    if(opendialog)
    {
    navigator.mediaDevices.getUserMedia({audio : { deviceId: audiodevice }})
    .then(function(stream) {
    /* use the stream */

    console.log('new stream');
    
    audiostream.getTracks().forEach((track) => {
        console.log('old stream stopped',track);
        track.stop();
      });

    setAudiostream(stream);
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

return <></>    
}


Devicegetting.propTypes = {};

export default Devicegetting;