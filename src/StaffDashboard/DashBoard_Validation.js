import React from "react";
import VerticalTabs from './StaffDashboard';
import Sign_up from "../Signup/Signup";

const Dashboard_Validation = () =>{

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

if(role == "Staf" && token){
    return <VerticalTabs/>
}else{
    window.location.href="/Signup";
}
}

export default Dashboard_Validation;