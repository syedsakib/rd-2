import MetaTags from "react-meta-tags"
import React, { Fragment, useState, useEffect } from "react"
import { connect } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { toastr } from "react-redux-toastr"

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Media,
  Button,
  Input,
} from "reactstrap"

//Import Breadcrumb
import { useForm } from "react-hook-form"
import { isPossiblePhoneNumber } from "react-phone-number-input"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb"
import avatar from "../../../assets/images/users/avatar-1.jpg"

import ErrorView from "components/Common/ErrorView/ErrorView"
import ReactTags from "components/Common/ReactTags/ReactTags"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { addCode } from "../../../store/utils/util"
import SearchSelect from "components/Common/SearchSelect/SearchSelect"

//redux & actions
import { useSelector, useDispatch } from "react-redux"
import {
  getRoleTypeList,
  addInternalUser,
} from "../../../store/Actions/roleAction"
import { getSuggestedLocationByZipCode } from "../../../store/Actions/customerAction"
import LoaderComponent from "components/Common/Loader/LoaderComponent"

const CreateUserForm = ({
  getSuggestedLocationByZipCode,
  getRoleTypeList,
  addInternalUser,
}) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  }

  // declare state
  const history = useHistory()
  const [isLoading, toggleLoader] = useState(false)
  const [roleState, updateRoleState] = useState({
    roleTypeList: [],
    prevUserRoles: [],
  })
  const [suggestedPlaceList, updatePlaceList] = useState([])
  const [formData, updateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    state: "",
    city: "",
    zipcode: "",
    location: "",
    address: "",
  })
  const [selectedRoles, updateSelectedRoleList] = useState([])

  // destructure states
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    state,
    city,
    zipcode,
    address,
    location,
  } = formData
  const { roleTypeList, prevUserRoles } = roleState

  // app functions
  useEffect(() => {
    getRoleTypeListHandler()
  }, [])

  const getRoleTypeListHandler = async () => {
    try {
      let result = await getRoleTypeList({ roleType: "Internal" })
      console.log(`Role Type List`, result)
      if (result) {
        let mappedList = result.map(item => ({
          id: item.id,
          name: item.roleName,
        }))
        updateRoleState({
          ...roleState,
          roleTypeList: mappedList,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const updateFormHandler = newData => {
    updateFormData({
      ...formData,
      ...newData,
    })
  }
  const onChange = e => {
    let name = e.target.name
    let value = e.target.value
    updateFormHandler({ [name]: value })
  }

  const onPlaceChange = (city, state, zipcode) => {
    updateFormHandler({
      state,
      city,
      zipcode,
    })
  }

  const handleKeyWordChangeForLocationZipCode = async value => {
    let val = value
    onPlaceChange("", "", value)
    if (val && val.trim() !== "") {
      let result = await getSuggestedLocationByZipCode(val)
      if (result) {
        let optionList = result.map(item => ({
          label: `${item.zip} ${item.city}, ${item.state_name}`,
          value: item,
        }))
        updatePlaceList(optionList)
      }
    }
  }

  const onLocationSelectHandler = value => {
    if (value) {
      const { state_name, city, zip, state_id } = value
      onPlaceChange(city, state_name, zip)
    }
  }

  const onChangeTag = sList => {
    updateSelectedRoleList(sList)
  }

  const onSubmitHandler = async () => {
    try {
      console.log(`FormData`, formData)
      console.log(`Role List `, selectedRoles)
      if (!selectedRoles || selectedRoles.length === 0) {
        throw "At least one role needs to be selected"
      }
      toggleLoader(true)
      let result = await addInternalUser({
        firstName,
        lastName,
        email,
        phoneNumber,
        state,
        city,
        zipcode,
        address,
        roleList: selectedRoles,
      })
      console.log(`Add Role `, result)
      toggleLoader(true)
      if (result) {
        history.push("/admin/userManagement")
      }
    } catch (e) {
      console.log(e)
      toggleLoader(true)
      toastr.error("Error", e.toString())
    }
  }

  if (isLoading) {
    return <LoaderComponent />
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Admin" breadcrumbItem="add new user" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">User Details</div>
                    <div className="col-md-6 text-end">
                      <div className="db-btn-group">
                        <Link
                          to="/admin/userManagement"
                          title="Add Contact"
                          color="info"
                          className="btn btn-info btn-label"
                        >
                          <i className="bx bx-arrow-back label-icon"></i>
                          Go Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="row">
                    <div className="col-md-12">
                      <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="pro-lbl-1" htmlFor="firstName">
                                First Name{" "}
                                <sup
                                  className="lbl-star"
                                  style={{ color: "red" }}
                                >
                                  *
                                </sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={e => onChange(e)}
                                ref={register({
                                  required: {
                                    value: true,
                                    message: errorTexts["required"],
                                  },
                                })}
                              />
                              {errors["firstName"] &&
                                errors["firstName"].type === "required" && (
                                  <ErrorView
                                    message={errors["firstName"].message}
                                  />
                                )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="pro-lbl-1" htmlFor="lastName">
                                Last Name{" "}
                                <sup
                                  className="lbl-star"
                                  style={{ color: "red" }}
                                >
                                  *
                                </sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={e => onChange(e)}
                                ref={register({
                                  required: {
                                    value: true,
                                    message: errorTexts["required"],
                                  },
                                })}
                              />
                              {errors["lastName"] &&
                                errors["lastName"].type === "required" && (
                                  <ErrorView
                                    message={errors["lastName"].message}
                                  />
                                )}
                            </div>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="pro-lbl-1" htmlFor="email">
                                Email{" "}
                                <sup
                                  className="lbl-star"
                                  style={{ color: "red" }}
                                >
                                  *
                                </sup>
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                ref={register({
                                  required: {
                                    value: true,
                                    message: errorTexts["required"],
                                  },
                                })}
                              />
                              {errors["email"] &&
                                errors["email"].type === "required" && (
                                  <ErrorView
                                    message={errors["email"].message}
                                  />
                                )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group phone-input-custom">
                              <label
                                className="pro-lbl-1"
                                htmlFor="phoneNumber"
                              >
                                Phone Number{" "}
                              </label>
                              <PhoneInput
                                country="us"
                                className="form-control"
                                name="phoneNumber"
                                maxLength={14}
                                type="text"
                                value={phoneNumber}
                                onChange={value => {
                                  updateFormHandler({ phoneNumber: value })
                                }}
                                style={{ width: "100%" }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="pro-lbl-1" htmlFor="zipcode">
                                Zip Code
                              </label>
                              <SearchSelect
                                onChange={handleKeyWordChangeForLocationZipCode}
                                options={suggestedPlaceList}
                                onSelect={onLocationSelectHandler}
                                labelName="Zip Code"
                                name="zipcode"
                                id="zipcode"
                                numberMode={true}
                                inputClassName={"form-control"}
                                placeHolder={""}
                                value={zipcode}
                                showLabel={false}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="pro-lbl-1" htmlFor="zipcode">
                                City
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                value={city}
                                onChange={e => onChange(e)}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="pro-lbl-1" htmlFor="state">
                                State
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="state"
                                name="state"
                                value={state}
                                onChange={e => onChange(e)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="pro-lbl-1" htmlFor="address">
                                Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={address}
                                onChange={e => onChange(e)}
                              />
                            </div>
                          </div>
                        </div>

                        {roleState && roleState.roleTypeList.length > 0 && (
                          <div className="row mt-3">
                            <div className="col-sm-12">
                              <div className="form-group">
                                <label htmlFor="city">Roles</label>
                                <ReactTags
                                  defaultTags={roleState.prevUserRoles}
                                  suggestionList={roleState.roleTypeList}
                                  onChange={onChangeTag}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* //submit button// */}
                        <div className="text-center mt-4">
                          <button
                            type="submit"
                            className="btn btn-primary  btn-label"
                          >
                            <i className="bx bx-check-double label-icon"></i>{" "}
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.loggedInUser,
})

const mapDispatchToProps = {
  getSuggestedLocationByZipCode,
  getRoleTypeList,
  addInternalUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserForm)
