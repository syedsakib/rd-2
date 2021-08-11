import MetaTags from "react-meta-tags";
import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Link, useHistory } from "react-router-dom";
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
} from "reactstrap";

//Import Breadcrumb
import { useForm } from "react-hook-form";
import { isPossiblePhoneNumber } from "react-phone-number-input";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";

import ErrorView from "components/Common/ErrorView/ErrorView";
import ReactTags from "components/Common/ReactTags/ReactTags";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SearchSelect from "components/Common/SearchSelect/SearchSelect";

//redux & actions
import { useSelector, useDispatch } from "react-redux";
import {
  getRoleTypeList,
  addInternalUser,
} from "../../../../store/Actions/roleAction";
import { getSuggestedLocationByZipCode } from "../../../../store/Actions/customerAction";
import {
  editCorporate,
  getCorporateDetail,
} from "../../../../store/Actions/corporateAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const EditCorporateForm = ({ match: { params } }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  };

  // declare state
  const history = useHistory();
  const [isLoading, toggleLoader] = useState(false);
  const [corporateDetail, updateCorporateDetail] = useState(null);
  const [suggestedPlaceList, updatePlaceList] = useState([]);
  const [formData, updateFormData] = useState({
    title: "",
    description: "",
    email: "",
    phoneNumber: "",
    state: "",
    city: "",
    zipcode: "",
    location: "",
    address: "",
    corporateType: "",
  });
  const dispatch = useDispatch();

  // destructure states
  const {
    title,
    description,
    email,
    phoneNumber,
    state,
    city,
    zipcode,
    address,
    location,
    corporateType,
  } = formData;

  // app functions
  useEffect(() => {
    if (params && params.id) {
      getDataHandler(params.id);
    }
  }, []);

  useEffect(() => {
    if (corporateDetail) {
      updateFormHandler({
        title: corporateDetail.title,
        description: corporateDetail.description || "",
        email: corporateDetail.email,
        phoneNumber: corporateDetail.phoneNumber,
        state: corporateDetail.state || "",
        city: corporateDetail.city || "",
        zipcode: corporateDetail.zipcode || "",
        address: corporateDetail.address || "",
        corporateType: corporateDetail.corporate_type,
      });
    }
  }, [corporateDetail]);

  const getDataHandler = async (id) => {
    try {
      const result = await dispatch(getCorporateDetail({ corporateId: id }));
      console.log(`Corporate Data`, result);
      if (result) {
        updateCorporateDetail(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateFormHandler = (newData) => {
    updateFormData({
      ...formData,
      ...newData,
    });
  };
  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    updateFormHandler({ [name]: value });
  };

  const onPlaceChange = (city, state, zipcode) => {
    updateFormHandler({
      state,
      city,
      zipcode,
    });
  };

  const handleKeyWordChangeForLocationZipCode = async (value) => {
    let val = value;
    onPlaceChange("", "", value);
    if (val && val.trim() !== "") {
      let result = await dispatch(getSuggestedLocationByZipCode(val));
      if (result) {
        let optionList = result.map((item) => ({
          label: `${item.zip} ${item.city}, ${item.state_name}`,
          value: item,
        }));
        updatePlaceList(optionList);
      }
    }
  };

  const onLocationSelectHandler = (value) => {
    if (value) {
      const { state_name, city, zip, state_id } = value;
      onPlaceChange(city, state_name, zip);
    }
  };

  const onSubmitHandler = async () => {
    try {
      console.log(`FormData`, formData);
      if (!params || !params.id) {
        throw "No Corporate Id Found";
      }
      if (isLoading) {
        throw "A process is in progress. Please wait";
      }
      toggleLoader(true);
      let result = await dispatch(
        editCorporate({
          title,
          description,
          email,
          phoneNumber,
          state,
          city,
          zipcode,
          address,
          id: params.id,
        })
      );
      if (result) {
        history.push("/admin/corporate");
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
      toastr.error("Error", e.toString());
    }
  };

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Admin" breadcrumbItem="add new corporate" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">
                      Edit <strong>{`${corporateDetail?.title}'s `}</strong>{" "}
                      Details
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
                                Corporate Type{" "}
                                <sup
                                  className="lbl-star"
                                  style={{ color: "red" }}
                                >
                                  *
                                </sup>
                              </label>
                              <select
                                className="form-control"
                                value={corporateType}
                                name={"corporateType"}
                                id={"corporateType"}
                                onChange={onChange}
                                disabled={true}
                              >
                                <option value="#" disabled>
                                  Select a Type
                                </option>
                                <option value={"adviser"}>Adviser</option>
                                <option value={"partner"}>Partner</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="pro-lbl-1" htmlFor="title">
                                Title{" "}
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
                                onChange={onChange}
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
                                onChange={(value) => {
                                  updateFormHandler({ phoneNumber: value });
                                }}
                                style={{ width: "100%" }}
                              />
                              {errors["phoneNumber"] &&
                                errors["phoneNumber"].type === "required" && (
                                  <ErrorView
                                    message={errors["phoneNumber"].message}
                                  />
                                )}
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
                                onChange={(e) => onChange(e)}
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
                                onChange={(e) => onChange(e)}
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
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label
                                className="pro-lbl-1"
                                htmlFor="description"
                              >
                                Description
                              </label>
                              <Input
                                type="textarea"
                                className="form-control"
                                id="description"
                                name="description"
                                rows="5"
                                value={description}
                                onChange={onChange}
                              />
                            </div>
                          </div>
                        </div>

                        {/* //submit button// */}
                        <div className="text-center mt-4">
                          <button
                            type="submit"
                            className="btn btn-primary  btn-label"
                          >
                            <i className="bx bx-check-double label-icon"></i>{" "}
                            Save Changes
                          </button>
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
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
});

const mapDispatchToProps = {
  getSuggestedLocationByZipCode,
  getRoleTypeList,
  addInternalUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCorporateForm);
