import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import { toastr } from "react-redux-toastr"
import { Link, useHistory, redirect } from "react-router-dom"
import Pagination from "react-js-pagination"
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  Badge,
} from "reactstrap"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import Switch from "react-switch"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb"
import { formatDate, formatNumber } from "../../../store/utils/util"
import ButtonComp from "components/Common/Button/Button"

//redux & actions
import {
  offStatusOfAdvisor,
  getAllApplicants,
  sendCredentialsToAdviser,
} from "../../../store/Actions/adminAction"
import LoaderComponent from "components/Common/Loader/LoaderComponent"

const Applicants = ({
  offStatusOfAdvisor,
  getAllApplicants,
  sendCredentialsToAdviser,
}) => {
  // declare states
  const history = useHistory()
  const [filterState, updateFilterState] = useState({
    activePage: 1,
    searchText: "",
    sortingColumn: "",
    sortingOrder: 0,
    redirect: false,
    typeHolder: 0,
    statusHolder: 0,
  })

  const [listState, updateListState] = useState({
    adviserData: [],
    totalAdviser: 0,
  })

  const [isLoading, toggleLoader] = useState(false)

  // destructure states
  const { adviserData, totalAdviser } = listState
  const {
    activePage,
    searchText,
    sortingColumn,
    sortingOrder,
    typeHolder,
    statusHolder,
  } = filterState

  // app functions
  useEffect(() => {
    getDataListHandler()
  }, [activePage, searchText, sortingColumn, sortingOrder])

  const getDataListHandler = async () => {
    try {
      //updateFilterState({ loader: true })
      toggleLoader(true)
      let applicantsList = await getAllApplicants({
        pageNumber: activePage || 1,
        searchText,
        sortingOrder,
        sortingColumn,
      })
      console.log(`applicantsList List `, applicantsList)
      if (applicantsList) {
        const { adviserData, totalAdviser } = applicantsList
        updateListState({ adviserData, totalAdviser })
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
      toggleLoader(false)
    }
  }

  const updateFilterStateHandler = newState => {
    console.log("newState", newState)
    updateFilterState({
      ...filterState,
      ...newState,
    })
  }

  const handlePageChange = page => {
    updateFilterStateHandler({
      activePage: page,
    })
  }

  const onSearchChange = e => {
    let value = e.target.value
    updateFilterStateHandler({
      searchText: value,
      activePage: 1,
    })
  }

  const changeStatus = async rowdata => {
    console.log(rowdata)
    let result = await offStatusOfAdvisor(rowdata.id, !rowdata.status)
    if (result === 403) {
      updateFilterState({
        redirect: true,
      })
    } else {
      getDataListHandler()
    }
  }

  const sendCredentials = async (e, id) => {
    await dispatch(sendCredentialsToAdviser(id))
  }

  const showCredentialBtn = rowData => {
    rowData.isCredentialsSend = 0
    if (rowData.isCredentialsSend == 0) {
      return rowData.type ? (
        <ButtonComp
          icon="key"
          toolTip="Send Credentials"
          btnClass="normal"
          onClick={e => sendCredentials(e, rowData.id)}
        />
      ) : rowData.positionId && rowData.position.position == "Advisor" ? (
        <ButtonComp
          icon="key"
          toolTip="Send Credentials"
          btnClass="normal"
          onClick={e => sendCredentials(e, rowData.id)}
        />
      ) : null
    }
  }

  //TABLE COMPONENTS

  const onTypeChange = e => {
    let value = e.target.value
    if (value === "1") {
      updateFilterStateHandler({
        sortingColumn: "type",
        sortingOrder: "DESC",
        typeHolder: 1,
      })
    } else if (value === "2") {
      updateFilterStateHandler({
        sortingColumn: "type",
        sortingOrder: "ASC",
        typeHolder: 2,
      })
    } else {
      updateFilterStateHandler({
        sortingColumn: "",
        sortingOrder: 0,
        typeHolder: 0,
      })
    }
  }

  const onStatusChange = e => {
    let value = e.target.value
    if (value === "1") {
      updateFilterStateHandler({
        sortingColumn: "status",
        sortingOrder: "DESC",
        statusHolder: 1,
      })
    } else if (value === "2") {
      updateFilterStateHandler({
        sortingColumn: "status",
        sortingOrder: "ASC",
        statusHolder: 2,
      })
    } else {
      updateFilterStateHandler({
        sortingColumn: "",
        sortingOrder: 0,
        statusHolder: 0,
      })
    }
  }

  const dt = useRef(null)

  const userBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{`${rowData.firstName} ${rowData.lastName}`}</span>
      </React.Fragment>
    )
  }

  const emailBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span style={{ textTransform: "lowercase" }}>{rowData.email}</span>
      </React.Fragment>
    )
  }

  const phoneBodyTemplate = rowData => {
    return (
      <React.Fragment>
        {rowData.phoneNumber ? formatNumber(`${rowData.phoneNumber}`) : "N/A"}
      </React.Fragment>
    )
  }

  const typeBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          {rowData.type ? (
            <Badge
              className="me-1 rounded-pill bg-success"
              style={{ padding: "5px 10px 5px 10px" }}
            >
              External
            </Badge>
          ) : (
            <Badge
              className="me-1 rounded-pill  bg-primary"
              style={{ padding: "5px 10px 5px 10px" }}
            >
              Internal
            </Badge>
          )}
        </span>
      </React.Fragment>
    )
  }

  const dateOnBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {formatDate(`${rowData.createdAt}`)}</span>
      </React.Fragment>
    )
  }

  const cityBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          {rowData.city ? (
            rowData.city
          ) : (
            <div style={{ color: "#999999" }}>N/A</div>
          )}
        </span>
      </React.Fragment>
    )
  }

  const stateBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          {rowData.state ? (
            rowData.state
          ) : (
            <div style={{ color: "#999999" }}>N/A</div>
          )}
        </span>
      </React.Fragment>
    )
  }

  const zipCodeBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          {rowData.zipcode ? (
            rowData.zipcode
          ) : (
            <div style={{ color: "#999999" }}>N/A</div>
          )}
        </span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          <Switch
            onChange={() => changeStatus(rowData)}
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
              <span>
                <Link
                  to={{
                    pathname: "/admin/applicantManagement/applicantDetails",
                    state: { applicantsDetails: rowData },
                  }}
                >
                  <ButtonComp
                    icon="eye"
                    toolTip="View Advisor Details"
                    btnClass="normal"
                  />
                </Link>
              </span>
              <span>{showCredentialBtn(rowData)}</span>
            </div>
          </span>
        }
      </React.Fragment>
    )
  }

  //TABLE COMPONENTS END

  if (isLoading) {
    return <LoaderComponent />
  }

  if (filterState.redirect) {
    toastr.error("Error", "Unauthorized access,please login again as admin")
    return <Redirect to="/admins/login" />
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Admin" breadcrumbItem="applicants lst" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-4">
                      <label className="">Filter Applicants Data</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="name / email / state / city / zip code"
                          onChange={onSearchChange}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-4">
                      <label className="">Sort By Type</label>
                      <select
                        className="form-control form-select"
                        value={typeHolder}
                        onChange={onTypeChange}
                      >
                        <option value={0}>All</option>
                        <option value="1">External</option>
                        <option value="2">Internal</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="">Search By Status</label>
                      <select
                        className="form-control form-select"
                        value={statusHolder}
                        onChange={onStatusChange}
                      >
                        <option value={0}>All</option>
                        <option value={1}>Active</option>
                        <option value={2}>Disabled</option>
                      </select>
                    </div>
                  </div>

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        {totalAdviser > 0 && (
                          <ButtonComp
                            icon="sync"
                            onClick={() => {
                              getDataListHandler()
                            }}
                            toolTip="refresh"
                            tooltipType="info"
                          />
                        )}
                      </div>
                      <div className="col-sm-6 text-end">
                        {totalAdviser > 0 && (
                          <div className="record-counter">
                            Total Record Found ({totalAdviser})
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
                        value={listState.adviserData}
                        className="p-datatable-customers"
                        emptyMessage="No data found."
                      >
                        <Column
                          field="firstName"
                          header="User"
                          body={userBodyTemplate}
                          sortable
                        />

                        <Column
                          field="email"
                          header="Email"
                          body={emailBodyTemplate}
                          sortable
                          style={{
                            width: "15%",
                          }}
                        />
                        <Column
                          field="phoneNumber"
                          header="Phone"
                          body={phoneBodyTemplate}
                          sortable
                        />
                        <Column
                          field="createdAt"
                          header="Date"
                          body={dateOnBodyTemplate}
                          sortable
                        />
                        <Column
                          field="city"
                          header="City"
                          body={cityBodyTemplate}
                          sortable
                        />
                        <Column
                          field="state"
                          header="State"
                          body={stateBodyTemplate}
                          sortable
                        />
                        <Column
                          field="zipcode"
                          header="Zip Code"
                          body={zipCodeBodyTemplate}
                          sortable
                        />
                        <Column
                          field="type"
                          header="Type"
                          body={typeBodyTemplate}
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
                    {!isLoading && totalAdviser > 10 && (
                      <div className="pro-pagination">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={10}
                          totalItemsCount={totalAdviser}
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
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.loggedInUser,
})

const mapDispatchToProps = {
  offStatusOfAdvisor,
  getAllApplicants,
  sendCredentialsToAdviser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Applicants)
