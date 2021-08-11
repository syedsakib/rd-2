import { SENIOR_LIVING_TYPE } from "../constants/constants"
import axios from "axios"
import { toastr } from "react-redux-toastr"
// import "toastr/build/toastr.css";
import url from "../../config"
import { UPDATE_CALL_STATE } from "../constants/callConstants"
import {
  UPDATE_USER_PAGE_STATE,
  UPDATE_ADVISER_PROPERTY_FILTER_STATE,
  CLEAR_PROPERTY_FILTER_STATE,
} from "../constants/adviserConstants"
import { postRequestWithAuth } from "./apiAction"

//------------Adviser routes------------------//

export const getAssignedLeads = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getAssignedLeads`, {
      ...filterOptions,
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

export const getLeadAgencyList =
  (leadId, pageNumber = 1, searchText, searchStatus, totalRecord) =>
  async dispatch => {
    try {
      let result = await postRequestWithAuth(`adviser/getLeadAgencyList`, {
        searchText,
        searchStatus,
        pageNumber,
        totalRecord,
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

/*HOME CARE ACTIONS */
export const getHomeCareActiveLeads = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/getHomeCareActiveLeads`,
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

export const getHomeCareLeadHistory =
  (pageNumber, sortColumn, sortOrder) => async dispatch => {
    try {
      let result = await postRequestWithAuth(`adviser/getHomeCareLeadHistory`, {
        pageNumber,
        sortColumn,
        sortOrder,
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

export const getHomeCareAgencyList =
  (pageNumber, sortColumn, sortOrder) => async dispatch => {
    try {
      let result = await postRequestWithAuth(`adviser/getHomeCareAgencyList`, {
        pageNumber,
        sortColumn,
        sortOrder,
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

export const getHomeCareAgencyDetail = id => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getHomeCareAgencyDetail`, {
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

export const getHomeCareLeadsByUser = userId => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getHomeCareLeadsByUser`, {
      userId,
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

export const sendHomeCareLead = (formData, leadId) => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/sendHomeCareLead`, {
      formData,
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

export const updateHomeCareLeadDetail =
  (formData, leadId) => async dispatch => {
    try {
      let result = await postRequestWithAuth(`adviser/updateLeadDetail`, {
        formData,
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

export const updateHomeCareLeadStatus =
  (leadStatus, leadId) => async dispatch => {
    try {
      let result = await postRequestWithAuth(
        `adviser/updateHomeCareLeadStatus`,
        {
          status: leadStatus,
          leadId,
        }
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

/*HOME CARE ACTIONS */
export const searchProperties = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`search/searchList`, {
      data: filterData,
    })
    const { data, status } = result.data
    if (status === 200) {
      return data
    } else {
      return []
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getAllAdvisorPopup = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getAllAdvisorPopup`, {
      ...filterData,
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

export const assignSelectedPartner = postData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/assignSelectedPartner`, {
      postData,
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

export const getAllPartnerList = postData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getAllPartnerList`, {
      postData,
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

export const sendSuggestedEmail = postData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/sendSuggestedEmail`, {
      postData,
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

export const getFeedbackForSuggestedProperty =
  assignedLeadId => async dispatch => {
    try {
      let result = await postRequestWithAuth(
        `adviser/getFeedbackForSuggestedProperty`,
        {
          assignedLeadId,
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

export const addCareerData = (careerData, advisorEmail) => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/addCareerData`, {
      careerData,
      advisorEmail,
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

export const createNotesForAdvisor = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/createNotesForAdvisor`,
      formData
    )
    const { msg, status } = result.data
    if (status === 200) {
      return true
    } else {
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getNotes = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getNotes`, filterData)
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

export const addAvailability = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/addAvailability`, formData)
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

export const getAvailabilities = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/getAvailabilities`,
      formData
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

export const getAvailabilityDetails = assignedLeadId => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/getAvailabilityDetails/${assignedLeadId}`
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

export const removeAvailability = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/removeAvailability`,
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

export const updateAvailabilty = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/updateAvailabilty`,
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

export const getAssignedLeadDetails = id => async dispatch => {
  try {
    let result = await postRequestWithAuth(`user/getLeadData`, { id })
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

export const getAssignedLeadContacts = id => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/getAssignedLeadContacts/${id}`
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

export const addContactToAssignedLead = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/addContactToAssignedLead`,
      formData
    )
    const { msg, status, data } = result.data
    if (status === 200) {
      toastr.success("Success", msg)
      return data
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const updateAssignedLeadContact = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/updateAssignedLeadContact`,
      formData
    )
    const { msg, status, data } = result.data
    if (status === 200) {
      toastr.success("Success", msg)
      return data
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const removeAssignedLeadContact = id => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/removeAssignedLeadContact/${id}`
    )
    const { msg, status, data } = result.data
    if (status === 200) {
      toastr.success("Success", msg)
      return data
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const getAssignedLeadsProperties = leadUserId => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/getAssignedLeadsProperties`,
      { leadUserId }
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

export const assignePartner =
  (leadEmail, partnerId, partnerEmail, partnerName, leadData) =>
  async dispatch => {
    try {
      let result = await postRequestWithAuth(`adviser/assignePartner`, {
        leadEmail,
        partnerId,
        partnerEmail,
        partnerName,
        leadData,
      })
      const { msg, status, data } = result.data
      if (status === 200) {
        toastr.success("Success", msg)
        return data
      } else {
        toastr.error("Error", msg)
        return false
      }
    } catch (err) {
      toastr.error("Error", "Something went wrong, Please try again")
      return false
    }
  }

export const acceptAssignedLead =
  (assignStatus, assignedLeadId, leadId) => async dispatch => {
    try {
      let result = await postRequestWithAuth(`adviser/acceptAssignedLead`, {
        status: assignStatus,
        assignedLeadId,
        leadId,
      })
      const { msg, status, data } = result.data
      if (status === 200) {
        toastr.success("Success", msg)
        return data
      } else {
        toastr.error("Error", msg)
        return false
      }
    } catch (err) {
      toastr.error("Error", "Something went wrong, Please try again")
      return false
    }
  }

export const onLeadStatusChange = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`admin/onLeadStatusChange`, {
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

export const onSelectStatusFilter = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/onSelectStatusFilter`, {
      data: formData,
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

export const getAllAssingedLead = () => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getAllAssingedLead`)
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

export const getPartnerAsPerSelectedLead = assignedLeadId => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/getPartnerAsPerSelectedLead`,
      { assignedLeadId }
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

export const getFeedBack = (leadId, propertyId) => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getFeedBack`, {
      leadId,
      propertyId,
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

export const editLeadInformation =
  (leadUserId, leadEditData, leadId) => async dispatch => {
    try {
      let result = await postRequestWithAuth(`adviser/editLeadInformation`, {
        leadUserId,
        leadEditData,
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

export const saveDataOnCallDisconnect =
  (callDetails, startTime, endTime, callDuration, logText) =>
  async dispatch => {
    try {
      let result = await postRequestWithAuth(
        `adviser/saveDataOnCallDisconnect`,
        {
          callDetails,
          startTime,
          endTime,
          callDuration,
          logText,
        }
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

export const getAllCallLogsAsPerLead =
  (callStatus, advisorId, leadId, pageNumber, searchDate) => async dispatch => {
    try {
      let result = await postRequestWithAuth(
        `adviser/getAllCallLogsAsPerLead`,
        {
          status: callStatus,
          advisorId,
          leadId,
          pageNumber,
          searchDate,
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

export const AdvisorCallLogList =
  (pageNumber, searchDate) => async dispatch => {
    try {
      let result = await postRequestWithAuth(`adviser/getAdvisorCallLog`, {
        pageNumber,
        searchDate,
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

export const getAllAdvisors = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getAllAdvisors`, filterData)
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

export const getAdvisorRegionList = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/getAdvisorRegionList`,
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

export const removeAdvisorRegion = regionId => async dispatch => {
  try {
    let result = await postRequestWithAuth("adviser/removeAdvisorRegion", {
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

export const getAdviserDetail = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/getAdviserDetail`,
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

export const offStatusOfPartner = (id, partnerStatus) => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/offStatusOfPartner`, {
      id,
      status: partnerStatus,
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

export const getContactDetails = userId => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getContactDetails`, {
      userId,
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

export const updateContact = postData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/updateContact`, {
      postData,
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

export const advisorCallLog = () => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getCallLog`)
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

export const getToken = () => async dispatch => {
  try {
    let result = await postRequestWithAuth(`twilio/token-generate`)
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

export const createUserLead = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/createUserLead`, formData)
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

export const getHomeCareLeadData = leadId => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getHomeCareLeadData`, {
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

export const getAllCustomerList = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getAllCustomerList`, {
      ...filterData,
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

export const getUserContacts = userId => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getUserContacts`, {
      userId,
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

export const addUserContact = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/addUserContact`, {
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

export const deleteUserContact = contactId => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/deleteUserContact`, {
      contactId,
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

export const getLogsByNumber = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/getLogsByNumber`, {
      ...filterData,
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

export const updateUserPageState = data => dispatch => {
  dispatch({
    type: UPDATE_USER_PAGE_STATE,
    payload: data,
  })
}

/* SENIOR LIVING LEADS ACTIONS */

export const getSeniorLivingLeadDetail = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/getSeniorLivingLeadDetail`,
      {
        ...filterData,
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

export const updateSeniorLivingLead = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth(`adviser/updateSeniorLivingLead`, {
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

export const getAllPropertyList = filterState => async dispatch => {
  try {
    let result = await postRequestWithAuth("adviser/getAllPropertyList", {
      ...filterState,
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

export const getRegionList = () => async dispatch => {
  try {
    let result = await postRequestWithAuth("adviser/getRegionList")
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

export const getAssignedLeadDetail = assignLeadId => async dispatch => {
  try {
    let result = await postRequestWithAuth("adviser/getAssignedLeadDetail", {
      assignLeadId,
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

export const sendRecommendedMail = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "adviser/sendRecommendedMail",
      filterOptions
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

export const closeSeniorLivingLeadByAdviser =
  (fData, attachedFile) => async dispatch => {
    try {
      const adviserFormData = JSON.stringify(fData)
      const formData = new FormData()
      formData.append("attachedFile", attachedFile)
      formData.append("data", adviserFormData)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
      let result = await postRequestWithAuth(
        "senior-living/closeLeadByAdviser",
        formData,
        config
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

export const getLeadActivity = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `adviser/getLeadActivity`,
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

/* SENIOR LIVING LEADS ACTIONS */

/* DISPATCH ACTIONS */
export const updatePropertyFilterStates = data => dispatch => {
  dispatch({
    type: UPDATE_ADVISER_PROPERTY_FILTER_STATE,
    payload: data,
  })
}
export const clearPropertyFilterState = data => dispatch => {
  dispatch({
    type: CLEAR_PROPERTY_FILTER_STATE,
    payload: data,
  })
}
/* DISPATCH ACTIONS */
