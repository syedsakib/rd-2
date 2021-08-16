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
  getAllCMS,
  offStatusOfTemplate,
} from "../../../../store/Actions/adminAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";
import ReactTooltip from "react-tooltip";

const CMSList = ({ getAllCMS }) => {
  // declare states
  const [filterState, updateFilterState] = useState({
    activePage: 1,
    searchText: "",
    limit: 10,
  });
  const [isLoading, toggleLoader] = useState(false);
  const [listState, updateListState] = useState({ rows: [], count: 0 });

  // destructure state
  const { activePage, searchText, limit } = filterState;
  const { rows, count } = listState;

  // app functions
  useEffect(() => {
    getDataList();
  }, [activePage, searchText]);

  const updateFilterStateHandler = (newState) => {
    updateFilterState({
      ...filterState,
      ...newState,
    });
  };

  const getDataList = async () => {
    try {
      toggleLoader(true);
      let result = await getAllCMS({
        pageNumber: activePage,
        searchText,
        limit,
      });
      console.log(`Cms List `, result);
      if (result) {
        const { rows, count } = result;
        updateListState({ rows, count });
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
      toastr.error("Error", e.toString());
    }
  };

  const handlePageChange = (newPage) => {
    updateFilterStateHandler({
      activePage: newPage,
    });
  };

  const handleSearchKeyWordChange = (e) => {
    let val = e.target.value;
    updateFilterStateHandler({
      activePage: 1,
      searchText: val,
    });
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const titleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.pageName ? rowData.pageName : "N/A"}</span>
      </React.Fragment>
    );
  };

  const descriptionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.metaDesc ? rowData.metaDesc : "N/A"}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {
          <span>
            <div className="d-flex justify-content-center">
              <Link
                to={{
                  pathname: `/cw/cms/meta/edit/${rowData.id}`,
                  state: { data: rowData.id },
                }}
              >
                <span
                  className="btn-view-status tb-icon"
                  title="edit"
                  id={rowData.id}
                  data-tip="Edit"
                >
                  <i className="fas fa-edit" style={{ color: "#495057" }}></i>
                  <ReactTooltip place="top" type="info" effect="float" />
                </span>
              </Link>
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
          <Breadcrumb title="CW" breadcrumbItem="cms list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <label className="">Search CMS</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i className="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter title to search"
                          onChange={handleSearchKeyWordChange}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-6 text-end"></div>
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
                            field="pageName"
                            header="Title"
                            body={titleBodyTemplate}
                            sortable
                            style={{
                              width: "25%",
                            }}
                          />
                          <Column
                            field="metaDesc"
                            header="Description"
                            body={descriptionBodyTemplate}
                            sortable
                            style={{
                              width: "60%",
                            }}
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
  isAuthenticated: state.global.isAuthenticated,
});

const mapDispatchToProps = {
  getAllCMS,
  offStatusOfTemplate,
};

export default connect(mapStateToProps, mapDispatchToProps)(CMSList);
