import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import navigationConfig from "../../RouteConfigs/navigationConfig";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../images/logoNew.jpg";
import OftadehNavGroup from "./sections/OftadehNavGroup";
import OftadehNavCollapse from "./sections/OftadehNavCollapse";
import OftadehNavItem from "./sections/OftadehNavItem";
import OftadehNavLink from "./sections/OftadehNavLink";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,

  logoBg: {
    //   backgroundColor: theme.palette.type !== "#203040",
    backgroundColor: "#203040",
  },
  logo: {
    padding: "1rem",
    "& span": {
      display: "block",
      color: "rgba(41, 113, 245, 0.87)",
    },
  },
  navCustom: {
    "& .MuiTypography-root": {
      fontSize: ".95rem",
      marginLeft: "10px",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "35px",
    },
    "& .MuiCollapse-wrapperInner a": {
      paddingLeft: "50px",
    },
  },
}));

const OftadehNavigation = (props) => {
  let user;
  const history = useHistory();
  const classes = useStyles(props);
  const [username, setUsername] = React.useState("");
  // console.log(user)
  return (
    <div>
      <div>
        <div className={clsx(classes.toolbar, classes.logoBg)}>
          <Typography
            className={classes.logo}
            variant="h6"
            component="h1"
            align="center"
          >
            <span style={{ color: "white", marginRight: "20px" }}>
              {" "}
              ISZO
            </span>
          </Typography>
        </div>
        <Divider />
        <List className={classes.navCustom}>
          <div>
            {navigationConfig.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "group" && <OftadehNavGroup item={item} />}

                {item.type === "collapse" && <OftadehNavCollapse item={item} />}

                {item.type === "item" && <OftadehNavItem item={item} />}

                {item.type === "link" && <OftadehNavLink item={item} />}

                {item.type === "divider" && <Divider className="my-16" />}
              </React.Fragment>
            ))}
          </div>
        </List>
      </div>
    </div>
  );
};

export default OftadehNavigation;
