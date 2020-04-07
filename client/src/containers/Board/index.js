/**
 * Created by olgundutkan on 14.03.2020
 */

import React from "react";
// import PropTypes from "prop-types";
import SendIcon from "@material-ui/icons/Send";
import CardPanel from "../../components/CardPanel";
import SetClientPositionOnBoardForm from "./setClientPositionOnBoardForm";
import { connect } from "react-redux";
import {
  dragEndClientPositionAction,
  dragStartClientPositionAction,
  updateClientPositionRequest
} from "../../actions/clients/client";
import { moveClientPositionAction } from "../../actions/clients/client";
import StressTestBoard from "../../components/StressTestBoard";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientPosition: {
        x: "",
        y: ""
      },
      circles: [
        {
          position: {
            x: 30,
            y: 30
          }
        }
      ]
    };
  }

  /**
   * When Board Component Mount
   */
  componentDidMount() {
    // const interval = setInterval(this.updatePosition, 1000);
  }

  /**
   * When Board Component Unmount
   */
  componentWillUnmount() {}

  /**
   * Update x coordinate
   * @param value
   */
  updateX = value => {
    return this.setState({
      clientPosition: { ...this.state.clientPosition, x: parseInt(value) }
    });
  };

  /**
   * Update y coordinate
   * @param value
   */
  updateY = value => {
    return this.setState({
      clientPosition: { ...this.state.clientPosition, y: parseInt(value) }
    });
  };

  /**
   * When key down on Enter on set position form
   * @returns {any}
   */
  keyDownEnterHandler = () => {
    const { clientPosition } = this.state;
    const { client, updateClientPosition } = this.props;
    return clientPosition.x !== "" && clientPosition.y !== ""
      ? updateClientPosition(client.data.id, this.state.clientPosition)
      : false;
  };

  /**
   * Header button action handler
   * @param e
   * @param action
   */
  headerButtonActionHandler = (e, action) => {
    console.log(action.id);
  };

  /**
   * Card back button action handler
   * @param e
   */
  backButtonActionHandler = e => {
    console.log(e);
  };

  /**
   * Expand button action handler
   * @param e
   * @param expanded
   */
  expandButtonActionHandler = (e, expanded) => {
    console.log(e, expanded);
  };

  /**
   * Card Footer Actions Handler
   * @param e
   * @param action
   */
  footerButtonActionHandler = (e, action) => {
    switch (action.id) {
      case "setMyPosition":
        const { client, updateClientPosition } = this.props;
        if (client && client.data) {
          return updateClientPosition(
            client.data.id,
            this.state.clientPosition
          );
        }
        return console.error("Undefined client");
      default:
        return console.error("Undefined acton to footerButtonActionHandler");
    }
  };

  /**
   * Save button disabled handler
   * @returns {boolean}
   */
  saveButtonDisabledHandler = () => {
    const { clientPosition } = this.state;
    return clientPosition.x === "" || clientPosition.y === "";
  };

  dragStartHandle = id => {
    const { client, dragStartClientPosition } = this.props;
    // console.log("dragStartHandle", id);
    if (client.data.id === id && !client.drag) {
      return dragStartClientPosition();
    }
    return false;
  };

  dragEndHandle = id => {
    const { client, dragEndClientPosition } = this.props;
    // console.log("dragEndHandle", id);
    if (client.data.id === id && client.drag) {
      return dragEndClientPosition();
    }
    return false;
  };

  onMoveHandle = (id, x, y) => {
    // console.log("onMoveHandle", id, x, y);
    const { client, moveClientPosition } = this.props;
    const data = { ...client.data };
    data.position = {
      x: x,
      y: y
    };
    // console.log("onMoveHandle",item)
    return moveClientPosition(data);
  };

  render() {
    const { clientPosition } = this.state;
    const { client } = this.props;
    return (
      <>
        <CardPanel
          title={"Location"}
          descriptions={"Can you set your position in the form"}
          onHeaderButtonAction={this.headerButtonActionHandler}
          footerActionButtons={[
            {
              id: "setMyPosition",
              title: "Save",
              label: "Save",
              content: "Save",
              startIcon: <SendIcon fontSize="small" />,
              disabled: this.saveButtonDisabledHandler(),
              loading: false,
              success: false
            }
          ]}
          onFooterButtonAction={this.footerButtonActionHandler}
          options={{
            expandButton: {
              enabled: true,
              callback: this.expandButtonActionHandler
            }
          }}
        >
          <SetClientPositionOnBoardForm
            x={clientPosition.x}
            onChangeX={this.updateX}
            y={clientPosition.y}
            onChangeY={this.updateY}
            onKeyDownEnter={this.keyDownEnterHandler}
          />
        </CardPanel>
        <CardPanel
          options={{
            expandButton: false
          }}
        >
          <StressTestBoard
            clients={[client.data]}
            dragStart={this.dragStartHandle}
            dragEnd={this.dragEndHandle}
            onMove={this.onMoveHandle}
          />
        </CardPanel>
      </>
    );
  }
}

/**
 * Set default props of Board component
 * @type {{}}
 */
Board.defaultProps = {};

/**
 * Validate props of Board component
 * @type {{}}
 */
Board.prototypes = {};

/**
 * Map redux state to Board Component props
 * @param clients
 * @returns {{clients: *}}
 */
const mapStateToProps = ({ client }) => ({ client });

/**
 * Map dispatch function to Board Component props
 * @param dispatch
 * @returns {{fetchClients: (function(): *)}}
 */
const mapDispatchToProps = dispatch => ({
  updateClientPosition: (id, data) =>
    dispatch(updateClientPositionRequest(id, data)),
  dragStartClientPosition: () => dispatch(dragStartClientPositionAction()),
  dragEndClientPosition: () => dispatch(dragEndClientPositionAction()),
  moveClientPosition: data => dispatch(moveClientPositionAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
