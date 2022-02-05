import React from "react";
import { Grid, Typography, Paper, AppBar, Toolbar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import MenuBar from "../Home/AppBar/AppBar";

const PurchaseValidation = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const Course_id = queryParams.get("course_id");
    console.log(Course_id);

    //pyemnt data hooks
    const[data1,setData1] = useState([])

    useEffect(() => {
        axios
        .get(`https://app.5am5pm.com:3000/commonapi/checkout_courseBYID/${Course_id}`)
        .then((res) => {
            setData1(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })

    },[])














//-------------------------------payment gateway-------------------------------------------//


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

  const userRole = localStorage.getItem("role");
    const userToken = localStorage.getItem("token");

 

    const [coursedetails, setcourseDetails] = useState([]);
    const [courseFee,setCourseFee] = useState([]);
    const [courseamount,setcourseamount] = useState([]);
    const [institute_identification, setinstituteIdentification] = useState([]);
    const [CourseName, setCourseName] = useState([]);
    const [courseId, setcourseId] = useState([]);

    

useEffect(() => {
    if(userRole == 'Student' && userToken){
        axios.get("https://app.5am5pm.com:3000/commonapi/getpubliccourseById/" + Course_id)
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

const buycrsbtn = () => {

    

 
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
    window.location.href = "/Student-DashBoard";
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



















    return(
        <React.Fragment>
             <MenuBar/>
            <div style={{height:"64px"}}></div>
             <Grid container spacing={4}>
            {
                data1.map((data) => {
                    return(
                        <>
                        <Grid item md={8}>
                            <Paper><Typography variant="h4">Welcome Learner</Typography></Paper>
                                <img src={data.course_image} width={'100%'}></img>
                                <Typography variant="h6">Course by {data.staf_name}</Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Paper elevation={2}>
                           <Typography>Order Summary</Typography>
                           <Grid container>
                                <Grid item md={4}>
                                    <img src={data.course_image} width={'70%'}></img>
                                </Grid>
                                <Grid item md={8}>
                                    <Typography variant="subtitle1">{data.course_name} Certification Course</Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography>Course Price</Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography>&#8377; {data.amount}</Typography>
                                </Grid>
                           </Grid>
                           <br></br>
                           <div style={{textAlign:'center'}}>
                           <Button variant="contained" style={{backgroundColor:'#003db3'}} onClick = {(e) => buycrsbtn(e)}>PROCEED TO PAYMENT</Button>
                           </div>
                           <br></br>
                           </Paper>
                           
                        </Grid>

                      
                        </>
                    );
                })
            }
             </Grid>
                
          
        </React.Fragment>
    );
}

export default PurchaseValidation;