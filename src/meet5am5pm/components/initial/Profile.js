import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { useRecoilState } from "recoil";
import { sidepanell } from "../../atoms/atoms";
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sidepanel, setSidepanel] = useRecoilState(sidepanell);

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    console.log('open',sidepanel);
    setSidepanel(true);    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" onClick={handleClick} />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
