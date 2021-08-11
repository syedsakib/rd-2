import {
  UPDATE_CREATE_PROPERTY_STATE,
  CLEAR_CREATE_PROPERTY_STATE,
} from "../constants/partnerConstants";

const initialState = {
  userFilterState: {
    searchText: "",
    activePage: 1,
  },
  createPropertyState: {
    basicProfile: {
      businessTitle: "",
      address: "",
      city: "",
      state: "",
      stateCode: "",
      county: "",
      email: "",
      zipcode: "",
      phone: "",
      mailingAddress: "",
      mailingZipcode: "",
      mailingCity: "",
      mailingState: "",
      mailingEmail: "",
      fax: "",
      licenseNumber: "",
      licenseExpires: "",
      licenseStatus: "",
      recentInspectionDate: "",
      website: "",
      administratorName: "",
      administratorPhone: "",
      // citations: "",
      capacity: "",
      description: "",
      companyName: "",
      facilityStatus: "Active",
      facilityURL: "",
      // licensureDate: "",
      medicaidId: "",
      medicareId: "",
      acceptMedicaid: false,
      acceptMedicare: false,
      editorDescription: "",
    },
    careTypeList: [],
    amenityList: [],
    serviceList: [],
    communityList: [],
    imageList: [],
    removedImageList: [],
    roomList: [],
  },
  propertyListFilterState: {
    selectedState: "all",
    selectedCities: [],
    selectedZipCodes: [],
    selectedCategories: [],
    activePage: 1,
    searchText: "",
    limit: 20,
  },
};
export default function adviserReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CREATE_PROPERTY_STATE:
      return {
        ...state,
        createPropertyState: payload,
      };
    case CLEAR_CREATE_PROPERTY_STATE:
      console.log(`Clearing Property`);
      return {
        ...state,
        createPropertyState: {
          basicProfile: {
            businessTitle: "",
            address: "",
            city: "",
            state: "",
            stateCode: "",
            county: "",
            email: "",
            zipcode: "",
            phone: "",
            mailingAddress: "",
            mailingZipcode: "",
            mailingCity: "",
            mailingState: "",
            mailingEmail: "",
            fax: "",
            licenseNumber: "",
            licenseExpires: "",
            licenseStatus: "",
            recentInspectionDate: "",
            website: "",
            administratorName: "",
            administratorPhone: "",
            // citations: "",
            capacity: "",
            description: "",
            companyName: "",
            facilityStatus: "Active",
            facilityURL: "",
            // licensureDate: "",
            medicaidId: "",
            medicareId: "",
            acceptMedicaid: false,
            acceptMedicare: false,
            editorDescription: "",
          },
          careTypeList: [],
          amenityList: [],
          serviceList: [],
          communityList: [],
          imageList: [],
          removedImageList: [],
          roomList: [],
        },
      };
    default:
      return state;
  }
}
