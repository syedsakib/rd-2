import { toastr } from "react-redux-toastr";
import SeniorLivingConstants from "../constants/seniorLiving_constants";
import { postRequestWithAuth } from "./apiAction";
import { UPDATE_LEAD_COUNT } from "../constants/adviserConstants";

export const updateLeadCount = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_LEAD_COUNT,
    payload: data,
  });
};

//------------Partners routes------------------//
export const getAllLeads =
  (
    pageNumber,
    searchText,
    searchStatus,
    sortingOrder,
    sortingColumn,
    searchAssignStatus,
    totalRecord
  ) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth("admin/getAllLead", {
        pageNumber,
        searchText,
        searchStatus,
        sortingOrder,
        sortingColumn,
        searchAssignStatus,
        totalRecord,
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

export const getUnSeenLeadCount = (filterOptions) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`adviser/getUnSeenLeadCount`, {
      ...filterOptions,
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

export const getAllLeadAssignList =
  (
    pageNumber,
    searchText,
    searchStatus,
    sortingOrder,
    sortingColumn,
    totalRecord,
    leadId
  ) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth("admin/getAllLeadAssignList", {
        pageNumber,
        searchText,
        searchStatus,
        sortingOrder,
        sortingColumn,
        totalRecord,
        leadId,
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

export const assignSelectedAdvisor =
  (advisorId, leadId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("adviser/assignSelectedAdvisor", {
        advisorId,
        leadId,
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

export const onLeadStatusChange = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/onLeadStatusChange", {
      ...formData,
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

export const assignAdvisorAsPerRegion =
  (leadId, propertyId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        "adviser/assignAdvisorAsPerRegion",
        {
          leadId,
          propertyId,
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

export const getAllLeadProperties =
  (leadId, pageNumber) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("admin/getAllLeadProperties", {
        leadId,
        pageNumber,
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

export const getActivity = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getActivity", {
      id,
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

export const getLeadActivity = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getLeadActivity", {
      ...formData,
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

export const getRejectedLeads = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getRejectedLeads");
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

export const getAllLeadsCallLogs =
  (pageNumber, assignLeadId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("admin/getAllLeadsCallLogs", {
        pageNumber,
        assignLeadId,
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

export const getSeniorLivingServiceCategory = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "adviser/getSeniorLivingServiceCategory"
    );
    const { data, status } = result.data;
    if (status === 200) {
      dispatch({
        type: SeniorLivingConstants.FETCHED_SERVICES,
        payload: data.services,
      });
      dispatch({
        type: SeniorLivingConstants.FETCHED_AMENITIES,
        payload: data.amenities,
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};
