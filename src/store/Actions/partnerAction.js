import { SENIOR_LIVING_TYPE } from "../constants/constants";
import {
  UPDATE_CREATE_PROPERTY_STATE,
  CLEAR_CREATE_PROPERTY_STATE,
} from "../constants/partnerConstants";
import { UPDATE_NOTIFICATION_DETAIL } from "../constants/noti_constants";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import { postRequestWithAuth } from "./apiAction";
//------------Partners routes------------------//

export function seniorLivingtype(data) {
  return {
    type: SENIOR_LIVING_TYPE,
    Payload: data,
  };
}

export function updateNotificationData(data) {
  return {
    type: UPDATE_NOTIFICATION_DETAIL,
    payload: data,
  };
}

export const addBasicBusinessInformation =
  (formData, history) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        "partner/addBasicBusinessInformation",
        { data: formData }
      );
      const { msg, status, data } = result.data;
      if (status === 200) {
        toastr.success("Success", msg);
        return data;
      } else {
        toastr.error("Error", msg);
        return false;
      }
    } catch (err) {
      toastr.error("Error", "Something went wrong, Please try again");
      return false;
    }
  };

export const getseniorLivingtype = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getseniorLivingtype");
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

export const getAutoCompleteForCity = (query) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getAutoCompleteForCity", {
      query,
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

export const getAminites = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getAminites");
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

export const getCommunity = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getCommunity");
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

