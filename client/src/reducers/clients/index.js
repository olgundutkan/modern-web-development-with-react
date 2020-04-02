import {
  CONNECTED_NEW_CLIENT,
  DISCONNECTED_CLIENT,
  FETCH_CLIENTS_REQUEST_FAIL,
  FETCH_CLIENTS_REQUEST_LOADING,
  FETCH_CLIENTS_REQUEST_SUCCESS,
  UPDATE_CLIENT_POSITION
} from "../../actions/clients/types";

const initialState = {
  loading: false,
  error: false,
  success: false,
  data: []
};

const fetchClientsRequestLoading = (state, action) => ({
  ...state,
  loading: true,
  error: false
});

const fetchClientsRequestFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
  success: false
});

const fetchClientsRequestSuccess = (state, action) => ({
  ...state,
  loading: false,
  error: false,
  success: true,
  data: action.payload
});

const addedNewClient = (state, action) => {
  const index = state.data.findIndex(client => client.id === action.payload.id);

  if (index === -1) {
    return {
      ...state,
      data: [...state.data, action.payload]
    };
  }
  return {
    ...state
  };
};

const removeClient = (state, action) => {
  const index = state.data.findIndex(client => client.id === action.payload.id);
  if (index !== -1) {
    state.data.splice(index, 1);
    return {
      ...state
    };
  }
  return {
    ...state
  };
};

const updateClientPosition = (state, action) => {
  const index = state.data.findIndex(client => client.id === action.payload.id);
  if (index !== -1) {
    state.data[index] = action.payload;
    return {
      ...state
    };
  }
  return { ...state };
};

export const clients = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_REQUEST_LOADING:
      return fetchClientsRequestLoading(state, action);
    case FETCH_CLIENTS_REQUEST_FAIL:
      return fetchClientsRequestFail(state, action);
    case FETCH_CLIENTS_REQUEST_SUCCESS:
      return fetchClientsRequestSuccess(state, action);
    case CONNECTED_NEW_CLIENT:
      return addedNewClient(state, action);
    case DISCONNECTED_CLIENT:
      return removeClient(state, action);
    case UPDATE_CLIENT_POSITION:
      return updateClientPosition(state, action);
    default:
      return state;
  }
};

export default clients;
