import {
  UPDATE_CALL_STATE,
  RESET_CALL_STATE,
  UPDATE_QUE_CALL_STATE,
  UPDATE_LOG_CLICK_TIMER,
  UPDATE_CALL_STATUS,
  UPDATE_CALLED_USER_DETAIL,
} from "../constants/callConstants";
const initialState = {
  callState: {
    callDirection: null,
    dialedNumber: "",
    formattedNumber: "",
    callDuration: null,
    inCall: false,
    isConnecting: false,
  },
  queCallState: {
    requestedNumber: null,
  },
  calledUserDetail: null,
  logClickTimer: null,
  callStatus: null,
};
export default function callReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CALL_STATE:
      return {
        ...state,
        callState: payload,
      };
    case RESET_CALL_STATE:
      return {
        ...state,
        callState: {
          callDirection: null, // 1 = Outgoing  2 = Incoming
          dialedNumber: "",
          formattedNumber: "",
          callDuration: null,
          inCall: false,
        },
      };
    case UPDATE_CALLED_USER_DETAIL:
      return {
        ...state,
        calledUserDetail: payload,
      };
    case UPDATE_QUE_CALL_STATE:
      return {
        ...state,
        queCallState: payload,
      };
    case UPDATE_LOG_CLICK_TIMER:
      return {
        ...state,
        logClickTimer: Date.now(),
      };
    case UPDATE_CALL_STATUS:
      return {
        ...state,
        callStatus: payload,
      };
    default:
      return state;
  }
}
