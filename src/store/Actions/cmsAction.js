import { postRequestWithAuth } from "./apiAction"
import { toastr } from "react-redux-toastr"
import { UPDATE_FORM_STATE } from "../constants/cmsConstants"

// dispatch actions
export const updateFormState = data => dispatch => {
  console.log(`New Data `, data)
  dispatch({
    type: UPDATE_FORM_STATE,
    payload: data,
  })
}

// api call async actions
export const getUnSetStateList = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(`cms/getUnSetStateList`, {
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

export const getStateContentList = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `cms/getStateContentList`,
      filterOptions
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

export const getStatePageList = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `cms/getStatePageList`,
      filterOptions
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

export const getStructureDataPageList = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `cms/getStructureDataPageList`,
      filterOptions
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

export const getMetaCmsData = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(`cms/getMetaCmsData`, filterOptions)
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

export const editMetaCmsData = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(`cms/editMetaCmsData`, filterOptions)
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

export const editStructurePageCmsData = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `cms/editStructurePageCmsData`,
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

export const createStatePageTemplate = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `cms/createStatePageTemplate`,
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

export const updateStatePageContent = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `cms/updateStatePageContent`,
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

export const getStructuredCmsPageDetail = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `cms/getStructuredCmsPageDetail`,
      filterOptions
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

export const updateStructureCmsPageStatus = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `cms/updateStructureCmsPageStatus`,
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
