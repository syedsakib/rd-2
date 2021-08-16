import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import Pagination from "react-js-pagination";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  Badge,
  InputGroupAddon,
} from "reactstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { generatePropertyUrl, getFrontUrl } from "../../../store/utils/util";
import ButtonComp from "components/Common/Button/Button";

//redux & actions
import { getAllPropertyListOfPartner } from "../../../store/Actions/partnerAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";
import SearchSelect from "components/Common/SearchSelect/SearchSelect";

const PartnerPropertyListWrapper = ({ getAllPropertyListOfPartner }) => {
  // declare states
  const history = useHistory();
  const [isLoading, toggleLoader] = useState(false);
  const [filterState, updateFilterState] = useState({
    activePage: 1,
    limit: 20,
    searchText: "",
    selectedStatus: "all",
  });
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  // extract states
  const { rows, count } = listState;
  const { limit, activePage, searchText, selectedStatus } = filterState;

  // app functions
  useEffect(() => {
    getDataList();
  }, [activePage, searchText, selectedStatus]);

  const getDataList = async () => {
    try {
      toggleLoader(true);
      let result = await getAllPropertyListOfPartner({
        limit,
        activePage,
        searchText,
        selectedStatus,
      });
      console.log("Property List", result);
      if (result) {
        let { rows, count } = result;
        updateListState({ rows, count });
      }
      toggleLoader(false);
    } catch (e) {
      toggleLoader(false);
      console.log(e);
    }
  };

  const handleSearchInput = (e) => {
    try {
      let value = e.target.value;
      updateFilterState({
        searchText: value,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusChange = (e) => {
    try {
      let value = e.target.value;
      updateFilterState({
        selectedStatus: value,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageChange = (pNumber) => {
    updateFilterState({
      activePage: pNumber,
    });
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.businessTitle ? rowData.businessTitle : "N/A"}</span>
      </React.Fragment>
    );
  };

  const emailBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.email ? rowData.email : "N/A"}</span>
      </React.Fragment>
    );
  };

  const cityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.city ? rowData.city : "N/A"}</span>
      </React.Fragment>
    );
  };

  const stateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.state ? rowData.state : "N/A"}</span>
      </React.Fragment>
    );
  };

  const zipCodeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.zipcode ? rowData.zipcode : "N/A"}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.status ? "Active" : "Not Active"}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = ({ state, city, status, careTypes, slug, id }) => {
    let pUrl;
    if (careTypes && careTypes[0] && careTypes[0].typeDetail) {
      let cTitle = careTypes[0].typeDetail.title;
      let frontUrl = getFrontUrl();
      pUrl = generatePropertyUrl(cTitle, state, city, slug);
      pUrl = `${frontUrl}${pUrl}`;
    }
    return (
      <React.Fragment>
        {
          <span>
            <div className="d-flex justify-content-center">
              {status && (
                <ButtonComp
                  icon="link"
                  onClick={(e) => {
                    window.open(pUrl);
                  }}
                  toolTip="View Page"
                  btnClass="normal"
                />
              )}
              {status && (
                <ButtonComp
                  icon="edit"
                  onClick={(e) => {
                    history.push(`/partner/edit/${id}`);
                  }}
                  toolTip="Edit"
                  btnClass="normal"
                />
              )}
              {status && (
                <ButtonComp
                  icon="bullhorn"
                  onClick={(e) => {
                    history.push(`/partner/promotion/${id}`);
                  }}
                  toolTip="Promotions"
                  btnClass="normal"
                />
              )}
              {status && (
                <ButtonComp
                  icon="star"
                  onClick={(e) => {
                    history.push(`/partner/reviews?id=${id}`);
                  }}
                  toolTip="View Reviews"
                  btnClass="normal"
                />
              )}
            </div>
          </span>
        }
      </React.Fragment>
    );
  };

  //TABLE COMPONENTS END

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="partner" breadcrumbItem="my property list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-sm-12 my-auto">
                      <span style={{ fontWeight: "700", color: "#f96472" }}>
                        Note:
                      </span>{" "}
                      Each senior living business you add must be approved by
                      BoomersHub. To get approval, click on the “EDIT” button
                      associated with your community and then fill out the
                      remaining pages.
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <label className="">Search Property</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i className="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="agency name / email / state / city / zipcode"
                          onChange={handleSearchInput}
                          value={searchText}
                        />
                      </InputGroup>
                    </div>

                    <div className="col-md-6">
                      <label className="">Filter By Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedStatus}
                        onChange={onStatusChange}
                      >
                        <option value="all">All</option>
                        <option value={1}>Active</option>
                        <option value={0}>Not-Active</option>
                      </select>
                    </div>
                  </div>

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        {/* {count > 0 && (
                          <ButtonComp
                            icon="sync"
                            onClick={() => {
                              getDataListHandler();
                            }}
                            toolTip="refresh"
                            tooltipType="info"
                          />
                        )} */}
                      </div>
                      <div className="col-sm-6 text-end">
                        {count > 0 && (
                          <div className="record-counter">
                            Total Record Found ({count})
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  {isLoading ? (
                    <LoaderComponent />
                  ) : (
                    <>
                      <div className="datatable-responsive-demo">
                        <div className="card">
                          <DataTable
                            ref={dt}
                            value={listState.rows}
                            className="p-datatable-customers"
                            emptyMessage="No data found."
                          >
                            <Column
                              field="businessTitle"
                              header="Name"
                              body={nameBodyTemplate}
                              sortable
                            />

                            <Column
                              field="email"
                              header="Email"
                              body={emailBodyTemplate}
                              sortable
                              style={{
                                width: "18%",
                              }}
                            />
                            <Column
                              field="city"
                              header="City"
                              body={cityBodyTemplate}
                              sortable
                            />
                            <Column
                              field="state"
                              header="State"
                              body={stateBodyTemplate}
                              sortable
                            />
                            <Column
                              field="zipcode"
                              header="Zip Code"
                              body={zipCodeBodyTemplate}
                              sortable
                            />
                            <Column
                              field="status"
                              header="Status"
                              body={statusBodyTemplate}
                              sortable
                            />
                            <Column
                              field="action"
                              header="Action"
                              body={actionBodyTemplate}
                              sortable
                              style={{
                                width: "20%",
                              }}
                            />
                          </DataTable>
                        </div>
                      </div>

                      <div>
                        {!isLoading && count > 20 && (
                          <div className="pro-pagination">
                            <Pagination
                              activePage={activePage}
                              itemsCountPerPage={20}
                              totalItemsCount={count}
                              pageRangeDisplayed={5}
                              onChange={handlePageChange}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
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
  getAllPropertyListOfPartner,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnerPropertyListWrapper);
