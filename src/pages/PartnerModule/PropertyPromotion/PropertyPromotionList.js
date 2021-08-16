import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import Pagination from "react-js-pagination";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import ButtonComp from "components/Common/Button/Button";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

import {
  generatePropertyUrl,
  formatDate,
  getQueryParams,
  getFrontUrl,
} from "../../../store/utils/util";

import DetailViewModal from "./DetailViewModal";
import ReplyModal from "./ReplyModal";
import MailSenderModal from "./MailSenderModal";

//redux & actions
import {
  getPromotionList,
  getPropertyDetail,
  deletePromotion,
  getPropertyPromotion,
} from "../../../store/Actions/partnerAction";

const PropertyPromotionList = ({
  isAuthenticated,
  userDetails,
  appSize,
  getPromotionList,
  location,
  match: { params },
  getPropertyDetail,
  deletePromotion,
  getPropertyPromotion,
}) => {
  // declare states
  const history = useHistory();
  const [isLoading, toggleLoader] = useState(false);
  const [appStates, updateAppState] = useState({
    activePage: 1,
    selectedStatus: "all",
    limit: 10,
    startDate: null,
    endDate: null,
  });
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [modalData, updateModalData] = useState({
    openModalName: null,
    selectedModalData: null,
  });
  const [property, updateProperty] = useState(null);
  const { activePage, selectedStatus, startDate, endDate, limit } = appStates;
  const { rows, count } = listState;
  const [pId, setPropertyId] = useState(null);
  const [pUrl, setPropertyUrl] = useState(null);
  const { openModalName, selectedModalData } = modalData;
  const [isDataFetched, setDataFetched] = useState(false);
  const [isPromotionActive, setPromotionActiveStatus] = useState(false);

  useEffect(() => {
    if (params && params.id) {
      let id = params.id;
      setPropertyId(id);
      getPropertyData(id);
      getPropertyActivePromotionHandler(id);
    }
  }, []);

  useEffect(() => {
    if (pId) {
      getDataListHandler();
    }
  }, [pId, activePage, selectedStatus, startDate, endDate]);

  const updateAppStateHandler = (newState) => {
    updateAppState({
      ...appStates,
      ...newState,
    });
  };

  const getPropertyData = async (id) => {
    try {
      let result = await getPropertyDetail({ propertyId: id });
      console.log(result);
      if (result) {
        let profile = result.profile;
        let pUrl = generatePropertyUrl(
          "senior-living",
          profile.state,
          profile.city,
          profile.slug
        );
        setPropertyUrl(pUrl);
        updateProperty(profile);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPropertyActivePromotionHandler = async (id) => {
    try {
      console.log(`Id is ${id}`);
      let result = await getPropertyPromotion({
        pId: id,
        type: "all",
      });
      console.log(`Active Promotion`, result);
      if (result) {
        setPromotionActiveStatus(true);
      } else {
        setPromotionActiveStatus(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDataListHandler = async () => {
    try {
      toggleLoader();
      let result = await getPromotionList({
        pageNumber: activePage,
        itemId: pId,
        selectedStatus,
        startDate,
        endDate,
        limit,
      });
      console.log("Promotion List ", result);
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
      toggleLoader(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    updateAppStateHandler({
      activePage: pageNumber,
    });
  };

  const onSelectChangeHandle = (value) => {
    console.log(`Selected Value ${value}`);
    updateAppStateHandler({
      selectedStatus: value,
      activePage: 1,
    });
  };

  const handelDateSearch = (date) => {
    try {
      updateAppStateHandler({
        startDate: date,
        endDate: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handelEndDateSearch = (date) => {
    try {
      updateAppStateHandler({
        endDate: date,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = (modalName, data) => {
    updateModalData({
      openModalName: modalName,
      selectedModalData: data,
    });
  };

  const closeModal = () => {
    updateModalData({
      openModalName: null,
      selectedModalData: null,
    });
  };

  const deletePromotionHandler = async (data) => {
    try {
      let result = await deletePromotion(data);
      if (result) {
        console.log(`Promotion removed`);
        getDataListHandler();
        getPropertyActivePromotionHandler(pId);
      }
    } catch (e) {
      console.log(e);
      toastr.error(e.toString());
    }
  };

  const callBackHandler = () => {
    getDataListHandler();
    getPropertyActivePromotionHandler(pId);
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const titleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.promotion_title ? rowData.promotion_title : "N/A"}</span>
      </React.Fragment>
    );
  };

  const startDateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{formatDate(rowData.startDate, "MM/DD/YYYY")}</span>
      </React.Fragment>
    );
  };

  const endDateBodyTemplate = (rowData) => {
    <React.Fragment>
      <span>{formatDate(rowData.endDate, "MM/DD/YYYY")}</span>
    </React.Fragment>;
  };

  const createdOnBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.createdAt ? formatDate(rowData.createdAt) : "N/A"}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.status}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          <div className="d-flex justify-content-center">
            <ButtonComp
              icon="link"
              onClick={(e) => {
                window.open(`${getFrontUrl()}${pUrl}`);
              }}
              toolTip="Go to link"
              btnClass="normal"
            />
            <ButtonComp
              icon="eye"
              onClick={(e) => {
                openModal("detail", {
                  description: rowData.promotion_content,
                });
              }}
              toolTip="View Details"
              btnClass="normal"
            />
            <ButtonComp
              icon="edit"
              onClick={(e) => {
                openModal("editPromotion", rowData);
              }}
              toolTip="Edit"
              btnClass="normal"
            />
            <ButtonComp
              icon="trash"
              onClick={(e) => {
                deletePromotionHandler({
                  itemId: rowData.id,
                });
              }}
              toolTip="Remove"
              btnClass="danger"
            />
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
          <Breadcrumb title="partner" breadcrumbItem="property reviews" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">
                      Promotions of{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {property && property.businessTitle}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="row filter-row"></div>

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        <ButtonComp
                          icon="plus"
                          onClick={(e) => {
                            if (pId && !isPromotionActive) {
                              openModal("promotion", { id: pId });
                            }
                          }}
                          toolTip="Add Promotion"
                          btnClass={isPromotionActive ? "disabled" : "normal"}
                          label="Add"
                        />
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
                              field="promotion_title"
                              header="Title"
                              body={titleBodyTemplate}
                              sortable
                            />
                            <Column
                              field="startDate"
                              header="Start Date"
                              body={startDateBodyTemplate}
                              sortable
                            />
                            <Column
                              field="endDate"
                              header="End Date"
                              body={endDateBodyTemplate}
                              sortable
                            />
                            <Column
                              field="status"
                              header="Status"
                              body={statusBodyTemplate}
                              sortable
                            />
                            <Column
                              field="createdAt"
                              header="Created On"
                              body={createdOnBodyTemplate}
                              sortable
                            />

                            <Column
                              field="action"
                              header="Action"
                              body={actionBodyTemplate}
                              sortable
                              style={{ width: "20%" }}
                            />
                          </DataTable>
                        </div>
                      </div>

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
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {openModalName === "detail" && (
        <DetailViewModal
          openModal={openModalName === "detail"}
          hideModal={closeModal}
          itemDetail={selectedModalData}
          appSize={appSize}
        />
      )}
      {openModalName === "promotion" && (
        <PromotionModal
          openModal={openModalName === "promotion"}
          hideModal={closeModal}
          itemDetail={selectedModalData}
          appSize={appSize}
          callBack={callBackHandler}
        />
      )}
      {openModalName === "editPromotion" && (
        <PromotionEditModal
          openModal={openModalName === "editPromotion"}
          hideModal={closeModal}
          itemDetail={selectedModalData}
          appSize={appSize}
          callBack={callBackHandler}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  isAuthenticated: state.global.isAuthenticated,
  appSize: state.global.appSize,
});

const mapDispatchToProps = {
  getPromotionList,
  getPropertyDetail,
  deletePromotion,
  getPropertyPromotion,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyPromotionList);
