import { TextField, Grid, Button, Typography, ListItem,Paper } from "@mui/material";
import { Divider } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Menu, List } from "@mui/material";
import { useState } from "react";
import { makeStyles } from '@mui/styles';

//ckeditor

import { CKEditor } from "@ckeditor/ckeditor5-react";

import TextareaAutosize from '@mui/material/TextareaAutosize';



import axios from "axios";

//recoil
import { useRecoilState } from "recoil";
import { Ccategory,CSub_Category,CSub_Categoryerr,CSub_Categorytexterr,Cvideo,CLevel,CReviews,Ccount,Cabout,Cinstructor, Cname, CSubname, CSubnameerr, CSubnametexterr, Cimage, CcategoryTexterr, Ccategoryerr, Cnameerr, Cnametexterr, Cimagetexterr, Cimageerr, CLeveltexterr, CReviewstexterr, Ccounttexterr, Cabouttexterr, Cinstructortexterr } from "./CourseRecoil";


const useStyles = makeStyles({
  courseTitle:{
    fontSize:"0.983rem",
      fontWeight:"400",
      lineHeight:"1.375rem",
      paddingTop:'10px',
      paddingBottom:'5px',
      paddingLeft:'25px',
      color:'#003db3',
  },
  tips:{
    fontSize:"0.75rem",
    fontWeight:"400",
    lineHeight:'22px',
  }
})



