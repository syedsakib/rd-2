import AppConstant from "../constants/seniorLiving_constants";
const initialState = {
  isLoading: false,
  services: [],
  amenities: [],
};
export default function adminReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AppConstant.FETCHED_SERVICES:
      return { ...state, services: payload };
    case AppConstant.FETCHED_AMENITIES:
      return { ...state, amenities: payload };
    default:
      return state;
  }
}
