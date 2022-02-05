import React from "react";
import InstitutePageData from "./InstitutePageData";

//files
import MenuBar from '../Home/AppBar/AppBar';
import AppBar2 from "../Home/AppBar2/AppBar2";
import Footer from "../Home/Footer/Footer";

const InstitutePage = () => {
    return(
        <React.Fragment>
          <MenuBar/>
          <AppBar2/>
          <InstitutePageData/>
          <Footer/>
        </React.Fragment>
    );
}

export default InstitutePage;