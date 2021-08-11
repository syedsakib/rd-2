import { WINDOW_RESIZED, SET_ENVIRONMENT } from "../constants/constants";

export const windowScreenSizeUpdater = (newSize) => (dispatch) => {
  dispatch({
    type: WINDOW_RESIZED,
    payload: newSize,
  });
};

export const updateEnvironment = (value) => (dispatch) => {
  dispatch({
    type: SET_ENVIRONMENT,
    payload: value,
  });
};
