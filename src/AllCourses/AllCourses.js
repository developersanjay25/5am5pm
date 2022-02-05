import React from "react";

//importing menu bar
import MenuBar from "../Home/AppBar/AppBar";
import AppBar2 from "../Home/AppBar2/AppBar2";
import AllCoursesContents from "./AllCoursesContents";
import Footer from "../Home/Footer/Footer";


const AllCourses = () => {
    return(
        <React.Fragment>
            <MenuBar/>
            <AppBar2/>
            <AllCoursesContents/>
            <Footer/>
        </React.Fragment>
    );
}

export default AllCourses;