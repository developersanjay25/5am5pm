import React from "react";

import { useState, useEffect } from "react";

//material ui
import { Grid,Paper } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

//images
import img1 from "../Images/staff-profile/staff1.jpg";

//css
import "./institutedetails.css";
import axios from "axios";



//files
import AboutInstitute from './instituteprofiledata/AboutInstitute';
import OurTeachers from "./instituteprofiledata/OurTeachers";
import Benifits from "./instituteprofiledata/Benifits";
import institutecourseCarousel from "./InstiuteCourseCarousel/institutecourseCarousel";

import Courses from './InstiuteCourseCarousel/institutecourseCarousel';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const InstituteDeatailsPage = () => {
 

  const queryParams = new URLSearchParams(window.location.search);
  const instituterollno = queryParams.get("institute-id")

  //api hooks
  const [crsdetailss, setcrsdetails] = useState([]);

 
  const enroll = (e, _id) => {
    window.location.href = `/checkout?course-id=${_id}`;
  };


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };





    //------------------------------------------------api calls


   


    useEffect(() => {
      axios
      .get(`https://app.5am5pm.com:3000/institute_admin/get_instituteBYID/${instituterollno}`)
      .then((res) => {
        setcrsdetails(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },[])






  return (
    <React.Fragment>
      
      <div>
        
               
        <div style={{ width:'100%',height:'70px'}}>
       
        </div>
       

</div>

    <Grid container spacing={2}>

        {/* spliting 2 main colomns */}



        {/* 1st main column */}
      <Grid item md={8} sm={8} xs={12}>



        {/* getting full width of this 1st main column */}
    <div className="tabscontianerstyle">
        <Grid container>
          <Grid item md={12} sm={12} xs={12}>

          {/* paper tabs */}

          <Paper>


            {/* tabs */}

            <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="About Us" {...a11yProps(0)} />
          <Tab label="Our Teachers" {...a11yProps(1)} />
          <Tab label="Benifits" {...a11yProps(2)} />
          <Tab label="Syllabus" {...a11yProps(2)} /> 
          <Tab label="Admission Process" {...a11yProps(2)} /> 
          <Tab label="Fee" {...a11yProps(2)} /> 
          <Tab label="Projects" {...a11yProps(2)} /> 
          <Tab label="Certificate" {...a11yProps(2)} /> 
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <AboutInstitute/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <OurTeachers/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Benifits/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      Syllabus
      </TabPanel>
      <TabPanel value={value} index={4}>
      Admission Process
      </TabPanel>
      <TabPanel value={value} index={5}>
      Fee
      </TabPanel>
      <TabPanel value={value} index={6}>
      Projects
      </TabPanel>
      <TabPanel value={value} index={7}>
      Certificate
      </TabPanel>
    </Box>



    </Paper>

   
          </Grid>
        </Grid>

        <div className="heightStyle1"></div>



    {/* course carousel */}

    <Grid container>
      <Grid item md={12} sm={12} xs={12}>
        <div>
          <Paper>
          <Courses/>
          </Paper>
        </div>
      </Grid>
    </Grid>



    </div>
       
      </Grid>





















































        {/* 2nd main column */}


         {/* 2nd main column */}
          {/* 2nd main column */}
           {/* 2nd main column */}
            {/* 2nd main column */}

             {/* 2nd main column */}
              {/* 2nd main column */}
               {/* 2nd main column */}
                {/* 2nd main column */}
                
                 {/* 2nd main column */}
            
      <Grid item md={4} sm={4} xs={12}>

        {/* taking full width of the second column */}

    
        <Grid container>
          <Grid item md={12} sm={12} xs={12}>
           
          <div className="tabscontianerstyle">

            <Paper>
           
            <Typography variant="body2" className="secondmaincolumnpaper">"Our aim is simple: We strive to create high-impact, hands-on experiences that prepare students for meaningful and productive careers.”
- Ronnie Screwvala, Co-Founder, upGrad</Typography>

            <div className="secondmaincolumnpaper2">
              <img></img>
            </div>

           
            </Paper>

          </div>
           
          </Grid>
        </Grid>






      </Grid>

      {/* end of second main column */}
       {/* end of second main column */}
        {/* end of second main column */}
         {/* end of second main column */}
          {/* end of second main column */}
           {/* end of second main column */}
            {/* end of second main column */}
             {/* end of second main column */}






























    </Grid>


    </React.Fragment>
  );
};
export default InstituteDeatailsPage;
