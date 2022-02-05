import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import SettingsPopover from '../common/SettingsPopover'

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const MoreSetting = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);

  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);

  };

  return (
    <>
      <Tooltip TransitionComponent={Zoom} title={"More Settings"}>
      <IconButton color="default" aria-label="add an alarm" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      </Tooltip>
      <SettingsPopover open={open} anchorEl={anchorEl} handleClose={handleClose}/>
    </>
  );
};

MoreSetting.propTypes = {};

export default MoreSetting;
