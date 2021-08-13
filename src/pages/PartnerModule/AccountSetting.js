import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, CardBody, Media } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { toastr } from "react-redux-toastr";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import avatar from "../../assets/images/users/avatar-1.jpg";

import ErrorView from "components/Common/ErrorView/ErrorView";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { addCode } from "../../store/utils/util";
import SearchSelect from "components/Common/SearchSelect/SearchSelect";

//redux & actions
import { getSuggestedLocationByZipCode } from "../../store/Actions/customerAction";
import {
  updateProfileData,
  updateProfilePicture,
} from "../../store/Actions/authAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AccountSetting = ({
  getSuggestedLocationByZipCode,
  userDetails,
  updateProfileData,
  updateProfilePicture,
}) => {
  const history = useHistory();
  const [isLoading, toggleLoader] = useState(false);
  const [suggestedPlaceList, updatePlaceList] = useState([]);
  const [profilePic, setProfilePic] = useState(
    "https://cdn-boomershub.s3.amazonaws.com/web/defaultUser.jpg"
  );
  const [modalState, updateModalState] = useState({
    modalName: "",
    modalData: null,
  });
  const [formData, updateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    zipcode: "",
    city: "",
    state: "",
    address: "",
  });

  // extract form data
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    zipcode,
    city,
    state,
    address,
  } = formData;

  const { modalName, modalData } = modalState;

  const [formErrors, toggleFormError] = useState({
    phoneNumberError: false,
  });
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  };

  // app functions
  useEffect(() => {
    if (userDetails) {
      updateFormData({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        zipcode: userDetails.zipcode,
        city: userDetails.city,
        state: userDetails.state,
        address: userDetails.address,
      });
      if (userDetails.image) {
        setProfilePic(userDetails.image);
      }
    }
  }, [userDetails]);

  const onFormSubmit = async () => {
    try {
      console.log("hell9o");
      toggleLoader(true);
      let pNumber = addCode(phoneNumber);
      if (!isPossiblePhoneNumber(pNumber)) {
        throw "Please enter a valid phone number";
      }
      const result = await updateProfileData({
        firstName,
        lastName,
        address,
        city,
        state,
        zipcode,
        phoneNumber: pNumber,
      });
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
      toastr.error("Error", e.toString());
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

  const handleKeyWordChange = async (value) => {
    let val = value;
    toggleFormError({ ...formErrors, phoneNumberError: false });
    //reset city and state
    updateFormData({
      ...formData,
      zipcode: val,
      state: "",
      city: "",
    });
    if (val && val.trim() !== "") {
      let result = await getSuggestedLocationByZipCode(val);
      if (result) {
        let optionList = result.map((item) => ({
          label: `${item.zip} ${item.city} , ${item.state_name}`,
          value: item,
        }));
        updatePlaceList(optionList);
      }
    }
  };

  const onSelectHandler = (value) => {
    if (value) {
      const { state_name, city, zip } = value;
      updateFormData({
        ...formData,
        state: state_name,
        city: city,
        zipcode: zip,
      });
    }
  };

  const onProfilePicChange = async (e) => {
    try {
      toggleLoader(true);
      let file = e.target.files[0];
      let id = userDetails.id;
      let result = await updateProfilePicture(file, id);
      console.log(result);
      if (result) {
        setProfilePic(result);
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
      toastr.error(e.toString());
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
          <Breadcrumb title="Admin" breadcrumbItem="account" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Media>
                    <div className="ms-3">
                      <form>
                        <label htmlFor="fileToUpload">
                          <img
                            src={profilePic}
                            alt={`profile-pic`}
                            className="avatar-md rounded-circle img-thumbnail profile-pic"
                          />
                          <span className="glyphicon glyphicon-camera"></span>

                          <div style={{ position: "relative" }}>
                            <span
                              className="icon-photo glyphicon glyphicon-camera"
                              // style=""
                            >
                              <i className="bx bx-camera"></i>
                            </span>
                          </div>
                        </label>
                        <input
                          type="File"
                          name="fileToUpload"
                          id="fileToUpload"
                          onChange={onProfilePicChange}
                          display="none"
                        />
                      </form>
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

          <h4 className="card-title mb-4">Change User Data</h4>

          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-12">
                  {isLoading ? (
                    <LoaderComponent />
                  ) : (
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="pro-lbl-1" htmlFor="firstName">
                              First Name{" "}
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
                              id="firstName"
                              name="firstName"
                              value={firstName}
                              onChange={(e) => onChange(e)}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["firstName"] &&
                              errors["firstName"].type === "required" && (
                                <ErrorView
                                  message={errors["firstName"].message}
                                />
                              )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="pro-lbl-1" htmlFor="lastName">
                              Last Name{" "}
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
                              id="lastName"
                              name="lastName"
                              value={lastName}
                              onChange={(e) => onChange(e)}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["lastName"] &&
                              errors["lastName"].type === "required" && (
                                <ErrorView
                                  message={errors["lastName"].message}
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
                              type="text"
                              className="form-control"
                              id="email"
                              name="email"
                              value={email}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group phone-input-custom">
                            <label className="pro-lbl-1" htmlFor="phoneNumber">
                              Phone Number{" "}
                            </label>
                            <PhoneInput
                              country={"us"}
                              value={phoneNumber}
                              className="form-control"
                              disableDropdown={true}
                              onlyCountries={["us"]}
                              id="phoneNumber"
                              name="phoneNumber"
                              disableCountryCode={true}
                              onChange={(phone) => {
                                let val = phone;
                                updateFormData({
                                  ...formData,
                                  phoneNumber: val,
                                });
                              }}
                              style={{ width: "100%" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        {userDetails && userDetails.twilioNumber && (
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                className="pro-lbl-1"
                                htmlFor="agentNumber"
                              >
                                Agent Number{" "}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="agentNumber"
                                name="agentNumber"
                                value={userDetails.twilioNumber}
                                disabled={true}
                              />
                            </div>
                          </div>
                        )}
                        <div className="col-md-6">
                          {userDetails && userDetails.corporateTitle && (
                            <div className="form-group">
                              <label
                                className="pro-lbl-1"
                                htmlFor="corporateTitle"
                              >
                                Corporate
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="corporateTitle"
                                name="corporateTitle"
                                value={userDetails.corporateTitle}
                                disabled={true}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="pro-lbl-1" htmlFor="zipcode">
                              Zip Code
                            </label>
                            <SearchSelect
                              onChange={handleKeyWordChange}
                              options={suggestedPlaceList}
                              onSelect={onSelectHandler}
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

                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary  btn-label"
                        >
                          <i className="bx bx-check-double label-icon"></i> Save
                          Changes
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
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
  updateProfileData,
  updateProfilePicture,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);
