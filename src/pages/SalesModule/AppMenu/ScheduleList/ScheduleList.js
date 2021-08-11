import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { toastr } from "react-redux-toastr"
import { connect, useDispatch } from "react-redux"
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
import Switch from "react-switch"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb"

//redux & actions
import {
  updateSalesScheduleStatus,
  deleteSalesSchedule,
  getSalesSchedules,
} from "../../../../store/Actions/salesAction"

import LoaderComponent from "components/Common/Loader/LoaderComponent"
import ButtonComp from "components/Common/Button/Button"
import ReactTooltip from "react-tooltip"
import MultiSelectCheckbox from "components/Common/MultiSelectbox/MultiSelectBox"
import { formatPhoneNumber } from "react-phone-number-input"
import { addPlus, formatDate, getFrontUrl } from "store/utils/util"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const ScheduleListWrapper = ({
  getSalesSchedules,
  userDetails,
  appSize,
  updateSalesScheduleStatus,
  deleteSalesSchedule,
}) => {
  // declare state
  const [appState, updateAppState] = useState({
    activePage: 1,
    startDate: null,
    endDate: null,
    selectedStatus: "all",
  })
  const [isLoading, toggleLoader] = useState(false)
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  })
  const [modalData, updateModalData] = useState({
    isDetailModalOpen: false,
    modalBodyData: null,
  })
  const { selectedStatus, startDate, endDate, activePage } = appState
  const { rows, count } = listState
  const { isDetailModalOpen, modalBodyData } = modalData

  useEffect(() => {
    getAllScheduleList()
  }, [selectedStatus, startDate, endDate, activePage])

  const getAllScheduleList = async () => {
    try {
      toggleLoader(true)
      let result = await getSalesSchedules({
        pageNumber: activePage,
        startDate,
        endDate,
        selectedStatus,
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
  const handlePageChange = pNumber => {
    updateAppState({
      ...appState,
      activePage: pNumber,
    })
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

  const changeSaleStatus = async e => {
    try {
      let id = e.target.id
      let value = e.target.value
      console.log(`Id is ${id}`)
      console.log(`Value is ${value}`)
      let result = await updateSalesScheduleStatus(id, value)
      let newRows = rows.map(item => {
        if (item.id == id) {
          item.status = value
        }
        return item
      })
      updateListState({
        ...listState,
        rows: newRows,
      })
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const deleteScheduleHandler = async (id, agencyId) => {
    try {
      let result = await deleteSalesSchedule(id, agencyId)
      let newRows = rows.filter(item => item.id != id)
      updateListState({
        ...listState,
        rows: newRows,
      })
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const toggleDataViewerModal = data => {
    updateModalData({
      ...modalData,
      isDetailModalOpen: !isDetailModalOpen,
      modalBodyData: data,
    })
  }

  //TABLE COMPONENTS
  const dt = useRef(null)

  const titleBodyTemplate = ({ business }) => {
    return (
      <React.Fragment>
        <span>{business.title ? business.title : "N/A"}</span>
      </React.Fragment>
    )
  }

  const phoneNumberBodyTemplate = ({ business }) => {
    return (
      <React.Fragment>
        <span>
          {business.phoneNumber
            ? formatPhoneNumber(addPlus(business.phoneNumber))
            : "N/A"}
        </span>
      </React.Fragment>
    )
  }

  const zipCodeBodyTemplate = ({ business }) => {
    return (
      <React.Fragment>
        <span>{business.zipCode ? business.zipCode : "N/A"}</span>
      </React.Fragment>
    )
  }

  const cityBodyTemplate = ({ business }) => {
    return (
      <React.Fragment>
        <span>{business.city ? business.city : "N/A"}</span>
      </React.Fragment>
    )
  }

  const stateBodyTemplate = ({ business }) => {
    return (
      <React.Fragment>
        <span>{business.state ? business.state : "N/A"}</span>
      </React.Fragment>
    )
  }

  const scheduledOnBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          {rowData.followupDate ? formatDate(rowData.followupDate) : "N/A"}
        </span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          <select
            className="form-control form-select"
            id={rowData.id}
            onChange={changeSaleStatus}
            value={rowData.status}
          >
            <option value={0}>Active</option>
            <option value={1}>Closed</option>
          </select>
        </span>
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
                <ButtonComp
                  icon="sticky-note-o"
                  onClick={e => {
                    e.preventDefault()
                    toggleDataViewerModal(rowData.note)
                  }}
                  toolTip="View Note"
                  btnClass="normal"
                />
                {status == 0 && (
                  <ButtonComp
                    icon="trash"
                    onClick={e => {
                      e.preventDefault()
                      deleteScheduleHandler(
                        rowData.id,
                        rowData.business.agencyId
                      )
                    }}
                    toolTip="Delete"
                    btnClass="danger"
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
          <Breadcrumb title="sales" breadcrumbItem="my schedule list" />

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
                        // maxDate={new Date()}
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
                        onChange={onStatusChange}
                      >
                        <option value="all">All</option>
                        <option value={0}>Active</option>
                        <option value={1}>Closed</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">{/*  */}</div>
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
                              field="business.title"
                              header="Title"
                              body={titleBodyTemplate}
                              sortable
                            />
                            <Column
                              field="business.phoneNumber"
                              header="Phone Number"
                              body={phoneNumberBodyTemplate}
                              sortable
                            />
                            <Column
                              field="business.zipCode"
                              header="ZipCode"
                              body={zipCodeBodyTemplate}
                              sortable
                            />
                            <Column
                              field="business.city"
                              header="City"
                              body={cityBodyTemplate}
                              sortable
                              //   style={{
                              //     width: "8%",
                              //   }}
                            />
                            <Column
                              field="business.state"
                              header="State"
                              body={stateBodyTemplate}
                              sortable
                            />
                            <Column
                              field="followupDate"
                              header="Scheduled On"
                              body={scheduledOnBodyTemplate}
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
  )
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.loggedInUser,
  homeCare: state.homeCare,
  appSize: state.global.appSize,
})

const mapDispatchToProps = {
  getSalesSchedules,
  updateSalesScheduleStatus,
  deleteSalesSchedule,
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleListWrapper)
