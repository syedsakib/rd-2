import {
  UPDATE_PROPERTY_SERVICES,
  UPDATE_AMENITY_SERVICES,
  UPDATE_COMMUNITY_SERVICES,
  UPDATE_PROPERTY_LIST_FILTER,
  UPDATE_PROPERTY_CARE_TYPES,
  UPDATE_PROPERTY_ROOM_TYPES,
} from "../constants/scrapeConstants";
const initialState = {
  propertyFilterState: {
    activePage: 1,
    selectedImageScrapeStatus: "",
    selectedMonitorStatus: "all",
    selectedFixStatus: 1,
    selectedCityValidationStatus: "",
    selectedState: "all",
    selectedCities: [],
    selectedZipCodes: [],
    searchText: "",
    isAllSelected: false,
    limit: 20,
  },
  pServiceList: {},
  pCommunityList: {},
  pAmenityList: {},
  pCareTypeList: {},
  pRoomTypeList: {},
};
export default function scrapeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROPERTY_SERVICES:
      return {
        ...state,
        pServiceList: payload,
      };
    case UPDATE_AMENITY_SERVICES:
      return {
        ...state,
        pAmenityList: payload,
      };
    case UPDATE_COMMUNITY_SERVICES:
      return {
        ...state,
        pCommunityList: payload,
      };
    case UPDATE_PROPERTY_CARE_TYPES:
      return {
        ...state,
        pCareTypeList: payload,
      };
    case UPDATE_PROPERTY_LIST_FILTER:
      return {
        ...state,
        propertyFilterState: payload,
      };
    case UPDATE_PROPERTY_ROOM_TYPES:
      return {
        ...state,
        pRoomTypeList: payload,
      };
    default:
      return state;
  }
}
