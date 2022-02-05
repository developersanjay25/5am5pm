import React from 'react';
import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";

//files import for route

import Home from './Home/Home';
import Login from './Login/Login';
import Sign_up from './Signup/Signup';
import Cpp_signup from './CPP/Cpp_Signup';
import CourseCreation from './CreateCourse/CourseCreation';
import Dashboard_Validation from './StaffDashboard/DashBoard_Validation';
import Enrolement from './Enrolment/Enrolmentpage';
import StudentDashboardValidation from './StudentDashboard/StudentDashboardValidation';

import PurchaseValidation from './Purchase/Purchase';
import InsDashValidation from './InstituteDashboard/InsDashValidation';

import AllCourses from './AllCourses/AllCourses';
import CourseGridView from './AllCourses/CourseGridView';
import InstitutePage from './InstitutePage/InstitutePage';
import CourseDetails from './CourseDetailsPage/CourseDetails';
import CheckoutPage from './Checkout/CheckoutPage';
import InstituteOverView from './InstitutePage/InstituteOverview';
import InstituteGridView from './InstitutePage/InstituteGridview';
import Conference from './meet5am5pm/containers/Conference'

import AccountSettings from './StudentDashboard/accountsettings/AccountSettings';
import StaffAccountSettings from './StaffDashboard/StaffAccount/StaffAccountSettings';
import InstituteAccountSettings from './InstituteDashboard/instituteaccount/InstituteAccount';
function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="login" element={<Login />}/>
    <Route path="signup" element={<Sign_up/>}/>
    <Route path="createuniversity" element={<Cpp_signup/>}/>
    <Route path="Course-Creation" element={<CourseCreation/>}/>
    <Route path="/app/staffdashboard" element={<Dashboard_Validation/>}/>
    <Route path="/app/staffdashboard/myaccount" element={<StaffAccountSettings/>}></Route>
    <Route path="Enrolment" element={<Enrolement/>}></Route>
    <Route path="/app/studentdashboard" element={<StudentDashboardValidation/>}></Route>
    <Route path="/app/studentdashboard/myaccount" element={<AccountSettings/>}></Route>
    <Route path="Payment" element={<PurchaseValidation/>}></Route>
    <Route path="/app/institutedashboard" element={<InsDashValidation/>}></Route>
    <Route path="/app/institutedashboard/myaccount" element={<InstituteAccountSettings/>}></Route>
    <Route path="allcourses" element={<CourseGridView/>}></Route>
    <Route path="allcourses/listView" element={<AllCourses/>}></Route>
    <Route path="allcourses/gridView" element={<CourseGridView/>}></Route>
    <Route path="course-details/:dynamicid/:testid/" element={<CourseDetails/>}></Route>
    <Route path="checkout" element={<CheckoutPage/>}></Route>
    <Route path="institute" element={<InstituteGridView/>}></Route>
    <Route path="institute-details" element={<InstituteOverView/>}></Route>
    <Route path="/institute/listview" element={<InstitutePage/>}></Route>
    <Route path="/institute/gridview" element={<InstituteGridView/>}></Route>
    <Route path="/conference" element={<Conference/>}></Route>
  </Routes>
  );
}

export default App;
