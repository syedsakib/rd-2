import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import ErrorView from "components/Common/ErrorView/ErrorView";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";
import { useForm } from "react-hook-form";

//redux & actions
import { addWriter } from "../../../store/Actions/adminAction";
import { getCategorytype } from "../../../store/Actions/userAction";

import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AddWriter = ({ addWriter }) => {
  // declare states
  const history = useHistory();
  const [appState, updateAppState] = useState({
    isLoading: false,
  });
  const [formData, updateFormData] = useState({
    name: "",
    bio: "",
    websiteLink: "",
    designation: "",
  });
  const [imageContent, updateImageContent] = useState({
    coverImage: "",
    coverImageData: "",
  });
  const { isLoading } = appState;
  const { coverImage, coverImageData } = imageContent;
  const { name, bio, websiteLink, designation } = formData;
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
      const postData = {
        name,
        bio,
        websiteLink,
        designation,
      };
      toggleLoader(true);

      let result = await addWriter({
        formData: postData,
        imageData: coverImage,
      });
      toggleLoader(false);
      if (result) {
        setTimeout(() => {
          history.push("/cw/writer");
        }, 1000);
        console.log(result);
      }
    } catch (e) {
      toggleLoader(false);
      toastr.error("Error", e.toString());
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
      toastr.error("Error", e.toString());
    }
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
          <Breadcrumb title="CW" breadcrumbItem="add new writer" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="col-md-12 text-end">
                    <div className="db-btn-group">
                      <Link
                        to="/cw/writer"
                        title="Add Contact"
                        color="info"
                        className="btn btn-info btn-label"
                      >
                        <i className="bx bx-plus-circle label-icon"></i>
                        View Writer List
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    {isLoading ? (
                      <LoaderComponent />
                    ) : (
                      <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="row">
                          <div className="col-sm-12">
                            <label className="">
                              Name{" "}
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
                              name="name"
                              id="name"
                              onChange={(e) => onChange(e)}
                              value={name}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["name"] &&
                              errors["name"].type === "required" && (
                                <ErrorView message={errors["name"].message} />
                              )}
                          </div>
                          <div className="col-sm-12 mt-3">
                            <label className="">
                              Designation{" "}
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
                              name="designation"
                              id="designation"
                              onChange={(e) => onChange(e)}
                              value={designation}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["designation"] &&
                              errors["designation"].type === "required" && (
                                <ErrorView
                                  message={errors["designation"].message}
                                />
                              )}
                          </div>

                          <div className="col-sm-12 mt-3">
                            <label className="">
                              Bio{" "}
                              <sup
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                *
                              </sup>
                            </label>
                            <input
                              value={bio}
                              type="text"
                              className="form-control"
                              name="bio"
                              id="bio"
                              onChange={(e) => onChange(e)}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["bio"] &&
                              errors["bio"].type === "required" && (
                                <ErrorView message={errors["bio"].message} />
                              )}
                          </div>
                          <div className="col-sm-12 mt-3">
                            <label className="">
                              Website Link{" "}
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
                              name="websiteLink"
                              id="websiteLink"
                              onChange={(e) => onChange(e)}
                              value={websiteLink}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["websiteLink"] &&
                              errors["websiteLink"].type === "required" && (
                                <ErrorView
                                  message={errors["websiteLink"].message}
                                />
                              )}
                          </div>

                          <div className="row mt-5">
                            <div className="col-sm-12">
                              <div className="form-group">
                                <label className="pro-lbl-1">
                                  Profile Image{" "}
                                </label>
                                <div className="row">
                                  <div className="col-sm-8">
                                    <StyledDropZone
                                      onDrop={(file) => onChangeCoverPic(file)}
                                    />
                                  </div>
                                  <div className="col-sm-4">
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

                          <div className="text-center mt-5">
                            <Link
                              className="btn btn-danger  btn-label btn-lg mx-2"
                              to="/cw/writer"
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
                    )}
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
  addWriter,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWriter);
