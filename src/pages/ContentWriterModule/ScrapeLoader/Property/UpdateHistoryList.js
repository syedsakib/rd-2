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
import { getPropertyUpdateHistoryList } from "../../../../store/Actions/scrapeAction";

import LoaderComponent from "components/Common/Loader/LoaderComponent";
import ButtonComp from "components/Common/Button/Button";
import { formatDate, getQueryParams } from "store/utils/util";

const UpdateHistoryList = ({
  getPropertyUpdateHistoryList,
  match: { params },
  location,
}) => {
  // declare states
  const history = useHistory();
  const [queryParams, updateQueryParams] = useState(null);
  const [isLoading, toggleLoader] = useState(false);
  const [filterState, updateFilterState] = useState({
    selectedStatus: "all",
    startDate: null,
    endDate: null,
    activePage: 1,
    limit: 20,
  });
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [totalCount, updateTotalCount] = useState(0);
  const { selectedStatus, startDate, endDate, activePage, limit } = filterState;
  const { rows, count } = listState;

  useEffect(() => {
    let qParams = getQueryParams(location.search);
    updateQueryParams(qParams);
    if (params && params.id) {
      getDataListHandler(params.id);
    }
  }, [activePage, selectedStatus, startDate, endDate]);

  const getDataListHandler = async (boom_hash) => {
    try {
      toggleLoader(true);
      let result = await getPropertyUpdateHistoryList({
        pageNumber: activePage,
        boom_hash,
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

  const processNoBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {`Process-${rowData.processId}`}</span>
      </React.Fragment>
    );
  };

  const skippedReasonBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.skipReason ? rowData.skipReason : "N/A"}</span>
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

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.processStatus}</span>
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
          <Breadcrumb title="CW" breadcrumbItem="update history" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">
                      <span style={{ fontWeight: "bold" }}>
                        {queryParams && queryParams.name}'s
                      </span>{" "}
                      Information Update History
                    </div>
                  </div>
                </CardHeader>
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
                      <div className="col-sm-6"></div>
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
                            field="id"
                            header="Process No"
                            body={processNoBodyTemplate}
                            sortable
                          />
                          <Column
                            field="createdAt"
                            header="Created At"
                            body={createdAtBodyTemplate}
                            sortable
                          />
                          <Column
                            field="dataSkipped"
                            header="Skip Reason"
                            body={skippedReasonBodyTemplate}
                            sortable
                          />

                          <Column
                            field="processStatus"
                            header="Status"
                            body={statusBodyTemplate}
                            sortable
                          />
                        </DataTable>
                      </div>
                    </div>
                  )}

                  <div>
                    {!isLoading && count > limit && (
                      <div className="pro-pagination">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={limit}
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
  getPropertyUpdateHistoryList,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHistoryList);
