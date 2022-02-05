navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var api = {
  sessioncreate: {
    janus: "create",
    transaction: "session",
  },
  handle: {
    janus: "attach",
    session_id: "",
    plugin: "janus.plugin.videoroom",
    transaction: "conferencehandle",
  },
  screensharehandle: {
    janus: "attach",
    session_id: "",
    plugin: "janus.plugin.videoroom",
    transaction: "screensharehandle",
  },
  createRoom: {
    janus: "message",
    body: {
      request: "create",
      room: null,
      publishers: 10,
    },
    transaction: "createroom",
    session_id: "",
    handle_id: "",
  },
  joinRoom: {
    janus: "message",
    body: {
      request: "join",
      room: null,
      ptype: "publisher",
      display: "indhu",
    },
    transaction: "joinroom",
    session_id: "",
    handle_id: "",
  },
  publish: {
    janus: "message",
    transaction: "publishstream",
    body: {
      request: "configure",
      audio: false,
      video: true,
    },
    jsep: "",
    session_id: "",
    handle_id: "",
  },
  remotehandle: {
    janus: "attach",
    session_id: "",
    plugin: "janus.plugin.videoroom",
    transaction: "remotehandle",
  },
  listener: {
    janus: "message",
    transaction: "listener",
    body: {
      request: "join",
      ptype: "subscriber",
      room: null,
      feed: null,
    },
    session_id: "",
    handle_id: "",
  },
  remotestream: {
    janus: "message",
    transaction: "remotestream",
    body: {
      request: "start",
      room: null,
    },
    jsep: "",
    session_id: "",
    handle_id: "",
  },
  candidate: {
    janus: "trickle",
    session_id: "",
    handle_id: "",
    candidate: "",
    transaction: "icecanditate",
  },
  trickleCandidate: {
    janus: "trickle",
    transaction: "trickleCandidate",
    session_id: "",
    handle_id: "",
    candidate: {
      completed: true,
    },
  },
  list: {
    janus: "message",
    transaction: "roomlist",
    body: {
      request: "list",
      room: null,
    },
    session_id: "",
    handle_id: "",
  },
  keepAlive: {
    janus: "keepalive",
    transaction: "keepalive",
    session_id: "",
  },
};

const ConnectionState = {
  connected: "connected",
  disconnected: "disconnected",
};

const ClientEvent = {
  connected: "connected",
  disconnected: "disconnected",
  object: "object",
  error: "error",
  timeout: "timeout",
  event: "event",
};
const offerOptions = {
  audio: true,
};

const constraints = {
  audio: true,
  video: true,
};

var iceServers = [{ urls: "stun:stun.l.google.com:19302" }];
var pc_config = {
  iceServers: iceServers,
};
var pc_constraints = {
  optional: [{ DtlsSrtpKeyAgreement: true }],
};

var connection;
var janusdata;
var sessionId;
var handleId;
var remotehandleId = [];
var roomId;
var joinresponse;
var offerresponse;
var localofferresponse;
var joinsubscriberresponse;
var icecanditate = {};
icecanditate.trickle = true;
icecanditate.candidates = [];
var localvideo;
var feeds = [];
var remotefeed = {};
var feeds1 = [];
var feeds2 = [];
var feeds3 = [];
var remoteid = false;
var publisher;
var publisherdata;
var publisher_id;
var publisher_length;
var remoteuserid = false;
const pc = new RTCPeerConnection(pc_config, pc_constraints);

export default class videoroom {
  constructor(options) {
    this.serverUrl = options.serverUrl || "wss://5am5pm.com:8989/janus";
    this.roomid = options.roomid;
    this.userid = options.userid;
    this.type = options.type;
    this.protocol = "janus-protocol";
  }
  iswebsocket() {
    return window.WebSocket ? true : false;
  }
  localvideopause() {
    localvideo.pause();
  }
  localaudiomute() {
    localvideo.muted = true;
  }
  localaudiounmute() {
    localvideo.muted = false;
  }
  localhalfvolume() {
    localvideo.volume = 0.5;
  }
  localfullvolume() {
    localvideo.volume = 1.0;
  }
  getconnectionstatus() {
    if (connection.readyState == 0) return "connecting";
    else if (connection.readyState == 1) return "connected";
    else if (connection.readyState == 2) return "closing";
    else if (connection.readyState == 3) return "closed";
  }

  createconnection() {
    return new Promise((resolve, reject) => {
      connection = new WebSocket(this.serverUrl, this.protocol);
      connection.onopen = function (e) {
        if (connection.readyState == 1) {
          resolve("connected");
        } else {
          reject("disconnected");
        }
      };
    });
  }

