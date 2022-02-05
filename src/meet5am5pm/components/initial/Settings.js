import React from "react";
import PropTypes from "prop-types";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import SettingsPopover from '../common/SettingsPopover.js'
import {opendialogg} from "../../atoms/chatatoms";
import { useRecoilState } from "recoil";
import iconbtn from '@material-ui/core/IconButton';
import SettingDialog from "../common/settingsdialog.js";

const Settings = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [opendialog, setOpendialog] = useRecoilState(opendialogg);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);

  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);

  };
  return (
    <div>
      <IconButton color="default" style={{color:'white'}} aria-label="add an alarm" onClick={setOpendialog}>
        <SettingsIcon />
      </IconButton>
      {/* <SettingsPopover open={open} anchorEl={anchorEl} handleClose={handleClose}/> */}
      <SettingDialog/>
    </div>
  );
};

Settings.propTypes = {};

export default Settings;
