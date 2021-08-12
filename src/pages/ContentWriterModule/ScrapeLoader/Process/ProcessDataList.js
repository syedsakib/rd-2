import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DatePicker from "react-datepicker";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";

//redux & actions
import {
  getDataProcessTrackerList,
  exportToCsvProcessData,
} from "../../../../store/Actions/scrapeAction";

import LoaderComponent from "components/Common/Loader/LoaderComponent";
import ButtonComp from "components/Common/Button/Button";
import { formatDate, getQueryParams } from "store/utils/util";

const ProcessDataList = ({
  getDataProcessTrackerList,
  exportToCsvProcessData,
  match: { params },
  location,
  userDetails,
}) => {
  // declare states
  const history = useHistory();
  const [queryParams, updateQueryParams] = useState(null);
  const [processId, setProcessId] = useState(null);
  const [isLoading, toggleLoader] = useState(false);
  const [filterState, updateFilterState] = useState({
    selectedStatus: "all",
    startDate: null,
    endDate: null,
    activePage: 1,
  });
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [totalCount, updateTotalCount] = useState(0);
  const { selectedStatus, startDate, endDate, activePage } = filterState;
  const { rows, count } = listState;

  useEffect(() => {
    let qParams = getQueryParams(location.search);
    updateQueryParams(qParams);
    if (params && params.id) {
      setProcessId(params.id);
    }
  }, []);

  useEffect(() => {
    if (processId) {
      getDataListHandler(processId);
    }
  }, [activePage, selectedStatus, startDate, endDate, processId]);

  const getDataListHandler = async (processId) => {
    try {
      toggleLoader(true);
      let result = await getDataProcessTrackerList({
        pageNumber: activePage,
        processId,
        selectedStatus,
        startDate,
        endDate,
        activePage,
      });
      console.log(result);
      if (result) {
        console.log(result);
        const { rows, count } = result;
        updateListState({
          rows,
          count,
        });
        updateTotalCount(count);
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
    }
  };

  const updateFilterStateHandler = (newState) => {
    updateFilterState({
      ...filterState,
      ...newState,
    });
  };

  const onStatusChange = (value) => {
    try {
      updateFilterStateHandler({
        selectedStatus: value,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageChange = (pNumber) => {
    updateFilterStateHandler({
      activePage: pNumber,
    });
  };

  const handelDateSearch = (date) => {
    try {
      updateFilterStateHandler({
        startDate: date,
        endDate: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handelEndDateSearch = (date) => {
    try {
      updateFilterStateHandler({
        endDate: date,
      });
    } catch (e) {
      console.log(e);
    }
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const titleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.businessTitle ? rowData.businessTitle : "N/A"}</span>
      </React.Fragment>
    );
  };

  const addressBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.address ? rowData.address : "N/A"}</span>
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

  const cityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.city ? rowData.city : "N/A"}</span>
      </React.Fragment>
    );
  };

  const zipcodeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.zipcode ? rowData.zipcode : "N/A"}</span>
      </React.Fragment>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {formatDate(rowData.createdAt)}</span>
      </React.Fragment>
    );
  };

  const skipReasonBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.skipReason ? rowData.skipReason : "N/A"}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.status}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = ({ boom_hash, businessTitle }) => {
    return (
      <React.Fragment>
        {
          <span>
            <div className="d-flex justify-content-center">
              <ButtonComp
                icon="edit"
                onClick={() => {
                  history.push(
                    `/cw/scrape/property/edit/${boom_hash}?name=${businessTitle}`
                  );
                }}
                toolTip="View Detail"
                btnClass="normal"
              />
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
          <Breadcrumb title="CW" breadcrumbItem="process list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-4">
                      <label className="">Start Date</label>
                      <DatePicker
                        maxDate={new Date()}
                        selected={startDate}
                        onChange={handelDateSearch}
                        className="form-control"
                        placeHolder="Start Date"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="">End Date</label>
                      <DatePicker
                        maxDate={new Date()}
                        minDate={startDate}
                        selected={endDate}
                        onChange={handelEndDateSearch}
                        disabled={!startDate}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="">Filter By Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedStatus}
                        onChange={(e) => {
                          onStatusChange(e.target.value);
                        }}
                      >
                        <option value="all">All</option>
                        <option value="Inserted">Inserted</option>
                        <option value="Updated">Updated</option>
                        <option value="Skipped">Skipped</option>
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
                            header="Title"
                            body={titleBodyTemplate}
                            sortable
                            style={{
                              width: "20%",
                            }}
                          />
                          <Column
                            field="address"
                            header="Address"
                            body={addressBodyTemplate}
                            sortable
                            style={{
                              width: "14%",
                            }}
                          />
                          <Column
                            field="state"
                            header="State"
                            body={stateBodyTemplate}
                            sortable
                          />
                          <Column
                            field="city"
                            header="City"
                            body={cityBodyTemplate}
                            sortable
                          />
                          <Column
                            field="zipcode"
                            header="ZipCode"
                            body={zipcodeBodyTemplate}
                            sortable
                          />
                          <Column
                            field="createdAt"
                            header="Created At"
                            body={createdAtBodyTemplate}
                            sortable
                          />
                          <Column
                            field="status"
                            header="Status"
                            body={statusBodyTemplate}
                            sortable
                          />
                          <Column
                            field="skipReason"
                            header="Skip Reason"
                            body={skipReasonBodyTemplate}
                            sortable
                          />
                          <Column
                            field="action"
                            header="Action"
                            body={actionBodyTemplate}
                            sortable
                          />
                        </DataTable>
                      </div>
                    </div>
                  )}

                  <div>
                    {!isLoading && count > 10 && (
                      <div className="pro-pagination">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={20}
                          totalItemsCount={totalCount}
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                        />
                      </div>
                    )}
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
  appSize: state.global.appSize,
});

const mapDispatchToProps = {
  getDataProcessTrackerList,
  exportToCsvProcessData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessDataList);
