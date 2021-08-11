import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { connect, useDispatch } from "react-redux"
import { toastr } from "react-redux-toastr"
import { Link, useHistory } from "react-router-dom"
import Pagination from "react-js-pagination"
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
} from "reactstrap"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb"
import { formatDate, formatNumber, addCode } from "../../../store/utils/util"
import ButtonComp from "components/Common/Button/Button"

//redux & actions
import {
  getAllCallLogList,
  updateQueCallState,
  exportToCsvLogs,
} from "../../../store/Actions/callAction"
import LoaderComponent from "components/Common/Loader/LoaderComponent"

const IncomingCallLogsList = ({
  getAllCallLogList,
  userDetails,
  appSize,
  callState: { inCall },
  updateQueCallState,
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
    direction: "Incoming",
  })
  const [isLoading, toggleLoader] = useState(false)
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  })
  const [modalData, updateModalData] = useState({
    isModalOpen: false,
    modalBodyData: null,
  })
  const {
    selectedStatus,
    startDate,
    endDate,
    activePage,
    fromNumber,
    toNumber,
    selectedVoiceMailStatus,
    direction,
  } = appState
  const { rows, count } = listState
  const { isModalOpen, modalBodyData } = modalData

  useEffect(() => {
    getDataList()
  }, [
    selectedStatus,
    startDate,
    endDate,
    activePage,
    fromNumber,
    toNumber,
    selectedVoiceMailStatus,
  ])

  const getDataList = async () => {
    try {
      toggleLoader(true)
      let result = await getAllCallLogList({
        pageNumber: activePage,
        startDate,
        endDate,
        selectedStatus,
        fromNumber,
        toNumber,
        selectedVoiceMailStatus,
        direction,
      })
      if (result) {
        console.log(result)
        const { rows, count } = result
        updateListState({
          rows,
          count,
        })
      }
      toggleLoader(false)
    } catch (e) {
      toastr.error("Error", e.toString())
      toggleLoader(false)
    }
  }

  const updateAppStateHandler = newState => {
    updateAppState({ ...appState, ...newState })
  }

  const onStatusChange = e => {
    try {
      let value = e.target.value
      updateAppStateHandler({
        selectedStatus: value,
      })
    } catch (e) {
      toastr.error("Error", e.toString())
    }
  }

  const onVoiceMailStatusChange = e => {
    try {
      let value = e.target.value
      updateAppStateHandler({
        selectedVoiceMailStatus: value,
      })
    } catch (e) {
      toastr.error("Error", e.toString())
    }
  }

  const handlePageChange = pNumber => {
    updateAppStateHandler({
      activePage: pNumber,
    })
  }

  const onFromNumChange = e => {
    try {
      let value = e.target.value
      updateAppStateHandler({
        fromNumber: value,
      })
    } catch (e) {
      toastr.error("Error", e.toString())
    }
  }

  const onToNumChange = e => {
    try {
      let value = e.target.value
      updateAppStateHandler({
        toNumber: value,
      })
    } catch (e) {
      toastr.error("Error", e.toString())
    }
  }

  const handelDateSearch = date => {
    try {
      updateAppStateHandler({
        startDate: date,
        endDate: new Date(),
      })
    } catch (e) {
      toastr.error("Error", e.toString())
    }
  }

  const handelEndDateSearch = date => {
    try {
      updateAppStateHandler({
        endDate: date,
      })
    } catch (e) {
      toastr.error("Error", e.toString())
    }
  }

  const toggleModalView = data => {
    updateModalData({
      ...modalData,
      isModalOpen: !isModalOpen,
      modalBodyData: data,
    })
  }

  const callToNumber = pNumber => {
    try {
      if (!inCall) {
        updateQueCallState({
          requestedNumber: pNumber,
        })
      } else {
        throw "A call is already in progress"
      }
    } catch (e) {
      toastr.error(e.toString())
    }
  }

  const modalCallBackHandler = () => {
    getDataList()
  }

  //TABLE COMPONENTS
  const dt = useRef(null)

  const fromBodyTemplate = rowData => {
    let fNum = formatNumber(rowData.fromNumber)
    let tNum = formatNumber(rowData.toNumber)
    let userNumber
    let agentName = rowData.userDetail
      ? `${rowData.userDetail.firstName} ${rowData.userDetail.lastName}`
      : "Agent"
    if (rowData.direction === "Outgoing") {
      fNum = agentName
      userNumber = toNumber
    } else if (rowData.direction === "Incoming") {
      tNum = agentName
      userNumber = fromNumber
    }
    return (
      <React.Fragment>
        <span>{formatNumber(fNum)}</span>
      </React.Fragment>
    )
  }

  const pickedByBodyTemplate = rowData => {
    let fNum = formatNumber(rowData.fromNumber)
    let tNum = formatNumber(rowData.toNumber)
    let userNumber
    let agentName = rowData.userDetail
      ? `${rowData.userDetail.firstName} ${rowData.userDetail.lastName}`
      : "Agent"
    if (rowData.direction === "Outgoing") {
      fNum = agentName
      userNumber = toNumber
    } else if (rowData.direction === "Incoming") {
      tNum = agentName
      userNumber = fromNumber
    }
    return (
      <React.Fragment>
        <span>{tNum}</span>
      </React.Fragment>
    )
  }

  const queueStatusBodyTemplate = rowData => {
    let { queueStatus } = rowData
    return (
      <React.Fragment>
        {queueStatus && queueStatus == "hangup" ? (
          <Badge pill className="badge-soft-primary ms-1">
            {queueStatus || "N/A"}
          </Badge>
        ) : queueStatus && queueStatus == "bridged" ? (
          <Badge pill className="badge-soft-info ms-1">
            {queueStatus || "N/A"}
          </Badge>
        ) : (
          <Badge pill className="badge-soft-success ms-1">
            {queueStatus || "N/A"}
          </Badge>
        )}
      </React.Fragment>
    )
  }

  const queueDurationBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.queueTime ? `${rowData.queueTime}s` : `0s`} </span>
      </React.Fragment>
    )
  }

  const callDurationBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{`${rowData.duration}s`}</span>
      </React.Fragment>
    )
  }

  const returnCallBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.doesExpectReturnCall === 1 ? "Yes" : "No"}</span>
      </React.Fragment>
    )
  }

  const preferedNumberBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          {rowData.preferredNumber
            ? formatNumber(addCode(rowData.preferredNumber))
            : "N/A"}
        </span>
      </React.Fragment>
    )
  }

  const leadBodyTemplate = rowData => {
    //console.log(rowData.leadUser)
    return (
      <React.Fragment>
        <span>
          {rowData.leadUser
            ? `${rowData.leadUser.firstName} ${rowData.leadUser.lastName}`
            : "N/A"}
        </span>
      </React.Fragment>
    )
  }

  const logBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{formatDate(rowData.createdAt)}</span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = rowData => {
    return (
      <React.Fragment>
        {rowData.callStatus === "Completed" ? (
          <Button
            color="success"
            className="btn-rounded btn-sm"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Button>
        ) : rowData.callStatus === "no-answer" ? (
          <Button
            color="secondary"
            className="btn-rounded btn-sm"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Button>
        ) : rowData.callStatus === "busy" ? (
          <Button
            color="info"
            className="btn-rounded btn-sm"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Button>
        ) : rowData.callStatus === "failed" ? (
          <Button
            color="danger"
            className="btn-rounded btn-sm"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Button>
        ) : rowData.callStatus === "canceled" ? (
          <Button
            color="danger"
            className="btn-rounded btn-sm"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Button>
        ) : (
          <Button
            color="warning"
            className="btn-rounded btn-sm"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Button>
        )}
      </React.Fragment>
    )
  }

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        {
          <span>
            <div class="d-flex justify-content-center">
              <span>
                {rowData.recordingUrl ? (
                  <ButtonComp
                    icon="volume-up"
                    onClick={e => {
                      e.preventDefault()
                      window.open(rowData.recordingUrl)
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
    )
  }

  //TABLE COMPONENTS END

  if (isLoading) {
    return <LoaderComponent />
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb
            title="Admin"
            breadcrumbItem="call center incoming logs"
          />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <label className="">From Number</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="(000) 000-0000"
                          onChange={onFromNumChange}
                          value={fromNumber}
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
                        <option value="completed">Completed</option>
                        <option value="in-queue">In-Queue</option>
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
                      <label className="">Filter By Record</label>
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
                            getDataList()
                          }}
                          toolTip="refresh"
                          tooltipType="info"
                        />

                        <ButtonComp
                          icon="download"
                          onClick={() => {
                            console.log("Export To CSV")
                            exportToCsvLogs({ ...appState, logFor: "lead" })
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
                          style={{
                            width: "12%",
                          }}
                        />
                        <Column
                          field="pickedBy"
                          header="Picked By"
                          body={pickedByBodyTemplate}
                          sortable
                        />
                        <Column
                          field="callStatus"
                          header="Queue Status"
                          body={queueStatusBodyTemplate}
                          sortable
                        />
                        <Column
                          field="queueTime"
                          header="Queue Duration"
                          body={queueDurationBodyTemplate}
                          sortable
                          style={{
                            width: "8%",
                          }}
                        />
                        <Column
                          field="duration"
                          header="Call Duration"
                          body={callDurationBodyTemplate}
                          sortable
                          style={{
                            width: "8%",
                          }}
                        />

                        <Column
                          field="doesExpectReturnCall"
                          header="Return Call"
                          body={returnCallBodyTemplate}
                          sortable
                          style={{
                            width: "8%",
                          }}
                        />

                        <Column
                          field="preferredNumber"
                          header="Preferred Number"
                          body={preferedNumberBodyTemplate}
                          sortable
                        />
                        <Column
                          field="leadUser.firstName"
                          header="Lead"
                          body={leadBodyTemplate}
                          sortable
                          style={{
                            width: "8%",
                          }}
                        />
                        <Column
                          field="createdAt"
                          header="Log Time"
                          body={logBodyTemplate}
                          sortable
                        />
                        <Column
                          field="callStatus"
                          header="Call Status"
                          body={statusBodyTemplate}
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
  callState: state.call.callState,
})

const mapDispatchToProps = {
  getAllCallLogList,
  updateQueCallState,
  exportToCsvLogs,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncomingCallLogsList)
