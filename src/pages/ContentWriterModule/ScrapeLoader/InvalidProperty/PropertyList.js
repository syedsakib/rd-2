import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
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
} from "reactstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";

//redux & actions
import {
  getAllUSStates,
  getCitiesWithZipCodes,
} from "../../../../store/Actions/userAction";
import {
  getInvalidPropertyList,
  updatePropertyFilterStates,
  createDataUpdateProcess,
  updatePropertyMonitorStatus,
} from "../../../../store/Actions/scrapeAction";

import LoaderComponent from "components/Common/Loader/LoaderComponent";
import MultiSelectCheckbox from "components/Common/MultiSelectbox/MultiSelectBox";

import ReactTooltip from "react-tooltip";
import { formatPhoneNumber } from "react-phone-number-input";
import ButtonComp from "components/Common/Button/Button";
import { addPlus } from "store/utils/util";

const InvalidPropertyList = ({
  getAllUSStates,
  getCitiesWithZipCodes,
  getInvalidPropertyList,
  filterState,
  updatePropertyFilterStates,
  createDataUpdateProcess,
  updatePropertyMonitorStatus,
}) => {
  // declare states
  const history = useHistory();
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
    selectedFixStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    activePage,
    searchText,
    isAllSelected,
    limit,
  } = filterState;
  const { rows, count } = listState;

  useEffect(() => {
    getUsStatesHandler();
  }, []);

  useEffect(() => {
    agencyListDataFetchHandler();
  }, [
    activePage,
    selectedFixStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    searchText,
  ]);

  const getUsStatesHandler = async () => {
    try {
      let result = await getAllUSStates();
      if (result) {
        updateStateList(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const agencyListDataFetchHandler = async () => {
    try {
      toggleLoader(true);
      let result = await getInvalidPropertyList(activePage, {
        selectedFixStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
      });
      if (result) {
        console.log("result", result);
        const { rows, count } = result;
        updateListState({
          rows,
          count,
        });
        updateTotalCount(count);
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
    }
  };

  const updateFilterStateHandler = (newState) => {
    updatePropertyFilterStates({
      ...filterState,
      ...newState,
    });
  };

  const handleSearchInput = (e) => {
    try {
      let value = e.target.value;
      updateFilterStateHandler({
        searchText: value,
        isAllSelected: false,
        activePage: 1,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusChange = (value, statusType) => {
    try {
      if (statusType === "dataMonitorStatus") {
        updateFilterStateHandler({
          selectedFixStatus: value,
          isAllSelected: false,
          activePage: 1,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageChange = (pNumber) => {
    updateFilterStateHandler({
      activePage: pNumber,
    });
  };

  const onStateChange = async (e) => {
    try {
      const val = e.target.value;
      updateFilterStateHandler({
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
        }
      } else {
        updateStateCityList([]);
        updateCityList([]);
        updateZipCodeList([]);
      }
    } catch (e) {
      console.log(e);
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
        updateFilterStateHandler({
          selectedCities: cities,
          selectedZipCodes: newZipCodes,
          isAllSelected: false,
          activePage: 1,
        });
      } else {
        updateZipCodeList([]);
        updateFilterStateHandler({
          selectedCities: cities,
          selectedZipCodes: [],
          isAllSelected: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onZipCodeChange = (zips) => {
    try {
      updateFilterStateHandler({
        selectedZipCodes: zips,
        isAllSelected: false,
        activePage: 1,
      });
      if (zips.length === 0) {
        updateZipCodeList([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const titleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.businessTitle ? rowData.businessTitle : "N/A"}</span>
      </React.Fragment>
    );
  };

  const phoneBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.phone ? formatPhoneNumber(addPlus(rowData.phone)) : "N/A"}
        </span>
      </React.Fragment>
    );
  };

  const stateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.state ? rowData.state : "N/A"}</span>
      </React.Fragment>
    );
  };

  const cityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.city ? rowData.city : "N/A"}</span>
      </React.Fragment>
    );
  };

  const zipCodeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.zipcode ? rowData.zipcode : "N/A"}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.refHash ? "Fixed" : "Not-Fixed"}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {
          <span>
            <div class="d-flex justify-content-center">
              <ButtonComp
                icon="edit"
                onClick={() => {
                  history.push(
                    `/admin/scrape/invalidProperty/edit/${rowData.boom_hash}?name=${rowData.businessTitle}`
                  );
                }}
                toolTip="Fix Invalid Property"
                btnClass="normal"
              />
              <ButtonComp
                icon="search"
                onClick={() => {
                  let searchTerm = `${rowData.businessTitle} ${rowData.city} ${rowData.state}`;
                  window.open(
                    "//" + "google.com/search?q=" + searchTerm,
                    "_blank"
                  );
                }}
                toolTip="Search On Google"
                btnClass="normal"
              />
              {rowData.refHash && (
                <ButtonComp
                  icon="edit"
                  onClick={() => {
                    history.push(
                      `/admin/scrape/property/edit/${rowData.refHash}?name=${rowData.businessTitle}`
                    );
                  }}
                  toolTip="Edit Valid Property"
                  btnClass="normal"
                />
              )}
            </div>
          </span>
        }
      </React.Fragment>
    );
  };

  //TABLE COMPONENTS END

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="CW" breadcrumbItem="invalid property list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
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
                    <div className="col-md-6">
                      <label className="">Search Property</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="property name / phone / email"
                          onChange={handleSearchInput}
                          value={searchText}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-6">
                      <label className="">Filter By Status</label>
                      <select
                        className="form-control form-group"
                        value={selectedFixStatus}
                        onChange={(e) => {
                          onStatusChange(e.target.value, "dataMonitorStatus");
                        }}
                      >
                        <option value="all">All</option>
                        <option value="1">Not Fixed</option>
                        <option value="2">Fixed</option>
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
                            field="businessTitle"
                            header="Title"
                            body={titleBodyTemplate}
                            sortable
                            style={{
                              width: "20%",
                            }}
                          />
                          <Column
                            field="phone"
                            header="Phone"
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
                            field="zipcode"
                            header="ZipCode"
                            body={zipCodeBodyTemplate}
                            sortable
                          />
                          <Column
                            field="refHash"
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
                    {!isLoading && count > limit && (
                      <div className="pro-pagination">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={limit}
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

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
  filterState: state.scrape.propertyFilterState,
});

const mapDispatchToProps = {
  getAllUSStates,
  getCitiesWithZipCodes,
  getInvalidPropertyList,
  updatePropertyFilterStates,
  createDataUpdateProcess,
  updatePropertyMonitorStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvalidPropertyList);
