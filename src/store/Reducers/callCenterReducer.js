import {
  UPDATE_CALL_QUEUE_LIST,
  UPDATE_QUEUE_LEAD_TITLE,
} from "../constants/callConstants";
const initialState = {
  callQueueList: [],
  inCallCount: 0,
  inQueueCount: 0,
  queueLeadTitle: null,
};
export default function callReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CALL_QUEUE_LIST:
      return {
        ...state,
        callQueueList: payload.list,
        inCallCount: payload.inCallCount,
        inQueueCount: payload.inQueueCount,
      };
    case UPDATE_QUEUE_LEAD_TITLE:
      return {
        ...state,
        queueLeadTitle: `${payload}|-|${Date.now()}`,
      };
    default:
      return state;
  }
}
