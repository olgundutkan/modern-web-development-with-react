/**
 * Created by olgundutkan on 14.03.2020
 */

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}));

const BreadCrumbs = () => {
  const classes = useStyles();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // console.log("BreadCrumbs component mount");
    return () => {
      // console.log("BreadCrumbs component un mount");
    };
  }, []);
  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split("/").filter(x => x);
        return (
          <Breadcrumbs aria-label="breadcrumb" classes={{ root: classes.root }}>
            <Link color="inherit" component={RouterLink} to={"/"}>
              Dashboard
            </Link>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

              return last ? (
                <Typography color="textPrimary" key={to}>
                  {value.replace(/^\w/, c => c.toUpperCase())}
                </Typography>
              ) : (
                <RouterLink color="inherit" to={to} key={to}>
                  {value.replace(/^\w/, c => c.toUpperCase())}
                </RouterLink>
              );
            })}
          </Breadcrumbs>
        );
      }}
    </Route>
  );
};

/**
 * Set default props of BreadCrumbs component
 * @type {{}}
 */
BreadCrumbs.defaultProps = {};

/**
 * Validate props of BreadCrumbs component
 * @type {{}}
 */
BreadCrumbs.prototypes = {};

export default BreadCrumbs;
