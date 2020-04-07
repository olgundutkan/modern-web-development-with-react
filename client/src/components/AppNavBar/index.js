/**
 * Created by olgundutkan on 14.03.2020
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from "@material-ui/icons/Group";
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexGrow: 1
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  title: {
    flexGrow: 1
  }
}));

const AppNavBar = ({
  drawerOpen,
  onChangeDrawerStatus,
  darkTheme,
  onChangeTheme
}) => {
  const classes = useStyles();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // console.log("AppNavBar component mount");
    return () => {
      // console.log("AppNavBar component un mount");
    };
  }, []);
  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => onChangeDrawerStatus(true)}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Sample Web APP
          </Typography>
          {darkTheme ? (
            <Brightness7Icon onClick={() => onChangeTheme()} />
          ) : (
            <Brightness4Icon onClick={() => onChangeTheme()} />
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={e => onChangeDrawerStatus(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to={"/"}
            onClick={e => onChangeDrawerStatus(false)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={"/clients"}
            onClick={e => onChangeDrawerStatus(false)}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Clients"} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={"/board"}
            onClick={e => onChangeDrawerStatus(false)}
          >
            <ListItemIcon>
              <ScatterPlotIcon />
            </ListItemIcon>
            <ListItemText primary={"Board"} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

/**
 * Set default props of AppNavBar component
 * @type {{}}
 */
AppNavBar.defaultProps = {
  drawerOpen: false
};

/**
 * Validate props of AppNavBar component
 * @type {{}}
 */
AppNavBar.prototypes = {
  drawerOpen: PropTypes.bool,
  onChangeDrawerStatus: PropTypes.bool,
  onChangeTheme: PropTypes.func
};

export default AppNavBar;
