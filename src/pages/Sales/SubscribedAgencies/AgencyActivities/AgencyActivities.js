import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import { formatDate } from "../../../../store/utils/util"
import "react-datepicker/dist/react-datepicker.css"
import Pagination from "react-js-pagination"
import DatePicker from "react-datepicker"
import { getAgencyActivities } from "../../../../store/Actions/salesAction"
import { toastr } from "react-redux-toastr"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import "./DataTableDemo.css"
import LoaderComponent from "components/Common/Loader/LoaderComponent"

const AgencyActivityList = ({ getAgencyActivities, agencyId }) => {
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
    getAllLeadList()
  }, [selectedStatus, startDate, endDate, activePage, agencyId])

  const getAllLeadList = async () => {
    try {
      toggleLoader(true)
      let result = await getAgencyActivities({
        pageNumber: activePage,
        startDate,
        endDate,
        selectedStatus,
        agencyId,
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
      toggleLoader(false)
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

  //TABLE COMPONENTS
  const dt = useRef(null)

  const logTypeBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.logType}</span>
      </React.Fragment>
    )
  }

  const contentBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.content}</span>
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

  if (isLoading) {
    return <LoaderComponent />
  }

  return (
    <div className="list-wrapper">
      <div className="row filter-row">
        <div className="col-md-4">
          <h4 className="filter-title">Start Date</h4>
          <div className="r-dt-wrapper">
            <DatePicker
              maxDate={new Date()}
              selected={startDate}
              onChange={handelDateSearch}
              className="form-control"
              placeHolder="Start Date"
            />
          </div>
        </div>
        <div className="col-md-4">
          <h4 className="filter-title">End Date</h4>
          <div className="r-dt-wrapper">
            <DatePicker
              maxDate={new Date()}
              minDate={startDate}
              selected={endDate}
              onChange={handelEndDateSearch}
              disabled={!startDate}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-md-4">
          <h4 className="filter-title">Filter By Type</h4>
          <select
            className="form-control"
            value={selectedStatus}
            onChange={onStatusChange}
          >
            <option value="all">All</option>
            <option value="profile">Profile</option>
            <option value="billing">Billing</option>
            <option value="subscription">Subscription</option>
            <option value="transaction">Transaction</option>
            <option value="lead">Lead</option>
          </select>
        </div>
      </div>

      <br />
      <div className="record-count-wrapper">
        <div className="record-count-right-box">
          {count > 0 && (
            <div className="record-counter">Total Record Found ({count})</div>
          )}
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
              field="logType"
              header="Log Type"
              body={logTypeBodyTemplate}
              sortable
            />
            <Column
              field="content"
              header="Activity Content"
              body={contentBodyTemplate}
              sortable
            />
            <Column
              field="createdAt"
              header="Activity Time"
              body={createdAtBodyTemplate}
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
    </div>
  )
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
})

const mapDispatchToProps = {
  getAgencyActivities,
}

export default connect(mapStateToProps, mapDispatchToProps)(AgencyActivityList)
