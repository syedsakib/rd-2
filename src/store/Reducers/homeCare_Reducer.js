import AppConstant from "../constants/homeCare_constants";
const initialState = {
  isLoading: false,
  packageList: [],
  serviceList: [],
  serviceCategory: [],
  progressFormState: {
    basicData: {},
    serviceData: {},
    packageData: {},
    billingData: {},
    regionData: [],
    promoCodeList: [],
  },
};
export default function adminReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AppConstant.FETCHED_PACKAGE_LIST:
      return { ...state, packageList: payload };
    case AppConstant.FETCHED_SERVICE_CATEGORIES:
      return { ...state, serviceCategory: payload };
    case AppConstant.FETCHED_SERVICES_LIST:
      return { ...state, serviceList: payload };
    case AppConstant.UPDATE_PROGRESS_FORM_STATE:
      return { ...state, progressFormState: payload };
    case AppConstant.FETCHED_BUSINESS_PROFILE:
      return { ...state, businessProfile: payload, isLoading: false };
    default:
      return state;
  }
}
