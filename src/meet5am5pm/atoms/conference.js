import { atom } from "recoil";

let layout = atom({
    key : 'layout',
    default : 'column'
});
export {layout}