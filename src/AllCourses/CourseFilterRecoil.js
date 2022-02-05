import { atom } from "recoil";

const CsubCat = new atom({
    key:'CsubCat',
    default:[],
}),

const CFee = new atom({
    key:'CFee',
    default:[],
}),

const CSkill = new atom({
    key:'CSkill',
    default:[],
})

export {CsubCat,CFee,CSkill};
