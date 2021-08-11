import { UPDATE_FORM_STATE } from "../constants/cmsConstants"

const initialState = {
  formState: {},
}
export default function cmsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_FORM_STATE:
      return {
        ...state,
        formState: { ...state.formState, ...payload },
      }
    default:
      return state
  }
}
