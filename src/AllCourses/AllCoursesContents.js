import React from "react";
import {
  Grid,
  Container,
  Paper,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Link,
  Breadcrumbs,

} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from "@mui/material/styles";
import { withStyles } from "@material-ui/core/styles";

//css
import "./AllCoursesContents.css";

//images
import img1 from "../Images/allcourses/crs.jpg";
import img2 from "../Images/allcourses/crs1.jpg";
import img3 from "../Images/allcourses/Gv.jpg";

//files
import ContactUs from "./Contact_Us";
import axios from "axios";
import Footer from "../Home/Footer/Footer";

//icons
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


const AllCoursesContents = () => {
  const Gridview = () => {
    window.location.href = "/allcourses/gridView";
  };

  function handleClick(event) {
    event.preventDefault();
    
  }

  const listview = () => {
    window.location.href = "/allcourses/listView";
  };

  const viewDetails = (e,_id) => {
    window.location.href = `/course-details?course-id=${_id}`;
  };

  const home = () => {
    window.location.href="/"
  }

  const courses = () => {
    window.location.href="/allcourses/listview"
  }
 

  //hooks for show all course
  const [showcrs, setshowcrs] = useState([]);

  //api call for all course

  useEffect(() => {
    const url = "https://app.5am5pm.com:3000/commonapi/get_public_course_carousel?pageNo=1&size=5";

    axios
      .get(url)
      .then((res) => {
        console.log(res.data.data);
        setshowcrs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  //categories hooks
const[cat,setCat] = useState([]);

useEffect(() => {
  const url = "https://app.5am5pm.com:3000/category/getcategory"
  axios
  .get(url)
  .then((res) => {
    setCat(res.data.data)
  })
  .catch((err) => {
    console.log(err)
  })
},[])


  //sub cat function and hooks



  //sub cat hooks
  const[subcat,setsubcat] = useState([]) 

  const selectedcat = (e,_id) => {
    axios
    .get(`https://app.5am5pm.com:3000/category/getsubcategory/${_id}`)
    .then((res) => {
      setsubcat(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
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
      onClick={courses}
    >
      Courses
    </Link>,
   
  ];

  const CustomColorCheckbox = withStyles({
    root: {
      color: "#13c552",
      "&$checked": {
        color: "#13c552"
      }
    },
    checked: {}
  })((props) => <Checkbox color="default" {...props} />);

  return (
    <React.Fragment>
      <Grid container>
        <div
          style={{ height: "100px", width: "100%" }}
        >
         <div className="bckimg">
           <div className="breadstyle">
         
    
         <Breadcrumbs
        separator={<NavigateNextIcon style={{color:'#fff'}} fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs> 
           </div>
        


         </div>
        </div>
      </Grid>
      <Grid item md={12}></Grid>
      <br></br>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item md={3} sm={3} xs={12}>
            <Paper>
              <div style={{ padding: "25px 25px" }}>
              
              
                <Box sx={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Choose Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Choose Category"
                    >
                       {
            cat.map((data) => {
              return(
                <MenuItem value={data._id} onClick={(e) => selectedcat(e,data._id)}>{data.name}</MenuItem>
              );
            })
          }
                     
                    </Select>
                  </FormControl>
                </Box>
                <br></br>

                {/* top courses */}

                <Typography variant="body1" style={{fontWeight:800}}>Top Courses</Typography>

                <FormGroup>
                  {
                    subcat.map((data1) => {
                      return(
                        <FormControlLabel control={<Checkbox />} label={data1.name} />
                      );
                    })
                  }
                
                 
                </FormGroup>

                <br></br>

                {/* skill set */}

                <Typography variant="body1" style={{fontWeight:800}}>Skill Level</Typography>

                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Beginner" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Intermediate"
                  />
                  <FormControlLabel control={<Checkbox />} label="Advanced" />
                  <FormControlLabel control={<Checkbox />} label="All" />
                </FormGroup>
                <br></br>
                {/* price */}

                <Typography variant="body1" style={{fontWeight:800}}>Price</Typography>

                <FormGroup>
                  <FormControlLabel control={<CustomColorCheckbox />} label="All" />
                  <FormControlLabel control={<Checkbox />} label="Free" />
                  <FormControlLabel control={<Checkbox />} label="Paid" />
                </FormGroup>

                <br></br>

                <div style={{ textAlign: "center" }}>
                  <Button
                    style={{
                      width: "100%",
                      backgroundColor: "#003db3",
                      color: "#fff",
                    }}
                    size="large"
                  >
                    Apply Filter
                  </Button>
                </div>
              </div>
            </Paper>
          </Grid>

          <Grid item md={9} sm={9} xs={12}>
            <div style={{ textAlign: "right" }}>
              <Paper style={{ height: "56px" }}>
                <Grid container>
                  <Grid item md={2}>
                    <div style={{ lineHeight: "56px" }}>
                      <span className="no-of-courses">Showing 1-25 of 72</span>
                    </div>
                  </Grid>

                  <Grid item md={10}>
                    <div style={{ lineHeight: "56px" }}>
                      <span className="shortby">Short By:</span>
                      <FormControl style={{ width: "100px", height: "40px" }}>
                        <InputLabel id="demo-simple-select-label">
                          Short By
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                        >
                          <MenuItem value={10}>Most Rated</MenuItem>
                          <MenuItem value={20}>Most Viewed</MenuItem>
                          <MenuItem value={30}>New Listings</MenuItem>
                          <MenuItem value={30}>High Rated</MenuItem>
                        </Select>
                      </FormControl>
                      &nbsp;{" "}
                      <span style={{ cursor: "pointer" }} onClick={Gridview}>
                        <GridViewIcon/>
                      </span>{" "}
                      &nbsp;{" "}
                      <span style={{ cursor: "pointer" }} onClick={listview}>
                        <FormatListBulletedIcon/>
                      </span>{" "}
                      &nbsp;
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </div>

            <br></br>
            {/* courses */}


            {
                showcrs.map((data) => {
                    return(


                        <Grid container spacing={2}>
                        <Grid item md={12}>
                          <Paper>
                            <Grid container>
                            
                                  <Grid item md={4}>
                                    <div style={{ padding: "10px" }}>
                                      <img
                                        src={data.course_image}
                                        width={"100%"}
                                        height={"300px"}
                                      ></img>
                                    </div>
                                  </Grid>

                         
                    <Grid item md={8}>
                      <div style={{ padding: "10px" }}>
                        <Button variant="outlined" size="small">
                          Design
                        </Button>{" "}
                        &nbsp;{" "}
                        <Button variant="outlined" size="small">
                          Banking
                        </Button>

                        <h4 className="crs-tlt">
                        {data.course_name}  
                        </h4>
                        <i className="crs-by">By</i>&nbsp;
                        <i style={{ color: "#003db3" }}>Tony</i>
                       <div>
                         <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                       </div>
                        <div className="crs-lst">
                          <h2>
                            &#36;<span className="crs-price">149</span>
                            <span style={{ textAlign: "right", width: "100%" }}>
                              <button
                                size="large"
                                className="crs-enrol"
                                onClick={(e) => viewDetails (e,data._id)}
                              >
                                View Details
                              </button>
                            </span>
                          </h2>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

                    );
                })
            }

           
                   






          </Grid>
        </Grid>
      </Container>

      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "25px",
            }}
          >
            <Pagination count={10}
            showFirstButton={true}
            showLastButton={true}
            hideNextButton={true}
            hidePrevButton={true}            
            />
          </div>
        </Grid>
      </Grid>
      <br></br>
      <ContactUs />
     
    </React.Fragment>
  );
};

export default AllCoursesContents;
