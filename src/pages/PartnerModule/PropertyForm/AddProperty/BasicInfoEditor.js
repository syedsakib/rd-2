import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-datepicker/dist/react-datepicker.css";
import { toastr } from "react-redux-toastr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

import LoaderComponent from "components/Common/Loader/LoaderComponent";
import ErrorView from "components/Common/ErrorView/ErrorView";
import SearchSelect from "components/Common/SearchSelect/SearchSelect";
import CheckBox from "components/Common/Checkbox/CheckBox";
import CustomEditor from "components/Common/Editor/Editor";

//Actions
import { updatePropertyDetail } from "../../../../store/Actions/scrapeAction";
import { getSuggestedLocationByZipCode } from "../../../../store/Actions/customerAction";

const EditBusinessProfile = ({
  getSuggestedLocationByZipCode,
  appSize,
  property,
  onChangeHandler,
}) => {
  //
  const [isLoading, toggleLoader] = useState(false);
  const [suggestedPlaceList, updatePlaceList] = useState({
    mailingZipList: [],
    locationZipList: [],
  });
  const { mailingZipList, locationZipList } = suggestedPlaceList;
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  };
  const {
    businessTitle,
    address,
    city,
    state,
    county,
    email,
    zipcode,
    phone,
    stateCode,
    mailingAddress,
    mailingZipcode,
    mailingCity,
    mailingState,
    mailingEmail,
    fax,
    licenseNumber,
    licenseExpires,
    licenseStatus,
    recentInspectionDate,
    website,
    administratorName,
    administratorPhone,
    citations,
    capacity,
    description,
    editorDescription,
    companyName,
    facilityStatus,
    facilityURL,
    licensureDate,
    medicaidId,
    medicareId,
    acceptMedicaid,
    acceptMedicare,
  } = property.basicProfile;

  useEffect(() => {
    if (property) {
      onChangeHandler({
        editorDescription: description,
      });
    }
  }, []);

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    onChangeHandler({
      [name]: value,
    });
  };

  const handleKeyWordChangeForLocationZipCode = async (value) => {
    let val = value;
    onChangeHandler({
      zipcode: value,
      city: "",
      state: "",
      stateCode: "",
    });
    if (val && val.trim() !== "") {
      let result = await getSuggestedLocationByZipCode(val);
      if (result) {
        let optionList = result.map((item) => ({
          label: `${item.zip} ${item.city}, ${item.state_name}`,
          value: item,
        }));
        updatePlaceList({
          ...suggestedPlaceList,
          locationZipList: optionList,
        });
      }
    }
  };

  const handleKeyWordChangeForMailingZipCode = async (value) => {
    let val = value;
    onChangeHandler({
      mailingZipcode: value,
      mailingCity: "",
      mailingState: "",
    });
    if (val && val.trim() !== "") {
      let result = await getSuggestedLocationByZipCode(val);
      if (result) {
        let optionList = result.map((item) => ({
          label: `${item.zip} ${item.city}, ${item.state_name}`,
          value: item,
        }));
        updatePlaceList({
          ...suggestedPlaceList,
          mailingZipList: optionList,
        });
      }
    }
  };

  const onLocationSelectHandler = (value) => {
    if (value) {
      const { state_name, city, zip, state_id } = value;
      onChangeHandler({
        zipcode: zip,
        city,
        state: state_name,
        stateCode: state_id,
      });
    }
  };

  const onMailZipSelectHandler = (value) => {
    if (value) {
      const { state_name, city, zip } = value;
      onChangeHandler({
        mailingZipcode: zip,
        mailingCity: city,
        mailingState: state_name,
      });
    }
  };

  const onContentChangeHandler = (newContent) => {
    onChangeHandler({
      description: newContent,
    });
  };

  return (
    <React.Fragment>
      <div>
        <div style={{ textAlign: "center" }}>
          <h5 style={{ color: "red" }}>
            Note: You need to update to save changes
          </h5>
        </div>
        <div className="mt-4">
          {isLoading ? (
            <LoaderComponent />
          ) : (
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="lastName">
                      Business Title{" "}
                      <sup className="lbl-star" style={{ color: "red" }}>
                        *
                      </sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="businessTitle"
                      placeholder="Enter Business Name"
                      name="businessTitle"
                      value={businessTitle}
                      onChange={(e) => onChange(e)}
                      ref={register({
                        required: {
                          value: true,
                          message: errorTexts["required"],
                        },
                      })}
                    />
                    {errors["businessTitle"] &&
                      errors["businessTitle"].type === "required" && (
                        <ErrorView message={errors["businessTitle"].message} />
                      )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="lastName">
                      Email{" "}
                      <sup className="lbl-star" style={{ color: "red" }}>
                        *
                      </sup>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      ref={register({
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors["email"] && errors["email"].type === "pattern" && (
                      <ErrorView message={errors["email"].message} />
                    )}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="lastName">
                      Address{" "}
                      <sup className="lbl-star" style={{ color: "red" }}>
                        *
                      </sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter address"
                      name="address"
                      value={address}
                      onChange={(e) => onChange(e)}
                      ref={register({
                        required: {
                          value: true,
                          message: errorTexts["required"],
                        },
                      })}
                    />
                    {errors["address"] &&
                      errors["address"].type === "required" && (
                        <ErrorView message={errors["address"].message} />
                      )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <SearchSelect
                      onChange={handleKeyWordChangeForLocationZipCode}
                      options={locationZipList}
                      onSelect={onLocationSelectHandler}
                      labelName="Zip Code"
                      required={true}
                      numberMode={true}
                      name="zipcode"
                      id="zipcode"
                      inputClassName={"form-control"}
                      placeHolder={"Enter ZipCode"}
                      value={zipcode}
                      ref={register({
                        required: {
                          value: true,
                          message: errorTexts["required"],
                        },
                      })}
                      top={0}
                    />
                    {errors["zipcode"] &&
                      errors["zipcode"].type === "required" && (
                        <ErrorView message={errors["zipcode"].message} />
                      )}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="lastName">
                      City{" "}
                      <sup className="lbl-star" style={{ color: "red" }}>
                        *
                      </sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Enter City"
                      name="city"
                      value={city}
                      onChange={(e) => onChange(e)}
                      ref={register({
                        required: {
                          value: true,
                          message: errorTexts["required"],
                        },
                      })}
                    />
                    {errors["city"] && errors["city"].type === "required" && (
                      <ErrorView message={errors["city"].message} />
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="lastName">
                      State{" "}
                      <sup className="lbl-star" style={{ color: "red" }}>
                        *
                      </sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="Enter State"
                      name="state"
                      value={state}
                      onChange={(e) => onChange(e)}
                      ref={register({
                        required: {
                          value: true,
                          message: errorTexts["required"],
                        },
                      })}
                    />
                    {errors["state"] && errors["state"].type === "required" && (
                      <ErrorView message={errors["state"].message} />
                    )}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="phone">
                      Phone Number{" "}
                      <sup className="lbl-star" style={{ color: "red" }}>
                        *
                      </sup>
                    </label>
                    <PhoneInput
                      displayInitialValueAsLocalNumber={true}
                      className="form-control"
                      placeholder="Enter phone number"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => {
                        onChange({
                          target: {
                            id: "phone",
                            name: "phone",
                            value: e,
                          },
                        });
                      }}
                      maxLength={16}
                      country="us"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="lastName">
                      Fax
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fax"
                      placeholder="Enter Fax"
                      name="fax"
                      value={fax}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div div className="row mt-4">
                <div className="col-md-4">
                  <label htmlFor="licenseNumber">License Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="licenseNumber"
                    placeholder="Enter License Number"
                    name="licenseNumber"
                    value={licenseNumber}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="licenseStatus">License Status</label>
                  <select
                    className="form-select form-control select-control"
                    value={licenseStatus}
                    onChange={(e) => onChange(e)}
                    name="licenseStatus"
                  >
                    <option value="#">Select Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                <div className="col-md-4">
                  {" "}
                  <label htmlFor="licenseExpires">License Expires</label>
                  <div className="date-picker-wrapper">
                    <DatePicker
                      selected={licenseExpires}
                      onChange={(date) => {
                        onChangeHandler({
                          licenseExpires: date,
                        });
                      }}
                      placeholder="License Expires On"
                      className="form-control"
                      id="licenseExpires"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="phone">
                      Website
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="website"
                      placeholder="Enter Website Link"
                      name="website"
                      value={website}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="lastName">
                      Recent Inspection Date
                    </label>
                    <DatePicker
                      selected={licenseExpires}
                      onChange={(date) => {
                        onChangeHandler({
                          recentInspectionDate: date,
                        });
                      }}
                      placeholder="Recent Inspection Date"
                      className="form-control"
                      id="recentInspectionDate"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="phone">
                      Company
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="companyName"
                      name="companyName"
                      placeholder="Enter parent company"
                      value={companyName}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="lastName">
                      Capacity
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="capacity"
                      name="capacity"
                      placeholder="Enter Capacity"
                      value={capacity}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="administratorName">
                      Administrator Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="administratorName"
                      name="administratorName"
                      placeholder="Enter Administrator Name"
                      value={administratorName}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="lastName">
                      Administrator Phone
                    </label>
                    <PhoneInput
                      displayInitialValueAsLocalNumber={true}
                      className="form-control"
                      placeholder="Enter Administrator Phone Number"
                      id="administratorPhone"
                      name="administratorPhone"
                      value={administratorPhone}
                      onChange={(e) => {
                        onChange({
                          target: {
                            id: "administratorPhone",
                            name: "administratorPhone",
                            value: e,
                          },
                        });
                      }}
                      maxLength={14}
                      country="us"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="county">
                      County
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="county"
                      placeholder="Enter county"
                      name="county"
                      value={county}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="lastName">
                      Mailing Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mailingAddress"
                      placeholder="Enter Mailing Address"
                      name="mailingAddress"
                      value={mailingAddress}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <SearchSelect
                      onChange={handleKeyWordChangeForMailingZipCode}
                      options={mailingZipList}
                      onSelect={onMailZipSelectHandler}
                      numberMode={true}
                      labelName="Mailing Zip Code"
                      name="mailingZipcode"
                      id="mailingZipcode"
                      inputClassName={"form-control"}
                      placeHolder={"Enter Mailing Zip Code"}
                      value={mailingZipcode}
                      top={0}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="lastName">
                      Mailing City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mailingCity"
                      placeholder="Enter Mailing City"
                      name="mailingCity"
                      value={mailingCity}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="mailingState">
                      Mailing State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mailingState"
                      placeholder="Enter Mailing State"
                      name="mailingState"
                      value={mailingState}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="mailingEmail">
                      Mailing Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mailingEmail"
                      placeholder="Enter Mailing Email"
                      name="mailingEmail"
                      value={mailingEmail}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="facilityStatus">
                      Facility Status
                    </label>
                    <select
                      className="form-select form-control select-control"
                      value={facilityStatus}
                      onChange={(e) => onChange(e)}
                      name="facilityStatus"
                    >
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="facilityURL">
                      Facility URL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="facilityURL"
                      name="facilityURL"
                      value={facilityURL}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="medicaidId">
                      Medicaid ID
                    </label>
                    <div className="d-flex flex-row">
                      <div className="">
                        <CheckBox
                          onChange={() => {
                            onChangeHandler({
                              acceptMedicaid: !acceptMedicaid,
                            });
                          }}
                          isChecked={acceptMedicaid}
                        />
                      </div>
                      <div
                        className="px-2"
                        style={{ width: "-webkit-fill-available" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="medicaidId"
                          name="medicaidId"
                          value={medicaidId}
                          onChange={(e) => onChange(e)}
                          disabled={!acceptMedicaid}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="medicareId">
                      Medicare ID
                    </label>
                    <div className="d-flex flex-row">
                      <div className="">
                        <CheckBox
                          onChange={() => {
                            onChangeHandler({
                              acceptMedicare: !acceptMedicare,
                            });
                          }}
                          isChecked={acceptMedicare}
                        />
                      </div>
                      <div
                        className="px-2"
                        style={{ width: "-webkit-fill-available" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="medicareId"
                          name="medicareId"
                          value={medicareId}
                          onChange={(e) => onChange(e)}
                          disabled={!acceptMedicare}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <CustomEditor
                      onChange={onContentChangeHandler}
                      value={editorDescription}
                    />{" "}
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
});

const mapDispatchToProps = {
  getSuggestedLocationByZipCode,
  updatePropertyDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBusinessProfile);
