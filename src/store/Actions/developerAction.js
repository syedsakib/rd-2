import axios from "axios";
import { toastr } from "react-redux-toastr";
import { postRequest, postRequestWithAuth } from "./apiAction";

export const getAppLogs = (pageNumber, options) => async (dispatch) => {
  try {
    const {
      searchText,
      selectedStatus,
      startDate,
      endDate,
      sortingOrder,
      sortingColumn,
    } = options;
    let res = await postRequestWithAuth("developer/getAppLogs", {
      pageNumber,
      searchText,
      selectedStatus,
      startDate,
      endDate,
      sortingOrder,
      sortingColumn,
    });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
  }
};
