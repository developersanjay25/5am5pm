import { Button, Typography, Paper,Container} from "@mui/material";
import * as React from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
// import {
//   Ctitle,
//   CaboutTitle,
//   Cdate,
//   Ctime,
//   Cpay,
//   Camount,
//   Ctitleerr,
//   Ctitletexterr,
//   CaboutTitletexterr,
//   CaboutTitleerr,
//   Cdatetexterr,
//   Ctimetexterr,
//   Ctimeerr,
//   Cdateerr,
// } from "./CourseRecoil";
import {
  Grid,
  TextField,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";

import { activestepp, dynamicformdataa, inputfieldds, sessiondatee, sessiondiscriptionn, sessiontimee, sessiontitlee, triggersend } from './dynamicformatoms';




import {
  CType,
  Ccategory,
  CSub_Category,
  Cvideo,
  CLevel,
  CReviews,
  Ccount,
  Cabout,
  Cinstructor,
  Ctitle,
  CaboutTitle,
  Cdate,
  Ctime,
  Cpay,
  Camount,
  Cimage,
  Cname,
  CSubname,
  Ccategoryerr,
  CcategoryTexterr,
  CSub_Categoryerr,
  CSub_Categorytexterr,
  Cnameerr,
  Cnametexterr,
  CSubnameerr,
  CSubnametexterr,
  Cimagetexterr,
  CLeveltexterr,
  CReviewstexterr,
  Ccounttexterr,
  Cabouttexterr,
  Cinstructortexterr,
  Ctitleerr,
  Ctitletexterr,
  CaboutTitleerr,
  CaboutTitletexterr,
  Cdateerr,
  Ctimeerr,
  CTypeButton,
  CpreLoader,
  nextStep,
  checkfornextStep,
} from "./CourseRecoil";


const Advanceinfo = () => {
  //course title
  const [course_Title, setCourse_Title] = useRecoilState(Ctitle);
  const [course_Titleerr, setCourse_Titleerr] = useRecoilState(Ctitleerr);
  const [course_Titletexterr, setCourse_Titletexterr] =
    useRecoilState(Ctitletexterr);

  const CourseTitle = (e) => {
    setCourse_Title(e.target.value);
  };

  //about title
  const [About_title, setAbout_title] = useRecoilState(CaboutTitle);
  const [About_titleerr, setAbout_titleerr] = useRecoilState(CaboutTitleerr);
  const [About_titletexterr, setAbout_titletexterr] =
    useRecoilState(CaboutTitletexterr);

  const AboutTitle = (e) => {
    setAbout_title(e.target.value);
  };


 //preloader recoil hooks



  //date time
  const [Date_Data, setDate_Data] = useRecoilState(Cdate);
  const [Date_Dataerr, setDate_Datatexterr] = useRecoilState(Cdateerr);

  const dateData = (e) => {
    setDate_Data(e.target.value);
  };

  //time data
  const [time_Data, setTime_Data] = useRecoilState(Ctime);
  const [time_Dataerr, setTime_Dataerr] = useRecoilState(Ctimeerr);

  const TimeData = (e) => {
    setTime_Data(e.target.value);
    console.log(e.target.value);
  };

  //coursePayment
  const [CoursePayment, setCoursePayment] = useRecoilState(Cpay);
  const [CourseAmount, setCourseAmount] = useRecoilState(Camount);

  //is it paid or free
  const [isitPaid, setisitPaid] = useState(true);

  const CoursePaymentType = (e) => {
    setCoursePayment(e.target.value);
    if (e.target.value == "Paid") {
      setisitPaid(false);
    }
    if (e.target.value == "Free") {
      setisitPaid(true);
      setCourseAmount(0);
    }
  };

  //payment

  const amountHandler = (e) => {
    setCourseAmount(e.target.value);
  };


  //next step hooks
  const [neststep,setnextStep] = useRecoilState(nextStep);

  //check for next step

  const[checknxt,setchecknxt] = useRecoilState(checkfornextStep);


// Calling api 

  const [Data1, setData1] = useRecoilState(CType);
  const [Data2, setData2] = useRecoilState(Ccategory);
  const [Data2err, setData2err] = useRecoilState(Ccategoryerr);
  const [Data2texterr, setData2texterr] = useRecoilState(CcategoryTexterr);
  const [Data3, setData3] = useRecoilState(CSub_Category);
  const [Data3err, setData3err] = useRecoilState(CSub_Categoryerr);
  const [Data3texterr, setData3texterr] =
    useRecoilState(CSub_Categorytexterr);
  const [Data4, setData4] = useRecoilState(Cvideo);
  const [Data5, setData5] = useRecoilState(CLevel);
  const [Data6, setData6] = useRecoilState(CReviews);
  const [Data7, setData7] = useRecoilState(Ccount);
  const [Data8, setData8] = useRecoilState(Cabout);
  const [Data9, setData9] = useRecoilState(Cinstructor);
  const [Data10, setData10] = useRecoilState(Ctitle);
  const [Data10err, setData10err] = useRecoilState(Ctitleerr);
  const [Data10texterr, setData10texterr] = useRecoilState(Ctitletexterr);
  const [Data11, setData11] = useRecoilState(CaboutTitle);
  const [Data11err, setData11err] = useRecoilState(CaboutTitleerr);
  const [Data11texterr, setData11texterr] =
    useRecoilState(CaboutTitletexterr);
  const [Data12, setData12] = useRecoilState(Cdate);
  const [Data12err, setData12err] = useRecoilState(Cdateerr);
  const [Data13, setData13] = useRecoilState(Ctime);
  const [Data13err, setData13err] = useRecoilState(Ctimeerr);
  const [Data14, setData14] = useRecoilState(Cpay);
  const [Data15, setData15] = useRecoilState(Camount);
  const [Data16, setData16] = useRecoilState(Cimage);
  const [Data17, setData17] = useRecoilState(Cname);
  const [Data17err, setData17err] = useRecoilState(Cnameerr);
  const [Data17texterr, setData17texterr] = useRecoilState(Cnametexterr);
  const [Data18, setData18] = useRecoilState(CSubname);

  const [activeStep, setActiveStep] = useRecoilState(activestepp);

   //preloader recoil hooks
  const [preloader, setPreloader] = useRecoilState(CpreLoader);
                                  // create multiple sessions
                                  const [sessiontitle , setSessiontitle] = useRecoilState(sessiontitlee);
                                  const [SessionDescription , setSessionDescription] = useRecoilState(sessiondiscriptionn);
                                  const [sessiondate , setSessionDate] = useRecoilState(sessiondatee);
                                  const [sessiontime , setSessionTime] = useRecoilState(sessiontimee);
                                  const [dynamicdata , setDynamicformdata] = useRecoilState(dynamicformdataa);
                                  const [trigger , setTrigger] = useRecoilState(triggersend);
                                  // const [inputFieldsss , setInputFieldsss] = useRecoilState(inputfieldds);
                                  const initialRender = React.useRef(true);
                              
                              
                                  const token = localStorage.getItem("token");
                                  console.log(token);
                              
                                  const [inputFields, setInputFields] = useState([
                                    { id: uuidv4(), SessionTitle: '', SessionDescription: '', date:'', time:'' },
                                  ]);

                                  const newData = null

                                  inputFields.map((data) => {
                                    return (
                                            console.log(data)
                                  
                                    );
                                    
                                  })



                                  React.useEffect(()=>{
                                        if(initialRender.current){
                                         initialRender.current = false;
                                      }
                                      else{
                                        console.log("InputFields", inputFields);
                                        var check = validatedynamicform(inputFields);
                                        if(check)
                                        {
                                          const myarray = [];
                                          const sessionValue = {
                                              "session": myarray
                                          }
                                        for(var i=0;i<inputFields.length;i++){
                                            myarray.push(
                                              {
                                                  "date": inputFields[i].date,
                                                  "time":inputFields[i].time,
                                                  "title": inputFields[i].SessionTitle,
                                                  "about": inputFields[i].SessionDescription,
                                              }
                                            )
                                        }


                                        const token = localStorage.getItem("token");
                                          // if (!Data10) {
                                          //   setData10err(true);
                                          //   setData10texterr("Enter above field");
                                          // } else {
                                          //   setData10err(false);
                                          //   setData10texterr("");
                                          // }
                                    
                                          // if (!Data11) {
                                          //   setData11err(true);
                                          //   setData11texterr("Enter above field title");
                                          // } else {
                                          //   setData11err(false);
                                          //   setData11texterr("");
                                          // }
                                          // if (!Data12) {
                                          //   setData12err(true);
                                          // } else {
                                          //   setData12err(false);
                                          // }
                                    
                                          // if (!Data13) {
                                          //   setData13err(true);
                                          // } else {
                                          //   setData13err(false);
                                          // }
                                    
                                          var mycourseData = new FormData();
                                    
                                          
                                    
                                          mycourseData.append("option", "Course");
                                          mycourseData.append("type", Data1);
                                          mycourseData.append("course_name", Data17);
                                          mycourseData.append("description", Data18);
                                          mycourseData.append("course_fee", Data14);
                                          mycourseData.append("promotional_video", Data4);
                                          mycourseData.append("course_subtitle", Data8);
                                          mycourseData.append("instructional_level", Data5);
                                          mycourseData.append("reviews_ratings", Data6);
                                          mycourseData.append("learners_count", Data7);
                                          mycourseData.append("about_instructor", Data9);
                                          mycourseData.append("course_keywords", "Website");
                                          mycourseData.append("language", "Tamil");
                                          mycourseData.append("amount", Data15);
                                          mycourseData.append("course_image", Data16);
                                          mycourseData.append("category", Data2);
                                          mycourseData.append("subcategory", Data3);
                                          mycourseData.append('session',JSON.stringify(myarray));

                                          // mycourseData.append("option", "Course");
                                          // mycourseData.append("type", "abc");
                                          // mycourseData.append("course_name", "abc");
                                          // mycourseData.append("description", "abc");
                                          // mycourseData.append("course_fee", 'paid');
                                          // mycourseData.append("promotional_video", "abc");
                                          // mycourseData.append("course_subtitle", "abc");
                                          // mycourseData.append("instructional_level", "abc");
                                          // mycourseData.append("reviews_ratings", "abc");
                                          // mycourseData.append("learners_count", "abc");
                                          // mycourseData.append("about_instructor", "abc");
                                          // mycourseData.append("course_keywords", "Website");
                                          // mycourseData.append("language", "Tamil");
                                          // mycourseData.append("amount", '566');
                                          // mycourseData.append("course_image",Data16);
                                          // mycourseData.append("category", "abc");
                                          // mycourseData.append("subcategory","abc");

                                          //console.log('course',typeof(myarray));

                                          // mycourseData.append("session", [{date:'abc',time:'2323',title:'abc',about:'abc'}]);

                                          // const sanjay = (item,index) => {
                                          //   console.log(item,index)
                                          // }

                                        //   for (var pair of mycourseData.entries()) {
                                        //     console.log(pair[0]+ ', ' + pair.forEach(sanjay)                                            ); 
                                        // }
                                    
                                      

                                          // if (dynamicformdata) {\
                                          console.log('course',typeof(myarray),myarray);
                                           
                                            axios
                                              .post(
                                                "https://app.5am5pm.com:3000/course/create_course",
                                                mycourseData,
                                                {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`,
                                                  },
                                                }
                                              )
                                              .then((res) => {
                                                // setPreloader(false);
                                                setchecknxt(!checknxt);
                                                console.log(res);
                                                if (res.data.status == "success") {
                                                setActiveStep((currentStep) => currentStep +1)
                                                }else{
                                                  setchecknxt(false);
                                                }
                                              })
                                              .catch((err) => {
                                                // setPreloader(false);
                                                // setToast(true);
                                                console.log(err.response);
                                                // setToastmessage(err.response.data.message);
                                                console.log(err.response);
                                              });
                                          }
                                    

                                        
                                        // setDynamicformdata(myarray);
                                      
                                      }
                                  },[trigger])
                                
                                const handleSubmit = (e) => {
                                  e.preventDefault();
                                  var check = validatedynamicform(inputFields);
                                if(check)
                                {
                                  console.log("InputFields", inputFields);
                                  const url = "https://app.5am5pm.com:3000/staf/create_session/61e9464474f22961448d5c2f"
                                  const myarray = []
                                  const sessionValue = {
                                      "session": myarray
                                  }
                                for(var i=0;i<inputFields.length;i++){
                                    myarray.push(
                                      {
                                          "date": inputFields[i].date,
                                          "time":inputFields[i].time,
                                          "title": inputFields[i].SessionTitle,
                                          "about": inputFields[i].SessionDescription,
                                      }
                                    )
                                }
                              
                              
                              console.log(sessionValue);
                              
                                  axios
                                  .post(url,
                                     
                                      sessionValue,
                                      
                                       
                                      {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        }
                                      
                                      )
                                  .then((res) => {
                                      console.log(res.data)
                                  })
                                  .catch((err) => {
                                      console.log(err.response)
                                  })
                                }
                              
                                };
                              
                                const handleChangeInput = (id, event) => {
                                  const newInputFields = inputFields.map(i => {
                                    if(id === i.id) {
                                      i[event.target.name] = event.target.value

                                    

                                   

                                 
                                      
                                    }

                                  
                                    return i;
                                  })

                                
                                  
                                  setInputFields(newInputFields);
                                }
                              
                                const handleAddFields = () => {
                                var check =  validatedynamicform(inputFields);
                              
                                if(check)
                                {
                                  setInputFields([...inputFields, { id: uuidv4(),  SessionTitle: '', SessionDescription: '',date:'',time:'' }])
                                }
                              }
                              
                              console.log(SessionDescription);
                              
                              
                              function validatedynamicform(sessionValue,uid) {
                                console.log(sessionValue[0]);
                                var returnvalue;
                              
                                if(sessionValue[sessionValue.length-1].SessionTitle == '')
                                {
                                    returnvalue = false;
                                    setSessiontitle({id : sessionValue[sessionValue.length-1].id, error : true ,errormessage : 'Enter the title'})
                                }
                                else{
                                    returnvalue = true;
                                    setSessiontitle({id : sessionValue[sessionValue.length-1].id, error : false ,errormessage : ''})
                                }
                              
                              
                                if(sessionValue[sessionValue.length - 1].SessionDescription == '')
                                {
                                    returnvalue = returnvalue ? false : false;
                                    setSessionDescription({id : sessionValue[sessionValue.length-1].id, error : true ,errormessage : 'Enter the description'})
                                }
                                else{
                                    returnvalue = returnvalue ? true : false;
                                    setSessionDescription({id : sessionValue[sessionValue.length-1].id, error : false ,errormessage : ''})
                                }
                              
                              
                                
                                if(sessionValue[sessionValue.length-1].date == '')
                                {
                                    returnvalue = returnvalue ? false : false;
                                    setSessionDate({id : sessionValue[sessionValue.length-1].id, error : true ,errormessage : 'Enter the date'})
                                }
                                else{
                                  returnvalue = returnvalue ? true : false;
                                    setSessionDate({id : sessionValue[sessionValue.length-1].id, error : false ,errormessage : ' '})
                                }
                              
                                if(sessionValue[sessionValue.length-1].time == '')
                                {
                                    returnvalue = returnvalue ? false : false;
                                    setSessionTime({id : sessionValue[sessionValue.length-1].id, error : true ,errormessage : 'Enter the Time'})
                                }
                                else{
                                    returnvalue = returnvalue ? true : false;
                                    setSessionTime({id : sessionValue[sessionValue.length-1].id, error : false ,errormessage : ''})
                                }
                              
                              return returnvalue;
                              
                              }
                              
                              console.log(sessiontitle)
                              
                                const handleRemoveFields = id => {
                                  const values  = [...inputFields];
                                  values.splice(values.findIndex(value => value.id === id), 1);
                                  setInputFields(values);
                                }
  return (
    <React.Fragment>
  


                          {/* creating multiple sessions */}




                        <Grid container spacing={4}>

                  <Grid item md={9}>

                          <form onSubmit={handleSubmit}>
        { inputFields.map(inputField => (
          <div key={inputField.id}>

            <Grid container spacing={2}>





            <Grid item md={6}>

            <Box sx={{mb:'10px'}}>
            <Typography variant="p" color="primary">ENTER YOUR SESSION TITLE:</Typography>
            </Box>


          
            <Box
      sx={{
        width: '100%',
       mb:'10px'
      }}
    >
    


    <TextField
      fullWidth 
      name="SessionTitle"
   
      error = {inputField.id == sessiontitle.id ? sessiontitle.error : false}
      helperText = {inputField.id == sessiontitle.id ? sessiontitle.errormessage : ''}
      onChange={event => handleChangeInput(inputField.id, event)}
            />

    </Box>

            </Grid>








            <Grid item md={6}>

            <Box sx={{mb:'10px'}}>
            <Typography variant="p" color="primary">ENTER YOUR SESSION DESCRIPTION:</Typography>
            </Box>


            <Box
      sx={{
        width: '100%',
        mb:'10px'
       
      }}
    >
             <TextField
             fullWidth 
              name="SessionDescription"
           
              error = {inputField.id == SessionDescription.id ? SessionDescription.error : false}
              helperText = {inputField.id == SessionDescription.id ? SessionDescription.errormessage : ''}
              value={inputField.SessionDescription}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
    </Box>

            </Grid>








            <Grid item md={6}>


            <Box sx={{mb:'10px'}}>
            <Typography variant="p" color="primary">ENTER YOUR SESSION DATE:</Typography>
            </Box>
          
            <Box
      sx={{
        width: '100%',
        mb:'10px'
       
      }}
    >
    <TextField
    fullWidth 
    name="date"
    type="date"
    error = {inputField.id == sessiondate.id ? sessiondate.error : false}
    helperText = {inputField.id == sessiondate.id ? sessiondate.errormessage : ''}
    value={inputField.date}
    onChange={event => handleChangeInput(inputField.id, event)}
            />
    </Box>


            </Grid>

            <Grid item md={6}>


          
            <Box sx={{mb:'10px'}}>
            <Typography variant="p" color="primary">ENTER YOUR SESSION TIME:</Typography>
            </Box>


            <Box
      sx={{
        width: '100%',
       
       
      }}
    >
      <TextField
        fullWidth 
        name="time"
        type="time"
        error = {inputField.id == sessiontime.id ? sessiontime.error : false}
        helperText = {inputField.id == sessiontime.id ? sessiontime.errormessage : ''}

value={inputField.time}
onChange={event => handleChangeInput(inputField.id, event)}
            />
    </Box>


            </Grid>

            </Grid>




      <Grid item md={12}>

      <Box sx={{textAlign:'right',mb:'50px'}}>
      <Button variant="contained" color="primary" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
              Remove Session
            </Button> &nbsp; 
            <Button
            variant="contained" color="primary"
              onClick={handleAddFields}
            >
            CREATE ANOTHER SESSION
            </Button> 
            </Box>
      </Grid>


            
          </div>
        )) }

        
        {/* <Button
        
          variant="contained" 
          color="primary" 
          type="submit" 
        //   endIcon={<Icon>send</Icon>}
          onClick={handleSubmit}
        >Send</Button> */}
      </form> 



    




                     
     












             










      </Grid>

        {/* // 2nd section */}




        <Grid item md={3}>
          <Paper elevation={4}>
            <Box
              sx={{
                p: "25px",
                minHeight: "300px",
              }}
            >
              <Typography variant="p"> NOTES : </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
                <Box
                  sx={{
                    textAlign: "center",
                    mb: "25px",
                  }}
                >
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                 
                      <span>
                  
                        <Typography
                          variant="body1"
                          style={{
                            color: "#003db3",
                          }}
                        >
                       
                          MONITIZE YOUR COURSE ?
                        </Typography>
                      </span>
                    </FormLabel>
                    <RadioGroup
                       row
                      onChange={(e) => CoursePaymentType(e)}
                      name="radio-buttons-group"
                    >
                      <br></br>
                      <FormControlLabel
                        value="Paid"
                        control={<Radio />}
                        label="Paid"
                      />
                      &emsp;
                      <FormControlLabel
                        value="Free"
                        control={<Radio />}
                        label="Free"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
              
                      width: "95%",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                  hidden={isitPaid}
                  onChange={(e) => amountHandler(e)}
                >
                  <TextField label="INR" variant="outlined" />
                </Box>
              </Grid>
            
                

    
        </Grid>
      {/* </Grid> */}
    </React.Fragment>
  );
};

export default Advanceinfo;



