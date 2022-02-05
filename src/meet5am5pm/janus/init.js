var config = {
    "serverUrl": 'wss://5am5pm.com:8989/janus',
    "protocol" : 'janus-protocol',
    "roomid": 5678,
    "type" : "publisher",
    "plugin": 'janus.plugin.videoroom'
}

var room = new videoroom(config);
var localvideostatus;

room.createconnection().then(function(res) {
    console.log(res);
    if(res == 'connected') {
        sessioncreate();
    }
}).catch(function(err) {
    console.log(err);
})

sessioncreate = function() {
    room.createsession().then((res) => {
        console.log(res);
        if(res.janus == 'success') {
            handlecreate(res.data.id);
        }
    });
}

keepalive = function(sessionid) {
    room.keepalivesession(sessionid).then((res) => {
        console.log(res);
    })
}

handlecreate = function(sessionid) {
    room.createhandle(sessionid).then((res) => {
        console.log(res);
        if(res.janus == 'success'){
            roomcreate(res.session_id, res.data.id);
        }
    })
}

roomcreate = function(sessionid, handleid) {
    room.createroom(sessionid,handleid).then((res)=>{
        console.log(res);
        if(res.janus == 'success') {
            roomjoin(res.session_id, res.sender);
        }
    })
}
roomjoin = function(session, sender){
    room.joinroom(session,sender).then((res)=>{
        console.log(res);
        if(res.janus == 'event') {
            createlocalvideo(res.session_id, res.sender);
        }
    });
}

createlocalvideo = function() {
    room.createlocalvideo('local').then(function(res) {
        console.log(res);
        createoffer();
    });
}

createoffer = function() {
    room.createlocalpeerconnection().then((res) => {
        console.log(res);
        localoffer(res);
    })
}
localoffer = function(offerdata) {
    room.sendlocaloffer(offerdata).then((res) => {
        console.log(res);
        var i;
        for (i = 0; i < res.length; i++) {
            var id = res[i]["id"];
            var display = res[i]["display"];
            var audio = res[i]["audio_codec"];
            var video = res[i]["video_codec"];
            console.log(id);
            createremoteuser(id, display, audio, video);
        }
    })
}
createremoteuser = function(id, display, audio, video) {
    room.remotehandle(id, display, audio, video).then((res) => {
        console.log(res);
        if(res.janus == 'success') {
            remotejoin(res.data.id);
        }
        
    })
}
remotejoin = function(remotehandle) {
    room.joinsubscriber(remotehandle).then((res) => {
        console.log(res);
        if(res.janus == 'event') {
            createanswer(res.session_id, res.sender, res.jsep);
        }
    })
}
createanswer = function(session, remotehandle, jsep) {
    room.createremotepeerconnection(session, remotehandle, jsep).then((res) => {
        console.log(res);
        answer(res);
    })
}
answer = function(answer) {
    room.sendanswerdata(answer).then((res) => {
        console.log(res);
    })
}
export default room