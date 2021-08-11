import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import Pagination from "react-js-pagination"
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap"
import { toastr } from "react-redux-toastr"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import "./DataTableDemo.css"

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb"
import {
  formatDate,
  addPlus,
  getQueryParams,
} from "../../../../store/utils/util"
import ButtonComp from "components/Common/Button/Button"
import DatePicker from "react-datepicker"

//redux & actions
import { getAgencySalesAssignedHistory } from "../../../../store/Actions/salesAction"

const AssignHistoryList = ({
  userDetails,
  appSize,
  getAgencySalesAssignedHistory,
  match: { params },
  location,
}) => {
  // declare states
  const [queryParams, updateQueryParams] = useState(null)
  const [appState, updateAppState] = useState({
    activePage: 1,
    startDate: null,
    endDate: null,
    selectedStatus: "All",
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
    let qParams = getQueryParams(location.search)
    updateQueryParams(qParams)
    if (params && params.id) {
      getDataList()
    }
  }, [selectedStatus, startDate, endDate, activePage])

  const getDataList = async () => {
    try {
      toggleLoader(true)
      let result = await getAgencySalesAssignedHistory({
        pageNumber: activePage,
        startDate,
        endDate,
        selectedStatus,
        agencyId: params && params.id,
      })
      console.log(result)
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
      toastr.error("Error", e.toString())
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
      toastr.error("Error", e.toString())
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
      toastr.error("Error", e.toString())
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
      toastr.error("Error", e.toString())
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

  const assignedToBodyTemplate = ({ saleUser }) => {
    return (
      <React.Fragment>
        <span> {`${saleUser.firstName} ${saleUser.lastName}`}</span>
      </React.Fragment>
    )
  }

  const phoneBodyTemplate = ({ saleUser }) => {
    return (
      <React.Fragment>
        <span>{formatPhoneNumber(addPlus(saleUser.phoneNumber))}</span>
      </React.Fragment>
    )
  }

  const emailBodyTemplate = ({ saleUser }) => {
    return (
      <React.Fragment>
        <span> {saleUser.email}</span>
      </React.Fragment>
    )
  }

  const startDateBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {formatDate(rowData.startDate)}</span>
      </React.Fragment>
    )
  }

  const endDateBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.endDate ? formatDate(rowData.endDate) : "N/A"}</span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.status ? "Active" : "Closed"}</span>
      </React.Fragment>
    )
  }

  const assignedByBodyTemplate = ({ admin }) => {
    return (
      <React.Fragment>
        <span> {`${admin.firstName} ${admin.lastName}`}</span>
      </React.Fragment>
    )
  }

  const actionBodyTemplate = ({ id, saleUser }) => {
    return (
      <React.Fragment>
        {
          <span>
            <div class="d-flex justify-content-center">
              <span>
                <ButtonComp
                  icon="tasks"
                  onClick={() => {
                    window.open(
                      `/admin/sales/agency/salesActivity/${id}?name=${saleUser.firstName}&agency=${queryParams.name}`
                    )
                  }}
                  toolTip="View Activity"
                  btnClass="normal"
                />
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
          <Breadcrumb title="Admin" breadcrumbItem="sales assign history" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">
                      <span>{queryParams && queryParams.name}'s</span> Sale
                      Assign History
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
                    <div className="col-md-4 ">
                      <label className="">Filter By Status</label>
                      <select
                        className="form-control"
                        value={selectedStatus}
                        onChange={onStatusChange}
                      >
                        <option value="All">All</option>
                        <option value={1}>Active</option>
                        <option value={0}>Closed</option>
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

                  <div className="datatable-responsive-demo">
                    <div className="card">
                      <DataTable
                        ref={dt}
                        value={listState.rows}
                        className="p-datatable-customers"
                        emptyMessage="No Data found."
                      >
                        <Column
                          field="saleUser.firstName"
                          header="Assigned To"
                          body={assignedToBodyTemplate}
                          sortable
                        />
                        <Column
                          field="phoneNumber"
                          header="Phone Number"
                          body={phoneBodyTemplate}
                          sortable
                        />
                        <Column
                          field="email"
                          header="Email"
                          body={emailBodyTemplate}
                          sortable
                        />
                        <Column
                          field="startDate"
                          header="Start Date"
                          body={startDateBodyTemplate}
                          sortable
                        />
                        <Column
                          field="endDate"
                          header="End Date"
                          body={endDateBodyTemplate}
                          sortable
                        />
                        <Column
                          field="status"
                          header="Status"
                          body={statusBodyTemplate}
                          sortable
                        />
                        <Column
                          field="admin.firstName"
                          header="Assigned By"
                          body={assignedByBodyTemplate}
                          sortable
                        />
                        <Column
                          field="action"
                          header="Action"
                          body={actionBodyTemplate}
                        />
                      </DataTable>
                    </div>
                  </div>

                  <div>
                    {!isLoading && rows && rows.length > 20 && (
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
  homeCare: state.homeCare,
  appSize: state.global.appSize,
})

const mapDispatchToProps = {
  getAgencySalesAssignedHistory,
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignHistoryList)
