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
} from "reactstrap"
import Switch from "react-switch"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb"

//redux & actions
import {
  getAllUSStates,
  getCitiesWithZipCodes,
} from "../../../../store/Actions/userAction"
import {
  getHomeCareAgencyList,
  getSaleUsers,
  assignBusinessToSales,
  updateAgencyStatus,
} from "../../../../store/Actions/salesAction"
import LoaderComponent from "components/Common/Loader/LoaderComponent"
import ButtonComp from "components/Common/Button/Button"
import ReactTooltip from "react-tooltip"
import MultiSelectCheckbox from "components/Common/MultiSelectbox/MultiSelectBox"
import { formatPhoneNumber } from "react-phone-number-input"
import { addPlus } from "store/utils/util"

const HomeCareAgencyList = ({
  getHomeCareAgencyList,
  getAllUSStates,
  getCitiesWithZipCodes,
  getSaleUsers,
  assignBusinessToSales,
  updateAgencyStatus,
}) => {
  // declare state
  const [appState, updateAppState] = useState({
    activePage: 1,
    selectedAssignStatus: "",
    selectedClaimStatus: "",
    selectedState: "all",
    selectedCities: [],
    selectedZipCodes: [],
    searchText: "",
    selectedUser: 0,
    isAllSelected: false,
    maxLimit: 2000,
    selectedStatus: 1,
  })
  const [isLoading, toggleLoader] = useState(false)
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  })
  const [totalCount, updateTotalCount] = useState(0)
  const [saleUserList, updateSaleUsers] = useState([])
  const [stateList, updateStateList] = useState([])
  const [stateCities, updateStateCityList] = useState([])
  const [cityList, updateCityList] = useState([])
  const [zipCodeList, updateZipCodeList] = useState([])
  const [selectedAgencies, updateSelectedAgencies] = useState([])
  const {
    selectedAssignStatus,
    selectedClaimStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    activePage,
    searchText,
    selectedUser,
    isAllSelected,
    maxLimit,
    selectedStatus,
  } = appState
  const { rows, count } = listState

  useEffect(() => {
    getSaleUserHandler()
    getUsStatesHandler()
    agencyListDataFetchHandler()
  }, [])

  useEffect(() => {
    updateSelectedAgencies([])
  }, [isAllSelected])

  const getUsStatesHandler = async () => {
    try {
      let result = await getAllUSStates()
      if (result) {
        updateStateList(result)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getSaleUserHandler = async () => {
    try {
      let result = await getSaleUsers()
      //      console.log(`Sale User `, result);
      if (result) {
        updateSaleUsers(result)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const agencyListDataFetchHandler = async (
    activePage = 1,
    selectedAssignStatus,
    selectedClaimStatus,
    selectedState,
    selectedCities,
    selectedZipCodes,
    searchText,
    mxLimit,
    resetSelection = true,
    selectedStatus
  ) => {
    try {
      toggleLoader(true)
      if (resetSelection) {
        updateSelectedAgencies([])
      }
      let result = await getHomeCareAgencyList(activePage, {
        selectedAssignStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
        mxLimit,
        selectedStatus,
      })
      if (result) {
        const { rows, count } = result
        updateListState({
          rows,
          count,
        })
        updateTotalCount(getTotalCount(maxLimit, count))
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSearchInput = e => {
    try {
      let value = e.target.value
      updateAppState({
        ...appState,
        searchText: value,
        isAllSelected: false,
        activePage: 1,
      })
      agencyListDataFetchHandler(
        1,
        selectedAssignStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        value,
        maxLimit,
        true,
        selectedStatus
      )
    } catch (e) {
      console.log(e)
    }
  }
  const onStatusChange = (value, statusType) => {
    try {
      if (statusType === "assignStatus") {
        updateAppState({
          ...appState,
          selectedAssignStatus: value,
          isAllSelected: false,
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
          maxLimit,
          true,
          selectedStatus
        )
      } else if (statusType === "claimStatus") {
        updateAppState({
          ...appState,
          selectedClaimStatus: value,
          isAllSelected: false,
          activePage: 1,
        })
        agencyListDataFetchHandler(
          1,
          selectedAssignStatus,
          value,
          selectedState,
          selectedCities,
          selectedZipCodes,
          searchText,
          maxLimit,
          true,
          selectedStatus
        )
      } else if (statusType === "maxLimit") {
        console.log(`Entered MaxLimit`)
        updateAppState({
          ...appState,
          isAllSelected: false,
          activePage: 1,
          maxLimit: value,
        })
        updateTotalCount(getTotalCount(value, count))
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handlePageChange = pNumber => {
    updateAppState({
      ...appState,
      activePage: pNumber,
    })
    console.log(`Selected State is ${selectedState}`)
    agencyListDataFetchHandler(
      pNumber,
      selectedAssignStatus,
      selectedClaimStatus,
      selectedState,
      selectedCities,
      selectedZipCodes,
      searchText,
      maxLimit,
      false,
      selectedStatus
    )
  }

  const onStateChange = async e => {
    try {
      const val = e.target.value
      updateAppState({
        ...appState,
        selectedState: val,
        isAllSelected: false,
        activePage: 1,
      })
      if (val !== "all") {
        let result = await getCitiesWithZipCodes(val)
        if (result) {
          const cities = [...new Set(result.map(item => item.city))]
          updateStateCityList(result)
          updateCityList(
            cities.map(item => ({ value: item, text: item, key: item }))
          )
          agencyListDataFetchHandler(
            1,
            selectedAssignStatus,
            selectedClaimStatus,
            val,
            [],
            [],
            searchText,
            maxLimit,
            true,
            selectedStatus
          )
        }
      } else {
        updateStateCityList([])
        updateCityList([])
        updateZipCodeList([])

        agencyListDataFetchHandler(
          1,
          selectedAssignStatus,
          selectedClaimStatus,
          "all",
          [],
          [],
          searchText,
          maxLimit,
          true,
          selectedStatus
        )
      }
    } catch (e) {
      console.log(e)
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
        updateZipCodeList(allZipList)
        let newZipCodes = selectedZipCodes.filter(item => {
          let result = allZipList.filter(it => it.key === item)
          if (result[0]) {
            return item
          }
          return null
        })
        updateAppState({
          ...appState,
          selectedCities: cities,
          selectedZipCodes: newZipCodes,
          isAllSelected: false,
          activePage: 1,
        })

        agencyListDataFetchHandler(
          1,
          selectedAssignStatus,
          selectedClaimStatus,
          selectedState,
          cities,
          newZipCodes,
          searchText,
          maxLimit,
          true,
          selectedStatus
        )
      } else {
        updateZipCodeList([])
        updateAppState({
          ...appState,
          selectedCities: cities,
          selectedZipCodes: [],
          isAllSelected: false,
        })

        agencyListDataFetchHandler(
          1,
          selectedAssignStatus,
          selectedClaimStatus,
          selectedState,
          cities,
          [],
          searchText,
          maxLimit,
          true,
          selectedStatus
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onZipCodeChange = zips => {
    try {
      updateAppState({
        ...appState,
        selectedZipCodes: zips,
        isAllSelected: false,
        activePage: 1,
      })
      if (zips.length === 0) {
        updateZipCodeList([])
        agencyListDataFetchHandler(
          1,
          selectedAssignStatus,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          [],
          searchText,
          maxLimit,
          true,
          selectedStatus
        )
      } else {
        agencyListDataFetchHandler(
          1,
          selectedAssignStatus,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          zips,
          searchText,
          maxLimit,
          true,
          selectedStatus
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onUserSelection = e => {
    let value = e.target.value
    updateAppState({
      ...appState,
      selectedUser: value,
    })
  }

  const onAgencySelection = id => {
    try {
      // console.log(`Id is ${id}`);
      if (id === 0) {
        updateAppState({
          ...appState,
          isAllSelected: !isAllSelected,
        })
      } else {
        let newAgencySelectionList
        let isExist = selectedAgencies.filter(item => item == id)
        if (isExist[0]) {
          newAgencySelectionList = selectedAgencies.filter(item => item !== id)
        } else {
          newAgencySelectionList = [...selectedAgencies, id]
        }
        updateSelectedAgencies(newAgencySelectionList)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const selectionChecker = id => {
    let result = selectedAgencies.filter(item => item == id)
    if (isAllSelected) {
      if (result[0]) {
        return false
      }
      return true
    } else if (result[0]) {
      return true
    }
    return false
  }

  const countSelectedAgencies = () => {
    if (isAllSelected) {
      let totalAgencies = totalCount - selectedAgencies.length
      return totalAgencies
    } else {
      return selectedAgencies.length
    }
  }

  const confirmRequestHandler = () => {
    try {
      if (!isAllSelected && selectedAgencies.length === 0) {
        throw "No agency has been selected"
      }
      if (!selectedUser) {
        throw "No User Selected"
      }
      const maxLimit = 2000
      let totalSelectedAgencies = countSelectedAgencies()
      if (totalSelectedAgencies > maxLimit) {
        throw "Max 2000 Agencies can be assigned per transaction"
      }
      let selectedUserData = saleUserList.filter(
        item => item.id === parseInt(selectedUser)
      )
      if (!selectedUserData || !selectedUserData[0]) throw "No Sales User Found"

      showConfirmAlert({
        title: "Are you sure?",
        desc: `Do you want to assign These agencies to ${selectedUserData[0].firstName} ${selectedUserData[0].lastName}?`,
        yesBtnText: "Yes",
        noBtnText: "No",
        handler: async result => {
          if (result === 2) {
            return
          }
          assignBusinessHandler()
        },
      })
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const assignBusinessHandler = async () => {
    try {
      toggleLoader(true)
      let result = await assignBusinessToSales({
        selectedAssignStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
        isAllSelected,
        selectedAgencies,
        selectedUser,
        maxLimit,
      })

      updateAppState({
        ...appState,
        isAllSelected: false,
        activePage: 1,
      })

      // update list
      agencyListDataFetchHandler(
        activePage,
        selectedAssignStatus,
        selectedClaimStatus,
        selectedState,
        selectedCities,
        selectedZipCodes,
        searchText,
        maxLimit,
        true,
        selectedStatus
      )
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  const getTotalCount = (newLimit, resultCount) => {
    //    console.log(`Count is ${newLimit}`);
    if (newLimit !== "all") {
      return resultCount > newLimit ? newLimit : resultCount
    }
    return resultCount
  }

  const onSelectedStatusChangeHandler = e => {
    const val = e.target.value
    updateAppState({
      ...appState,
      isAllSelected: false,
      selectedStatus: val,
      activePage: 1,
    })

    agencyListDataFetchHandler(
      1,
      selectedAssignStatus,
      selectedClaimStatus,
      selectedState,
      selectedCities,
      selectedZipCodes,
      searchText,
      maxLimit,
      true,
      val
    )
  }

  const onStatusChangeHandler = async rowdata => {
    try {
      const result = await updateAgencyStatus({
        agencyId: rowdata.id,
        agencyStatus: !status.status,
      })
      console.log(result)
      if (result) {
        agencyListDataFetchHandler(
          activePage,
          selectedAssignStatus,
          selectedClaimStatus,
          selectedState,
          selectedCities,
          selectedZipCodes,
          searchText,
          maxLimit,
          false,
          selectedStatus
        )
      }
    } catch (e) {
      console.log(e)
      toastr.error(e.toString())
    }
  }

  //TABLE COMPONENTS
  const dt = useRef(null)

  const checkBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <input
          type="checkbox"
          // value={index}
          onChange={() => {
            onAgencySelection(rowData.id)
          }}
          checked={selectionChecker(rowData.id)}
        />
      </React.Fragment>
    )
  }

  const titleBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.title ? rowData.title : "N/A"}</span>
      </React.Fragment>
    )
  }

  const phoneBodyTemplate = rowData => {
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

  const zipCodeBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.zipCode ? rowData.zipCode : "No"}</span>
      </React.Fragment>
    )
  }

  const isAssignedBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.isAssigned === 1 ? "Yes" : "No"}</span>
      </React.Fragment>
    )
  }

  const isClaimedBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.isClaimed === 1 ? "Yes" : "No"}</span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          <Switch
            onChange={() => onStatusChangeHandler(rowData)}
            checked={rowData.status}
          />
        </span>
      </React.Fragment>
    )
  }

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        {
          <span>
            <div class="d-flex justify-content-center">
              <ButtonComp
                icon="home"
                onClick={() => {
                  window.open(
                    `/admin/homeCare/agency/viewDetail/${rowData.id}?name=${rowData.title}`
                  )
                }}
                toolTip="View Agency"
                btnClass="normal"
              />
              <ButtonComp
                icon="link"
                onClick={e => {
                  window.open(`${getFrontUrl()}/home-care/${rowData.slug}`)
                }}
                toolTip="Go to Page"
                btnClass="normal"
              />
              <ButtonComp
                icon="history"
                onClick={() => {
                  window.open(
                    `/admin/homeCare/agency/assignHistory/${rowData.id}?name=${rowData.title}`
                  )
                }}
                toolTip="Assign History"
                btnClass="normal"
              />
            </div>
          </span>
        }
      </React.Fragment>
    )
  }

  //TABLE COMPONENTS END

  // if (isLoading) {
  //   return <LoaderComponent />
  // }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="operation" breadcrumbItem="agency list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-3">
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
                    <div className="col-md-3">
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
                    <div className="col-md-3">
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
                    <div className="col-md-3">
                      <label className="">Filter By Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedStatus}
                        onChange={onSelectedStatusChangeHandler}
                      >
                        <option value="all">All</option>
                        <option value={1}>Active</option>
                        <option value={0}>Disable</option>
                      </select>
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
                          placeholder="name/ email/ state/ city/ zipcode"
                          onChange={handleSearchInput}
                          value={searchText}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-3">
                      <label className="">Filter By Assign Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedAssignStatus}
                        onChange={e => {
                          onStatusChange(e.target.value, "assignStatus")
                        }}
                      >
                        <option value="all">All</option>
                        <option value={0}>Not Assigned</option>
                        <option value={1}>Assigned</option>
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
                      <label className="">Limit Result</label>
                      <select
                        className="form-control form-select"
                        value={maxLimit}
                        onChange={e => {
                          onStatusChange(e.target.value, "maxLimit")
                        }}
                      >
                        <option value="all">All</option>
                        <option value={2000}>2000</option>
                        <option value={4000}>4000</option>
                      </select>
                    </div>
                  </div>
                  <br />

                  <div className="row filler-row">
                    <div className="col-md-4 offset-md-4">
                      <label className="">Assign To</label>
                      <select
                        className="form-control form-select"
                        value={selectedUser}
                        onChange={onUserSelection}
                        placeholder="Select an user"
                      >
                        <option value="0" disabled>
                          Select An User
                        </option>
                        {saleUserList &&
                          saleUserList.map((item, index) => {
                            //  console.log(`Item `, item);
                            const {
                              user: { firstName, lastName, email },
                              id,
                            } = item
                            return (
                              <option value={id} key={`s-${id}`}>
                                {`${firstName} ${lastName} - (${email})`}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                  </div>

                  <br />

                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        {count > 0 && (
                          <div className="record-counter">
                            Total Agencies Selected ({countSelectedAgencies()})
                          </div>
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
                      {" "}
                      <div className="datatable-responsive-demo">
                        <div className="card">
                          <DataTable
                            ref={dt}
                            value={listState.rows}
                            className="p-datatable-customers"
                            emptyMessage="No data found."
                          >
                            <Column
                              // field="title"
                              // header="Title"
                              body={checkBodyTemplate}
                              sortable
                              // style={{
                              //   width: "50%",
                              // }}
                            />
                            <Column
                              field="title"
                              header="Title"
                              body={titleBodyTemplate}
                              sortable
                              // style={{
                              //   width: "50%",
                              // }}
                            />
                            <Column
                              field="phoneNumber"
                              header="Phone"
                              body={phoneBodyTemplate}
                              sortable
                            />
                            <Column
                              field="state"
                              header="State"
                              body={stateBodyTemplate}
                              sortable
                            />
                            <Column
                              field="city"
                              header="City"
                              body={cityBodyTemplate}
                              sortable
                            />
                            <Column
                              field="zipCode"
                              header="Zip Code"
                              body={zipCodeBodyTemplate}
                              sortable
                            />
                            <Column
                              field="isAssigned"
                              header="Is Assigned"
                              body={isAssignedBodyTemplate}
                              sortable
                            />
                            <Column
                              field="isClaimed"
                              header="Is Assigned"
                              body={isClaimedBodyTemplate}
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
                              totalItemsCount={totalCount}
                              pageRangeDisplayed={5}
                              onChange={handlePageChange}
                            />
                          </div>
                        )}
                      </div>{" "}
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
})

const mapDispatchToProps = {
  getHomeCareAgencyList,
  getAllUSStates,
  getCitiesWithZipCodes,
  getSaleUsers,
  assignBusinessToSales,
  updateAgencyStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCareAgencyList)
