import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { toastr } from "react-redux-toastr"
import { Link, useHistory, Redirect } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap"
import jSuites from "jsuites"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb"
import LoaderComponent from "components/Common/Loader/LoaderComponent"

//redux & actions

const ApplicantDetails = props => {
  // declare states
  const history = useHistory()
  const [applicantDetails, setApplicantDetails] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [isLoading, toggleLoader] = useState(false)

  const setApplicantDetailsHandler = () => {
    setApplicantDetails(props && props.location.state.applicantsDetails)
  }
  // app functions
  useEffect(() => {
    setApplicantDetailsHandler()
  }, [applicantDetails])

  if (isLoading) {
    return <LoaderComponent />
  }

  if (redirect) {
    toastr.error("Error", "Unauthorized access,please login again as admin")
    return <Redirect to="/admins/login" />
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Admin" breadcrumbItem="applicant Details" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">
                      Detail of{" "}
                      <strong>
                        {applicantDetails.firstName +
                          " " +
                          applicantDetails.lastName}
                      </strong>
                    </div>
                    <div className="col-md-6 text-end">
                      <div className="db-btn-group">
                        <Button
                          title="Go Back"
                          color="info"
                          className="btn btn-danger btn-label"
                          style={{ marginRight: "10px" }}
                          onClick={() => history.goBack()}
                        >
                          <i className="bx bx-arrow-back label-icon"></i>
                          Go Back
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  {applicantDetails.businessName ? (
                    <Row className="my-2">
                      <Col md="3">
                        <h4>Bussiness Name</h4>
                      </Col>
                      <Col md="9">
                        <h5 className="font-weight-bold">
                          {applicantDetails.businessName}
                        </h5>
                      </Col>
                    </Row>
                  ) : null}
                  {applicantDetails.type ? null : applicantDetails.positionId ? (
                    <Row className="my-2">
                      <Col md="3">
                        <h4>Apply For</h4>
                      </Col>
                      <Col md="9">
                        <p className="fw-medium">
                          {applicantdetail.position.position}
                        </p>
                      </Col>
                    </Row>
                  ) : null}
                  {applicantDetails.phoneNumber ? (
                    <Row className="my-2">
                      <Col md="3">
                        <h4>Phone Number</h4>
                      </Col>
                      <Col md="9">
                        <p className="fw-medium">
                          {jSuites.mask.run(
                            applicantDetails.phoneNumber,
                            `(000) 000-00000000`
                          )}
                        </p>
                      </Col>
                    </Row>
                  ) : null}
                  {applicantDetails.email ? (
                    <Row className="my-2">
                      <Col md="3">
                        <h4>Email</h4>
                      </Col>
                      <Col md="9">
                        <p className="fw-medium">{applicantDetails.email}</p>
                      </Col>
                    </Row>
                  ) : null}
                  {applicantDetails.city ? (
                    <Row className="my-2">
                      <Col md="3">
                        <h4>City</h4>
                      </Col>
                      <Col md="9">
                        <p className="fw-medium">{applicantDetails.city}</p>
                      </Col>
                    </Row>
                  ) : null}
                  {applicantDetails.state ? (
                    <Row className="my-2">
                      <Col md="3">
                        <h4>State</h4>
                      </Col>
                      <Col md="9">
                        <p className="fw-medium">{applicantDetails.state}</p>
                      </Col>
                    </Row>
                  ) : null}
                  {applicantDetails.type ? null : (
                    <div>
                      {applicantDetails.disability ? (
                        <Row className="my-2">
                          <Col md="3">
                            <h4>Disability</h4>
                          </Col>
                          <Col md="9">
                            <p className="fw-medium">
                              {applicantDetails.disability}
                            </p>
                          </Col>
                        </Row>
                      ) : null}
                      {applicantDetails.race ? (
                        <Row className="my-2">
                          <Col md="3">
                            <h4>Race</h4>
                          </Col>
                          <Col md="9">
                            <p className="fw-medium">{applicantDetails.race}</p>
                          </Col>
                        </Row>
                      ) : null}
                      {applicantDetails.veteran ? (
                        <Row className="my-2">
                          <Col md="3">
                            <h4>Veteran</h4>
                          </Col>
                          <Col md="9">
                            <p className="fw-medium">
                              {applicantDetails.veteran}
                            </p>
                          </Col>
                        </Row>
                      ) : null}
                    </div>
                  )}
                  {applicantDetails.resume ? (
                    <Row className="my-2">
                      <Col md="3">
                        <h4>Resume</h4>
                      </Col>
                      <Col md="9">
                        <a
                          style={{ color: "blue" }}
                          href={applicantDetails.resume}
                          target="blank"
                          className="fw-medium"
                        >
                          {applicantDetails.resume}
                        </a>
                      </Col>
                    </Row>
                  ) : null}
                  {applicantDetails.coverLetter ? (
                    <Row className="my-2">
                      <Col md="3">
                        <h4>Cover Letter</h4>
                      </Col>
                      <Col md="9">
                        <a
                          style={{ color: "blue" }}
                          href={applicantDetails.coverLetter}
                          target="blank"
                          className="fw-medium"
                        >
                          {applicantDetails.coverLetter}
                        </a>
                      </Col>
                    </Row>
                  ) : null}
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantDetails)
