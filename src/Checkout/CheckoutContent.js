
import React from "react";

//material 
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Grid, Paper, Divider, Button,Box, AccordionActions, TextField } from "@mui/material";
import { useState, useEffect } from "react";


//styles
import './Checkoutcontent.css';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CheckoutLogin from './CheckoutLogin';
import CheckoutSignup from "./CheckoutSignup";
import CheckoutUsers from "./CheckoutUsers";

//files
import Footer from '../Home/Footer/Footer';

//material icons
import SummarizeIcon from '@mui/icons-material/Summarize';

//css
import './Checkoutcontent.css';

//recoil
import { useRecoilState } from "recoil";
import {useryes,userotpverify,initialverify} from './CheckoutRecoil';
import axios from "axios";

//new accordin recoil hooks
import {step1,step1_1,ExeStep2,PaymentStep3} from './CheckoutRecoil';
import { borderRadius } from "@mui/system";

const CheckoutContent = () => {

  const queryParams = new URLSearchParams(window.location.search);
  const Courseid = queryParams.get("course-id");


  //hooks
  const [data1,setdata1] = useState([]);

  //api call for payment
  useEffect(() => {
    axios
    .get(`https://app.5am5pm.com:3000/commonapi/checkout_courseBYID/${Courseid}`)
    .then((res) => {
      setdata1(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])




  console.log("url",Courseid)

    const userRole = localStorage.getItem('role');
    const userToken = localStorage.getItem('token');

    //islogged in hooks
    const[isuserLogged,setisuserLogged] = useRecoilState(initialverify);

    console.log(isuserLogged);

    //recoil hooks
    const[itsverified,setitsverified] = useRecoilState(userotpverify)

  useEffect(() => {
    if(userRole == 'Student' && userToken){
      setisuserLogged(true)
      setitsverified(false)
    }else{
      setisuserLogged(false)
      setitsverified(true)
    }
  },[])



    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    
    //yes or no hooks
    const[isYes,setisYes] = useRecoilState(useryes);
    

    //yes or no handler
    const yesornoHandler = (e) => {
      if(e.target.value == 'yes'){
        setisYes(true)
      }else{
        setisYes(false)
      }
    }

   
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// const userRole = localStorage.getItem("role");
//   const userToken = localStorage.getItem("token");



  const [coursedetails, setcourseDetails] = useState([]);
  const [courseFee,setCourseFee] = useState([]);
  const [courseamount,setcourseamount] = useState([]);
  const [institute_identification, setinstituteIdentification] = useState([]);
  const [CourseName, setCourseName] = useState([]);
  const [courseId, setcourseId] = useState([]);

  

useEffect(() => {
  if(userRole == 'Student' && userToken){
      axios.get("https://app.5am5pm.com:3000/commonapi/getpubliccourseById/" + Courseid)
      .then((res) => {
          if(res.data.status == "success"){
              console.log(res.data.data[0])
              setcourseamount(res.data.data[0].amount);
              setcourseDetails(res.data.data[0].course_fee);
              setinstituteIdentification(res.data.data[0].institute_id);
              setCourseFee(res.data.data[0].course_fee);
              setCourseName(res.data.data[0].course_name);
              setcourseId(res.data.data[0]._id);
          }else{
              window.alert("please try again later !");
          }
      })
      .catch((err) => {
          console.log(err)
      })
  }
},[])


const [isCourse,setisCourse] = useState([]);
const [CourseMessage, setCourseMessage] = useState([]);


const [Order_amount,setOrder_amount] = useState([]);
const [Order_currency,setOrder_currency] = useState([]);
const [Order_order_id,setOrder_order_id] = useState([]);
const [Order_institute_id, setOrder_institute_id] = useState([]);
const [Order_course_id,setOrder_course_id] = useState([]);
const [Order_receipt,setOrder_receipt] = useState([]);





const token = userToken;

const paymentGateway = () => {

  


  const data = {
      amount: courseamount,
      institute_id: institute_identification,
      course_id: courseId,
      course_fee: courseFee,
      course_name: CourseName,
  }

  
  const apiurl = "https://app.5am5pm.com:3000/payment/purchase_payment";
   
  axios
  .post(apiurl,data,{ headers: {"authorization" : `Bearer ${token}`} })
  .then((res) => {
    if(res.data.status == "success" && res.data.message == "paid"){
          setOrder_amount(res.data.data.amount)
          setOrder_currency(res.data.data.currency)
          setOrder_order_id(res.data.data.id)
          setOrder_institute_id(res.data.data.notes.institute_id)
          setOrder_course_id(res.data.data.notes.course_id)
          setOrder_receipt(res.data.data.receipt)
          displayRazorpay(res.data.data);
      }else if(res.data.status == "success" && res.data.message == "free"){
          courseFree();
      }
      else{
          window.alert("please try again later")
      }
  })
  .catch((err) => {
      console.log(err)
  })

}



const courseFree = () => {
  window.location.href = "/app/studentdashboard";
}

  
  
    async function displayRazorpay(data) {

      console.log("checkingData",data.notes.course_name)
 

      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      let token = localStorage.getItem("token")

      // creating a new order
      
  
      const options = {
        key: "rzp_test_LlNbRaLp6AdCf2", // Enter the Key ID generated from the Dashboard
        amount: data.amount,
        currency: data.currency,
        name: "Iaaxin Tech Labs.",
        description: "Test Transaction",
        order_id:data.id,
        handler: async function (response) {
          const OrderCreatingdata = {
            orderCreationId: data.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            institute_id:data.notes.institute_id,
            course_id:data.notes.course_id,
            receipt:data.receipt,
            amount:data.amount,
            course_name:data.notes.course_name
          };

         

          await axios
            .post("https://app.5am5pm.com:3000/payment/purchase_verify", OrderCreatingdata,{ headers: {"authorization" : `Bearer ${token}`} })
            .then((result) => {
              console.log(result.data);
             const paymentResult = result.data.status;
              if(paymentResult == "success"){
                window.location.href="/app/studentdashboard";
              }
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        },
        prefill: {
          name: "Iaaxin",
          email: "Iaaxin@Iaaxin.com",
          contact: "+911111111111",
        },
        notes: {
          address: "Iaaxin Tech Labs",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

}

//continue btn hooks
const[continue1accord,setcontinue1accord] = useRecoilState(step1);
const[continue2accord,setcontinue2accord] = useRecoilState(step1_1);
const[paymentaccord,setpaymentaccord] = useRecoilState(PaymentStep3)

const[existingUser,setexistingUser] = useRecoilState(ExeStep2);


const continuebtn = () => {
  
  if(userRole && userToken){
    setpaymentaccord(true);
    setcontinue1accord(false);
  }else{
    setcontinue1accord(false);
    setcontinue2accord(true);
  }
  
}

const continueEditbtn = () => {
  setcontinue1accord(true)
  setcontinue2accord(false)
}

const existingEdit = () => {
  setcontinue2accord(true);
  setcontinue1accord(false);
}

const existingUserLogin = () => {
  setisYes(true);
}

const existingUserSignup = () => {
  setisYes(false);
}

    

    return(
        <React.Fragment>

          {
            data1.map((data) => {
              return(

                <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item md={8}>
                   
                        <div style={{padding:'10px'}}>
                        <div>
                            <div style={{height:'30px'}}></div>
      <Accordion disabled={false} expanded={continue1accord} onChange={handleChange('panel1')}>
          
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
         

          <Grid container spacing={6}>
          <Grid item md={4}>
          <Typography variant="h6" style={{textAlign:'left'}}>Course Summary</Typography>
          </Grid>
          <Grid item md={4}>
          <Typography variant="h6" style={{textAlign:'left'}}>Course Title</Typography>
          </Grid>
          <Grid item md={3}>
          <Typography variant="h6" style={{textAlign:'left'}}>Course Price</Typography>
         
          </Grid>
          <Grid item md={1}>
            <Typography variant="button" className="courseSummaryEdit" onClick={(e) => continueEditbtn (e)}>Edit</Typography>
          </Grid>
          </Grid>


        </AccordionSummary>
        <hr></hr>
        <AccordionDetails>

          {/* course summary details */}


        <Grid container spacing={6}>
          <Grid item md={4}>  
          <img src={data.course_image} width="100%" height="auto"></img>
          </Grid>
          <Grid item md={4}>  
         
          <Typography variant="h6" style={{textAlign:'left'}}>{data.course_name}</Typography>
         
          <Typography variant="subtitle1" style={{textAlign:'left'}}>Course Date: 1/1/2222</Typography>
         
          </Grid>
          <Grid item md={4}>  
       
          <Typography variant="h6" style={{textAlign:'left'}}>&#8377; &nbsp;{data.amount}</Typography>
          </Grid>
        </Grid>

        </AccordionDetails>
        <AccordionActions>
          <Grid container>
            <Grid item md={12}>
            <div style={{textAlign:'right',paddingLeft:'24px'}}>
            <Button
            variant="container"
            className="checkoutbtnStyle"
            disableElevation
            style={{color:'#fff',backgroundColor:'#003db3',borderRadius:0}}
            onClick={(e) => continuebtn (e)}
            >Continue</Button>
            </div>
            </Grid>
          </Grid>
        </AccordionActions>
      </Accordion>




          {/* 2nd accordin */}
     

      <Accordion expanded={continue2accord} disabled={isuserLogged}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
         <Grid container>
          <Grid item md={6}>
          <Typography variant="h6">Are You An Exesting User?</Typography>
          </Grid>
          <Grid item md={3}>
            <div style={{textAlign:'right'}}>
          <Button variant="contained"
            style={{backgroundColor:'#003db3',borderRadius:0}}
            onClick={(e) => existingUserLogin (e)}
          >Login</Button>
          </div>
          </Grid>

          <Grid item md={2}>
            <div style={{textAlign:'right'}}>
          <Button variant="contained"
            style={{backgroundColor:'#003db3',borderRadius:0}}
            onClick={(e) => existingUserSignup (e)}
          >Signup</Button>
            </div>
          </Grid>
        
          <Grid item md={1}>
                <Typography variant="button" hidden={true} onClick={(e) => existingEdit (e)}>Edit</Typography>
          </Grid>

         </Grid>
        </AccordionSummary>
        <hr></hr>
        <AccordionDetails>
        <div style={{width:'100%',height:'25px'}}></div>
        <div style={{padding:'24px'}}>
        <CheckoutUsers/>
        </div>
        </AccordionDetails>
      </Accordion>
      <div style={{height:'30px'}}>

      </div>
      <Accordion expanded={paymentaccord} disabled={itsverified}  onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Payment
          </Typography>
        
        </AccordionSummary>
        <AccordionDetails>
            <div style={{height:'100px'}}>
              <div style={{textAlign:'center'}}>
              <Button
               variant="contained" 
               onClick={(e) => paymentGateway(e)}
               style={{backgroundColor:'#003db3',borderRadius:0}}
               >Proceed to Payment</Button>
              </div>
            </div>
        </AccordionDetails>
      </Accordion>
    </div>
                        </div>
                  
                    </Grid>


                    {/* another grid 4 */}
                
                <Grid item md={4} sm={4} xs={4}>
                  <div style={{width:'100%',height:'55px'}}></div>
                  {
                    data1.map((datas) => {
                      return(
                        <Paper>
                        <Grid container>
                          <Grid item md={12} sm={12} xs={12}>
                            <div style={{padding:'24px'}}>
                              <Typography className="yourcarttotal">Your Cart Total</Typography>
                            </div>
                            <hr></hr>
                          </Grid>
    
                          <Grid item md={6} sm={6} xs={12}>
                          
                          <Typography variant="overline" className="subtotal">Sub Total</Typography>
                          </Grid>
                          <Grid item md={6} sm={6} xs={12}>
                            <div className="subtotalamount">
                            <Typography variant="overline" style={{textAlign:'right'}} className="subtotalamount">&#8377; &nbsp;{datas.amount}</Typography>
                            </div>
                          </Grid>
    
                          <Grid container>
                            <Grid item md={12}>
                              <div style={{textAlign:'center',padding:'25px'}}>
                              <Box
                               sx={{
                                 width: '100%',
                                    
                                  }}
                         >
                    <TextField fullWidth label="Enter Your COUPON CODE Here" id="fullWidth" />
                    <div style={{width:'100%',height:'24px'}}></div>
                    <Button
                    variant="contained"
                    style={{backgroundColor:'#003db3', borderRadius:0}}
                    >APPLY COUPON</Button>
                              </Box>
                              </div>
                            </Grid>
                          </Grid>



                                  <Grid container>
                                    <Grid item md={12} sm={12} xs={12}>
                                      <div style={{padding:'24px'}}>
                                      <Typography variant="h6">Tax</Typography>
                                      </div>
                                    </Grid>
                                  </Grid>


                                  <Grid container>
                                    <Grid item md={12} sm={12} xs={12}>
                                      <div style={{paddingTop:0,paddingLeft:'24px',paddingRight:'24px'}}>
                                      <Typography variant="h3">{ parseInt(datas.amount) + parseInt(datas.amount*18/100)}</Typography>
                                      </div>
                                    </Grid>
                                  </Grid>


    
                        </Grid>
                      </Paper>
    
                      );
                    })
                  }
                

                </Grid>

                </Grid>
            </Container>





              );
            })
          }
          










            <Footer/>
        </React.Fragment>
    );
}

export default CheckoutContent;