const BasicInfo = () => {

  const[getCat,setGetCat] = useRecoilState(Ccategory);
  const[getCaterr,setGetCaterr] = useRecoilState(Ccategoryerr);
  const[getCattexterr,setGetCattexterr] = useRecoilState(CcategoryTexterr);

  const[getsubCat,setsubCat] = useRecoilState(CSub_Category)
  const[getsubCaterr,setsubCaterr] = useRecoilState(CSub_Categoryerr)
  const[getsubCattexterr,setsubCattexterr] = useRecoilState(CSub_Categorytexterr)

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    setGetCat(event.target.value);

  };

  const [age1, setAge1] = React.useState("");

  const handleChange1 = (event) => {
    setAge1(event.target.value);
    setsubCat(event.target.value);
    console.log(event.target.value);
  };

  //category hooks
  const [Cat, setCat] = React.useState([]);

  //sub cat hooks
  const [SubCat, setSubCat] = React.useState({});

  //sub cat id function
  const getSubCarId = (e, _id) => {
    e.preventDefault();
    setSubCat(_id);
  };

  //subCategory Hooks
  const [SubCategory, setSubCategory] = React.useState([]);

  //get Category api calling

  React.useEffect(() => {
    axios
      .get("https://app.5am5pm.com:3000/category/getcategory")
      .then((res) => {
        setCat(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //get SubCategory api calling

  React.useEffect(() => {
    axios
      .get(`https://app.5am5pm.com:3000/category/getsubcategory/${SubCat}`)
      .then((res) => {
        setSubCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [SubCat]);



  //file upload handler
  const[uploadImage,setUploadImage] = useRecoilState(Cvideo);

  const fileUploadHandler = (e) => {
    setUploadImage(e.target.files[0]);
  }

  //instructional level
  const[instructional_level,setInstructional_level] = useRecoilState(CLevel);
  const[instructional_leveltexterr,setInstructional_leveltexterr] = useRecoilState(CLeveltexterr);

  const Instructional_lvl = (e) => {
    setInstructional_level(e.target.value);
  }

  //reviews and ratings
  const[Reviews_Ratings,setReviews_Ratings] = useRecoilState(CReviews);
  const[Reviews_Ratingstexterr,setReviews_Ratingstexterr] = useRecoilState(CReviewstexterr);

  const reviews_Ratings = (e) => {
    setReviews_Ratings(e.target.value);
  }

  //show learners count
  const[ShowLeanersCount,setShowLearnersCount] = useRecoilState(Ccount)
  const[ShowLeanersCounttexterr,setShowLearnersCounttexterr] = useRecoilState(Ccounttexterr)

  const LeanersCount = (e) => {
    setShowLearnersCount(e.target.value);
  }

  //about course
  const[AboutCourse,setAboutCourse] = useRecoilState(Cabout)
  const[AboutCoursetexterr,setAboutCoursetexterr] = useRecoilState(Cabouttexterr)

  const aboutCourse = (e,editor) => {
    // const courseData = editor.getData();
    setAboutCourse(e.target.value);
    console.log(e.target.value);
  }

  //about instructor
const[AboutInstructor,setAboutInstructor] = useRecoilState(Cinstructor)
const[AboutInstructortexterr,setAboutInstructortexterr] = useRecoilState(Cinstructortexterr)

  const aboutInstructor = (e) => {
    // const InstructorData = editor.getData();
    setAboutInstructor(e.target.value);
  }

  //course name
  const[CrsName,setCrsName] = useRecoilState(Cname);
  const[CrsNameerr,setCrsNameerr] = useRecoilState(Cnameerr);
  const[CrsNametexterr,setCrsNametexterr] = useRecoilState(Cnametexterr);

  const CourseName = (e) => {
    setCrsName(e.target.value);
  }

  //sub-course-name
  const[CrsSubName,setCrsSubName] = useRecoilState(CSubname);
  const[CrsSubNameerr,setCrsSubNameerr] = useRecoilState(CSubnameerr);
  const[CrsSubNametexterr,setCrsSubNametexterr] = useRecoilState(CSubnametexterr);

  const CourseSubName = (e) => {
    setCrsSubName(e.target.value);
  }

  //image upload
  const[imguploadHandler,setimguploadHandler] = useRecoilState(Cimage);
  const[imguploadHandlertexterr,setimguploadHandlertexterr] = useRecoilState(Cimagetexterr)

  const imageUploadHandler = (e) => {
    setimguploadHandler(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  const classes = useStyles();










  //tips content











  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
          <Box sx={{pb:'25px',textAlign:'center'}}>
          <Typography className={classes.courseTitle} style={{color:'#222'}}>BASIC INFORMATION</Typography>
          </Box>
        </Grid>
      </Grid>

    <Grid container spacing={2}>

      <Grid item md={9}>
        <Paper elevation={2}>



      <Grid container>
              <Grid item md={12} sm={12} xs={12}>
                <Typography className={classes.courseTitle}>ENTER THE NAME OF YOUR COURSE:</Typography>
                <div style={{textAlign:'center'}}>
              <Box
                    component="form"
                    sx={{
                    '& > :not(style)': {mb:'10px', width: '95%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onChange={(e) => CourseName (e)}

                    >

                <TextField  variant="outlined" error={CrsNameerr} helperText={CrsNametexterr} />

                </Box>
                </div>
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
              <Typography className={classes.courseTitle}>ENTER THE DESCRIPTION OF YOUR COURSE:</Typography>
              <div style={{textAlign:'center'}}>
              <Box
                    component="form"
                    sx={{
                    '& > :not(style)': { mb:'10px', width: '95%'},
                    }}
                    noValidate
                    autoComplete="off"
                    onChange={(e) => CourseSubName (e)}
                    >
                <TextField  variant="outlined" error={CrsSubNameerr} helperText={CrsSubNametexterr}/>
                </Box>
                </div>
              </Grid>



        </Grid>

        <Grid container>
        <Grid item md={12} sm={12} xs={12}>
        <Typography className={classes.courseTitle}>SELECT YOUR COURSE CATEGORY:</Typography>
          <div style={{textAlign:'center'}}>
            <FormControl variant="outlined" sx={{ mb:'10px',width: '95%' }}>
              <InputLabel>
                Category
              </InputLabel>
              <Select
              value={age}
              onChange={handleChange}
              error={getCaterr}
              helperText={getCattexterr}
              label="Category">
                <MenuItem style={{display:'block',color:'#003db3',fontSize:'16px',paddingLeft:'10px'}} value="">
                  <em>None</em>
                </MenuItem>

                {Cat.map((x) => (
                  <MenuItem style={{display:'block',color:'#003db3',fontSize:'16px',paddingLeft:'10px'}}
                    value={x.name}
                    onClick={(e) => getSubCarId(e, x._id)}
                  >
                    {x.name}

                  </MenuItem>
                ))}

              </Select>
            </FormControl>
          </div>

        </Grid>

        <Grid item md={12} sm={12} xs={12}>
        <Typography className={classes.courseTitle}>SELECT THE SUB-CATEGORY OF YOUR COURSE:</Typography>
          <div style={{textAlign:'center'}}>
            <FormControl variant="outlined" sx={{ mb:'10px',width: "95%" }}
                error={getsubCaterr}
                helperText={getsubCattexterr}
            >
              <InputLabel>
                Sub-Category
              </InputLabel>
              <Select
              value={age1}
              onChange={(e) => handleChange1 (e)}
              label="Sub-Category"
              >
                <MenuItem style={{display:'block',color:'#003db3',fontSize:'16px',paddingLeft:'10px'}} value="">
                  <em>None</em>
                </MenuItem>
                {SubCategory.map((y) => (
                  <MenuItem style={{display:'block',color:'#003db3',fontSize:'16px',paddingLeft:'10px'}} value={y.name}>{y.name}</MenuItem>
                ))}
              </Select>




            </FormControl>
          </div>
        </Grid>
      </Grid>
      <br></br>


      {/* 2nd row */}





      {/* 3rd row */}
      <Divider />
      <div style={{ height: "20px" }}></div>
      <Grid container>
        <Grid item md={12}>
          <div style={{ textAlign: "center" }}>
            <Typography variant="body1" style={{ color: "#003db3" }}>
              UPLOAD SAMPLE VIDEO
            </Typography>
          </div>
        </Grid>
        <div style={{ height: "30px" }}></div>
        <Grid item md={12}>
          <div style={{ textAlign: "center" }}>
            <TextField type="file" onChange={(e) => fileUploadHandler (e)}></TextField>

          </div>
        </Grid>
      </Grid>
      <br></br>
      <Divider />
      <div style={{ height: "20px" }}></div>




      {/* 3rd row */}
      <Divider />
      <div style={{ height: "20px" }}></div>
      <Grid container>
        <Grid item md={12}>
          <div style={{ textAlign: "center" }}>
            <Typography variant="body1" style={{ color: "#003db3" }}>
              UPLOAD IMAGE FOR THE COURSE
            </Typography>
          </div>
        </Grid>
        <div style={{ height: "30px" }}></div>
        <Grid item md={12}>
          <div style={{ textAlign: "center" }}>
            <TextField type="file" onChange={(e) => imageUploadHandler (e)}></TextField>
            <Typography style={{color:'red'}}>{imguploadHandlertexterr}</Typography>
          </div>
        </Grid>
      </Grid>
      <br></br>
      <Divider />
      <div style={{ height: "20px" }}></div>


      {/* part3 */}

      <Grid container>
        <Grid item md={4}>
          <div style={{ textAlign: "center" }}>
            <Typography className={classes.courseTitle}>
              INSTRUCTIONAL LEVEL
            </Typography>
          </div><br></br>
          <div style={{ textAlign: "center" }}>
            <FormControl component="fieldset">

              <RadioGroup
                onChange={(e) => Instructional_lvl (e)}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Beginner"
                  control={<Radio />}
                  label="Beginner"
                /><br></br>
                <FormControlLabel
                  value="Intermediate"
                  control={<Radio />}
                  label="Intermediate"
                /><br></br>
                   <FormControlLabel
                  value="Advanced"
                  control={<Radio />}
                  label="Advanced"
                />
              </RadioGroup>
              <Typography style={{color:'red'}}>{instructional_leveltexterr}</Typography>
            </FormControl>
          </div>
        </Grid>

        <Grid item md={4}>


        <div style={{ textAlign: "center" }}>
            <Typography className={classes.courseTitle}>
              REVIEWS & RATINGS
            </Typography>
          </div><br></br>
          <div style={{ textAlign: "center" }}>
            <FormControl component="fieldset">

              <RadioGroup
                onChange={(e)=>reviews_Ratings(e)}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes"
                /><br></br>
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
              <Typography style={{color:'red'}}>{Reviews_Ratingstexterr}</Typography>
            </FormControl>
          </div>


        </Grid>

        <Grid item md={4}>




        <div style={{ textAlign: "center" }}>
            <Typography className={classes.courseTitle}>
                SHOW LEANERS COUNT
            </Typography>
          </div>
          <br></br>
          <div style={{ textAlign: "center" }}>
            <FormControl component="fieldset">

              <RadioGroup
                onChange={(e) => LeanersCount (e)}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes"
                /><br></br>
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
              <Typography style={{color:'red'}}>{ShowLeanersCounttexterr}</Typography>
            </FormControl>
          </div>


        </Grid>
      </Grid>

                      {/* part 4 */}

                      <br></br>

            <Grid container>
              <Grid item md={12}>
                <div style={{textAlign:'center'}}>
                <Typography className={classes.courseTitle}>ABOUT THE COURSE</Typography>
                <br></br>
                </div>
              </Grid>
                  <Grid item md={12} xs={12}>
                      <div style={{justifyContent:'center',display:'flex'}}>

                      <Box sx={{width:'95%'}}>
              {/* <CKEditor

                // editor={ClassicEditor}
                config={{
                  toolbar: [
                    "heading",
                    "bold",
                    "italic",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "fontColor",
                    "fontBackgroundColor",
                    "code",
                    "uploadImage",
                    "link",
                    "sourceEditing"
                  ],

                  ckfinder: {
                    uploadUrl:
                      "https://app.5am5pm.com:3000/super_admin/ckeditoruploads",
                  },
                }}
                data="About The Course"
                onReady={(editor) => {
                  console.log(editor)
                  // You can store the "editor" and use when it is needed.
                  //console.log( 'Editor is ready to use!', editor );
                }}

                onChange={(event,editor)=>aboutCourse(event,editor)}

              /> */}

<TextareaAutosize
      aria-label="minimum height"
      minRows={10}
      placeholder="About The Course"
      style={{ width: '100%' }}

      onChange={(e)=>aboutCourse(e)}
    />

                </Box>




                      </div>
                      <Typography style={{color:'red'}}>{AboutCoursetexterr}</Typography>
                  </Grid>
            </Grid>

                    <div style={{height:'20px'}}>
                    </div>

                    {/* part 5 */}

                    <Grid container>
                      <Grid item md={12}>
                        <div style={{textAlign:'center'}}>
                        <Typography className={classes.courseTitle}>ABOUT THE INSTRUCTOR</Typography>
                        <br></br>
                        </div>
                      </Grid>

                      <div style={{height:'30px'}}></div>


                  <Grid item md={12}>
                  <div style={{justifyContent:'center',display:'flex'}}>

                <Box sx={{mb:'10px',width:'95%'}}>


{/* 
<CKEditor
                // editor={ClassicEditor}
                config={{
                  toolbar: [
                    "heading",
                    "bold",
                    "italic",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "fontColor",
                    "fontBackgroundColor",
                    "code",
                    "uploadImage",
                    "link",
                    "sourceEditing"

                  ],

                  ckfinder: {
                    uploadUrl:
                      "https://app.5am5pm.com:3000/super_admin/ckeditoruploads",
                  },
                }}
                data="About The Instructor"
                onReady={(editor) => {
                  console.log(editor)
                  // You can store the "editor" and use when it is needed.
                  //console.log( 'Editor is ready to use!', editor );
                }}

                onChange={(event,editor)=>aboutInstructor(event,editor)}

              /> */}


              
<TextareaAutosize
      aria-label="minimum height"
      minRows={10}
      placeholder="About The Instructor"
      style={{ width: '100%' }}
      onChange={(e)=>aboutInstructor(e)}
    />



</Box>







                      </div>
                      <Typography style={{color:'red'}}>{AboutInstructortexterr}</Typography>
                  </Grid>
            </Grid>






                </Paper>

      </Grid>

































                {/* notes container */}

      <Grid item md={3}>
        <Paper>
          <Box sx={{p:'25px',width:'100%',minHeight:'400px'}}>
          <Typography varaint="h3">NOTES:</Typography>
          <Typography classNamer={classes.tips}></Typography>
          </Box>
        </Paper>

      </Grid>
    </Grid>





      <br></br>
      <br></br>


    </React.Fragment>
  );
};

export default BasicInfo;
