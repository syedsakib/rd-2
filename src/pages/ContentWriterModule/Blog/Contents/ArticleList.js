import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { toastr } from "react-redux-toastr"
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
import Breadcrumb from "../../../../components/Common/Breadcrumb"
import { formatDate, formatNumber } from "../../../../store/utils/util"
import Switch from "react-switch"

//redux & actions
import {
  getAllArticle,
  offStatusOfArticle,
} from "../../../../store/Actions/adminAction"
import LoaderComponent from "components/Common/Loader/LoaderComponent"
import ReactTooltip from "react-tooltip"

const ArticleList = ({ getAllArticle, offStatusOfArticle }) => {
  // declare states
  const [filterState, updateFilterState] = useState({
    activePage: 1,
    sorting: false,
    sortColumn: false,
    searchText: "",
    limit: 10,
    refresh: null,
  })
  const [listState, updateListState] = useState({ rows: [], count: 0 })
  const [isLoading, toggleLoader] = useState(false)

  //destructure state
  const { activePage, sorting, sortColumn, searchText, limit, refresh } =
    filterState
  const { rows, count } = listState
  //const dispatch = useDispatch()

  const updateFilterStateHandler = newState => {
    updateFilterState({
      ...filterState,
      ...newState,
    })
  }

  useEffect(() => {
    getDataListHandler()
  }, [activePage, searchText, refresh])

  const getDataListHandler = async () => {
    try {
      toggleLoader(true)
      let result = await getAllArticle({
        pageNumber: activePage,
        searchText,
      })
      console.log(`Article List `, result)
      if (result) {
        const { articleData, totalArticle } = result
        updateListState({ rows: articleData, count: totalArticle })
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
      toggleLoader(false)
    }
  }

  const handlePageChange = pNum => {
    updateFilterStateHandler({
      activePage: pNum,
    })
  }

  const updateArticleStatusHandler = async rowdata => {
    try {
      let result = await offStatusOfArticle(rowdata.id, !rowdata.status)
      if (result) {
        updateFilterStateHandler({
          refresh: Date.now(),
        })
      }
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  const onSearchFieldChange = e => {
    let value = e.target.value
    updateFilterStateHandler({
      searchText: value,
      activePage: 1,
    })
  }

  //TABLE COMPONENTS
  const dt = useRef(null)

  const titleBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.title ? rowData.title : "N/A"}</span>
      </React.Fragment>
    )
  }

  const categoryBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.categoryId ? rowData.category.title : "N/A"}</span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          <Switch
            onChange={() => updateArticleStatusHandler(rowData)}
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
            <div className="d-flex justify-content-center">
              <Link
                to={{
                  pathname: `/cw/blog/edit/${rowData.id}`,
                }}
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
            </div>
          </span>
        }
      </React.Fragment>
    )
  }

  //TABLE COMPONENTS END

  //   if (isLoading) {
  //     return <LoaderComponent />
  //   }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="CW" breadcrumbItem="article list" />
          {/* mt-3 */}
          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <label className="">Search Article</label>
                      <InputGroup>
                        <div className="input-group-text">
                          <i class="fas fa-search-plus"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter title to search"
                          onChange={onSearchFieldChange}
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
                          Add New Article
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
                            field="title"
                            header="Title"
                            body={titleBodyTemplate}
                            sortable
                            style={{
                              width: "50%",
                            }}
                          />
                          <Column
                            field="categoryId"
                            header="Category"
                            body={categoryBodyTemplate}
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
                    {!isLoading && count > limit && (
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
  getAllArticle,
  offStatusOfArticle,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
