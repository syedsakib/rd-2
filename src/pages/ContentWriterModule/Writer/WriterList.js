import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { toastr } from "react-redux-toastr"
import { connect } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import Pagination from "react-js-pagination"
import ReactTooltip from "react-tooltip"
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  CardImg,
} from "reactstrap"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb"

//redux & actions
import { getAllWriters, deleteWriter } from "../../../store/Actions/adminAction"
import LoaderComponent from "components/Common/Loader/LoaderComponent"

const WriterListPage = ({ getAllWriters, deleteWriter }) => {
  // declare states
  const [listState, updateListState] = useState({ rows: [], count: 0 })
  const [isLoading, toggleLoader] = useState(false)
  const [filterState, updateFilterState] = useState({
    searchText: "",
    limit: 10,
    activePage: 1,
    sortingColumn: "createdAt",
    sortingOrder: "desc",
  })

  // extract states
  const { rows, count } = listState
  const { activePage, searchText, limit, sortingColumn, sortingOrder } =
    filterState

  // app functions
  useEffect(() => {
    getDataListHandler()
  }, [activePage, searchText])

  const getDataListHandler = async () => {
    try {
      toggleLoader(true)
      let result = await getAllWriters({
        pageNumber: activePage,
        searchText,
        sortingColumn,
        sortingOrder,
      })
      if (result) {
        console.log(`writers`, result)
        const { rows, count } = result
        updateListState({
          rows,
          count,
        })
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
      toggleLoader(false)
      toastr.error("Error", e.toString())
    }
  }

  const updateFilterStateHandler = newState => {
    updateFilterState({
      ...filterState,
      ...newState,
    })
  }

  const handleSearchText = value => {
    updateFilterStateHandler({
      activePage: 1,
      searchText: value,
    })
  }

  const handlePageChange = pageNumber => {
    updateFilterStateHandler({
      activePage: pageNumber,
    })
  }

  const deleteWriterHandler = async data => {
    try {
      let result = await deleteWriter(data.id)
      if (result) {
        let newList = rows.filter(d => d.id !== data.id)
        updateListState({ rows: newList, count: count - 1 })
      }
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  //TABLE COMPONENTS
  const dt = useRef(null)

  const nameBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span className="d-flex justify-content-start align-items-center">
          <CardImg
            src={rowData.profileImage}
            alt="Writer"
            className="rounded-circle avatar-md mx-3"
          />

          {rowData.name ? rowData.name : "N/A"}
        </span>
      </React.Fragment>
    )
  }

  const designationBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.designation ? rowData.designation : "N/A"}</span>
      </React.Fragment>
    )
  }

  const bioBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          <span> {rowData.bio ? rowData.bio.substr(0, 100) : "N/A"}</span>
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
              <Link
                to={{
                  pathname: `/cw/writer/edit/${rowData.id}`,
                  state: { data: rowData.id },
                }}
                style={{ paddingRight: "15px" }}
              >
                <span
                  className="btn-view-status tb-icon"
                  title="edit"
                  id={rowData.id}
                  data-tip="Edit"
                >
                  <i class="fas fa-edit" style={{ color: "#495057" }}></i>
                </span>
                <ReactTooltip place="top" type="info" effect="float" />
              </Link>
              <Link to="#">
                <span
                  className="btn-view-status tb-icon"
                  title="edit"
                  onClick={e => {
                    e.preventDefault()
                    deleteWriterHandler(rowData)
                  }}
                  data-tip="Delete"
                >
                  <i class="fas fa-times" style={{ color: "#495057" }}></i>
                </span>
                <ReactTooltip place="top" type="info" effect="float" />
              </Link>
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
          <Breadcrumb title="CW" breadcrumbItem="writer list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <label className="">Search for Writer</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter name to search"
                          onChange={e => {
                            handleSearchText(e.target.value)
                          }}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-md-6 text-end">
                      <div className="db-btn-group">
                        <Link
                          to="/cw/blog/create"
                          title="Add Contact"
                          color="info"
                          className="btn btn-info btn-label"
                        >
                          <i className="bx bx-plus-circle label-icon"></i>
                          Add New Writer
                        </Link>
                      </div>
                    </div>
                  </div>

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        {/* {count > 0 && (
                          <ButtonComp
                            icon="sync"
                            onClick={() => {
                              getDataListHandler()
                            }}
                            toolTip="refresh"
                            tooltipType="info"
                          />
                        )} */}
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
                            field="name"
                            header="Name"
                            body={nameBodyTemplate}
                            sortable
                            style={{
                              width: "20%",
                            }}
                          />
                          <Column
                            field="designation"
                            header="Designation"
                            body={designationBodyTemplate}
                            sortable
                          />
                          <Column
                            field="bio"
                            header="Bio"
                            body={bioBodyTemplate}
                            sortable
                            style={{
                              width: "40%",
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
                  )}

                  <div>
                    {!isLoading && count > limit && (
                      <div className="pro-pagination">
                        <Pagination
                          itemsCountPerPage={limit}
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
  getAllWriters,
  deleteWriter,
}

export default connect(mapStateToProps, mapDispatchToProps)(WriterListPage)
