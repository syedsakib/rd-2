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
import { formatDate } from "../../../../store/utils/util";

//redux & actions
import { getTagList, deleteTag } from "../../../../store/Actions/adminAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";
import ReactTooltip from "react-tooltip";
import EditTagModal from "./EditTagModal";
import AddTagModal from "./AddTagModal";

const TagList = ({ getTagList, deleteTag, userDetails, isAuthenticated }) => {
  // declare states
  const history = useHistory();
  const [appStates, updateAppState] = useState({
    activePage: 1,
    searchText: "",
  });
  const [tagList, updateTagList] = useState({
    rows: [],
    count: 0,
  });
  const [isLoading, toggleLoader] = useState(false);
  const [modalData, updateModalData] = useState({
    showAddModal: false,
    showEditModal: false,
    selectedTag: null,
  });
  const { activePage, searchText } = appStates;
  const { rows, count } = tagList;
  const { showAddModal, showEditModal, selectedTag } = modalData;

  useEffect(() => {
    getTagListHandler();
  }, [activePage, searchText]);

  const getTagListHandler = async () => {
    try {
      toggleLoader(true);
      let result = await getTagList({
        pageNumber: activePage,
        searchText,
      });
      console.log(result);
      if (result) {
        const { rows, count } = result;
        updateTagList({
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
    let val = e.target.value;
    updateAppState({
      ...appStates,
      searchText: val,
    });
  };
  const handlePageChange = (pageNumber) => {
    updateAppState({
      ...appStates,
      activePage: pageNumber,
    });
  };

  const toggleModal = (type, tag) => {
    if (type === "insert") {
      updateModalData({
        ...modalData,
        showAddModal: !showAddModal,
      });
    } else if (type === "edit") {
      updateModalData({
        ...modalData,
        showEditModal: !showEditModal,
        selectedTag: tag,
      });
    }
  };

  const deleteTagHandler = async (id) => {
    try {
      let result = await deleteTag(id);
      if (result) {
        let newRows = rows.filter((item) => item.id !== id);
        updateTagList({
          ...tagList,
          rows: newRows,
        });
      }
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const titleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span> {rowData.title ? rowData.title : "N/A"}</span>
      </React.Fragment>
    );
  };

  const descriptionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.description}</span>
      </React.Fragment>
    );
  };

  const addedOnBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{formatDate(rowData.createdAt)}</span>
      </React.Fragment>
    );
  };

  const addedByBodyTemplate = ({ user }) => {
    return (
      <React.Fragment>
        <span>{`${user.firstName} ${user.lastName}`}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {
          <span>
            <div className="d-flex justify-content-center">
              <span
                className="btn-view-status tb-icon"
                title="edit"
                id={rowData.id}
                data-tip="Edit"
                style={{ paddingRight: "20px" }}
                onClick={() => {
                  toggleModal("edit", rowData);
                }}
              >
                <i class="fas fa-edit" style={{ color: "#495057" }}></i>
                <ReactTooltip place="top" type="info" effect="float" />
              </span>

              <span
                className="btn-view-status tb-icon"
                title="edit"
                onClick={() => {
                  deleteTagHandler(rowData.id);
                }}
                data-tip="Delete"
              >
                <i class="fas fa-times" style={{ color: "#495057" }}></i>
                <ReactTooltip place="top" type="info" effect="float" />
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
          <Breadcrumb title="CW" breadcrumbItem="tag list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <label className="">Search Tags</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter title to search"
                          onChange={handleSearchInput}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-6 text-end">
                      <div className="db-btn-group">
                        <Link
                          to="#"
                          title="Add Contact"
                          color="info"
                          className="btn btn-info btn-label"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleModal("insert");
                          }}
                        >
                          <i className="bx bx-plus-circle label-icon"></i>
                          Add New Tag
                        </Link>
                      </div>
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
                          value={tagList.rows}
                          className="p-datatable-customers"
                          emptyMessage="No data found."
                        >
                          <Column
                            field="title"
                            header="Title"
                            body={titleBodyTemplate}
                            sortable
                          />
                          <Column
                            field="description"
                            header="Description"
                            body={descriptionBodyTemplate}
                            sortable
                            style={{
                              width: "30%",
                            }}
                          />
                          <Column
                            field="createdAt"
                            header="Added On"
                            body={addedOnBodyTemplate}
                            sortable
                          />
                          <Column
                            field="user.firstName"
                            header="Added By"
                            body={addedByBodyTemplate}
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
      {showAddModal && (
        <AddTagModal
          openModal={showAddModal}
          hideModal={toggleModal}
          callBack={getTagListHandler}
        />
      )}
      {showEditModal && (
        <EditTagModal
          openModal={showEditModal}
          hideModal={toggleModal}
          callBack={getTagListHandler}
          tagData={selectedTag}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  isAuthenticated: state.global.isAuthenticated,
});

const mapDispatchToProps = {
  getTagList,
  deleteTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagList);
