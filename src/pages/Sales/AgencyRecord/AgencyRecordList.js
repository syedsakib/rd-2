import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
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
  Button,
  Badge,
} from "reactstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { formatDate } from "../../../store/utils/util";

//redux & actions
import {
  getHomeCareAgencyDataChangeRecord,
  updateRecordChangeStatus,
} from "../../../store/Actions/adminAction";
import DetailModal from "./DetailModal";
import showConfirmAlert from "components/Common/ConfirmAlert/ConfirmAlert";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AgencyRecordList = ({
  getHomeCareAgencyDataChangeRecord,
  updateRecordChangeStatus,
}) => {
  // declare states
  const history = useHistory();
  const [appState, updateAppState] = useState({
    activePage: 1,
    searchText: "",
    selectedStatus: "pending",
    sortColumn: "",
    sortOrder: 0,
  });
  const [selectedRecordId, setSelectedRecordId] = useState(0);
  const [isLoading, toggleLoader] = useState(false);
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  //
  const [totalCount, updateTotalCount] = useState(0);
  const { activePage, searchText, selectedStatus, sortColumn, sortOrder } =
    appState;
  const { rows, count } = listState;

  useEffect(() => {
    getDataList();
  }, [searchText, selectedStatus, activePage, sortColumn, sortOrder]);

  const getDataList = async () => {
    try {
      toggleLoader(true);
      let result = await getHomeCareAgencyDataChangeRecord({
        activePage,
        searchText,
        selectedStatus,
        sortColumn,
        sortOrder,
      });
      if (result) {
        console.log("result result", result);
        const { rows, count } = result;
        updateListState({
          rows,
          count: count.length,
        });
        // updateTotalCount(getTotalCount(maxLimit, count))
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
      toggleLoader(false);
    }
  };

  const updateAppStateHandler = (newState) => {
    updateAppState({ ...appState, ...newState });
  };

  const onStatusChange = (e) => {
    try {
      let value = e.target.value;
      updateAppStateHandler({
        selectedStatus: value,
      });
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const handleSearchInput = (e) => {
    try {
      let value = e.target.value;
      updateAppStateHandler({
        searchText: value,
      });
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const handlePageChange = (pNumber) => {
    updateAppStateHandler({
      activePage: pNumber,
    });
  };

  const toggleViewModal = (recordId) => {
    setIsModalOpen(!isModalOpen);
    setSelectedRecordId(recordId);
  };

  const approveHandler = (id) => {
    showConfirmAlert({
      title: "Are you sure?",
      desc: "Do you want approve these changes?",
      yesBtnText: "Yes",
      noBtnText: "No",
      handler: async (result) => {
        if (result === 2) {
          return;
        }
        this.changeStatusHandler("approved", id);
      },
    });
  };

  const rejectHandler = (id) => {
    showConfirmAlert({
      title: "Are you sure?",
      desc: "Do you want reject these changes?",
      yesBtnText: "Yes",
      noBtnText: "No",
      handler: (result) => {
        if (result === 2) {
          return;
        }
        this.changeStatusHandler("rejected", id);
      },
    });
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const titleByBodyTemplate = ({ record }) => {
    return (
      <React.Fragment>
        <span>{record.title}</span>
      </React.Fragment>
    );
  };

  const updatedByBodyTemplate = ({ record }) => {
    return (
      <React.Fragment>
        {record.salesCreator.firstName ? (
          <span>{`${data.record.salesCreator.firstName} ${data.record.salesCreator.lastName}`}</span>
        ) : (
          "N/A"
        )}
      </React.Fragment>
    );
  };

  const emailBodyTemplate = ({ record }) => {
    return (
      <React.Fragment>
        <span>
          {record.salesCreator.email ? record.salesCreator.email : "N/A"}
        </span>
      </React.Fragment>
    );
  };

  const phoneBodyTemplate = ({ record }) => {
    return (
      <React.Fragment>
        <span>
          {" "}
          {record.salesCreator.phoneNumber
            ? record.salesCreator.phoneNumber
            : "N/A"}
        </span>
      </React.Fragment>
    );
  };

  const updatedOnBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{formatDate(rowData.createdAt)}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.approvalStatus == "pending" ? (
          <Badge
            className="me-1 rounded-pill bg-warning"
            style={{ padding: "5px 10px 5px 10px" }}
          >
            {rowData.approvalStatus}
          </Badge>
        ) : rowData.approvalStatus == "approved" ? (
          <Badge
            className="me-1 rounded-pill bg-success"
            style={{ padding: "5px 10px 5px 10px" }}
          >
            {rowData.approvalStatus}
          </Badge>
        ) : (
          <Badge
            className="me-1 rounded-pill bg-danger"
            style={{ padding: "5px 10px 5px 10px" }}
          >
            {rowData.approvalStatus}
          </Badge>
        )}
      </React.Fragment>
    );
  };

  const actionBodyTemplate = ({ id, record }) => {
    return (
      <React.Fragment>
        {
          <span>
            <div className="d-flex justify-content-center">
              <span>
                <Button
                  color="primary"
                  className="btn btn-primary btn-sm btn-rounded"
                  onClick={() => toggleViewModal(record.id)}
                >
                  View
                </Button>
              </span>
              <span className="mx-2">
                <Button
                  color="success"
                  className="btn btn-primary btn-sm btn-rounded"
                  onClick={() => approveHandler(record.id)}
                >
                  Approve
                </Button>
              </span>
              <span>
                <Button
                  color="danger"
                  className="btn btn-primary btn-sm btn-rounded"
                  onClick={() => rejectHandler(record.id)}
                >
                  Reject
                </Button>
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
          <Breadcrumb title="Admin" breadcrumbItem="sales record list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <label className="">Search Record</label>
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

                    <div className="col-md-6">
                      <label className="">Filter By State</label>
                      <select
                        className="form-control form-select"
                        value={selectedStatus}
                        onChange={onStatusChange}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="denied">Rejected</option>
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
                          field="record.title"
                          header="Title"
                          body={titleByBodyTemplate}
                          sortable
                          style={{
                            width: "18%",
                          }}
                        />
                        <Column
                          field="record.salesCreator.firstName"
                          header="Updated By"
                          body={updatedByBodyTemplate}
                          sortable
                        />
                        <Column
                          field="record.salesCreator.email"
                          header="Email"
                          body={emailBodyTemplate}
                          sortable
                        />
                        <Column
                          field="record.salesCreator.phoneNumber"
                          header="Phone Number"
                          body={phoneBodyTemplate}
                          sortable
                        />
                        <Column
                          field="createdAt"
                          header="Updated On"
                          body={updatedOnBodyTemplate}
                          sortable
                        />
                        <Column
                          field="approvalStatus"
                          header="Status"
                          body={statusBodyTemplate}
                          sortable
                          style={{
                            width: "10%",
                          }}
                        />
                        <Column
                          field="action"
                          header="Action"
                          body={actionBodyTemplate}
                          sortable
                          style={{
                            width: "20%",
                          }}
                        />
                      </DataTable>
                    </div>
                  </div>

                  <div>
                    {!isLoading && count > 10 && (
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

      {isModalOpen && (
        <DetailModal
          openModal={isModalOpen}
          hideModal={toggleViewModal}
          recordId={selectedRecordId}
        />
      )}
    </React.Fragment>
  );
};

function mapStateToProps(state, ownProps) {
  return {};
}

const mapDispatchToProps = {
  updateRecordChangeStatus,
  getHomeCareAgencyDataChangeRecord,
};

export default connect(mapStateToProps, mapDispatchToProps)(AgencyRecordList);
