import { SENIOR_LIVING_TYPE, UPDATE_WISHLIST } from "../constants/constants";
import {
  USER_AUTHENTICATED,
  LOGOUT_USER,
  USER_AUTHENTICATION_FAILED,
} from "../constants/authConstants";

const initialState = {
  isLoading: true,
  loggedInUser: null,
  isAuthenticated: false,
};
export default function adminReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case USER_AUTHENTICATED:
      return {
        ...state,
        isLoading: false,
        loggedInUser: payload,
        isAuthenticated: true,
      };
    case USER_AUTHENTICATION_FAILED:
      return {
        ...state,
        isLoading: false,
        loggedInUser: null,
        isAuthenticated: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        loggedInUser: null,
      };
    case SENIOR_LIVING_TYPE:
      return {
        seniorLivingTypeList: payload,
        ...state,
      };
    case UPDATE_WISHLIST:
      let wishLists = state.loggedInUser.wishlists;
      let arr = wishLists.filter((item) => item.PropertyId == payload);
      if (arr[0]) {
        wishLists = wishLists.filter((item) => item.PropertyId != payload);
      } else {
        wishLists.push({ PropertyId: payload });
      }
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          wishlists: wishLists,
        },
      };

    default:
      return { ...state };
  }
}
