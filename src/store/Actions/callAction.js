import { toastr } from "react-redux-toastr"
import {
  UPDATE_CALL_STATE,
  RESET_CALL_STATE,
  UPDATE_QUE_CALL_STATE,
  UPDATE_LOG_CLICK_TIMER,
  UPDATE_CALL_STATUS,
  UPDATE_CALLED_USER_DETAIL,
  UPDATE_CALL_QUEUE_LIST,
  UPDATE_QUEUE_LEAD_TITLE,
} from "../constants/callConstants"
import { UPDATE_LOG_COUNT, UPDATE_SOCKET_CON } from "../constants/constants"
import { postRequestWithAuth } from "./apiAction"
import FileDownload from "js-file-download"

export const updateCallState = data => dispatch => {
  dispatch({
    type: UPDATE_CALL_STATE,
    payload: data,
  })
}

export const resetCallState = () => dispatch => {
  dispatch({
    type: RESET_CALL_STATE,
    payload: null,
  })
}

export const updateQueCallState = data => dispatch => {
  dispatch({
    type: UPDATE_QUE_CALL_STATE,
    payload: data,
  })
}

export const updateCallStatus = data => dispatch => {
  dispatch({
    type: UPDATE_CALL_STATUS,
    payload: data,
  })
}

export const updateLogCount = data => dispatch => {
  dispatch({
    type: UPDATE_LOG_COUNT,
    payload: data,
  })
}

export const updateSocketCon = data => dispatch => {
  dispatch({
    type: UPDATE_SOCKET_CON,
    payload: data,
  })
}

export const updateLogClickTimer = data => dispatch => {
  dispatch({
    type: UPDATE_LOG_CLICK_TIMER,
    payload: data,
  })
}

export const updateCalledUserDetail = data => dispatch => {
  dispatch({
    type: UPDATE_CALLED_USER_DETAIL,
    payload: data,
  })
}

export const updateCallQueueList = data => dispatch => {
  dispatch({
    type: UPDATE_CALL_QUEUE_LIST,
    payload: data,
  })
}

export const updateQueueLeadTitle = data => dispatch => {
  dispatch({
    type: UPDATE_QUEUE_LEAD_TITLE,
    payload: data,
  })
}

export const getToken = () => async dispatch => {
  try {
    let result = await postRequestWithAuth("call/getToken")
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

export const getNumberDetails = (phoneNumber, userOf) => async dispatch => {
  try {
    let url
    if (userOf === "sales") {
      url = "call/getAgencyDetailByNumber"
    } else if (userOf === "agent") {
      url = "call/getUserDetailByNumber"
    } else if (userOf === "adviser") {
      url = "call/getLeadDetailByNumber"
    }
    let result = await postRequestWithAuth(url, { phoneNumber, userOf })
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

export const getAllCallLogList = filterOption => async dispatch => {
  try {
    let result = await postRequestWithAuth("call/getAllCallLogList", {
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

export const getAllCallLogListForAdmin = filterOption => async dispatch => {
  try {
    let result = await postRequestWithAuth("call/getAllCallLogListForAdmin", {
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

export const exportToCsvLogs = filterOption => async dispatch => {
  try {
    let result = await postRequestWithAuth("call/exportToCsvLogs", {
      ...filterOption,
    })
    FileDownload(result.data, "callLogs.csv")
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
    return false
  }
}

export const searchLeadList = (searchOf, keyword) => async dispatch => {
  try {
    let result = await postRequestWithAuth("call/searchLeadList", {
      searchOf,
      keyword,
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

export const linkLogToLead = formData => async dispatch => {
  try {
    let result = await postRequestWithAuth("call/linkLogToLead", {
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

export const getUnSeenCallLogs = () => async dispatch => {
  try {
    let result = await postRequestWithAuth("call/getUnSeenCallLogs")
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

export const getCallQueueList = () => async dispatch => {
  try {
    let result = await postRequestWithAuth("call/getCallQueueList")
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
