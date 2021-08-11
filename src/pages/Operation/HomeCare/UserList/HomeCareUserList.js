import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { toastr } from "react-redux-toastr";
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
  Badge,
  InputGroup,
} from "reactstrap";
import Switch from "react-switch";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";

//redux & actions
import {
  getAllUSStates,
  getCitiesWithZipCodes,
} from "../../../../store/Actions/userAction";
import { getHomeCareUserList } from "../../../../store/Actions/homeCareAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";
import ButtonComp from "components/Common/Button/Button";
import ReactTooltip from "react-tooltip";
import MultiSelectCheckbox from "components/Common/MultiSelectbox/MultiSelectBox";
import { formatPhoneNumber } from "react-phone-number-input";
import { addPlus, formatDate, getFrontUrl } from "store/utils/util";

const HomeCareUserList = ({
  getHomeCareUserList,
  getAllUSStates,
  getCitiesWithZipCodes,
}) => {
  // declare state
  const history = useHistory();
  const [appState, updateAppState] = useState({
    activePage: 1,
    selectedStatus: "all",
    selectedState: "all",
    selectedCities: [],
    selectedZipCodes: [],
    searchText: "",
    limit: 10,
  });
  const [isLoading, toggleLoader] = useState(false);
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [stateList, updateStateList] = useState([]);
  const [stateCities, updateStateCityList] = useState([]);
  const [cityList, updateCityList] = useState([]);
  const [zipCodeList, updateZipCodeList] = useState([]);
  const {
    selectedStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    activePage,
    searchText,
    limit,
  } = appState;
  const { rows, count } = listState;

  useEffect(() => {
    getUsStatesHandler();
    getDataListHandler(
      1,
      selectedState,
      selectedCities,
      selectedZipCodes,
      searchText
    );
  }, [
    selectedStatus,
    searchText,
    activePage,
    selectedStatus,
    selectedCities,
    selectedZipCodes,
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

  const getDataListHandler = async () => {
    try {
      toggleLoader(true);
      let result = await getHomeCareUserList({
        pageNumber: activePage,
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
        selectedStatus,
        limit,
      });
      console.log("userList", result);
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
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusChange = (value) => {
    try {
      updateAppState({
        ...appState,
        selectedStatus: value,
        activePage: 1,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageChange = (pNumber) => {
    updateAppState({
      ...appState,
      activePage: pNumber,
    });
  };

  const onStateChange = async (e) => {
    try {
      const val = e.target.value;
      updateAppState({
        ...appState,
        selectedState: val,
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
        updateAppState({
          ...appState,
          selectedCities: cities,
          selectedZipCodes: newZipCodes,
          isAllSelected: false,
          activePage: 1,
        });
      } else {
        updateZipCodeList([]);
        updateAppState({
          ...appState,
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
      updateAppState({
        ...appState,
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

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{`${rowData.firstName} ${rowData.lastName}`}</span>
      </React.Fragment>
    );
  };

  const emailBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.email ? rowData.email : "N/A"}</span>
      </React.Fragment>
    );
  };

  const phoneBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.phoneNumber
            ? formatPhoneNumber(addPlus(rowData.phoneNumber))
            : "N/A"}
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
        <span>{rowData.zipcode ? rowData.zipcode : "No"}</span>
      </React.Fragment>
    );
  };

  const registeredOnBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{formatDate(rowData.createdAt)}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {
          <span>
            <div class="d-flex justify-content-center">
              {rowData.homeCare && (
                <ButtonComp
                  icon="home"
                  onClick={() => {
                    window.open(
                      `/admin/homeCare/agency/viewDetail/${rowData.homeCare.id}?name=${rowData.homeCare.title}`
                    );
                  }}
                  toolTip="View Agency"
                  btnClass="normal"
                />
              )}
              {rowData.homeCare && rowData.homeCare.slug && (
                <ButtonComp
                  icon="link"
                  onClick={() => {
                    window.open(
                      `${getFrontUrl()}/home-care/${rowData.homeCare.slug}`
                    );
                  }}
                  toolTip="Go to Page"
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
          <Breadcrumb title="operation" breadcrumbItem="user list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <label className="">Search User</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="name/ phone/ email"
                          onChange={handleSearchInput}
                          value={searchText}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-6">
                      <label className="">Filter By Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedStatus}
                        onChange={(e) => {
                          onStatusChange(e.target.value);
                        }}
                      >
                        <option value="all">All</option>
                        <option value="registered">Registered</option>
                        <option value="not-registered">Not Registered</option>
                      </select>
                    </div>
                  </div>
                  <br />

                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        {/* {count > 0 && (
                          <div className="record-counter">
                            Total Agencies Selected ({countSelectedAgencies()})
                          </div>
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
                    <>
                      <div className="datatable-responsive-demo">
                        <div className="card">
                          <DataTable
                            ref={dt}
                            value={listState.rows}
                            className="p-datatable-customers"
                            emptyMessage="No data found."
                          >
                            <Column
                              field="firstName"
                              header="Name"
                              body={nameBodyTemplate}
                              sortable
                            />
                            <Column
                              field="phoneNumber"
                              header="Phone"
                              body={phoneBodyTemplate}
                              sortable
                              style={{
                                width: "15%",
                              }}
                            />
                            <Column
                              field="email"
                              header="Email"
                              body={emailBodyTemplate}
                              sortable
                              style={{
                                width: "18%",
                              }}
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
                              field="createdAt"
                              header="Registered On"
                              body={registeredOnBodyTemplate}
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
                        {!isLoading && count > 10 && (
                          <div className="pro-pagination">
                            <Pagination
                              activePage={activePage}
                              itemsCountPerPage={limit}
                              totalItemsCount={count}
                              pageRangeDisplayed={5}
                              onChange={handlePageChange}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
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
});

const mapDispatchToProps = {
  getHomeCareUserList,
  getAllUSStates,
  getCitiesWithZipCodes,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCareUserList);
