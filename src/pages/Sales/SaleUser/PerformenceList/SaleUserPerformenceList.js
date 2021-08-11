import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
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
} from "reactstrap";
import DatePicker from "react-datepicker";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";
import {
  formatDate,
  calculatePercentage,
  addPlus,
  getCurrentDate,
  getFirstMonthDate,
  getQueryParams,
} from "../../../../store/utils/util";

//redux & actions
import {
  getUserSaleList,
  countSaleUserEarning,
} from "../../../../store/Actions/salesAction";
import { formatPhoneNumber } from "react-phone-number-input";
import ButtonComp from "components/Common/Button/Button";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const SaleUserPerformenceList = ({
  userDetails,
  appSize,
  getUserSaleList,
  countSaleUserEarning,
  match: { params },
  location,
}) => {
  // declare states
  const [appState, updateAppState] = useState({
    activePage: 1,
    startDate: getFirstMonthDate(),
    endDate: getCurrentDate(),
    selectedStatus: "all",
    searchText: "",
  });
  const [isLoading, toggleLoader] = useState(false);
  const [isCalculating, toggleCalculator] = useState(false);
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [totalEarning, updateTotalEarning] = useState(0);
  const [queryParams, updateQueryParams] = useState(null);
  const [modalData, updateModalData] = useState({
    isDetailModalOpen: false,
    modalBodyData: null,
  });

  const { selectedStatus, startDate, endDate, activePage, searchText } =
    appState;
  const { rows, count } = listState;
  const { isDetailModalOpen, modalBodyData } = modalData;

  useEffect(() => {
    let qParams = getQueryParams(location.search);
    updateQueryParams(qParams);
  }, []);

  useEffect(() => {
    if (params && params.id) {
      getAllDataList();
    }
  }, [selectedStatus, startDate, endDate, activePage, searchText]);

  useEffect(() => {
    fetchTotalEarningHandler();
  }, [selectedStatus, startDate, endDate, searchText]);

  const getAllDataList = async () => {
    try {
      toggleLoader(true);
      let result = await getUserSaleList({
        pageNumber: activePage,
        startDate,
        endDate,
        selectedStatus,
        searchText,
        userId: params && params.id,
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

  const fetchTotalEarningHandler = async () => {
    try {
      toggleCalculator(true);
      let result = await countSaleUserEarning({
        startDate,
        endDate,
        selectedStatus,
        searchText,
        userId: params && params.id,
      });
      console.log(result);
      if (result || result === 0) {
        console.log(result);
        updateTotalEarning(result);
      }
      toggleCalculator(false);
    } catch (e) {
      toggleCalculator(false);
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

  const handleSearchInput = (e) => {
    try {
      let value = e.target.value;
      updateAppState({
        ...appState,
        searchText: value,
      });
    } catch (e) {
      console.log(e);
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

  const toggleDataViewerModal = (data) => {
    updateModalData({
      ...modalData,
      isDetailModalOpen: !isDetailModalOpen,
      modalBodyData: data,
    });
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const titleByBodyTemplate = ({ profile }) => {
    return (
      <React.Fragment>
        <span>
          {profile.title.length > 15
            ? rowData.title.substring(0, 15)
            : rowData.title}
        </span>
      </React.Fragment>
    );
  };

  const phoneNumberBodyTemplate = ({ profile }) => {
    return (
      <React.Fragment>
        <span>{formatPhoneNumber(addPlus(profile.phoneNumber))}</span>
      </React.Fragment>
    );
  };

  const packageBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{`${rowData.packageTitle} (${rowData.quantity})`}</span>
      </React.Fragment>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{`$${rowData.basePrice}`}</span>
      </React.Fragment>
    );
  };

  const paymentMethodBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.paymentMethod}</span>
      </React.Fragment>
    );
  };

  const processedOnBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{formatDate(rowData.processedOn)}</span>
      </React.Fragment>
    );
  };

  const firstPurchaseBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.isFirstPurchase === 1 ? "Yes" : "No"}</span>
      </React.Fragment>
    );
  };

  const comissionBodyTemplate = (rowData) => {
    let commission = 5;
    if (rowData.isFirstPurchase === 1) {
      commission = 10;
    }
    let commissionAmount = calculatePercentage(basePrice, commission);
    return (
      <React.Fragment>
        <span>{`$${commissionAmount} (${commission}%)`}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = ({ profile }) => {
    return (
      <React.Fragment>
        {
          <span>
            <div class="d-flex justify-content-center">
              <span>
                <ButtonComp
                  icon="eye"
                  onClick={(e) => {
                    window.open(
                      `/admin/sales/agency/viewDetail/${profile.agencyId}?name=${profile.title}`
                    );
                  }}
                  toolTip="View Detail"
                  btnClass="normal"
                />
              </span>
            </div>
          </span>
        }
      </React.Fragment>
    );
  };

  //TABLE COMPONENTS END
  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb
            title="Admin"
            breadcrumbItem="sale user performanceList List"
          />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  {" "}
                  <div className="row">
                    <div className="col-md-6 my-auto">
                      <span>{queryParams && queryParams.name}'s </span>
                      Performance
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
                      <label className="">Search Agency</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="title / name / phone / email "
                          onChange={handleSearchInput}
                          value={searchText}
                        />
                      </InputGroup>
                    </div>
                  </div>

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6 d-flex justify-content-start">
                        <h3 className="">Total Earning</h3>
                        <h4
                          className="p-1 font-weight-semibold"
                          style={{ color: "#f46a6a" }}
                        >
                          {isCalculating
                            ? "Calculating..."
                            : `$${totalEarning}`}
                        </h4>
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
                          field="title"
                          header="Title"
                          body={titleByBodyTemplate}
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
                          header="Package"
                          body={packageBodyTemplate}
                          sortable
                        />
                        <Column
                          field="city"
                          header="Price"
                          body={priceBodyTemplate}
                          sortable
                        />
                        <Column
                          field="state"
                          header=" Payment Method"
                          body={paymentMethodBodyTemplate}
                          sortable
                        />
                        <Column
                          field="saleStatus"
                          header=" Processed On"
                          body={processedOnBodyTemplate}
                          sortable
                        />
                        <Column
                          field="saleStatus"
                          header="First Purchase"
                          body={firstPurchaseBodyTemplate}
                          sortable
                        />
                        <Column
                          field="saleStatus"
                          header="Commission"
                          body={comissionBodyTemplate}
                          sortable
                        />
                        <Column
                          field="action"
                          header="Action"
                          body={actionBodyTemplate}
                          sortable
                          //   style={{
                          //     width: "30%",
                          //   }}
                        />
                      </DataTable>
                    </div>
                  </div>

                  <div>
                    {!isLoading && rows && rows.length > 0 && (
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
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  homeCare: state.homeCare,
  appSize: state.global.appSize,
});

const mapDispatchToProps = {
  getUserSaleList,
  countSaleUserEarning,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleUserPerformenceList);
