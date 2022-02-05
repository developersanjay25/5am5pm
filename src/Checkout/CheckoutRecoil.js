import { atom } from "recoil";

const useryes = new atom({
    key: 'useryes',
    default:false,
})


const userotpverify = new atom({
    key:'userotpverify',
    default:true,
})

const initialverify = new atom({
    key:'initialverify',
    default:false,
})

const uMobile = new atom({
    key:'uMobile',
    default:''
})




//accordin new recoil hooks

const step1 = new atom({
    key:'step1',
    default:true,
})

const step1_1 = new atom({
    key:'step1_1',
    default:false,
})

const ExeStep2 = new atom({
    key:'ExeStep2',
    default:true,
})

const PaymentStep3 = new atom({
    key:'PaymentStep3',
    default:false,
})

export {useryes,userotpverify,initialverify,uMobile,step1,step1_1,ExeStep2,PaymentStep3};