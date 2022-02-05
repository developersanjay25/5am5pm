import { Typography,Box } from '@mui/material';
import React from 'react';
import BrandSlider from './BrandSlider';
import './BrandSliderStyle.css';

const Brands = () => {
    return(
        <React.Fragment>
            <div style={{width:'100%',height:'300px',position:'relative'}}>
                <Box sx={{pt:'24px'}}>
                <Typography variant="h2" className='brandslidertitle'>JOBS & INTERNSHIPS OPENING BY COMPANIES </Typography>
                <div className='verticalmiddlediv'>
                <BrandSlider/>
                </div>
                </Box>
            </div>
        </React.Fragment>
    );
}

export default Brands;