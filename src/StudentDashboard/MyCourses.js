import React, { useEffect, useState } from "react";
import MyLearnings from "./MyLearnings";
import Course_Sessions from "./Course_Sessions";
import {StudentSessions} from "./StudentRecoil";
import { useRecoilState } from "recoil";

const MyCourses = () => {

//change recoil hooks
const [ChangePage,setChangePage] = useRecoilState(StudentSessions);

    if(ChangePage){
     return <MyLearnings/>
    }else{
     return <Course_Sessions/>
    }

    }
export default MyCourses;
