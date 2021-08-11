import { UPDATE_NOTIFICATION_DETAIL } from "../constants/noti_constants";

const initialState = {
  notiDetail: null,
};
export default function notificationReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NOTIFICATION_DETAIL:
      return {
        ...state,
        notiDetail: payload,
      };
    default:
      return state;
  }
}
