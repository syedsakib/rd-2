import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

import {
  formatDate,
  getFirstMonthDate,
  getCurrentDate,
} from "../../../../store/utils/util";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import { getAgencyTransactions } from "../../../../store/Actions/salesAction";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./DataTableDemo.css";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AgencyTransactionList = ({
  userDetails,
  appSize,
  getAgencyTransactions,
  agencyId,
}) => {
  const [appState, updateAppState] = useState({
    activePage: 1,
    startDate: getFirstMonthDate(),
    endDate: getCurrentDate(),
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
    getAllLeadList();
  }, [selectedStatus, startDate, endDate, activePage, agencyId]);

  const getAllLeadList = async () => {
    try {
      toggleLoader(true);
      let result = await getAgencyTransactions({
        pageNumber: activePage,
        startDate,
        endDate,
        selectedStatus,
        agencyId,
      });
      if (result) {
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

  const packageBodyTemplate = ({ packageTitle, quantity }) => {
    return (
      <React.Fragment>
        <span>{`${packageTitle} ${quantity}`}</span>
      </React.Fragment>
    );
  };

  const priceBodyTemplate = ({ basePrice }) => {
    return (
      <React.Fragment>
        <span>{`$${basePrice}`}</span>
      </React.Fragment>
    );
  };

  const paymentBodyBodyTemplate = ({ paymentMethod }) => {
    return (
      <React.Fragment>
        <span>{paymentMethod}</span>
      </React.Fragment>
    );
  };

  const processedOnBodyTemplate = ({ processedOn }) => {
    return (
      <React.Fragment>
        <span>{processedOn}</span>
      </React.Fragment>
    );
  };

  const firstPurchaseBodyTemplate = ({ isFirstPurchase }) => {
    return (
      <React.Fragment>
        <span> {isFirstPurchase === 1 ? "Yes" : "No"}</span>
      </React.Fragment>
    );
  };

  const assignedToBodyTemplate = ({ sales }) => {
    return (
      <React.Fragment>
        <span>
          {sales && sales.saleUser
            ? `${sales.saleUser.firstName} ${sales.saleUser.lastName}`
            : " N/A"}
        </span>
      </React.Fragment>
    );
  };

  return (
    <div className="list-wrapper">
      <div className="row filter-row">
        <div className="col-md-6">
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
        <div className="col-md-6">
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
                  header="Package"
                  body={packageBodyTemplate}
                  sortable
                />
                <Column
                  field="phoneNumber"
                  header="Price"
                  body={priceBodyTemplate}
                  sortable
                />
                <Column
                  field="zipCode"
                  header="Payment Method"
                  body={paymentBodyBodyTemplate}
                  sortable
                />
                <Column
                  field="city"
                  header="Processed On"
                  body={processedOnBodyTemplate}
                  sortable
                />
                <Column
                  field="state"
                  header="First Purchase"
                  body={firstPurchaseBodyTemplate}
                  sortable
                />
                <Column
                  field="createdAt"
                  header="Assigned To"
                  body={assignedToBodyTemplate}
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  appSize: state.global.appSize,
});

const mapDispatchToProps = {
  getAgencyTransactions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgencyTransactionList);
