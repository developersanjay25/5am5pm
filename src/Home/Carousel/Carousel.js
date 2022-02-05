import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
// import { Carousel } from 'react-responsive-carousel';
import Carousel_img1 from '../../Images/Carousel/1.png'; 
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from '@mui/styles';
import { width } from "@mui/system";
import { useEffect } from "react";
import axios from "axios";
import './HomeCarousel.css';


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";







const useStyles = makeStyles((theme) => ({
    imageStyle:{
        width:'100%',
        height:'auto',
    },
  
    slidertext:{
        textAlign:'left',
        paddingLeft:'25px',
        color:'#fff',
        [theme.breakpoints.down('sm')]: {
           fontSize:'1.5rem !important',
           lineHeight:0,
          },
          [theme.breakpoints.down('xs')]: {
            fontSize:'0.83rem !important',
            lineHeight:0,
          
           },

    },


    sliderDescription:{
        color:'#fff',
        fontSize:'22px',
        fontWeight:300,
        textAlign:'left',
        paddingLeft:'25px',
        marginTop:0,
    },

    imagecontainer:{
        position:'absolute',
        top:0,
        width:'100%',
        height:'600px'
    },
    textcontainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'start',
        width:'100%',
        height:'600px'
    }
}));

//carousel




const Carousel_Slider = () => {

    const classes = useStyles();

    const[carouseldata,setcarouseldata] = useState([])

    useEffect(() => {
        const url = "https://app.5am5pm.com:3000/commonapi/carousel";
        axios
        .get(url)
        .then((res) => {
            setcarouseldata(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const carouselofferLinks = (e,cta_url) => {
        alert(cta_url);
    }   




    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };






    return(
        <React.Fragment>
          
             {/* <Carousel showThumbs={false} autoPlay infiniteLoop>

                {
                    carouseldata.map((data) => {
                        return(


                            <div style={{position:'relative'}}>
                            <img src={data.filepath} width='100%' height='600px'/>
                            <div className={classes.imagecontainer}>
                            <div className={classes.textcontainer}>
                            <Typography variant="h1" color="mycolor3" className={classes.slidertext}>{data.title}</Typography>
                            <Typography variant="h3" className={classes.sliderDescription}>{data.description}</Typography>
                            <Box sx={{pl:'24px',pt:'24px'}}>     
                            <Button  onClick={(e) => carouselofferLinks (e,data.cta_url)} size="medium" variant="outlined" style={{color:'#003db3',backgroundColor:'#fff',borderRadius:'0'}}>Book a Live Class</Button>
                            </Box> 
                            </div>
                           
                            </div>
                        </div>
                       


                        );
                    })
                }

              
                
            </Carousel>  */}



<Carousel
swipeable={true}
draggable={false}
responsive={responsive}
ssr={true} // means to render carousel on server-side.
infinite={true}
autoPlaySpeed={5000}
autoPlay={true}
>
  
  {
      carouseldata.map((data) => <div>
          
          
          <div style={{position:'relative'}}>
                            <img src={data.filepath} width='100%' height='600px'/>
                            <div className={classes.imagecontainer}>
                            <div className={classes.textcontainer}>
                            <Typography variant="h1" color="mycolor3" className={classes.slidertext}>{data.title}</Typography>
                            <Typography variant="h3" className={classes.sliderDescription}>{data.description}</Typography>
                            <Box sx={{pl:'24px',pt:'24px'}}>     
                            <Button  onClick={(e) => carouselofferLinks (e,data.cta_url)} size="medium" variant="outlined" style={{color:'#003db3',backgroundColor:'#fff',borderRadius:'0'}}>Book a Live Class</Button>
                            </Box> 
                            </div>
                           
                            </div>
                        </div>
  
          
          
          </div> )
  }
</Carousel>



        </React.Fragment>
    );
}

export default Carousel_Slider;