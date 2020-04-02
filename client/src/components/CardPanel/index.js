/**
 * Created by olgundutkan on 14.03.2020
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HelpIcon from "@material-ui/icons/Help";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CircularProgress from "@material-ui/core/CircularProgress";
import InformationDialog from "../InformationDialog";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(2)
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
    borderTop: "1px solid #ccc"
  },
  headerRoot: {
    borderBottom: "1px solid #ccc"
    // padding: theme.spacing(1)
  },
  headerAvatar: {
    marginRight: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRight: "1px solid #ccc"
  },
  headerContent: {
    // paddingLeft: theme.spacing(1),
    // borderLeft: "1px solid #ccc"
  },
  headerAction: {
    margin: theme.spacing(0),
    alignSelf: "center"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

const CardPanel = ({
  title,
  descriptions,
  headerActionButtons,
  footerActionButtons,
  children,
  options,
  onHeaderButtonAction,
  onFooterButtonAction
}) => {
  const classes = useStyles();
  const [expanded, updateExpanded] = useState(true);
  const [descriptionsDialogOpen, updateDescriptionsDialogOpen] = useState(
    false
  );
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // console.log("CardPanel component mount");
    return () => {
      // console.log("CardPanel component un mount");
    };
  }, []);
  const expandButtonActionHandler = e => {
    updateExpanded(!expanded);
    return options.expandButton.callback(e, !expanded);
  };

  return (
    <Card className={classes.root} variant="outlined">
      {(options.backButton && options.backButton.enabled) ||
      !!descriptions ||
      !!headerActionButtons.length ||
      (options.expandButton && options.expandButton.enabled) ||
      !!title ? (
        <CardHeader
          avatar={
            options.backButton &&
            options.backButton.enabled && (
              <Tooltip title="Back">
                <IconButton
                  aria-label="back"
                  size={"small"}
                  onClick={e => options.backButton.callback(e)}
                >
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )
          }
          action={
            <>
              {!!descriptions && (
                <Tooltip title={descriptions}>
                  <IconButton
                    aria-label="descriptions"
                    size={"small"}
                    onClick={e => updateDescriptionsDialogOpen}
                  >
                    <HelpIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              {headerActionButtons.map(action => (
                <Tooltip title={action.title} key={action.id}>
                  <IconButton
                    aria-label={action.label}
                    size={"small"}
                    onClick={e => onHeaderButtonAction(e, action)}
                  >
                    {action.content}
                  </IconButton>
                </Tooltip>
              ))}
              {options.expandButton && options.expandButton.enabled && (
                <Tooltip title={expanded ? "Expand Less" : "Expand More"}>
                  <IconButton
                    size={"small"}
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded
                    })}
                    onClick={e => expandButtonActionHandler(e)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          }
          title={
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
          }
          classes={{
            root: classes.headerRoot,
            avatar: classes.headerAvatar,
            content: classes.headerContent,
            action: classes.headerAction
          }}
        />
      ) : (
        false
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{children}</CardContent>
        {!!footerActionButtons.length && (
          <CardActions className={classes.cardActions}>
            {footerActionButtons.map(action => (
              <div className={classes.wrapper} key={action.id}>
                <Tooltip title={action.title}>
                  <div>
                    <Button
                      variant="contained"
                      size="small"
                      color={action.color}
                      disabled={action.disabled || action.loading}
                      startIcon={action.startIcon}
                      endIcon={action.success && <DoneIcon />}
                      onClick={e => onFooterButtonAction(e, action)}
                    >
                      {action.content}
                    </Button>
                  </div>
                </Tooltip>
                {action.loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            ))}
          </CardActions>
        )}
      </Collapse>
      <InformationDialog
        dialogOpen={descriptionsDialogOpen}
        title={"Description"}
        content={descriptions}
      />
    </Card>
  );
};

/**
 * Set default props of CardPanel component
 * @type {{}}
 */
CardPanel.defaultProps = {
  title: "",
  descriptions: "",
  children: <div />,
  headerActionButtons: [],
  footerActionButtons: [],
  options: {
    backButton: {
      enabled: true
    },
    expandButton: {
      enabled: true
    }
  }
};

/**
 * Validate props of CardPanel component
 * @type {{}}
 */
CardPanel.prototypes = {
  title: PropTypes.string,
  descriptions: PropTypes.string,
  children: PropTypes.node,
  headerActionButtons: PropTypes.array,
  footerActionButtons: PropTypes.array,
  options: {
    backButton: {
      enabled: PropTypes.bool,
      callback: PropTypes.func
    },
    expandButton: {
      enabled: PropTypes.bool,
      callback: PropTypes.func
    }
  }
};

export default CardPanel;
