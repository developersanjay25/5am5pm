import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    title1:{
        fontStyle:'normal',
        fontWeight:'600',
        fontSize:'24px',
        lineHeight:'110%',
        textAlign:'center',
        fontFamily:'Promixa Nova,-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif'
    },
    title2:{
        fontStyle:'normal',
        fontWeight:'700',
        fontSize:'48px',
        lineHeight:'120%',
        color:'#222',
        textAlign:'center',
        fontFamily:'Promixa Nova,-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif'
    }
})

const Free_video_live_class = () => {

    const classes = useStyles();

    return(
        <React.Fragment>
            <div className={classes.title1}>
            <p>Want to learn life skills quickly?</p>
            </div>

            <div>
                <p className={classes.title2}>
                    Explore Free Videos & Live classes
                </p>
            </div>
        </React.Fragment>
    );
}

export default Free_video_live_class;