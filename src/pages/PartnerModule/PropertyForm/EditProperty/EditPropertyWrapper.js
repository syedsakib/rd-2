import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import {
  getPropertyAmenityList,
  getPropertyCommunityList,
  getPropertyCareTypeList,
  getPropertyRoomTypes,
  getPropertyServiceList,
} from "../../../../store/Actions/scrapeAction";

import {
  savePropertyDetail,
  getPropertyDetail,
  getPropertyFeatures,
  updateCreatePropertyState,
  updatePropertyDetail,
  clearCreatePropertyState,
} from "../../../../store/Actions/partnerAction";

//Import Breadcrumb
import Breadcrumb from "components/Common/Breadcrumb";

import classnames from "classnames";

import BasicInfoEditor from "./BasicInfoEditor";
import ServiceListForm from "./ServiceListForm";
import CommunityListForm from "./CommunityListForm";
import AmenityListForm from "./AmenityListForm";
import CareTypes from "./CareTypesForm";
import ImageEditor from "./ImageEditor/ImageEditor";
import RoomTypeForm from "./roomTypeForm/roomTypeForm";

import LoaderComponent from "components/Common/Loader/LoaderComponent";

const EditPartnerPropertyWrapper = ({
  userDetails,
  appSize,
  createPropertyState,
  getPropertyAmenityList,
  getPropertyServiceList,
  getPropertyCommunityList,
  updateCreatePropertyState,
  getPropertyCareTypeList,
  savePropertyDetail,
  clearCreatePropertyState,
  getPropertyRoomTypes,

  getPropertyDetail,
  getPropertyFeatures,
  updatePropertyDetail,
}) => {
  // declare states
  const [isLoading, toggleLoader] = useState(false);
  const history = useHistory();
  const [pId, setPropertyId] = useState(null);
  const [property, updateProperty] = useState(null);

  useEffect(() => {
    if (params && params.id) {
      let id = params.id;
      console.log(`Property ID ${id}`);
      setPropertyId(id);
      getPropertyData(id);
    }
    getPropertyAmenityList();
    getPropertyServiceList();
    getPropertyCommunityList();
    getPropertyCareTypeList();
    getPropertyRoomTypes();
    return () => {
      clearCreatePropertyState();
    };
  }, []);

  const onBasicProfileChange = (newState) => {
    updateCreatePropertyState({
      ...createPropertyState,
      basicProfile: {
        ...createPropertyState.basicProfile,
        ...newState,
      },
    });
  };

  const onCareTypeChange = (newState) => {
    updateCreatePropertyState({
      ...createPropertyState,
      careTypeList: newState,
    });
  };

  const onAmenityChange = (newState) => {
    updateCreatePropertyState({
      ...createPropertyState,
      amenityList: newState,
    });
  };

  const onCommunityChange = (newState) => {
    updateCreatePropertyState({
      ...createPropertyState,
      communityList: newState,
    });
  };

  const onServiceChange = (newState) => {
    updateCreatePropertyState({
      ...createPropertyState,
      serviceList: newState,
    });
  };

  const onImageChange = (newState) => {
    updateCreatePropertyState({
      ...createPropertyState,
      imageList: newState,
    });
  };

  const onRoomTypeChange = (newState) => {
    updateCreatePropertyState({
      ...createPropertyState,
      roomList: newState,
    });
  };

  const getPropertyData = async (id) => {
    try {
      let result = await getPropertyDetail({ propertyId: id });
      let propertyFeatures = await getPropertyFeatures({ propertyId: id });
      if (result && propertyFeatures) {
        const { profile } = result;
        console.log(`Property`, result);
        console.log(`Features`, propertyFeatures);
        updateProperty(result);
        updateCreatePropertyState({
          basicProfile: {
            businessTitle: profile.businessTitle || "",
            address: profile.address || "",
            city: profile.city || "",
            state: profile.state || "",
            county: profile.county || "",
            email: profile.email || "",
            zipcode: profile.zipcode || "",
            phone: profile.phone || "",
            mailingAddress: profile.mailingAddress || "",
            mailingZipcode: profile.mailingZipcode || "",
            mailingCity: profile.mailingCity || "",
            mailingState: profile.mailingState || "",
            mailingEmail: profile.mailingEmail || "",
            fax: profile.fax || "",
            licenseNumber: profile.licenseNumber || "",
            licenseExpires: profile.licenseExpires
              ? new Date(profile.licenseExpires)
              : "",
            licenseStatus: profile.licenseStatus || "",
            recentInspectionDate: profile.recentInspectionDate
              ? new Date(profile.recentInspectionDate)
              : "",
            website: profile.website || "",
            administratorName: profile.administratorName || "",
            administratorPhone: profile.administratorPhone || "",
            citations: profile.citations || "",
            capacity: profile.capacity || "",
            description: profile.description || "",
            companyName: profile.companyName || "",
            facilityStatus: profile.facilityStatus || "Active",
            facilityURL: profile.facilityURL || "",
            // licensureDate: "",
            medicaidId: profile.medicaidId || "",
            medicareId: profile.medicareId || "",
            acceptMedicaid: profile.acceptMedicaid === "Y",
            acceptMedicare: profile.acceptMedicare === "Y",
            editorDescription: profile.description || "",
            stateCode: profile.state_abbr || "",
          },
          careTypeList: profile.careTypes.map((item) => item.careTypeId),
          amenityList: propertyFeatures.amenities.map((item) => item.amenityId),
          serviceList: propertyFeatures.services.map((item) => ({
            id: item.serviceId,
            title: item.service.title,
          })),
          communityList: propertyFeatures.communities.map(
            (item) => item.communityId
          ),
          roomList: propertyFeatures.roomList.map((item) => {
            return {
              roomType: item.roomType.id,
              capacity: item.capacity,
              roomPrice: item.basePrice,
              description: item.description,
              roomStatus: item.status,
              id: item.id,
              roomTypeTitle: item.roomType.title,
              isListed: true,
            };
          }),
          imageList: profile.photos.map((item) => ({
            id: item.id,
            url: item.photo_url,
          })),
          removedImageList: [],
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSaveHandler = async (shouldPublish) => {
    try {
      if (!property) {
        throw "No Property Found";
      }
      const pStatus = property.profile.status;
      const {
        basicProfile,
        careTypeList,
        amenityList,
        serviceList,
        communityList,
        imageList,
      } = createPropertyState;
      const { businessTitle, email, address, city, state, zipcode, phone } =
        basicProfile;
      if (
        !businessTitle ||
        businessTitle === "" ||
        !email ||
        email === "" ||
        !address ||
        address === "" ||
        !city ||
        city === "" ||
        !state ||
        state === "" ||
        !zipcode ||
        zipcode === "" ||
        !phone ||
        phone === ""
      ) {
        throw "Please fill the required fields";
      }

      // if the property already published
      if (
        pStatus ||
        (!pStatus &&
          property.claimRecord &&
          property.claimRecord.status === "Pending") ||
        (!pStatus && shouldPublish === 1)
      ) {
        if (!careTypeList || careTypeList.length < 1) {
          throw "At least 1 Care Type needs to be selected";
        }
        if (!serviceList || serviceList.length < 5) {
          throw "At least 5 Service needs to be selected";
        }
        if (!amenityList || amenityList.length < 3) {
          throw "At least 3 Amenities needs to be selected";
        }
        if (!communityList || communityList.length < 3) {
          throw "At least 3 Community needs to be selected";
        }
        if (!imageList || imageList.length < 3) {
          //throw "At least 4 Images needs to be selected";
        }
      }

      toggleLoader(true);
      let result = await updatePropertyDetail(
        createPropertyState,
        property.profile.id,
        shouldPublish
      );
      if (result) {
        // will refresh or reload
        history.push("/partner");
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
      toastr.error("Error", e.toString());
    }
  };

  const showSendRequestBtn = () => {
    if (property && property.profile.status == 0) {
      if (
        !property.claimRecord ||
        (property.claimRecord && property.claimRecord.status != "Pending")
      ) {
        return (
          <div className="form-btn-wrapper">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              onClick={() => {
                onSaveHandler(1);
              }}
            >
              Save & Request For Publish
            </button>
          </div>
        );
      }
    }
  };

  const [activeTab, toggleTab] = useState("1");

  return (
    <React.Fragment>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="page-content">
          <MetaTags>
            <title>BoomersHub | Admin Dashboard</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumb title="Admin" breadcrumbItem="add property" />

            <Row>
              <Col lg="12">
                <Card>
                  <CardHeader>
                    <div className="row">
                      <div className="col-md-6 my-auto"></div>
                    </div>
                  </CardHeader>

                  <CardBody>
                    <ul
                      className="nav nav-tabs nav-tabs-custom justify-content-center pt-2"
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          to="#"
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggleTab("1");
                          }}
                        >
                          Basic Information
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          to="#"
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            toggleTab("2");
                          }}
                        >
                          Care Types
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          to="#"
                          className={classnames({
                            active: activeTab === "3",
                          })}
                          onClick={() => {
                            toggleTab("3");
                          }}
                        >
                          Rooms
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          to="#"
                          className={classnames({
                            active: activeTab === "4",
                          })}
                          onClick={() => {
                            toggleTab("4");
                          }}
                        >
                          Services
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          to="#"
                          className={classnames({
                            active: activeTab === "5",
                          })}
                          onClick={() => {
                            toggleTab("5");
                          }}
                        >
                          Amneties
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          to="#"
                          className={classnames({
                            active: activeTab === "6",
                          })}
                          onClick={() => {
                            toggleTab("6");
                          }}
                        >
                          Communities
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          to="#"
                          className={classnames({
                            active: activeTab === "7",
                          })}
                          onClick={() => {
                            toggleTab("7");
                          }}
                        >
                          Images
                        </NavLink>
                      </NavItem>
                    </ul>

                    <TabContent className="p-4" activeTab={activeTab}>
                      <TabPane tabId="1">
                        <div>
                          <Row className="justify-content-center">
                            <BasicInfoEditor
                              property={createPropertyState}
                              onChangeHandler={onBasicProfileChange}
                            />
                          </Row>
                        </div>
                      </TabPane>

                      <TabPane tabId="2">
                        <div>
                          <Row className="justify-content-center">
                            <CareTypes
                              property={createPropertyState}
                              onChangeHandler={onCareTypeChange}
                            />
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId="3">
                        <div>
                          <Row className="justify-content-center">
                            <RoomTypeForm
                              property={createPropertyState}
                              onChangeHandler={onRoomTypeChange}
                            />
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId="4">
                        <div>
                          <Row className="justify-content-center">
                            <ServiceListForm
                              property={createPropertyState}
                              onChangeHandler={onServiceChange}
                            />
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId="5">
                        <div>
                          <Row className="justify-content-center">
                            <AmenityListForm
                              property={createPropertyState}
                              onChangeHandler={onAmenityChange}
                            />
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId="6">
                        <div>
                          <Row className="justify-content-center">
                            <CommunityListForm
                              property={createPropertyState}
                              onChangeHandler={onCommunityChange}
                            />
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId="7">
                        <div>
                          <Row className="justify-content-center">
                            <ImageEditor
                              property={createPropertyState}
                              onChangeHandler={onImageChange}
                            />
                          </Row>
                        </div>
                      </TabPane>
                    </TabContent>

                    <div className="row mt-4">
                      {property && (
                        <div className="col-sm-12">
                          <div className="form-footer text-center">
                            <button
                              type="submit"
                              className="btn btn-info btn-lg mx-4 px-5"
                              onClick={() => {
                                onSaveHandler(0);
                              }}
                            >
                              Update
                            </button>
                            {showSendRequestBtn()}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
  createPropertyState: state.partner.createPropertyState,
});

const mapDispatchToProps = {
  getPropertyAmenityList,
  getPropertyServiceList,
  getPropertyCommunityList,
  getPropertyCareTypeList,
  savePropertyDetail,
  updateCreatePropertyState,
  clearCreatePropertyState,
  getPropertyRoomTypes,
  getPropertyDetail,
  getPropertyFeatures,
  updatePropertyDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPartnerPropertyWrapper);
