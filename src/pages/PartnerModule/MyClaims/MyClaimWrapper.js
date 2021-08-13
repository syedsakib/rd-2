import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
  Badge,
} from "reactstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { generatePropertyUrl, getFrontUrl } from "../../../store/utils/util";
import ButtonComp from "components/Common/Button/Button";

//redux & actions
import {
  getAllClaimListOfPartner,
  searchPropertyList,
  claimYourProperty,
} from "../../../store/Actions/partnerAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";
import SearchSelect from "components/Common/SearchSelect/SearchSelect";

const MyClaimWrapper = ({
  getAllClaimListOfPartner,
  searchPropertyList,
  claimYourProperty,
}) => {
  // declare states
  const history = useHistory();
  const [isLoading, toggleLoader] = useState(false);
  const [suggestedProperty, updateSuggestedProperty] = useState([]);
  const [filterState, updateFilterState] = useState({
    activePage: 1,
    limit: 20,
    searchText: "",
    selectedStatus: "all",
  });
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });

  // extract states
  const { rows, count } = listState;
  const { limit, activePage, searchText, selectedStatus } = filterState;

  // app functions
  useEffect(() => {
    getDataList();
  }, [activePage, selectedStatus]);

  const updateFilterStateHandler = (newState) => {
    updateFilterState({
      ...filterState,
      ...newState,
    });
  };

  const getDataList = async () => {
    try {
      toggleLoader(true);
      let result = await getAllClaimListOfPartner({
        limit,
        activePage,
        searchText,
        selectedStatus,
      });
      console.log("Claim List", result);
      if (result) {
        let { rows, count } = result;
        updateListState({ rows, count });
      }
      toggleLoader(false);
    } catch (e) {
      toggleLoader(false);
      console.log(e);
    }
  };

  const handleSelectSearch = async (value) => {
    let val = value;
    updateFilterStateHandler({
      searchText: value,
    });
    if (val && val.trim() !== "") {
      let result = await searchPropertyList({ keyword: val, limit: 20 });
      console.log("pList", result);
      if (result) {
        let optionList = result.map((item) => ({
          label: `${item.businessTitle} (${item.city}, ${item.state} ${item.zipcode})`,
          value: item,
        }));
        updateSuggestedProperty(optionList);
      }
    }
  };

  const onPropertySelectHandler = (value) => {
    if (value) {
      const { state, city, zipcode, slug, businessTitle } = value;
      let createUrl = generatePropertyUrl("senior-living", state, city, slug);
      window.open(
        `${getFrontUrl()}${createUrl}`,
        businessTitle,
        "width:600,height:800"
      );
    }
  };

  const onViewSelect = (value) => {
    try {
      if (value) {
        const { state, city, zipcode, slug, businessTitle } = value;
        let createUrl = generatePropertyUrl("senior-living", state, city, slug);
        window.open(
          `${getFrontUrl()}${createUrl}`,
          businessTitle,
          "width:600,height:800"
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClaimSelect = async (value) => {
    try {
      if (value) {
        const { state, city, zipcode, slug, businessTitle, id } = value;
        let result = await claimYourProperty(id);
        console.log(`result: `, result);
        if (result) {
          let newList = suggestedProperty.filter((item) => item.value.id != id);
          console.log(`New List `, newList);
          updateSuggestedProperty(newList);
          getDataList();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchInput = (e) => {
    try {
      let value = e.target.value;
      updateFilterStateHandler({
        searchText: value,
        activePage: 1,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onStatusChange = (e) => {
    try {
      let value = e.target.value;
      updateFilterStateHandler({
        selectedStatus: value,
        activePage: 1,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageChange = (pNumber) => {
    updateFilterStateHandler({
      activePage: pNumber,
    });
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const nameBodyTemplate = ({ property }) => {
    return (
      <React.Fragment>
        <span>{property.businessTitle ? property.businessTitle : "N/A"}</span>
      </React.Fragment>
    );
  };

  const emailBodyTemplate = ({ property }) => {
    return (
      <React.Fragment>
        <span>{property.email ? property.email : "N/A"}</span>
      </React.Fragment>
    );
  };

  const cityBodyTemplate = ({ property }) => {
    return (
      <React.Fragment>
        <span>{property.city ? property.city : "N/A"}</span>
      </React.Fragment>
    );
  };

  const stateBodyTemplate = ({ property }) => {
    return (
      <React.Fragment>
        <span>{property.state ? property.state : "N/A"}</span>
      </React.Fragment>
    );
  };

  const zipCodeBodyTemplate = ({ property }) => {
    return (
      <React.Fragment>
        <span>{rowData.zipcode ? rowData.zipcode : "N/A"}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.status ? rowData.status : "N/A"}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = ({ property, status, isNewProperty }) => {
    const {
      careTypes,
      state,
      city,
      status: pStatus,
      id: propertyId,
      slug,
    } = property;

    let pUrl;
    if (careTypes && careTypes[0] && careTypes[0].typeDetail) {
      let cTitle = careTypes[0].typeDetail.title;
      let frontUrl = getFrontUrl();
      pUrl = generatePropertyUrl(cTitle, state, city, slug);
      pUrl = `${frontUrl}${pUrl}`;
    }
    return (
      <React.Fragment>
        {
          <span>
            <div className="d-flex justify-content-center">
              {pStatus && (
                <div className="table-action-btn-box">
                  <ButtonComp
                    icon="link"
                    onClick={(e) => {
                      window.open(pUrl);
                    }}
                    toolTip="View Page"
                    btnClass="normal"
                  />
                </div>
              )}
              {isNewProperty === 1 || status === "Approved" ? (
                <div className="table-action-btn-box">
                  <ButtonComp
                    icon="edit"
                    onClick={(e) => {
                      history.push(`/partner/edit/${propertyId}`);
                    }}
                    toolTip="Edit"
                    btnClass="normal"
                  />
                </div>
              ) : null}
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
          <Breadcrumb title="partner" breadcrumbItem="my claim list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">My Claims</div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <SearchSelect
                        onChange={handleSelectSearch}
                        options={suggestedProperty}
                        onSelect={onPropertySelectHandler}
                        labelName="Search Property"
                        name="propertyList"
                        id="propertyList"
                        inputClassName={"form-control"}
                        placeholder="Search by name/ email/ state/ city/ zipcode"
                        value={searchText}
                        top={0}
                        btnList={[
                          {
                            icon: "eye",
                            toolTip: "View",
                            onClick: (value) => {
                              console.log(`View Value `, value);
                              onViewSelect(value);
                            },
                          },
                          {
                            icon: "check",
                            toolTip: "Claim",
                            onClick: (value) => {
                              console.log(`Claim Value `, value);
                              onClaimSelect(value);
                            },
                          },
                        ]}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="">Filter By Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedStatus}
                        onChange={onStatusChange}
                      >
                        <option value="all">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Declined">Declined</option>
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
                              getDataListHandler();
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
                        emptyMessage="No data found."
                      >
                        <Column
                          field="property.businessTitle"
                          header="Name"
                          body={nameBodyTemplate}
                          sortable
                        />

                        <Column
                          field="property.businessTitle"
                          header="Email"
                          body={emailBodyTemplate}
                          sortable
                        />
                        <Column
                          field="property.city"
                          header="City"
                          body={cityBodyTemplate}
                          sortable
                        />
                        <Column
                          field="property.state"
                          header="State"
                          body={stateBodyTemplate}
                          sortable
                        />
                        <Column
                          field="property.zipcode"
                          header="Zip Code"
                          body={zipCodeBodyTemplate}
                          sortable
                        />
                        <Column
                          field="status"
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
  getAllClaimListOfPartner,
  searchPropertyList,
  claimYourProperty,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyClaimWrapper);
