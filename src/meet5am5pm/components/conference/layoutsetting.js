import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import * as icons from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import SettingsPopover from '../common/SettingsPopover'


import { useRecoilState } from "recoil";
import Popover from "@material-ui/core/Popover";
import { layout } from "../../atoms/conference";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const LayoutSetting = (props) => {
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
      <Tooltip TransitionComponent={Zoom} title={"Change Layout"}>
      <IconButton style={{color:'white'}} color="default" aria-label="add an alarm" onClick={handleClick}>
      <icons.ViewCompact />
      </IconButton>
      </Tooltip>
      <LayoutPopover open={open} anchorEl={anchorEl} handleClose={handleClose}/>
    </>
  );
};



const useStyless = makeStyles((theme) => ({
    root: {
      minWidth: 250,
    },
    list: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  const LayoutPopover = (props) => {
    const classes = useStyles();
    const [openMic, setOpenMic] = React.useState(false);
    const [openCamera, setOpenCamera] = React.useState(false);
    const [layoutt, setLayout] = useRecoilState(layout);
  
  
  
    const emails = ['Row', 'Column',"Gallery"];
    const onclicks = ['row', 'column',"gallery"];
  
    const onclickrow = () => {
            setLayout("row");
            handleClose();
    };
    const onclickcolumn = () => {
            setLayout("column");
            handleClose();
    };
    const onclickgallery = () => {
            setLayout("gallery");
            handleClose();
    };

    const onclickwhiteboard= () => {
      setLayout("whiteboard");
      handleClose();
};

    const handleClose = (value) => {
      setOpenMic(false);
      setOpenCamera(false);
      props.handleClose()
    };


    
    return (
      <>
        <Popover
          id={"settings-popover"}
          open={props.open}
          anchorEl={props.anchorEl}
          onClose={props.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className={classes.root}>
            <div className={classes.root}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button onClick={onclickrow}>
                  <ListItemText primary="Row" />
                </ListItem>
                <ListItem button onClick={onclickcolumn}>
                  <ListItemText primary="Column" />
                </ListItem>
                <ListItem button onClick={onclickgallery}>
                  <ListItemText primary="Gallery" />
                </ListItem> 
                <ListItem button onClick={onclickwhiteboard}>
                  <ListItemText primary="White Board" />
                </ListItem>
              </List>
            </div>
          </div>
        </Popover>
        
      </>
    );
  };
  
// LayoutSetting.propTypes = {};

export default LayoutSetting;