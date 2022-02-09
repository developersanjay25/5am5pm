import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { useRecoilState } from "recoil";

import Divider from "@material-ui/core/Divider";
import {IconButton,Button, Tabs, Tab} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import * as icons from "@material-ui/icons";
import Chat from "../conference/Chat";
import Contacts from "../conference/Contacts";
import "../../styles/chatAndContacts.css";
import $ from 'jquery';
import { chatcontactt, chatopenn, onlineuserr } from "../../atoms/chatatoms";
// THEME
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const drawerWidth = 350;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    // width: "350px",
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: "100vh",
    overflow:'hidden',
},
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    minHeight: "35px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));


// Or Create your Own theme:
const theme = createTheme({
  palette: {
    secondary: {
      main: '#0070ba'
    }
  }
});

// FOr tab
const tab = {
      minWidth: 100, // a number of your choice
      width: 'fit-content', // a number of your choice
  };


const ChatAndContactDrawer = (props) => {
  const [chatopen, setChatopen] = useRecoilState(chatopenn);

  const [value, setValue] = useRecoilState(chatcontactt);
  const [onlineuser,setonlineuser] = useRecoilState(onlineuserr);

  const handleChange = (e,newValue) => {
    setValue(newValue);
    console.log(newValue);
    props.handleDrawerOpen(newValue);
  };

  const classes = useStyles();
  if(props.chatOrContact === 'CHAT'){
    $('.chat').css('display','block');
    $('.contacts').css('display','none');
    
    if(chatopen){
    $("#messages").animate(
    {
      scrollTop: $("#messages").get(0).scrollHeight,
    },10
  );
}
  setChatopen(true);
  }
  else{
    $('.contacts').css('display','block');
    $('.chat').css('display','none');
  }
  
  return (
    
    <MuiThemeProvider  theme={theme}>
    <Drawer
    id='overflow'
    style={{overflow : 'hidden' }}
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={props.handleDrawerClose}
    >
      <div className={classes.drawerHeader} style={{ minHeight: 50, height: 50 }}>
        <div
          style={{
            position: "absolute",
            left: "15px",
            fontWeight: 700,
            overflow: 'hidden'
          }}
        >

      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab style={tab}  value="CHAT" label="CHAT" />
        <Tab style={tab}  iconPosition="start" value="CONTACT" label= {`CONTACT (${onlineuser.length})`}  />
      </Tabs>
          
        </div>

        <IconButton onClick={props.handleDrawerClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <div id="chatAndContacts">
        <div className="chat"  style={{ height: "calc(100vh - 36px" }}><Chat/></div>
        <div className="contacts"  style={{ height: "calc(100vh - 36px" ,overflow:'auto'}}><Contacts/></div>
      </div>
    </Drawer>
    </MuiThemeProvider>
  );
};

ChatAndContactDrawer.propTypes = {};

export default ChatAndContactDrawer;
