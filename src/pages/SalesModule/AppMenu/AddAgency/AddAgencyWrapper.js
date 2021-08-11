import MetaTags from "react-meta-tags";
import "./customData.scss";
import React, { useState, useEffect, useRef } from "react";
import { toastr } from "react-redux-toastr";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";

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
  Input,
} from "reactstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";

//redux & actions
import {
  updateProgressForm,
  getHomeCareServiceCategory,
} from "../../../../store/Actions/homeCareAction";
import { addNewAgency } from "../../../../store/Actions/salesAction";
import {
  getSuggestedCities,
  getSuggestedLocationByZipCode,
} from "../../../../store/Actions/customerAction";

import LoaderComponent from "components/Common/Loader/LoaderComponent";
import ButtonComp from "components/Common/Button/Button";
import ErrorView from "components/Common/ErrorView/ErrorView";
import { formatPhoneNumber } from "react-phone-number-input";
import SearchSelect from "components/Common/SearchSelect/SearchSelect";
import SingleFileUploader from "components/Common/SingleFileUploader";
import MultiFileUploader from "components/Common/MultiFileUploader";
import { addPlus, formatDate, toBase64 } from "store/utils/util";
import { useForm } from "react-hook-form";
//import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddAgencyWrapper = ({
  homeCare: { serviceCategory, progressFormState },
  updateProgressForm,
  getSuggestedCities,
  getSuggestedLocationByZipCode,
  addNewAgency,
  getHomeCareServiceCategory,
}) => {
  // declare state
  const phoneNumberInput = useRef();
  const companyPhotoUploader = useRef();
  const [isLoading, toggleLoader] = useState(false);
  const { basicData, serviceData, regionData } = progressFormState;
  const [suggestedPlaceList, updatePlaceList] = useState([]);
  const [suggestedRegionList, updateRegionList] = useState([]);
  const [regionInputValue, updateRegionInputValue] = useState("");
  const [companyLogo, updateCompanyLogo] = useState({
    logo: null,
    logoUrl:
      "https://www.resetyourbody.com/wp-content/uploads/COMPANY_LOGO/logo-default.png",
  });
  const [companyPhotos, updateCompanyPhotos] = useState({
    photos: [],
    photoCount: 0,
  });
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

  const getFormData = async () => {
    await getHomeCareServiceCategory();
  };

  useEffect(() => {
    getFormData();
  }, []);

  const { phoneNumberError } = formErrors;

  const setValue = (propertyName) => {
    return basicData[propertyName] ? basicData[propertyName].value : "";
  };

  const onChange = (e) => {
    toggleFormError({
      phoneNumberError: false,
    });
    let name = e.target.name;
    let value = e.target.value;
    let title = e.target.id;
    updateValue(name, title, value);
  };

  const updateValue = (name, title, value) => {
    basicData[name] = {
      title,
      value,
    };
    updateProgressForm(progressFormState);
  };

  const serviceChecked = (category, id) => {
    let service = serviceData[category]
      ? serviceData[category].filter((item) => item.id == id)
      : [];
    return service.length == 1 ? true : false;
  };

  const onServiceSelect = (categoryTitle, serviceTitle, serviceId) => {
    if (serviceData[categoryTitle]) {
      if (serviceChecked(categoryTitle, serviceId)) {
        serviceData[categoryTitle] = serviceData[categoryTitle].filter(
          (item) => item.id != serviceId
        );
      } else {
        serviceData[categoryTitle].push({
          title: serviceTitle,
          id: serviceId,
        });
      }
    } else {
      serviceData[categoryTitle] = [
        {
          title: serviceTitle,
          id: serviceId,
        },
      ];
    }
    updateProgressForm(progressFormState);
  };

  const onFormSubmit = async (e) => {
    try {
      //check phone number input
      if (
        !basicData["Phone Number"] ||
        !basicData["Phone Number"].value ||
        basicData["Phone Number"].value === ""
      ) {
        toggleFormError({ ...formErrors, phoneNumberError: true });
        phoneNumberInput.current.focus();
        return;
      }
      let serviceSelected = 0;
      for (let c in serviceData) {
        serviceSelected += c.length;
      }
      if (serviceSelected === 0) {
        toastr.error("Error", "You need to select at least one of the service");
        return;
      }

      if (regionData.length === 0) {
        toastr.error("Error", "You need to select at least one region");
        return;
      }

      //register this business agency
      const formData = {
        basicData: {},
        serviceData: [],
        regionData: {},
      };

      let medicalServices = false;
      let nonMedicalServices = false;
      let serviceType = "All";

      //process basicData
      for (let key in basicData) {
        let row = basicData[key];
        formData.basicData[row.title] = row.value;
        if (key === "Medical" && row.length > 0) {
          medicalServices = true;
        } else if (key === "Non Medical" && row.length > 0) {
          nonMedicalServices = true;
        }
      }

      if (medicalServices && !nonMedicalServices) {
        serviceType = "Medical";
      } else if (!medicalServices && nonMedicalServices) {
        serviceType = "Non-Medical";
      }
      formData.basicData["serviceType"] = serviceType;

      //process serviceData
      for (let key in serviceData) {
        let services = serviceData[key];
        formData.serviceData = [...formData.serviceData, ...services];
      }

      //process regionData
      formData.regionData = regionData.map((r) => r.id);

      let photos = [];
      if (companyPhotos.photos.length > 0) {
        photos = companyPhotos.photos.map((c) => c.file);
      }

      //show loader
      toggleLoader(true);
      console.log({ formData, companyLogo, photos });
      // let result = await addNewAgency(formData, companyLogo.logo, photos)
      // toggleLoader(false)
      // if (result) {
      //   window.location = "/homeCare/buyLead"
      // }
    } catch (e) {
      toastr.error("Error", e.toString());
      toggleLoader(false);
    }
  };

  const handleKeyWordChange = async (value) => {
    let val = value;
    toggleFormError({
      phoneNumberError: false,
    });
    updateValue("City", "city", val);
    updateValue("State", "state", "");
    if (val && val.trim() !== "") {
      let result = await getSuggestedCities(val);
      if (result && result.citySuggestion) {
        let optionList = result.citySuggestion.map((item) => ({
          label: `${item.city} , ${item.state_name}`,
          value: item,
        }));
        updatePlaceList(optionList);
      }
    }
  };

  const handleKeyWordChangeForRegion = async (value) => {
    let val = value;
    toggleFormError({
      phoneNumberError: false,
    });
    updateRegionInputValue(val);
    if (val && val.trim() !== "") {
      let result = await getSuggestedLocationByZipCode(val);
      console.log(result);
      if (result) {
        let optionList = result.map((item) => ({
          label: `${item.zip} ${item.city} , ${item.state_name}`,
          value: item,
        }));
        updateRegionList(optionList);
      }
    }
  };

  const onSelectHandler = (value) => {
    if (value) {
      const { state_name, city } = value;
      updateValue("City", "city", city);
      updateValue("State", "state", state_name);
    }
  };

  const removeSelectedRegion = (id) => {
    if (id) {
      let newRegionList = regionData.filter((r) => r.id != id);
      updateProgressForm({
        ...progressFormState,
        regionData: newRegionList,
      });
    }
  };

  const onSelectHandlerForRegion = (value) => {
    if (value) {
      updateRegionInputValue("");
      let isExist = regionData.filter((r) => r.id == value.id);
      console.log(isExist);
      if (!isExist[0]) {
        regionData.push(value);
        updateProgressForm({
          ...progressFormState,
          regionData,
        });
      }
    }
  };

  const logoUploaderHandler = (file) => {
    updateCompanyLogo({
      logo: file,
    });
  };

  const photoUploadHandler = async (fileList) => {
    let totalFIle = fileList.length;
    let compiledList = [];

    if (totalFIle > 8) {
      toastr.error("Error", "Max 8 file can be selected");
      return;
    }

    for (let f of fileList) {
      let filename = f.name;
      let extension = filename.split(".").pop().toLowerCase();
      let fileSize = f.size;
      console.log(`Extension is ${extension}`);
      if (
        extension !== "jpg" &&
        extension !== "png" &&
        extension !== "jpeg" &&
        extension !== "svg"
      ) {
        toastr.error("Error", "Only jpg,png,jpeg,svg files are allowed");
        return;
      }
      if (fileSize > 2 * 1024 * 1024) {
        toastr.error("Error", "File size can't be more than 2MB");
        return;
      }
      let baseString = await toBase64(f);
      compiledList.push({
        url: baseString,
        file: f,
      });
    }
    updateCompanyPhotos({
      photos: compiledList,
    });
  };

  console.log("ddd", { serviceCategory, progressFormState });

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="sales" breadcrumbItem="add agency" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="form-title-wrapper d-flex">
                    <h5 className="form-title" style={{ marginRight: "10px" }}>
                      Basic Information
                    </h5>

                    {"("}
                    <p className="form-note-text">
                      <span className="lbl-star" style={{ color: "red" }}>
                        *
                      </span>{" "}
                      Fields are required
                    </p>
                    {")"}
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                      <div className="row">
                        {/* Business Name*/}
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="businessName">
                              Business Name <sup className="lbl-star">*</sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="businessName"
                              placeholder="Enter Business Name"
                              name="Business Name"
                              value={setValue("Business Name")}
                              onChange={(e) => onChange(e)}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["Business Name"] &&
                              errors["Business Name"].type === "required" && (
                                <ErrorView
                                  message={errors["Business Name"].message}
                                />
                              )}
                          </div>
                        </div>
                        {/* Email*/}
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="email">
                              Email <sup className="lbl-star">*</sup>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              aria-describedby="emailHelp"
                              placeholder="Enter email"
                              name="Email"
                              value={setValue("Email")}
                              onChange={(e) => onChange(e)}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                            {errors["Email"] &&
                              errors["Email"].type === "required" && (
                                <ErrorView message={errors["Email"].message} />
                              )}
                            {errors["Email"] &&
                              errors["Email"].type === "pattern" && (
                                <ErrorView message={errors["Email"].message} />
                              )}
                          </div>
                        </div>
                        {/* Address*/}
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="address">
                              Address <sup className="lbl-star">*</sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              placeholder="Enter address"
                              name="Address"
                              value={setValue("Address")}
                              onChange={(e) => onChange(e)}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["Address"] &&
                              errors["Address"].type === "required" && (
                                <ErrorView
                                  message={errors["Address"].message}
                                />
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="row pt-4">
                        {/* City*/}
                        <div className="col-md-4">
                          <SearchSelect
                            onChange={handleKeyWordChange}
                            options={suggestedPlaceList}
                            onSelect={onSelectHandler}
                            labelName="City"
                            required={true}
                            name="City"
                            id="city"
                            inputClassName={"form-control"}
                            placeHolder={"Enter city"}
                            value={setValue("City")}
                            ref={register({
                              required: {
                                value: true,
                                message: errorTexts["required"],
                              },
                            })}
                          />
                          {errors["City"] &&
                            errors["City"].type === "required" && (
                              <ErrorView message={errors["City"].message} />
                            )}
                        </div>
                        {/* State*/}
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="state">
                              State <sup className="lbl-star">*</sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="state"
                              placeholder="Enter State"
                              name="State"
                              value={setValue("State")}
                              onChange={(e) => onChange(e)}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["State"] &&
                              errors["State"].type === "required" && (
                                <ErrorView message={errors["State"].message} />
                              )}
                          </div>
                        </div>
                        {/*  Zip Code*/}
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="zipCode">
                              Zip Code <sup className="lbl-star">*</sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="zipCode"
                              placeholder="Enter ZipCode"
                              name="Zip Code"
                              value={setValue("Zip Code")}
                              onChange={(e) => onChange(e)}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["Zip Code"] &&
                              errors["Zip Code"].type === "required" && (
                                <ErrorView
                                  message={errors["Zip Code"].message}
                                />
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="row pt-4">
                        {/*  Phone Number*/}
                        <div className="col-md-4">
                          <div className="form-group phone-input-custom">
                            <label className="pro-lbl-1" htmlFor="phoneNumber">
                              Phone Number{" "}
                            </label>
                            <PhoneInput
                              className="form-control"
                              placeholder="Enter phone number"
                              id="phoneNumber"
                              name="Phone Number"
                              value={setValue("Phone Number")}
                              onChange={(e) => {
                                onChange({
                                  target: {
                                    id: "phoneNumber",
                                    name: "Phone Number",
                                    value: e,
                                  },
                                });
                              }}
                              maxLength={14}
                              country="us"
                              ref={phoneNumberInput}
                            />
                            {phoneNumberError && (
                              <ErrorView message={errorTexts["required"]} />
                            )}
                          </div>
                        </div>
                        {/* Local Phone*/}
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="localPhone">Local Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              id="localPhone"
                              placeholder="Enter Local Phone Number"
                              name="Local Phone"
                              value={setValue("Local Phone")}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                        {/* Website*/}
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <input
                              type="text"
                              className="form-control"
                              id="website"
                              placeholder="Enter Website Link"
                              name="Website"
                              value={setValue("Website")}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row pt-4">
                        {/* License Number */}
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="licenseNumber">
                              License Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="licenseNumber"
                              placeholder="Enter License Number"
                              name="License Number"
                              value={setValue("License Number")}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                        {/* Facebook*/}
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="facebook">Facebook</label>
                            <input
                              type="text"
                              className="form-control"
                              id="facebook"
                              placeholder="Enter Facebook Link"
                              name="Facebook"
                              value={setValue("Facebook")}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                        {/* Twitter*/}
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="twitter">Twitter</label>
                            <input
                              type="text"
                              className="form-control"
                              id="twitter"
                              placeholder="Enter Twitter Link"
                              name="Twitter"
                              value={setValue("Twitter")}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row pt-4">
                        {/* Instagram*/}
                        <div className="col-md-4">
                          <label htmlFor="instagram">Instagram</label>
                          <input
                            type="text"
                            className="form-control"
                            id="instagram"
                            placeholder="Enter Instagram Link"
                            name="Instagram"
                            value={setValue("Instagram")}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        {/* LinkedIn*/}
                        <div className="col-md-4">
                          <label htmlFor="linkedIn">LinkedIn</label>
                          <input
                            type="text"
                            className="form-control"
                            id="linkedIn"
                            placeholder="Enter LinkedIn link"
                            name="LinkedIn"
                            value={setValue("LinkedIn")}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        {/* Description */}
                        <div className="row pt-4">
                          <div className="col-sm-12">
                            <label htmlFor="website">Description</label>
                            <Input
                              className="form-control"
                              id="description"
                              placeholder="Enter Description about your agency"
                              name="Description"
                              type="textarea"
                              rows="5"
                              value={setValue("Description")}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                        {/* Company Logo */}
                        <div className="row pt-4">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label htmlFor="website">Company Logo</label>
                              <SingleFileUploader
                                initialLogo={companyLogo.logoUrl}
                                onChangeHandler={logoUploaderHandler}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Service Images */}
                        <div className="row pt-4">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label htmlFor="website">Service Images</label>
                              <MultiFileUploader
                                onChangeHandler={photoUploadHandler}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Services */}
                        <div className="row pt-4">
                          <div className="form-title-wrapper d-flex">
                            <h5
                              className="form-title"
                              style={{ marginRight: "10px" }}
                            >
                              Services
                            </h5>

                            {"("}
                            <p className="form-note-text">
                              At least{" "}
                              <span
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                1
                              </span>{" "}
                              service is required
                            </p>
                            {")"}
                          </div>
                          <hr />
                          <div className="row">
                            {serviceCategory &&
                              serviceCategory.map(
                                ({ id, title: categoryTitle, services }) => {
                                  return (
                                    <div className="col-sm-6" key={`s-c-${id}`}>
                                      <div className="">
                                        <h3 className="my-3">
                                          {categoryTitle}
                                        </h3>
                                      </div>
                                      <div className="">
                                        {services.map(
                                          ({ title: serviceTitle, id }) => {
                                            let labelID = `${id}-${serviceTitle}`;
                                            return (
                                              <div
                                                className="form-check mb-3"
                                                key={`s-${id}`}
                                              >
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  value={id}
                                                  id={labelID}
                                                  onChange={(e) => {
                                                    onServiceSelect(
                                                      categoryTitle,
                                                      serviceTitle,
                                                      id
                                                    );
                                                  }}
                                                  style={{
                                                    height: "20px",
                                                    width: "20px",
                                                  }}
                                                />
                                                <label
                                                  className="form-check-label my-auto"
                                                  htmlFor={labelID}
                                                  style={{
                                                    fontSize: "15px",
                                                    padding: "3px 0px 0px 15px",
                                                  }}
                                                >
                                                  {serviceTitle}
                                                </label>
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        </div>

                        <div className="row pt-4">
                          <div className="form-title-wrapper d-flex">
                            <h5
                              className="form-title"
                              style={{ marginRight: "10px" }}
                            >
                              Service Locations
                            </h5>

                            {"("}
                            <p className="form-note-text">
                              At least{" "}
                              <span
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                1
                              </span>{" "}
                              region is required
                            </p>
                            {")"}
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                              <SearchSelect
                                onChange={handleKeyWordChangeForRegion}
                                options={suggestedRegionList}
                                onSelect={onSelectHandlerForRegion}
                                showLabel={false}
                                inputClassName={"form-control"}
                                placeHolder={"Enter Zip Code"}
                                value={regionInputValue}
                                numberMode={true}
                              />
                            </div>
                            <div className="region-list-wrapper">
                              <div className="region-list-inner-wrapper">
                                <div className="region-list">
                                  {regionData.map(
                                    ({ id, state_name, city, zip }) => {
                                      return (
                                        <div
                                          className="region-row-wrapper"
                                          key={`l-${id}-${zip}`}
                                        >
                                          <div className="region-row">
                                            <div className="region-text">
                                              {zip} {city}, {state_name}
                                            </div>
                                            <div
                                              className="remove-region"
                                              onClick={() => {
                                                removeSelectedRegion(id);
                                              }}
                                            >
                                              <i className="fa fa-trash"></i>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary  btn-label"
                        >
                          <i className="bx bx-check-double label-icon"></i> Save
                          & Submit
                        </button>
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

const mapStateToProps = (state) => ({ homeCare: state.homeCare });

const mapDispatchToProps = {
  updateProgressForm,
  getSuggestedCities,
  getSuggestedLocationByZipCode,
  addNewAgency,
  getHomeCareServiceCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAgencyWrapper);
