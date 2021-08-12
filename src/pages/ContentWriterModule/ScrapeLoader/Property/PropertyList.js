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
  Button,
  Input,
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
  getPropertyList,
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

const PropertyList = ({
  getAllUSStates,
  getCitiesWithZipCodes,
  getPropertyList,
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
  const [selectedAgencies, updateSelectedAgencies] = useState([]);
  const {
    selectedImageScrapeStatus,
    selectedMonitorStatus,
    selectedCityValidationStatus,
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
    updateSelectedAgencies([]);
  }, [isAllSelected]);

  useEffect(() => {
    agencyListDataFetchHandler();
  }, [
    activePage,
    selectedImageScrapeStatus,
    selectedMonitorStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    searchText,
    selectedCityValidationStatus,
  ]);

  const clearSelection = () => {
    updateSelectedAgencies([]);
  };

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
      let result = await getPropertyList(activePage, {
        selectedImageScrapeStatus,
        selectedMonitorStatus,
        selectedCityValidationStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
      });
      if (result) {
        console.log(result);
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
      clearSelection();
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusChange = (value, statusType) => {
    try {
      if (statusType === "imageScrapeStatus") {
        updateFilterStateHandler({
          selectedImageScrapeStatus: value,
          isAllSelected: false,
          activePage: 1,
        });
        clearSelection();
      } else if (statusType === "dataMonitorStatus") {
        updateFilterStateHandler({
          selectedMonitorStatus: value,
          isAllSelected: false,
          activePage: 1,
        });
      } else if (statusType === "cityValidationStatus") {
        updateFilterStateHandler({
          selectedCityValidationStatus: value,
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
      clearSelection();
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
      clearSelection();
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
      clearSelection();
    } catch (e) {
      console.log(e);
    }
  };

  const onAgencySelection = (id) => {
    try {
      // console.log(`Id is ${id}`);
      if (id === 0) {
        updateFilterStateHandler({
          isAllSelected: !isAllSelected,
        });
      } else {
        let newAgencySelectionList;
        let isExist = selectedAgencies.filter((item) => item == id);
        if (isExist[0]) {
          newAgencySelectionList = selectedAgencies.filter(
            (item) => item !== id
          );
        } else {
          newAgencySelectionList = [...selectedAgencies, id];
        }
        updateSelectedAgencies(newAgencySelectionList);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const selectionChecker = (id) => {
    let result = selectedAgencies.filter((item) => item == id);
    if (isAllSelected) {
      if (result[0]) {
        return false;
      }
      return true;
    } else if (result[0]) {
      return true;
    }
    return false;
  };

  const countSelectedAgencies = () => {
    if (isAllSelected) {
      let totalAgencies = totalCount - selectedAgencies.length;
      return totalAgencies;
    } else {
      return selectedAgencies.length;
    }
  };

  const createProcessHandler = () => {
    try {
      if (!isAllSelected && selectedAgencies.length === 0) {
        throw "No Item has been selected";
      }
      showConfirmAlert({
        title: "Are you sure?",
        desc: "Do you want to create this process?",
        handler: async (userResult) => {
          if (userResult === 2) {
            return;
          }
          sendProcessRequest();
        },
        yesBtnText: "Yes",
        noBtnText: "No",
      });
    } catch (e) {
      toastr.error("Error", e.toString());
    }
  };

  const sendProcessRequest = async () => {
    try {
      let result = await createDataUpdateProcess("SeniorLiving", {
        ...filterState,
        selectedList: selectedAgencies,
      });
      if (result) {
        console.log("Process successfully created");
        clearSelection();
        updateFilterStateHandler({
          isAllSelected: false,
        });
      }
    } catch (e) {
      toastr.error("Error", e.toString());
    }
  };

  const updatePropertyMonitorStatusHandler = async (pId, status) => {
    try {
      // console.log(`Boom Hash ${pId}`);
      //  console.log(`Monitor Status ${status}`);
      const result = await updatePropertyMonitorStatus(pId, status);
      if (result) {
        let newRows = rows.map((item) => {
          if (item.boom_hash === pId) {
            item.monitorStatus = status;
          }
          return item;
        });
        updateListState({
          ...listState,
          rows: newRows,
        });
      }
    } catch (e) {
      console.log(e);
      toastr.error(e.toString());
    }
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const checkBodyTemplate = ({ boom_hash }) => {
    return (
      <React.Fragment>
        <span>
          <Input
            type="checkbox"
            className="form-check-Input"
            id="formrow-customCheck"
            onChange={() => {
              onAgencySelection(boom_hash);
            }}
            checked={selectionChecker(boom_hash)}
          />
        </span>
      </React.Fragment>
    );
  };

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

  const imageCodeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {" "}
          {rowData.imageDownloaded ? rowData.imageDownloaded : "N/A"}
        </span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = ({ boom_hash, monitorStatus }) => {
    return (
      <React.Fragment>
        <span>
          <select
            className="form-control form-select"
            onChange={(e) => {
              let val = e.target.value;
              updatePropertyMonitorStatusHandler(boom_hash, val);
            }}
            value={monitorStatus}
          >
            <option value="Not-Filtered">Not Filtered</option>
            <option value="Data-Updated">Data Updated</option>
            <option value="Image-Filtered">Image Filtered</option>
            <option value="Both-Filtered">Both Filtered</option>
          </select>
        </span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = ({ boom_hash, businessTitle, city, state }) => {
    return (
      <React.Fragment>
        {
          <span>
            <div class="d-flex justify-content-center">
              <ButtonComp
                icon="edit"
                onClick={() => {
                  history.push(
                    `/cw/scrape/property/edit/${boom_hash}?name=${businessTitle}`
                  );
                }}
                toolTip="Edit Property"
                btnClass="normal"
              />
              <ButtonComp
                icon="history"
                onClick={() => {
                  history.push(
                    `/cw/scrape/property/history/${boom_hash}?name=${businessTitle}`
                  );
                }}
                toolTip="Update History"
                btnClass="normal"
              />
              <ButtonComp
                icon="search"
                onClick={() => {
                  let searchTerm = `${businessTitle} ${city} ${state}`;
                  window.open(
                    "//" + "google.com/search?q=" + searchTerm,
                    "_blank"
                  );
                }}
                toolTip="Search On Google"
                btnClass="normal"
              />
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
          <Breadcrumb title="CW" breadcrumbItem="property list" />

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
                    <div className="col-md-3">
                      <label className="">Search Agency</label>
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
                    <div className="col-md-3">
                      <label className="">Filter By Image Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedImageScrapeStatus}
                        onChange={(e) => {
                          onStatusChange(e.target.value, "imageScrapeStatus");
                        }}
                      >
                        <option value="all">All</option>
                        <option value="Y">Image Scraped</option>
                        <option value="N">Not Scrapped</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="">Filter By City Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedCityValidationStatus}
                        onChange={(e) => {
                          onStatusChange(
                            e.target.value,
                            "cityValidationStatus"
                          );
                        }}
                      >
                        <option value="all">All</option>
                        <option value="N">In Valid City</option>
                        <option value="Y">Valid City</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="">Filter By Monitor Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedMonitorStatus}
                        onChange={(e) => {
                          onStatusChange(e.target.value, "dataMonitorStatus");
                        }}
                      >
                        <option value="all">All</option>
                        <option value="Not-Filtered">Not Filtered</option>
                        <option value="Data-Updated">Data Updated</option>
                        <option value="Image-Filtered">Image Filtered</option>
                        <option value="Both-Filtered">Both Filtered</option>
                      </select>
                    </div>

                    <div className="row filter-row">
                      <div className="col-md-12 text-center">
                        <Button
                          color="success"
                          className="btn btn-primary btn-lg btn-block m-3"
                          onClick={createProcessHandler}
                        >
                          Create Process
                        </Button>
                      </div>
                    </div>
                  </div>

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        {count > 0 && (
                          <div className="record-counter">
                            Total Properties Selected ({countSelectedAgencies()}
                            )
                          </div>
                        )}
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
                            // field="businessTitle"
                            header="Select"
                            body={checkBodyTemplate}
                            sortable
                            style={{
                              width: "8%",
                            }}
                          />
                          <Column
                            field="businessTitle"
                            header="Title"
                            body={titleBodyTemplate}
                            sortable
                            style={{
                              width: "15%",
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
                            field="imageDownloaded"
                            header="Image"
                            body={imageCodeBodyTemplate}
                            sortable
                          />
                          <Column
                            field="monitorStatus"
                            header="M. Status"
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
  getPropertyList,
  updatePropertyFilterStates,
  createDataUpdateProcess,
  updatePropertyMonitorStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
