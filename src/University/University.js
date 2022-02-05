import React from 'react';
import './university.css';
import { Typography,Box } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  title:{
    [theme.breakpoints.down('sm')]: {
      fontSize:'1.5rem !important',
      lineHeight:0,
     },
     [theme.breakpoints.down('xs')]: {
       fontSize:'0.83rem !important',
       lineHeight:0,
     
      },
      textTransform:'uppercase',
  }
}));

const University_title = () => {

  const classes = useStyles();

    return(
        <React.Fragment>
          <Box sx={{p:'24px'}}>
          <Typography variant="h2" className={classes.title}>Connect With University & Colleges Never Been Easier.</Typography>
          </Box>
        </React.Fragment>
    );
}

export default University_title;