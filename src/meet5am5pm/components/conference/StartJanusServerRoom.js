import Janus,{mute} from '../../janus/Janus'
import $ from 'jquery';
import { useEffect } from 'react';
import {layoutforjs} from '../conference/ConferenceLayout'
import React,{useRef,useState} from 'react'
import { audiodevicee, audioo,audiooutputdevicee, bandwidthh, camerachangee, ismutedd, chatopenn, disablee, handrise, opendialogg, publisherr, renderr, screensharee, videodevicee, videoo, videoresolutionn, overflowcheckk, swiperreff, leftbuttonn, Rightbuttonn } from '../../atoms/chatatoms';	
import { useRecoilState, useSetRecoilState } from 'recoil';
import {  namee, namejoinn, profilee, rolee } from '../../atoms/atoms';
import bootbox from 'bootbox';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { propTypes } from 'react-bootstrap/esm/Image';
import { layout } from '../../atoms/conference';


export const swipersliderarr = [];
export var audiodeviceexport,videodeviceexport;
const queryParams = new URLSearchParams(window.location.search);
  const room = queryParams.get("room");
const roomid = room,
// server = 'wss://vc.sg1.5am5pm.com:8989',
server = 'wss://janusone.nowdigitaleasy.com:8989',
type = 'publisher';
var janus;
var spinner;
var myroom;
var usertype;
var serverurl;
var sfutest;
var myid;
var mypvtid;
let remoteFeed;
export let videoremote1;
let screentest;
var role = null;
var source;
var localVideos,localTracks;
var remoteTracks;
var remoteVideos;
var mystream;
var username;
let feeds = [];
let opaqueId = "videoroom-" + Janus.randomString(12);
var capture = null;
var Backdropopen = true;
var list;
var msgg
var myusername;
var pin = "12345";
var secret= "12345" 
let localhandle = {
	connection :'',
	session_id :'',
}

let roomexist = 
	{
        "videoroom" : "exists",
        "room" : myroom
}

