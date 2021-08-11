import { UPDATE_WISHLIST } from "../constants/constants";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import { postRequestWithAuth } from "./apiAction";

//------------Partners routes------------------//
export const getWishList = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("user/getWishlistByuser");
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

export const deleteWishList = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("user/deleteWishList", { id });
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

export const getPricing =
  (data, propertyID, propertyName, email, userId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("user/getPricing", {
        ...data,
        propertyID,
        propertyName,
        email,
        userId,
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

export const homeCareRequest = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("user/homeCareRequest", {
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

export const getSuggestedCities = (keyword) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("user/getSuggestedCities", {
      keyword,
    });
    return result.data;
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getSuggestedLocationByZipCode = (keyword) => async (dispatch) => {
  try {
    if (!keyword || keyword.length < 5) {
      // return [];
    }
    let result = await postRequestWithAuth(
      "user/getSuggestedLocationByZipCode",
      { keyword }
    );
    return result.data;
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const addWishList = (propertyID) => async (dispatch) => {
  try {
    let res = await postRequestWithAuth("user/addWishlist", { propertyID });
    if (res.data.status === 200) {
      dispatch({ type: UPDATE_WISHLIST, payload: propertyID });
      return res.data.data;
    } else {
      toastr.error(res.data.msg);
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getPropertyDetails = (slug) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("user/getPropertyDetails", { slug });
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

export const getPropertyFeatures = (pId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("user/getPropertyFeatures", { pId });
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

export const getRecommendedProperties =
  (propertyData, careTypeId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("user/getRecommendedProperties", {
        ...propertyData,
        careTypeId,
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

export const getHomeCareDetail = (slugTitle) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("user/getHomeCareDetail", {
      slugTitle,
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

export const getGetPricingList = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("user/getGetPricingList");
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

export const getRatingReviews = (id, pageNumber) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("user/getRatingReviews", {
      id,
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
