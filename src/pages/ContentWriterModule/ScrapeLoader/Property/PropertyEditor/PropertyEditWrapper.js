import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
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
  InputGroup,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import {
  getPropertyServiceList,
  getPropertyAmenityList,
  getPropertyCommunityList,
  getPropertyDetail,
} from "../../../../../store/Actions/scrapeAction";
//Import Breadcrumb
import Breadcrumb from "components/Common/Breadcrumb";
import { formatDate, getQueryParams } from "../../../../../store/utils/util";
import classnames from "classnames";

import BasicInfoEditor from "./BasicInfoEditor";
import ServiceListForm from "./ServiceListForm";
import CommunityListForm from "./CommunityListForm";
import AmenityListForm from "./AmenityListForm";
import CareTypes from "./CareTypesForm";
import ImageEditor from "./ImageEditor/ImageEditor";

import LoaderComponent from "components/Common/Loader/LoaderComponent";

const PropertyEditWrapper = ({
  userDetails,
  appSize,
  match: { params },
  location,
  getPropertyServiceList,
  getPropertyAmenityList,
  getPropertyCommunityList,
  getPropertyDetail,
}) => {
  // declare states
  const history = useHistory();
  const [queryParams, updateQueryParams] = useState(null);
  const [isLoading, toggleLoader] = useState(false);
  const [property, updateProperty] = useState(null);

  useEffect(() => {
    let qParams = getQueryParams(location.search);
    updateQueryParams(qParams);
    if (params && params.ID) {
      getPropertyData(params.ID);
    }
    getPropertyServiceList();
    getPropertyAmenityList();
    getPropertyCommunityList();
  }, []);

  const getPropertyData = async (id) => {
    try {
      console.log("id", id);
      let result = await getPropertyDetail(id);
      if (result) {
        console.log(result);
        console.log("result", result);
        updateProperty(result);
      }
    } catch (e) {
      console.log(e);
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
                        <span style={{ fontWeight: "bold" }}>
                          {queryParams && queryParams.name}'s
                        </span>{" "}
                        Information
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
                          Services
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
                          Amneties
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
                          Communities
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
                          Images
                        </NavLink>
                      </NavItem>
                    </ul>

                    <TabContent className="p-4" activeTab={activeTab}>
                      <TabPane tabId="1">
                        <div>
                          <Row className="justify-content-center">
                            <BasicInfoEditor property={property} />
                          </Row>
                        </div>
                      </TabPane>

                      <TabPane tabId="2">
                        <div>
                          <Row className="justify-content-center">
                            <CareTypes property={property} />
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId="3">
                        <div>
                          <Row className="justify-content-center">
                            <ServiceListForm property={property} />
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId="4">
                        <div>
                          <Row className="justify-content-center">
                            <AmenityListForm property={property} />
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId="5">
                        <div>
                          <Row className="justify-content-center">
                            <CommunityListForm property={property} />
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId="6">
                        <div>
                          <Row className="justify-content-center">
                            <ImageEditor property={property} />
                          </Row>
                        </div>
                      </TabPane>
                    </TabContent>
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
});

const mapDispatchToProps = {
  getPropertyServiceList,
  getPropertyAmenityList,
  getPropertyCommunityList,
  getPropertyDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyEditWrapper);
