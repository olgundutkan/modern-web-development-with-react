/**
 * Created by olgundutkan on 14.03.2020
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { getClientInLocalStorage } from "../../common";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  isMe: {
    backgroundColor: "#ccc"
  }
}));

const ClientsTable = ({ rows }) => {
  const classes = useStyles();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // console.log("ClientsTable component mount");
    return () => {
      // console.log("ClientsTable component un mount");
    };
  }, []);

  const isMe = id => {
    const client = getClientInLocalStorage();
    return client && client.id === id;
  };

  const coordinateValueFormat = value => {
    return value && parseFloat(value).toFixed(1);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client Id</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Position X</TableCell>
            <TableCell align="left">Position Y</TableCell>
            <TableCell align="left">Color</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.loading && (
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                colSpan={5}
                align={"center"}
              >
                Loading...
              </TableCell>
            </TableRow>
          )}
          {!rows.loading && !rows.data.length && (
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                colSpan={5}
                align={"center"}
              >
                No Data
              </TableCell>
            </TableRow>
          )}
          {!rows.loading &&
            rows.success &&
            rows.data.map(row => (
              <TableRow
                key={row.id}
                className={clsx(isMe(row.id) && classes.isMe)}
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">
                  {coordinateValueFormat(row.position.x)}
                </TableCell>
                <TableCell align="left">
                  {coordinateValueFormat(row.position.y)}
                </TableCell>
                <TableCell align="left">
                  <FiberManualRecordIcon style={{ color: row.color }} />{" "}
                  {row.color}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

/**
 * Set default props of ClientsTable component
 * @type {{}}
 */
ClientsTable.defaultProps = {
  rows: {
    loading: false,
    data: []
  }
};

/**
 * Validate props of ClientsTable component
 * @type {{}}
 */
ClientsTable.prototypes = {
  rows: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.array
  }).isRequired
};

export default ClientsTable;
