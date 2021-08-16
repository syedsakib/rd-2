import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { toastr } from "react-redux-toastr";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  InputGroup,
  Button,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";

//redux & actions
import {
  getEmailTemplateList,
  sendMailBySalesToAdviser,
} from "../../../store/Actions/salesAction";

import LoaderComponent from "components/Common/Loader/LoaderComponent";
import ErrorView from "components/Common/ErrorView/ErrorView";
import ButtonComp from "components/Common/Button/Button";
import EmailEditorCore from "components/Common/Editor/EmailEditor/EmailEditorCore";

const SendMail = ({ getEmailTemplateList, sendMailBySalesToAdviser }) => {
  // declare state
  const [formData, updateFormData] = useState({
    email: "",
    subject: "",
  });
  const [isLoading, setLoader] = useState(false);
  const [templateList, updateTemplateList] = useState({
    rows: [],
    count: 0,
  });
  const [selectedTemplate, updateSelectedTemplate] = useState(null);
  const [editorContent, updateEditorContent] = useState({
    content: "",
    initialContent: "",
  });
  const { rows, count } = templateList;
  const { content, initialContent } = editorContent;
  const { email, subject } = formData;

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  };

  useEffect(() => {
    getEmailTemplateListHandler();
  }, []);

  // app functions
  const getEmailTemplateListHandler = async () => {
    try {
      let result = await getEmailTemplateList();
      console.log(`Email List `, result);
      if (result) {
        updateTemplateList({
          rows: result.rows,
          count: result.count,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateFormDataHandler = (newData) => {
    updateFormData({
      ...formData,
      ...newData,
    });
  };

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    updateFormDataHandler({
      [name]: value,
    });
  };

  const onFormSubmit = async () => {
    try {
      if (!content || content === "") {
        throw "Content is required";
      }
      setLoader(true);
      let result = await sendMailBySalesToAdviser({
        emailList: email,
        subject,
        content,
        templateId: selectedTemplate.id,
        sendTo: "adviser",
      });
      setLoader(false);
      if (result) {
        //clearForm();
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
      toastr.error("Error", e.toString());
    }
  };

  const clearForm = () => {
    updateEditorContent({
      initialContent: "",
      content: "",
    });
    updateFormDataHandler({
      email: "",
      subject: "",
    });
  };

  const onContentChangeHandler = (newContent) => {
    updateEditorContent({
      ...editorContent,
      content: newContent,
    });
  };

  const onTemplateChangeHandler = (e) => {
    try {
      const templateId = e.target.value;
      if (templateId !== "#") {
        let result = rows.filter((item) => item.id == templateId);
        if (result[0]) {
          let template = result[0];
          console.log(`Selected Template `, template);
          updateSelectedTemplate(template);
          updateFormDataHandler({
            subject: template.subject,
          });
          updateEditorContent({
            content: template.content,
            initialContent: template.content,
          });
        }
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const exportCallBackHandler = (tId, newDesign) => {
    try {
      let newRows = [...rows];
      let template = newRows.filter((item) => item.id == tId);
      if (template[0]) {
        template[0].exportedDesign = newDesign;
        template[0].savedDesign = newDesign;
        updateTemplateList({
          rows: newRows,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveCallBackHandler = (tId, newDesign) => {
    try {
      let newRows = [...rows];
      let template = newRows.filter((item) => item.id == tId);
      if (template[0]) {
        template[0].savedDesign = newDesign;
        updateTemplateList({
          rows: newRows,
        });
      }
    } catch (e) {
      console.log(e);
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
          <Breadcrumb title="sales" breadcrumbItem="send mail" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row"></div>

                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6"></div>
                      <div className="col-sm-6 text-end"></div>
                    </div>
                  </div>

                  {isLoading ? (
                    <LoaderComponent />
                  ) : (
                    <>
                      <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="pro-lbl-1" htmlFor="email">
                                Template{" "}
                                <sup
                                  className="lbl-star"
                                  style={{ color: "red" }}
                                >
                                  *
                                </sup>
                              </label>
                              <select
                                className="form-control selector-input form-select"
                                value={
                                  selectedTemplate ? selectedTemplate.id : "#"
                                }
                                name="templates"
                                onChange={onTemplateChangeHandler}
                              >
                                <option value="#">Select Type</option>
                                {rows &&
                                  rows.map((item, index) => {
                                    return (
                                      <option
                                        value={item.id}
                                        key={`template-${item.id}`}
                                      >
                                        {item.title}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-sm-12">
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
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Ex. mail1@a.com, mail2@b.com, mail3@b.com"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
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
                        <div className="row mt-4">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="pro-lbl-1" htmlFor="subject">
                                Subject{" "}
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
                                placeholder="Enter Subject"
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
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-sm-12">
                            <label htmlFor="routingNumber">
                              Content <sup style={{ color: "red" }}>*</sup>
                            </label>
                            <EmailEditorCore
                              templateId={
                                selectedTemplate ? selectedTemplate.id : null
                              }
                              preDesign={
                                selectedTemplate
                                  ? JSON.parse(selectedTemplate.savedDesign)
                                  : null
                              }
                              lastExportedDesign={
                                selectedTemplate
                                  ? JSON.parse(selectedTemplate.exportedDesign)
                                  : null
                              }
                              exportCallBack={exportCallBackHandler}
                              saveCallBack={saveCallBackHandler}
                            />
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <button
                            type="submit"
                            className="btn btn-primary  btn-label"
                          >
                            <i className="bx bx-check-double label-icon"></i>{" "}
                            Send Mail
                          </button>
                        </div>
                      </form>
                    </>
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
  appSize: state.global.appSize,
});

const mapDispatchToProps = {
  getEmailTemplateList,
  sendMailBySalesToAdviser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMail);
