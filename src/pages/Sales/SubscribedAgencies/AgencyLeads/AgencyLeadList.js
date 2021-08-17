import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { formatDate } from "../../../../store/utils/util";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import { getAgencyLeads } from "../../../../store/Actions/salesAction";
import { toastr } from "react-redux-toastr";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./DataTableDemo.css";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AgencyLeadList = ({ getAgencyActivities, agencyId }) => {
  const [appState, updateAppState] = useState({
    activePage: 1,
    startDate: null,
    endDate: null,
    selectedStatus: "All",
  });
  const [isLoading, toggleLoader] = useState(false);
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [modalData, updateModalData] = useState({
    isDetailModalOpen: false,
    modalBodyData: null,
  });
  const { selectedStatus, startDate, endDate, activePage } = appState;
  const { rows, count } = listState;
  const { isDetailModalOpen, modalBodyData } = modalData;

  useEffect(() => {
    //   getAllLeadList()
  }, [selectedStatus, startDate, endDate, activePage, agencyId]);

  const getAllLeadList = async () => {
    try {
      toggleLoader(true);
      let result = await getAgencyLeads({
        pageNumber: activePage,
        startDate,
        endDate,
        selectedStatus,
        agencyId,
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
      console.log(e);
      toggleLoader(false);
      toastr.error("Error", e.toString());
    }
  };

  const onStatusChange = (e) => {
    try {
      let value = e.target.value;
      updateAppState({
        selectedStatus: value,
      });
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };
  const handlePageChange = (pNumber) => {
    updateAppState({
      ...appState,
      activePage: pNumber,
    });
  };

  const handelDateSearch = (date) => {
    try {
      updateAppState({
        ...appState,
        startDate: date,
        endDate: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handelEndDateSearch = (date) => {
    try {
      updateAppState({
        ...appState,
        endDate: date,
      });
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const openLeadDetailModalHandler = (leadData) => {
    updateModalData({
      ...modalData,
      modalBodyData: leadData || {},
      isDetailModalOpen: !isDetailModalOpen,
    });
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const nameBodyTemplate = ({ lead }) => {
    return (
      <React.Fragment>
        <span>{`${lead.user.firstName} ${lead.user.firstName}`}</span>
      </React.Fragment>
    );
  };

  const phoneNumberBodyTemplate = ({ lead }) => {
    return (
      <React.Fragment>
        <span>{lead.user.phoneNumber}</span>
      </React.Fragment>
    );
  };

  const zipCodeBodyTemplate = ({ lead }) => {
    return (
      <React.Fragment>
        <span>{lead.user.zipCode}</span>
      </React.Fragment>
    );
  };

  const cityBodyTemplate = ({ lead }) => {
    return (
      <React.Fragment>
        <span>{lead.user.city}</span>
      </React.Fragment>
    );
  };

  const stateBodyTemplate = ({ lead }) => {
    return (
      <React.Fragment>
        <span>{lead.user.state}</span>
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
        <span> {formatDate(rowData.status)}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          <div className="d-flex justify-content-center">
            <span>
              <ButtonComp
                icon="home"
                onClick={(e) => {
                  e.preventDefault();
                  rowData.lead.businessLeadId = rowData.id;
                  openLeadDetailModalHandler(rowData.lead);
                }}
                toolTip="View Agency"
                btnClass="normal"
              />
            </span>
          </div>
        </span>
      </React.Fragment>
    );
  };

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
          <h4 className="filter-title">Filter By Status</h4>
          <select
            className="form-control"
            value={selectedStatus}
            onChange={onStatusChange}
          >
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
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
                emptyMessage="No Data found."
              >
                <Column
                  field="logType"
                  header="Lead Name"
                  body={nameBodyTemplate}
                  sortable
                />
                <Column
                  field="phoneNumber"
                  header="Phone Number"
                  body={phoneNumberBodyTemplate}
                  sortable
                />
                <Column
                  field="zipCode"
                  header="Zip Code"
                  body={zipCodeBodyTemplate}
                  sortable
                />
                <Column
                  field="city"
                  header="City"
                  body={cityBodyTemplate}
                  sortable
                />
                <Column
                  field="state"
                  header="State"
                  body={stateBodyTemplate}
                  sortable
                />
                <Column
                  field="createdAt"
                  header="createdAt"
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
                  field="status"
                  header="Action"
                  body={actionBodyTemplate}
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  appSize: state.global.appSize,
});

const mapDispatchToProps = {
  getAgencyLeads,
};

export default connect(mapStateToProps, mapDispatchToProps)(AgencyLeadList);
