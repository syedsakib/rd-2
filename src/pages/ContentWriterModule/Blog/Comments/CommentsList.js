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
  InputGroup,
} from "reactstrap"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb"
import { formatDate } from "../../../../store/utils/util"
import ButtonComp from "components/Common/Button/Button"

//redux & actions
import {
  getAllCommentList,
  getAllArticleList,
  updateCommentStatus,
} from "../../../../store/Actions/adminAction"
import LoaderComponent from "components/Common/Loader/LoaderComponent"
import ReactTooltip from "react-tooltip"

const CommentsList = ({
  getAllCommentList,
  getAllArticleList,
  isAuthenticated,
  userDetails,
  updateCommentStatus,
}) => {
  // declare states
  const history = useHistory()
  const [appStates, updateAppState] = useState({
    activePage: 1,
    searchText: "",
    selectedStatus: "Pending",
    selectedArticle: 0,
  })
  const [isLoading, toggleLoader] = useState(false)
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  })
  const [articleList, updateArticleList] = useState([])
  const [modalData, updateModalData] = useState({
    isDetailViewModalOpen: false,
    selectedComment: null,
  })
  const { activePage, searchText, selectedArticle, selectedStatus } = appStates
  const { rows, count } = listState
  const { isDetailViewModalOpen, selectedComment } = modalData

  useEffect(() => {
    getCommentListHandler()
  }, [activePage, searchText, selectedArticle, selectedStatus])

  useEffect(() => {
    getArticleList()
  }, [])

  const getArticleList = async () => {
    try {
      toggleLoader(true)
      let result = await getAllArticleList()
      if (result) {
        updateArticleList(result)
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
      toggleLoader(false)
    }
  }

  const getCommentListHandler = async () => {
    try {
      toggleLoader(true)
      let result = await getAllCommentList({
        pageNumber: activePage,
        searchText,
        selectedStatus,
        selectedArticle,
      })
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
      toggleLoader(false)
    }
  }

  const handleSearchInput = e => {
    let val = e.target.value
    updateAppState({
      ...appStates,
      searchText: val,
    })
  }
  const handlePageChange = pageNumber => {
    updateAppState({
      ...appStates,
      activePage: pageNumber,
    })
  }

  const onSelectChangeHandle = (type, value) => {
    if (type === "article") {
      updateAppState({
        ...appStates,
        selectedArticle: value,
      })
    } else if (type === "status") {
      updateAppState({
        ...appStates,
        selectedStatus: value,
      })
    }
  }

  const toggleModal = (type, data) => {
    if (type === "detail") {
      updateModalData({
        ...modalData,
        isDetailViewModalOpen: !isDetailViewModalOpen,
        selectedComment: data,
      })
    }
  }

  const approveHandler = id => {
    showConfirmAlert({
      title: "Are you sure?",
      desc: "Do you want approve this comment?",
      yesBtnText: "Yes",
      noBtnText: "No",
      handler: async result => {
        if (result === 2) {
          return
        }
        await updateCommentStatus(id, "Approved")
        getCommentListHandler()
      },
    })
  }

  const rejectHandler = id => {
    showConfirmAlert({
      title: "Are you sure?",
      desc: "Do you want to reject this comment?",
      yesBtnText: "Yes",
      noBtnText: "No",
      handler: async result => {
        if (result === 2) {
          return
        }
        await updateCommentStatus(id, "Rejected")
        getCommentListHandler()
      },
    })
  }

  //TABLE COMPONENTS
  const dt = useRef(null)

  const articleBodyTemplate = ({ article }) => {
    return (
      <React.Fragment>
        <span>
          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              window.open(`/post/${article.slug}`)
            }}
            style={{ color: "#486671" }}
          >
            {article.title}
          </a>
        </span>
      </React.Fragment>
    )
  }

  const commentBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.content}</span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{rowData.status}</span>
      </React.Fragment>
    )
  }

  const commentedByBodyTemplate = rowData => {
    let userName
    let userEmail
    if (rowData.userDetail) {
      userName =
        rowData.userDetail.firstName + " " + rowData.userDetail.lastName
      userEmail = rowData.userDetail.email
    } else {
      userName = rowData.userName
      userEmail = rowData.userEmail
    }
    rowData.fUserName = userName
    rowData.fUserEmail = userEmail
    return (
      <React.Fragment>
        <span>{userName}</span>
      </React.Fragment>
    )
  }

  const commentedOnBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{formatDate(rowData.createdAt)}</span>
      </React.Fragment>
    )
  }

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        {
          <span>
            <div className="d-flex justify-content-center">
              <ButtonComp
                icon="eye"
                onClick={e => {
                  toggleModal("detail", rowData)
                }}
                toolTip="View Details"
                btnClass="normal"
              />
              {rowData.status === "Pending" && (
                <Fragment>
                  <ButtonComp
                    icon="check"
                    onClick={e => {
                      toggleModal("detail", rowData)
                    }}
                    toolTip="Approve"
                    btnClass="normal"
                  />
                  <ButtonComp
                    icon="close"
                    onClick={e => {
                      rejectHandler(rowData.id)
                    }}
                    toolTip="Reject"
                    btnClass="danger"
                  />
                </Fragment>
              )}
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
          <Breadcrumb title="CW" breadcrumbItem="comments list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-6">
                      <label className="">Filter By Article</label>
                      <select
                        className="form-select form-control"
                        value={selectedArticle}
                        onChange={e => {
                          onSelectChangeHandle("article", e.target.value)
                        }}
                      >
                        <option value="0">All Article</option>
                        {articleList &&
                          articleList.map(({ id, title }) => {
                            return (
                              <option value={id} key={`ac-${id}`}>
                                {title}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                    <div className="col-md-6 text-end">
                      <label className="">Filter By Status</label>
                      <select
                        className="form-select form-control"
                        value={selectedStatus}
                        onChange={e => {
                          onSelectChangeHandle("status", e.target.value)
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
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
                            header="Article"
                            body={articleBodyTemplate}
                            sortable
                            style={{
                              width: "20%",
                            }}
                          />
                          <Column
                            field="content"
                            header="Comment"
                            body={commentBodyTemplate}
                            sortable
                            style={{
                              width: "40%",
                            }}
                          />
                          <Column
                            field="status"
                            header="Status"
                            body={statusBodyTemplate}
                            sortable
                          />
                          <Column
                            field="userName"
                            header="Commented By"
                            body={commentedByBodyTemplate}
                            sortable
                          />
                          <Column
                            field="createdAt"
                            header="Commented On"
                            body={commentedOnBodyTemplate}
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
  isAuthenticated: state.global.isAuthenticated,
})

const mapDispatchToProps = {
  getAllCommentList,
  getAllArticleList,
  updateCommentStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)
