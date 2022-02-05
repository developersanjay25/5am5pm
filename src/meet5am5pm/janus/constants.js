var api = {

    createsession: {
      "janus": "create",
      "transaction": "8888wwqwh"
    },
    claimsession: {
      "janus": "claim",
      "session_id": "",
      "transaction": "claimsession"
    },
    destroysession: {
      "janus": "destroy",
      "session_id": "",
      "transaction": "destroysession"
    },
    handle: {
      "janus": "attach",
      "session_id": '',
      "plugin": "janus.plugin.videoroom",
      "transaction": "conferencehandle"
    },
    screensharehandle: {
      "janus": "attach",
      "session_id": '',
      "plugin": "janus.plugin.videoroom",
      "transaction": "screensharehandle"
    },
    createRoom: {
      "janus": "message",
      "body": {
        "request": "create",
        "room": 1,
        "publishers": 10,
        "permanent": false,
        "description": "5am5pmroom",
        "notify_joining": true,
        "secret": "",
        "pin": "",
        "is_private": false
  
      },
      "transaction": "createroom",
      "session_id": '',
      "handle_id": ''
    },
    joinRoom: {
      "janus": "message",
      "body": {
        "request": "join",
        "room": null,
        "id": null,
        "ptype": "publisher",
        "display": "indhu",
        "token": "",
        "pin": "",
      },
      "transaction": "joinroom",
      "session_id": '',
      "handle_id": ''
    },
    publish: {
      "janus": "message",
      "transaction": "publishstream",
      "body": {
        "request": "configure",
        "audio": false,
        "video": true
      },
      "jsep": '',
      "session_id": '',
      "handle_id": '',
    },
    remotehandle: {
      "janus": "attach",
      "session_id": '',
      "plugin": "janus.plugin.videoroom",
      "transaction": "remotehandle"
    },
    listener: {
      "janus": 'message',
      "transaction": 'listener',
      "body": {
        "request": 'join',
        "ptype": 'subscriber',
        "room": null,
        "feed": null,
        "token": "",
        "pin": ""
      },
      "session_id": '',
      "handle_id": ''
    },
    remotestream: {
      "janus": 'message',
      "transaction": 'remotestream',
      "body": {
        "request": 'start',
        "room": null
      },
      "jsep": '',
      "session_id": '',
      "handle_id": '',
  
    },
    candidate: {
      "janus": "trickle",
      "session_id": '',
      "handle_id": '',
      "candidate": '',
      "transaction": "localicecanditate"
    },
    trickleCandidate: {
      "janus": "trickle",
      "transaction": "localtrickleCandidate",
      "session_id": '',
      "handle_id": '',
      "candidate": {
        "completed": true
      }
    },
    list: {
      "janus": "message",
      "transaction": "roomlist",
      "body": {
        "request": "list",
        "room": null
      },
      "session_id": '',
      "handle_id": ''
    },
    listparticipants: {
      "janus": "message",
      "transaction": "listparticipants",
      "body": {
        "request": "listparticipants",
        "room": null
      },
      "session_id": '',
      "handle_id": ''
    },
    roomexist: {
      "janus": "message",
      "transaction": "roomexist",
      "body": {
        "request": "exists",
        "room": null
      },
      "session_id": '',
      "handle_id": ''
    },
    createRoom: {
      "janus": "message",
      "body": {
        "request": "create",
        "room": 1,
        "publishers": 10,
        "permanent": false,
        "description": "5am5pmroom",
        "secret": "",
        "pin": "",
        "is_private": false
  
      },
      "transaction": "createroom",
      "session_id": '',
      "handle_id": ''
    },
    keepAlive: {
      "janus": 'keepalive',
      "transaction": 'keepalive',
      "session_id": ''
    },
    
  }

 

  var localhandle = {
    session: '',
    plugin: 'janus.plugin.videoroom',
    id: 'handleId',
    token: 'handleToken',
    detached: false,
    webrtcStuff: {
      started: false,
      myStream: null,
      streamExternal: false,
      remoteStream: null,
      mySdp: null,
      mediaConstraints: null,
      pc: null,
      dataChannel: null,
      dtmfSender: null,
      trickle: true,
      iceDone: false,
      volume: {
        value: null,
        timer: null
      },
      bitrate: {
        value: null,
        bsnow: null,
        bsbefore: null,
        tsnow: null,
        tsbefore: null,
        timer: null
      }
    }
  
  }
  var localscreenshare = {
    session: '',
    plugin: 'janus.plugin.videoroom',
    id: 'handleId',
    token: 'handleToken',
    detached: false,
    webrtcStuff: {
      started: false,
      myStream: null,
      streamExternal: false,
      remoteStream: null,
      mySdp: null,
      mediaConstraints: null,
      pc: null,
      dataChannel: null,
      dtmfSender: null,
      trickle: true,
      iceDone: false,
      volume: {
        value: null,
        timer: null
      },
      bitrate: {
        value: null,
        bsnow: null,
        bsbefore: null,
        tsnow: null,
        tsbefore: null,
        timer: null
      }
    }
  
  }

var iceServers = [{ urls:  "stun:stun.l.google.com:19302"
}];

var pc_config = {
    "iceServers": iceServers,
    "iceTransportPolicy": 'all',
    "bundlePolicy": 'balanced'
};

var pc_constraints = {
    "optional": [{
        "DtlsSrtpKeyAgreement": true
    }]
};


