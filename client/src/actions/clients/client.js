import axios from "../axios";
import {
  CONNECTED_NEW_CLIENT,
  DISCONNECTED_CLIENT,
  UPDATE_CURRENT_CLIENT_POSITION_REQUEST_FAIL,
  UPDATE_CURRENT_CLIENT_POSITION_REQUEST_LOADING,
  UPDATE_CURRENT_CLIENT_POSITION_REQUEST_SUCCESS,
  FETCH_CURRENT_CLIENT_FAIL,
  FETCH_CURRENT_CLIENT_LOADING,
  FETCH_CURRENT_CLIENT_SUCCESS,
  UPDATE_CLIENT_POSITION,
  MOVE_CURRENT_CLIENT_POSITION,
  DRAG_START_CURRENT_CLIENT_POSITION,
  DRAG_END_CURRENT_CLIENT_POSITION
} from "./types";
import { UPDATE_CURRENT_CLIENT_POSITION_REQUEST_URL } from "./url";

/**
 * Fetch Current Client Loading Action Emit
 * @returns {{type: string}}
 */
export const fetchCurrentClientLoading = () => ({
  type: FETCH_CURRENT_CLIENT_LOADING
});

/**
 * Fetch Current Client Fail Action Emit
 * @param error
 * @returns {{payload: *, type: string}}
 */
export const fetchCurrentClientFail = error => ({
  type: FETCH_CURRENT_CLIENT_FAIL,
  error: error
});

/**
 * Fetch Current Client Success Action Emit
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const fetchCurrentClientSuccess = data => ({
  type: FETCH_CURRENT_CLIENT_SUCCESS,
  payload: data
});

/**
 * New Client connected to socket dispatch content
 * @param data
 * @returns {{payload: *, type: string}}
 */
const addClientToState = data => ({
  type: CONNECTED_NEW_CLIENT,
  payload: data
});

/**
 * Client disconnected to socket dispatch content
 * @param data
 * @returns {{payload: *, type: string}}
 */
const removeClientToState = data => ({
  type: DISCONNECTED_CLIENT,
  payload: data
});

/**
 * New Client connected to socket
 * @param data
 * @returns {function(*): *}
 */
export const connectedNewClient = data => dispatch => {
  return dispatch(addClientToState(data));
};

/**
 * Client disconnected to socket
 * @param data
 * @returns {function(*): *}
 */
export const disconnectedClient = data => dispatch => {
  return dispatch(removeClientToState(data));
};

/**
 * Update Current Client Position Request Loading Action Emit
 * @returns {{type: string}}
 */
const updateClientPositionRequestLoading = () => ({
  type: UPDATE_CURRENT_CLIENT_POSITION_REQUEST_LOADING
});

/**
 * Update Current Client Position Request Fail Action Emit
 * @param error
 * @returns {{payload: *, type: string}}
 */
const updateClientPositionRequestFail = error => ({
  type: UPDATE_CURRENT_CLIENT_POSITION_REQUEST_FAIL,
  error: error
});

/**
 * Update Current Client Position Request Success Action Emit
 * @param data
 * @returns {{payload: *, type: string}}
 */
const updateClientPositionRequestSuccess = data => ({
  type: UPDATE_CURRENT_CLIENT_POSITION_REQUEST_SUCCESS,
  payload: data
});

/**
 * Update Current Client Position from the server
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export const updateClientPositionRequest = (id, data) => async dispatch => {
  dispatch(updateClientPositionRequestLoading());
  await axios
    .put(`${UPDATE_CURRENT_CLIENT_POSITION_REQUEST_URL}/${id}`, data)
    .then(function(response) {
      dispatch(updateClientPositionRequestSuccess(response.data));
    })
    .catch(function(error) {
      if (error.response) {
        dispatch(updateClientPositionRequestFail(error.response.data));
      } else if (error.request) {
        dispatch(updateClientPositionRequestFail(error.request));
      } else {
        dispatch(updateClientPositionRequestFail(error.message));
      }
      dispatch(updateClientPositionRequestFail(error.config));
    });
};

/**
 * Client position update event emit
 * @param data
 * @returns {{payload: *, type: string}}
 */
const updateClientToState = data => ({
  type: UPDATE_CLIENT_POSITION,
  payload: data
});

/**
 * Client position update
 * @param data
 * @returns {function(*): *}
 */
export const updateClientPosition = data => dispatch => {
  return dispatch(updateClientToState(data));
};

/**
 * Client drag start event emit
 * @returns {{payload: *, type: string}}
 */
const dragStartClientPosition = () => ({
  type: DRAG_START_CURRENT_CLIENT_POSITION
});

/**
 * Client drag start
 * @returns {function(*): *}
 */
export const dragStartClientPositionAction = () => dispatch => {
  return dispatch(dragStartClientPosition());
};

/**
 * Client drag end event emit
 * @returns {{payload: *, type: string}}
 */
const dragEndClientPosition = () => ({
  type: DRAG_END_CURRENT_CLIENT_POSITION
});

/**
 * Client drag end
 * @returns {function(*): *}
 */
export const dragEndClientPositionAction = () => dispatch => {
  return dispatch(dragEndClientPosition());
};

/**
 * Client Dragging event emit
 * @param data
 * @returns {{payload: *, type: string}}
 */
const moveClientPosition = data => ({
  type: MOVE_CURRENT_CLIENT_POSITION,
  payload: data
});

/**
 * Client dragging
 * @param data
 * @returns {function(*): *}
 */
export const moveClientPositionAction = data => dispatch => {
  return dispatch(moveClientPosition(data));
};
