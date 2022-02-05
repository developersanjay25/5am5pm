import React from "react";
import Staff_Course from "./Course";
import { useRecoilState } from "recoil";
import {ShowMeetings} from './StafRecoil';
import Sessions from './Sessions';


const Meetings = () => {

  const[isCoursePage,setisCoursePage] = useRecoilState(ShowMeetings);

  //show meetings & sessions recoil hooks
  if(isCoursePage){
    return <Staff_Course/>
  }else{
    return <Sessions/>
  }

 
};

export default Meetings;
