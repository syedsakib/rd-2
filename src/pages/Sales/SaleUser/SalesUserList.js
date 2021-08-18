import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
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
  Button,
} from "reactstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { formatDate } from "../../../store/utils/util";

//redux & actions
import {
  getHomeCareAgencyDataChangeRecord,
  updateRecordChangeStatus,
  getSaleUserList,
} from "../../../store/Actions/adminAction";
import { formatPhoneNumber } from "react-phone-number-input";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const SalesUserList = ({
  getHomeCareAgencyDataChangeRecord,
  updateRecordChangeStatus,
  getSaleUserList,
}) => {
  // declare states
  const history = useHistory();
  const [appState, updateAppState] = useState({
    activePage: 1,
    searchText: "",
    sortColumn: "",
    sortOrder: 0,
  });
  const [isLoading, toggleLoader] = useState(false);
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [modalData, updateModalData] = useState({
    isModalOpen: false,
    modalBodyData: null,
  });
  //
  const [totalCount, updateTotalCount] = useState(0);
  const { activePage, searchText, sortColumn, sortOrder } = appState;
  const { rows, count } = listState;
  const { isModalOpen, modalBodyData } = modalData;

  useEffect(() => {
    getDataList();
  }, [searchText, activePage, sortColumn, sortOrder]);

  const getDataList = async () => {
    try {
      toggleLoader(true);
      let result = await getSaleUserList({
        activePage,
        searchText,
        sortColumn,
        sortOrder,
      });
      if (result) {
        console.log("result result", result);
        const { rows, count } = result;
        updateListState({
          rows,
          count: count,
        });
        // updateTotalCount(getTotalCount(maxLimit, count))
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
      toggleLoader(false);
    }
  };

  const updateAppStateHandler = (newState) => {
    updateAppState({ ...appState, ...newState });
  };

  const handleSearchInput = (e) => {
    try {
      let value = e.target.value;
      updateAppStateHandler({
        searchText: value,
      });
    } catch (e) {
      toastr.error("Error", e.toString());
      console.log(e);
    }
  };

  const handlePageChange = (pNumber) => {
    updateAppStateHandler({
      activePage: pNumber,
    });
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const nameByBodyTemplate = ({ user }) => {
    console.log({ user });
    return (
      <React.Fragment>
        <span>{`${user.firstName} ${user.lastName}`}</span>
      </React.Fragment>
    );
  };

  const phoneNumberBodyTemplate = ({ user }) => {
    return (
      <React.Fragment>
        <span>{user ? formatPhoneNumber(user.phoneNumber) : "N/A"}</span>
      </React.Fragment>
    );
  };

  const emailBodyTemplate = ({ user }) => {
    return (
      <React.Fragment>
        <span>{user.email ? user.email : "N/A"}</span>
      </React.Fragment>
    );
  };

  const joinedOnBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{formatDate(rowData.createdAt)}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = ({ user }) => {
    return (
      <React.Fragment>
        {
          <span>
            <div className="d-flex justify-content-center">
              <span>
                <Button
                  color="primary"
                  className="btn btn-primary btn-sm "
                  id={user.id}
                  onClick={() => {
                    window.open(
                      `/admin/sales/users/agencies/${user.id}?name=${user.firstName}`
                    );
                  }}
                >
                  View Agencies
                </Button>
              </span>
              <span className="mx-2">
                <Button
                  color="success"
                  className="btn btn-primary btn-sm "
                  id={user.id}
                  onClick={() => {
                    window.open(
                      `/admin/sales/users/performance/${user.id}?name=${user.firstName}`
                    );
                  }}
                >
                  View Performance
                </Button>
              </span>
              <span>
                <Button
                  color="info"
                  className="btn btn-primary btn-sm "
                  id={user.id}
                  onClick={() => {
                    window.open(
                      `/admin/sales/users/callLogs/${user.id}?name=${user.firstName}`
                    );
                  }}
                >
                  View Call Logs
                </Button>
              </span>
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
          <Breadcrumb title="Admin" breadcrumbItem="sales user list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-4">
                      <label className="">Search Record</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i className="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="title / name / phone / email "
                          onChange={handleSearchInput}
                          value={searchText}
                        />
                      </InputGroup>
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
                              getDataListHandler()
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
                            emptyMessage="No Agencies found."
                          >
                            <Column
                              field="user.firstName"
                              header="Name"
                              body={nameByBodyTemplate}
                              sortable
                            />
                            <Column
                              field="user.phoneNumber"
                              header="Phone Number"
                              body={phoneNumberBodyTemplate}
                              sortable
                            />
                            <Column
                              field="user.email"
                              header="Email"
                              body={emailBodyTemplate}
                              sortable
                            />
                            <Column
                              field="createdAt"
                              header="Joined On"
                              body={joinedOnBodyTemplate}
                              sortable
                            />
                            <Column
                              field="action"
                              header="Action"
                              body={actionBodyTemplate}
                              sortable
                              style={{
                                width: "30%",
                              }}
                            />
                          </DataTable>
                        </div>
                      </div>
                      <div>
                        {!isLoading && count > 10 && (
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

function mapStateToProps(state, ownProps) {
  return {};
}

const mapDispatchToProps = {
  updateRecordChangeStatus,
  getHomeCareAgencyDataChangeRecord,
  getSaleUserList,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesUserList);
