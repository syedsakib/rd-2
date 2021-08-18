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
  Button,
  Badge,
} from "reactstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";
import {
  formatDate,
  addPlus,
  getQueryParams,
} from "../../../../store/utils/util";
import ButtonComp from "components/Common/Button/Button";
import { formatPhoneNumber } from "react-phone-number-input";

//redux & actions
import {
  getAllCallLogListForAdmin,
  updateQueCallState,
  exportToCsvLogs,
} from "../../../../store/Actions/callAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const CallLogList = ({
  getAllCallLogListForAdmin,
  userDetails,
  appSize,
  callState: { inCall },
  updateQueCallState,
  match: { params },
  location,
  exportToCsvLogs,
}) => {
  const [appState, updateAppState] = useState({
    activePage: 1,
    startDate: null,
    endDate: null,
    selectedStatus: "all",
    selectedVoiceMailStatus: "all",
    fromNumber: "",
    toNumber: "",
  });
  const [isLoading, toggleLoader] = useState(false);
  const [queryParams, updateQueryParams] = useState(null);
  const [userId, setUserId] = useState(null);
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const {
    selectedStatus,
    startDate,
    endDate,
    activePage,
    fromNumber,
    toNumber,
    selectedVoiceMailStatus,
  } = appState;
  const { rows, count } = listState;

  useEffect(() => {
    let qParams = getQueryParams(location.search);
    updateQueryParams(qParams);
    setUserId(params && params.id);
  }, []);

  useEffect(() => {
    if (userId) {
      getDataList();
    }
  }, [
    selectedStatus,
    startDate,
    endDate,
    activePage,
    fromNumber,
    toNumber,
    selectedVoiceMailStatus,
    userId,
  ]);

  const getDataList = async () => {
    try {
      toggleLoader(true);
      let result = await getAllCallLogListForAdmin({
        logFor: "agency",
        userId,
        pageNumber: activePage,
        startDate,
        endDate,
        selectedStatus,
        fromNumber,
        toNumber,
        selectedVoiceMailStatus,
      });
      console.log(result);
      if (result) {
        console.log(result);
        const { rows, count } = result;
        updateListState({
          rows,
          count,
        });
      }
      toggleLoader(false);
    } catch (e) {
      toastr.error("Error", e.toString());
      toggleLoader(false);
    }
  };

  const onStatusChange = (e) => {
    try {
      let value = e.target.value;
      updateAppState({
        selectedStatus: value,
      });
    } catch (e) {
      toastr.error("Error", e.toString());
    }
  };

  const onVoiceMailStatusChange = (e) => {
    try {
      let value = e.target.value;
      updateAppState({
        selectedVoiceMailStatus: value,
      });
    } catch (e) {
      toastr.error("Error", e.toString());
    }
  };

  const handlePageChange = (pNumber) => {
    updateAppState({
      ...appState,
      activePage: pNumber,
    });
  };

  const onFromNumChange = (e) => {
    try {
      let value = e.target.value;
      updateAppState({
        fromNumber: value,
      });
    } catch (e) {
      toastr.error("Error", e.toString());
    }
  };

  const onToNumChange = (e) => {
    try {
      let value = e.target.value;
      updateAppState({
        toNumber: value,
      });
    } catch (e) {
      toastr.error("Error", e.toString());
    }
  };

  const handelDateSearch = (date) => {
    try {
      updateAppState({
        ...appState,
        startDate: date,
        endDate: new Date(),
      });
    } catch (e) {
      toastr.error("Error", e.toString());
    }
  };
  const handelEndDateSearch = (date) => {
    try {
      updateAppState({
        ...appState,
        endDate: date,
      });
    } catch (e) {
      toastr.error("Error", e.toString());
    }
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const fromBodyTemplate = (rowData) => {
    let fNum = formatPhoneNumber(rowData.fromNumber);
    let tNum = formatPhoneNumber(rowData.toNumber);
    let userNumber;
    let agentName = rowData.userDetail
      ? `${rowData.userDetail.firstName} ${rowData.userDetail.lastName}`
      : "Agent";
    if (rowData.direction === "Outgoing") {
      fNum = agentName;
      userNumber = toNumber;
    } else if (rowData.direction === "Incoming") {
      tNum = agentName;
      userNumber = fromNumber;
    }
    return (
      <React.Fragment>
        <span>{fNum}</span>
      </React.Fragment>
    );
  };

  const toBodyTemplate = (rowData) => {
    let fNum = formatPhoneNumber(rowData.fromNumber);
    let tNum = formatPhoneNumber(rowData.toNumber);
    let userNumber;
    let agentName = rowData.userDetail
      ? `${rowData.userDetail.firstName} ${rowData.userDetail.lastName}`
      : "Agent";
    if (rowData.direction === "Outgoing") {
      fNum = agentName;
      userNumber = toNumber;
    } else if (rowData.direction === "Incoming") {
      tNum = agentName;
      userNumber = fromNumber;
    }
    return (
      <React.Fragment>
        <span>{tNum}</span>
      </React.Fragment>
    );
  };

  const directionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.direction == "Incoming" ? (
          <Badge
            pill
            className="badge-soft-success me-1 p-2"
            style={{ minWidth: "85px" }}
          >
            {rowData.direction}
          </Badge>
        ) : (
          <Badge
            pill
            className="badge-soft-primary me-1 p-2"
            style={{ minWidth: "85px" }}
          >
            {rowData.direction}
          </Badge>
        )}
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.callStatus === "completed" ? (
          <Badge
            pill
            className="badge-soft-success me-1 p-2"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Badge>
        ) : rowData.callStatus === "no-answer" ? (
          <Badge
            pill
            className="badge-soft-danger me-1 p-2"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Badge>
        ) : rowData.callStatus === "busy" ? (
          <Badge
            pill
            className="badge-soft-warning me-1 p-2"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Badge>
        ) : rowData.callStatus === "failed" ? (
          <Badge
            pill
            className="badge-soft-danger me-1 p-2"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Badge>
        ) : rowData.callStatus === "canseled" ? (
          <Badge
            pill
            className="badge-soft-danger me-1 p-2"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Badge>
        ) : (
          <Button
            pill
            className="badge-soft-success me-1 p-2"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Button>
        )}
      </React.Fragment>
    );
  };

  const durationBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{`${rowData.duration}s`}</span>
      </React.Fragment>
    );
  };

  const leadBodyTemplate = (rowData) => {
    //console.log(rowData.leadUser)
    return (
      <React.Fragment>
        <span>
          {/* {rowData.agencyProfile && rowData.agencyProfile.title.length > 15
            ? `${rowData.agencyProfile.title.substring(0, 15)}...`
            : "N/A"} */}
          {rowData && rowData.agencyProfile && rowData.agencyProfile.title
            ? rowData.agencyProfile.title
            : "N/A"}
        </span>
      </React.Fragment>
    );
  };

  const logBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{formatDate(rowData.createdAt)}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {
          <span>
            <div className="d-flex justify-content-center">
              <span>
                {rowData.recordingUrl ? (
                  <ButtonComp
                    icon="volume-up"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(rowData.recordingUrl);
                    }}
                    toolTip="VoiceMail"
                    btnClass="normal"
                  />
                ) : null}
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
          <Breadcrumb title="Admin" breadcrumbItem="sale user call log list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-4">
                      <label className="">From Number</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i className="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          value={fromNumber}
                          className="form-control"
                          placeholder="(000) 000-0000"
                          onChange={onFromNumChange}
                        />
                      </InputGroup>
                    </div>

                    <div className="col-md-4">
                      <label className="">To Number</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i className="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          value={toNumber}
                          className="form-control"
                          placeholder="(000) 000-0000"
                          onChange={onToNumChange}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-4">
                      <label className="">Filter By Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedStatus}
                        onChange={onStatusChange}
                      >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="no-answer">No-Answer</option>
                        <option value="busy">Busy</option>
                        <option value="failed">Failed</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row filler-row">
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
                      <label className="">Filter By VoiceMail</label>
                      <select
                        className="form-control form-select"
                        value={selectedVoiceMailStatus}
                        onChange={onVoiceMailStatusChange}
                      >
                        <option value="all">All</option>
                        <option value="voice-mail">Voice Mail</option>
                      </select>
                    </div>
                  </div>

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6 d-flex justify-content-start">
                        <ButtonComp
                          icon="sync"
                          onClick={() => {
                            getDataList();
                          }}
                          toolTip="refresh"
                          tooltipType="info"
                        />

                        <ButtonComp
                          icon="download"
                          onClick={() => {
                            console.log("Export To CSV");
                            exportToCsvLogs({ ...appState, logFor: "lead" });
                          }}
                          toolTip="Export To Csv"
                        />
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
                              field="fromNumber"
                              header="From"
                              body={fromBodyTemplate}
                              sortable
                            />
                            <Column
                              field="toNumber"
                              header="To"
                              body={toBodyTemplate}
                              sortable
                            />
                            <Column
                              field="direction"
                              header="Direction"
                              body={directionBodyTemplate}
                              sortable
                            />
                            <Column
                              field="duration"
                              header="Duration"
                              body={durationBodyTemplate}
                              sortable
                            />
                            <Column
                              field="agencyProfile.title"
                              header="Lead"
                              body={leadBodyTemplate}
                              sortable
                              style={{
                                width: "18%",
                              }}
                            />
                            <Column
                              field="duration"
                              header="Log Time"
                              body={logBodyTemplate}
                              sortable
                            />
                            <Column
                              field="callStatus"
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
                                width: "8%",
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
  appSize: state.global.appSize,
  callState: state.call.callState,
});

const mapDispatchToProps = {
  getAllCallLogListForAdmin,
  updateQueCallState,
  exportToCsvLogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(CallLogList);
