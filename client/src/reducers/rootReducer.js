import { combineReducers } from "redux";
import {client} from "./clients/client";
import {clients} from "./clients";
export default combineReducers({
  clients,
  client
});
