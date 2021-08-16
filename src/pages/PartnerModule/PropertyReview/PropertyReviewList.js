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
import ReactStars from "react-rating-stars-component";

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import ButtonComp from "components/Common/Button/Button";
import LoaderComponent from "components/Common/Loader/LoaderComponent";
import {
  formatDate,
  generatePropertyUrl,
  getFrontUrl,
} from "../../../store/utils/util";

import DetailViewModal from "./DetailViewModal";

//redux & actions
import {
  getAllReviewsForPartner,
  getAllPropertyListOfPartner,
  getPropertyDetail,
} from "../../../store/Actions/partnerAction";
import { getEmailTemplateByType } from "../../../store/Actions/mailAction";

const PropertyReviewList = ({
  isAuthenticated,
  getAllReviewsForPartner,
  getAllPropertyListOfPartner,
  getEmailTemplateByType,
  location,
  getPropertyDetail,
}) => {
  // declare states
  const history = useHistory();
  const [isLoading, toggleLoader] = useState(false);
  const [emailData, setEmailData] = useState(false);
  const [appStates, updateAppState] = useState({
    activePage: 1,
    selectedStatus: "Pending",
    selectedItem: 0,
    limit: 10,
    isItemSelectionChecked: false,
  });
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  });
  const [params, updateParams] = useState(null);
  const [itemList, updateItemList] = useState([]);
  const [modalData, updateModalData] = useState({
    openModalName: null,
    selectedModalData: null,
  });
  const [selectedPid, updatePid] = useState(null);
  const [property, updateProperty] = useState(null);
  const { activePage, selectedItem, isItemSelectionChecked } = appStates;
  const { rows, count } = listState;
  const { openModalName, selectedModalData } = modalData;

  useEffect(() => {
    getPartnerPropertyListHandler();
    getEmailTemplateHandler();
  }, []);

  useEffect(() => {
    if (isItemSelectionChecked) {
      console.log(`Getting review list`);
      getDataListHandler();
    }
  }, [activePage, selectedItem, isItemSelectionChecked]);

  useEffect(() => {
    if (itemList && itemList.length > 0) {
      let qParams = getQueryParams(location.search);
      if (qParams && qParams.id) {
        updateParams(qParams);
        updatePid(qParams.id);
        updateAppStateHandler({
          selectedItem: qParams.id,
          activePage: 1,
          isItemSelectionChecked: true,
        });
      } else {
        console.log(`Entered Item Bekiw`);
        updateAppStateHandler({
          isItemSelectionChecked: true,
        });
      }
    }
  }, [itemList]);

  useEffect(() => {
    if (selectedPid) {
      getPropertyDataHandler(selectedPid);
    }
  }, [selectedPid]);

  const updateAppStateHandler = (newState) => {
    updateAppState({
      ...appStates,
      ...newState,
    });
  };

  const getEmailTemplateHandler = async () => {
    try {
      let result = await getEmailTemplateByType(38);
      // console.log(result);
      if (result) {
        setEmailData(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPartnerPropertyListHandler = async () => {
    try {
      let result = await getAllPropertyListOfPartner({
        pageNumber: 1,
        selectedStatus: 1,
        limit: 10000,
      });
      //console.log(result);
      if (result) {
        updateItemList(result.rows);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPropertyDataHandler = async (id) => {
    try {
      let result = await getPropertyDetail({ propertyId: id });
      console.log(result);
      if (result) {
        let profile = result.profile;
        let pathUrl = generatePropertyUrl(
          "senior-living",
          profile.state,
          profile.city,
          profile.slug
        );
        profile.pUrl = `${getFrontUrl()}${pathUrl}`;
        updateProperty(profile);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDataListHandler = async () => {
    try {
      console.log(`S P ${selectedItem}`);
      toggleLoader(true);
      let result = await getAllReviewsForPartner({
        pageNumber: activePage,
        itemId: selectedItem,
      });
      console.log(result);
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
    updatePid(value);
    updateAppStateHandler({
      selectedItem: value,
      activePage: 1,
    });
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

  const callBackHandler = () => {
    getDataListHandler();
  };

  //TABLE COMPONENTS
  const dt = useRef(null);

  const BodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span></span>
      </React.Fragment>
    );
  };

  const propertyBodyTemplate = ({ property }) => {
    let pUrl = generatePropertyUrl(
      "senior-living",
      property.state,
      property.city,
      property.slug
    );
    return (
      <React.Fragment>
        <span
          onClick={(e) => {
            e.preventDefault();
            window.open(`${getFrontUrl()}${pUrl}`);
          }}
        >
          {property.businessTitle ? property.businessTitle : "N/A"}
        </span>
      </React.Fragment>
    );
  };

  const ratingBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          <ReactStars
            count={5}
            size={18}
            activeColor="#ffd700"
            edit={false}
            value={rowData.rating}
          />
        </span>
      </React.Fragment>
    );
  };

  const reviewedByBodyTemplate = (rowData) => {
    let userName;
    if (rowData.userRole) {
      const user = rowData.userRole.user;
      userName = user.firstName + " " + user.lastName;
    } else {
      userName = rowData.user_name;
    }
    return (
      <React.Fragment>
        <span>{userName}</span>
      </React.Fragment>
    );
  };

  const reviewedOnBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.createdAt ? formatDate(rowData.createdAt) : "N/A"}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    let { state, city, slug } = rowData.property;
    let pUrl = generatePropertyUrl("senior-living", state, city, slug);

    return (
      <React.Fragment>
        <span>
          <div className="d-flex justify-content-center">
            <ButtonComp
              icon="eye"
              onClick={(e) => {
                openModal("detail", rowData);
              }}
              toolTip="View Details"
              btnClass="normal"
            />
            <ButtonComp
              icon="reply"
              onClick={(e) => {
                openModal("reply", rowData);
              }}
              toolTip="Reply"
              btnClass="normal"
            />
            <ButtonComp
              icon="envelope"
              onClick={(e) => {
                let url = `${getFrontUrl()}${pUrl}`;
                openModal("mail", {
                  ...data.property,
                  pUrl: url,
                });
              }}
              toolTip="Send Mail"
              btnClass="normal"
            />
            <ButtonComp
              icon="link"
              onClick={(e) => {
                window.open(`${getFrontUrl()}${pUrl}`);
              }}
              toolTip="Go to property"
              btnClass="normal"
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
                    <div className="col-md-6 my-auto">Property Review List</div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-12">
                      <label className="">Filter By Property</label>
                      <select
                        className="form-control form-select"
                        value={selectedItem}
                        onChange={(e) => {
                          onSelectChangeHandle(e.target.value);
                        }}
                      >
                        <option value="0">All Properties</option>
                        {itemList &&
                          itemList.map(
                            ({ id, businessTitle, state, city, zipcode }) => {
                              return (
                                <option value={id} key={`pp-${id}`}>
                                  {`${businessTitle} (${city} ${state}, ${zipcode})`}
                                </option>
                              );
                            }
                          )}
                      </select>
                    </div>
                  </div>

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        {selectedItem > 0 && property && (
                          <ButtonComp
                            icon="envelope"
                            onClick={(e) => {
                              openModal("mail", property);
                            }}
                            toolTip="Send Mail"
                            btnClass="normal"
                            label="Send Mail"
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
                            {/* <Column
                          field=""
                          header=""
                          body={BodyTemplate}
                          sortable
                        /> */}

                            <Column
                              field="property.businessTitle"
                              header="Property"
                              body={propertyBodyTemplate}
                              sortable
                              style={{
                                width: "25%",
                              }}
                            />
                            <Column
                              field="rating"
                              header="Rating"
                              body={ratingBodyTemplate}
                              sortable
                            />
                            <Column
                              field="userRole.user"
                              header="Reviewed By"
                              body={reviewedByBodyTemplate}
                              sortable
                            />
                            <Column
                              field="createdAt"
                              header="Reviewed On"
                              body={reviewedOnBodyTemplate}
                              sortable
                            />
                            <Column
                              field="action"
                              header="Action"
                              body={actionBodyTemplate}
                              sortable
                              style={{
                                width: "30%",
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
      {openModalName === "reply" && (
        <ReplyModal
          openModal={openModalName === "reply"}
          hideModal={closeModal}
          itemDetail={selectedModalData}
          appSize={appSize}
          callBack={callBackHandler}
        />
      )}
      {openModalName === "mail" && (
        <MailSenderModal
          openModal={openModalName === "mail"}
          hideModal={closeModal}
          itemDetail={selectedModalData}
          appSize={appSize}
          callBack={callBackHandler}
          emailTemplate={emailData}
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
  getAllReviewsForPartner,
  getAllPropertyListOfPartner,
  getEmailTemplateByType,
  getPropertyDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyReviewList);
