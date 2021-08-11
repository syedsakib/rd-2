import { postRequestWithAuth } from "./apiAction";
import { toastr } from "react-redux-toastr";
import axios from "axios";

// user management functions
export const getInternalUserList = (filterData) => async (dispatch) => {
  try {
    console.log("ddd", {
      filterData,
    });
    let result = await postRequestWithAuth(
      "role/getInternalUserList",
      filterData
    );
    console.log(result);
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    console.log(err);
    return false;
  }
};

export const getInternalUserDetail = (filterData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "role/getInternalUserDetail",
      filterData
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const addInternalUser = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("role/addInternalUser", formData);
    const { status, msg } = result.data;
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

export const editInternalUser = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("role/editInternalUser", formData);
    const { status, msg } = result.data;
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

export const updateInternalUserStatus = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "role/updateInternalUserStatus",
      formData
    );
    const { status, msg } = result.data;
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

export const updateUserRoleStatus = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "role/updateUserRoleStatus",
      formData
    );
    const { status, msg } = result.data;
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

//role management functions
export const getRoleTypeList = (filterData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("role/getRoleTypeList", filterData);
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
