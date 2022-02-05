import React from 'react';
import StudentDashboard from './StudentDashboard';

const StudentDashboardValidation = () => {

   const role = localStorage.getItem("role");
   const token = localStorage.getItem("token");

    if(role == "Student" && token){
        return <StudentDashboard/>
    }else{
        window.location.href="/Signup";
    }
}

export default StudentDashboardValidation;