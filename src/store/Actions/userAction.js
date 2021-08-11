import {
  SENIOR_LIVING_TYPE,
  SET_TEMP_LIKED_PROPERTY,
  REMOVE_TEMP_LIKED_PROPERTY,
  UPDATE_TOP_CITIES,
} from "../constants/constants"
import axios from "axios"
import { toastr } from "react-redux-toastr"
import { postRequestWithAuth } from "./apiAction"

// import "toastr/build/toastr.css";
//import url from "../config";

//------------Partners routes------------------//
export const getRecommendedProperties =
  (pData, pageNumber, totalRecord) => async dispatch => {
    try {
      let res = await postRequestWithAuth(
        "search/searchRecommendedProperties",
        {
          data: pData,
          pageNumber,
          totalRecord,
        }
      )
      if (res.data.status === 200) {
        if (pageNumber) {
          return {
            serachData: res.data.data,
            searchLength: res.data.totalData,
            topCities: res.data.topCities,
          }
        } else {
          return res.data.data
        }
      } else {
        return []
        // toastr.error(res.data.msg);
      }
    } catch (err) {
      toastr.error("Error", "Something went wrong, Please try again")
      return false
    }
  }

export const getCitiesWithZipCodes = state => async dispatch => {
  try {
    let res = await postRequestWithAuth("search/getCitiesWithZipCodes", {
      state,
    })
    if (res.data.status === 200) {
      return res.data.data
    } else {
      return []
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getUserInterestStateCities = leadId => async dispatch => {
  try {
    let result = await postRequestWithAuth("user/getUserInterestStateCities", {
      leadId,
    })
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getLeadUserData = uLeadId => async dispatch => {
  try {
    let result = await postRequestWithAuth("user/getLeadUserData", {
      userLeadId: uLeadId,
    })
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getAllUSStates = () => async dispatch => {
  try {
    let result = await postRequestWithAuth("search/getAllUSStates")
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getCareTypeTitleById = id => async dispatch => {
  try {
    let result = await postRequestWithAuth(`search/getCareTypeTitleById/${id}`)
    const { data, status } = result.data
    if (status === 200) {
      return data.title
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const addComment = (cData, advisorComment) => async dispatch => {
  try {
    let result = await postRequestWithAuth(`user/addComment`, {
      data: cData,
      advisorComment,
    })
    const { msg, status } = result.data
    if (status === 200) {
      toastr.success("Success", msg)
      return true
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getZipCodesForCity = (state, city) => async dispatch => {
  try {
    let result = await postRequestWithAuth(`search/getZipCodesForCity`, {
      state,
      city,
    })
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getAvailabilityOfAdvisor = date => async dispatch => {
  try {
    let result = await postRequestWithAuth(`user/getAvailabilityOfAdvisor`, {
      date,
    })
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const setTimeOfTour = (avaiabilityId, leadId) => async dispatch => {
  try {
    let result = await postRequestWithAuth(`user/setTimeOfTour`, {
      avaiabilityId,
      leadId,
    })
    const { msg, status } = result.data
    if (status === 200) {
      toastr.success("Success", msg)
      return true
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const changePassword = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`user/changePassword`, {
      data: formData,
    })
    console.log("result", result)
    const { msg, status } = result.data
    if (status === 200) {
      toastr.success("Success", msg)
      return true
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const addCommentByAdvisor = (formData, history) => async dispatch => {
  try {
    let res = await postRequestWithAuth(`user/addCommentByAdvisor`, {
      data: formData,
    })
    if (res.data.status === 200) {
      history.push({ pathname: "/" })
      toastr.success(res.data.msg)
      return true
    } else {
      return null
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getFeedbackForProperty = id => async dispatch => {
  try {
    let result = await postRequestWithAuth(`user/getFeedbackForProperty`, {
      id,
    })
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const giveReview =
  (propertyId, startRating, formData, userId) => async dispatch => {
    try {
      let result = await postRequestWithAuth(`user/giveReview`, {
        propertyId,
        startRating,
        formData,
        userId,
      })
      const { msg, status } = result.data
      if (status === 200) {
        toastr.success("Success", msg)
        return true
      } else {
        toastr.error("Error", msg)
        return false
      }
    } catch (err) {
      toastr.error("Error", "Something went wrong, Please try again")
      return false
    }
  }

export const getAllPositionDetails = () => async dispatch => {
  try {
    let result = await postRequestWithAuth(`user/getAllPositionDetails`)
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getAllArticleOfCaretype =
  (careTypeId, articleId) => async dispatch => {
    try {
      let result = await postRequestWithAuth(`user/getAllArticleOfCaretype`, {
        careTypeId,
        articleId,
      })
      const { data, status } = result.data
      if (status === 200) {
        return data
      } else {
        return false
      }
    } catch (err) {
      toastr.error("Error", "Something went wrong, Please try again")
      return false
    }
  }

export const getContactUsDetails = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `admin/getContactUsDetails`,
      filterData
    )
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getCategorytype = () => async dispatch => {
  try {
    let result = await postRequestWithAuth(`user/getCategorytype`)
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getTaxRateByZipCode = zipCode => async dispatch => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await postRequestWithAuth(`search/getTaxRateByZipCode`, {
        zipCode,
      })
      const { data, status } = result.data
      if (status === 200) {
        resolve(data)
      } else {
        resolve(false)
      }
    } catch (err) {
      reject(err)
    }
  })
}

// Region Related Actions

export const getRegionList = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`user/getRegionList`, filterData)
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const removeRegion = regionId => async dispatch => {
  try {
    let result = await postRequestWithAuth("user/removeRegion", {
      regionId,
    })
    const { msg, status } = result.data
    if (status === 200) {
      toastr.success("Success", msg)
      return true
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getRegionDetails = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`user/getRegionDetails`, filterData)
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const setRegion = advisorData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`user/setRegion`, advisorData)
    const { msg, status } = result.data
    if (status === 200) {
      toastr.success("Success", msg)
      return true
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

// Region Related Actions

export const searchBlogByKeyword = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "blog/searchBlogByKeyword",
      filterData
    )
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getStateCities = filterData => async dispatch => {
  try {
    let res = await postRequestWithAuth("search/getStateCities", filterData)
    if (res.data.status === 200) {
      return res.data.data
    } else {
      return []
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getZipCodeListDetail = filterData => async dispatch => {
  try {
    let res = await postRequestWithAuth(
      "search/getZipCodeListDetail",
      filterData
    )
    if (res.data.status === 200) {
      return res.data.data
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const updateUserRegionDetail = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "user/updateUserRegionDetail",
      filterData
    )
    const { msg, status } = result.data
    if (status === 200) {
      toastr.success("Success", msg)
      return true
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

//new action dispatchers

export const addTempLikeProperty = callBack => dispatch => {
  dispatch({
    type: SET_TEMP_LIKED_PROPERTY,
    payload: callBack,
  })
}

export const removeTempLikeProperty = () => dispatch => {
  dispatch({
    type: REMOVE_TEMP_LIKED_PROPERTY,
    payload: null,
  })
}
