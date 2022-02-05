import React from "react";
import {
  Container,
  Grid,
  MenuItem,
  Paper,
  Avatar,
  CardActionArea,
  FormControl,
  TextField,
  Box,
  InputLabel,
  Select,
  Pagination,
  Checkbox,
  FormControlLabel,
  FormGroup,
  CardHeader,
} from "@mui/material";
import Card from "@mui/material/Card";
import { blue, red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";


//slugify

import slugify from "slugify";

//search parms
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";


//react helmet for document title
import {Helmet} from "react-helmet";

//images
import img1 from "../Images/allcourses/Gv.jpg";
import img2 from "../Images/allcourses/Gv1.jpg";
import img3 from "../Images/allcourses/Gv2.jpg";
import img4 from "../Images/allcourses/Gv3.jpg";

//styles
import "./Gridview.css";

//files
import ContactUs from "./Contact_Us";
import Footer from "../Home/Footer/Footer";

//icons
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const GridView = () => {
  //pagination hooks
  const [Page, setPage] = useState(1);

  //page count
  const [pageCount, setPageCount] = useState("");

  //skill filter hooks

  const [CBeginner, setCBeginner] = useState("");
  const [CIntermediate, setIntermediate] = useState("");
  const [CAdvanced, setCAdvanced] = useState("");
  const [CAll, setCAll] = useState("");

  //price hooks

  const [CAllPrice, setCAllPrice] = useState("");
  const [CFree, setCFree] = useState("");
  const [CPaid, setCPaid] = useState("");

  //Subcategory api
  const [CSubCat, setCSubCat] = useState("");

  console.log("filtercat", CPaid, CAllPrice);

  const Gridview = () => {
    window.location.href = "/allcourses/gridView";
  };



  const listview = () => {
    window.location.href = "/allcourses/listview";
  };

  const [coursefeee, setcoursefeee] = useState([]);

  const [coursefeee1, setcoursefeee1] = useState("");

  //api hooks
  const [showcrs, setshowcrs] = useState([]);

  //api call
  useEffect(() => {
    console.log("testing", coursefeee);

    axios
      .post(
        `https://app.5am5pm.com:3000/commonapi/public_course?pageNo=${Page}&size=10`,
       
        {
          subcategory: CSubCat,
          course_fee: coursefeee,
          skill_level: CBeginner,
          CIntermediate,
          CAdvanced,
          CAll,
        }
      )
      .then((res) => {
        setshowcrs(res.data.data);
        setPageCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    Page,
    CBeginner,
    CIntermediate,
    CAdvanced,
    CAll,
    CAllPrice,
    CFree,
    CPaid,
    CSubCat,
    coursefeee,
  ]);

  //categories hooks
  const [cat, setCat] = useState([]);

  useEffect(() => {
    const url = "https://app.5am5pm.com:3000/category/getcategory";
    axios
      .get(url)
      .then((res) => {
        setCat(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //sub cat function and hooks

  //sub cat hooks
  const [subcat, setsubcat] = useState([]);

  const selectedcat = (e, _id) => {
    axios
      .get(`https://app.5am5pm.com:3000/category/getsubcategory/${_id}`)
      .then((res) => {
        setsubcat(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };




      //setting for window title
      const [wtitle,setWtitle] = useState([]);





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

  const booknow = (e, _id) => {
    window.location.href = `/checkout?course-id=${_id}`;
  };

  const skillBeginner = (e) => {
    e.target.checked
      ? setCBeginner((CBeginner) => [...CBeginner, e.target.value])
      : setCBeginner("");
  };

  const skillInter = (e) => {
    e.target.checked ? setIntermediate(e.target.value) : setIntermediate("");
  };

  const skillAdvanced = (e) => {
    e.target.checked ? setCAdvanced(e.target.value) : setCAdvanced("");
  };

  const skillAll = (e) => {
    e.target.checked ? setCAll(e.target.value) : setCAll("");
  };

  //paid

  //testing useEffect

  useEffect(() => {
    setcoursefeee(coursefeee.slice(coursefeee.indexOf(coursefeee1)));
  }, [coursefeee1]);

  useEffect(() => {
    console.log("free", coursefeee);
  }, [coursefeee]);

  const PAll = (e) => {
    e.target.checked
      ? setcoursefeee((coursefeee) => [...coursefeee, e.target.value])
      : setCFree("");
  };

  const PFree = (e) => {
    e.target.checked
      ? setcoursefeee((coursefeee) => [...coursefeee, e.target.value])
      : // setcoursefeee(coursefeee.slice(coursefeee.indexOf(e.target.value)));
        setcoursefeee1(e.target.value);

    console.log("free", coursefeee);
  };

  const PPaid = (e) => {
    e.target.checked
      ? setcoursefeee((coursefeee) => [...coursefeee, e.target.value])
      : // setcoursefeee(coursefeee.slice(coursefeee.indexOf(e.target.value)));
        setcoursefeee1(e.target.value);

    console.log("free", coursefeee);
  };

  //subcat
  const subcatfilter = (e, _id) => {
    if (e.target.checked) {
      // const data = {...CSubCat};
      // data[e.target._id] = e.target.value;
      // setCSubCat(data)

      setCSubCat(e.target.value);
    } else {
      setCSubCat("");
    }
  };




  return (
    <React.Fragment>

{/* helmet for meta tag */}

<Helmet>
            <meta charSet="utf-8" />
                <title>{wtitle}</title>
            </Helmet>

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
                      {cat.map((data) => {
                        return (
                          <MenuItem
                            value={data._id}
                            onClick={(e) => selectedcat(e, data._id)}
                          >
                            {data.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <br></br>

                {/* top courses */}

                <Typography variant="body1" style={{ fontWeight: 900 }}>
                  Top Courses
                </Typography>

                <FormGroup>
                  {subcat.map((data1) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={data1.name}
                            onChange={(e) => subcatfilter(e, data1._id)}
                          />
                        }
                        label={data1.name}
                      />
                    );
                  })}
                </FormGroup>

                <br></br>

                {/* skill set */}

                <Typography variant="body1" style={{ fontWeight: 900 }}>
                  Skill Level
                </Typography>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="Beginner"
                        value={"Beginner"}
                        onChange={(e) => skillBeginner(e)}
                      />
                    }
                    label="Beginner"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="Intermediate"
                        value={"Intermediate"}
                        onChange={(e) => skillInter(e)}
                      />
                    }
                    label="Intermediate"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="Adavnced"
                        value={"Adavnced"}
                        onChange={(e) => skillAdvanced(e)}
                      />
                    }
                    label="Advanced"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="All"
                        value={"Beginner,Intermediate,Adavnced"}
                        onChange={(e) => skillAll(e)}
                      />
                    }
                    label="All"
                  />
                </FormGroup>
                <br></br>
                {/* price */}

                <Typography variant="body1" style={{ fontWeight: 900 }}>
                  Price
                </Typography>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox value={"Free,Paid"} onChange={(e) => PAll(e)} />
                    }
                    label="All"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox value={"Free"} onChange={(e) => PFree(e)} />
                    }
                    label="Free"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox value={"Paid"} onChange={(e) => PPaid(e)} />
                    }
                    label="Paid"
                  />
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
                          variant="filled"
                        >
                          <MenuItem value={10}>Most Rated</MenuItem>
                          <MenuItem value={20}>Most Viewed</MenuItem>
                          <MenuItem value={30}>New Listings</MenuItem>
                          <MenuItem value={30}>High Rated</MenuItem>
                        </Select>
                      </FormControl>
                      &nbsp;
                      {/* <span style={{ cursor: "pointer" }} onClick={Gridview}>
                        <GridViewIcon />
                      </span>{" "}
                      &nbsp;{" "}
                      <span style={{ cursor: "pointer" }} onClick={listview}>
                        <FormatListBulletedIcon />
                      </span>{" "} */}
                      &nbsp;
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </div>

            <br></br>
            {/* courses */}

            <Grid container spacing={2}>
              {showcrs.map((data) => {
                return (
                  <Grid item md={3}>
                   
                      <Grid container spacing={2}>
                        <Grid item md={12}>
                        <Card
                      className="courseContainer"
                      sx={{ width: "100%", height: "350px" }}
                    >
                    
                        <>
                          <img
                            src={data.course_image}
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
                              src={(data.staf_profile_dp) ? data.staf_profile_dp : 'https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805078?k=20&m=587805078&s=612x612&w=0&h=lG42-xD-t1uYYficY4DQmHoACnx739xELZsvpyevLgg='}
                            >
                              R
                            </Avatar> */}

                            <Box sx={{width:'100%',height:'87.5px',p:0,display:'flex',justifyContent:'center'}}>
        <CardHeader style={{paddingBottom:'0',padding:0}}
        titleTypographyProps={{fontSize:'0.983rem',fontWeight:"400",
        lineHeight:"1.375rem", }}
        avatar={
          <Avatar src={data.staf_profile_dp} sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={<span className="cardtitlestyle">{data.course_name}</span>}
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
                              {data.amount == 0
                                ? "FREE"
                                : data.amount}
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
                              onClick={(e) => booknow(e, data._id)}
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
                              onClick={(e) => ViewDetails(e, data._id,data.subcategory,data.course_name)}
                            >
                              VIEW DETAILS
                            </Button>
                          </Box>

                          {/* end of overlay card div */}
                        </div>

                        {/* end of onclick card div */}
                     
                    </Card>
                        </Grid>
                      </Grid>
                 
                  </Grid>
                );
              })}
            </Grid>
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
            <Pagination
              count={pageCount}
              showFirstButton={true}
              showLastButton={true}
              hideNextButton={true}
              hidePrevButton={true}
              defaultPage={Page}
              onChange={(e, value) => setPage(value)}
            />
          </div>
        </Grid>
      </Grid>
      <br></br>
      {/* <ContactUs/> */}
      <Footer />
    </React.Fragment>
  );
};

export default GridView;
