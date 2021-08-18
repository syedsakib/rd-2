import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import ReactTooltip from "react-tooltip";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  CardImg,
} from "reactstrap";
import Switch from "react-switch";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";

//redux & actions
import {
  getAllTemplate,
  offStatusOfPosition,
  offStatusOfTemplate,
} from "../../../store/Actions/adminAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const TemplateListPage = ({
  getAllTemplate,
  offStatusOfPosition,
  offStatusOfTemplate,
}) => {
  // declare states
  const [listState, updateListState] = useState({ rows: [], count: 0 });
  const [isLoading, toggleLoader] = useState(false);
  const [filterState, updateFilterState] = useState({
    activePage: 1,
    searchText: "",
    sortingColumn: "",
    sortingOrder: 0,
    refresh: null,
  });

  // extract states
  const { rows, count } = listState;
  const { activePage, searchText, sortingColumn, sortingOrder, refresh } =
    filterState;

  // app functions
  useEffect(() => {
    getDataListHandler();
  }, [activePage, searchText, sortingColumn, sortingOrder, refresh]);

  const getDataListHandler = async () => {
    try {
      toggleLoader(true);
      let result = await getAllTemplate(
        activePage,
        searchText,
        sortingColumn,
        sortingOrder
      );
      if (result) {
        console.log(`writers`, result);
        const { templateData, totalTemplate } = result;
        updateListState({
          rows: templateData,
          count: totalTemplate,
        });
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
      toastr.error("Error", e.toString());
    }
  };

  const updateFilterStateHandler = (newState) => {
    updateFilterState({
      ...filterState,
      ...newState,
    });
  };

  const handleSearchText = (value) => {
    updateFilterStateHandler({
      activePage: 1,
      searchText: value,
    });
  };

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    updateFilterStateHandler({
      ...filterState,
      activePage: pageNumber,
    });
  };

  const updateTemplateStatusHandler = async (rowdata) => {
    try {
      toggleLoader(true);
      let result = await offStatusOfTemplate(rowdata.id, !rowdata.status);
      if (result) {
        updateFilterStateHandler({
          refresh: Date.now(),
        });
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
      toggleLoader(false);
    }
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const titleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.title ? rowData.title : "N/A"}</span>
      </React.Fragment>
    );
  };

  const subjectBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.subject ? rowData.subject : "N/A"}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          <Switch
            onChange={() => updateTemplateStatusHandler(rowData)}
            checked={rowData.status}
            onColor="#2ca67a"
            offColor="#495057"
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
              <Link
                to={{
                  pathname: `/cw/templates/email/${rowData.id}`,
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
                </span>
                <ReactTooltip place="top" type="info" effect="float" />
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
          <Breadcrumb title="CW" breadcrumbItem="template list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <label className="">Search for Template</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i className="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter title to search"
                          onChange={(e) => {
                            handleSearchText(e.target.value);
                          }}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-6 text-end">
                      <div className="db-btn-group">
                        <Link
                          to="/cw/template/email/create"
                          title="Add Contact"
                          color="info"
                          className="btn btn-info btn-label"
                        >
                          <i className="bx bx-plus-circle label-icon"></i>
                          Add New Template
                        </Link>
                      </div>
                    </div>
                  </div>

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6"></div>
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
                            field="title"
                            header="Title"
                            body={titleBodyTemplate}
                            sortable
                            style={{
                              width: "45%",
                            }}
                          />
                          <Column
                            field="subject"
                            header="Subject"
                            body={subjectBodyTemplate}
                            sortable
                            style={{
                              width: "30%",
                              textAlign: "left",
                            }}
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
                  )}

                  <div>
                    {!isLoading && count > 10 && (
                      <div className="pro-pagination">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={10}
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
  getAllTemplate,
  offStatusOfPosition,
  offStatusOfTemplate,
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateListPage);
