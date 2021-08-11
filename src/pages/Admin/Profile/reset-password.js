import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Container, Row, Col, Card, CardBody, Media, Button } from "reactstrap"
import { useHistory } from "react-router-dom"
import { toastr } from "react-redux-toastr"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb"
import avatar from "../../../assets/images/users/avatar-1.jpg"

//redux & actions
import { changePassword } from "../../../store/Actions/userAction"

const ResetPassword = ({ userDetails, changePassword }) => {
  const history = useHistory()
  const [isLoading, toggleLoader] = useState(false)
  const [profilePic, setProfilePic] = useState(
    "https://cdn-boomershub.s3.amazonaws.com/web/defaultUser.jpg"
  )

  const [formData, updateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  })

  // extract form data
  const { firstName, lastName, email, phoneNumber } = formData

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Enter your old password."),
    newPassword: Yup.string()
      .required("No password provided.")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .required("This is required field"),
  })

  //
  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const oldPassword = values.oldPassword
      const newPassword = values.newPassword
      const confirmPassword = values.confirmPassword
      console.log({ oldPassword, newPassword, confirmPassword })
      const result = await changePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      })
      onSubmitProps.resetForm()
      history.push("/admin/account")
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  // app functions
  useEffect(() => {
    if (userDetails) {
      updateFormData({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
      })
      if (userDetails.image) {
        setProfilePic(userDetails.image)
      }
    }
  }, [userDetails])

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        errors
        // enableReinitialize
      >
        {props => {
          const { values, touched, errors, isSubmitting } = props
          return (
            <React.Fragment>
              <div className="page-content">
                <MetaTags>
                  <title>
                    Profile | Skote - React Admin & Dashboard Template
                  </title>
                </MetaTags>
                <Container fluid>
                  {/* Render Breadcrumb */}
                  <Breadcrumb title="Admin" breadcrumbItem="reset password" />

                  <Row>
                    <Col lg="12">
                      <Card>
                        <CardBody>
                          <Media>
                            <div className="ms-3">
                              <img
                                src={avatar}
                                alt=""
                                className="avatar-md rounded-circle img-thumbnail"
                              />
                            </div>
                            <Media body className="align-self-center">
                              <div className="text-muted px-4">
                                <h5>{`${firstName} ${lastName}`}</h5>
                                <p className="mb-1">{email}</p>
                                <p className="mb-0">Phone No: {phoneNumber}</p>
                              </div>
                            </Media>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>

                  <h4 className="card-title mb-4">Change Your password</h4>

                  <Card>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <Form>
                            <div className="row mt-3">
                              <div className="col-md-8 offset-md-2">
                                <div className="form-group">
                                  <label
                                    className="pro-lbl-1"
                                    htmlFor="firstName"
                                  >
                                    Old Password{" "}
                                    <sup
                                      className="lbl-star"
                                      style={{ color: "red" }}
                                    >
                                      *
                                    </sup>
                                  </label>
                                  <Field
                                    type="password"
                                    className={`form-control ${
                                      errors.oldPassword &&
                                      touched.oldPassword &&
                                      "error"
                                    }`}
                                    id="oldPassword"
                                    name="oldPassword"
                                    value={values.oldPassword}
                                    placeholder="******"
                                  />
                                  {touched.oldPassword && errors.oldPassword ? (
                                    <div className="error">
                                      {errors.oldPassword}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-md-8 offset-md-2">
                                <div className="form-group">
                                  <label
                                    className="pro-lbl-1"
                                    htmlFor="newPassword"
                                  >
                                    New Password{" "}
                                    <sup
                                      className="lbl-star"
                                      style={{ color: "red" }}
                                    >
                                      *
                                    </sup>
                                  </label>
                                  <Field
                                    type="password"
                                    className={`form-control ${
                                      errors.newPassword &&
                                      touched.newPassword &&
                                      "error"
                                    }`}
                                    id="newPassword"
                                    name="newPassword"
                                    value={values.newPassword}
                                    placeholder="******"
                                  />
                                  {touched.newPassword && errors.newPassword ? (
                                    <div className="error">
                                      {errors.newPassword}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-md-8 offset-md-2">
                                <div className="form-group">
                                  <label
                                    className="pro-lbl-1"
                                    htmlFor="confirmPassword"
                                  >
                                    Confirm Your Password{" "}
                                    <sup
                                      className="lbl-star"
                                      style={{ color: "red" }}
                                    >
                                      *
                                    </sup>
                                  </label>
                                  <Field
                                    type="password"
                                    className={`form-control ${
                                      errors.confirmPassword &&
                                      touched.confirmPassword &&
                                      "error"
                                    }`}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    placeholder="******"
                                  />
                                  {touched.confirmPassword &&
                                  errors.confirmPassword ? (
                                    <div className="error">
                                      {errors.confirmPassword}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            {/* //submit button// */}
                            <div className="text-center mt-4">
                              <button
                                type="submit"
                                className="btn btn-primary btn-label"
                                disabled={isSubmitting}
                              >
                                <i className="bx bx-check-double label-icon"></i>
                                Change Password
                              </button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Container>
              </div>
            </React.Fragment>
          )
        }}
      </Formik>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.loggedInUser,
})

const mapDispatchToProps = { changePassword }

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
