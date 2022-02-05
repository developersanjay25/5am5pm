import { atom } from "recoil";

const Dmodal = new atom({
    key:'Dmodal',
    default:false,
})

const sessioncrstitle = new atom({
    key:'sessioncrstitle',
    default:'',
})

export {Dmodal,sessioncrstitle};