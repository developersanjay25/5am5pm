import { Container } from "@mui/material";
import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
import Cardcrs from "./CourseCard";
import "./CourseCard.css";

//slugify

import slugify from "slugify";

//search parms
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";


import {
  Grid,
  Button,
  CardMedia,
  Card,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Avatar,
  CardHeader,
  Stack,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { ClassSharp } from "@mui/icons-material";
import axios from "axios";
import { Box } from "@mui/system";
import Rating from "@mui/material/Rating";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles({
  title: {
    textAlign: "left !important",
  },
});

const Courses = () => {
  //storing courses in the hooks
  const [HomeStoreCourse, setHomeStoreCourse] = useState([]);

  //get all courses

  useEffect(() => {
    const url =
      "https://app.5am5pm.com:3000/commonapi/get_public_course_carousel?pageNo=1&size=20";
    axios
      .get(url)
      .then((res) => {
        if (res) {
          console.log("suceess");
        } else {
          console.log("failed");
        }
        setHomeStoreCourse(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
    { width: 1500, itemsToShow: 5 },
  ];

  const classes = useStyles();
  //rating
  const [value, setValue] = React.useState(4);

  //crs details page
  const ViewDetails = (e, _id,course_name,subcategory) => {
    // const url = `/course-details/webdevelopment/reactcourse/`;
    // const slug = slugify(url,{

    // })
    // window.location.href = `${slug}?course-id=${_id}`
    const url = [];
    url.push(course_name)
    const json = JSON.stringify(url);
  
    const dynamicid = slugify(json,{
      replacement: '-',  // replace spaces with replacement character, defaults to `-`
      remove: true, // remove characters that match regex, defaults to `undefined`
      lower: true,      // convert to lower case, defaults to `false`
      strict: true,     // strip special characters except replacement, defaults to `false`
      locale: 'vi',       // language code of the locale to use
      trim: true         // trim leading and trailing replacement chars, defaults to `true`
    }); 


    const url1 = [];
    url1.push(subcategory)
    const json1 = JSON.stringify(url1);
  
    const testid = slugify(json1,{
      replacement: '-',  // replace spaces with replacement character, defaults to `-`
      remove: true, // remove characters that match regex, defaults to `undefined`
      lower: true,      // convert to lower case, defaults to `false`
      strict: true,     // strip special characters except replacement, defaults to `false`
      locale: 'vi',       // language code of the locale to use
      trim: true         // trim leading and trailing replacement chars, defaults to `true`
    }); 

    window.location.href=`/course-details/${dynamicid}/${testid}/?cid=${_id}`
  };

  //crs purchase
  const booknow = (e, _id) => {
    window.location.href = `/checkout?course-id=${_id}`
  }
  return (
    <React.Fragment>
      <Box sx={{ p: "24px" }}>
        <Typography variant="h2" className={classes.title}>
          STUDENTS ARE VIEWING
        </Typography>
      </Box>

      <Box sx={{ mb: "24px" }}>
        <Carousel
          itemsToScroll={1}
          itemsToShow={4}
          itemPadding={[0, 4]}
          pagination={false}
          breakPoints={breakPoints}
        >
          {HomeStoreCourse.map((courselist) => {
            return (
              <Cardcrs
                number={
                  <div style={{ paddingLeft: "10px" }}>
                    <Card
                      className="courseContainer"
                      sx={{ width: "280px", height: "350px" }}
                    >
                    
                        <>
                          <img
                            src={courselist.course_image}
                            width="100%"
                            height="175px"
                          ></img>
                        </>

                        {/* overlay effect */}
                        <div className="overlay">
                          <div className="avatartextstyle">
                            {/* <Avatar
                              sx={{ bgcolor: red[500] }}
                              aria-label="recipe"
                              src={(courselist.staf_profile_dp) ? courselist.staf_profile_dp : 'https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805078?k=20&m=587805078&s=612x612&w=0&h=lG42-xD-t1uYYficY4DQmHoACnx739xELZsvpyevLgg='}
                            >
                              R
                            </Avatar> */}

                            <Box sx={{width:'100%',height:'87.5px',p:0,display:'flex',justifyContent:'center'}}>
        <CardHeader style={{paddingBottom:'0',padding:0}}
        titleTypographyProps={{fontSize:'0.983rem',fontWeight:"400",
        lineHeight:"1.375rem", }}
        avatar={
          <Avatar src={courselist.staf_profile_dp} sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={<span className="cardtitlestyle">{courselist.course_name}</span>}
        subheader={<span className="cardsubheader">14 Mar 2022 - 18 Mar 2022</span>}
        />
</Box>
                          </div>

                          <Box sx={{width:'100%',height:'87.5px',display:'flex',alignItems:'center'}}>
                           
                           <CardContent style={{paddingTop:'0'}}>
                           <p 
                              style={{
                                margin: 0,
                                fontSize: "20px",
                                lineHeight: "20px",
                              }}
                            >
                              Price
                            </p>
                            <p className="coursecardamount">
                              INR &nbsp;
                              {courselist.amount == 0
                                ? "FREE"
                                : courselist.amount}
                            </p>
                           </CardContent>


                            {/*  */}
                          </Box>

                          <Box
                            sx={{
                             padding:'15px',
                             marginBottom:'15px'
                            }}
                          >
                            <Button
                              size="large"
                              style={{
                                backgroundColor: "#FFAA02",
                                width: "100%",
                              }}
                              variant="contained"
                              onClick={(e) => booknow(e, courselist._id)}
                            >
                              BOOK NOW
                            </Button>
                          </Box>

                          <Box
                            sx={{
                             pl:'15px',
                             pr:'15px',
                             marginBottom:'15px'
                            }}
                          >
                            <Button
                              size="large"
                              variant="outlined"
                              style={{
                                borderColor: "#fff",
                                color: "#fff",
                                width: "100%",
                              }}
                              onClick={(e) => ViewDetails(e, courselist._id,courselist.subcategory,courselist.course_name)}
                            >
                              VIEW DETAILS
                            </Button>
                          </Box>

                          {/* end of overlay card div */}
                        </div>

                        {/* end of onclick card div */}
                     
                    </Card>

                    {/* end of card div */}
                  </div>
                }
              />
            );
          })}
        </Carousel>
      </Box>
    </React.Fragment>
  );
};

export default Courses;
