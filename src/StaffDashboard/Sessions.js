import React from "react";
import { useRecoilState } from "recoil";
import { ShowMeetings,ShowSessions } from "./StafRecoil";
import { Button, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import img1 from "../Images/Staff_Dashboard_Tabs/onlinemeet.png";



   

//importing files for tabs
import SessionsData from "./SessionsData";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Sessions = () => {

  const[showCrsPage,setShowCrsPage] = useRecoilState(ShowMeetings);

  //make sessions empty
  const[emptySession,setEmptySession] = useRecoilState(ShowSessions);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const bckCrsHandler = () => {
      console.log("check2",showCrsPage)
    setShowCrsPage(true)
    setEmptySession("")

  }

  return (
      <>

<img src={img1} height={'300px'} width={'100%'}></img>

    <Grid container>
      <Grid item md={12}>
        
        <Box sx={{ width: "100%" }}>
            <div style={{textAlign:'center'}}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
      
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Sessions" {...a11yProps(0)} />
              <Tab label="Analytics" {...a11yProps(1)} />
              <Tab label="Subscriptions" {...a11yProps(2)} />
              <Tab label="Notifications" {...a11yProps(2)} />
            </Tabs>
          </Box>
          </div>
          <TabPanel value={value} index={0}>
            <SessionsData />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Analytics
          </TabPanel>
          <TabPanel value={value} index={2}>
            Subscriptions
          </TabPanel>
          <TabPanel value={value} index={3}>
            Notifications
          </TabPanel>
        </Box>
      </Grid>


    <Grid item md={12}>
        <div style={{textAlign:'right'}}>
            <Button variant="contained" onClick={bckCrsHandler}>Bck 2 Crs</Button>
        </div>
    </Grid>

    </Grid>
    </>
  );
}

export default Sessions;
