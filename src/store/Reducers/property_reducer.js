import {
  SET_TEMP_LIKED_PROPERTY,
  REMOVE_TEMP_LIKED_PROPERTY,
} from "../constants/constants";

const defaultStates = {
  candidateLikedPropertyId: null,
};

export default (state = defaultStates, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TEMP_LIKED_PROPERTY:
      console.log(`Property Id is ${payload}`);
      return { ...state, candidateLikedPropertyId: payload };
    case REMOVE_TEMP_LIKED_PROPERTY:
      return { ...state, candidateLikedPropertyId: null };
    default:
      return state;
  }
};
