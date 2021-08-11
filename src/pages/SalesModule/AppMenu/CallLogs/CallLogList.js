import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { toastr } from "react-redux-toastr"
import { connect } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import Pagination from "react-js-pagination"
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  InputGroup,
  Button,
} from "reactstrap"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb"
import LinkLeadModal from "./LinkLeadModal"

//redux & actions
import {
  getAllCallLogList,
  updateQueCallState,
} from "../../../../store/Actions/callAction"
import LoaderComponent from "components/Common/Loader/LoaderComponent"
import ButtonComp from "components/Common/Button/Button"
import { formatPhoneNumber } from "react-phone-number-input"
import { addPlus, formatDate } from "store/utils/util"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const SellerCallLogList = ({
  getAllCallLogList,
  userDetails,
  appSize,
  callState: { inCall },
  updateQueCallState,
}) => {
  // declare state
  const [appState, updateAppState] = useState({
    activePage: 1,
    startDate: null,
    endDate: null,
    selectedStatus: "all",
    selectedVoiceMailStatus: "all",
    fromNumber: "",
    toNumber: "",
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
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const onStatusChange = e => {
    try {
      let value = e.target.value
      updateAppState({
        selectedStatus: value,
      })
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const onVoiceMailStatusChange = e => {
    try {
      let value = e.target.value
      updateAppState({
        selectedVoiceMailStatus: value,
      })
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const handlePageChange = pNumber => {
    updateAppState({
      ...appState,
      activePage: pNumber,
    })
  }

  const onFromNumChange = e => {
    try {
      let value = e.target.value
      updateAppState({
        fromNumber: value,
      })
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const onToNumChange = e => {
    try {
      let value = e.target.value
      updateAppState({
        toNumber: value,
      })
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const handelDateSearch = date => {
    try {
      updateAppState({
        ...appState,
        startDate: date,
        endDate: new Date(),
      })
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const handelEndDateSearch = date => {
    try {
      updateAppState({
        ...appState,
        endDate: date,
      })
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
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
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const modalCallBackHandler = () => {
    getDataList()
  }

  //TABLE COMPONENTS
  const dt = useRef(null)

  const fromBodyTemplate = rowData => {
    let fNum = formatPhoneNumber(rowData.fromNumber)
    let tNum = formatPhoneNumber(rowData.toNumber)
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
        <span>{fNum}</span>
      </React.Fragment>
    )
  }

  const toBodyTemplate = rowData => {
    let fNum = formatPhoneNumber(rowData.fromNumber)
    let tNum = formatPhoneNumber(rowData.toNumber)
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

  const directionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        {rowData.direction == "Incoming" ? (
          <Badge
            className="me-1 rounded-pill bg-success"
            style={{ padding: "5px 10px 7px 10px" }}
          >
            {rowData.direction}
          </Badge>
        ) : (
          <Badge
            className="me-1 rounded-pill bg-info"
            style={{ padding: "5px 10px 7px 10px" }}
          >
            {rowData.direction}
          </Badge>
        )}
      </React.Fragment>
    )
  }

  const statusBodyTemplate = rowData => {
    return (
      <React.Fragment>
        {rowData.callStatus === "completed" ? (
          <Button
            color="success"
            className="btn-rounded btn-sm"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Button>
        ) : rowData.callStatus === "no-answer" ? (
          <Button
            color="primary"
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
        ) : rowData.callStatus === "canseled" ? (
          <Button
            color="danger"
            className="btn-rounded btn-sm"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Button>
        ) : (
          <Button
            color="success"
            className="btn-rounded btn-sm"
            style={{ minWidth: "85px" }}
          >
            {rowData.callStatus}
          </Button>
        )}
      </React.Fragment>
    )
  }

  const durationBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{`${rowData.duration}s`}</span>
      </React.Fragment>
    )
  }

  const leadBodyTemplate = rowData => {
    //console.log(rowData.leadUser)
    return (
      <React.Fragment>
        <span>
          {rowData && rowData.agencyProfile && rowData.agencyProfile.title
            ? rowData.agencyProfile.title
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

  const actionBodyTemplate = rowData => {
    let userNumber
    let fNum = formatPhoneNumber(rowData.fromNumber)
    let tNum = formatPhoneNumber(rowData.toNumber)
    if (rowData.direction == "Outgoing") {
      userNumber = tNum
    } else if (rowData.direction == "Incoming") {
      userNumber = fNum
    }

    return (
      <React.Fragment>
        {
          <span>
            <div class="d-flex justify-content-center">
              <span>
                <ButtonComp
                  icon="phone"
                  onClick={e => {
                    e.preventDefault()
                    callToNumber(userNumber)
                  }}
                  toolTip="Call"
                  btnClass="normal"
                />
              </span>
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
              <span>
                {!rowData.agencyId && (
                  <ButtonComp
                    icon="link"
                    onClick={e => {
                      e.preventDefault()
                      toggleModalView(rowData)
                    }}
                    toolTip="Link To Lead"
                    btnClass="normal"
                  />
                )}
              </span>
            </div>
          </span>
        }
      </React.Fragment>
    )
  }

  //TABLE COMPONENTS END

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="sales" breadcrumbItem="call logs" />

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
                          <i class="fas fa-phone"></i>
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
                    <div className="col-md-4">
                      <label className="">To Number</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-phone"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="(000) 000-0000"
                          onChange={onToNumChange}
                          value={toNumber}
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
                      <div className="col-sm-6">
                        <ButtonComp
                          icon="sync"
                          onClick={() => {
                            getDataList()
                          }}
                          toolTip="refresh"
                          tooltipType="info"
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
                              style={{
                                width: "8%",
                              }}
                            />
                            <Column
                              field="agencyProfile.title"
                              header="Lead"
                              body={leadBodyTemplate}
                              sortable
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
                              style={{
                                width: "10%",
                              }}
                            />
                            <Column
                              field="action"
                              header="Action"
                              body={actionBodyTemplate}
                              sortable
                              style={{
                                width: "15%",
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
      <LinkLeadModal
        openModal={isModalOpen}
        hideModal={toggleModalView}
        modalBodyData={modalBodyData}
        callBack={modalCallBackHandler}
      />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerCallLogList)
