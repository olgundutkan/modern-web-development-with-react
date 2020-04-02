/**
 * Created by olgundutkan on 14.03.2020
 */

import React from "react";
import PropTypes from "prop-types";
import { fetchClientsRequest } from "../../actions/clients";
import { connect } from "react-redux";
import ClientsTable from "../../components/ClientsTable";
import CanvasBoard from "../../components/CanvasBoard";

class ClientList extends React.Component {
  /**
   * When ClientList Component Mount
   */
  componentDidMount() {
    const { fetchClients } = this.props;

    return fetchClients();
  }

  /**
   * When ClientList Component Unmount
   */
  componentWillUnmount() {}

  render() {
    const { clients } = this.props;
    return (
      <>
        <ClientsTable rows={clients} />
      </>
    );
  }
}

/**
 * Set default props of ClientList component
 * @type {{}}
 */
ClientList.defaultProps = {
  clients: {
    loading: false,
    error: false,
    success: false,
    data: []
  }
};

/**
 * Validate props of ClientList component
 * @type {{}}
 */
ClientList.prototypes = {
  clients: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.bool,
    success: PropTypes.bool,
    data: PropTypes.array
  }).isRequired,
  fetchClients: PropTypes.func.isRequired
};

/**
 * Map redux state to ClientList Component props
 * @param clients
 * @returns {{clients: *}}
 */
const mapStateToProps = ({ clients }) => ({ clients });

/**
 * Map dispatch function to ClientList Component props
 * @param dispatch
 * @returns {{fetchClients: (function(): *)}}
 */
const mapDispatchToProps = dispatch => ({
  fetchClients: () => dispatch(fetchClientsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
