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

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";
import ErrorView from "components/Common/ErrorView/ErrorView";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";
import { useForm } from "react-hook-form";
import ReactTags from "components/Common/ReactTags/ReactTags";
import TinyMCEEditor from "components/Common/Editor/TinyMCEEDitor";

//redux & actions
import { editCMS, getEditCMSData } from "../../../../store/Actions/adminAction";
import { getCategorytype } from "../../../../store/Actions/userAction";

import LoaderComponent from "components/Common/Loader/LoaderComponent";

const EditMetaCms = ({ getEditCMSData, editCMS }) => {
  // declare states
  const history = useHistory();
  const [appState, updateAppState] = useState({
    isLoading: false,
  });
  const [formData, updateFormData] = useState({
    title: "",
    metaDesc: "",
    altText: "",
    metaKeyword: "",
    metaTitle: "",
    subject: "",
  });
  const [editorContent, updateEditorContent] = useState({
    content: "",
    initialContent: "",
  });
  const [imageContent, updateImageContent] = useState({
    coverImage: "",
    coverImageData: "",
  });
  const [articleId, updateArticleId] = useState(null);
  const { isLoading } = appState;
  const { content, initialContent } = editorContent;
  const { coverImage, coverImageData } = imageContent;
  const { title, metaDesc, altText, metaKeyword, metaTitle, subject } =
    formData;
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
  };

  useEffect(() => {
    getArticleData();
  }, []);

  const getArticleData = async () => {
    try {
      let articleId = history.location.state.data;
      updateArticleId(articleId);
      let articleData = await getEditCMSData(articleId);
      console.log("cmsData", articleData);
      if (articleData) {
        updateFormData({
          ...formData,
          title: articleData.pageName,
          metaDesc: articleData.metaDesc,
          altText: articleData.altText,
          metaKeyword: articleData.metaKeyword,
          metaTitle: articleData.metaTitle,
          subject: articleData.pageSubject,
        });
        updateImageContent({
          ...imageContent,
          coverImageData: articleData.coverImage,
        });
        updateEditorContent({
          ...editorContent,
          initialContent: articleData.pageContent,
          content: articleData.pageContent,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleLoader = (value) => {
    updateAppState({
      ...appState,
      isLoading: value,
    });
  };

  const onFormSubmit = async (e) => {
    try {
      if (!articleId) {
        throw "No article Id found";
      }

      const postData = {
        title,
        metaDesc,
        altText,
        metaKeyword,
        metaTitle,
        subject,
      };
      toggleLoader(true);
      let result = await editCMS({
        formData: postData,
        content,
        imageData: coverImage,
        id: articleId,
      });
      toggleLoader(false);
      if (result) {
        setTimeout(() => {
          history.push("/cw/cms/meta");
        }, 1000);
      }
    } catch (e) {
      toggleLoader(false);
      toastr.error(e.toString());
    }
  };

  const onChangeCoverPic = async (file) => {
    try {
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        let base64File = URL.createObjectURL(file);
        updateImageContent({
          coverImage: file,
          coverImageData: base64File,
        });
      } else {
        throw "Please drag image only!";
      }
    } catch (e) {
      toastr.error(e.toString());
    }
  };

  const clearForm = () => {
    updateFormData({
      title: "",
      category: "0",
      writer: "0",
      metaDesc: "",
      altText: "",
      metaTitle: "",
      metaKeyword: "",
    });
  };

  const onChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onContentChangeHandler = (newContent) => {
    updateEditorContent({
      ...editorContent,
      content: newContent,
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
          <Breadcrumb title="CW" breadcrumbItem="edit cms data" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                      <div className="row">
                        <div className="col-sm-12">
                          <label className="">
                            H1 Tag{" "}
                            <sup className="lbl-star" style={{ color: "red" }}>
                              *
                            </sup>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            id="title"
                            onChange={(e) => onChange(e)}
                            value={title}
                            ref={register({
                              required: {
                                value: true,
                                message: errorTexts["required"],
                              },
                            })}
                          />
                          {errors["title"] &&
                            errors["title"].type === "required" && (
                              <ErrorView message={errors["title"].message} />
                            )}
                        </div>
                        <div className="col-sm-12 mt-3">
                          <label className="">Meta Description</label>
                          <input
                            value={metaDesc}
                            type="text"
                            className="form-control"
                            name="metaDesc"
                            id="metaDesc"
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="col-sm-12 mt-3">
                          <label className="">Alt Text</label>
                          <input
                            type="text"
                            className="form-control"
                            name="altText"
                            id="altText"
                            onChange={(e) => onChange(e)}
                            value={altText}
                          />
                        </div>
                        <div className="col-sm-12 mt-3">
                          <label className="">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            name="metaTitle"
                            id="metaTitle"
                            onChange={(e) => onChange(e)}
                            value={metaTitle}
                          />
                        </div>

                        <div className="col-sm-12 mt-3">
                          <label className="">Meta KeyWords</label>
                          <input
                            type="text"
                            className="form-control"
                            name="metaKeyword"
                            id="metaKeyword"
                            onChange={(e) => onChange(e)}
                            value={metaKeyword}
                          />
                        </div>

                        <div className="row mt-5">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="pro-lbl-1">Upload Image </label>
                              <div className="row">
                                <div className="col-sm-6">
                                  <StyledDropZone
                                    onDrop={(file) => onChangeCoverPic(file)}
                                  />
                                </div>
                                <div className="col-sm-6">
                                  {coverImageData && coverImageData !== "" ? (
                                    <div>
                                      <figure className="upload-img-outer">
                                        <img
                                          className="rounded ms-2"
                                          alt="cover image"
                                          width="200"
                                          height="115"
                                          src={coverImageData}
                                        />
                                      </figure>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-5">
                          <div className="col-sm-12">
                            <label className="">
                              Content{" "}
                              <sup
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                *
                              </sup>
                            </label>
                            <div className="col-sm-12">
                              {initialContent && (
                                <TinyMCEEditor
                                  onChange={onContentChangeHandler}
                                  value={initialContent}
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-center mt-4">
                          <Link
                            className="btn btn-danger  btn-label btn-lg mx-2"
                            to="/cw/cms/meta"
                          >
                            <i className="bx bx-block label-icon"></i> Cancel
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
                  </div>
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
  getEditCMSData,
  editCMS,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMetaCms);
