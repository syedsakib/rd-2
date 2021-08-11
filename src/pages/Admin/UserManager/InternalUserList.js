import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
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

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb"
import { formatDate, formatNumber } from "../../../store/utils/util"
import ButtonComp from "components/Common/Button/Button"

//redux & actions
import {
  getInternalUserList,
  updateInternalUserStatus,
  getRoleTypeList,
} from "../../../store/Actions/roleAction"
import LoaderComponent from "components/Common/Loader/LoaderComponent"

const InternalUserList = ({
  getInternalUserList,
  updateInternalUserStatus,
  getRoleTypeList,
}) => {
  // declare states
  const history = useHistory()
  const [filterState, updateFilterState] = useState({
    activePage: 1,
    searchText: "",
    limit: 10,
    selectedRole: "all",
    selectedStatus: 1,
  })
  const [listState, updateListState] = useState({ rows: [], count: 0 })
  const [isLoading, toggleLoader] = useState(false)
  const [roleTypeList, updateRoleTypeList] = useState([])

  // destructure states
  const { rows, count } = listState
  const { activePage, searchText, limit, selectedRole, selectedStatus } =
    filterState

  // app functions
  useEffect(() => {
    getRoleTypeListHandler()
  }, [])

  useEffect(() => {
    getDataListHandler()
  }, [selectedRole, searchText, activePage, selectedStatus])

  const updateFilterStateHandler = newState => {
    updateFilterState({
      ...filterState,
      ...newState,
    })
  }

  const getRoleTypeListHandler = async () => {
    try {
      let result = await getRoleTypeList({ roleType: "Internal" })
      console.log(`Role List `, result)
      if (result) {
        let mappedList = result.map(item => ({
          id: item.id,
          name: item.roleName,
        }))
        updateRoleTypeList(mappedList)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getDataListHandler = async () => {
    try {
      toggleLoader(true)
      let result = await getInternalUserList({
        pageNumber: activePage,
        selectedRole,
        searchText,
        limit,
        selectedStatus,
      })
      console.log(`Internal User List `, result)
      if (result) {
        const { rows, count } = result
        updateListState({ rows, count })
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
      toggleLoader(false)
    }
  }

  const updateUserStatusHandler = async (userId, userStatus) => {
    try {
      let result = await updateInternalUserStatus({
        userId,
        userStatus,
      })
      if (result) {
        getDataListHandler()
      }
    } catch (e) {
      console.log(e)
    }
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

  const onRoleChange = e => {
    let value = e.target.value
    updateFilterStateHandler({
      selectedRole: value,
      activePage: 1,
    })
  }

  const onStatusChange = e => {
    let value = e.target.value
    updateFilterStateHandler({
      selectedStatus: value,
      activePage: 1,
    })
  }

  //TABLE COMPONENTS
  const dt = useRef(null)

  const nameBodyTemplate = rowData => {
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

  const createdOnBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {formatDate(`${rowData.createdAt}`)}</span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          {rowData.status ? (
            <Badge
              className="me-1 rounded-pill bg-success"
              style={{ padding: "5px 10px 5px 10px" }}
            >
              Active
            </Badge>
          ) : (
            <Badge
              className="me-1 rounded-pill bg-danger"
              style={{ padding: "5px 10px 5px 10px" }}
            >
              Disabled
            </Badge>
          )}
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
                <ButtonComp
                  icon="edit"
                  onClick={e => {
                    e.preventDefault()
                    history.push(`/admin/userManagement/edit/${rowData.id}`)
                  }}
                  toolTip="Edit"
                  btnClass="normal"
                />
              </span>
              <span>
                {rowData.status ? (
                  <span>
                    <ButtonComp
                      icon="ban"
                      onClick={e => {
                        e.preventDefault()
                        updateUserStatusHandler(rowData.id, 0)
                      }}
                      toolTip="Disable"
                      btnClass="danger"
                    />
                  </span>
                ) : (
                  <span>
                    <ButtonComp
                      icon="toggle-on"
                      onClick={e => {
                        e.preventDefault()
                        updateUserStatusHandler(rowData.id, 1)
                      }}
                      toolTip="Enable"
                      btnClass="normal"
                    />
                  </span>
                )}
              </span>
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
          <Breadcrumb title="Admin" breadcrumbItem="internal users" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="row">
                    <div className="col-md-6 my-auto">User List</div>
                    <div className="col-md-6 text-end">
                      <div className="db-btn-group">
                        <Link
                          to="/admin/userManagement/add"
                          title="Add Contact"
                          color="info"
                          className="btn btn-info btn-label"
                        >
                          <i className="bx bx-plus-circle label-icon"></i>
                          Add New User
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-4">
                      <label className="">Search User</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="name/email"
                          onChange={onSearchChange}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-4">
                      <label className="">Search By Role</label>
                      <select
                        className="form-control form-select"
                        value={selectedRole}
                        onChange={onRoleChange}
                      >
                        <option value="all">All</option>
                        {roleTypeList &&
                          roleTypeList.length > 0 &&
                          roleTypeList.map(item => {
                            return (
                              <option value={item.id} key={`r-l-${item.id}`}>
                                {item.name}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="">Search By Status</label>
                      <select
                        className="form-control form-select"
                        value={selectedStatus}
                        onChange={onStatusChange}
                      >
                        <option value="all">All</option>
                        <option value={1}>Active</option>
                        <option value={0}>Disabled</option>
                      </select>
                    </div>
                  </div>

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        {count > 0 && (
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
                    <div className="datatable-responsive-demo">
                      <div className="card">
                        <DataTable
                          ref={dt}
                          value={listState.rows}
                          className="p-datatable-customers"
                          emptyMessage="No data found."
                        >
                          <Column
                            field="firstName"
                            header="Name"
                            body={nameBodyTemplate}
                            sortable
                          />

                          <Column
                            field="email"
                            header="Email"
                            body={emailBodyTemplate}
                            sortable
                            style={{
                              width: "20%",
                            }}
                          />
                          <Column
                            field="phoneNumber"
                            header="Phone Number"
                            body={phoneBodyTemplate}
                            sortable
                          />
                          <Column
                            field="createdAt"
                            header="Created On"
                            body={createdOnBodyTemplate}
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
                  )}

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
  getInternalUserList,
  updateInternalUserStatus,
  getRoleTypeList,
}

export default connect(mapStateToProps, mapDispatchToProps)(InternalUserList)
