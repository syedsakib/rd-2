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
import Breadcrumb from "../../../../components/Common/Breadcrumb";
import { formatDate, formatNumber } from "../../../../store/utils/util";
import ButtonComp from "components/Common/Button/Button";

//redux & actions
import { getCorporateList } from "../../../../store/Actions/corporateAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const CorporateList = ({}) => {
  // declare states
  const history = useHistory();
  const [isLoading, toggleLoader] = useState(false);
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [totalCount, updateTotalCount] = useState(0);
  const [categoryOptionList, updateCategoryOptionList] = useState([]);
  const [refresh, updateRefresh] = useState(Date.now());
  const [filterState, updateFilterState] = useState({
    activePage: 1,
    searchText: "",
    limit: 20,
    selectedCategory: "all",
  });
  const dispatch = useDispatch();

  const { activePage, searchText, limit, selectedCategory } = filterState;
  const { rows, count } = listState;

  useEffect(() => {
    getDataListHandler();
  }, [activePage, searchText, refresh, selectedCategory]);

  const getDataListHandler = async () => {
    try {
      toggleLoader(true);
      let result = await dispatch(
        getCorporateList({
          searchText,
          pageNumber: activePage,
          limit,
          selectedCategory,
        })
      );
      console.log(`Data List `, result);
      if (result) {
        const { rows, count } = result;
        updateListState({
          rows,
          count,
        });
      }
      toggleLoader(false);
    } catch (e) {
      toastr.error("Error", e.toString());
      toggleLoader(false);
    }
  };

  const updateFilterStateHandler = (newState) => {
    updateFilterState({
      ...filterState,
      ...newState,
    });
  };

  const handlePageChange = (pgNum) => {
    updateFilterStateHandler({
      activePage: pgNum,
    });
  };

  const handleSearchInput = (e) => {
    const val = e.target.value;
    updateFilterStateHandler({
      activePage: 1,
      searchText: val,
    });
  };

  const onChangeTypeHandler = (e) => {
    const val = e.target.value;
    updateFilterStateHandler({
      activePage: 1,
      selectedCategory: val,
    });
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const typeBodyTemplate = (rowData) => {
    console.log(rowData.corporate_type);
    return (
      <React.Fragment>
        {rowData.corporate_type == "adviser" ? (
          <Badge
            className="me-1 rounded-pill bg-success"
            style={{ padding: "5px 10px 5px 10px" }}
          >
            {rowData.corporate_type}
          </Badge>
        ) : (
          <Badge
            className="me-1 rounded-pill bg-primary"
            style={{ padding: "5px 10px 5px 10px" }}
          >
            {rowData.corporate_type}
          </Badge>
        )}
      </React.Fragment>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.title}</span>
      </React.Fragment>
    );
  };

  const emailBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span style={{ textTransform: "lowercase" }}>{rowData.email}</span>
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
        <span>{rowData.zipcode ? rowData.zipcode : "N/A"}</span>
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
                  icon="edit"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/admin/corporate/edit/${rowData.id}`);
                  }}
                  toolTip="Edit Detail"
                  btnClass="normal"
                />
              </span>
              <span>
                <ButtonComp
                  icon="list"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/admin/corporate/managers/${rowData.id}`);
                  }}
                  toolTip="Manager List"
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
          <Breadcrumb title="Admin" breadcrumbItem="corporate list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">Corporate List</div>
                    <div className="col-md-6 text-end">
                      <div className="db-btn-group">
                        <Link
                          to="/admin/corporate/add"
                          title="Add Contact"
                          color="info"
                          className="btn btn-info btn-label"
                        >
                          <i className="bx bx-plus-circle label-icon"></i>
                          Add New
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <label className="">Search Corporate</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i className="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="title / email / zip code / state / city"
                          onChange={handleSearchInput}
                        />
                      </InputGroup>
                    </div>

                    <div className="col-md-6">
                      <label className="">Filter By Type</label>
                      <select
                        className="form-control form-select"
                        value={selectedCategory}
                        onChange={onChangeTypeHandler}
                      >
                        <option value="all">All</option>
                        <option value={"adviser"}>Adviser</option>
                        <option value={"partner"}>Partner</option>
                      </select>
                    </div>
                  </div>

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        {count > 0 && (
                          <ButtonComp
                            icon="sync"
                            onClick={() => {
                              getDataListHandler();
                            }}
                            toolTip="refresh"
                            tooltipType="info"
                          />
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

                  <div className="datatable-responsive-demo">
                    <div className="card">
                      <DataTable
                        ref={dt}
                        value={listState.rows}
                        className="p-datatable-customers"
                        emptyMessage="No data found."
                      >
                        <Column
                          field="corporate_type"
                          header="Type"
                          body={typeBodyTemplate}
                          sortable
                        />
                        <Column
                          field="title"
                          header="Name"
                          body={nameBodyTemplate}
                          sortable
                        />

                        <Column
                          field="email"
                          header="Email"
                          body={emailBodyTemplate}
                          sortable
                          style={{
                            width: "20%",
                          }}
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
                          field="zipcode"
                          header="Zip Code"
                          body={zipCodeBodyTemplate}
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
                    {!isLoading && count > limit && (
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CorporateList);
