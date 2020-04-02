import axios from "../axios";
import { FETCH_CLIENTS_REQUEST_URL } from "./url";
import {
  FETCH_CLIENTS_REQUEST_FAIL,
  FETCH_CLIENTS_REQUEST_LOADING,
  FETCH_CLIENTS_REQUEST_SUCCESS
} from "./types";

/**
 * Fetch CLIENTS Request Loading Action Emit
 * @returns {{type: string}}
 */
const fetchClientsRequestLoading = () => ({
  type: FETCH_CLIENTS_REQUEST_LOADING
});

/**
 * Fetch CLIENTS Request Fail Action Emit
 * @param error
 * @returns {{payload: *, type: string}}
 */
const fetchClientsRequestFail = error => ({
  type: FETCH_CLIENTS_REQUEST_FAIL,
  error: error
});

/**
 * Fetch CLIENTS Request Success Action Emit
 * @param data
 * @returns {{payload: *, type: string}}
 */
const fetchClientsRequestSuccess = data => ({
  type: FETCH_CLIENTS_REQUEST_SUCCESS,
  payload: data
});

/**
 * Fetch CLIENTS from the server
 * @param params
 * @returns {function(*): AxiosResponse<T>}
 */
export const fetchClientsRequest = (params) => async dispatch => {
  dispatch(fetchClientsRequestLoading());
  await axios
      .get(FETCH_CLIENTS_REQUEST_URL, params)
      .then(function(response) {
        dispatch(fetchClientsRequestSuccess(response.data));
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          dispatch(fetchClientsRequestFail(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request);
          dispatch(fetchClientsRequestFail(error.request));
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log("Error", error.message);
          dispatch(fetchClientsRequestFail(error.message));
        }
        // console.log(error.config);
        dispatch(fetchClientsRequestFail(error.config));
      });
};
