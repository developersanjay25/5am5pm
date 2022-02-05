import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/header.css";
import HelpPopover from "./HelpPopover";
import Settings from "./Settings";
import Profile from "./Profile";
import { dateWithTime } from "../../utils/genFunc";
import logo from '../../../Images/meetimages/logo.png'
import { Drawer } from "@material-ui/core";

const Header = (props) => {
  const [time, setTime] = useState(dateWithTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => setTime(dateWithTime(new Date())), 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="header">
      <div className="header-logo">
        {/* <img src={logo} className='logo' /> */}
      <div className="header-date-time">{time}</div>

      </div>
      {/* <div className="header-help-popover">
        <HelpPopover />
      </div> */}
      <div className="header-settings">
        <Settings />
      </div>
      <div className="header-user-profile">
        <Profile />
      </div>
     
    </div>
  );
};

Header.propTypes = {};

export default Header;
