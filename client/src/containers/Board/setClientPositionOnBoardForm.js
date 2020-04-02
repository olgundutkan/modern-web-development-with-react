/**
 * Created by olgundutkan on 14.03.2020
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const SetClientPositionOnBoardForm = ({ x, onChangeX, y, onChangeY, onKeyDownEnter }) => {
  const classes = useStyles();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("SetClientPositionOnBoardForm component mount");
    return () => {
      console.log("SetClientPositionOnBoardForm component un mount");
    };
  }, []);
  return (
    <div className={classes.root}>
      <FormControl>
        <InputLabel htmlFor="position-x-helper">X</InputLabel>
        <Input
          id="position-x-input"
          value={x}
          onChange={event => onChangeX(event.target.value)}
          onKeyDown={event => event.key === 'Enter' && onKeyDownEnter()}
          inputProps={{ min: "0", max: "10", step: "1" }}
          type="number"
          aria-describedby="position-x-helper-text"
        />
        <FormHelperText id="position-x-helper-text">
          Position X must be numerical
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="position-y-helper">Y</InputLabel>
        <Input
          id="position-y-input"
          value={y}
          onChange={event => onChangeY(event.target.value)}
          onKeyDown={event => event.key === 'Enter' && onKeyDownEnter()}
          inputProps={{ min: "0", max: "10", step: "1" }}
          type="number"
          aria-describedby="position-y-helper-text"
        />
        <FormHelperText id="position-y-helper-text">
          Position Y must be numerical
        </FormHelperText>
      </FormControl>
    </div>
  );
};

/**
 * Set default props of SetClientPositionOnBoardForm component
 * @type {{}}
 */
SetClientPositionOnBoardForm.defaultProps = {
  x: "",
  y: ""
};

/**
 * Validate props of SetClientPositionOnBoardForm component
 * @type {{}}
 */
SetClientPositionOnBoardForm.prototypes = {
  x: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  onChangeX: PropTypes.func,
  y: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  onChangeY: PropTypes.func
};

export default SetClientPositionOnBoardForm;