  janusresponse() {
    return new Promise((resolve, reject) => {
      connection.onmessage = function (e) {
        console.log(JSON.parse(e.data));
        janusdata = JSON.parse(e.data);

        if (janusdata.janus == "success" && janusdata.transaction == "session") {
          sessionId = janusdata.data.id;
          api.handle.session_id = sessionId;
          api.createRoom.session_id = sessionId;
          api.joinRoom.session_id = sessionId;
          api.publish.session_id = sessionId;
          api.trickleCandidate.session_id = sessionId;
          api.candidate.session_id = sessionId;
          api.remotehandle.session_id = sessionId;
          api.listener.session_id = sessionId;
          api.remotestream.session_id = sessionId;
          api.list.session_id = sessionId;

          setInterval(() => {
            api.keepAlive.session_id = sessionId;
            connection.send(JSON.stringify(api.keepAlive));
          }, 60000);
          resolve(sessionId);
        } else if (janusdata.janus == "success" && janusdata.transaction == "conferencehandle") {
          handleId = janusdata.data.id;
          resolve(handleId);
          api.createRoom.handle_id = handleId;
          api.joinRoom.handle_id = handleId;
          api.publish.handle_id = handleId;
          api.trickleCandidate.handle_id = handleId;
          api.candidate.handle_id = handleId;
          api.list.handle_id = handleId;
        } else if (janusdata.janus == "success" && janusdata.transaction == "createroom") {
          resolve(janusdata);
        } else if (janusdata.janus == "success" && janusdata.transaction == "roomlist") {
          resolve(janusdata);
        } else if (janusdata.janus == "event" && janusdata.transaction == "joinroom") {
          resolve(janusdata);

          if (janusdata.plugindata.data.publishers !== null && janusdata.plugindata.data.publishers !== undefined) {
            publisherdata = janusdata.plugindata.data.publishers;
            if (publisherdata.length !== 0) {
              remoteid = true;
              console.log("LENGTH :" + publisherdata.length);
              publisher_length = publisherdata.length;
              // for (var i = 1; i < publisherdata.length; i++) {
              //     if (feeds3[i] === undefined || feeds3[i] === null) {
              //         feeds3[i] = remotefeed;
              //         remotefeed.rfindex = i;
              //         break;
              //     }
              // }
            }
          }
        } else if (janusdata.janus == "event" && janusdata.transaction == "publishstream") {
          // console.log(janusdata);
          pc.setRemoteDescription(janusdata.jsep).then(function () {
            console.log("set remote description accepted!");
          });
        } else if (
          janusdata.janus == "event" &&
          janusdata.plugindata.data.publishers !== null &&
          janusdata.plugindata.data.publishers !== undefined
        ) {
          publisher = janusdata.plugindata.data.publishers;
          // console.log(publisher);
          for (var i = 0; i < publisher.length; i++) {
            var id = publisher[i]["id"];
            var display = publisher[i]["display"];
            var audio = publisher[i]["audio_codec"];
            var video = publisher[i]["video_codec"];
            videoroom.newremoteuserhandle(id, display, audio, video);
          }
        } else if (janusdata.janus == "success" && janusdata.transaction == "remotehandle") {
          // remotehandleId = janusdata.data.id;
          remotehandleId.push(janusdata.data.id);
          videoroom.remoteuserjoin();
        } else if (janusdata.janus == "event" && janusdata.transaction == "listener") {
          resolve(janusdata);
          // console.log(janusdata.jsep);
          videoroom.createremotepeerconnection(janusdata.jsep);
        } else if (janusdata.janus == "event" && janusdata.transaction == "remotestream") {
        } else if (janusdata.janus == "media" && janusdata.type == "video") {
          // if (remoteid == true) {
          //     remoteid = false;
          //     remoteuserid = true;
          //     console.log(publisherdata);
          //     for (var i = 0; i < 1; i++) {
          //         var id = publisherdata[i]["id"];
          //         var display = publisherdata[i]["display"];
          //         var audio = publisherdata[i]["audio_codec"];
          //         var video = publisherdata[i]["video_codec"];
          //         videoroom.newremoteuserhandle(id, display, audio, video);
          //     }
          // }
        } else if (janusdata.janus == "webrtcup" && publisherdata.length !== null) {
          if (remoteid == true) {
            remoteid = false;
            remoteuserid = true;
            console.log(publisherdata);
            for (var i = 0; i < 1; i++) {
              var id = publisherdata[i]["id"];
              var display = publisherdata[i]["display"];
              var audio = publisherdata[i]["audio_codec"];
              var video = publisherdata[i]["video_codec"];
              videoroom.newremoteuserhandle(id, display, audio, video);
            }
          }
          // if(remoteuserid == true) {
          //     remoteuserid = false;
          //     console.log("testing...");
          //     for (var i = 1; i < publisherdata.length; i++) {
          //         if (feeds2[i] === undefined || feeds2[i] === null) {
          //             feeds2[i] = publisherdata[i];
          //             var id = feeds2[i]["id"];
          //             var display = feeds2[i]["display"];
          //             var audio = feeds2[i]["audio_codec"];
          //             var video = feeds2[i]["video_codec"];
          //             // break;
          //         }
          //     }
          //     videoroom.newremoteuserhandle(id, display, audio, video);
          // }
        }
      };
      connection.onerror = function (e) {
        reject(e);
      };
    });
  }

  createsession() {
    connection.send(JSON.stringify(api.sessioncreate));

    return new Promise((resolve, reject) => {
      this.janusresponse().then((res) => {
        resolve(res);
      });
    });
  }

