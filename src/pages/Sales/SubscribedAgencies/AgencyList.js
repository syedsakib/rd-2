import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  Badge,
} from "reactstrap";
import { toastr } from "react-redux-toastr";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./DataTableDemo.css";
import Select from "react-select";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { formatDate, formatNumber } from "../../../store/utils/util";
import ButtonComp from "components/Common/Button/Button";
import MultiSelectBox from "components/Common/MultiSelectbox/MultiSelectBox";

//redux & actions
import {
  getInternalUserList,
  updateInternalUserStatus,
  getRoleTypeList,
} from "../../../store/Actions/roleAction";
import { getCorporateList } from "../../../store/Actions/corporateAction";
import {
  getAllUSStates,
  getCitiesWithZipCodes,
} from "../../../store/Actions/userAction";
import {
  getHomeCareAgencyList,
  getSaleUsers,
  assignBusinessToSales,
} from "../../../store/Actions/salesAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AgencyList = ({
  getHomeCareAgencyList,
  getAllUSStates,
  getCitiesWithZipCodes,
  getSaleUsers,
}) => {
  // declare states
  const history = useHistory();
  const [appState, updateAppState] = useState({
    activePage: 1,
    selectedAssignStatus: "",
    selectedClaimStatus: "",
    selectedState: "all",
    selectedCities: [],
    selectedZipCodes: [],
    searchText: "",
    selectedUser: 0,
    isAllSelected: false,
    maxLimit: "all",
    selectedSaleStatus: "subscribed",
  });
  const [isLoading, toggleLoader] = useState(false);
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [totalCount, updateTotalCount] = useState(0);
  const [stateList, updateStateList] = useState([]);
  const [stateCities, updateStateCityList] = useState([]);
  const [cityList, updateCityList] = useState([]);
  const [zipCodeList, updateZipCodeList] = useState([]);
  const {
    selectedAssignStatus,
    selectedClaimStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    activePage,
    searchText,
    selectedSaleStatus,
    maxLimit,
  } = appState;
  const { rows, count } = listState;

  useEffect(() => {
    getUsStatesHandler();
    agencyListDataFetchHandler();
  }, []);
  console.log("cityList", cityList);
  const getUsStatesHandler = async () => {
    try {
      let result = await getAllUSStates();
      if (result) {
        updateStateList(result);
      }
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const agencyListDataFetchHandler = async (
    activePage = 1,
    selectedAssignStatus,
    selectedClaimStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    searchText,
    mxLimit,
    slStatus
  ) => {
    try {
      toggleLoader(true);
      let result = await getHomeCareAgencyList(activePage, {
        selectedAssignStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
        mxLimit,
        selectedSaleStatus: slStatus || selectedSaleStatus,
      });
      if (result) {
        console.log(result);
        const { rows, count } = result;
        updateListState({
          rows,
          count,
        });
        updateTotalCount(getTotalCount(maxLimit, count));
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
        isAllSelected: false,
        activePage: 1,
      });
      agencyListDataFetchHandler(
        1,
        selectedAssignStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        value,
        maxLimit,
        selectedSaleStatus
      );
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const onStatusChange = (value, statusType) => {
    try {
      if (statusType === "assignStatus") {
        updateAppState({
          ...appState,
          selectedAssignStatus: value,
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
          searchText,
          maxLimit,
          selectedSaleStatus
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
          selectedAssignStatus,
          value,
          selectedState,
          selectedCities,
          selectedZipCodes,
          searchText,
          maxLimit,
          selectedSaleStatus
        );
      } else if (statusType === "saleStatus") {
        updateAppState({
          selectedSaleStatus: value,
          activePage: 1,
        });
        agencyListDataFetchHandler(
          1,
          selectedAssignStatus,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          selectedZipCodes,
          searchText,
          maxLimit,
          value
        );
      } else if (statusType === "maxLimit") {
        console.log(`Entered MaxLimit`);
        updateAppState({
          ...appState,
          isAllSelected: false,
          activePage: 1,
          maxLimit: value,
        });
        updateTotalCount(getTotalCount(value, count));
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
    console.log(`Selected State is ${selectedState}`);
    agencyListDataFetchHandler(
      pNumber,
      selectedAssignStatus,
      selectedClaimStatus,
      selectedState,
      selectedCities,
      selectedZipCodes,
      searchText,
      maxLimit,
      selectedSaleStatus
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
            selectedAssignStatus,
            selectedClaimStatus,
            val,
            [],
            [],
            searchText,
            maxLimit,
            selectedSaleStatus
          );
        }
      } else {
        updateStateCityList([]);
        updateCityList([]);
        updateZipCodeList([]);

        agencyListDataFetchHandler(
          1,
          selectedAssignStatus,
          selectedClaimStatus,
          "all",
          [],
          [],
          searchText,
          maxLimit,
          selectedSaleStatus
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
          selectedAssignStatus,
          selectedClaimStatus,
          selectedState,
          cities,
          newZipCodes,
          searchText,
          maxLimit,
          selectedSaleStatus
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
          selectedAssignStatus,
          selectedClaimStatus,
          selectedState,
          cities,
          [],
          searchText,
          maxLimit,
          selectedSaleStatus
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
          selectedAssignStatus,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          [],
          searchText,
          maxLimit,
          selectedSaleStatus
        );
      } else {
        agencyListDataFetchHandler(
          1,
          selectedAssignStatus,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          zips,
          searchText,
          maxLimit,
          selectedSaleStatus
        );
      }
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const getTotalCount = (newLimit, resultCount) => {
    console.log(`Count is ${newLimit}`);
    if (newLimit !== "all") {
      return resultCount > newLimit ? newLimit : resultCount;
    }
    return resultCount;
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const titleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.title}</span>
      </React.Fragment>
    );
  };

  const phoneBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.phoneNumber ? formatNumber(`${rowData.phoneNumber}`) : "N/A"}
        </span>
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

  const cityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.city ? rowData.city : "N/A"}</span>
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

  const saleStatusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.saleStatus ? (
            <Badge
              className="me-1 rounded-pill bg-success"
              style={{ padding: "5px 10px 5px 10px" }}
            >
              {rowData.saleStatus}
            </Badge>
          ) : (
            <Badge
              className="me-1 rounded-pill bg-danger"
              style={{ padding: "5px 10px 5px 10px" }}
            >
              Not-contacted
            </Badge>
          )}
        </span>
      </React.Fragment>
    );
  };

  const isAssignedBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.isAssigned === 1 ? (
            <Badge
              className="me-1 rounded-pill bg-success"
              style={{ padding: "5px 10px 5px 10px" }}
            >
              Yes
            </Badge>
          ) : (
            <Badge
              className="me-1 rounded-pill bg-danger"
              style={{ padding: "5px 10px 5px 10px" }}
            >
              No
            </Badge>
          )}
        </span>
      </React.Fragment>
    );
  };

  const isClaimedBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.isClaimed === 1 ? (
            <Badge
              className="me-1 rounded-pill bg-success"
              style={{ padding: "5px 10px 5px 10px" }}
            >
              Yes
            </Badge>
          ) : (
            <Badge
              className="me-1 rounded-pill bg-danger"
              style={{ padding: "5px 10px 5px 10px" }}
            >
              No
            </Badge>
          )}
        </span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = ({ id, title }) => {
    return (
      <React.Fragment>
        {
          <span>
            <div className="d-flex justify-content-center">
              <span>
                <ButtonComp
                  icon="home"
                  onClick={() => {
                    window.open(
                      `/admin/sales/agency/viewDetail/${id}?name=${title}`
                    );
                  }}
                  toolTip="View Agency"
                  btnClass="normal"
                />
              </span>
              <span>
                <ButtonComp
                  icon="history"
                  onClick={() => {
                    window.open(
                      `/admin/sales/agency/assignHistory/${id}?name=${title}`
                    );
                  }}
                  toolTip="Assign History"
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
          <Breadcrumb title="Admin" breadcrumbItem="sales agency list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
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
                      <label className="">Filter By State</label>
                      <select
                        className="form-control form-select"
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
                    <div className="col-md-4 cityList">
                      <label className="">Filter By City</label>
                      <MultiSelectBox
                        optionList={cityList}
                        onSelectHandler={onCityChange}
                        selectedValue={selectedCities}
                        placeholder="All"
                        filterType="city"
                        id="agency-city-select"
                        className="form-control form-select"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row filter-row">
                    <div className="col-md-4">
                      <label className="">Filter By ZipCode</label>
                      <MultiSelectBox
                        optionList={zipCodeList}
                        onSelectHandler={onZipCodeChange}
                        selectedValue={selectedZipCodes}
                        placeholder="All"
                        filterType="zipCode"
                        id="agency-zip-select"
                        className="form-control form-select"
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="">Filter By Assign State</label>
                      <select
                        className="form-control form-select"
                        value={selectedAssignStatus}
                        onChange={(e) => {
                          onStatusChange(e.target.value, "assignStatus");
                        }}
                      >
                        <option value="all">All</option>
                        <option value={0}>Not Assigned</option>
                        <option value={1}>Assigned</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="">Filter By Sale State</label>
                      <select
                        className="form-control form-select"
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
                        <option value="paused">Paused</option>
                        <option value="followup">Followup</option>
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
                        emptyMessage="No Agencies found."
                      >
                        <Column
                          field="title"
                          header="Title"
                          body={titleBodyTemplate}
                          sortable
                        />
                        <Column
                          field="phoneNumber"
                          header="Phone Number"
                          body={phoneBodyTemplate}
                          sortable
                        />
                        <Column
                          field="state"
                          header="State"
                          body={stateBodyTemplate}
                          sortable
                        />
                        <Column
                          field="city"
                          header="City"
                          body={cityBodyTemplate}
                          sortable
                        />
                        <Column
                          field="zipCode"
                          header="Zip Code"
                          body={zipCodeBodyTemplate}
                          sortable
                        />
                        <Column
                          field="saleStatus"
                          header="Sale Status"
                          body={saleStatusBodyTemplate}
                          sortable
                        />
                        <Column
                          field="isAssigned"
                          header="Is Assigned"
                          body={isAssignedBodyTemplate}
                          sortable
                        />
                        <Column
                          field="isClaimed"
                          header="Is Claimed"
                          body={isClaimedBodyTemplate}
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
                    {count > 10 && (
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
  );
};

function mapStateToProps(state, ownProps) {
  return {};
}

const mapDispatchToProps = {
  getHomeCareAgencyList,
  getAllUSStates,
  getCitiesWithZipCodes,
  getSaleUsers,
  assignBusinessToSales,
};

export default connect(mapStateToProps, mapDispatchToProps)(AgencyList);
