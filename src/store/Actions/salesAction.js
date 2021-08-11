import { toastr } from "react-redux-toastr"
import FileDownload from "js-file-download"
import {
  UPDATE_AGENCY_FILTER_STATE,
  UPDATE_AGENCY_LOCATION_FILTER_STATE,
  UPDATE_SALE_LIST_FILTER_STATE,
} from "../constants/saleConstants"
import { postRequestWithAuth } from "./apiAction"

export const getHomeCareAgencyList =
  (pageNumber, filterOption) => async dispatch => {
    try {
      let result = await postRequestWithAuth("sales/getHomeCareAgencyList", {
        pageNumber,
        ...filterOption,
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

export const getAddedHomeCareAgencyList =
  (pageNumber, filterOption) => async dispatch => {
    try {
      let result = await postRequestWithAuth(
        "sales/getAddedHomeCareAgencyList",
        {
          pageNumber,
          ...filterOption,
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

export const getAgencyLeads = filterOption => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/getAgencyLeads", {
      ...filterOption,
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

export const getSeniorLivingList = filterOption => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/getSeniorLivingList", {
      ...filterOption,
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

export const getAgencySalesAssignedHistory = filterOption => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "sales/getAgencySalesAssignedHistory",
      { ...filterOption }
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

export const getAssignedAgencyList =
  (pageNumber, filterOption) => async dispatch => {
    try {
      let result = await postRequestWithAuth("sales/getAssignedAgencyList", {
        pageNumber,
        ...filterOption,
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

export const exportAssignedAgencyList = filterOption => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/exportAssignedAgencyList", {
      ...filterOption,
    })
    FileDownload(result.data, "myAgencies.csv")
    return true
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const sendMailBySales = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/sendMailBySales", formData)
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

export const sendMailBySalesToAdviser = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "sales/sendMailBySalesToAdviser",
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

export const updateAgencyStatus = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/updateAgencyStatus", formData)
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

export const getSaleUsers = (pageNumber, filterOption) => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/getAllSaleUsers", {
      pageNumber,
      ...filterOption,
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

export const getEmailTemplateList =
  (pageNumber, filterOption) => async dispatch => {
    try {
      let result = await postRequestWithAuth("mail/getEmailTemplateList", {
        pageNumber,
        ...filterOption,
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

export const getSalesActivities = filterOption => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/getSalesActivities", {
      ...filterOption,
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

export const assignBusinessToSales = filterOption => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/assignBusinessToSales", {
      ...filterOption,
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

export const getAgencyDetail = agencyId => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/getAgencyDetail", {
      agencyId,
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

export const getSaleUserRegions = () => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/getSaleUserRegions")
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

export const updateAgencyProfile = (formData, agencyId) => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/updateAgencyProfile", {
      formData,
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

export const addNote = (title, note, businessId) => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/addNote", {
      title,
      note,
      businessId,
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

export const deleteNote = businessId => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/deleteNote", { businessId })
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

export const getNotes = businessId => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/getNotes", { businessId })
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

export const getHomeCareAgencyDetail = id => async dispatch => {
  try {
    let result = await postRequestWithAuth("sales/getHomeCareAgencyDetail", {
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

export const updateAgencySaleStatus =
  (recordId, saleStatus) => async dispatch => {
    try {
      let result = await postRequestWithAuth("sales/updateAgencySaleStatus", {
        recordId,
        status: saleStatus,
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

export const createAgencyFollowUp =
  (agencyId, note, selectedDate) => async dispatch => {
    try {
      let result = await postRequestWithAuth("sales/createAgencyFollowUp", {
        agencyId,
        note,
        selectedDate,
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

export const updateSalesScheduleStatus =
  (scheduleId, scheduleStatus) => async dispatch => {
    try {
      let res = await postRequestWithAuth("sales/updateSalesScheduleStatus", {
        scheduleId,
        scheduleStatus,
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

export const deleteSalesSchedule = (scheduleId, agencyId) => async dispatch => {
  try {
    let res = await postRequestWithAuth("sales/deleteSalesSchedule", {
      scheduleId,
      agencyId,
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

export const getSalesSchedules = filterOptions => async dispatch => {
  try {
    let res = await postRequestWithAuth("sales/getSalesSchedules", {
      ...filterOptions,
    })
    const { data, status } = res.data
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

export const getSalesUserStates = userId => async dispatch => {
  try {
    let res = await postRequestWithAuth("sales/getSalesUserStates", { userId })
    const { data, status } = res.data
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

export const getUserSaleList = filterOptions => async dispatch => {
  try {
    let res = await postRequestWithAuth("sales/getUserSaleList", {
      ...filterOptions,
    })
    const { data, status } = res.data
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

export const countSaleUserEarning = filterOptions => async dispatch => {
  try {
    let res = await postRequestWithAuth("sales/countSaleUserEarning", {
      ...filterOptions,
    })
    const { data, status } = res.data
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

export const getAgencyTransactions = filterOptions => async dispatch => {
  try {
    let res = await postRequestWithAuth("sales/getAgencyTransactions", {
      ...filterOptions,
    })
    const { data, status } = res.data
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

export const getAgencyActivities = filterOptions => async dispatch => {
  try {
    let res = await postRequestWithAuth("sales/getAgencyActivities", {
      ...filterOptions,
    })
    const { data, status } = res.data
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

export const getAgencyContacts = filterOptions => async dispatch => {
  try {
    let res = await postRequestWithAuth("sales/getAgencyContacts", {
      ...filterOptions,
    })
    const { data, status } = res.data
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

export const addNewAgencyContact = filterOptions => async dispatch => {
  try {
    let res = await postRequestWithAuth("sales/addNewAgencyContact", {
      ...filterOptions,
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

export const deleteAgencyContact = contactId => async dispatch => {
  try {
    let res = await postRequestWithAuth("sales/deleteAgencyContact", {
      contactId,
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

export const addNewAgency = (data, logo, photos) => async dispatch => {
  try {
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    formData.append("logo", logo)
    for (let p of photos) {
      formData.append("photos", p)
    }
    let result = await postRequestWithAuth("sales/addNewAgency", formData)
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

export const updateAgencyFilterState = data => dispatch => {
  dispatch({
    type: UPDATE_AGENCY_FILTER_STATE,
    payload: data,
  })
}

export const updateAgencyLocationFilterState = data => dispatch => {
  dispatch({
    type: UPDATE_AGENCY_LOCATION_FILTER_STATE,
    payload: data,
  })
}

export const updateSaleListFilterState = data => dispatch => {
  console.log(data)
  dispatch({
    type: UPDATE_SALE_LIST_FILTER_STATE,
    payload: data,
  })
}
