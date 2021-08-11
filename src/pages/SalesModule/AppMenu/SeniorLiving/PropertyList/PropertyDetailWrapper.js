import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { toastr } from "react-redux-toastr";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

//Import Breadcrumb
import Breadcrumb from "../../../../../components/Common/Breadcrumb";

//redux & actions
import {
  getPropertyDetail,
  getPropertyFeatures,
} from "../../../../../store/Actions/partnerAction";

import LoaderComponent from "components/Common/Loader/LoaderComponent";
import ImageSlider from "components/Common/ImageSlider/CarouselSlider";
import { formatNumber } from "store/utils/util";

const PropertyDetailWrapper = ({
  userDetails,
  appSize,
  getPropertyDetail,
  getPropertyFeatures,
  match: { params },
}) => {
  // declare state
  const history = useHistory();
  const [appState, updateAppState] = useState({
    isAccessAllowed: null,
  });
  const [isLoading, toggleLoader] = useState(false);
  const [pId, setPropertyId] = useState(null);
  const [photoList, setPhotoList] = useState({ list: [], count: 0 });
  const [propertyData, updatePropertyData] = useState(null);
  const [propertyFeatures, updatePropertyFeatures] = useState(null);

  useEffect(() => {
    if (params && params.id) {
      let id = params.id;
      setPropertyId(id);
      getDataHandler(id);
    }
  }, []);

  const getDataHandler = async (aId) => {
    try {
      toggleLoader(true);
      let result = await getPropertyDetail({ propertyId: aId });
      let features = await getPropertyFeatures({ propertyId: aId });
      console.log(`Property`, result);
      console.log(`Features`, features);
      if (result && features) {
        updatePropertyData(result.profile);
        updatePropertyFeatures(features);
        let photos = result.profile.photos;
        if (photos && photos.length > 0 && photos[0].photo_url) {
          let urlList = photos.map((item) => item.photo_url);
          setPhotoList({ list: urlList, count: urlList.length });
        }
      }
      toggleLoader(false);
    } catch (e) {
      toggleLoader(false);
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

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
          <Breadcrumb title="sales" breadcrumbItem="property detail" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="agency-detail-view-wrapper">
                    {propertyData && (
                      <div className="agency-detail-view-inner-wrapper">
                        {propertyData.isImported === 0 &&
                          !propertyData.isClaimed && (
                            <div className="info-box-wrapper">
                              <div className="info-box-header">
                                <div className="info-section-title-wrapper">
                                  <h3 className="info-section-title">
                                    User Information
                                  </h3>
                                </div>
                              </div>
                              <hr />

                              <dl className="row">
                                <dt className="col-sm-2 h4 py-1 "> Name</dt>
                                <dd className="col-sm-10 h5 fw-medium pt-1">
                                  {`${propertyData.user.firstName} ${propertyData.user.lastName}`}
                                </dd>

                                <dt className="col-sm-2 h4 py-1 "> Email</dt>
                                <dd className="col-sm-10 h5 fw-medium pt-1">
                                  {`${propertyData.user.email}`}
                                </dd>

                                <dt className="col-sm-2 h4 py-1 ">
                                  {" "}
                                  Phone Number
                                </dt>
                                <dd className="col-sm-10 h5 fw-medium pt-1">
                                  {`${
                                    formatNumber(
                                      propertyData.user.phoneNumber
                                    ) || "N/A"
                                  }`}
                                </dd>
                              </dl>
                              <br />
                            </div>
                          )}
                        <div className="info-box-wrapper">
                          <div className="info-box-header">
                            <div className="info-section-title-wrapper">
                              <h3 className="info-section-title">
                                Business Profile
                              </h3>
                            </div>
                          </div>

                          <hr />
                          <dl class="row">
                            <dt class="col-sm-2 h4 py-1">Title</dt>
                            <dd class="col-sm-10 h5 fw-medium pt-1">
                              {propertyData.businessTitle}
                            </dd>

                            <dt class="col-sm-2 h4 py-1 ">View Status</dt>
                            <dd class="col-sm-10 h5 fw-medium pt-1">
                              {propertyData.status ? "Active" : "Not Active"}
                            </dd>

                            <dt class="col-sm-2 h4 py-1 ">Phone Number</dt>
                            <dd class="col-sm-10 h5 fw-medium pt-1">
                              {formatNumber(propertyData.phone)}
                            </dd>

                            <dt class="col-sm-2 h4 py-1 ">Address</dt>
                            <dd class="col-sm-10 h5 fw-medium pt-1">
                              {propertyData.address}
                            </dd>

                            <dt class="col-sm-2 h4 py-1 ">City</dt>
                            <dd class="col-sm-10 h5 fw-medium pt-1">
                              {propertyData.city}
                            </dd>

                            <dt class="col-sm-2 h4 py-1 ">State</dt>
                            <dd class="col-sm-10 h5 fw-medium pt-1">
                              {propertyData.state}
                            </dd>

                            <dt class="col-sm-2 h4 py-1 ">State Code</dt>
                            <dd class="col-sm-10 h5 fw-medium pt-1">
                              {propertyData.state_abbr}
                            </dd>

                            <dt class="col-sm-2 h4 py-1 ">Zip Code</dt>
                            <dd class="col-sm-10 h5 fw-medium pt-1">
                              {propertyData.zipcode}
                            </dd>

                            <dt class="col-sm-2 h4 py-1 ">Address</dt>
                            <dd class="col-sm-10 h5 fw-medium pt-1">
                              {propertyData.address}
                            </dd>

                            {propertyData.county && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">County</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.county || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.email && (
                              <>
                                <dt class="col-sm-2 h4 py-1 pt-1">Email</dt>
                                <dd class="col-sm-10 h5 fw-medium ">
                                  {propertyData.email || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.licenseNumber && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  License Number
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.licenseNumber || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.licensureDate && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  Licensure Date
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.licensureDate || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.licenseExpires && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  License Expires
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.licenseExpires || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.licenseStatus && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  License Status
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.licenseStatus || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.recentInspectionDate && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  Recent Inspection Date
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.recentInspectionDate || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.website && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Website</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.website || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.companyName && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Company Name</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.companyName || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.administratorName && (
                              <>
                                <dt class="col-sm-2 h4 py-1">
                                  Administrator Name
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.administratorName || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.administratorAddress && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  Administrator Address
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.administratorAddress || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.administratorState && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  Administrator State
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.administratorState || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.administratorCity && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  Administrator City
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.administratorCity || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.administratorZipCode && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  Administrator ZipCode
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.administratorZipCode || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.administratorPhone && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  Administrator Phone
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.administratorPhone || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.administratorEmail && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  Administrator Email
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.administratorEmail || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.facilityId && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Facility ID</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.facilityId || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.facilityStatus && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  Facility Status
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.facilityStatus || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.facilityURL && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Facility URL</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.facilityURL || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.fax && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Fax</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.fax || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.mailingAddress && (
                              <>
                                <dt class="col-sm-2 h4 py-1">
                                  Mailing Address
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.mailingAddress || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.mailingCity && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Mailing City</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.mailingCity || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.mailingEmail && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Mailing Email</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.mailingEmail || "N/A"}
                                </dd>
                              </>
                            )}
                            {propertyData.mailingState && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Mailing State</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.mailingState || "N/A"}
                                </dd>
                              </>
                            )}
                            {propertyData.mailingZipcode && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  Mailing ZipCode
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.mailingZipcode || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.medicaidId && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Medicaid ID</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.medicaidId || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.medicareId && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Medicare ID</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.medicareId || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.administratorPreferredContactMethod && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">
                                  Administrator Preferred Contact Method
                                </dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.administratorPreferredContactMethod ||
                                    "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.administratorPreferredContactTime &&
                              propertyData.administratorPreferredContactTime.split(
                                " "
                              )[0] > 0 && (
                                <>
                                  <dt class="col-sm-2 h4 py-1 ">
                                    Administrator Preferred Contact Time
                                  </dt>
                                  <dd class="col-sm-10 h5 fw-medium pt-1">
                                    {`${propertyData.administratorPreferredContactTime} ${propertyData.administratorPreferredContactTime}`}
                                  </dd>
                                </>
                              )}

                            {propertyData.preferredBusinessContactTime &&
                              propertyData.preferredBusinessContactTime.split(
                                " "
                              )[0] > 0 && (
                                <>
                                  <dt class="col-sm-2 h4 py-1 ">
                                    Preferred Business Time
                                  </dt>
                                  <dd class="col-sm-10 h5 fw-medium pt-1">
                                    {`${propertyData.preferredBusinessContactTime} ${propertyData.preferredBusinessContactTime}`}
                                  </dd>
                                </>
                              )}

                            {propertyData.facebook && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Facebook</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.facebook || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.twitter && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Twitter</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.twitter || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.linkedIn && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">LinkedIn</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.linkedIn || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.instagram && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Instagram</dt>
                                <dd class="col-sm-10 h5 fw-medium pt-1">
                                  {propertyData.instagram || "N/A"}
                                </dd>
                              </>
                            )}

                            {propertyData.description && (
                              <>
                                <dt class="col-sm-2 h4 py-1 ">Description</dt>
                                <dd
                                  class="col-sm-10 h5 fw-medium pt-1"
                                  dangerouslySetInnerHTML={{
                                    __html: propertyData.description,
                                  }}
                                ></dd>
                              </>
                            )}
                          </dl>
                          <br />
                        </div>

                        <br />
                        {propertyData.careTypes &&
                          propertyData.careTypes.length > 0 && (
                            <div className="info-box-wrapper">
                              <div className="info-box-header">
                                <div className="info-section-title-wrapper">
                                  <h3 className="info-section-title">
                                    Care Types
                                  </h3>
                                </div>
                              </div>

                              <hr />

                              <Fragment>
                                {propertyData.careTypes.map((item) => {
                                  return (
                                    <dl
                                      className="row"
                                      key={`bs-item-${item.id}`}
                                    >
                                      <dt className="col-sm-2 h5 py-1">
                                        {item.typeDetail.title}
                                      </dt>
                                    </dl>
                                  );
                                })}
                              </Fragment>
                              <br />
                            </div>
                          )}

                        <br />
                        {propertyFeatures &&
                          propertyFeatures.services &&
                          propertyFeatures.services.length > 0 && (
                            <div className="info-box-wrapper">
                              <div className="info-box-header">
                                <div className="info-section-title-wrapper">
                                  <h3 className="info-section-title">
                                    Service Provides
                                  </h3>
                                </div>
                              </div>

                              <hr />

                              <div className="row">
                                <Fragment>
                                  {propertyFeatures.services.map((item) => {
                                    return (
                                      <dl
                                        className="col-sm-4"
                                        key={`as-item-${item.id}`}
                                      >
                                        <dt className=" h5 py-1">
                                          {item.service.title}
                                        </dt>
                                      </dl>
                                    );
                                  })}
                                </Fragment>
                              </div>
                              <br />
                            </div>
                          )}

                        <br />
                        {propertyFeatures &&
                          propertyFeatures.amenities &&
                          propertyFeatures.amenities.length > 0 && (
                            <div className="info-box-wrapper">
                              <div className="info-box-header">
                                <div className="info-section-title-wrapper">
                                  <h3 className="info-section-title">
                                    Amenity Provides
                                  </h3>
                                </div>
                              </div>

                              <hr />

                              <div className="row">
                                <Fragment>
                                  {propertyFeatures.amenities.map((item) => {
                                    return (
                                      <dl
                                        className="col-sm-4"
                                        key={`am-item-${item.id}`}
                                      >
                                        <dt className=" h5 py-1">
                                          {item.amenity.title}
                                        </dt>
                                      </dl>
                                    );
                                  })}
                                </Fragment>
                              </div>
                              <br />
                            </div>
                          )}

                        <br />
                        {propertyFeatures &&
                          propertyFeatures.communities &&
                          propertyFeatures.communities.length > 0 && (
                            <div className="info-box-wrapper">
                              <div className="info-box-header">
                                <div className="info-section-title-wrapper">
                                  <h3 className="info-section-title">
                                    Community Provides
                                  </h3>
                                </div>
                              </div>

                              <hr />

                              <div className="row">
                                <Fragment>
                                  {propertyFeatures.communities.map((item) => {
                                    return (
                                      <dl
                                        className="col-sm-4"
                                        key={`ac-item-${item.id}`}
                                      >
                                        <dt className=" h5 py-1">
                                          {item.community.title}
                                        </dt>
                                      </dl>
                                    );
                                  })}
                                </Fragment>
                              </div>
                              <br />
                            </div>
                          )}

                        <br />
                        {photoList && photoList.list.length > 0 && (
                          <div className="info-box-wrapper">
                            <div className="info-box-header">
                              <div className="info-section-title-wrapper">
                                <h3 className="info-section-title">
                                  Property Photos
                                </h3>
                              </div>
                            </div>

                            <hr />

                            <div
                              className="row"
                              style={{
                                maxWidth: "650px",
                                margin: "auto",
                              }}
                            >
                              <div className="info-box-body">
                                <div className="photo-slider-box">
                                  <div className="image-slider-wrapper">
                                    <ImageSlider
                                      imageList={photoList.list}
                                      sliceCount={photoList.count}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                          </div>
                        )}
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
  appSize: state.global.appSize,
});

const mapDispatchToProps = {
  getPropertyDetail,
  getPropertyFeatures,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyDetailWrapper);
