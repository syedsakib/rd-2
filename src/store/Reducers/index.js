import { combineReducers } from "redux"
import adminReducer from "./admin_Reducer.js"
import { reducer as toastrReducer } from "react-redux-toastr"
import userDetails from "./userDetails"
import propertyReducer from "./property_reducer"
import globalReducer from "./globalReducer"
import homeCareReducer from "./homeCare_Reducer"
import callReducer from "./callReducer"
import salesReducer from "./salesReducer"
import seniorLivingReducer from "./seniorLivingReducer"
import adviserReducer from "./adviser_Reducer"
import scrapeReducer from "./scrapeReducer"
import partnerReducer from "./partnerReducer"
import callCenterReducer from "./callCenterReducer"
import notiReducer from "./notiReducer"
import cmsReducer from "./cmsReducer"

const rootReducer = combineReducers({
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
