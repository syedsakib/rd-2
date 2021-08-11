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
} from "reactstrap"
import Switch from "react-switch"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

//Import Breadcrumb
import Breadcrumb from "../../../../../components/Common/Breadcrumb"

//redux & actions
import { getEmailTemplateByType } from "../../../../../store/Actions/mailAction"
import { getseniorLivingtypeWithoutStatus } from "../../../../../store/Actions/partnerAction"
import {
  getAllUSStates,
  getCitiesWithZipCodes,
} from "../../../../../store/Actions/userAction"
import {
  updatePropertyFilterStates,
  clearPropertyFilterState,
} from "../../../../../store/Actions/adviserAction"
import {
  getSeniorLivingList,
  sendMailBySales,
} from "../../../../../store/Actions/salesAction"

import LoaderComponent from "components/Common/Loader/LoaderComponent"
import ButtonComp from "components/Common/Button/Button"
import ReactTooltip from "react-tooltip"
import MultiSelectCheckbox from "components/Common/MultiSelectbox/MultiSelectBox"
import { formatPhoneNumber } from "react-phone-number-input"
import {
  addPlus,
  formatDate,
  generatePropertyUrl,
  getFrontUrl,
} from "store/utils/util"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const PropertyListWrapper = ({
  getAllUSStates,
  getCitiesWithZipCodes,
  getSeniorLivingList,
  updatePropertyFilterStates,
  getseniorLivingtypeWithoutStatus,
  clearPropertyFilterState,
  filterState,
  userDetails,
  getEmailTemplateByType,
  sendMailBySales,
}) => {
  // declare state
  const history = useHistory()
  const [isLoading, toggleLoader] = useState(false)
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  })
  const [emailData, setEmailData] = useState(false)
  const [totalCount, updateTotalCount] = useState(0)
  const [stateList, updateStateList] = useState([])
  const [categoryList, updateCategoryList] = useState([])
  const [categoryOptionList, updateCategoryOptionList] = useState([])
  const [contactModalState, updateContactModalState] = useState(null)
  const [modalData, updateModalData] = useState({
    openModalName: null,
    selectedModalData: null,
  })
  const { openModalName, selectedModalData } = modalData

  const {
    selectedState,
    selectedCities,
    selectedZipCodes,
    selectedCategories,
    activePage,
    searchText,
    limit,
    stateCities,
    cityList,
    zipCodeList,
  } = filterState
  const { rows, count } = listState

  useEffect(() => {
    return () => {
      //clearPropertyFilterState();
    }
  }, [])

  useEffect(() => {
    if (userDetails) {
      getUsStatesHandler()
      getSeniorLivingCategoryListHandler()
      getEmailTemplateHandler()
    }
  }, [userDetails])

  useEffect(() => {
    getDataListHandler()
  }, [
    activePage,
    selectedState,
    selectedCities,
    selectedZipCodes,
    searchText,
    selectedCategories,
  ])

  const getEmailTemplateHandler = async () => {
    try {
      let result = await getEmailTemplateByType(37)
      console.log(`Email Data `, result)
      if (result) {
        setEmailData(result)
      }
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  const getUsStatesHandler = async () => {
    try {
      let result = await getAllUSStates()
      if (result) {
        updateStateList(result)
      }
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  const getSeniorLivingCategoryListHandler = async () => {
    try {
      let result = await getseniorLivingtypeWithoutStatus()
      if (result) {
        updateCategoryList(result)
        let cOptionList = result.map(item => ({
          key: item.id,
          value: item.id,
          text: item.title,
        }))
        updateCategoryOptionList(cOptionList)
      }
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  const getDataListHandler = async () => {
    try {
      toggleLoader(true)
      let result = await getSeniorLivingList({
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
        selectedCategories,
        pageNumber: activePage,
        limit,
      })
      console.log(`Data List `, result)
      if (result) {
        const { rows, count } = result
        updateListState({
          rows,
          count,
        })
        updateTotalCount(count)
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  const updateFilterStateHandler = newState => {
    updatePropertyFilterStates({
      ...filterState,
      ...newState,
    })
  }

  const handleSearchInput = e => {
    try {
      let value = e.target.value
      updateFilterStateHandler({
        searchText: value,
        activePage: 1,
      })
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  const handlePageChange = pNumber => {
    updateFilterStateHandler({
      activePage: pNumber,
    })
  }

  // location related methods

  const onStateChange = async e => {
    try {
      const val = e.target.value
      if (val !== "all") {
        let result = await getCitiesWithZipCodes(val)
        if (result) {
          //updateStateCityList(result);
          if (result && result.length > 0) {
            const cities = [...new Set(result.map(item => item.city))]
            const fCities = cities.map(item => ({
              value: item,
              text: item,
              key: item,
            }))
            updateFilterStateHandler({
              cityList: fCities,
              stateCities: result,
              selectedState: val,
              activePage: 1,
            })
          } else {
            updateFilterStateHandler({
              cityList: [],
              zipCodeList: [],
              stateCities: [],
              selectedState: val,
              activePage: 1,
            })
          }
        }
      } else {
        updateFilterStateHandler({
          cityList: [],
          zipCodeList: [],
          stateCities: [],
          selectedState: val,
          activePage: 1,
        })
      }
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
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
        let newZipCodes = selectedZipCodes.filter(item => {
          let result = allZipList.filter(it => it.key === item)
          if (result[0]) {
            return item
          }
          return null
        })
        updateFilterStateHandler({
          selectedCities: cities,
          selectedZipCodes: newZipCodes,
          activePage: 1,
          zipCodeList: allZipList,
        })
      } else {
        updateFilterStateHandler({
          selectedCities: cities,
          selectedZipCodes: [],
          zipCodeList: [],
        })
      }
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  const onZipCodeChange = zips => {
    try {
      updateFilterStateHandler({
        selectedZipCodes: zips,
        activePage: 1,
      })
      if (zips.length === 0) {
        updateFilterStateHandler({
          zipCodeList: [],
        })
      }
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  const onCategoryChange = sList => {
    try {
      updateFilterStateHandler({
        selectedCategories: sList,
        activePage: 1,
      })
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  // contact modal
  const openContactModal = (e, data) => {
    updateContactModalState({
      isOpen: true,
      itemData: data,
    })
  }
  const closeContactModal = shouldReload => {
    updateContactModalState(null)
  }

  const openModal = (modalName, data) => {
    updateModalData({
      openModalName: modalName,
      selectedModalData: data,
    })
  }
  const closeModal = () => {
    updateModalData({
      openModalName: null,
      selectedModalData: null,
    })
  }

  const callBackHandler = async payload => {
    try {
      let result = await sendMailBySales({
        ...payload,
        templateId: 37,
        sendTo: "senior-living",
      })
      console.log(`Mail Send `, result)
      if (result) {
        return true
      }
      return false
    } catch (e) {
      return false
    }
  }

  //TABLE COMPONENTS
  const dt = useRef(null)

  const titleBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.businessTitle}</span>
      </React.Fragment>
    )
  }
  const categoryBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          {rowData.careTypes.map(item => {
            return <div key={`i-${item.id}`}>{item.typeDetail.title}</div>
          })}
        </span>
      </React.Fragment>
    )
  }
  const phoneBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          {rowData.phone ? formatPhoneNumber(addPlus(rowData.phone)) : "N/A"}
        </span>
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

  const cityBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.city ? rowData.city : "N/A"}</span>
      </React.Fragment>
    )
  }

  const zipcodeBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.zipcode ? rowData.zipcode : "N/A"}</span>
      </React.Fragment>
    )
  }

  const actionBodyTemplate = ({
    id,
    careTypes,
    state,
    city,
    slug,
    businessTitle,
  }) => {
    let careType = careTypes[0]
      ? careTypes[0].typeDetail.title
      : "assisted-living"
    let pUrl = generatePropertyUrl(careType, state, city, slug)
    pUrl = getFrontUrl() + pUrl
    return (
      <React.Fragment>
        {
          <span>
            <div class="d-flex justify-content-center">
              <span>
                <ButtonComp
                  icon="eye"
                  onClick={() => {
                    window.open(`/sales/senior-living/detail/${id}`)
                  }}
                  toolTip="View Detail"
                  btnClass="normal"
                />
              </span>
              <span>
                <ButtonComp
                  icon="link"
                  onClick={() => {
                    window.open(pUrl)
                  }}
                  toolTip="View Page"
                  btnClass="normal"
                />
              </span>
              <span>
                <ButtonComp
                  icon="envelope"
                  onClick={() => {
                    openModal("mail", {
                      LINK: pUrl,
                      NAME: businessTitle,
                    })
                  }}
                  toolTip="Send Mail"
                  btnClass="normal"
                />
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
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="sales" breadcrumbItem="property list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-4">
                      <label className="">Filter By Status</label>
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
                    <div className="col-md-6">
                      <label className="">Search Property</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-phone"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="name / phone / email"
                          onChange={handleSearchInput}
                          value={searchText}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-6">
                      <label className="">Filter By VoiceMail</label>
                      <MultiSelectCheckbox
                        optionList={categoryOptionList}
                        onSelectHandler={onCategoryChange}
                        selectedValue={selectedCategories}
                        placeholder="All"
                        filterType="categories"
                        id="senior-living-categories"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        {/* <ButtonComp
                          icon="sync"
                          onClick={() => {
                            getDataList()
                          }}
                          toolTip="refresh"
                          tooltipType="info"
                        /> */}
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
                              field="businessTitle"
                              header="Title"
                              body={titleBodyTemplate}
                              sortable
                            />
                            <Column
                              field="careTypes"
                              header="Category"
                              body={categoryBodyTemplate}
                              sortable
                            />
                            <Column
                              field="phone"
                              header="Phone"
                              body={phoneBodyTemplate}
                              sortable
                              //   style={{
                              //     width: "8%",
                              //   }}
                            />
                            <Column
                              field="state"
                              header="State"
                              body={stateBodyTemplate}
                              sortable
                              style={{
                                width: "10%",
                              }}
                            />
                            <Column
                              field="city"
                              header="City"
                              body={cityBodyTemplate}
                              sortable
                              style={{
                                width: "10%",
                              }}
                            />
                            <Column
                              field="zipcode"
                              header="Zip Code"
                              body={zipcodeBodyTemplate}
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
                            />
                          </DataTable>
                        </div>
                      </div>
                      <div>
                        {!isLoading && count > limit && (
                          <div className="pro-pagination">
                            <Pagination
                              activePage={activePage}
                              itemsCountPerPage={limit}
                              totalItemsCount={totalCount}
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
  appSize: state.global.appSize,
  filterState: state.adviser.propertyListFilterState,
})

const mapDispatchToProps = {
  getCitiesWithZipCodes,
  getSeniorLivingList,
  updatePropertyFilterStates,
  getseniorLivingtypeWithoutStatus,
  getAllUSStates,
  clearPropertyFilterState,
  getEmailTemplateByType,
  sendMailBySales,
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyListWrapper)
