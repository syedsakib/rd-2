import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import { toastr } from "react-redux-toastr";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  InputGroup,
} from "reactstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";
import { getQueryParams } from "../../../../store/utils/util";

//redux & actions
import {
  getAssignedAgencyList,
  getSaleUserRegions,
  updateAgencySaleStatus,
  exportAssignedAgencyList,
  getSalesUserStates,
} from "../../../../store/Actions/salesAction";
import { getEmailTemplate } from "../../../../store/Actions/mailAction";
import {
  getAllUSStates,
  getCitiesWithZipCodes,
} from "../../../../store/Actions/userAction";
import { formatPhoneNumber } from "react-phone-number-input";
import MultiSelectCheckbox from "components/Common/MultiSelectbox/MultiSelectBox";
import ButtonComp from "components/Common/Button/Button";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AssignedAgencyList = ({
  getAssignedAgencyList,
  getCitiesWithZipCodes,
  exportAssignedAgencyList,
  getSalesUserStates,
  match: { params },
  location,
}) => {
  // declare states
  const history = useHistory();
  const [appState, updateAppState] = useState({
    activePage: 1,
    selectedSaleStatus: "all",
    selectedClaimStatus: "",
    selectedState: "all",
    selectedCities: [],
    selectedZipCodes: [],
    searchText: "",
    selectedUser: 0,
    isAllSelected: false,
    isFileExporting: false,
  });
  const [queryParams, updateQueryParams] = useState(null);
  const [isLoading, toggleLoader] = useState(false);
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [modalData, updateModalData] = useState({
    isDetailModalOpen: false,
    modalBodyData: null,
  });
  const [stateList, updateStateList] = useState([]);
  const [stateCities, updateStateCityList] = useState([]);
  const [cityList, updateCityList] = useState([]);
  const [zipCodeList, updateZipCodeList] = useState([]);
  const {
    selectedSaleStatus,
    selectedClaimStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    activePage,
    searchText,
    isFileExporting,
  } = appState;
  const { rows, count } = listState;
  const { isDetailModalOpen, modalBodyData } = modalData;

  useEffect(() => {
    let qParams = getQueryParams(location.search);
    updateQueryParams(qParams);
    if (params && params.id) {
      getUsStatesHandler();
      agencyListDataFetchHandler();
    }
  }, []);

  const getUsStatesHandler = async () => {
    try {
      let result = await getSalesUserStates(params.id);
      console.log(result);
      if (result) {
        let sList = result.map((item) => ({ state_name: item.state }));
        updateStateList(sList);
      }
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const agencyListDataFetchHandler = async (
    activePage = 1,
    selectedSaleStatus,
    selectedClaimStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    searchText
  ) => {
    try {
      toggleLoader(true);
      let result = await getAssignedAgencyList(activePage, {
        selectedSaleStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
        userId: params && params.id,
      });
      if (result) {
        // console.log(result);
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

  const handleSearchInput = (e) => {
    try {
      let value = e.target.value;
      updateAppState({
        ...appState,
        searchText: value,
        activePage: 1,
      });
      agencyListDataFetchHandler(
        1,
        selectedSaleStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        value
      );
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const onStatusChange = (value, statusType) => {
    try {
      if (statusType === "saleStatus") {
        updateAppState({
          ...appState,
          selectedSaleStatus: value,
          isAllSelected: false,
          activePage: 1,
        });
        agencyListDataFetchHandler(
          1,
          value,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          selectedZipCodes,
          searchText
        );
      } else if (statusType === "claimStatus") {
        updateAppState({
          ...appState,
          selectedClaimStatus: value,
          isAllSelected: false,
          activePage: 1,
        });
        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          value,
          selectedState,
          selectedCities,
          selectedZipCodes,
          searchText
        );
      }
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
    agencyListDataFetchHandler(
      pNumber,
      selectedSaleStatus,
      selectedClaimStatus,
      selectedState,
      selectedCities,
      selectedZipCodes,
      searchText,
      false
    );
  };

  const onStateChange = async (e) => {
    try {
      const val = e.target.value;
      updateAppState({
        ...appState,
        selectedState: val,
        isAllSelected: false,
        activePage: 1,
      });
      if (val !== "all") {
        let result = await getCitiesWithZipCodes(val);
        if (result) {
          const cities = [...new Set(result.map((item) => item.city))];
          updateStateCityList(result);
          updateCityList(
            cities.map((item) => ({ value: item, text: item, key: item }))
          );
          agencyListDataFetchHandler(
            1,
            selectedSaleStatus,
            selectedClaimStatus,
            val,
            [],
            [],
            searchText
          );
        }
      } else {
        updateStateCityList([]);
        updateCityList([]);
        updateZipCodeList([]);

        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          selectedClaimStatus,
          "all",
          [],
          [],
          searchText
        );
      }
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const onCityChange = async (cities) => {
    try {
      if (cities.length > 0) {
        let allZipList = [];
        for (let c of cities) {
          let zips = stateCities
            .filter((item) => item.city === c)
            .map((item) => ({
              value: item.zip,
              text: item.zip,
              key: item.zip,
            }));
          allZipList = [...allZipList, ...zips];
        }
        updateZipCodeList(allZipList);
        let newZipCodes = selectedZipCodes.filter((item) => {
          let result = allZipList.filter((it) => it.key === item);
          if (result[0]) {
            return item;
          }
          return null;
        });
        updateAppState({
          ...appState,
          selectedCities: cities,
          selectedZipCodes: newZipCodes,
          isAllSelected: false,
          activePage: 1,
        });

        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          selectedClaimStatus,
          selectedState,
          cities,
          newZipCodes,
          searchText
        );
      } else {
        updateZipCodeList([]);
        updateAppState({
          ...appState,
          selectedCities: cities,
          selectedZipCodes: [],
          isAllSelected: false,
        });

        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          selectedClaimStatus,
          selectedState,
          cities,
          [],
          searchText
        );
      }
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const onZipCodeChange = (zips) => {
    try {
      updateAppState({
        ...appState,
        selectedZipCodes: zips,
        isAllSelected: false,
        activePage: 1,
      });
      if (zips.length === 0) {
        updateZipCodeList([]);
        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          [],
          searchText
        );
      } else {
        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          zips,
          searchText
        );
      }
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const exportDataList = async () => {
    try {
      updateAppState({
        ...appState,
        isFileExporting: true,
      });
      let result = await exportAssignedAgencyList({
        selectedSaleStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
      });
      updateAppState({
        ...appState,
        isFileExporting: false,
      });
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const titleByBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.title.length > 15
            ? rowData.title.substring(0, 15)
            : rowData.title}
        </span>
      </React.Fragment>
    );
  };

  const phoneNumberBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.phoneNumber ? formatPhoneNumber(rowData.phoneNumber) : "N/A"}
        </span>
      </React.Fragment>
    );
  };

  const zipCodeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.zipCode ? rowData.zipCode : "N/A"}</span>
      </React.Fragment>
    );
  };

  const cityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.city ? rowData.city : "N/A"}</span>
      </React.Fragment>
    );
  };

  const stateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.state ? rowData.state : "N/A"}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.saleStatus || "Not Contacted"}</span>
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
                <ButtonComp
                  icon="eye"
                  onClick={(e) => {
                    history.push({
                      pathname: `/sales/agency/${rowData.id}`,
                      pageNo: activePage,
                    });
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
          <Breadcrumb title="Admin" breadcrumbItem="assisted agency list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  {" "}
                  <div className="row">
                    <div className="col-md-6 my-auto">
                      {" "}
                      <span>{queryParams && queryParams.name}'s</span> Agencies
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-4">
                      <label className="">Filter By State</label>
                      <select
                        className="form-control"
                        value={selectedState}
                        onChange={onStateChange}
                      >
                        <option value="all">All</option>
                        {stateList &&
                          stateList.map(({ state_name }, index) => {
                            return (
                              <option value={state_name} key={`s-${index}`}>
                                {state_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="">Filter By City</label>
                      <MultiSelectCheckbox
                        optionList={cityList}
                        onSelectHandler={onCityChange}
                        selectedValue={selectedCities}
                        placeholder="All"
                        filterType="city"
                        id="agency-city-select"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="">Filter By ZipCode</label>
                      <MultiSelectCheckbox
                        optionList={zipCodeList}
                        onSelectHandler={onZipCodeChange}
                        selectedValue={selectedZipCodes}
                        placeholder="All"
                        filterType="zipCode"
                        id="agency-zip-select"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row filter-row">
                    <div className="col-md-4">
                      <label className="">Search Agency</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i className="fas fa-search-plus"></i>
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
                    <div className="col-md-4">
                      <label className="">Filter By Sale Status</label>
                      <select
                        className="form-control"
                        value={selectedSaleStatus}
                        onChange={(e) => {
                          onStatusChange(e.target.value, "saleStatus");
                        }}
                      >
                        <option value="all">All</option>
                        <option value="not-contacted">Not-Contacted</option>
                        <option value="contacted">Contacted</option>
                        <option value="emailed">Emailed</option>
                        <option value="registered">Registered</option>
                        <option value="subscribed">Subscribed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="followup">Followup</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="">Filter By Claim Status</label>
                      <select
                        className="form-control"
                        value={selectedClaimStatus}
                        onChange={(e) => {
                          onStatusChange(e.target.value, "claimStatus");
                        }}
                      >
                        <option value="all">All</option>
                        <option value={0}>Not Claimed</option>
                        <option value={1}>Claimed</option>
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
                          header="ZipCode"
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
                          field="saleStatus"
                          header="Status"
                          body={statusBodyTemplate}
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
  appSize: state.global.appSize,
});

const mapDispatchToProps = {
  getAssignedAgencyList,
  updateAgencySaleStatus,
  getSaleUserRegions,
  getAllUSStates,
  getCitiesWithZipCodes,
  getEmailTemplate,
  exportAssignedAgencyList,
  getSalesUserStates,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignedAgencyList);
