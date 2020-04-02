import {
  DRAG_END_CURRENT_CLIENT_POSITION,
  DRAG_START_CURRENT_CLIENT_POSITION,
  FETCH_CURRENT_CLIENT_FAIL,
  FETCH_CURRENT_CLIENT_LOADING,
  FETCH_CURRENT_CLIENT_SUCCESS,
  MOVE_CURRENT_CLIENT_POSITION,
  UPDATE_CURRENT_CLIENT_POSITION_REQUEST_SUCCESS
} from "../../actions/clients/types";
import { getClientInLocalStorage, setClientInLocalStorage } from "../../common";

const initialState = {
  loading: false,
  error: false,
  drag: false,
  success: !!getClientInLocalStorage(),
  data: getClientInLocalStorage()
};

const fetchClientRequestLoading = (state, action) => ({
  ...state,
  loading: true,
  error: false
});
const fetchClientRequestFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
  success: false
});
const fetchClientRequestSuccess = (state, action) => {
  setClientInLocalStorage(action.payload);
  return {
    ...state,
    loading: false,
    error: false,
    success: true,
    data: action.payload
  };
};

const dragStartClientRequestSuccess = (state, action) => {
  return {
    ...state,
    drag: true
  };
};

const dragEndClientRequestSuccess = (state, action) => {
  return {
    ...state,
    drag: false
  };
};

const moveClientRequestSuccess = (state, action) => {
  setClientInLocalStorage(action.payload);
  return {
    ...state,
    data: action.payload
  };
};

export const client = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_CLIENT_LOADING:
      return fetchClientRequestLoading(state, action);
    case FETCH_CURRENT_CLIENT_FAIL:
      return fetchClientRequestFail(state, action);
    case FETCH_CURRENT_CLIENT_SUCCESS:
      return fetchClientRequestSuccess(state, action);
    case UPDATE_CURRENT_CLIENT_POSITION_REQUEST_SUCCESS:
      return fetchClientRequestSuccess(state, action);
    case DRAG_START_CURRENT_CLIENT_POSITION:
      return dragStartClientRequestSuccess(state, action);
    case DRAG_END_CURRENT_CLIENT_POSITION:
      return dragEndClientRequestSuccess(state, action);
    case MOVE_CURRENT_CLIENT_POSITION:
      return moveClientRequestSuccess(state, action);
    default:
      return state;
  }
};

export default client;
