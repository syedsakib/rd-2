import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"

export default function* rootSaga() {
  yield all([
    //public
    //fork(AccountSaga),
    //fork(AuthSaga),
    // fork(ForgetSaga),
    //fork(ProfileSaga),
    fork(LayoutSaga),
    // fork(ecommerceSaga),
    //fork(calendarSaga),
    //fork(chatSaga),
    // fork(mailsSaga),
    // fork(cryptoSaga),
    //fork(invoiceSaga),
    //fork(projectsSaga),
    //fork(tasksSaga),
    //fork(contactsSaga),
    //fork(dashboardSaga),
    //fork(dashboardSaasSaga)
  ])
}
