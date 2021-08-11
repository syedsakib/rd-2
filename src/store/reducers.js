import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//OURS:
import adminReducer from "./Reducers/admin_Reducer.js"
import { reducer as toastrReducer } from "react-redux-toastr"
import userDetails from "./Reducers/userDetails"
import propertyReducer from "./Reducers/property_reducer"
import globalReducer from "./Reducers/globalReducer"
import homeCareReducer from "./Reducers/homeCare_Reducer"
import callReducer from "./Reducers/callReducer"
import salesReducer from "./Reducers/salesReducer"
import seniorLivingReducer from "./Reducers/seniorLivingReducer"
import adviserReducer from "./Reducers/adviser_Reducer"
import scrapeReducer from "./Reducers/scrapeReducer"
import partnerReducer from "./Reducers/partnerReducer"
import callCenterReducer from "./Reducers/callCenterReducer"
import notiReducer from "./Reducers/notiReducer"
import cmsReducer from "./Reducers/cmsReducer"

const rootReducer = combineReducers({
  Layout,
  Login,
  //Account,
  // ForgetPassword,
  //Profile,

  detailR: adminReducer,
  toastr: toastrReducer,
  userDetails: userDetails,
  property: propertyReducer,
  global: globalReducer,
  homeCare: homeCareReducer,
  call: callReducer,
  sale: salesReducer,
  seniorLiving: seniorLivingReducer,
  adviser: adviserReducer,
  scrape: scrapeReducer,
  partner: partnerReducer,
  callCenter: callCenterReducer,
  notification: notiReducer,
  cms: cmsReducer,
})

export default rootReducer
