import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
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
import Switch from "react-switch";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";
import { formatDate, formatNumber } from "../../../../store/utils/util";
import ButtonComp from "components/Common/Button/Button";

//redux & actions
import {
  getInternalUserList,
  updateInternalUserStatus,
  getRoleTypeList,
} from "../../../../store/Actions/roleAction";
import {
  getCorporateList,
  getCorporateManagerList,
} from "../../../../store/Actions/corporateAction";
import { updateUserRoleStatus } from "../../../../store/Actions/roleAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const CorporateAdminList = ({ match: { params } }) => {
  const history = useHistory();
  const [isLoading, toggleLoader] = useState(false);
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [totalCount, updateTotalCount] = useState(0);
  const [refresh, updateRefresh] = useState(Date.now());
  const [filterState, updateFilterState] = useState({
    activePage: 1,
    searchText: "",
    limit: 20,
    selectedStatus: 1,
  });
  const dispatch = useDispatch();

  const { activePage, searchText, limit, selectedStatus } = filterState;
  const { rows, count } = listState;

  useEffect(() => {
    if (params && params.id) {
      getDataListHandler(params.id);
    }
  }, [activePage, selectedStatus, searchText, refresh]);

  const getDataListHandler = async (id) => {
    try {
      toggleLoader(true);
      let result = await dispatch(
        getCorporateManagerList({
          searchText,
          pageNumber: activePage,
          limit,
          selectedStatus,
          corporateId: id,
        })
      );
      if (result) {
        console.log(`C Admin List `, result);
        const { rows, count } = result;
        updateListState({
          rows,
          count,
        });
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
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

  const onSelectedStatusChangeHandler = (e) => {
    const val = e.target.value;
    updateFilterStateHandler({
      activePage: 1,
      selectedStatus: val,
    });
  };

  const updateUserStatusHandler = async (userId, userStatus) => {
    try {
      let result = await dispatch(
        updateUserRoleStatus({
          userId,
          userStatus,
        })
      );
      if (result) {
        updateRefresh(Date.now());
      }
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const nameBodyTemplate = ({ user }) => {
    return (
      <React.Fragment>
        <span>{`${user.firstName} ${user.lastName}`}</span>
      </React.Fragment>
    );
  };

  const emailBodyTemplate = ({ user }) => {
    return (
      <React.Fragment>
        <span style={{ textTransform: "lowercase" }}>{user.email}</span>
      </React.Fragment>
    );
  };

  const phoneBodyTemplate = ({ user }) => {
    return (
      <React.Fragment>
        <span>
          {user.phoneNumber ? formatNumber(`${user.phoneNumber}`) : "N/A"}
        </span>
      </React.Fragment>
    );
  };

  const stateBodyTemplate = ({ user }) => {
    return (
      <React.Fragment>
        <span>{user.state ? user.state : "N/A"}</span>
      </React.Fragment>
    );
  };

  const cityBodyTemplate = ({ user }) => {
    return (
      <React.Fragment>
        <span>{user.city ? user.city : "N/A"}</span>
      </React.Fragment>
    );
  };

  const zipCodeBodyTemplate = ({ user }) => {
    return (
      <React.Fragment>
        <span>{user.zipcode ? user.zipcode : "N/A"}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          <Switch
            checked={rowData.status ? true : false}
            onChange={() => {
              updateUserStatusHandler(rowData.id, rowData.status === 1 ? 0 : 1);
            }}
          />
        </span>
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
                  onClick={() => {
                    history.push(
                      `/admin/corporate/manager/edit/${rowData.user_id}`
                    );
                  }}
                  toolTip="Edit Detail"
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

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Admin" breadcrumbItem="managers list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">Managers List</div>
                    <div className="col-md-6 text-end">
                      <div className="db-btn-group">
                        <Link
                          to={`/admin/corporate`}
                          title="Go Back"
                          color="info"
                          className="btn btn-danger btn-label"
                          style={{ marginRight: "10px" }}
                        >
                          <i className="bx bx-arrow-back label-icon"></i>
                          Go Back
                        </Link>
                        <Link
                          to={`/admin/corporate/manager/add/${params?.id}`}
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
                      <label className="">Search User</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i className="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="name / email / phone number"
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
                        onChange={onSelectedStatusChangeHandler}
                      >
                        <option value="all">All</option>
                        <option value={1}>Active</option>
                        <option value={0}>Disable</option>
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
                            // onClick={() => {
                            //   getDataListHandler()
                            // }}
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
                    <>
                      {" "}
                      <div className="datatable-responsive-demo">
                        <div className="card">
                          <DataTable
                            ref={dt}
                            value={listState.rows}
                            className="p-datatable-customers"
                            emptyMessage="No data found."
                          >
                            <Column
                              field="user.firstName"
                              header="Name"
                              body={nameBodyTemplate}
                              sortable
                            />

                            <Column
                              field="user.email"
                              header="Email"
                              body={emailBodyTemplate}
                              sortable
                              style={{
                                width: "20%",
                              }}
                            />
                            <Column
                              field="user.phoneNumber"
                              header="Phone Number"
                              body={phoneBodyTemplate}
                              sortable
                            />
                            <Column
                              field="user.state"
                              header="State"
                              body={stateBodyTemplate}
                              sortable
                            />
                            <Column
                              field="user.city"
                              header="City"
                              body={cityBodyTemplate}
                              sortable
                            />
                            <Column
                              field="user.zipcode"
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CorporateAdminList);
