import { postRequestWithAuth } from "./apiAction"
import { toastr } from "react-redux-toastr"

export const searchSeniorLiving =
  (filterData = {}) =>
  async dispatch => {
    try {
      let result = await postRequestWithAuth(`senior-living/search`, filterData)
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

export const getAllLeads = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `senior-living/getAllLeads`,
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

export const getLeadAssignHistory = filterOptions => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      `senior-living/getLeadAssignHistory`,
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

export const getLeadProfile = leadId => async dispatch => {
  try {
    let result = await postRequestWithAuth("senior-living/getLeadProfile", {
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

export const getLeadInterestedProperties = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "senior-living/getLeadInterestedProperties",
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

export const getLeadWishlistedProperties = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "senior-living/getLeadWishlistedProperties",
      filterData
    )
    console.log(result.data)
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

export const getLeadRecommendedProperties = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "senior-living/getLeadRecommendedProperties",
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

export const getLeadRelatedStates = filterData => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "senior-living/getLeadRelatedStates",
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

export const assignAdviserToLead = filterState => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "senior-living/assignAdviserToLead",
      filterState
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

export const getAllSeniorLivingList =
  (filterData = {}) =>
  async dispatch => {
    try {
      let result = await postRequestWithAuth(`senior-living/list`, filterData)
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

export const getAllCompanyList =
  (filterData = {}) =>
  async dispatch => {
    try {
      let result = await postRequestWithAuth(
        `senior-living/getAllCompanyList`,
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

export const updateSeniorLiving =
  (dataFields, propertyId, shouldPublish = {}) =>
  async dispatch => {
    try {
      const formData = new FormData()
      formData.append("shouldPublish", shouldPublish)
      formData.append("propertyId", propertyId)
      formData.append("basicProfile", JSON.stringify(dataFields.basicProfile))
      formData.append("careTypeList", JSON.stringify(dataFields.careTypeList))
      formData.append("roomList", JSON.stringify(dataFields.roomList))
      formData.append("amenityList", JSON.stringify(dataFields.amenityList))
      formData.append(
        "serviceList",
        JSON.stringify(dataFields.serviceList.map(item => item.id))
      )
      formData.append("communityList", JSON.stringify(dataFields.communityList))
      formData.append(
        "removedImageList",
        JSON.stringify(dataFields.removedImageList)
      )

      let newImageList = dataFields.imageList.filter(item => item.file)
      for (let p of newImageList) {
        formData.append("photos", p.file)
      }
      let result = await postRequestWithAuth(`senior-living/update`, formData)
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

export const updateSeniorLivingDataStatus =
  (filterData = {}) =>
  async dispatch => {
    try {
      let result = await postRequestWithAuth(
        `senior-living/updateDataStatus`,
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
