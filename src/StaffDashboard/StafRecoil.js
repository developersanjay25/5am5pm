import { atom } from "recoil";

const Rdrawer = new atom({
    key:'Rdrawer',
    default:false,
})


//meetings recoil

const ShowMeetings = new atom({
    key:'ShowMeetings',
    default:true,
})


//show sessions recoil 

const ShowSessions = new atom({
    key:'ShowSessions',
    default:"",
})

const Rmodal = new atom({
    key:'Rmodal',
    default:false,
})



export {Rdrawer,ShowMeetings,ShowSessions,Rmodal};