export const updateProperty =
  (community, aminity, id, userType, propertyId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("partner/updateProperty", {
        community,
        aminity,
        id,
        userType,
        propertyId,
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

export const addPricingDetails = (formData, id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/addPricingDetails", {
      data: formData,
      id,
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

export const getPropertyDetails = (propertyId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getPropertyDetails", {
      propertyId,
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

export const getPricingDetail =
  (id, userType, propertyId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("partner/getPricingDetail", {
        id,
        userType,
        propertyId,
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

export const updateDiscription = (formData, propertyId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getPricingDetail", {
      data: formData,
      propertyId,
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

export const getDiscription = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getDiscription");
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

export const getServices = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getServices");
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

export const updateServices =
  (service, id, userType, propertyId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("partner/updateServices", {
        service,
        id,
        userType,
        propertyId,
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

export const removePropertyImage = (Image, id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/removePropertyImage", {
      Image,
      id,
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

export const addVideoLink =
  (link, id, userType, propertyId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("partner/addVideoLink", {
        link,
        id,
        userType,
        propertyId,
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

export const sendForAdminApproval = (propertyID) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/sendForAdminApproval", {
      propertyID,
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

export const sendForgotEmail = (email, userType) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("user/sendForgotEmail", {
      email,
      userType,
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

export const forgotPassword =
  (password, forgotToken, history) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("user/forgotPassword", {
        password,
        forgotToken,
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

export const getServiceListingDetails = (propertyID) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getServiceListingDetails", {
      propertyID,
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

export const getRoomTypes = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getRoomTypes");
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

export const addPropertyPricingDetails =
  (pricingDetails, id, userType, propertyId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        "partner/addPropertyPricingDetails",
        { pricingDetails, id, userType, propertyId }
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

export const deletePropertyPricingDetail =
  (pricingDetails, id, propertyId, userType) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        "partner/deletePropertyPricingDetail",
        { pricingDetails, id, propertyId, userType }
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

export const updateUserData = (userDetails) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("user/updateUserData", {
      userDetails,
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

export const getAssignedLeadsToPartner = (userDetails) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getAssignedLeadsToPartner");
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

export const addPartner = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/addPartner", { postData });
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

export const getPropertyDetailsForPartner = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "partner/getPropertyDetailsForPartner"
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

export const getseniorLivingtypeWithoutStatus = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "partner/getseniorLivingtypeWithoutStatus"
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

export const getStateList = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/getStateList");
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

export const claimYourProperty = (propertyID) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/claimYourProperty", {
      propertyID,
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

// NEW PARTNER ACTIONS
export function updateCreatePropertyState(payloadData) {
  return {
    type: UPDATE_CREATE_PROPERTY_STATE,
    payload: payloadData,
  };
}

export function clearCreatePropertyState(payloadData) {
  return {
    type: CLEAR_CREATE_PROPERTY_STATE,
    payload: payloadData,
  };
}

export const savePropertyDetail =
  (dataFields, shouldPublish) => async (dispatch) => {
    try {
      console.log(`DataFields `, dataFields);
      const formData = new FormData();
      formData.append("shouldPublish", shouldPublish);
      formData.append("basicProfile", JSON.stringify(dataFields.basicProfile));
      formData.append("careTypeList", JSON.stringify(dataFields.careTypeList));
      formData.append("roomList", JSON.stringify(dataFields.roomList));
      formData.append("amenityList", JSON.stringify(dataFields.amenityList));
      formData.append(
        "serviceList",
        JSON.stringify(dataFields.serviceList.map((item) => item.id))
      );
      formData.append(
        "communityList",
        JSON.stringify(dataFields.communityList)
      );
      for (let p of dataFields.imageList) {
        formData.append("photos", p.file);
      }
      let result = await postRequestWithAuth(
        "partner/savePropertyDetail",
        formData
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

export const updatePropertyDetail =
  (dataFields, propertyId, shouldPublish) => async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("shouldPublish", shouldPublish);
      formData.append("propertyId", propertyId);
      formData.append("basicProfile", JSON.stringify(dataFields.basicProfile));
      formData.append("careTypeList", JSON.stringify(dataFields.careTypeList));
      formData.append("roomList", JSON.stringify(dataFields.roomList));
      formData.append("amenityList", JSON.stringify(dataFields.amenityList));
      formData.append(
        "serviceList",
        JSON.stringify(dataFields.serviceList.map((item) => item.id))
      );
      formData.append(
        "communityList",
        JSON.stringify(dataFields.communityList)
      );
      formData.append(
        "removedImageList",
        JSON.stringify(dataFields.removedImageList)
      );

      let newImageList = dataFields.imageList.filter((item) => item.file);
      for (let p of newImageList) {
        formData.append("photos", p.file);
      }
      let result = await postRequestWithAuth(
        "partner/updatePropertyDetail",
        formData
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
      console.log(err);
      toastr.error("Error", "Something went wrong, Please try again");
      return false;
    }
  };

export const getAllPropertyListOfPartner =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        "partner/getAllPropertyListOfPartner",
        filterData
      );
      const { status, data } = result.data;
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

export const getPromotionList =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        "partner/getPromotionList",
        filterData
      );
      const { status, data } = result.data;
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

export const addPromotion = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/addPromotion", formData);
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

export const editPromotion = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/editPromotion", formData);
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

export const deletePromotion = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/deletePromotion", formData);
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

export const getPropertyPromotion = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "user/getPropertyPromotion",
      formData
    );
    const { status, data } = result.data;
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

export const getAllClaimListOfPartner =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        "partner/getAllClaimListOfPartner",
        filterData
      );
      const { status, data } = result.data;
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

export const getPropertyDetail =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        "partner/getPropertyDetail",
        filterData
      );
      const { status, data } = result.data;
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

export const getPropertyFeatures =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        "partner/getPropertyFeatures",
        filterData
      );
      const { status, data } = result.data;
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

export const sendMailToSupport = (data, attachedFile) => async (dispatch) => {
  try {
    const { category, subject, message } = data;
    const formData = new FormData();
    formData.append("category", category);
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("attachedFile", attachedFile);
    let result = await postRequestWithAuth(
      "partner/sendMailToSupport",
      formData
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

export const searchPropertyList = (filterData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "partner/searchPropertyList",
      filterData
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

export const sendMailToUsers = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("partner/sendMailToUsers", formData);
    const { msg, status } = result.data;
    if (status === 200) {
      toastr.success("Success", msg);
      return true;
    } else {
      toastr.error("Error", msg);
      return false;
    }
  } catch (err) {
    console.log(err);
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

/* REVIEW RELATED FUNCTIONS */
export const getAllReviewsForPartner = (filterData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "review/senior-living/getAllReviewsForPartner",
      filterData
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
export const replyToSeniorLivingReview = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "review/senior-living/replyToSeniorLivingReview",
      formData
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
    console.log(err);
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

/* REVIEW RELATED FUNCTIONS */

export const getNotification = (filterData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "partner/getNotification",
      filterData
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    //toastr.error("Something went wrong, Please try again");
    return false;
  }
};
