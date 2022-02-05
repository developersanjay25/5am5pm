import React from "react";
import { useRecoilState } from "recoil";
import { StudentSessions,showcrstitle } from "./StudentRecoil";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";



//files
import SessionData from "./SessionsData";

const Course_Sessions = () => {

    //recoil to change page
    const[changePage,setChangePage] = useRecoilState(StudentSessions);

    const[showtitlehere,setShowtitleHere] = useRecoilState(showcrstitle);

 

    const bck2crs = () => {
        setChangePage(true)
    }


    //tabs code
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

      //tabs hooks
      const [value, setValue] = React.useState(0);

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };


    return(
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" style={{paddingLeft:'24px'}}>{showtitlehere}</Typography>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
         
            <Tab label="Dashboard" {...a11yProps(0)} />
            <Tab label="Sessions" {...a11yProps(1)} />
            <Tab label="Peoples" {...a11yProps(2)} />
            <Button onClick={(e) => bck2crs (e)}>Back to Crs</Button>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
         Dashboard
         
        </TabPanel>
        <TabPanel value={value} index={1}>
        <SessionData/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    );
}

export default Course_Sessions;