function getQueryStringValue(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(window.location.search);
		console.log('querystringresults',name,results);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Setreo
var doSimulcast =  (getQueryStringValue("simulcast")  === "yes" || getQueryStringValue("simulcast")  === "true");
var doSimulcast2 = (getQueryStringValue("simulcast2") === "yes" || getQueryStringValue("simulcast2") === "true");
// var doDtx = (getQueryStringValue("dtx") === "yes" || getQueryStringValue("dtx") === "true");
var doDtx = true;
var subscriber_mode = (getQueryStringValue("subscriber-mode") === "yes" || getQueryStringValue("subscriber-mode") === "true");

function StartJanusServerRoom(props)
{ 
    const [open,setopen] = useState(true);
    const [name,setName] = useRecoilState(namejoinn);
    const [audio,setaudio] = useRecoilState(audioo);
    const [camerachange,setCamerachange] = useRecoilState(camerachangee);
    const [video,setvideo] = useRecoilState(videoo);
    const [videoresolution,setVideoresolution] = useRecoilState(videoresolutionn);
    const [isScreenShareOn,setIsScreenShareOn] = useRecoilState(screensharee);
    const [ismuted,setIsMuted] = useRecoilState(ismutedd);
	const [mybandwidth,setMybandwidth] = React.useState();
    const initialRender = useRef(true);
    const screensharetest = useRef(true);



	const [overflowcheck,setOverflow] = useRecoilState(overflowcheckk);
	
	const [audiodevice, setAudiodevice] = useRecoilState(audiodevicee);
	const [videodevice, setVideodevice] = useRecoilState(videodevicee);
	const [bandwidth, setBandwidth] = useRecoilState(bandwidthh);
	const [profile, setprofile] = useRecoilState(profilee);

	const [role, setRole] = useRecoilState(rolee);

	const [disable, setDisable] = useRecoilState(disablee);

	//Swiper 
	const [swiperRef, setSwiperRef] = useRecoilState(swiperreff);
	
	
	//overflow 
	const [leftbutton,setLeftButton] = useRecoilState(leftbuttonn)
	const [Rightbutton,setRightButton] = useState(Rightbuttonn);
	const [layoutt,setlayout] = useRecoilState(layout);

		const screenshare = () =>
		{
		
		// const server = "wss://vc.sg1.5am5pm.com:8989";
		const server = 'wss://janusone.nowdigitaleasy.com:8989';
		
		
		var janus = null;
		var opaqueId = "screensharingtest-"+Janus.randomString(12);
		
		var msgg = null;
		var myid = null;
		
		var capture = null;
		var role = null;
		var room = null;
		var source = null;
		
		var localTracks = {}, localVideos = 0,
			remoteTracks = {}, remoteVideos = 0;
		var spinner = null;
		
		// Just an helper to generate random usernames
		function randomString(len, charSet) {
			charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			var randomString = '';
			for (var i = 0; i < len; i++) {
				var randomPoz = Math.floor(Math.random() * charSet.length);
				randomString += charSet.substring(randomPoz,randomPoz+1);
			}
			return randomString;
		}
		
		
		$(document).ready(function() {
			// Initialize the library (all console debuggers enabled)
			Janus.init({debug: "all", callback: function() {
				// Use a button to start the demo
				// $('#start').one('click', function() {
					$(this).attr('disabled', true).unbind('click');
					// Make sure the browser supports WebRTC
					if(!Janus.isWebrtcSupported()) {
						bootbox.alert("No WebRTC support... ");
						return;
					}
					createhandle();
				// });
			}});
		});
		
		
		function createhandle()
		{
					// Create handle
					janus = new Janus(
						{
							server: server,
							success: function() {
								// Attach to VideoRoom plugin
								janus.attach(
									{
										plugin: "janus.plugin.videoroom",
										opaqueId: opaqueId,
										success: function(pluginHandle) {
											$('#details').remove();
											screentest = pluginHandle;
											console.log('handle for video room');
											Janus.log("Plugin attached! (" + screentest.getPlugin() + ", id=" + screentest.getId() + ")");
											// Prepare the username registration
											$('#screen-share').click(preShareScreen);
											$('#start').removeAttr('disabled').html("Stop")
												.click(function() {
													$(this).attr('disabled', true);
													janus.destroy();
												});
										},
										error: function(error) {
											Janus.error("  -- Error attaching plugin...", error);
											bootbox.alert("Error attaching plugin... " + error);
										},
										consentDialog: function(on) {
											Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
											if(on) {
												// Darken screen
												$.blockUI({
													message: '',
													css: {
														border: 'none',
														padding: '15px',
														backgroundColor: 'transparent',
														color: '#aaa'
													} });
											} else {
												// Restore screen
												$.unblockUI();
											}
										},
										iceState: function(state) {
											Janus.log("ICE state changed to " + state);
										},
										mediaState: function(medium, mid, on) {
											console.log("janus",screensharetest);
											if(!screensharetest.current){
												setIsScreenShareOn(false);
											}
											screensharetest.current = false;
											Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium + " (mid=" + mid + ")");
										},
										webrtcState: function(on) {
											Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
											$("#screencapture").parent().parent().unblock();
											if(on) {
												// bootbox.alert("Your screen sharing session just started: pass the <b>" + room + "</b> session identifier to those who want to attend.");
											} else {
												console.log("Your screen sharing session just stopped.", function() {
													janus.destroy();
													window.location.reload();
												});
											}
										},
										slowLink: function(uplink, lost, mid) {
											Janus.warn("Janus reports problems " + (uplink ? "sending" : "receiving") +
												" packets on mid " + mid + " (" + lost + " lost packets)");
										},
										onmessage: function(msg, jsep) {
											Janus.debug(" ::: Got a message (publisher) :::", msg);
											var event = msg["videoroom"];
											Janus.debug("Event: " + event);
											if(event) {
												if(event === "joined") {
													myid = msg["id"];
													$('#session').html(room);
													$('#title').html(msg["description"]);
		
													
		
													Janus.log("Successfully joined room " + msg["room"] + " with ID " + myid);
													if(role === "publisher") {
														// This is our session, publish our stream
														Janus.debug("Negotiating WebRTC stream for our screen (capture " + capture + ")");
														// Safari expects a user gesture to share the screen: see issue #2455
														if(Janus.webRTCAdapter.browserDetails.browser === "safari") {
															bootbox.alert("Safari requires a user gesture before the screen can be shared: close this dialog to do that. See issue #2455 for more details", function() {
																screentest.createOffer(
																	{
																		media: { video: capture, audioSend: true, videoRecv: false,audioRecv: false},	// Screen sharing Publishers are sendonly
																		success: function(jsep) {
																			Janus.debug("Got publisher SDP!", jsep);
																			var publish = { request: "configure", audio: true, video: true };
																			screentest.send({ message: publish, jsep: jsep });
																		},
																		error: function(error) {
																			Janus.error("WebRTC error:", error);
																			bootbox.alert("WebRTC error... " + error.message);
																		}
																	});
															});
														} else {
															// Other browsers should be fine, we try to call getDisplayMedia directly
															screentest.createOffer(
																{
																	media: { video: capture, audioSend: false, videoRecv: false},	// Screen sharing Publishers are sendonly
																	success: function(jsep) {
																		Janus.debug("Got publisher SDP!", jsep);
																		var publish = { request: "configure", audio: false, video: true };
																		screentest.send({ message: publish, jsep: jsep });
																	},
																	error: function(error) {
																		Janus.error("WebRTC error:", error);
																		alert("WebRTC error... " + error.message);
																		setIsScreenShareOn(false);
																	}
																});
														}
													} else {
														// We're just watching a session, any feed to attach to?
														if(msg["publishers"]) {
															var list = msg["publishers"];
															Janus.debug("Got a list of available publishers/feeds:", list);
															for(var f in list) {
																var id = list[f]["id"];
																var display = list[f]["display"];
																Janus.debug("  >> [" + id + "] " + display);
																// newRemoteFeed(id, display)
															}
														}
													}
												} else if(event === "event") {
													// Any feed to attach to?
													if(role === "listener" && msg["publishers"]) {
														var list = msg["publishers"];
														Janus.debug("Got a list of available publishers/feeds:", list);
														for(var f in list) {
															var id = list[f]["id"];
															var display = list[f]["display"];
															Janus.debug("  >> [" + id + "] " + display);
															// newRemoteFeed(id, display)
														}
													} else if(msg["leaving"]) {
														// One of the publishers has gone away?
														var leaving = msg["leaving"];
														Janus.log("Publisher left: " + leaving);
														if(role === "listener" && msg["leaving"] === source) {
															bootbox.alert("The screen sharing session is over, the publisher left", function() {
																window.location.reload();
															});
														}
													} else if(msg["error"]) {
														// alert(msg["error"]);
													}
												}
											}
											if(jsep) {
												Janus.debug("Handling SDP as well...", jsep);
												screentest.handleRemoteJsep({ jsep: jsep });
											}
										},
										// onlocaltrack: function(track, on) {
										// },
										// onremotetrack: function(track, mid, on) {
										// 	// The publisher stream is sendonly, we don't expect anything here
										// },
										oncleanup: function() {
											Janus.log(" ::: Got a cleanup notification :::");
											$('#screencapture').empty();
											$("#screencapture").parent().unblock();
											$('#room').hide();
											localTracks = {};
											localVideos = 0;
										}
									});
							},
							error: function(error) {
								Janus.error(error);
								alert(error, function() {
									window.location.reload();
								});
							},
							destroyed: function() {
								window.location.reload();
							}
						});
		}
		
		function preShareScreen() {
			if(!Janus.isExtensionEnabled()) {
				bootbox.alert("You're using Chrome but don't have the screensharing extension installed: click <b><a href='https://chrome.google.com/webstore/detail/janus-webrtc-screensharin/hapfgfdkleiggjjpfpenajgdnfckjpaj' target='_blank'>here</a></b> to do so", function() {
					window.location.reload();
				});
				return;
			}
			capture = "screen";
			if(navigator.mozGetUserMedia) {
				// Firefox needs a different constraint for screen and window sharing
				bootbox.dialog({
					title: "Share whole screen or a window?",
					message: "Firefox handles screensharing in a different way: are you going to share the whole screen, or would you rather pick a single window/application to share instead?",
					buttons: {
						screen: {
							label: "Sharescreen",
							className: "btn-primary",
							callback: function() {
								capture = "screen";
								shareScreen();
							}
						},
						window: {
							label: "Pick a window",
							className: "btn-success",
							callback: function() {
								capture = "window";
								shareScreen();
							}
						}
					},
					onEscape: function() {
					}
				});
			} else {
				shareScreen();
			}
		}
		
		function shareScreen() {
			// Create a new room
			var desc = $('#desc').val();
			role = "publisher";
			var create = {
				request: "create",
				description: desc,
				bitrate: 500000,
				publishers: 1,
				admin_key: "don't_abuse_the_demo_server"
				};
				screentest.send({ message: create, success: function(result) {
					var event = result["videoroom"];
					Janus.debug("Event: " + event);
					if(event) {
						// Our own screen sharing session has been created, join it
						room = result["room"];
						Janus.log("Screen sharing session created: " + room);
						myusername = randomString(12);
						var register = {
							request: "join",
							room: myroom,
							pin : pin,
							ptype: "publisher",
							display: 'screenshare ' + username +" " + profile,
							record:true,
							rec_dir:'/var/www/vhost/janusone.nowdigitaleasy.com/recordings'
						};
						screentest.send({ message: register });
		
					}
				}});
			}
		}
		

// ============================================================ Video conference plugin ============================================================


	

	useEffect(() => {

		let audiop = sessionStorage.getItem('audio');
		let videop = sessionStorage.getItem('video');
	
		console.log('audio',audiop,videop);
	
		if(audiop == 'true'){
		  setaudio(true);
		}
		if(videop == 'true')
		{
			setvideo(true);
		}   
	  
	   },[])
	

	username = name;
	// Video room
	function createconnection(roomid, serverurl, type) {
		myroom = roomid;
		usertype = type;
		serverurl = server;
		if (server !== null) {
			createsession();
		}
	}
	
	
	
	
	
	function createsession() {
	
		Janus.init({
			debug: true,
			// dependencies: Janus.useDefaultDependencies(), // or: Janus.useOldDependencies() to get the behaviour of previous Janus versions
			callback: function() {
					// Done!
			}
		 });
	
		janus = new Janus({
			server: server,
			success: function (jsep) {
				localhandle.connection = janus.isConnected();
				localhandle.session_id = janus.getSessionId();
				console.log(janus);
				createhandle(janus);
			},
			error: function (error) {
				localhandle.connection = false;
				reconnect(janus);
				console.log(error);
				setopen(true);
				console.log("janus error");
			},
			destroyed: function () {
				console.log("destroyed");
			}
		})
	}
	
	function reconnect(janusInstance) {
		janusInstance.reconnect();
	}
	
	
	function createhandle(janusInstance) {
		if (janusInstance == janus) {
			janusInstance.attach({
				plugin: "janus.plugin.videoroom",
				success: function (pluginHandle) {
					sfutest = pluginHandle;
					console.log(pluginHandle);
					
					var roomexixts = {
						"request" : "exists",
						"room" : myroom
					}

					pluginHandle.send({
						message: roomexixts,
					success: function (jsep) {
						console.log('Room exits',jsep);
						


						if(jsep.exists)
						{
							joinroom();
						}
						else{
							createroom();
						}

						setopen(false);
					}
					});
					
				},
				error: function (error) { 
					console.log('Error:'+error)
				},
				onmessage: function (msg, jsep) {
					// processmessage(msg, jsep);
					// console.log('msg', msg, 'jsep' , jsep);

					Janus.debug("::: Got a message (publisher) :::");
                    Janus.debug(msg);


                    let event = msg["videoroom"];
                    Janus.debug("Event: " + event);
                    // console.log("Event ", msg);
                    console.log('message outside ', msg);
                    if (event != undefined && event != null) {
                        if (event === "joined") {
							if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
                                console.log('new publishers!')
                                let list = msg["publishers"];
								enable_recording(jsep);

								publishOwnFeed(true);

                            }
                            else if(event === "create"){
                            console.log("inside create  event")
                            }
                            else if (msg["leaving"] !== undefined && msg["leaving"] !== null) {
                                // One of the publishers has gone away?
                            } else if (msg["unpublished"] !== undefined && msg["unpublished"] !== null) {
                                // One of the publishers has unpublished?
                                if (msg["unpublished"] === 'ok') {
                                    sfutest.hangup();
                                    return;
                                }
                            } else if (msg["error"] !== undefined && msg["error"] !== null) {
                                if (msg["error_code"] === 426) {
                                    // This is a "no such room" error: give a more meaningful description
                                }
                                else {
                                    alert(msg["error"]);
                                }
                            }
                        }
                    }
                    if (jsep !== undefined && jsep !== null) {
                        Janus.debug("Got room event. Handling SDP as well...");
                        Janus.debug(jsep);
                        sfutest.handleRemoteJsep({ jsep: jsep });
                        // Check if any of the media we wanted to publish has
                        // been rejected (e.g., wrong or unsupported codec)
                        let audiocod = msg["audio_codec"];
                        if (mystream && mystream.getAudioTracks() && mystream.getAudioTracks().length > 0 && !audiocod) {
                            // Audio has been rejected
                            alert("Our audio stream has been rejected, viewers won't hear us");
                        }
                        let videocod = msg["video_codec"];
                        if (mystream && mystream.getVideoTracks() && mystream.getVideoTracks().length > 0 && !videocod) {
                            // Video has been rejected
                            alert("Our video stream has been rejected, viewers won't see us");
                            // Hide the webcam video
                            $('#myvideo').hide();
                            $('#videolocal').append(
                                '<div class="no-video-container">' +
                                '<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
                                '<span class="no-video-text" style="font-size: 16px;">Video rejected, no webcam</span>' +
                                '</div>');
                        }
                    }

							newfeedattach(msg);
							msgg =  msg;
					console.log('message on new feed',msg);
				},
				onremotestream: function (stream) { },
				oncleanup: function () {
					console.log("::: Got a cleanup notification :::");
				},
				iceState: function (state) {
					Janus.log("ICE state changed to " + state);
				},
				mediaState: function (medium, mid, on) {
				
					Janus.log("Janus " + (on ? "stopped" : "started") + " receiving our " + medium + " (mid=" + mid + ")");
				},
				webrtcState: function (on) {
					Janus.log('webrtc'+ (on ? 'up' : 'down') +'now');
				},
				slowLink: function (uplink, lost, mid) {
					Janus.warn("Janus reports problems " + (uplink ? "sending" : "receiving") +
					" packets on mid " + mid + " (" + lost + " lost packets)");
				},
				onlocaltrack: function (track, on) {
	
				},
				onlocalstream: function (stream) {
                    console.log(" ::: Got a local stream :::", stream);
                    mystream = stream;
					console.log('mystream',mystream);
                    document.getElementById('yourvideo').style.display = 'block';

				// 	$('#layoutVisitor').append('<div width="300" height="230" class = "swiper-slide" id ="yourvideo" >'+
				// 	'<video width="300" height="230" id="localvideo" className="yourvideocolumn" autoPlay muted="muted" playsinline />'+
				// 	"<p id='myrole' style={{color:'white',display:'none'}}>You</p>"+
				// '</div>');
                    const video = document.querySelector('video#localvideo');
					const videoTracks = stream.getVideoTracks();
					if(stream.getAudioTracks()[0]) {
					}
				else if(audio){
					console.log('muted',stream.getAudioTracks()[0].muted);
					setIsMuted(true);
				}
					// video.style.backgroundImage = "url('/static/media/videobackground.66adbed0.png')"
					$('#yourvideo').append("<img id='backgroundimg' src='"+ profile +"'/>");
					console.log(mystream.getAudioTracks());
                    console.log(`Using video device: ${videoTracks[0]}`);
                    video.srcObject = stream;
					$('#myrole').css('display','block');
                },
				destroyed: function () {
					window.location.reload();
				}
	
			});
		}
	}

	
							
	// useEffect(() => {
	// 	var list =	{
	// 		"request" : "listparticipants",
	// 		"room" : myroom
	// 		}
	// 		if(sfutest){
	// 		sfutest.send({'message':list,success :function(created)
	// 		{
	// 				console.log("list api",created);
	// 				// joinroom();
	// 		}})
	// 	}
	// 	if(msgg["publishers"]){
	// 		console.log(msgg["publishers"]);
	// 	}
	// },[handrisee])

	
	function joinroom()
	{
		const register = { "request": "joinandconfigure", "room": myroom, "ptype": "publisher","record" : false,
		"rec_dir" : "/var/www/vhost/janusone.nowdigitaleasy.com/recordings" ,
		pin : pin,
		// "private_id" : pin,
		"secret" : secret,
		"display": role+" "+name + " "+profile};
					console.log("join register",register)
		sfutest.send({ "message": register });
	}

	function createroom()
	{
		var create = {
			request : "create",
			room : myroom,
			publishers: 100,
			// pin : pin,  "secret" : secret,
			record : false,
			rec_dir : '/var/www/vhosts/janusone.nowdigitaleasy.com/recordings' 
	}

	sfutest.send({'message' : create,success :function(created)
	{
			console.log("created",created);
			joinroom();
	}}
)
	}
	function newfeedattach(msg)
	{
	// Any new feed to attach to?
	if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
	list = msg["publishers"];
	console.log("Got a list of available publishers/feeds:");
	console.log("List",list);
	console.log("List length",list.length);
	for (let f in list) {
		let id = list[f]["id"];
		let display = list[f]["display"];
		let audio = list[f]["audio_codec"];
		let video = list[f]["video_codec"];

		newRemoteFeed(id, display, audio, video);
		 console.log("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
	}
}
	}

	function publishOwnFeed(useAudio) {
	
			let audioo = sessionStorage.getItem('audio');
			let videoo = sessionStorage.getItem('video');
		
			audioo = (audioo=='true') ? true : false;
			videoo = (videoo=='true') ? true : false;
		 
			console.log('audio',audioo,videoo);
	
		// sfutest.createOffer(
		// 	{
		// 		media: { audioRecv: false, videoRecv: false, audioSend:audioo, videoSend: videoo },	// Publishers are sendonly
		// 		success: function (jsep) {
		// 			Janus.debug("Got publisher SDP!", jsep);
		// 			var publish = { request: "configure", audio: audioo, video: videoo ,"record" : true,"res_dir" : '/var/www/vhost/janusone.nowdigitaleasy.com/recordings'};
					
		// 			sfutest.send({ message: publish, jsep: jsep });
		// 		},
		// 		error: function (error) {
		// 			Janus.error("WebRTC error:", error);
		// 			if (useAudio) {
		// 				publishOwnFeed(false);
		// 			} else {
		// 				alert("WebRTC error... " + error.message);
		// 				$('#publish').removeAttr('disabled').click(function () { publishOwnFeed(true); });
		// 			}
		// 		}
		// 	});



		sfutest.createOffer(
			{
				iceRestart: true,
				// Add data:true here if you want to publish datachannels as well
				media: { audioRecv: false, videoRecv: false, audioSend: audioo, videoSend: videoo },  // Publishers are sendonly
				// If you want to test simulcasting (Chrome and Firefox only), then
				// pass a ?simulcast=true when opening this demo page: it will turn
				// the following 'simulcast' property to pass to janus.js to true
				simulcast: doSimulcast,
				pin : pin,
				simulcast2: true,
				customizeSdp: function(jsep) {
					// If DTX is enabled, munge the SDP
					// console.log('stereo',doDtx)
					console.log('stereo',getQueryStringValue("dtx"))
					if(doDtx) {
						console.log('stereo',jsep.sdp
						.replace("useinbandfec=1", "useinbandfec=1;usedtx=1"),jsep.sdp)
						jsep.sdp = jsep.sdp
							.replace("useinbandfec=1", "useinbandfec=1;usedtx=1");
					}
				},
				success: function(jsep) {
					var publish = { request: "configure", audio: audioo, video: videoo , pin : pin , secret : secret };
					sfutest.send({ message: publish, jsep: jsep });
					Janus.debug("Got publisher SDP!", jsep);

			},
			error: function (error) {
							Janus.error("WebRTC error:", error);
							if(error.name == 'NotAllowedError'){
								setIsMuted(true);
							}
							setvideo(false);
							setaudio(false);
						}
		})
	}

	const newRemoteFeed = (id, display, audio, video) => {
		let remoteFeed = null;
		// A new feed has been published, create a new plugin handle and attach to it as a subscriber
				janus.attach(
					{
						plugin: "janus.plugin.videoroom",
						opaqueId: opaqueId,
						success: function (pluginHandle) {
							remoteFeed = pluginHandle;
							console.log("Plugin attached! (" + remoteFeed.getPlugin() + ", id=" + remoteFeed.getId() + ")");
							console.log("  -- This is a subscriber");
							let subscribe = {
								request: "join",
								room: myroom,
								ptype: "subscriber",
								feed: id,
								private_id: mypvtid
							};
							console.log("Subcriber",subscribe)
							remoteFeed.videoCodec = video;
							remoteFeed.send({ message: subscribe });
						},
						error: function (error) {
							Janus.error("-- Error attaching plugin...", error);
						},
						onmessage: function (msg, jsep) {
							Janus.debug(" ::: Got a message (subscriber) :::", msg);
							let event = msg["videoroom"];
							console.log("Event: " + event);
							
							if (event) {
								if (event === "attached") {
									console.log(`subscriber created and attached!`);
									// Subscriber created and attached
									for (let i = 1; i < 6; i++) {
										if (!feeds[i]) {
											feeds[i] = remoteFeed;
											remoteFeed.rfindex = i;
											break;
										}
									}
									remoteFeed.rfid = msg["id"];
									remoteFeed.rfdisplay = msg["display"];
									console.log(`attached`, remoteFeed)
									Janus.log("Successfully attached to feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") in room " + msg["room"]);
									const myArr = remoteFeed.rfdisplay.split(" ");
									if(myArr[1]){
									$('#layoutHost').append("<h4 id='remote"+remoteFeed.rfindex+"' class='videoownername'>"+myArr[1]+"</h4>");
									}
									console.log('videoremote',videoremote1,myArr[0]);
									if(!videoremote1) {
									if(myArr[0] === 'Staf' || myArr[0] === 'screenshare')
									{
										videoremote1 = "#videoremote"+remoteFeed.rfindex;
									}
								}
								else{
									console.log('videoremote',myArr[0]);
									if(myArr[0] === 'screenshare'){
									if(layoutforjs === 'whiteboard' || layoutforjs === 'gallery'){
										videoremote1 = "#videoremote"+remoteFeed.rfindex;
									}
									else{
									$(videoremote1).prependTo('#layoutVisitor');
									$(videoremote1).addClass('visitor');
									$(videoremote1).removeClass('largevideo');

									videoremote1 = "#videoremote"+remoteFeed.rfindex;

									$(videoremote1).prependTo('#layoutHost');
									$(videoremote1).addClass('largevideo');
									$(videoremote1).removeClass('visitor');
								}
								}
								}
								}}
							// }S
							if (jsep) {
								Janus.debug("Handling SDP as well...", jsep);
								
								var stereo = (jsep.sdp.indexOf("stereo=1") !== -1);
								// Answer and attach
								// remoteFeed.createAnswer(
								// 	{
								// 		jsep: jsep,
								// // Add data:true here if you want to subscribe to datachannels as well
								// // (obviously only works if the publisher offered them in the first place)
								// 		media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
								// 		success: function (jsep) {
								// 			console.log("Got SDP!", jsep);
								// 			let body = { request: "start", room: myroom };
								// 			remoteFeed.send({ message: body, jsep: jsep });
								// 		},
								// 		error: function (error) {
								// 			console.error("WebRTC error:", error);
								// 		}
								// 	});

						remoteFeed.createAnswer(
							{
								jsep: jsep,
								// Add data:true here if you want to subscribe to datachannels as well
								// (obviously only works if the publisher offered them in the first place)
								media: { audioSend: false, videoSend: false },  // We want recvonly audio/video
								customizeSdp: function(jsep) {
									if(stereo && jsep.sdp.indexOf("stereo=1") == -1) {
										// Make sure that our offer contains stereo too
										jsep.sdp = jsep.sdp.replace("useinbandfec=1", "useinbandfec=1;stereo=1");
									}
								},
								success: function(jsep) {
									Janus.debug("Got SDP!", jsep);
									var body = { request: "start", room: myroom };
									remoteFeed.send({ message: body, jsep: jsep });
								},
							})
							}
						},
						iceState: function (state) {
							Janus.log("ICE state of this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") changed to " + state);
							if(state  === "disconnected" ){
								republishForIceRestart();
							}
							var peerConnection = state;

							var republishForIceRestart = function () {
								peerConnection.onicecandidate = function() {
								  console.log("no actionTaken on republish for onicecandidate")
								}
							  
								// handleIceConnectionStateChange(peerConnection);
							  
								var publisherConstraints = {
								}
								publisherConstraints.iceRestart = true;
							  
								//   peerConnection
								//   .createOffer(createdDescriptionIceRestart, errorHandler, publisherConstraints);
							  }
						},
						webrtcState: function (on) {
							Janus.log("Janus says this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") is " + (on ? "up" : "down") + " now");
							if(!on){
								document.getElementById('videoremote'+remoteFeed.rfindex).remove();
							}
					},
						onlocalstream: function (stream) {
							// The subscriber stream is recvonly, we don't expect anything here
						},
						onremotestream: function (stream) {

      						// document.querySelector('.swiper-wrapper').id = "layoutVisitor";

							 
							console.log("Remote feed #" + remoteFeed.rfindex + ", stream:", stream);
							let addButtons = false;
							if ($('#remotevideo' + remoteFeed.rfindex).length === 0) {
								// No remote video yet
								$('#videoremote' + remoteFeed.rfindex).children('img').remove();
								$('#videoremote' + remoteFeed.rfindex).append('<video class="rounded centered relative hide" id="remotevideo' + remoteFeed.rfindex + '" width="100%" height="100%" autoplay playsinline/>');
								$('#videoremote' + remoteFeed.rfindex).addClass(""+remoteFeed.rfindex);
								console.log('streamaudio',stream.getAudioTracks());
								$('#layoutVisitor').append(`<div class="visitor swiper-slide click" id="videoremote`+ remoteFeed.rfindex +`"><video class="rounded centered relative hide" id="remotevideo` + remoteFeed.rfindex + `" width="100%" height="100%" autoplay playsinline/></div>`);
								// swiperRef.appendSlide(`<div class="visitor swiper-slide click" id="videoremote`+ remoteFeed.rfindex +`"><video class="rounded centered relative hide" id="remotevideo` + remoteFeed.rfindex + `" width="100%" height="100%" autoplay playsinline/></div>`);
								// var idd = "videoremote"+ remoteFeed.rfindex;
								// swipersliderarr.push(<SwiperSlide id= {idd} className="visitor click"><div ><video className="rounded centered relative hide" id="remotevideo` + remoteFeed.rfindex + `" width="100%" height="100%" autoplay playsinline/></div></SwiperSlide>);
						        $('#remote'+remoteFeed.rfindex).appendTo('#videoremote'+remoteFeed.rfindex);
								const myArr = remoteFeed.rfdisplay.split(" ");
								$('#videoremote'+ remoteFeed.rfindex).append("<img id='backgroundimg' src='"+myArr[2]+"'/>");
								var selector = document.querySelectorAll('.click');
							

							for(let i=0;i<selector.length;i++)
							{
								selector[i].addEventListener('dblclick',()=>{
									if(layoutforjs === 'whiteboard' || layoutforjs === 'gallery'){
										videoremote1 = '#'+selector[i].id;
									}
									else{
									$(videoremote1).prependTo('#layoutVisitor');
									$(videoremote1).addClass('visitor');
									$(videoremote1).removeClass('largevideo');

									videoremote1 = '#'+selector[i].id;

									$(videoremote1).prependTo('#layoutHost');
									$(videoremote1).addClass('largevideo');
									$(videoremote1).removeClass('visitor');
								}
							});
							}

								if(layoutforjs === 'gallery' || layoutforjs === 'whiteboard'){
								// alert('white board')
								}
								else{
								if(videoremote1) {
									$(videoremote1).prependTo('#layoutHost');
									$(videoremote1).addClass('largevideo');
									$(videoremote1).removeClass('visitor');
								}
								else{
									
								}

							

							}
								// $('#videoremote' + remoteFeed.rfindex).append('<video class="rounded centered relative hide" id="remotevideo' + remoteFeed.rfindex + '" width="100%" height="100%" autoplay playsinline/>');
								// Show the video, hide the spinner and show the resolution when we get a playing event
								$("#remotevideo" + remoteFeed.rfindex).bind("playing", function () {
									if (remoteFeed.spinner)
										remoteFeed.spinner.stop();
									remoteFeed.spinner = null;
									$('#waitingvideo' + remoteFeed.rfindex).remove();
									if (this.videoWidth)
										$('#remotevideo' + remoteFeed.rfindex).removeClass('hide').show();
									if (Janus.webRTCAdapter.browserDetails.browser === "firefox") {
										// Firefox Stable has a bug: width and height are not immediately available after a playing
										setTimeout(function () {
											let width = $("#remotevideo" + remoteFeed.rfindex).get(0).videoWidth;
											let height = $("#remotevideo" + remoteFeed.rfindex).get(0).videoHeight;
											$('#curres' + remoteFeed.rfindex).removeClass('hide').text(width + 'x' + height).show();
										}, 2000);
									}
								});
							}
							Janus.attachMediaStream($('#remotevideo' + remoteFeed.rfindex).get(0), stream);
							let videoTracks = stream.getVideoTracks();
		
							if (!videoTracks || videoTracks.length === 0) {
								// No remote video
								console.log("no remote video")
								$('#remotevideo' + remoteFeed.rfindex).hide();
								if ($('#videoremote' + remoteFeed.rfindex + ' .no-video-container').length === 0) {
									// $('#videoremote' + remoteFeed.rfindex).append(
									//     '<img src="" id="img1" class="card-media-image" style="width:300px;height:250px"></img>');
								}
							} else {
								$('#videoremote' + remoteFeed.rfindex + ' .no-video-container').remove();
								$('#remotevideo' + remoteFeed.rfindex).removeClass('hide').show();
							}


// Setting scroll button

						let videocontainer = document.getElementById('layoutVisitor');

						myFunction();

						videocontainer.onscroll =  function() { myFunction() }
						function myFunction() {
							
							console.log('top leftt',layoutforjs);

							if(layoutforjs == 'column'){
							
							console.log('top leftt',videocontainer.scrollLeft);
							console.log('top leftt',videocontainer.scrollWidth - videocontainer.clientWidth);
							setLeftButton((videocontainer.scrollLeft > 0) ? 'block' : 'none');
							setRightButton((videocontainer.scrollLeft != videocontainer.scrollWidth - videocontainer.clientWidth) ? 'block' : 'none');
							}
							else if(layoutforjs == 'row' || 'whiteboard'){
								console.log('top',videocontainer.scrollTop);
								console.log('top',videocontainer.scrollHeight - videocontainer.clientHeight);
								setLeftButton((videocontainer.scrollTop > 0) ? 'block' : 'none');
								setRightButton((videocontainer.scrollTop != videocontainer.scrollHeight - videocontainer.clientHeight) ? 'block' : 'none');
								
							}
							else if(layoutforjs == 'gallery'){
								setLeftButton('none');
								setRightButton('none');
							}  }


						},
						oncleanup: function () {
							Janus.log(" ::: Got a cleanup notification (remote feed " + id + ") :::");
							if (remoteFeed.spinner)
							remoteFeed.spinner.stop();
							$('#remotevideo' + remoteFeed.rfindex).remove();
							$('#videoremote' + remoteFeed.rfindex).append('<img src="" id="img1" class="card-media-image" style="width:300px;height:250px"></img>');
						}
					});
			}

			function audiotoggle()
			{
				if(!audio){
					if(sfutest){
					sfutest.createOffer(
						{
							media: { audioRecv: false,videoRecv: false, removeVideo: !video, removeAudio: true },	
							// Publishers are sendonly
							success: function (jsep) {
								Janus.debug("Got publisher SDP!");
								Janus.debug(jsep);
			

								const publish = { "request": "configure", "audio": audio, "video": video, pin : pin, secret : secret };
								sfutest.send({ "message": publish, "jsep": jsep });
							},
							error: function (error) {
								Janus.error("WebRTC error:", error);
							}
						});	
					}
					}
				else{
					if(sfutest){
						sfutest.createOffer(
						{
							media: { audioRecv: false,videoRecv: false, removeVideo : !video, addAudio : true ,record : true,audioSend:audio, videoSend: video},	
							// Publishers are sendonly
							success: function (jsep) {
								Janus.debug("Got publisher SDP!");
								Janus.debug(jsep);
								const publish = { "request": "configure",  audio : audio,video : video , pin : pin, secret : secret };
								sfutest.send({ "message": publish, "jsep": jsep });

								if(sfutest){
									const body = { request: "record", name: name };
									
								
									console.log('recording');
									sfutest.send({ message: body, jsep: jsep });
								}
																					
								if(audiodevice.length >= 12 ){
									alert("replacing audio"+audiodevice);
									sfutest.createOffer(
									{
									media: {
										audio: {
										deviceId: {
											exact: audiodevice
										},
									},
									replaceAudio: true,
								},
								
								success: function(jsep) {
									Janus.debug("Got SDP!", jsep);
									sfutest.send({  message: { audio : true,video: video }, jsep: jsep });
									if(!video){
									removevideo();
									}
								},
								error: function(error) {
									Janus.error("WebRTC error:", error);
									console.log(error)
									alert("WebRTC error... " + error.message);
								}
							});	
				}
							},
							error: function (error) {
								Janus.error("WebRTC error: ", error);
								if(error.name == 'NotAllowedError'){
									setIsMuted(true);
								}
							}
						});
					}
			}
			}


			function videotoggle()
			{
				if(!video){
					if(sfutest){
						sfutest.createOffer(
						{
							media: { audioRecv: false,videoRecv: false,removeAudio: !audio, removeVideo: true},	
							// Publishers are sendonly
							success: function (jsep) {
								Janus.debug("Got publisher SDP!");
								Janus.debug(jsep);
								const publish = { "request": "configure", audio: true, video : true,pin : pin, secret : secret };
								sfutest.send({ "message": publish, "jsep": jsep });
								const videoobj = document.querySelector('video#localvideo');
								videoobj.srcObject = null
							},
							error: function (error) {
								Janus.error("WebRTC error:", error);
							}
						});	
					}
					}
				else{
					if(sfutest){
						sfutest.createOffer(
						{
							media: { audioRecv: false,videoRecv: false,removeAudio : !audio, addVideo: true,audioSend:audio, videoSend: video },	
							// Publishers are sendonly
							success: function (jsep) {
								Janus.debug("Got publisher SDP!");
								Janus.debug(jsep);
								console.log('publish');
								const publish = { request	 : "configure",  audio: audio,video: video ,record : true,pin : pin, secret : secret};
								sfutest.send({ "message": publish, "jsep": jsep });
								// setVideodevice('');		
								
															
			 if(videodevice.length >= 12){
				alert("replacing video"+videodevice);
				sfutest.createOffer(
									{
									media: {
										video: {
										deviceId: {
											exact: videodevice
										},
									},
									replaceVideo: true,
									video:videoresolution,	// Let's negotiate data channels as well
								},
								
								success: function(jsep) {
									Janus.debug("Got SDP!", jsep);
									sfutest.send({  message: {audioRecv: false,videoRecv: false,audio : audio,video: video,videoSend : video,audioSend : audio }, jsep: jsep });
								},
								error: function(error) {
									Janus.error("WebRTC error:", error);
									console.log(error)
									alert("WebRTC error... " + error.message);
								}
							});	
				}
							},
							error: function (error) {
								Janus.error("WebRTC error:", error);
							}
						});
					}
			}}


			function removevideo()
			{
				if(sfutest){
					sfutest.createOffer(
						{
							media: {audioRecv: false,videoRecv: false, removeVideo: true, removeAudio: !audio },	
							// Publishers are sendonly
							success: function (jsep) {
								Janus.debug("Got publisher SDP!");
								Janus.debug(jsep);
								const publish = { "request": "configure", "audio": audio, "video": video,pin : pin, secret : secret };
								sfutest.send({ "message": publish, "jsep": jsep });
								const videoobj = document.querySelector('video#localvideo');
							},
							error: function (error) {
								Janus.error("WebRTC error:", error);
							}
						});	
					}
			}

			useEffect(() => {
				audiotoggle();
			},[audio])

			useEffect(() =>{
				audiotoggle();
				videotoggle();
			},[camerachange])

			useEffect(() => {
				videotoggle();
				console.log('audio',typeof(video),video);

			},[video])

	useEffect(() => {
	createconnection(roomid,server,type);
	screenshare();
	internetspeed();
},[]);

