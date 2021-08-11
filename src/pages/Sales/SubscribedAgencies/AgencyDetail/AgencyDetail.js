import LoaderComponent from "components/Common/Loader/LoaderComponent"
import React, { useEffect, useState, Fragment } from "react"
import { connect } from "react-redux"
import { toastr } from "react-redux-toastr"
import { Link, Redirect, useHistory } from "react-router-dom"
import { getHomeCareAgencyDetail } from "../../../../store/Actions/salesAction"
import { formatDate, getQueryParams } from "../../../../store/utils/util"

const AgencyDetail = ({
  userDetails,
  appSize,
  getHomeCareAgencyDetail,
  agencyId,
}) => {
  const history = useHistory()
  const [appState, updateAppState] = useState({
    isAccessAllowed: null,
  })
  const [agencyData, updateAgencyData] = useState({
    businessData: null,
    subsData: null,
  })
  const [isLoading, toggleLoader] = useState(false)
  const { isAccessAllowed } = appState
  const { businessData, subsData } = agencyData

  useEffect(() => {
    if (userDetails && parseInt(userDetails.role) === 11) {
      updateAppState({ ...appState, isAccessAllowed: true })
    }
  }, [userDetails])

  useEffect(() => {
    if (agencyId) {
      getAgencyData(agencyId)
    }
  }, [agencyId])

  const getAgencyData = async aId => {
    try {
      toggleLoader(true)
      let result = await getHomeCareAgencyDetail(aId)
      console.log(result)
      if (result) {
        updateAgencyData({
          businessData: result.businessData,
          subsData: result.subscriptionData,
        })
        toggleLoader(false)
      }
    } catch (e) {
      console.log(e)
      toggleLoader(false)
      toastr.error("Error", e.toString())
    }
  }

  if (isAccessAllowed === false) {
    return (
      <Redirect
        to={{
          pathname: "/advisor/userDashboard",
        }}
      />
    )
  }

  if (isLoading) {
    return <LoaderComponent />
  }

  return (
    <div className="agency-detail-view-wrapper">
      {!isLoading && businessData && (
        <div className="agency-detail-view-inner-wrapper">
          {businessData.isImported === 0 && !businessData.isClaimed && (
            <div className="info-box-wrapper">
              <div className="info-box-header">
                <div className="info-section-title-wrapper">
                  <h3 className="info-section-title">
                    Administrator Information
                  </h3>
                </div>
              </div>
              <hr />

              <dl className="row">
                <dt className="col-sm-2 h4 py-1 "> Name</dt>
                <dd className="col-sm-10 h5 fw-medium">
                  {`${businessData.user.firstName} ${businessData.user.lastName}`}
                </dd>

                <dt className="col-sm-2 h4 py-1 "> Email</dt>
                <dd className="col-sm-10 h5 fw-medium">
                  {`${businessData.user.email}`}
                </dd>

                <dt className="col-sm-2 h4 py-1 "> Phone Number</dt>
                <dd className="col-sm-10 h5 fw-medium">
                  {`${businessData.user.phoneNumber}`}
                </dd>
              </dl>
              <br />
            </div>
          )}

          <div className="info-box-wrapper">
            <div className="info-box-header">
              <div className="info-section-title-wrapper">
                <h3 className="info-section-title">Business Profile</h3>
              </div>
            </div>

            <hr />
            <dl class="row">
              <dt class="col-sm-2 h4 py-1">Title</dt>
              <dd class="col-sm-10 h5 fw-medium ">{businessData.title}</dd>

              <dt class="col-sm-2 h4 py-1 ">Phone Number</dt>
              <dd class="col-sm-10 h5 fw-medium ">
                {businessData.phoneNumber}
              </dd>

              <dt class="col-sm-2 h4 py-1 ">Address</dt>
              <dd class="col-sm-10 h5 fw-medium ">{businessData.address}</dd>

              <dt class="col-sm-2 h4 py-1 ">City</dt>
              <dd class="col-sm-10 h5 fw-medium ">{businessData.city}</dd>

              <dt class="col-sm-2 h4 py-1 ">State</dt>
              <dd class="col-sm-10 h5 fw-medium ">{businessData.state}</dd>

              <dt class="col-sm-2 h4 py-1 ">Zip Code</dt>
              <dd class="col-sm-10 h5 fw-medium ">{businessData.zipCode}</dd>

              {businessData.license_number && (
                <>
                  <dt class="col-sm-2 h4 py-1 ">License Number</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.license_number || "n/a"}
                  </dd>
                </>
              )}

              {businessData.localPhone && (
                <>
                  <dt class="col-sm-2 h4 py-1 ">Local Phone</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.localPhone || "n/a"}
                  </dd>
                </>
              )}

              {businessData.website && (
                <>
                  <dt class="col-sm-2 h4 py-1 ">Website</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.website || "n/a"}
                  </dd>
                </>
              )}

              {businessData.companyName && (
                <>
                  <dt class="col-sm-2 h4 py-1 ">Company Name</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.companyName}
                  </dd>
                </>
              )}

              {businessData.administratorName && (
                <>
                  <dt class="col-sm-2 h4 py-1 ">Administrator Name</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.administratorName}
                  </dd>
                </>
              )}

              {businessData.administratorAddress && (
                <>
                  <dt class="col-sm-2 h4 py-1 "> Administrator Address</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.administratorAddress}
                  </dd>
                </>
              )}

              {businessData.administratorState && (
                <>
                  <dt class="col-sm-2 h4 py-1 ">Administrator State</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.administratorState}
                  </dd>
                </>
              )}
              {businessData.administratorCity && (
                <>
                  <dt class="col-sm-2 h4 py-1 ">Administrator City</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.administratorCity}
                  </dd>
                </>
              )}

              {businessData.administratorZipCode && (
                <>
                  <dt class="col-sm-2 h4 py-1 "> Administrator ZipCode</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.administratorZipCode}
                  </dd>
                </>
              )}

              {businessData.administratorPhone && (
                <>
                  <dt class="col-sm-2 h4 py-1 ">Administrator Phone</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.administratorPhone}
                  </dd>
                </>
              )}

              {businessData.administratorEmail && (
                <>
                  <dt class="col-sm-2 h4 py-1 ">Administrator Email</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.administratorEmail}
                  </dd>
                </>
              )}

              {businessData.administratorPreferredContactMethod && (
                <>
                  <dt class="col-sm-2 h4 py-1 ">
                    Administrator Preferred Contact Method
                  </dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.administratorPreferredContactMethod}
                  </dd>
                </>
              )}
              {businessData.administratorPreferredContactTime &&
                businessData.administratorPreferredContactTime.split(" ")[0] >
                  0 && (
                  <>
                    <dt class="col-sm-2 h4 py-1 ">
                      Administrator Preferred Contact Time
                    </dt>
                    <dd class="col-sm-10 h5 fw-medium ">
                      {`${businessData.administratorPreferredContactTime} ${businessData.administratorPreferredContactTimeZone}`}
                    </dd>
                  </>
                )}
              {businessData.preferredBusinessContactTime &&
                businessData.preferredBusinessContactTime.split(" ")[0] > 0 && (
                  <>
                    <dt class="col-sm-2 h4 py-1 "> Preferred Business Time</dt>
                    <dd class="col-sm-10 h5 fw-medium ">
                      {`${businessData.preferredBusinessContactTime} ${businessData.preferredBusinessContactTimeZone}`}
                    </dd>
                  </>
                )}
              {businessData.facebook && (
                <>
                  <dt class="col-sm-2 h4 py-1 "> Facebook</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.facebook || "n/a"}
                  </dd>
                </>
              )}
              {businessData.twitter && (
                <>
                  <dt class="col-sm-2 h4 py-1 "> Twitter</dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.twitter || "n/a"}
                  </dd>
                </>
              )}
              {businessData.linkedIn && (
                <>
                  <dt class="col-sm-2 h4 py-1 ">
                    Administrator Preferred Contact Time
                  </dt>
                  <dd class="col-sm-10 h5 fw-medium ">
                    {businessData.linkedIn || "n/a"}
                  </dd>
                </>
              )}
              {businessData.instagram && (
                <>
                  <dt class="col-sm-2 h4 py-1 "> Instagram</dt>
                  <dd class="col-sm-10 h5 fw-medium">
                    {businessData.instagram || "n/a"}
                  </dd>
                </>
              )}
              {businessData.description && (
                <>
                  <dt class="col-sm-2 h4 py-1 "> Description</dt>
                  <dd
                    class="col-sm-10 h5 fw-medium"
                    dangerouslySetInnerHTML={{
                      __html: businessData.description,
                    }}
                  ></dd>
                </>
              )}
            </dl>
            <br />
          </div>

          {businessData.services && businessData.services.length > 0 && (
            <div className="info-box-wrapper">
              <div className="info-box-header">
                <div className="info-section-title-wrapper">
                  <h3 className="info-section-title">Service Provides</h3>
                </div>
              </div>

              <hr />

              <Fragment>
                {businessData.services.map(item => {
                  return (
                    <dl className="row" key={`bs-item-${item.id}`}>
                      <dt className="col-sm-2 h5 py-1">
                        {item.service.category.title}
                      </dt>
                      <dd className="col-sm-10 h5 fw-medium ">
                        {item.service.title}
                      </dd>
                    </dl>
                  )
                })}
              </Fragment>
              <br />
            </div>
          )}

          {businessData.services && businessData.services.length > 0 && (
            <div className="info-box-wrapper">
              <div className="info-box-header">
                <div className="info-section-title-wrapper">
                  <h3 className="info-section-title">
                    Subscription Information
                  </h3>
                </div>
              </div>
              <hr />

              <dl className="row">
                <dt className="col-sm-2 h4 py-1 "> Status</dt>
                <dd className="col-sm-10 h5 fw-medium">
                  {subsData.status === 1 ? "Active" : "Paused"}
                </dd>

                <dt className="col-sm-2 h4 py-1 "> Lead Credit</dt>
                <dd className="col-sm-10 h5 fw-medium">
                  {subsData.leadCredit}
                </dd>

                <dt className="col-sm-2 h4 py-1 "> Active</dt>
                <dd className="col-sm-10 h5 fw-medium">
                  {subsData.package.title}
                </dd>

                <dt className="col-sm-2 h4 py-1 "> Last Renewal</dt>
                <dd className="col-sm-10 h5 fw-medium">
                  {formatDate(subsData.lastRenewedOn)}
                </dd>
              </dl>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
})

const mapDispatchToProps = { getHomeCareAgencyDetail }

export default connect(mapStateToProps, mapDispatchToProps)(AgencyDetail)
