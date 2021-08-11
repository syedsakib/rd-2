import {
  UPDATE_AGENCY_FILTER_STATE,
  UPDATE_AGENCY_LOCATION_FILTER_STATE,
  UPDATE_SALE_LIST_FILTER_STATE,
} from "../constants/saleConstants";
import { getCurrentDate, getFirstMonthDate } from "../utils/util";
const initialState = {
  agencyListFilterState: {
    activePage: 1,
    selectedSaleStatus: "all",
    selectedClaimStatus: "",
    selectedState: "all",
    selectedCities: [],
    selectedZipCodes: [],
    searchText: "",
    selectedRadius: "",
  },
  agencyListLocationFilterState: {
    stateList: [],
    stateCities: [],
    cityList: [],
    zipCodeList: [],
  },
  saleListFilterState: {
    activePage: 1,
    startDate: getFirstMonthDate(),
    endDate: getCurrentDate(),
    selectedStatus: "all",
    searchText: "",
  },
};
export default function callReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_AGENCY_FILTER_STATE:
      return {
        ...state,
        agencyListFilterState: payload,
      };
    case UPDATE_AGENCY_LOCATION_FILTER_STATE:
      return {
        ...state,
        agencyListLocationFilterState: payload,
      };
    case UPDATE_SALE_LIST_FILTER_STATE:
      return {
        ...state,
        saleListFilterState: payload,
      };
    default:
      return state;
  }
}
