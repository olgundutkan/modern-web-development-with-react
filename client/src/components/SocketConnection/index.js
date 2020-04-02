/**
 * Created by olgundutkan on 24.03.2020
 */

import React from "react";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import {
  fetchCurrentClientLoading,
  fetchCurrentClientSuccess,
  updateClientPosition
} from "../../actions/clients/client";
import {
  connectedNewClient,
  disconnectedClient
} from "../../actions/clients/client";
import { removeClientInLocalStorage } from "../../common";

const endpoint = `${process.env.REACT_APP_SOCKET_SERVER_URL}:${process.env.REACT_APP_SOCKET_SERVER_PORT}`;

const socket = socketIOClient(endpoint, {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ["websocket"]
});

class SocketConnection extends React.Component {
  state = {};
  static getDerivedStateFromProps(props, state) {
    const { client } = props;
    if (client.drag && client.data) {

      socket.emit("clientMoveOnBoard", client.data);
    }
    return null;
  }
  /**
   * When Socket Connection Component did mount
   */
  componentDidMount() {
    const {
      client,
      clientConnecting,
      clientConnectionSuccess,
      clientConnectToSocket,
      clientDisconnectedToSocket,
      clientUpdatedToSocket
    } = this.props;

    // If has not connection to server
    // try connection to server
    if (!client.success && !client.data) {
      clientConnecting();
      socket.emit("clientConnection");
    }

    socket.on("clientDraggingOnBoard", client => {
      return clientUpdatedToSocket(client);
    });

    // Current client connected
    socket.on("currentClientConnected", client => {
      return clientConnectionSuccess(client);
    });

    // Connected other clients
    socket.on("clientConnected", client => {
      return clientConnectToSocket(client);
    });

    // Disconnect other clients
    socket.on("clientDisconnected", client => {
      return clientDisconnectedToSocket(client);
    });

    // Update client position
    socket.on("clientUpdated", data => {
      return clientUpdatedToSocket(data);
    });

    // Disconnect current client
    window.addEventListener("beforeunload", ev => {
      const { client } = this.props;
      removeClientInLocalStorage();
      return socket.emit("clientDisconnect", client.data);
    });
  }

  /**
   * When Socket Connection Component will un mount
   */
  componentWillUnmount() {}

  render() {
    return <></>;
  }
}

/**
 * Set default props of SocketConnection component
 * @type {{}}
 */
SocketConnection.defaultProps = {};

/**
 * Validate props of SocketConnection component
 * @type {{}}
 */
SocketConnection.prototypes = {};

/**
 * Map redux state to SocketConnection Component props
 * @param clients
 * @returns {{clients: *}}
 */
const mapStateToProps = ({ client }) => ({ client });

/**
 * Map dispatch function to SocketConnection Component props
 * @param dispatch
 * @returns {{fetchClients: (function(): *)}}
 */
const mapDispatchToProps = dispatch => ({
  clientConnecting: () => dispatch(fetchCurrentClientLoading()),
  clientConnectionSuccess: data => dispatch(fetchCurrentClientSuccess(data)),
  clientConnectToSocket: data => dispatch(connectedNewClient(data)),
  clientDisconnectedToSocket: data => dispatch(disconnectedClient(data)),
  clientUpdatedToSocket: data => dispatch(updateClientPosition(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnection);
