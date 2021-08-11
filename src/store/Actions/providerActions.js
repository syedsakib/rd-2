import { LOGIN_USER_DETAILS } from "../constants/constants"
import axios from "axios"
import { toastr } from "react-redux-toastr"

//------------Partners routes------------------//

export function userLoginDetails(data) {
  return {
    type: LOGIN_USER_DETAILS,
    Payload: data,
  }
}

export function registration(data, history) {
  return axios
    .post("/user/providerRegistration", { data })
    .then(res => {
      if (res.data.status === 200) {
        toastr.success("Success", res.data.msg)
        return true
      } else {
        toastr.error("Error", res.data.msg)
      }
    })
    .catch(err => {
      toastr.error("Error", "Something went wrong, Please try again")
    })
}

export function accountVerification(token) {
  return axios
    .post("/user/accountVerification", { token })
    .then(res => {
      if (res.data.status === 200) {
        return true
      } else {
        toastr.error("Error", res.data.msg)
      }
    })
    .catch(err => {
      toastr.error("Error", "Something went wrong, Please try again")
    })
}

export function partnerLogin(data, history) {
  const headers = {
    "content-type": "application/json",
  }
  return function (dispatch) {
    return axios
      .post("/user/partnerLogin", { data })
      .then(res => {
        if (res.data.status === 200) {
          toastr.success("Success", res.data.msg)
          localStorage.setItem("token", res.data.token)
          dispatch(userLoginDetails(res.data.data))
          return true
        } else toastr.error("Error", res.data.msg)
      })
      .catch(err => {
        toastr.error("Error", "Something went wrong, Please try again")
      })
  }
}

export function getLoggedinPartner() {
  return function (dispatch) {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token")
    const headers = {
      "Content-Type": "application/json",
    }
    return axios
      .post("/user/getLoggedinPartner", { headers: headers })
      .then(res => {
        // if (res.data.status === 404 || res.data.status === 401) {
        //   return true;
        // } else {
        //   dispatch(customerLoginDetails(res.data.data));
        //   return false;
        // }
      })
      .catch(err => {
        toastr.error("Error", "Something went wrong, Please try again")
      })
  }
}