function internetspeed(){
	var userImageLink = 
	"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
				var time_start, end_time;
				
				// The size in bytes
				var downloadSize = 5616998;
				var downloadImgSrc = new Image();
	  
				downloadImgSrc.onload = function () {
					end_time = new Date().getTime();
					displaySpeed();
				};
				time_start = new Date().getTime();
				downloadImgSrc.src = userImageLink;
	  
				function displaySpeed() {
					var timeDuration = (end_time - time_start) / 1000;
					var loadedBits = downloadSize * 8;
					
					var bps = (loadedBits / timeDuration).toFixed(2);
					var speedInKbps = (bps / 1024).toFixed(2);
					var speedInMbps = (speedInKbps / 1024).toFixed(2);
					setMybandwidth(speedInKbps);	
					console.log("Your internet connection speed is: \n" 
						  + bps + " bps\n" + speedInKbps 
						  + " kbps\n" + speedInMbps + " Mbps\n");
				}
}

function enable_recording(jsep){

}

useEffect(() => {
		audiodeviceexport = audiodevice;
		videodeviceexport = videodevice;

		if(audio)
		{
			audiotoggle();
		}
		if(video)
		{
			videotoggle();
		}
},[audiodevice,videodevice])

useEffect(() =>{
	if(sfutest){
		sfutest.send({ message: { bitrate: bandwidth }});
	}
},[bandwidth]);

