import axios from "axios"
import { toastr } from "react-redux-toastr"
import AppConstant from "../constants/homeCare_constants"
import FileDownload from "js-file-download"
import { postRequestWithAuth } from "./apiAction"

export const businessRegistration = (data, logo, photos) => async dispatch => {
  try {
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    formData.append("logo", logo)
    for (let p of photos) {
      formData.append("photos", p)
    }
    let result = await postRequestWithAuth(
      "homeCare/businessRegistration",
      formData
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

export const updateBusinessProfile = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/updateBusinessProfile", {
      ...formData,
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

export const getPendingClaimRequest = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "homeCare/getPendingClaimRequest",
      formData
    )
    const { status, data } = result.data
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

export const cancelClaimRequest = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "homeCare/cancelClaimRequest",
      formData
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

export const claimHomeCareRequest = agencyId => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/claimHomeCareRequest", {
      agencyId,
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

export const buyBusinessLead = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/buyBusinessLead", {
      ...formData,
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

export const updateBillingData = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/updateBillingData", {
      ...formData,
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

export const addPaymentSource = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/addPaymentSource", {
      ...formData,
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

export const updatePaymentSource =
  (formData, paymentGateWayId) => async dispatch => {
    try {
      let result = await postRequestWithAuth("homeCare/updatePaymentSource", {
        formData,
        paymentGateWayId,
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

export const updateDefaultPaymentSource =
  paymentGateWayId => async dispatch => {
    try {
      let result = await postRequestWithAuth(
        "homeCare/updateDefaultPaymentSource",
        { paymentGateWayId }
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

export const deletePaymentSource = paymentGateWayId => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/deletePaymentSource", {
      paymentGateWayId,
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

export const getBusinessProfile = () => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/getBusinessProfile")
    const { data, status } = result.data
    if (status === 200) {
      dispatch({
        type: AppConstant.FETCHED_BUSINESS_PROFILE,
        payload: data,
      })
      return true
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getHomeCarePaymentGatewayList = () => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "homeCare/getHomeCarePaymentGatewayList"
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

export const getHomeCareTransactionList =
  (txType, pageNumber) => async dispatch => {
    try {
      let result = await postRequestWithAuth(
        "homeCare/getHomeCareTransactionList",
        { txType, pageNumber }
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

export const getHomeCareTransactionDetail = txId => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "homeCare/getHomeCareTransactionDetail",
      { txId }
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

export const getHomeCareAgencyLeads =
  (pageNumber, options) => async dispatch => {
    try {
      const {
        searchText,
        selectedStatus,
        startDate,
        endDate,
        sortingOrder,
        sortingColumn,
      } = options
      let result = await postRequestWithAuth(
        "homeCare/getHomeCareAgencyLeads",
        {
          pageNumber,
          searchText,
          selectedStatus,
          startDate,
          endDate,
          sortingOrder,
          sortingColumn,
        }
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

export const exportHomeCareAgencyLeads = options => async dispatch => {
  try {
    const {
      searchText,
      selectedStatus,
      startDate,
      endDate,
      sortingOrder,
      sortingColumn,
    } = options
    let result = await postRequestWithAuth(
      "homeCare/exportHomeCareAgencyLeads",
      {
        searchText,
        selectedStatus,
        startDate,
        endDate,
        sortingOrder,
        sortingColumn,
      }
    )
    FileDownload(result.data, "myLeads.csv")
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getHomeCareAgencyLeadDetail = leadId => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "homeCare/getHomeCareAgencyLeadDetail",
      { leadId }
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

export const updateHomeCareLeadStatus =
  (leadId, leadStatus, businessStatus, surveyData) => async dispatch => {
    try {
      let res = await postRequestWithAuth("homeCare/updateHomeCareLeadStatus", {
        leadId,
        status: leadStatus,
        businessStatus,
        surveyData,
      })
      const { msg, status } = res.data
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

export const getHomeCareSubscriptionDetail = leadId => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "homeCare/getHomeCareSubscriptionDetail",
      { leadId }
    )
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return null
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getHomeCareBillingDetail = () => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/getHomeCareBillingDetail")
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return null
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getSuggestedAgencies = keyword => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/getSuggestedAgencies", {
      keyword,
    })
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return null
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const verifyPromoCode = (promoCode, verifyFor) => async dispatch => {
  try {
    let result = await postRequestWithAuth("promo/verifyPromoCode", {
      promoCode,
      verifyFor,
    })
    return result.data
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const updateHomeCareSubscriptionStatus =
  subsStatus => async dispatch => {
    try {
      let result = await postRequestWithAuth(
        "homeCare/updateHomeCareSubscriptionStatus",
        { status: subsStatus }
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

export const updateHomeCareSubscriptionPackage =
  packageId => async dispatch => {
    try {
      let result = await postRequestWithAuth(
        "homeCare/updateHomeCareSubscriptionPackage",
        { packageId }
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

export const getHomeCareLeadPackages = () => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/getHomeCareLeadPackages")
    const { data, status } = result.data
    if (status === 200) {
      dispatch({
        type: AppConstant.FETCHED_PACKAGE_LIST,
        payload: data,
      })
      return true
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getHomeCareServices = () => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/getHomeCareServices")
    const { data, status } = result.data
    if (status === 200) {
      dispatch({
        type: AppConstant.FETCHED_SERVICES_LIST,
        payload: data,
      })
      return true
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getHomeCareServiceCategory = () => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "homeCare/getHomeCareServiceCategory"
    )
    const { data, status } = result.data
    if (status === 200) {
      dispatch({
        type: AppConstant.FETCHED_SERVICE_CATEGORIES,
        payload: data,
      })
      return true
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getHomeCareUserList = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "homeCare/getHomeCareUserList",
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

export const sendMailToSupport = (data, attachedFile) => async dispatch => {
  try {
    const { category, subject, message } = data
    const formData = new FormData()
    formData.append("category", category)
    formData.append("subject", subject)
    formData.append("message", message)
    formData.append("attachedFile", attachedFile)
    let result = await postRequestWithAuth(
      "homeCare/sendMailToSupport",
      formData
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

export const uploadBusinessPhoto = (data, attachedFile) => async dispatch => {
  try {
    const { uploadFor } = data
    const formData = new FormData()
    formData.append("uploadFor", uploadFor)
    formData.append("imageFile", attachedFile)
    let result = await postRequestWithAuth(
      "homeCare/uploadHomeCarePhoto",
      formData
    )
    const { msg, status } = result.data
    if (status === 200) {
      toastr.success("Success", msg)
      return result.data.data
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const deleteBusinessPhoto = photoId => async dispatch => {
  try {
    let result = await postRequestWithAuth("homeCare/deleteHomeCarePhoto", {
      photoId,
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

export const updateProgressForm = payload => dispatch => {
  dispatch({
    type: AppConstant.UPDATE_PROGRESS_FORM_STATE,
    payload,
  })
}
