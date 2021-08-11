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

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb"

import ErrorView from "components/Common/ErrorView/ErrorView"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import SearchSelect from "components/Common/SearchSelect/SearchSelect"

//redux & actions
import { useDispatch } from "react-redux"
import { getSuggestedLocationByZipCode } from "../../../../store/Actions/customerAction"
import {
  editCorporateManager,
  getCorporateUserDetail,
} from "../../../../store/Actions/corporateAction"
import LoaderComponent from "components/Common/Loader/LoaderComponent"

const EditCorporateAdminForm = ({ match: { params } }) => {
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
  const [userDetail, setUserDetail] = useState(null)
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
  const dispatch = useDispatch()

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

  // app functions
  useEffect(() => {
    if (params && params.id) {
      getDataHandler(params.id)
    }
  }, [])

  useEffect(() => {
    if (userDetail) {
      updateFormHandler({
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        email: userDetail.email,
        phoneNumber: userDetail.phoneNumber,
        state: userDetail.state || "",
        city: userDetail.city || "",
        zipcode: userDetail.zipcode || "",
        address: userDetail.address || "",
      })
    }
  }, [userDetail])

  const getDataHandler = async userId => {
    try {
      const result = await dispatch(getCorporateUserDetail({ id: userId }))
      console.log(`User Detail `, result)
      if (result) {
        setUserDetail(result)
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
      let result = await dispatch(getSuggestedLocationByZipCode(val))
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

  const onSubmitHandler = async () => {
    try {
      if (isLoading) {
        throw "A process is in progress. Please wait"
      }
      if (!params || !params.id) {
        throw "No User Id found"
      }
      toggleLoader(true)
      let result = await dispatch(
        editCorporateManager({
          firstName,
          lastName,
          email,
          phoneNumber,
          state,
          city,
          zipcode,
          address,
          id: params.id,
        })
      )
      toggleLoader(false)
      if (result) {
        history.goBack()
      }
    } catch (e) {
      console.log(e)
      toggleLoader(false)
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
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Admin" breadcrumbItem="edit manager details" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">
                      Edit Manager Details for:{" "}
                      <strong>{`${userDetail?.firstName} ${userDetail?.lastName}`}</strong>
                    </div>
                    <div className="col-md-6 text-end">
                      <div className="db-btn-group">
                        <Link
                          to="/admin/corporate"
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
                                onChange={onChange}
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
                                onChange={onChange}
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
                                disabled={true}
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
                                <sup
                                  className="lbl-star"
                                  style={{ color: "red" }}
                                >
                                  *
                                </sup>
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

                        {/* //submit button// */}
                        <div className="text-center mt-4">
                          {!isLoading ? (
                            <button
                              type="submit"
                              className="btn btn-primary  btn-label"
                            >
                              <i className="bx bx-check-double label-icon"></i>{" "}
                              Save Changes
                            </button>
                          ) : (
                            <button type="button" className="btn btn-primary">
                              <i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2"></i>
                              Processing
                            </button>
                          )}
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

export default EditCorporateAdminForm
