/**
 * Created by olgundutkan on 14.03.2020
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const InformationDialog = ({ dialogOpen, title, content }) => {
  const [open, setOpen] = React.useState(false);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // console.log("InformationDialog component mount");
    setOpen(dialogOpen);
    return () => {
      // console.log("InformationDialog component un mount");
    };
  }, [dialogOpen]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
  );
};

/**
 * Set default props of InformationDialog component
 * @type {{}}
 */
InformationDialog.defaultProps = {
  dialogOpen: false,
  title: "",
  content: ""
};

/**
 * Validate props of InformationDialog component
 * @type {{}}
 */
InformationDialog.prototypes = {
  dialogOpen: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string
};

export default InformationDialog;
