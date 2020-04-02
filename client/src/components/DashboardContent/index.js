/**
 * Created by olgundutkan on 14.03.2020
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const DashboardContent = ({ drawerOpen, children }) => {
  const classes = useStyles();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // console.log("DashboardContent component mount");
    return () => {
      // console.log("DashboardContent component un mount");
    };
  }, []);
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: drawerOpen
      })}
    >
      <div className={classes.drawerHeader} />
      {children}
    </main>
  );
};

/**
 * Set default props of DashboardContent component
 * @type {{}}
 */
DashboardContent.defaultProps = {
  drawerOpen: false,
  children: <div />
};

/**
 * Validate props of DashboardContent component
 * @type {{}}
 */
DashboardContent.prototypes = {
  drawerOpen: PropTypes.bool,
  children: PropTypes.node
};

export default DashboardContent;
