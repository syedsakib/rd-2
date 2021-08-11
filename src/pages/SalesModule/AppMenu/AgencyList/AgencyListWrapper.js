import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { toastr } from "react-redux-toastr"
import { connect, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import Pagination from "react-js-pagination"
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  InputGroup,
  Button,
  Input,
} from "reactstrap"
import Switch from "react-switch"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb"

//redux & actions
import {
  getAssignedAgencyList,
  getSaleUserRegions,
  updateAgencySaleStatus,
  exportAssignedAgencyList,
  getSalesUserStates,
  updateAgencyFilterState,
  updateAgencyLocationFilterState,
} from "../../../../store/Actions/salesAction"
import { getEmailTemplateByType } from "../../../../store/Actions/mailAction"
import {
  getAllUSStates,
  getCitiesWithZipCodes,
} from "../../../../store/Actions/userAction"

import LoaderComponent from "components/Common/Loader/LoaderComponent"
import ButtonComp from "components/Common/Button/Button"
import ReactTooltip from "react-tooltip"
import MultiSelectCheckbox from "components/Common/MultiSelectbox/MultiSelectBox"
import { formatPhoneNumber } from "react-phone-number-input"
import {
  addPlus,
  formatDate,
  generateHomeCareUrl,
  getFrontUrl,
} from "store/utils/util"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const AgencyListWrapper = ({
  getAssignedAgencyList,
  userDetails,
  appSize,
  getCitiesWithZipCodes,
  updateAgencySaleStatus,
  getEmailTemplateByType,
  exportAssignedAgencyList,
  getSalesUserStates,
  filterState,
  locationFilterState,
  updateAgencyFilterState,
  updateAgencyLocationFilterState,
}) => {
  // declare state
  const history = useHistory()
  const {
    activePage,
    selectedSaleStatus,
    selectedClaimStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    searchText,
    selectedRadius,
  } = filterState
  const [appState, updateAppState] = useState({
    isFileExporting: false,
  })
  const [isLoading, toggleLoader] = useState(false)
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  })
  const [modalData, updateModalData] = useState({
    isDetailModalOpen: false,
    isNoteViewerModalOpen: false,
    isContactViewerModalOpen: false,
    modalBodyData: null,
    selectedBusinessId: null,
    isEmailSenderModalOpen: false,
    selectedBusinessEmail: null,
    emailTemplate: null,
    selectedBusinessTitle: null,
    isReminderModalOpen: false,
    callBackHandler: null,
    selectedAgencyUrl: null,
    selectedContactAgency: null,
  })

  const { stateList, stateCities, cityList, zipCodeList } = locationFilterState

  const { rows, count } = listState
  const {
    isDetailModalOpen,
    isNoteViewerModalOpen,
    isContactViewerModalOpen,
    isEmailSenderModalOpen,
    selectedBusinessEmail,
    modalBodyData,
    selectedBusinessId,
    emailTemplate,
    selectedBusinessTitle,
    isReminderModalOpen,
    callBackHandler,
    selectedAgencyUrl,
    selectedContactAgency,
  } = modalData

  const updateFilterState = newState => {
    updateAgencyFilterState({
      ...filterState,
      ...newState,
    })
  }

  const updateLocationFilterState = newState => {
    updateAgencyLocationFilterState({
      ...locationFilterState,
      ...newState,
    })
  }

  useEffect(() => {
    getUsStatesHandler()
    getEmailTemplateHandler()
    agencyListDataFetchHandler(
      activePage,
      selectedSaleStatus,
      selectedClaimStatus,
      selectedState,
      selectedCities,
      selectedZipCodes,
      searchText
    )
  }, [])

  const getEmailTemplateHandler = async () => {
    try {
      let result = await getEmailTemplateByType(35)
      console.log(result)
      if (result) {
        updateModalData({
          ...modalData,
          emailTemplate: result,
        })
      }
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const getUsStatesHandler = async () => {
    try {
      let result = await getSalesUserStates()
      if (result) {
        let sList = result.map(item => ({ state_name: item.state }))
        updateLocationFilterState({
          stateList: sList,
        })
      }
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const agencyListDataFetchHandler = async (
    activePage = 1,
    selectedSaleStatus,
    selectedClaimStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    searchText,
    sRadius = selectedRadius
  ) => {
    try {
      toggleLoader(true)
      let result = await getAssignedAgencyList(activePage, {
        selectedSaleStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
        selectedRadius: sRadius,
      })
      console.log("agencyListDataFetchHandler", result)
      if (result) {
        const { rows, count } = result
        updateListState({
          rows,
          count,
        })
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const handleSearchInput = e => {
    try {
      let value = e.target.value

      updateFilterState({
        searchText: value,
        activePage: 1,
      })

      agencyListDataFetchHandler(
        1,
        selectedSaleStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        value
      )
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }
  const onStatusChange = (value, statusType) => {
    try {
      if (statusType === "saleStatus") {
        updateFilterState({
          selectedSaleStatus: value,
          activePage: 1,
        })
        agencyListDataFetchHandler(
          1,
          value,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          selectedZipCodes,
          searchText,
          selectedRadius
        )
      } else if (statusType === "claimStatus") {
        updateFilterState({
          selectedClaimStatus: value,
          activePage: 1,
        })
        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          value,
          selectedState,
          selectedCities,
          selectedZipCodes,
          searchText,
          selectedRadius
        )
      } else if (statusType === "onRadiusChange") {
        updateFilterState({
          selectedRadius: value,
          activePage: 1,
        })
      }
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }
  const handlePageChange = pNumber => {
    updateFilterState({
      activePage: pNumber,
    })
    agencyListDataFetchHandler(
      pNumber,
      selectedSaleStatus,
      selectedClaimStatus,
      selectedState,
      selectedCities,
      selectedZipCodes,
      searchText,
      selectedRadius
    )
  }

  const onStateChange = async e => {
    try {
      const val = e.target.value
      updateFilterState({
        selectedState: val,
        activePage: 1,
      })
      if (val !== "all") {
        let result = await getCitiesWithZipCodes(val)
        if (result) {
          const cities = [...new Set(result.map(item => item.city))]
          const fCities = cities.map(item => ({
            value: item,
            text: item,
            key: item,
          }))
          updateLocationFilterState({
            stateCities: result,
            cityList: fCities,
          })
          agencyListDataFetchHandler(
            1,
            selectedSaleStatus,
            selectedClaimStatus,
            val,
            [],
            [],
            searchText
          )
        }
      } else {
        updateLocationFilterState({
          stateCities: [],
          cityList: [],
          zipCodeList: [],
        })
        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          selectedClaimStatus,
          "all",
          [],
          [],
          searchText
        )
      }
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const onCityChange = async cities => {
    try {
      if (cities.length > 0) {
        let allZipList = []
        for (let c of cities) {
          let zips = stateCities
            .filter(item => item.city === c)
            .map(item => ({
              value: item.zip,
              text: item.zip,
              key: item.zip,
            }))
          allZipList = [...allZipList, ...zips]
        }
        updateLocationFilterState({
          zipCodeList: allZipList,
        })
        let newZipCodes = selectedZipCodes.filter(item => {
          let result = allZipList.filter(it => it.key === item)
          if (result[0]) {
            return item
          }
          return null
        })
        updateFilterState({
          selectedCities: cities,
          selectedZipCodes: newZipCodes,
          activePage: 1,
        })
        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          selectedClaimStatus,
          selectedState,
          cities,
          newZipCodes,
          searchText
        )
      } else {
        updateLocationFilterState({
          zipCodeList: [],
        })
        updateFilterState({
          selectedCities: cities,
          selectedZipCodes: [],
        })
        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          selectedClaimStatus,
          selectedState,
          cities,
          [],
          searchText
        )
      }
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const onZipCodeChange = zips => {
    try {
      updateFilterState({
        selectedZipCodes: zips,
        activePage: 1,
      })
      if (zips.length === 0) {
        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          [],
          searchText
        )
      } else {
        agencyListDataFetchHandler(
          1,
          selectedSaleStatus,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          zips,
          searchText
        )
      }
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const changeSaleStatus = async (id, value) => {
    try {
      let result = await updateAgencySaleStatus(id, value)
      changeSaleStatusHandler(id, value)
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const changeSaleStatusHandler = async (id, value) => {
    try {
      let newRows = rows.map(item => {
        if (item.id == id) {
          item.saleStatus = value
        }
        return item
      })
      if (selectedSaleStatus !== "all") {
        newRows = newRows.filter(item => item.saleStatus === selectedSaleStatus)
      }
      updateListState({
        ...listState,
        rows: newRows,
      })
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const openDetailModalHandler = (e, data) => {
    updateModalData({
      ...modalData,
      modalBodyData: data || null,
      isDetailModalOpen: !isDetailModalOpen,
    })
  }

  const toggleNoteViewerModal = (e, businessId) => {
    updateModalData({
      ...modalData,
      isNoteViewerModalOpen: !isNoteViewerModalOpen,
      selectedBusinessId: businessId,
    })
  }

  const toggleContactViewerModal = (e, businessId, contactData) => {
    updateModalData({
      ...modalData,
      isContactViewerModalOpen: !isContactViewerModalOpen,
      selectedBusinessId: businessId,
      selectedContactAgency: contactData,
    })
  }

  const toggleEmailSenderModal = (e, id, email, title, url) => {
    updateModalData({
      ...modalData,
      isEmailSenderModalOpen: !isEmailSenderModalOpen,
      selectedBusinessEmail: email,
      selectedBusinessTitle: title,
      selectedBusinessId: id,
      callBackHandler: null,
      selectedAgencyUrl: url,
    })
  }

  const toggleReminderModalModal = (id, email, title, callBack) => {
    updateModalData({
      ...modalData,
      isReminderModalOpen: !isReminderModalOpen,
      selectedBusinessEmail: email,
      selectedBusinessTitle: title,
      selectedBusinessId: id,
      callBackHandler: callBack,
    })
  }

  const exportDataList = async () => {
    try {
      updateAppState({
        ...appState,
        isFileExporting: true,
      })
      let result = await exportAssignedAgencyList({
        selectedSaleStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
      })
      updateAppState({
        ...appState,
        isFileExporting: false,
      })
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }
  //TABLE COMPONENTS
  const dt = useRef(null)

  const titleBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.title ? rowData.title : "N/A"}</span>
      </React.Fragment>
    )
  }

  const phoneNumberBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          {rowData.phoneNumber
            ? formatPhoneNumber(addPlus(rowData.phoneNumber))
            : "N/A"}
        </span>
      </React.Fragment>
    )
  }

  const zipCodeBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.zipCode ? rowData.zipCode : "N/A"}</span>
      </React.Fragment>
    )
  }

  const cityBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.city ? rowData.city : "N/A"}</span>
      </React.Fragment>
    )
  }

  const stateBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.state ? rowData.state : "N/A"}</span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = ({ id, title, email, saleStatus }) => {
    return (
      <React.Fragment>
        <span>
          <select
            className="form-control form-select"
            id={id}
            value={saleStatus || "not-contacted"}
            onChange={e => {
              let value = e.target.value
              if (value === "followup") {
                toggleReminderModalModal(id, email, title, () => {
                  changeSaleStatusHandler(id, value)
                })
              } else {
                changeSaleStatus(id, value)
              }
            }}
          >
            <option value="not-contacted">Not-Contacted</option>
            <option value="disconnected-number">Disconnected-Number</option>
            <option value="contacted">Contacted</option>
            <option value="emailed">Emailed</option>
            <option value="registered">Registered</option>
            <option value="subscribed">Subscribed</option>
            <option value="paused">Paused</option>
            <option value="followup">Followup</option>
          </select>
        </span>
      </React.Fragment>
    )
  }

  const actionBodyTemplate = ({
    id,
    title,
    phoneNumber,
    state,
    city,
    email,
    slug,
    sales,
  }) => {
    let approvalStatus = sales ? sales.approvalStatus : null
    return (
      <React.Fragment>
        {
          <span>
            <div class="d-flex justify-content-center">
              <span>
                <ButtonComp
                  icon="eye"
                  onClick={e => {
                    history.push(`/sales/agency/${id}?name=${title}`, appState)
                  }}
                  toolTip="View Detail"
                  btnClass="normal"
                />
                <ButtonComp
                  icon="link"
                  onClick={e => {
                    window.open(`${getFrontUrl()}/home-care/${slug}`)
                  }}
                  toolTip="Go to Page"
                  btnClass="normal"
                />
                <ButtonComp
                  icon="pencil-square-o"
                  onClick={e => {
                    history.push({
                      pathname: `/sales/editAgency/${id}`,
                      pageNo: activePage,
                    })
                  }}
                  toolTip="Edit Data"
                  btnClass="normal"
                />
                <ButtonComp
                  icon="sticky-note-o"
                  onClick={e => {
                    toggleNoteViewerModal(e, id)
                  }}
                  toolTip="Notes"
                  btnClass="normal"
                />
                <ButtonComp
                  icon="envelope"
                  onClick={e => {
                    let url = generateHomeCareUrl(state, city, slug)
                    toggleEmailSenderModal(e, id, email, title, url)
                  }}
                  toolTip="Send Mail"
                  btnClass="normal"
                />
                <ButtonComp
                  icon="calendar"
                  onClick={e => {
                    toggleReminderModalModal(id, email, title, () => {
                      changeSaleStatusHandler(id, "followup")
                    })
                  }}
                  toolTip="Create Schedule"
                  btnClass="normal"
                />
                <ButtonComp
                  icon="address-book"
                  onClick={e => {
                    toggleContactViewerModal(e, id, {
                      title,
                      phoneNumber,
                    })
                  }}
                  toolTip="Contacts"
                  btnClass="normal"
                />
                {approvalStatus === "pending" ? (
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={e => {}}
                    data-tooltip="Pending"
                  >
                    <i class="fa fa-clock-o"></i>
                  </button>
                ) : approvalStatus === "approved" ? (
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={e => {}}
                    data-tooltip="Approved"
                  >
                    <i class="fa fa-check"></i>
                  </button>
                ) : approvalStatus === "denied" ? (
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={e => {}}
                    data-tooltip="Rejected"
                  >
                    <i class="fa fa-times"></i>
                  </button>
                ) : null}
              </span>
            </div>
          </span>
        }
      </React.Fragment>
    )
  }

  //TABLE COMPONENTS END

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="sales" breadcrumbItem="my agency list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-4">
                      <label className="">Filter By State</label>
                      <select
                        className="form-control form-select"
                        value={selectedState}
                        onChange={onStateChange}
                      >
                        <option value="all">All</option>
                        {stateList &&
                          stateList.map(({ state_name }, index) => {
                            return (
                              <option value={state_name} key={`s-${index}`}>
                                {state_name}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="">Filter By City</label>
                      <MultiSelectCheckbox
                        optionList={cityList}
                        onSelectHandler={onCityChange}
                        selectedValue={selectedCities}
                        placeholder="All"
                        filterType="city"
                        id="agency-city-select"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="">Filter By ZipCode</label>
                      <MultiSelectCheckbox
                        optionList={zipCodeList}
                        onSelectHandler={onZipCodeChange}
                        selectedValue={selectedZipCodes}
                        placeholder="All"
                        filterType="zipCode"
                        id="agency-zip-select"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row filter-row">
                    <div className="col-md-3">
                      <label className="">Search Agency</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="agency name / phone / email"
                          onChange={handleSearchInput}
                          value={searchText}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-3">
                      <label className="">Filter By Sale Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedSaleStatus}
                        onChange={e => {
                          onStatusChange(e.target.value, "saleStatus")
                        }}
                      >
                        <option value="all">All</option>
                        <option value="not-contacted">Not-Contacted</option>
                        <option value="disconnected-number">
                          Disconnected-Number
                        </option>
                        <option value="contacted">Contacted</option>
                        <option value="emailed">Emailed</option>
                        <option value="registered">Registered</option>
                        <option value="subscribed">Subscribed</option>
                        <option value="paused">Paused</option>
                        <option value="followup">Followup</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="">Filter By Claim Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedClaimStatus}
                        onChange={e => {
                          onStatusChange(e.target.value, "claimStatus")
                        }}
                      >
                        <option value="all">All</option>
                        <option value={0}>Not Claimed</option>
                        <option value={1}>Claimed</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="">Set Radius (KM)</label>
                      <Input
                        type="text"
                        placeholder="Set radius in KM"
                        onBlur={e => {
                          agencyListDataFetchHandler(
                            1,
                            selectedSaleStatus,
                            selectedClaimStatus,
                            selectedState,
                            selectedCities,
                            selectedZipCodes,
                            searchText,
                            e.target.value
                          )
                        }}
                        onChange={e => {
                          onStatusChange(e.target.value, "onRadiusChange")
                        }}
                        value={selectedRadius}
                        disabled={
                          selectedState === "all" ||
                          selectedCities.length === 0 ||
                          selectedCities.length > 1 ||
                          selectedZipCodes.length > 1
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">{/*  */}</div>
                      <div className="col-sm-6 text-end">
                        {count > 0 && (
                          <div className="record-counter">
                            Total Agencies Found ({count})
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
                              field="business.title"
                              header="Title"
                              body={titleBodyTemplate}
                              sortable
                            />
                            <Column
                              field="business.phoneNumber"
                              header="Phone Number"
                              body={phoneNumberBodyTemplate}
                              sortable
                            />
                            <Column
                              field="business.zipCode"
                              header="ZipCode"
                              body={zipCodeBodyTemplate}
                              sortable
                            />
                            <Column
                              field="business.city"
                              header="City"
                              body={cityBodyTemplate}
                              sortable
                              //   style={{
                              //     width: "8%",
                              //   }}
                            />
                            <Column
                              field="business.state"
                              header="State"
                              body={stateBodyTemplate}
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
                              style={{
                                width: "30%",
                              }}
                            />
                          </DataTable>
                        </div>
                      </div>
                      <div>
                        {!isLoading && count > 20 && (
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
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.loggedInUser,
  homeCare: state.homeCare,
  appSize: state.global.appSize,
  filterState: state.sale.agencyListFilterState,
  locationFilterState: state.sale.agencyListLocationFilterState,
})

const mapDispatchToProps = {
  getAssignedAgencyList,
  updateAgencySaleStatus,
  getSaleUserRegions,
  getAllUSStates,
  getCitiesWithZipCodes,
  getEmailTemplateByType,
  exportAssignedAgencyList,
  getSalesUserStates,
  updateAgencyFilterState,
  updateAgencyLocationFilterState,
}

export default connect(mapStateToProps, mapDispatchToProps)(AgencyListWrapper)
