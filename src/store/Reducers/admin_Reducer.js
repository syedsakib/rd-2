import AppConstant from "../constants/admin_constants";
const initialState = [];
export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case AppConstant.Login:
      return action.LoginPayload;

    case AppConstant.Signup:
      return action.SignupPayload;

    case AppConstant.ShowAll:
      return action.ShowAllPayload;

    case AppConstant.ShowEdit:
      return action.ShowEditPayload;

    default:
      return initialState;
  }
}
