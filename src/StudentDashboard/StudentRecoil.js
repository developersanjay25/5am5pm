import { atom } from "recoil";

const StudentSessions = new atom({
    key:'StudentSessions',
    default:true,
})

const StudentCrs_id = new atom({
    key:'StudentCrs_id',
    default:'',
})

const showcrstitle = new atom({
    key:'showcrstitle',
    default:'hello'
})

const showcrsimg = new atom({
    key:'showcrsimg',
    default:''
})

export {StudentSessions,StudentCrs_id,showcrstitle,showcrsimg};