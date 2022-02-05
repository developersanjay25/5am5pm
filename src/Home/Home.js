import React from "react";

//imported files

import MenuBar from "./AppBar/AppBar";
import Carousel_Slider from "./Carousel/Carousel";
import Footer from './Footer/Footer';
import University_title from "../University/University";
import University_Carousel from "../University/University_carousel";
import Courses from "../Part1/Courses";
import Cpp_Home from '../CPP/Cpp_home';
import AppBar2 from "./AppBar2/AppBar2";
import Testimonial from "./Testimonial/Testimonial";
import Brands from '../Home/BrandSlider/Brands';




const Home = () => {
    return(
        <React.Fragment>
            <MenuBar/>
            <AppBar2/>
            <Carousel_Slider/>
           
            <Courses/>
            <Cpp_Home/>
            <University_title/>
            <University_Carousel/>
            <Testimonial/>
            <Brands/>
          
            <Footer/>      

           

        </React.Fragment>
    );
}

export default Home;