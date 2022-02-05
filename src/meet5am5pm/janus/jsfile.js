import {videoroom} from './main.js'

var config = {
    "serverUrl": 'wss://vc.sg1.nowdigitaleasy.com:8989',
    "protocol" : 'janus-protocol',
    "roomid": 5678,
    "type" : "publisher",
    "plugin": 'janus.plugin.videoroom'
}

var room = new videoroom(config);

room.createconnection().then(function (res) {
    console.log(res);

    room.createsession().then((res) => {
            handlecreate(res);
    });  
    });
    const handlecreate =(session_id)=>{
        room.createhandle(session_id).then((res)=>{
            console.log(session_id)
            console.log(res);
            createroom(session_id, res)
        });
    }

    const createroom = (sessionid,handleid) =>{
        room.createroom(sessionid,handleid).then((res) => {
            roomjoin(res.session_id, res.sender);
        });
    }
    const roomjoin = (session,sender) =>{
            room.joinroom(session,sender).then((res) => {
            console.log(res.sender);
        })
}

export default room;