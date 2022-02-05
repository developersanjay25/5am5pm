import { Container } from '@mui/material';
import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import BrandSliderCard from './BrandSliderCard';
import './BrandSliderStyle.css';
import { Grid,Button,CardMedia,Card,CardContent,Typography,Divider,CardActions,Avatar,CardHeader,Stack } from '@mui/material';
import { blue,red } from '@mui/material/colors';
import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { ClassSharp } from '@mui/icons-material';
import axios from 'axios';
import Rating from '@mui/material/Rating';


//animate css
import 'animate.css';

//material icons
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';

//images
import img1 from '../../Images/SliderLogo/1.jpeg';
import img2 from '../../Images/SliderLogo/2.jpeg';
import img3 from '../../Images/SliderLogo/3.jpeg';
import img4 from '../../Images/SliderLogo/4.jpeg';
import img5 from '../../Images/SliderLogo/5.jpeg';




const useStyles = makeStyles({
    title:{
        fontWeight:'700',
        fontSize:'2.4rem',
        letterSpacing:'-.02rem',
        lineHeight:'1.2',
        textTransform:'uppercase',
        textAlign:'center',
        color:'#222',
        fontFamily:'Roboto,sans-serif'
      }
})


const BrandSlider = () => {

    

    const breakPoints = [
        {width: 500, itemsToShow: 2},
        {width: 768, itemsToShow: 6},
        {width: 1200, itemsToShow: 8},
        {width: 1500, itemsToShow: 8},
      ]
        
      const classes = useStyles();


  


    
      
      

    return(

        

        <React.Fragment>
            

       
        
      
      
        <Carousel 
         enableAutoPlay autoPlaySpeed={3500}
        itemsToScroll={1}
        itemsToShow={8}
        itemPadding={[0, 0]}
        pagination={false}
        breakPoints={breakPoints}
         >    
                <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img1}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img2}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img3}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img4}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img5}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img5}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img4}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img3}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img2}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img2}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img1}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img5}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img4}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img3}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img2}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img1}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img5}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img1}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img2}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
    <BrandSliderCard number={
                    <div className='institutecardstyle'>
    <Stack direction="row">
      <Avatar
        alt="Remy Sharp"
        src={img3}
        sx={{ width: 120, height: 120 }}
      />
    </Stack></div>}/>
                
           
       </Carousel>

 


    


        </React.Fragment>
    );
}

export default BrandSlider;