import axios from "axios";
import { toastr } from "react-redux-toastr";
import url from "../../config";
import { postRequestWithAuth } from "./apiAction";

//------------Partners routes------------------//
export const getPendingPropertyRequest = (pageNumber) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getPendingPropertyRequest", {
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

export const getUnAssignedLeadRequests = (pageNumber) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getUnAssignedLeadRequests", {
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

export const acceptRequest = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/acceptRequest", { id });
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

export const rejectRequest = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/rejectRequest", { id });
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

export const getUserDetails = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getUserDetails", { id });
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

export const updateDiscription =
  (data, id, userType, propertyId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("admin/updateDiscription", {
        data,
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

export const getStats = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getStats");
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

export const getAllPartner =
  (pageNumber, searchText, sortingOrder, sortingColumn) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("admin/getAllPartner", {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
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

export const offStatusOfPartner = (id, pStatus) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/offStatusOfPartner", {
      id,
      status: pStatus,
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

export const getAllActiveProperty =
  (pageNumber, searchText, sortingOrder, sortingColumn, careTypeID) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth("admin/getAllActiveProperty", {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
        careTypeID,
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

export const getServiceListingDetails =
  (seniorLivingType) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("admin/getServiceListingDetails", {
        seniorLivingType,
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

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getPropertyDetails", { id });
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

export const getPricingDetail = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getPricingDetail", { id });
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

export const getAllApplicants = (filterData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "admin/getAllApplicants",
      filterData
    );
    //  console.log("result", result)
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

export const offStatusOfAdvisor = (id, adviserStatus) => async (dispatch) => {
  try {
    console.log({ id, adviserStatus });
    let result = await postRequestWithAuth("admin/offStatusOfAdvisor", {
      id,
      status: adviserStatus,
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

export const sendCredentials = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/sendCredentials", {
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

export const sendCredentialsToAdviser = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/sendCredentialsToAdviser", {
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

export const setAdvisorProperties = (advisorData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "admin/setAdvisorRegion",
      advisorData
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

export const getAdvisorRegionDetails = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      `admin/getAdvisorRegionDetails/${id}`
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

export const deleteProperty = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/deleteProperty`, { id });
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

export const getAllCA =
  (pageNumber, searchText, sortingOrder, sortingColumn) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/getAllCA`, {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
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

export const addCA = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/addCA`, { postData });
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

export const getAllTour =
  (pageNumber, searchText, date) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/getAllTour`, {
        pageNumber,
        searchText,
        date,
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

export const getAllPartnerForDropDown = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/getAllPartnerForDropDown`);
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

export const assignPartnerToProperty =
  (propertyId, partnerEmail, partnerName, businessName, address, claimUserId) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/assignPartnerToProperty`, {
        propertyId,
        partnerEmail,
        partnerName,
        businessName,
        address,
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

export const getAdvisorPerformanceData =
  (searchData, pageNumber, sDate, eDate, sortingOrder, sortingColumn) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `admin/getAdvisorPerformanceData`,
        {
          pageNumber,
          sortingOrder,
          sortingColumn,
          searchData: searchData,
          sDate: sDate,
          eDate: eDate,
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

export const getPartnerPerformanceData =
  (searchData, pageNumber, sDate, eDate, sortingOrder, sortingColumn) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `admin/getPartnerPerformanceData`,
        {
          searchData,
          pageNumber,
          sDate,
          eDate,
          sortingOrder,
          sortingColumn,
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

export const getSearchLogData =
  (
    pageNumber,
    sortingColumn,
    sortingOrder,
    searchData,
    sDate,
    eDate,
    listType,
    totalRecord
  ) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/getSearchLogData`, {
        pageNumber,
        sortingColumn,
        sortingOrder,
        searchData: searchData,
        sDate: sDate,
        eDate: eDate,
        listType,
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

export const getAllAdvisors =
  (pageNumber, searchText, sortingOrder, sortingColumn) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/getAllAdvisors`, {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
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

export const getAllCustomer =
  (pageNumber, searchText, sortingOrder, sortingColumn) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/getAllCustomer`, {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
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

export const getAllReview =
  (pageNumber, searchText, sortingOrder, sortingColumn) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/getAllReview`, {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
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

export const offStatusOfReview =
  (id, status, PropertyId, rating) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/offStatusOfReview`, {
        id,
        status,
        PropertyId,
        rating,
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

export const addPosition = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/addPosition`, {
      postData,
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

export const getAllPosition =
  (pageNumber, searchText, sortingOrder, sortingColumn) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/getAllPosition`, {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
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

export const getEditPositionData = (positionId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/getEditPositionData`, {
      positionId,
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

export const editPosition = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/editPosition`, {
      postData,
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

export const offStatusOfPosition = (id, positionStatus) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/offStatusOfPosition`, {
      id,
      status: positionStatus,
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

export const sendCredentialsForAdvisorSection = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      `admin/sendCredentialsForAdvisorSection`,
      {
        id,
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

export const addTemplate = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/addTemplate`, {
      postData,
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

export const getAllTemplate =
  (pageNumber, searchText, sortingOrder, sortingColumn) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/getAllTemplate`, {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
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

export const getEditTemplateData = (templateId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/getEditTemplateData`, {
      templateId,
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

export const editTemplate = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/editTemplate`, {
      postData,
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

export const offStatusOfTemplate = (id, templateStatus) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/offStatusOfTemplate`, {
      id,
      status: templateStatus,
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

export const addArticle = (postData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const articleFormData = JSON.stringify(postData.formData);
    const formData = new FormData();
    formData.append("coverImage", postData.imageData);
    formData.append("formData", articleFormData);
    formData.append("content", postData.content);
    formData.append("tags", JSON.stringify(postData.tags));
    let result = await postRequestWithAuth(
      `admin/addArticle`,
      formData,
      config
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

export const addWriter = (postData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const articleFormData = JSON.stringify(postData.formData);
    const formData = new FormData();
    formData.append("postImage", postData.imageData);
    formData.append("formData", articleFormData);
    let result = await postRequestWithAuth(`admin/addWriter`, formData, config);
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

export const getAllWriters =
  ({ pageNumber, searchText, sortingOrder, sortingColumn }) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`blog/getAllWriters`, {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
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

export const getOnlyWriter = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/getOnlyWriter`);
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

export const getAllArticle = (filterState) => async (dispatch) => {
  console.log("filterState", { filterState });
  try {
    let result = await postRequestWithAuth(`admin/getAllArticle`, filterState);
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

export const getEditArticleData = (articleId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/getEditArticleData`, {
      articleId,
    });
    console.log(`Data `, result);
    const { data, status } = result.data;
    if (status === 200) {
      let articleDetails = data.articleDetails;
      articleDetails.writer = data.writerDetail;
      return articleDetails;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getEditWriterData = (writerId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/getEditWriterData`, {
      writerId,
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

export const editWriter = (postData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const writerFormData = JSON.stringify(postData.formData);
    const formData = new FormData();
    formData.append("postImage", postData.imageData);
    formData.append("formData", writerFormData);
    formData.append("writerId", postData.id);
    let result = await postRequestWithAuth(
      `admin/editWriter`,
      formData,
      config
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

export const deleteWriter = (writerId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/deleteWriter`, { writerId });
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

export const editArticle = (postData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const articleFormData = JSON.stringify(postData.formData);
    const formData = new FormData();
    formData.append("postImage", postData.imageData);
    formData.append("formData", articleFormData);
    formData.append("content", postData.content);
    formData.append("tags", JSON.stringify(postData.tags));
    formData.append("articleId", postData.id);
    let result = await postRequestWithAuth(
      `admin/editArticle`,
      formData,
      config
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

export const offStatusOfArticle = (id, articleStatus) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/offStatusOfArticle`, {
      id,
      status: articleStatus,
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

export const addSenderEmail = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/addSenderEmail`, {
      postData,
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

export const getAllSenderEmail =
  (pageNumber, searchText, sortingOrder, sortingColumn) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/getAllSenderEmail`, {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
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

export const getEditSenderEmailData = (positionId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/getEditSenderEmailData`, {
      positionId,
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

export const editSenderEmail = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/editSenderEmail`, {
      postData,
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

export const offStatusOfSenderEmail =
  (id, senderEmailStatus) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/offStatusOfSenderEmail`, {
        id,
        status: senderEmailStatus,
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

export const offStatusOfProperties =
  (id, propertyStatus) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/offStatusOfProperties`, {
        id,
        status: propertyStatus,
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

export const offPromotionOfProperties =
  (id, pStatus, promotionText) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/offPromotionOfProperties`, {
        id,
        status: pStatus,
        promotionText,
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

export const editCA = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/editCA`, {
      postData,
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

export const getAllContactUSList = (filterData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      `admin/getAllContactUSList`,
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

export const updateContactUsMailStatus = (filterData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      `admin/updateContactUsMailStatus`,
      filterData
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

export const getAllCMS = (filterState) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/getAllCMS`, filterState);
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

export const getEditCMSData = (templateId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`admin/getEditCMSData`, {
      templateId,
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

export const editCMS = (postData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const contentFormData = JSON.stringify(postData.formData);
    const formData = new FormData();
    formData.append("postImage", postData.imageData);
    formData.append("formData", contentFormData);
    formData.append("content", postData.content);
    formData.append("id", postData.id);
    let result = await postRequestWithAuth(`admin/editCMS`, formData, config);
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

export const getAllNewsLetterEmail =
  (pageNumber, searchText, sortingOrder, sortingColumn) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`admin/getAllNewsLetterEmail`, {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
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

export const offStatusOfNewsLetterEmail =
  (id, newsLetterStatus) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `admin/offStatusOfNewsLetterEmail`,
        {
          id,
          status: newsLetterStatus,
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

export const getSearchLogDataByAdvisor = (filterData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      `adviser/getSearchLogDataByAdvisor`,
      {
        ...filterData,
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

// PROMO CODE FUNCTIONS
export const getPromoCodeList = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`promo/getAllPromoList`);
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

export const getPromoCodeTxList = (promoId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`promo/getPromoCodeTxList`, {
      promoId,
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

export const addNewPromoCode = (insertData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`promo/addNewPromoCode`, {
      ...insertData,
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

export const editPromoCode = (updateData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`promo/editPromoCode`, {
      ...updateData,
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

export const changePromoCodeStatus =
  (promoId, promoStatus) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`promo/changePromoCodeStatus`, {
        status: promoStatus,
        promoId,
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

// PROMO CODE FUNCTION

// SALES CRM MANAGEMENT FUNCTIONS
export const getHomeCareAgencyDataChangeRecord =
  (filterData) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`sales/getSalesDataChangeRecord`, {
        ...filterData,
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

export const updateClaimRequestStatus =
  (claimId, approvalStatus) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `homeCare/updateClaimRequestStatus`,
        {
          claimId,
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

export const getPendingAgencyClaimRecords =
  (filterData) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `homeCare/getPendingAgencyClaimRecords`,
        {
          ...filterData,
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

export const getSaleRecordComparisonData = (recordId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      `sales/getSaleRecordComparisonData`,
      {
        recordId,
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

export const updateRecordChangeStatus =
  (approvalStatus, changeId) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth(`sales/updateRecordChangeStatus`, {
        approvalStatus,
        changeId,
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

export const getSaleUserList = (filterData) => async (dispatch) => {
  console.log({ filterData });
  try {
    let result = await postRequestWithAuth(`sales/getSaleUserList`, {
      ...filterData,
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
// SALES CRM MANAGEMENT FUNCTIONS

// BLOG  MANAGEMENT FUNCTIONS
export const getTagList = (filterData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`blog/getTagList`, {
      ...filterData,
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

export const addTag = (title, description) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`blog/addTag`, {
      title,
      description,
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

export const editTag = (title, description, id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`blog/editTag`, {
      title,
      description,
      id,
    });
    console.log("results", result);
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

export const deleteTag = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`blog/deleteTag`, {
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

export const updateNews = (title, content) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`blog/updateNews`, {
      title,
      content,
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

export const getCurrentNews = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`blog/getCurrentNews`);
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

export const getAllCommentList = (filterOptions) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`blog/getAllCommentList`, {
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

export const getAllArticleList = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`blog/getAllArticleList`);
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

export const updateCommentStatus = (id, approvalStatus) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(`blog/updateCommentStatus`, {
      id,
      status: approvalStatus,
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
// BLOG  MANAGEMENT FUNCTIONS

// SENIOR LIVING  MANAGEMENT FUNCTIONS
export const getSeniorLivingClaimList =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `admin/getSeniorLivingClaimList`,
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

export const updateSeniorLivingClaimStatus =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `admin/updateSeniorLivingClaimStatus`,
        filterData
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

export const getSeniorLivingReviewList =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `review/senior-living/getAllReviews`,
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

export const updateSeniorLivingReviewStatus =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `review/senior-living/updateReviewStatus`,
        filterData
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

export const getAllSeniorLivingPromotionRequest =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `review/senior-living/getAllSeniorLivingPromotionRequest`,
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

export const updateSeniorLivingPromotionStatus =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `review/senior-living/updatePromotionStatus`,
        filterData
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

// SENIOR LIVING  MANAGEMENT FUNCTIONS

// HOME CARE  MANAGEMENT FUNCTIONS
export const updateAddedAgencyByAgentStatus =
  (filterData = {}) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth(
        `admin/updateAddedAgencyByAgentStatus`,
        filterData
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
//  HOME CARE MANAGEMENT FUNCTIONS
