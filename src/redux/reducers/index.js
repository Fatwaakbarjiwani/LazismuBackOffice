import { combineReducers } from "redux";
import authReducer from "./authReducer";
import campaignReducer from "./campaignReducer";
import ziswafReducer from "./ziswafReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  auth: authReducer,
  campaign: campaignReducer,
  ziswaf: ziswafReducer,
  modal: modalReducer,
});
