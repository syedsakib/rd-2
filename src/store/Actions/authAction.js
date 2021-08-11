import {
  USER_AUTHENTICATED,
  USER_AUTHENTICATION_FAILED,
  LOGOUT_USER,
} from "../constants/authConstants"
import { toastr } from "react-redux-toastr"
import { postRequest, postRequestWithAuth } from "./apiAction"
import { getURL, getEnv } from "../utils/util"

export function userLoginDetails(data) {
  return {
    type: USER_AUTHENTICATED,
    payload: data,
  }
}
export function userLoginFailed(data) {
  return {
    type: USER_AUTHENTICATION_FAILED,
    payload: data,
  }
}

export function removeLoggedInUserData() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER,
      payload: "",
    })
    logOutFromCrossPart()
    let env = getEnv()
    if (env !== "local") {
      window.location.href = getURL()
    } else {
      window.location.href = "/"
    }
    return true
  }
}
export const loginToCrossPart = token => {
  let win = document.getElementById("cIframe").contentWindow
  if (win) {
    console.log(`Iframe Found`)
    win.postMessage(
      JSON.stringify({
        key: "token",
        value: token,
        method: "set",
      }),
      "*"
    )
  } else {
    console.log(`No Iframe Found`)
  }
}

export const logOutFromCrossPart = () => {
  let win = document.getElementById("cIframe").contentWindow
  if (win) {
    win.postMessage(
      JSON.stringify({
        key: "token",
        method: "remove",
      }),
      "*"
    )
  } else {
    console.log(`No Iframe Found`)
  }
}

export const updateCrossPart = () => {
  let win = document.getElementById("cIframe").contentWindow
  if (win) {
    let token = localStorage.getItem("token")
    if (token) {
      win.postMessage(
        JSON.stringify({
          key: "token",
          value: token,
          method: "set",
        }),
        "*"
      )
    } else {
      win.postMessage(
        JSON.stringify({
          key: "token",
          method: "remove",
        }),
        "*"
      )
    }
  } else {
    console.log(`No Iframe Found`)
  }
}

export const dashboardLogin = (formData, history) => async dispatch => {
  try {
    let result = await postRequest("user/dashboardLogin", formData)
    const { status, msg, data } = result.data
    console.log({ status, msg, data })
    if (status === 200) {
      console.log(`Data `, data)
      /*toastr.success("Success", msg)
      // login to cross app
      loginToCrossPart(token);
      localStorage.setItem("token", token);
      dispatch(userLoginDetails(data));
      let role = parseInt(data.role);
      if (role === 4) {
        history.push({ pathname: "/adviser" });
      } else if (role === 6) {
        history.push({ pathname: "/ca" });
      } else if (role === 2) { 
        history.push({ pathname: "/customer" });
      } else if (role === 3) {
        history.push({ pathname: "/partner" });
      } else if (role === 9) {
        history.push({ pathname: "/homeCare" });
      } else if (role === 10) {
        history.push({ pathname: "/developer" });
      } else if (role === 11) {
        history.push({ pathname: "/sales" });
      } else if (role === 1) {
        history.push({ pathname: "/admin" });
      } else if (role === 7) {
        history.push({ pathname: "/admin/subAdmin/dashboard" });
      } else if (role === 8) {
        history.push({ pathname: "/admin/scrape/properties" });
      }*/
      return data
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    console.log(err)
    toastr.error("Error", "Something went wrong, Please try again")
  }
}

export const send2FaCode = formData => async dispatch => {
  try {
    let result = await postRequest("role/send2FaCode", formData)
    const { status, msg } = result.data
    if (status === 200) {
      return true
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    console.log(err)
    toastr.error("Error", "Something went wrong, Please try again")
  }
}

export const verify2FaCode = formData => async dispatch => {
  try {
    let result = await postRequest("role/verify2FaCode", formData)
    const { status, msg } = result.data
    if (status === 200) {
      toastr.success("Success", msg)
      return true
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    console.log(err)
    toastr.error("Error", "Something went wrong, Please try again")
  }
}

export const authenticateUser = () => async dispatch => {
  try {
    let res = await postRequestWithAuth("user/getLoggedinUser")
    const { status, data } = res.data
    if (status === 200) {
      dispatch(userLoginDetails(data))
      return false
    } else {
      dispatch(userLoginFailed())
      return true
    }
  } catch (err) {
    dispatch(userLoginFailed())
    toastr.error("Error", "Something went wrong, Please try again")
  }
}

export const updateUserPassword = formData => async dispatch => {
  try {
    let res = await postRequestWithAuth("user/updateUserPassword", formData)
    const { status, msg } = res.data
    if (status === 200) {
      toastr.success("Success", msg)
      return true
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
  }
}

export const updateProfilePicture = (imageFile, id) => async dispatch => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    const formData = new FormData()
    formData.append("myImage", imageFile)
    formData.append("Id", id)
    let res = await postRequestWithAuth("user/uploadDP", formData)
    const { status, msg, data } = res.data
    if (status === 200) {
      toastr.success("Success", msg)
      return data
    } else {
      toastr.error("Error", msg)
      return false
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again")
  }
}

export const updateProfileData = userDetails => async dispatch => {
  try {
    let result = await postRequestWithAuth(
      "user/updateProfileData",
      userDetails
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