useEffect(() =>{
	let bandwith = bandwidth;
	if(sfutest){
		if(list){
		if(list.length > 6 && mybandwidth == '256000kbps'){
			bandwith /=2;
			if(list.length >= 10){
				bandwith /=2;
			}
			setBandwidth(bandwith);
		}
	}
	
	sfutest.send({ message: { bitrate: bandwith }});
	}
},[mybandwidth]);


useEffect(()=>{
	if(initialRender.current){
		initialRender.current= false;
}
else{
	if(!isScreenShareOn){
		screensharetest.current = true;
		unpublishOwnFeed();
}

else{
	// preShareScreen();
}
}
},[isScreenShareOn])


useEffect(() => {
	console.log('unpublish',disable,sfutest)
	if(disable && sfutest){
		setaudio(false);
		setvideo(false);
		setIsScreenShareOn(false);
		
		var unpublish = { request: "unpublish" };
		sfutest.send({ message: unpublish });
	}
},[disable])

function unpublishOwnFeed() {
	// Unpublish our stream
	$('#unpublish').attr('disabled', true).unbind('click');
	var unpublish = { request: "unpublish" };
	screentest.send({ message: unpublish });
	screenshare();
}

	return(<div>

{/* <button onClick={renegotiation}></button> */}

	<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        Loading please wait ... &nbsp; <CircularProgress color="inherit" />
      </Backdrop>
	</div>)
}

export default StartJanusServerRoom