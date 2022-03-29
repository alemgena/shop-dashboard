import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { fade, makeStyles } from "@material-ui/core/styles";
import { InputBase, Badge } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import TodayIcon from "@material-ui/icons/Today";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import NotificationsIcon from "@material-ui/icons/Notifications";
import OftadehAvatarMenu from "../OftadehAvatarMenu/OftadehAvatarMenu";
import clsx from "clsx";
import NavigationContext from "../../context/NavigationContext";
import ThemeContext from "../../context/ThemeContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router';
import { loginSlice } from '../../slice/login'
import { useDispatch, useSelector } from 'react-redux'
const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor:'#203040',
    color:"white"
  },
  appBarShift: {
    width: (props) => `calc(100% - ${props.drawerWidth}px)`,
    marginLeft: (props) => props.drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    // marginRight: theme.spacing(2)
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.type === "dark"
        ? fade(theme.palette.common.white, 0.15)
        : fade(theme.palette.action.disabled, 0.15),
    "&:hover": {
      backgroundColor:
        theme.palette.type === "dark"
          ? fade(theme.palette.common.white, 0.25)
          : fade(theme.palette.action.disabled, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  appbarSection: {
    display: "flex",
    // display: "none",
    alignItems: "center",
    // [theme.breakpoints.up("sm")]: {
    //   display: "flex"
    // }
  },
  appbarToday: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  accountCircle:{
    color:'white'
  }
}));

const OftadehAppBar = (props) => {
  const classes = useStyles(props);
  const { open, handleDrawerToggle, handleRightPanelOpen } = React.useContext(
    NavigationContext
  );

  const { setThemeName, curThemeName } = React.useContext(ThemeContext);

    const navgate = useHistory()
     const loginActions = loginSlice.actions
    const role= localStorage.getItem('role');
    console.log(role)
  const dispatch = useDispatch()
  const LoginOut=()=>{
    if(role==='admin'){
     navgate.push('/adminLogin')
    }
    else{
           navgate.push('/ranchManagerLogin')
    }
        localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('loginInfo')
    localStorage.removeItem('userInfo')
  
    dispatch(loginActions.setLoggedUser([]))
    //dispatch(loginActions.initialState(''));

    dispatch(loginActions.setUserInformation([]))
   
  }
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
  
        <div className={classes.grow} />
        <div className={classes.appbarSection}>
       <IconButton    
               >< LogoutIcon  onClick={LoginOut}
             className={classes.accountCircle}
             >
             </LogoutIcon>
             </IconButton>
         </div>
      </Toolbar>
    </AppBar>
  );
};

OftadehAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default OftadehAppBar;
