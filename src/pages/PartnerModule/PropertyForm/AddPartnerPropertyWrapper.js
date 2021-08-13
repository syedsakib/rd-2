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
} from "../../../store/Actions/scrapeAction";
import {
  updateCreatePropertyState,
  savePropertyDetail,
  clearCreatePropertyState,
} from "../../../store/Actions/partnerAction";

//Import Breadcrumb
import Breadcrumb from "components/Common/Breadcrumb";
import { formatDate, getQueryParams } from "../../../store/utils/util";
import classnames from "classnames";

import BasicInfoEditor from "./PropertyEditor/BasicInfoEditor";
import ServiceListForm from "./PropertyEditor/ServiceListForm";
import CommunityListForm from "./PropertyEditor/CommunityListForm";
import AmenityListForm from "./PropertyEditor/AmenityListForm";
import CareTypes from "./PropertyEditor/CareTypesForm";
// import ImageEditor from "./PropertyEditor/ImageEditor/ImageEditor";

import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AddPartnerPropertyWrapper = ({
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
}) => {
  // declare states
  const [isLoading, toggleLoader] = useState(false);

  useEffect(() => {
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

  const onSaveHandler = async (shouldPublish) => {
    try {
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
      //   if (
      //     !businessTitle ||
      //     businessTitle === "" ||
      //     !email ||
      //     email === "" ||
      //     !address ||
      //     address === "" ||
      //     !city ||
      //     city === "" ||
      //     !state ||
      //     state === "" ||
      //     !zipcode ||
      //     zipcode === "" ||
      //     !phone ||
      //     phone === ""
      //   ) {
      //     throw "Please fill the required fields";
      //   }

      // if there is a requrest for should publish
      if (shouldPublish === 1) {
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
      let result = await savePropertyDetail(createPropertyState, shouldPublish);
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
            <Breadcrumb title="Admin" breadcrumbItem="Update Property" />

            <Row>
              <Col lg="12">
                <Card>
                  <CardHeader>
                    <div className="row">
                      <div className="col-md-6 my-auto">
                        {/* <span style={{ fontWeight: "bold" }}>
                          {queryParams && queryParams.name}'s
                        </span>{" "}
                        Information */}
                      </div>
                    </div>
                  </CardHeader>
                  {/* <br /> */}
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
                            <h3>3333333333333</h3>
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
                            <h3>777777777777777</h3>
                          </Row>
                        </div>
                      </TabPane>
                    </TabContent>

                    <div className="row mt-4">
                      <div className="col-sm-12">
                        <div className="form-footer text-center">
                          <button
                            type="submit"
                            className="btn btn-info btn-lg mx-4 px-5"
                            onClick={() => {
                              onSaveHandler(0);
                            }}
                          >
                            Save For Later
                          </button>
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
                      </div>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPartnerPropertyWrapper);
