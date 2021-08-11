import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { toastr } from "react-redux-toastr"
import { connect } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import Pagination from "react-js-pagination"
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import DatePicker from "react-datepicker"

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb"

//redux & actions
import {
  getDataProcessList,
  cancelDataUpdateProcess,
  updateProcessApprovalStatus,
} from "../../../../store/Actions/scrapeAction"

import LoaderComponent from "components/Common/Loader/LoaderComponent"
import ButtonComp from "components/Common/Button/Button"
import { addPlus, formatDate } from "store/utils/util"

const ProcessList = ({
  getDataProcessList,
  cancelDataUpdateProcess,
  updateProcessApprovalStatus,
  userDetails,
}) => {
  // declare states
  const history = useHistory()
  const [isLoading, toggleLoader] = useState(false)
  const [filterState, updateFilterState] = useState({
    selectedStatus: "all",
    startDate: null,
    endDate: null,
    activePage: 1,
  })
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  })
  const [totalCount, updateTotalCount] = useState(0)
  const { selectedStatus, startDate, endDate, activePage } = filterState
  const { rows, count } = listState

  useEffect(() => {
    getDataListHandler()
  }, [activePage, selectedStatus, startDate, endDate])

  const getDataListHandler = async () => {
    try {
      toggleLoader(true)
      let result = await getDataProcessList({
        pageNumber: activePage,
        selectedStatus,
        startDate,
        endDate,
        activePage,
      })
      console.log(result)
      if (result) {
        console.log(result)
        const { rows, count } = result
        updateListState({
          rows,
          count,
        })
        updateTotalCount(count)
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
    }
  }

  const updateFilterStateHandler = newState => {
    updateFilterState({
      ...filterState,
      ...newState,
    })
  }

  const onStatusChange = value => {
    try {
      updateFilterStateHandler({
        selectedStatus: value,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handlePageChange = pNumber => {
    updateFilterStateHandler({
      activePage: pNumber,
    })
  }

  const handelDateSearch = date => {
    try {
      updateFilterStateHandler({
        startDate: date,
        endDate: new Date(),
      })
    } catch (e) {
      console.log(e)
    }
  }
  const handelEndDateSearch = date => {
    try {
      updateFilterStateHandler({
        endDate: date,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const cancelDataProcessHandler = async processId => {
    try {
      showConfirmAlert({
        title: "Are you sure?",
        desc: "Do you want to cancel this process?",
        handler: async userResult => {
          if (userResult === 2) {
            return
          }
          let result = await cancelDataUpdateProcess(processId)
          if (result) {
            getDataListHandler()
          }
        },
        yesBtnText: "Yes",
        noBtnText: "No",
      })
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  const proccessApprovalStatusHandler = async (processId, processStatus) => {
    try {
      showConfirmAlert({
        title: "Are you sure?",
        desc: `Do you want to ${
          processStatus === 1 ? "Approve" : "Reject"
        } this process?`,
        handler: async userResult => {
          if (userResult === 2) {
            return
          }
          let result = await updateProcessApprovalStatus(
            processId,
            processStatus
          )
          if (result) {
            getDataListHandler()
          }
        },
        yesBtnText: "Yes",
        noBtnText: "No",
      })
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  //TABLE COMPONENTS
  const dt = useRef(null)

  const processNoBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {`Process-${rowData.id}`}</span>
      </React.Fragment>
    )
  }

  const dataCountBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.totalDataCount ? rowData.totalDataCount : "N/A"}</span>
      </React.Fragment>
    )
  }

  const insertedBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.dataInserted ? rowData.dataInserted : 0}</span>
      </React.Fragment>
    )
  }

  const updatedBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.dataUpdated ? rowData.dataUpdated : 0}</span>
      </React.Fragment>
    )
  }

  const skippedBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.dataSkipped ? rowData.dataSkipped : 0}</span>
      </React.Fragment>
    )
  }

  const createdAtBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {formatDate(rowData.createdAt)}</span>
      </React.Fragment>
    )
  }

  const createdByBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          {rowData.adminUser &&
            `${rowData.adminUser.firstName} ${rowData.adminUser.lastName}`}
        </span>
      </React.Fragment>
    )
  }

  const cancelledByBodyTemplate = ({ processStatus, cancelUser }) => {
    return (
      <React.Fragment>
        <span>
          {processStatus === "Cancelled" && cancelUser
            ? `${cancelUser.firstName} ${cancelUser.lastName}`
            : "N/A"}
        </span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.processStatus}</span>
      </React.Fragment>
    )
  }

  const actionBodyTemplate = ({ processStatus, id }) => {
    return (
      <React.Fragment>
        {
          <span>
            <div class="d-flex justify-content-center">
              {userDetails &&
                userDetails.role == 1 &&
                processStatus === "Pending" && (
                  <Fragment>
                    <ButtonComp
                      icon="check"
                      onClick={() => {
                        proccessApprovalStatusHandler(is, 1)
                      }}
                      toolTip="Approve"
                      btnClass="normal"
                    />

                    <ButtonComp
                      icon="ban"
                      onClick={() => {
                        proccessApprovalStatusHandler(id, 2)
                      }}
                      toolTip="Reject"
                      btnClass="danger"
                    />
                  </Fragment>
                )}
              <ButtonComp
                icon="eye"
                onClick={() => {
                  history.push(`/admin/scrape/process/dataList/${id}`)
                }}
                toolTip="View DataList"
                btnClass="normal"
              />
              {(userDetails &&
                userDetails.role != 1 &&
                processStatus === "Pending") ||
                (processStatus === "In-Progress" && (
                  <ButtonComp
                    icon="close"
                    onClick={() => {
                      cancelDataProcessHandler(id)
                    }}
                    toolTip="Cancel"
                    btnClass="danger"
                  />
                ))}
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
          <title>Profile | Skote - React Admin & Dashboard Template</title>
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
                        onChange={e => {
                          onStatusChange(e.target.value)
                        }}
                      >
                        <option value="all">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
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
                            field="id"
                            header="Process No"
                            body={processNoBodyTemplate}
                            sortable
                          />
                          <Column
                            field="totalDataCount"
                            header="Data Count"
                            body={dataCountBodyTemplate}
                            sortable
                          />
                          <Column
                            field="dataInserted"
                            header="Inserted"
                            body={insertedBodyTemplate}
                            sortable
                          />
                          <Column
                            field="dataUpdated"
                            header="Updated"
                            body={updatedBodyTemplate}
                            sortable
                          />
                          <Column
                            field="dataSkipped"
                            header="Skipped"
                            body={skippedBodyTemplate}
                            sortable
                          />
                          <Column
                            field="createdAt"
                            header="Created At"
                            body={createdAtBodyTemplate}
                            sortable
                          />
                          <Column
                            field="adminUser"
                            header="Created By"
                            body={createdByBodyTemplate}
                            sortable
                          />
                          <Column
                            field="adminUser.firstName"
                            header="Cancelled By"
                            body={cancelledByBodyTemplate}
                            sortable
                          />
                          <Column
                            field="processStatus"
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
  )
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
})

const mapDispatchToProps = {
  getDataProcessList,
  cancelDataUpdateProcess,
  updateProcessApprovalStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessList)
