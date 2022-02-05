import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MicIcon from "@material-ui/icons/Mic";
import SwitchCameraIcon from "@material-ui/icons/SwitchCamera";
import FlipIcon from "@material-ui/icons/Flip";
import ChangeCamera from "./ChangeCamera";
import ChangeMic from "./ChangeCamera";
import { useRecoilState } from "recoil";
import { layout } from "../../atoms/conference";


import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Layoutpopover = (props) => {
  const classes = useStyles();
  const [openMic, setOpenMic] = React.useState(false);
  const [openCamera, setOpenCamera] = React.useState(false);
  const [opendialog, setOpenDialog] = React.useState(false);
  const [layoutt, setLayout] = useRecoilState(layout);



  const emails = ['Row', 'Column',"Gallery"];
  const onclicks = ['row', 'column',"gallery"];

  const handleClickOpenMic = () => {
    setOpenMic(true);
  };
  const handleClickOpenCamera = () => {
    setOpenCamera(true);
  };

  const handleClose = (value) => {
    setOpenMic(false);
    setOpenCamera(false);
  };
  const changeLayout = () => {
    // setLayout(layoutt == 'row'?'column':'row');
    setOpenDialog(true)

  };
  
  const handleListItemClick = (value) => {
    setLayout(value);
    setOpenDialog(false);
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
              <ListItem button onClick={handleClickOpenMic}>
                <ListItemIcon>
                  <MicIcon />
                </ListItemIcon>
                <ListItemText primary="Switch Microphone" />
              </ListItem>
              <ListItem button onClick={handleClickOpenCamera}>
                <ListItemIcon>
                  <SwitchCameraIcon />
                </ListItemIcon>
                <ListItemText primary="Switch Camera" />
              </ListItem>
              <ListItem button onClick={changeLayout}>
                <ListItemIcon>
                  <FlipIcon />

                </ListItemIcon>
                <ListItemText primary="Change Layout" />
              </ListItem>
            </List>
          </div>
        </div>
      </Popover>
      <ChangeCamera open={openCamera} onClose={handleClose} />
      <ChangeMic open={openMic} onClose={handleClose} />
    

      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={opendialog}>
      <DialogTitle id="simple-dialog-title">Change Layout</DialogTitle>
      <List>
        {emails.map((email,onclick) => (
          <ListItem button onClick={() => handleListItemClick(onclicks[onclick])} key={onclicks[onclick]}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

      </List>
    </Dialog>
    
    </>
  );
};

SettingsPopover.propTypes = {};

export default SettingsPopover;