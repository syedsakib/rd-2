import axios from "axios";
import { toastr } from "react-redux-toastr";
import FileDownload from "js-file-download";
import {
  UPDATE_COMMUNITY_SERVICES,
  UPDATE_AMENITY_SERVICES,
  UPDATE_PROPERTY_SERVICES,
  UPDATE_PROPERTY_LIST_FILTER,
  UPDATE_PROPERTY_CARE_TYPES,
  UPDATE_PROPERTY_ROOM_TYPES,
} from "../constants/scrapeConstants";
import { postRequestWithAuth } from "./apiAction";

const locationUrl = window.location.href;
let API_ENDPOINT = "https://api.boomershub.com/api";
if (
  locationUrl.search("localhost") > -1 ||
  locationUrl.search("127.0.0.1") > -1
) {
  //API_ENDPOINT = "http://localhost:12000/api"
  API_ENDPOINT = "https://api.boomershub.com/api";
}

export const updatePServiceList = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_PROPERTY_SERVICES,
    payload: data,
  });
};
export const updatePAmenityList = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_AMENITY_SERVICES,
    payload: data,
  });
};
export const updatePCommunityList = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_COMMUNITY_SERVICES,
    payload: data,
  });
};
export const updatePCareTypeList = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_PROPERTY_CARE_TYPES,
    payload: data,
  });
};
export const updatePRoomTypeList = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_PROPERTY_ROOM_TYPES,
    payload: data,
  });
};

export const updatePropertyFilterStates = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_PROPERTY_LIST_FILTER,
    payload: data,
  });
};

export const getPropertyList =
  (pageNumber, filterOption) => async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
      let headers = {
        "Content-Type": "application/json",
      };
      console.log(`Filter Option`, filterOption);
      let result = await axios.post(
        `${API_ENDPOINT}/property/getList`,
        { pageNumber, ...filterOption },
        { headers: headers }
      );
      const { data, status } = result.data;
      if (status === 200) {
        return data;
      } else {
        return false;
      }
    } catch (e) {
      toastr.error("Error", "Something went wrong, Please try again");
      return false;
    }
  };

export const getInvalidPropertyList =
  (pageNumber, filterOption) => async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
      let headers = {
        "Content-Type": "application/json",
      };
      console.log(`Filter Option`, filterOption);
      let result = await axios.post(
        `${API_ENDPOINT}/property/getInvalidList`,
        { pageNumber, ...filterOption },
        { headers: headers }
      );
      const { data, status } = result.data;
      if (status === 200) {
        return data;
      } else {
        return false;
      }
    } catch (e) {
      toastr.error("Error", "Something went wrong, Please try again");
      console.log(e);
      return false;
    }
  };

export const getPropertyDetail = (pId) => async (dispatch) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
    };
    let result = await axios.post(
      `${API_ENDPOINT}/property/getOne`,
      { pId },
      { headers: headers }
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (e) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getInvalidPropertyDetail = (pId) => async (dispatch) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
    };
    let result = await axios.post(
      `${API_ENDPOINT}/property/getInvalidOne`,
      { pId },
      { headers: headers }
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (e) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getPropertyPhotos = (pId) => async (dispatch) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
    };
    let result = await axios.post(
      `${API_ENDPOINT}/property/getPhotos`,
      { pId },
      { headers: headers }
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (e) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const updatePropertyPhotoDetail = (formData) => async (dispatch) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
    };
    let result = await axios.post(
      `${API_ENDPOINT}/property/updatePhoto`,
      formData,
      { headers: headers }
    );
    const { msg, status } = result.data;
    if (status === 200) {
      toastr.success("Success", msg);
      return true;
    } else {
      toastr.error("Error", msg);
      return false;
    }
  } catch (e) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const updatePropertyDetail =
  (pId, updateOf, formData) => async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
      let headers = {
        "Content-Type": "application/json",
      };
      let result = await axios.post(
        `${API_ENDPOINT}/property/update`,
        { pId, updateOf, formData },
        { headers: headers }
      );
      const { msg, status } = result.data;
      if (status === 200) {
        toastr.success("Success", msg);
        return true;
      } else {
        toastr.error("Error", msg);
        return false;
      }
    } catch (e) {
      toastr.error("Error", "Something went wrong, Please try again");
      return false;
    }
  };

