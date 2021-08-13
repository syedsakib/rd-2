import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import Pagination from "react-js-pagination";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  Badge,
} from "reactstrap";

import { useForm } from "react-hook-form";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { generatePropertyUrl, getFrontUrl } from "../../../store/utils/util";
import ButtonComp from "components/Common/Button/Button";

//redux & actions
import { sendMailToSupport } from "../../../store/Actions/partnerAction";

import LoaderComponent from "components/Common/Loader/LoaderComponent";
import ErrorView from "components/Common/ErrorView/ErrorView";

const Contact = ({ userDetails, sendMailToSupport }) => {
  // declare states
  const fileInput = useRef();
  const [appState, updateAppState] = useState({
    isLoading: false,
  });
  const [formData, updateFormData] = useState({
    category: "topic-1",
    subject: "",
    message: "",
    fileName: "Browse",
  });
  const { isLoading } = appState;
  const { category, subject, message, fileName } = formData;
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
  };

  const toggleLoader = (value) => {
    updateAppState({
      ...appState,
      isLoading: value,
    });
  };

  const onFormSubmit = async (e) => {
    try {
      //check phone number input
      toggleLoader(true);
      let selectedFile = fileInput.current.files[0];
      if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
        throw "File size can't be more than 1MB";
      }

      let result = await sendMailToSupport(formData, selectedFile);
      if (result) {
        clearForm();
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
      toggleLoader(false);
    }
  };

  const clearForm = () => {
    fileInput.current.value = null;
    updateFormData({
      ...formData,
      subject: "",
      message: "",
      fileName: "Browse",
    });
  };

  const onChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="partner" breadcrumbItem="support" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">Contact Support</div>
                  </div>
                </CardHeader>
                <CardBody>
                  {isLoading ? (
                    <LoaderComponent />
                  ) : (
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                      <div className="row">
                        <div className="col-sm-12 form-group">
                          <label className="pro-lbl-1" htmlFor="lastName">
                            Category{" "}
                            <sup className="lbl-star" style={{ color: "red" }}>
                              *
                            </sup>
                          </label>
                          <select
                            className="form-control form-select"
                            name="category"
                            id="category"
                            onChange={(e) => onChange(e)}
                            value={category}
                          >
                            <option value="Payment Issue">Payment Issue</option>
                            <option value="Lead Issue">Lead Issue</option>
                            <option value="General Issue">General Issue</option>
                            <option value="Technical Issue">
                              Technical Issue
                            </option>
                            <option value="Other">Other</option>
                          </select>
                          {errors["category"] &&
                            errors["category"].type === "required" && (
                              <ErrorView message={errors["category"].message} />
                            )}
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="col-sm-12 form-group">
                          <label className="pro-lbl-1" htmlFor="lastName">
                            Subject{" "}
                            <sup className="lbl-star" style={{ color: "red" }}>
                              *
                            </sup>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Subject"
                            id="subject"
                            name="subject"
                            onChange={(e) => onChange(e)}
                            ref={register({
                              required: {
                                value: true,
                                message: errorTexts["required"],
                              },
                            })}
                            value={subject}
                          />
                          {errors["subject"] &&
                            errors["subject"].type === "required" && (
                              <ErrorView message={errors["subject"].message} />
                            )}
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="col-sm-12 form-group">
                          <label className="pro-lbl-1" htmlFor="lastName">
                            Description{" "}
                            <sup className="lbl-star" style={{ color: "red" }}>
                              *
                            </sup>
                          </label>
                          <textArea
                            type="textArea"
                            className="form-control"
                            id="message"
                            placeholder="Enter Description"
                            name="message"
                            onChange={(e) => onChange(e)}
                            ref={register({
                              required: {
                                value: true,
                                message: errorTexts["required"],
                              },
                            })}
                            value={message}
                            rows="5"
                          />
                          {errors["message"] &&
                            errors["message"].type === "required" && (
                              <ErrorView message={errors["message"].message} />
                            )}
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="col-md-6 form-group">
                          <label
                            className="input-group-text px-5 py-5"
                            for="File01"
                          >
                            <p
                              style={{ paddingLeft: "40%", fontWeight: "bold" }}
                            >
                              {formData.fileName === "Browse"
                                ? `Attach a File`
                                : "File Selected"}
                            </p>
                          </label>
                          <input
                            type="file"
                            ref={fileInput}
                            onChange={(e) => {
                              let fPath = e.target.value;
                              let fNameArr = fPath.split("\\");
                              let fName = fNameArr[fNameArr.length - 1];
                              console.log(fName);
                              updateFormData({
                                ...formData,
                                fileName: fName,
                              });
                            }}
                            className="form-control"
                            id="File01"
                          />
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary  btn-label"
                        >
                          <i className="bx bx-check-double label-icon"></i> Send
                        </button>
                      </div>
                    </form>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  homeCare: state.homeCare,
});

const mapDispatchToProps = {
  sendMailToSupport,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
