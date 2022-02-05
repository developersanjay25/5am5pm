import React from 'react';
import { Grid,Container,Paper,Select,FormControl,MenuItem,Breadcrumbs, InputLabel,Link,Typography,} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


//importing menu bar
import MenuBar from "../Home/AppBar/AppBar";
import AppBar2 from "../Home/AppBar2/AppBar2";
import Footer from '../Home/Footer/Footer';

//files
import ContactUs from './Contact_Us';
import GridView from './GridView';

//style
import './AllCoursesContents.css';

//images
import pic1 from '../Images/pattern/11.png';




const CourseGridView = () => {

    const listview = () => 
    {
        window.location.href="/allcourses/listview";
    }
    const Gridview = () => {
        window.location.href="/GridView"
    }

    const allCourses = () => {
        window.location.href="/allcourses"
    }

    const home = () => {
        window.location.href="/"
    }

    function handleClick(event) {
        event.preventDefault();
        
      }

    const breadcrumbs = [
        <Link underline="hover" key="1" color="#fff" onClick={home}>
          HOME
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="#fff"
          href="/allCourses"
          onClick={handleClick}
        >
          Courses
        </Link>,
       
      ];


    return(
        <React.Fragment>
            <MenuBar/>
            <AppBar2/>
            
        {/* Grid view */}

        <div>
        
               
                <div style={{ width:'100%',height:'100px', backgroundColor:'#f6f6f6'}}>
               <div className='bckimg'>
                   <div className='breadstyle'>
               <Breadcrumbs
        separator={<NavigateNextIcon style={{color:'#fff'}} fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      </div>
               </div>
                </div>
               
        
        </div>
        <div style={{height:'20px'}}></div>
        <GridView/>
        
        </React.Fragment>
    );
}

export default CourseGridView;