export const updateInvalidPropertyDetail =
  (pId, updateOf, formData) => async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
      let headers = {
        "Content-Type": "application/json",
      };
      let result = await axios.post(
        `${API_ENDPOINT}/property/updateInvalid`,
        { pId, updateOf, formData },
        { headers: headers }
      );
      const { msg, status } = result.data;
      console.log(result);
      if (status === 200) {
        toastr.success("Success", msg);
        return true;
      } else {
        toastr.error("Error", msg);
        return false;
      }
    } catch (e) {
      toastr.error("Error", "Something went wrong, Please try again");
      return false;
    }
  };

export const updatePropertyMonitorStatus =
  (pId, monitorStatus) => async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
      let headers = {
        "Content-Type": "application/json",
      };
      let result = await axios.post(
        `${API_ENDPOINT}/property/updatePropertyMonitorStatus`,
        { pId, monitorStatus },
        { headers: headers }
      );
      console.log(result);
      const { msg, status } = result.data;
      if (status === 200) {
        toastr.success("Success", msg);
        return true;
      } else {
        toastr.error("Error", msg);
        return false;
      }
    } catch (e) {
      toastr.error("Error", "Something went wrong, Please try again");
      return false;
    }
  };

export const getPropertyServiceList = (filterOptions) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "scrape/getPropertyServiceList",
      filterOptions
    );
    const { data, status } = result.data;
    if (status === 200) {
      console.log(data);
      dispatch(updatePServiceList(data));
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getPropertyCommunityList = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("scrape/getPropertyCommunityList");
    const { data, status } = result.data;
    if (status === 200) {
      dispatch(updatePCommunityList(data));
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getPropertyAmenityList = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("scrape/getPropertyAmenityList");
    const { data, status } = result.data;
    if (status === 200) {
      dispatch(updatePAmenityList(data));
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getPropertyCareTypeList = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("scrape/getPropertyCareTypeList");
    const { data, status } = result.data;
    if (status === 200) {
      dispatch(updatePCareTypeList(data));
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getPropertyRoomTypes = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("scrape/getPropertyRoomTypes");
    const { data, status } = result.data;
    if (status === 200) {
      // console.log(`updatePRoomTypeList`, data);
      dispatch(updatePRoomTypeList(data));
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getDataProcessList = (filterState) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("scrape/getDataProcessList", {
      ...filterState,
    });
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getDataProcessTrackerList = (filterState) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("scrape/getDataProcessTrackerList", {
      ...filterState,
    });
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getPropertyUpdateHistoryList =
  (filterState) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        "scrape/getPropertyUpdateHistoryList",
        {
          ...filterState,
        }
      );
      const { data, status } = result.data;
      if (status === 200) {
        return data;
      } else {
        return false;
      }
    } catch (err) {
      toastr.error("Error", "Something went wrong, Please try again");
      return false;
    }
  };

export const createDataUpdateProcess =
  (processOf, filterState) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("scrape/createDataUpdateProcess", {
        processOf,
        filterState,
      });
      const { msg, status } = result.data;
      if (status === 200) {
        toastr.success("Success", msg);
        return true;
      } else {
        toastr.error("Error", msg);
        return false;
      }
    } catch (err) {
      toastr.error("Error", "Something went wrong, Please try again");
      return false;
    }
  };

export const cancelDataUpdateProcess = (processId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("scrape/cancelDataUpdateProcess", {
      processId,
    });
    const { msg, status } = result.data;
    if (status === 200) {
      toastr.success("Success", msg);
      return true;
    } else {
      toastr.error("Error", msg);
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const updateProcessApprovalStatus =
  (processId, approvalStatus) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        "scrape/updateProcessApprovalStatus",
        {
          processId,
          approvalStatus,
        }
      );
      const { msg, status } = result.data;
      if (status === 200) {
        toastr.success("Success", msg);
        return true;
      } else {
        toastr.error("Error", msg);
        return false;
      }
    } catch (err) {
      toastr.error("Error", "Something went wrong, Please try again");
      return false;
    }
  };

export const exportToCsvProcessData = (filterOption) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("scrape/exportToCsvProcessData", {
      ...filterOption,
    });
    const { status } = result.data;
    if (status && status !== 200) {
      console.log(result);
    } else {
      FileDownload(result.data, "dataList.csv");
      console.log(result);
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};
