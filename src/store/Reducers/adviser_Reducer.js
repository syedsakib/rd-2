import {
  UPDATE_USER_PAGE_STATE,
  UPDATE_ADVISER_PROPERTY_FILTER_STATE,
  CLEAR_PROPERTY_FILTER_STATE,
  UPDATE_LEAD_COUNT,
} from "../constants/adviserConstants";

const initialState = {
  userFilterState: {
    searchText: "",
    activePage: 1,
  },
  propertyListFilterState: {
    selectedState: "all",
    selectedCities: [],
    selectedZipCodes: [],
    selectedCategories: [],
    activePage: 1,
    searchText: "",
    limit: 20,
    stateCities: [],
    cityList: [],
    zipCodeList: [],
    propertyStatus: 1,
    selectedStatus: 1,
    selectedUpdateStatus: "not-updated",
  },
  leadCount: {
    seniorLiving: 0,
    homeCare: 0,
  },
};
export default function adviserReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER_PAGE_STATE:
      return {
        ...state,
        userFilterState: payload,
      };
    case UPDATE_ADVISER_PROPERTY_FILTER_STATE:
      return {
        ...state,
        propertyListFilterState: payload,
      };
    case CLEAR_PROPERTY_FILTER_STATE:
      return {
        ...state,
        propertyListFilterState: initialState.propertyListFilterState,
      };
    case UPDATE_LEAD_COUNT:
      return {
        ...state,
        leadCount: payload,
      };
    default:
      return state;
  }
}