  createhandle() {
    connection.send(JSON.stringify(api.handle));
    return new Promise((resolve, reject) => {
      this.janusresponse().then((res) => {
        resolve(res);
      });
    });
  }
  createroom() {
    api.createRoom.body.room = this.roomid;
    connection.send(JSON.stringify(api.createRoom));
    return new Promise((resolve, reject) => {
      this.janusresponse().then((res) => {
        resolve(res);
      });
    });
  }
  listofrooms() {
    api.list.body.room = this.roomid;
    connection.send(JSON.stringify(api.list));
    return new Promise((resolve, reject) => {
      this.janusresponse().then((res) => {
        resolve(res);
      });
    });
  }
  joinroom() {
    api.joinRoom.body.room = this.roomid;
    connection.send(JSON.stringify(api.joinRoom));
    return new Promise((resolve, reject) => {
      this.janusresponse().then((res) => {
        resolve(res);
      });
    });
  }
  createlocalvideo(localvideo) {
    return new Promise((resolve, reject) => {
      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          constraints,
          function (stream) {
            localvideo = document.getElementById(localvideo);
            localvideo.srcObject = stream;
            stream.getVideoTracks().forEach((track) => pc.addTrack(track, stream));

            localvideo.onloadedmetadata = function (e) {
              localvideo.play();
              resolve("localvideosuccess");
            };
          },
          function (err) {
            console.log("The following error occurred: " + err.name);
          }
        );
      } else {
        console.log("getUserMedia not supported");
        reject("error");
      }
    });
  }
  createlocalpeerconnection() {
    return new Promise((resolve, reject) => {
      pc.onicecandidate = onicecandidate;
      pc.createOffer({ offerToReceiveVideo: true }).then(function (offer) {
        console.log(offer);
        pc.setLocalDescription(offer).then(function () {
          console.log("set local description accepted");
          resolve(offer);
        });
      });
    });
  }

  sendlocaloffer(offer) {
    api.publish.jsep = offer;
    connection.send(JSON.stringify(api.publish));
    return new Promise((resolve, reject) => {
      this.janusresponse().then((res) => {
        resolve(res);
      });
    });
  }

  static newremoteuserhandle(id, display, audio, video) {
    console.log("Remote user starts here...");
    // console.log("feed id :" + id);
    publisher_id = id;
    connection.send(JSON.stringify(api.remotehandle));
  }
  static remoteuserjoin() {
    for (var i = 0; i < remotehandleId.length; i++) {
      if (feeds1[i] === undefined || feeds1[i] === null) {
        feeds1[i] = remotehandleId[i];
        break;
      }
    }
    console.log("handle :" + feeds1[i]);
    api.listener.handle_id = feeds1[i];
    api.trickleCandidate.handle_id = feeds1[i];
    api.candidate.handle_id = feeds1[i];
    api.remotestream.handle_id = feeds1[i];
    api.listener.body.room = api.joinRoom.body.room;
    api.listener.body.feed = publisher_id;
    connection.send(JSON.stringify(api.listener));
  }

  static createremotepeerconnection(jsep) {
    return new Promise((resolve, reject) => {
      const pc = new RTCPeerConnection(pc_config, pc_constraints);
      pc.onicecandidate = onicecandidate;
      pc.ontrack = ontrack;
      pc.setRemoteDescription(jsep).then(function () {
        console.log("set remote description accepted!");
      });
      var mediaConstraints = {
        audioSend: false,
        videoSend: false,
        jsep: jsep,
      };
      pc.createAnswer(mediaConstraints).then(function (answer) {
        console.log(answer);
        pc.setLocalDescription(answer).then(function () {
          console.log("set local description accepted");
          videoroom.sendanswerdata(answer);
          resolve(answer);
        });
      });
    });
  }
  static sendanswerdata(answer) {
    api.remotestream.jsep = answer;
    api.remotestream.body.room = this.roomid;
    connection.send(JSON.stringify(api.remotestream));
  }
}

function onicecandidate(event) {
  console.log(event.candidate);
  icecanditate.candidates.push(event.candidate);
  if (!event.candidate) {
    if (icecanditate.trickle === true) {
      connection.send(JSON.stringify(api.trickleCandidate));
    } else {
      // No trickle, time to send the complete SDP (including all candidates)
      // sendSDP(handleId, callbacks);
    }
  } else {
    var candidate = {
      candidate: event.candidate.candidate,
      sdpMid: event.candidate.sdpMid,
      sdpMLineIndex: event.candidate.sdpMLineIndex,
    };
    if (icecanditate.trickle === true) {
      // Send candidate
      api.candidate.candidate = candidate;
      connection.send(JSON.stringify(api.candidate));
    }
  }
}
function ontrack(event) {
  console.log(event);
  for (var i = 1; i < 6; i++) {
    if (feeds[i] === undefined || feeds[i] === null) {
      feeds[i] = remotefeed;
      remotefeed.rfindex = i;
      break;
    }
  }
  console.log("REMOTE FEED :" + remotefeed.rfindex);
  var remotevideo = document.getElementById("remote" + remotefeed.rfindex);
  remotevideo.srcObject = event.streams[0];
}
