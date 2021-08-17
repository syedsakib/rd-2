import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import LoaderComponent from "components/Common/Loader/LoaderComponent";
import Accept from "./AcceptPopup";

//redux & actions
import { getAssignedLeadsToPartner } from "../../../store/Actions/partnerAction";

const AssignLeads = ({ userDetails, getAssignedLeadsToPartner }) => {
  // declare states
  const history = useHistory();
  const [isLoading, toggleLoader] = useState(false);
  const [openAccept, setOpenAccept] = useState(false);
  const [appStates, updateAppState] = useState({
    partnerName: "",
    acceptLeadId: "",
    openFor: "",
    advisorEmail: "",
    advisorName: "",
    acceptLeadEmail: "",
    leadName: "",
  });
  const [assignedLeads, updateAssignedLeads] = useState([]);

  const {
    partnerName,
    acceptLeadId,
    openFor,
    advisorEmail,
    advisorName,
    acceptLeadEmail,
    leadName,
  } = appStates;

  useEffect(() => {
    getDataListHandler();
  }, []);

  const openAcceptModel = (
    e,
    acceptLeadId,
    openFor,
    leadName,
    advisorEmail,
    advisorName,
    leadEmail
  ) => {
    updateAppState({
      partnerName: userDetails.firstName + " " + userDetails.lastName,
      leadName: leadName,
      acceptLeadId: acceptLeadId,
      openFor: openFor,
      advisorEmail: advisorEmail,
      advisorName: advisorName,
      acceptLeadEmail: leadEmail,
    });
    setOpenAccept(true);
  };

  const closeAcceptPopup = async () => {
    try {
      toggleLoader(true);
      let result = await getAssignedLeadsToPartner();
      console.log(result);
      if (result) {
        updateAssignedLeads(result);
        setOpenAccept(true);
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
    }
  };

  const getDataListHandler = async () => {
    try {
      toggleLoader(true);
      let result = await getAssignedLeadsToPartner();
      console.log(result);
      if (result) {
        updateAssignedLeads(result);
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
    }
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.leadUser.firstName + " " + rowData.leadUser.lastName}
        </span>
      </React.Fragment>
    );
  };

  const assignedDateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.assignPartnerDate}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          <div className="d-flex justify-content-center">
            <Link
              to="#"
              onClick={(e) =>
                openAcceptModel(
                  e,
                  rowData.id,
                  "Accept",
                  rowData.leadUser.firstName + " " + rowData.leadUser.lastName,
                  rowData.User.email,
                  rowData.User.firstName,
                  rowData.leadUser.email
                )
              }
            >
              Accept
            </Link>
            <Link
              to="#"
              onClick={(e) =>
                openAcceptModel(
                  e,
                  rowData.id,
                  "Reject",
                  rowData.leadUser.firstName + " " + rowData.leadUser.lastName,
                  rowData.User.email,
                  rowData.User.firstName,
                  rowData.leadUser.email
                )
              }
            >
              Reject
            </Link>
          </div>
        </span>
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
          <Breadcrumb title="partner" breadcrumbItem="assign leads" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">Assigned Lead List</div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6"></div>
                      <div className="col-sm-6 text-end"></div>
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
                            value={assignedLeads}
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
                              field="rating"
                              header="Assigned Date"
                              body={assignedDateBodyTemplate}
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
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {openAccept ? (
        <Accept
          openFor={openFor}
          close={closeAcceptPopup}
          show={openAccept}
          leadName={leadName}
          leadEmail={acceptLeadEmail}
          statusBy={"Partner"}
          advisorEmail={advisorEmail}
          advisorName={advisorName}
          partnerName={partnerName}
          acceptLeadId={acceptLeadId}
        />
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  isAuthenticated: state.global.isAuthenticated,
  appSize: state.global.appSize,
});

const mapDispatchToProps = {
  getAssignedLeadsToPartner,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignLeads);
