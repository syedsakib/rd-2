import MetaTags from "react-meta-tags"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
//import { toastr } from "react-redux-toastr"
import { useHistory, withRouter, Link } from "react-router-dom"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

import toastr from "toastr"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logos/logo_short_transparent.png"

//redux
import { connect } from "react-redux"
import { useSelector, useDispatch } from "react-redux"

// availity-reactstrap-validation
import ErrorView from "components/Common/ErrorView/ErrorView"
import TwoFaForm from "./TwoFaForm"

// actions
import { getRoleTypeList } from "../../store/Actions/roleAction"
import { dashboardLogin } from "../../store/Actions/authAction"

const Login = ({ getRoleTypeList, dashboardLogin, userState }) => {
  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  }
  const history = useHistory()
  const { isLoading, loggedInUser: userDetails, isAuthenticated } = userState

  // states
  const [currentForm, toggleForm] = useState("login")
  const [authData, updateAuthData] = useState(null)
  const [roleTypeList, updateRoleTypeList] = useState([])
  const [modalState, updateModalState] = useState({
    openModalName: null,
  })
  const [formData, updateFormData] = useState({
    email: "",
    password: "",
    role: "#",
  })

  // destructure states
  const { email, password, role } = formData
  const { openModalName } = modalState

  const getRoleTypeListHandler = async () => {
    try {
      let result = await getRoleTypeList()
      console.log(`Role Type List`, result)
      if (result) {
        let mappedList = result.map(item => ({
          id: item.roleNo,
          name: item.roleName,
        }))
        updateRoleTypeList(mappedList)
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

  const onSubmitHandler = async () => {
    try {
      if (!role || role === "#") {
        throw "Please select a role"
      }
      let result = await dashboardLogin({
        userEmail: email,
        userPassword: password,
        userRole: role,
      })
      console.log("dashboardLogin", result)
      if (result) {
        updateAuthData(result)
      }
    } catch (e) {
      toastr.error(e.toString())
      toastr.error(e.toString())
    }
  }

  ////////////
  useEffect(() => {
    if (isAuthenticated && userDetails) {
      history.push("/dashboard")
    }
  }, [isAuthenticated])

  useEffect(() => {
    getRoleTypeListHandler()
  }, [])

  useEffect(() => {
    if (authData) {
      toggleForm("2fa")
    }
  }, [authData])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | BoomersHub Admin Dashboard</title>
      </MetaTags>

      {!isLoading ? (
        <React.Fragment>
          <div className="home-btn d-none d-sm-block">
            <Link to="/" className="text-dark">
              <i className="fas fa-home fa-2x" />
            </Link>
          </div>
          <div className="account-pages my-5 pt-sm-5">
            {currentForm === "login" ? (
              <Container>
                <Row className="justify-content-center">
                  <Col md={8} lg={6} xl={5}>
                    <Card className="overflow-hidden">
                      <div className="bg-danger bg-soft">
                        <Row>
                          <Col xs={7}>
                            <div className="text-danger p-4">
                              <h5 className="text-danger">Welcome Back !</h5>
                              <p>Sign in to continue to BoomersHub.</p>
                            </div>
                          </Col>
                          <Col className="col-5 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div>
                          <Link to="/" className="auth-logo-light">
                            <div className="avatar-md profile-user-wid mb-4">
                              <span className="avatar-title rounded-circle bg-light">
                                <img
                                  src={logo}
                                  alt=""
                                  className="rounded-circle"
                                  height="34"
                                  width="70"
                                  style={{
                                    objectFit: "contain",
                                  }}
                                />
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="p-2">
                          <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label htmlFor="email">
                                    Email <sup className="lbl-star">*</sup>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={email}
                                    onChange={e => onChange(e)}
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
                            </div>
                            <div className="row mt-3">
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label htmlFor="password">
                                    Password <sup className="lbl-star">*</sup>
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={password}
                                    onChange={e => onChange(e)}
                                    ref={register({
                                      required: {
                                        value: true,
                                        message: errorTexts["required"],
                                      },
                                    })}
                                  />
                                  {errors["password"] &&
                                    errors["password"].type === "required" && (
                                      <ErrorView
                                        message={errors["password"].message}
                                      />
                                    )}
                                </div>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label htmlFor="role">
                                    Role <sup className="lbl-star">*</sup>
                                  </label>
                                  <select
                                    className="form-control form-select"
                                    value={role}
                                    onChange={onChange}
                                    name="role"
                                    id="role"
                                  >
                                    <option value="#" disabled>
                                      Select a role
                                    </option>
                                    {roleTypeList &&
                                      roleTypeList.map(item => {
                                        return (
                                          <option
                                            key={`r-l-${item.id}`}
                                            value={item.id}
                                          >
                                            {item.name}
                                          </option>
                                        )
                                      })}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="form-check mt-3">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </label>
                            </div>

                            <div className="mt-3 d-grid">
                              <button
                                className="btn btn-danger btn-block"
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>
                          </form>
                        </div>
                      </CardBody>
                    </Card>
                    <div className="mt-5 text-center">
                      <p>
                        © {new Date().getFullYear()} BoomersHub. All rights
                        reserved.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            ) : (
              <TwoFaForm data={authData} role={role} />
            )}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  userState: state.userDetails,
})

const mapDispatchToProps = {
  getRoleTypeList,
  dashboardLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

//export default withRouter(Login)
