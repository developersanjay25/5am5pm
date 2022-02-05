import React from "react";

//material ui
import { Container, Divider, Grid,Box, Paper, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'

//search parms
import { useSearchParams } from "react-router-dom";


//files
import TeacherCarousel from "./TeacherCarousel";


//material iocns
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

//images
import img1 from "../Images/staff-profile/staff1.jpg";

//css
import "./CourseOverview.css";
import axios from "axios";

const CourseOverview = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const CourseId = queryParams.get("cid");


//   const [searchParams, setSearchParams] = useSearchParams();
// searchParams.get("course-id")

//  console.log("hello",searchParams);

  //api hooks
  const [crsdetailss, setcrsdetails] = useState([]);

  //api call
  useEffect(() => {
    axios
      .get(
        `https://app.5am5pm.com:3000/commonapi/checkout_courseBYID/${CourseId}`
      )
      .then((res) => {
        console.log("omg", res.data.data);
        setcrsdetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const enroll = (e, _id) => {
    window.location.href = `/checkout?course-id=${_id}`;
  };

  return (
    <React.Fragment>
      <div style={{width:'100%',height:'25px'}}></div>
     {
       crsdetailss.map((data2) => {
         return(

          <div style={{margin:'15px'}}>
            <Grid container spacing={2}>
              {/* 1st half */}
              <Grid item md={8} sm={8} xs={12}>
                <Paper style={{borderRadius:0}} elevation={4}>

                  {/* talking full width in paper */}



                  {/* course title */}
                  
                  <Grid container>
                  <Grid item md={12} sm={12} xs={12}>
                  <div className="heightStyle1"></div>
                  <Typography variant="h6" className="coursetitlestyle">Course Overview</Typography>
                 

                  <Typography variant="subtitle1" className="courseOverviewstyle">
                  <p>{ReactHtmlParser(data2.course_subtitle)}</p>
                  </Typography>
                  </Grid>

                  {/* 2nd title */}
                  
                  <Grid item md={12}>
                  <Typography variant="h6" className="coursetitlestyle">Requirements</Typography>
                  </Grid>
                 

                  {/* 2nd title contanet */}

                  <Grid item md={12} sm={12} xs={12}>
                  <div style={{padding:'18px'}}>
                  <Typography variant="subtitle1"><span style={{color:'#003db3'}}>&#10004;</span> &nbsp;At vero eos et accusamus et iusto odio dignissimos ducimus</Typography>
                  <div className="headingStyle2"></div>

                  <Typography variant="subtitle1"><span style={{color:'#003db3'}}>&#10004;</span> &nbsp;At vero eos et accusamus et iusto odio dignissimos ducimus</Typography>
                  <div className="headingStyle2"></div>

                  <Typography variant="subtitle1"><span style={{color:'#003db3'}}>&#10004;</span> &nbsp;At vero eos et accusamus et iusto odio dignissimos ducimus</Typography>
                  <div className="headingStyle2"></div>

                  <Typography variant="subtitle1"><span style={{color:'#003db3'}}>&#10004;</span> &nbsp;At vero eos et accusamus et iusto odio dignissimos ducimus</Typography>
                  <div className="headingStyle2"></div>

                  <Typography variant="subtitle1"><span style={{color:'#003db3'}}>&#10004;</span> &nbsp;At vero eos et accusamus et iusto odio dignissimos ducimus</Typography>
                  <div className="headingStyle1"></div>

                  </div>
                  </Grid>

                  </Grid>


                </Paper>



                <div className="heightStyle1"></div>


                {/* taking full width 2nd half in 1st half */}
                {/* 2nd paper */}
                <Paper elevation={4} style={{borderRadius:0}}>
                  <div style={{padding:'18px'}}>
                  <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="h6" className="coursetitlestyle">Course Circullum</Typography>
                  </Grid>

                {/* 2nd line in 2nd paper */}

                  <div className="heightStyle1"></div>
                  <Grid item md={12} sm={12} xs={12}>


          {/* accordin 1 */}

        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
       
          <Typography>How To Learn Web Development Step by Step</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

          <div className="heightStyle1"></div>
          {/* accordin 2 */}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How To Learn Web Development Step by Step</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <div className="heightStyle1"></div>
          {/* accordin 3 */}

          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How To Learn Web Development Step by Step</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <div className="heightStyle1"></div>
          {/* accordin 4 */}

          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How To Learn Web Development Step by Step</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      

                  </Grid>


                  </div>
                </Paper>

                <div className="heightStyle1"></div>


                {/* 3rd paper */}

                <Paper elevation={6} style={{borderRadius:0}}>

                {/* carousel */}

              <div className="heightStyle1"></div>
                <TeacherCarousel staffname={data2.staf_name}/>

                </Paper>











              </Grid>





















































































































              {/* 2nd half */}
               {/* 2nd half */}
                {/* 2nd half */}
                 {/* 2nd half */}
                  {/* 2nd half */}
                   {/* 2nd half */}
                    {/* 2nd half */}
                     {/* 2nd half */}
                      {/* 2nd half */}
                       {/* 2nd half */}
                        {/* 2nd half */}
                         {/* 2nd half */}
                          {/* 2nd half */}
                           {/* 2nd half */}
                            {/* 2nd half */}
                             {/* 2nd half */}
                              {/* 2nd half */}
                               {/* 2nd half */}
                                {/* 2nd half */}

                                 {/* 2nd half */}
                                  {/* 2nd half */} {/* 2nd half */}
                                   {/* 2nd half */}












              <Grid item md={4} sm={4} xs={12}>
              
              <Paper style={{borderRadius:0}} elevation={4}>

             
              {/* taking full width in 2nd half */}

              <div style={{padding:'18px'}}>
              <Grid container>

                {/* 1st line */}

              <Grid item md={12} sm={12} xs={12}>
              <Typography variant="h3" className="CourseamountStyle">&#8377;{data2.amount} &nbsp;<span className="strikedvalue">&#8377;<s>1599</s></span></Typography>
              </Grid>
              <div className="heightStyle2"></div>
              <Divider style={{width:'100%'}}/>
              
              {/* 2nd line */}
              
              <Grid item md={12} sm={12} xs={12}>
              <div className="heightStyle2"></div>
              <Typography variant="h6">This Course Include:</Typography>
              <div className="heightStyle2"></div>
              <Typography variant="subtitle1" className="thiscourseinclude">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </Typography>
              </Grid>

              {/* 3rd line */}

              <div className="heightStyle2"></div>
              <Grid item md={6} sm={6} xs={6}>
              <Box className="studentsEnrolled">
              <Typography variant="p"> <PeopleAltOutlinedIcon/> &nbsp; Student Enrolled:</Typography>
              </Box>
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
              <div style={{textAlign:'right'}}>
              <Typography variant="p">1740</Typography>
              </div>
              </Grid>


                {/* 4th line */}

                <div className="heightStyle2"></div>
              <Grid item md={6} sm={6} xs={6}>
              <div style={{textAlign:'left'}}>
              <Typography variant="p"> <PeopleAltOutlinedIcon/> &nbsp; Topic</Typography>
              </div>
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
              <div style={{textAlign:'right'}}>
              <Typography variant="body1">{data2.subcategory}</Typography>
              </div>
              </Grid>


                {/* 5th line */}

                <div className="heightStyle2"></div>
              <Grid item md={6} sm={6} xs={6}>
              <div style={{textAlign:'left'}}>
              <Typography variant="p"> <PeopleAltOutlinedIcon/> &nbsp; Quizzes</Typography>
              </div>
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
              <div style={{textAlign:'right'}}>
              <Typography variant="p">4</Typography>
              </div>
              </Grid>


                {/* 6th line */}

                <div className="heightStyle2"></div>
              <Grid item md={6} sm={6} xs={6}>
              <div style={{textAlign:'left'}}>
              <Typography variant="p"> <PeopleAltOutlinedIcon/> &nbsp; Class</Typography>
              </div>
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
              <div style={{textAlign:'right'}}>
              <Typography variant="p">10 sessions</Typography>
              </div>
              </Grid>




               {/* 7th line */}

               <div className="heightStyle2"></div>
              <Grid item md={6} sm={6} xs={6}>
              <div style={{textAlign:'left'}}>
              <Typography variant="p"> <PeopleAltOutlinedIcon/> &nbsp; Skill Level:</Typography>
              </div>
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
              <div style={{textAlign:'right'}}>
              <Typography variant="p">{data2.instructional_level}</Typography>
              </div>
              </Grid>



              {/* 8th line */}
              <div className="heightStyle1"></div>
              <Grid item md={12} sm={12} xs={12}>
              <Typography variant="h6">Others include:</Typography>
              </Grid>

              {/* 9th line */}
              <div className="heightStyle1"></div>
              <Grid item md={12}>
              <Typography variant="body1"><CheckCircleIcon style={{color:'#003db3'}}/>Full lifetime access</Typography>
              </Grid>


              {/* 10th line */}
              <div className="heightStyle2"></div>
              <Grid item md={12}>
              <Typography variant="body1"><CheckCircleIcon style={{color:'#003db3'}}/>downloadable resources Available</Typography>
              </Grid>

              {/* 11 th line */}
              <div className="heightStyle2"></div>
              <Grid item md={12}>
              <Typography variant="body1"><CheckCircleIcon style={{color:'#003db3'}}/>Certificate of completion</Typography>
              </Grid>


              {/* enroll now button */}
              <div className="heightStyle2"></div>
              <Grid item md={12}>
                <div style={{textAlign:'center'}}>
              <Button variant="contained"
               size="large" 
               className="enrollbtnstyle"
               disableElevation
               onClick={(e) => enroll (e,data2._id) }
               >Enroll Now &nbsp;{'>'}</Button>
               </div>
              </Grid>



              </Grid>


              </div>
              </Paper>



            


              </Grid>
            </Grid>
          </div>



         );
       })
     }
     <div style={{width:'100%',height:'25px'}}></div>
    </React.Fragment>
  );
};
export default CourseOverview;
