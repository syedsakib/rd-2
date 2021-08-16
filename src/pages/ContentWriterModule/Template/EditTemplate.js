import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  InputGroup,
} from "reactstrap";
import { useForm } from "react-hook-form";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import ErrorView from "components/Common/ErrorView/ErrorView";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";
import ReactTags from "components/Common/ReactTags/ReactTags";
import EmailEditorCore from "components/Common/Editor/EmailEditor/EmailEditorCore";
import AttachBottomSection from "./attachedFiles/attachBottomSection";

//redux & actions

import {
  uploadAttachFiles,
  removeAttachedFile,
  getEmailTemplate,
} from "../../../store/Actions/mailAction";
import { editTemplate } from "../../../store/Actions/adminAction";

import LoaderComponent from "components/Common/Loader/LoaderComponent";

const EditEmailTemplate = ({
  getEmailTemplate,
  editTemplate,
  location,
  uploadAttachFiles,
  removeAttachedFile,
}) => {
  // declare states
  const history = useHistory();
  const [isLoading, setLoader] = useState(false);
  const [templateData, setTemplateData] = useState(null);
  const [templateId, setTemplateId] = useState(null);
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
    invalidCard: "Invalid Card Number",
    invalidExpiry: "Invalid expiry date",
  };

  const [formData, updateFormData] = useState({
    title: "",
    subject: "",
  });

  const { title, subject } = formData;

  useEffect(() => {
    if (location.state.data) {
      setTemplateId(location.state.data);
    }
  }, []);

  useEffect(() => {
    if (templateId) {
      getData();
    }
  }, [templateId]);

  const getData = async () => {
    try {
      let result = await getEmailTemplate(templateId);
      console.log("lgkhl..", result);
      if (result) {
        setTemplateData(result);

        updateFormData({
          ...formData,
          title: result.title,
          subject: result.subject,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async () => {
    try {
      let result = await editTemplate(
        {
          formData,
          id: templateId,
        },
        history
      );
      setLoader(false);
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="CW" breadcrumbItem="edit cms data" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  {templateData && (
                    <div className="row filter-row">
                      {isLoading ? (
                        <LoaderComponent />
                      ) : (
                        <>
                          <form onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="row">
                              <div className="col-sm-12">
                                <label htmlFor="title">
                                  Email Title{" "}
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
                                  id="title"
                                  name="title"
                                  value={title}
                                  onChange={(e) => onChange(e)}
                                  ref={register({
                                    required: {
                                      value: true,
                                      message: errorTexts["required"],
                                    },
                                  })}
                                />
                                {errors["title"] &&
                                  errors["title"].type === "required" && (
                                    <ErrorView
                                      message={errors["title"].message}
                                    />
                                  )}
                              </div>

                              <div className="col-sm-12 mt-4">
                                <label htmlFor="subject">
                                  Email Subject{" "}
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
                                  id="subject"
                                  name="subject"
                                  value={subject}
                                  onChange={(e) => onChange(e)}
                                  ref={register({
                                    required: {
                                      value: true,
                                      message: errorTexts["required"],
                                    },
                                  })}
                                />
                                {errors["subject"] &&
                                  errors["subject"].type === "required" && (
                                    <ErrorView
                                      message={errors["subject"].message}
                                    />
                                  )}
                              </div>

                              <div className="col-sm-12 mt-5">
                                <label htmlFor="content">
                                  Content{" "}
                                  <sup
                                    className="lbl-star"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </sup>
                                </label>
                                <EmailEditorCore
                                  templateId={templateId}
                                  preDesign={templateData.savedDesign}
                                  lastExportedDesign={
                                    templateData.exportedDesign
                                  }
                                />
                              </div>
                              <div className="col-sm-12 mt-4">
                                <AttachBottomSection templateId={templateId} />
                              </div>

                              <div className="text-center mt-4">
                                <Link
                                  className="btn btn-danger  btn-label btn-lg mx-2"
                                  to="/cw/templates/email"
                                >
                                  <i className="bx bx-block label-icon"></i>{" "}
                                  Cancel
                                </Link>
                                <button
                                  type="submit"
                                  className="btn btn-primary  btn-label btn-lg"
                                >
                                  <i className="bx bx-check-double label-icon"></i>{" "}
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </form>
                        </>
                      )}
                    </div>
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
});

const mapDispatchToProps = {
  getEmailTemplate,
  editTemplate,
  uploadAttachFiles,
  removeAttachedFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEmailTemplate);
