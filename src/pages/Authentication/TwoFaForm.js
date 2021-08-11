import React, { useState, useEffect } from "react"

//Verification code package
import AuthCode from "react-auth-code-input"

import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from "reactstrap"
import { useLocation, useHistory } from "react-router-dom"
import { toastr } from "react-redux-toastr"

import { connect } from "react-redux"
import {
  loginToCrossPart,
  send2FaCode,
  verify2FaCode,
  authenticateUser,
} from "../../store/Actions/authAction"

// import images
import logodark from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import logolight2 from "../../assets/images/logos/logo_full_with_slogan.png"

const TwostepVerification = ({
  send2FaCode,
  verify2FaCode,
  data,
  authenticateUser,
  userDetails,
  role,
}) => {
  console.log({
    send2FaCode,
    verify2FaCode,
    data,
    authenticateUser,
    userDetails,
    role,
  })
  // states
  const [isTimerRunning, updateTimerState] = useState(false)
  const [clockTimer, updateClockTimer] = useState(-1)
  const [formData, updateFormData] = useState({
    verificationCode: "",
  })

  const location = useLocation()
  let timerController

  // destructure states
  const { verificationCode } = formData

  useEffect(() => {
    resendValidationCode()
  }, [])

  useEffect(() => {
    if (userDetails) {
      window.location.reload()
    }
  }, [userDetails])

  useEffect(() => {
    if (isTimerRunning) {
      if (timerController) {
        //clearTimeout(timerController);
      }
      startCountDownTimer()
    }
  }, [isTimerRunning])

  useEffect(() => {
    if (isTimerRunning) {
      if (clockTimer === 0) {
        if (timerController) clearTimeout(timerController)
        updateTimerState(false)
      } else {
        timerController = setTimeout(updateTimerHandler, 1000)
      }
    }
  }, [clockTimer])

  const updateTimerHandler = reset => {
    if (reset) {
      updateClockTimer(59)
    } else {
      updateClockTimer(clockTimer - 1)
    }
  }

  const startCountDownTimer = () => {
    updateTimerHandler(true)
  }

  const onChange = e => {
    updateFormData({
      verificationCode: e,
    })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    try {
      console.log("hello")
      if (!data || !data.token) {
        throw "No token found"
      }
      const { token } = data
      let result = await verify2FaCode({
        verificationCode,
        token,
      })
      console.log(result)
      if (result) {
        // loginToCrossPart(token)
        localStorage.setItem("token", token)
        const userRole = parseInt(role)
        if (location?.state?.inviteHash && (userRole === 3 || userRole === 4)) {
          window.location = `/invitation/${location.state.inviteHash}`
        } else {
          authenticateUser()
        }
      }
    } catch (e) {
      console.log("hellodd")
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const resendValidationCode = async () => {
    try {
      if (!data || !data.token) {
        throw "No token found"
      }
      let result = await send2FaCode({ token: data.token })
      console.log(`resendValidationCode`, result)
      if (result) {
        updateTimerState(true)
      }
      updateTimerState(true)
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  return (
    <React.Fragment>
      <div className="">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 text-muted">
                <Link to="dashboard" className="d-block auth-logo">
                  <img
                    src={logolight2}
                    alt=""
                    height="20"
                    className="auth-logo-dark mx-auto"
                    style={{
                      height: "60px",
                      width: "120px",
                      objectFit: "cover",
                    }}
                  />
                  <img
                    src={logolight2}
                    alt=""
                    height="20"
                    className="auth-logo-light mx-auto"
                    style={{
                      height: "60px",
                      width: "120px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <p className="mt-3">BoomersHub Email Verification</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bxs-envelope h1 mb-0 text-danger"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Verify your email</h4>
                        <p className="mb-5">
                          Please enter the 6 digit code sent to{" "}
                          <span className="font-weight-semibold">
                            your email
                          </span>
                        </p>

                        <form onSubmit={onSubmitHandler}>
                          <Row>
                            <Col xs={12}>
                              <FormGroup className="verification">
                                <label
                                  htmlFor="digit1-input"
                                  className="sr-only"
                                >
                                  Dight 1
                                </label>
                                <AuthCode
                                  characters={6}
                                  className="form-control form-control-lg text-center"
                                  allowedCharacters="^[0-9]"
                                  inputStyle={{
                                    width: "42px",
                                    height: "42px",
                                    padding: "8px",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    textAlign: "center",
                                    marginRight: "15px",
                                    border: "1px solid #ced4da",
                                    textTransform: "uppercase",
                                  }}
                                  name="verificationCode"
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <div className="mt-4">
                            <button
                              type="submit"
                              className="btn btn-success login-btn"
                            >
                              Confirm
                            </button>
                          </div>
                          <div className="mt-2">
                            {isTimerRunning ? (
                              <span
                                className="resend-time-text"
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                              >
                                {clockTimer}s
                              </span>
                            ) : null}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Did't receive a code ?{" "}
                  <a
                    href="#"
                    className="fw-medium text-primary"
                    onClick={e => {
                      e.preventDefault()
                      resendValidationCode()
                    }}
                  >
                    Resend
                  </a>
                </p>
                <p>
                  © {new Date().getFullYear()} BoomersHub. All rights reserved.
                </p>
              </div>
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
  send2FaCode,
  verify2FaCode,
  authenticateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(TwostepVerification)
