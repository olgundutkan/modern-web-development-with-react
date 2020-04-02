import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StressTestBoard from "../../components/StressTestBoard";
import { fetchClientsRequest } from "../../actions/clients";

class Dashboard extends React.Component {
  /**
   * When Dashboard Component Mount
   */
  componentDidMount() {
    const { fetchClients } = this.props;

    return fetchClients();
  }

  /**
   * When Dashboard Component Unmount
   */
  componentWillUnmount() {}

  render() {
    const { clients } = this.props;
    return <StressTestBoard clients={clients.data} />;
  }
}

/**
 * Set default props of Dashboard component
 * @type {{}}
 */
Dashboard.defaultProps = {};

/**
 * Validate props of Dashboard component
 * @type {{}}
 */
Dashboard.prototypes = {
  fetchClientId: PropTypes.func.isRequired
};

/**
 * Map redux state to Dashboard Component props
 * @returns {{}}
 */
const mapStateToProps = ({ client, clients }) => ({ client, clients });

/**
 * Map dispatch function to Dashboard Component props
 * @param dispatch
 * @returns {{}}
 */
const mapDispatchToProps = dispatch => ({
  fetchClients: () => dispatch(fetchClientsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
