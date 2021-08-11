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

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";
import { formatDate, getQueryParams } from "../../../../store/utils/util";
import classnames from "classnames";

import AgencyDetail from "./AgencyDetail";
import AgencyActivities from "../AgencyActivities/AgencyActivities";
import AgencyLeadList from "../AgencyLeads/AgencyLeadList";
import AgencyTransactionList from "../AgencyTransactions/AgencyTransactionList";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AgencyDetailWrapper = ({
  userDetails,
  appSize,
  match: { params },
  location,
}) => {
  // declare states
  const history = useHistory();
  const [queryParams, updateQueryParams] = useState(null);
  const [isLoading, toggleLoader] = useState(false);

  useEffect(() => {
    toggleLoader(true);
    let qParams = getQueryParams(location.search);
    updateQueryParams(qParams);
    toggleLoader(false);
    console.log(queryParams);
  }, []);

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
            <Breadcrumb title="Admin" breadcrumbItem="sales agency view" />

            <Row>
              <Col lg="12">
                <Card>
                  <CardHeader>
                    {" "}
                    <div className="row">
                      <div className="col-md-6 my-auto">
                        <span>{queryParams && queryParams.name}'s</span> Detail
                        History
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
                          Profile
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
                          Leads
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
                          Transactions
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
                          Activity
                        </NavLink>
                      </NavItem>
                    </ul>

                    <TabContent className="p-4" activeTab={activeTab}>
                      <TabPane tabId="1">
                        <div>
                          <Row className="justify-content-center">
                            <AgencyDetail agencyId={params && params.id} />
                          </Row>
                        </div>
                      </TabPane>

                      <TabPane tabId="2">
                        <div>
                          <Row className="justify-content-center">
                            <AgencyLeadList agencyId={params && params.id} />
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId="3">
                        <div>
                          <Row className="justify-content-center">
                            <AgencyTransactionList
                              agencyId={params && params.id}
                            />
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId="4">
                        <div>
                          <Row className="justify-content-center">
                            <AgencyActivities agencyId={params && params.id} />
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgencyDetailWrapper);
