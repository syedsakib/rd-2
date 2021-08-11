import {
  WINDOW_RESIZED,
  UPDATE_LOG_COUNT,
  UPDATE_SOCKET_CON,
  SET_ENVIRONMENT,
} from "../constants/constants";
const initialState = {
  appSize: { width: window.innerWidth, height: window.innerHeight },
  topCities: [],
  logCount: 0,
  socket: null,
  environment: "local",
};
export default function adminReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case WINDOW_RESIZED:
      return {
        ...state,
        appSize: { width: payload.width, height: payload.height },
      };
    case SET_ENVIRONMENT:
      return {
        ...state,
        environment: payload,
      };
    case UPDATE_LOG_COUNT:
      return {
        ...state,
        logCount: payload,
      };
    case UPDATE_SOCKET_CON:
      return {
        ...state,
        socket: payload,
      };
    default:
      return state;
  }
}
