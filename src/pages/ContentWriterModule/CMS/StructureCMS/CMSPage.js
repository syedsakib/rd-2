import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { toastr } from "react-redux-toastr"
import { connect, useDispatch, useSelector } from "react-redux"
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
import {
  formatDate,
  formatNumber,
  getFrontUrl,
} from "../../../../store/utils/util"
import Switch from "react-switch"

//redux & actions
import {
  getStructureDataPageList,
  updateStructureCmsPageStatus,
} from "../../../../store/Actions/cmsAction"
import { getseniorLivingtype } from "../../../../store/Actions/partnerAction"
import {
  getAllUSStates,
  getStateCities,
  searchBlogByKeyword,
} from "../../../../store/Actions/userAction.js"

import LoaderComponent from "components/Common/Loader/LoaderComponent"
import ReactTooltip from "react-tooltip"
import ButtonComp from "components/Common/Button/Button"
import SearchSelect from "components/Common/SearchSelect/SearchSelect"

const CMSPage = ({
  getStructureDataPageList,
  updateStructureCmsPageStatus,
  getseniorLivingtype,
  getAllUSStates,
  getStateCities,
  searchBlogByKeyword,
}) => {
  // declare states
  const history = useHistory()
  const dispatch = useDispatch()
  const [isLoading, toggleLoader] = useState(false)
  const [stateList, updateStateList] = useState(null)
  const [cityList, updateCityList] = useState(null)
  const [suggestedArticleList, updateSuggestedArticleList] = useState([])
  const [refresh, updateRefresh] = useState(null)
  const [searchBoxState, updateSearchBoxState] = useState({
    articleSearchInput: "",
    citySearchInput: "",
  })
  const [filterState, updateFilterState] = useState({
    activePage: 1,
    limit: 20,
    selectedPageType: "all",
    searchText: "",
    selectedCareType: "all",
    selectedState: "all",
    selectedCity: "all",
    selectedBlog: "",
  })
  const [listState, updateListState] = useState({
    rows: [],
    count: 0,
  })
  const [careTypes, updateCareTypes] = useState([])
  const [modalState, updateModalState] = useState({
    modalName: null,
    modalData: null,
  })

  // extract states
  const { rows, count } = listState
  const {
    limit,
    activePage,
    searchText,
    selectedCareType,
    selectedPageType,
    selectedState,
    selectedCity,
    selectedBlog,
  } = filterState
  const { modalName, modalData } = modalState
  const { articleSearchInput, citySearchInput } = searchBoxState

  // app function
  useEffect(() => {
    getCareTypeDataHandler()
    getUsStateHandler()
  }, [])

  useEffect(() => {
    clearStateHandler()
  }, [selectedPageType])

  useEffect(() => {
    if (selectedState && selectedState !== "all") {
      getCitiesHandler()
    }
  }, [selectedState])

  // app functions
  useEffect(() => {
    getDataListHandler()
  }, [
    activePage,
    searchText,
    selectedCareType,
    selectedBlog,
    selectedCity,
    selectedPageType,
    refresh,
  ])

  const updateFilterStateHandler = newState => {
    updateFilterState({
      ...filterState,
      ...newState,
    })
  }

  const clearStateHandler = () => {
    updateFilterStateHandler({
      activePage: 1,
      limit: 20,
      searchText: "",
      selectedCareType: "all",
      selectedState: "all",
      selectedCity: "all",
      selectedBlog: "",
    })
    updateSearchBoxStateHandler({
      articleSearchInput: "",
      citySearchInput: "",
    })
    updateSuggestedArticleList([])
  }

  const updateSearchBoxStateHandler = newState => {
    updateSearchBoxState({
      ...searchBoxState,
      ...newState,
    })
  }

  const getDataListHandler = async () => {
    try {
      toggleLoader(true)
      const result = await getStructureDataPageList({
        pageNumber: activePage,
        limit,
        searchText,
        selectedCareType,
        selectedBlog,
        selectedPageType,
        selectedState,
        selectedCity,
      })
      console.log("Structure Data Page List ", result)
      if (result) {
        const { rows, count } = result
        updateListState({
          rows,
          count: count.length,
        })
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
      toggleLoader(false)
    }
  }

  const getCareTypeDataHandler = async () => {
    try {
      toggleLoader(true)
      let result = await getseniorLivingtype()
      if (result) {
        updateCareTypes(result)
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
      toggleLoader(false)
    }
  }

  const getUsStateHandler = async () => {
    try {
      toggleLoader(true)
      let result = await getAllUSStates()
      //console.log(`Us State List `, result);
      if (result) {
        updateStateList(result)
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
      toggleLoader(false)
    }
  }

  const getCitiesHandler = async () => {
    try {
      toggleLoader(true)
      let result = await getStateCities({
        state: selectedState,
      })
      //console.log(`${selectedState} City List `, result);
      if (result) {
        updateCityList(result)
        toggleLoader(false)
      }
    } catch (e) {
      console.log(e)
      toggleLoader(false)
    }
  }

  const handlePageChange = pageNumber => {
    updateFilterStateHandler({
      activePage: pageNumber,
    })
  }

  const onChange = e => {
    const el = e.target
    updateFilterStateHandler({
      [el.name]: el.value,
    })
  }

  const handleArticleKeyWordChange = async value => {
    let val = value
    updateSearchBoxStateHandler({
      articleSearchInput: val,
    })
    updateFilterStateHandler({
      selectedBlog: "",
    })
    if (val) {
      let result = await searchBlogByKeyword({
        searchText: val,
        limit: 10,
      })
      if (result) {
        //console.log(`Article List `, result);
        let optionList = result.rows.map(item => ({
          label: `(${item?.categoryDetail?.title}) ${item.title}`,
          value: item,
        }))
        updateSuggestedArticleList(optionList)
      }
    }
  }

  const onArticleSelectHandler = value => {
    if (value) {
      const { id, categoryDetail, title } = value
      const valueLabel = `(${categoryDetail?.title}) ${title}`
      updateFilterStateHandler({
        selectedBlog: id,
      })
      updateSearchBoxStateHandler({
        articleSearchInput: valueLabel,
      })
    }
  }

  const onCmsPageStatusChangeHandler = async (id, status) => {
    try {
      toggleLoader(true)
      let result = await updateStructureCmsPageStatus({
        itemId: id,
        status,
      })
      if (result) {
        updateRefresh(Date.now())
      }
      toggleLoader(false)
    } catch (e) {
      console.log(e)
      toggleLoader(false)
    }
  }

  //TABLE COMPONENTS
  const dt = useRef(null)

  const pageTypeBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.page_type ? rowData.page_type : "N/A"}</span>
      </React.Fragment>
    )
  }

  const pageIdBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span> {rowData.page_id ? rowData.page_id : "N/A"}</span>
      </React.Fragment>
    )
  }

  const createdAtBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{formatDate(rowData.createdAt)}</span>
      </React.Fragment>
    )
  }

  const lastUpdatedOnBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>{formatDate(rowData.updatedAt)}</span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span>
          <Switch
            //  onChange={() => updateArticleStatusHandler(rowData)}
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
              <ButtonComp
                icon="edit"
                onClick={e => {
                  window.open(`/cw/cms/structure/edit/${rowData.id}`)
                }}
                toolTip="Edit Content"
                btnClass="normal"
              />
              <ButtonComp
                icon="link"
                onClick={e => {
                  let url = `${getFrontUrl()}/`
                  window.open(`${url}${rowData.page_id}`)
                }}
                toolTip="Go To Page"
                btnClass="normal"
              />
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
          <Breadcrumb title="CW" breadcrumbItem="page list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="col-md-12 text-end">
                    <div className="db-btn-group">
                      <Link
                        to="#"
                        title="Add Contact"
                        color="info"
                        className="btn btn-info btn-label"
                        onClick={e => {
                          e.preventDefault()
                          window.open(`/cw/cms/structure/create`)
                        }}
                      >
                        <i className="bx bx-plus-circle label-icon"></i>
                        Add New Article
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-12">
                      <labe l className="">
                        Select Page Type
                      </labe>
                      <select
                        className="form-select form-control selector-input"
                        name="selectedPageType"
                        value={selectedPageType}
                        onChange={onChange}
                      >
                        <option value="all">All</option>
                        <option value="pillar">Pillar</option>
                        <option value="blog">Blog</option>
                        <option value="state">State</option>
                        <option value="city">City</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  {selectedPageType === "blog" && (
                    <div className="row filter-row">
                      <div className="col-md-12">
                        <SearchSelect
                          onChange={handleArticleKeyWordChange}
                          options={suggestedArticleList}
                          onSelect={onArticleSelectHandler}
                          labelName="Search Article"
                          inputClassName={"form-control"}
                          placeHolder={"Search by title"}
                          value={articleSearchInput}
                        />
                      </div>
                    </div>
                  )}
                  {(selectedPageType === "state" ||
                    selectedPageType === "city" ||
                    selectedPageType === "pillar") && (
                    <div className="row filter-row">
                      <div className="col-md-4">
                        <label className="filter-title">Select Category</label>
                        <select
                          className="form-select form-control selector-input"
                          name="selectedCareType"
                          value={selectedCareType}
                          onChange={onChange}
                        >
                          <option value="all">All</option>
                          {careTypes?.map(({ title, id }) => {
                            return (
                              <option value={title} key={`c-${title}-${id}`}>
                                {title}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="filter-title">Select State</label>
                        <select
                          className="form-select form-control selector-input"
                          name="selectedState"
                          value={selectedState}
                          onChange={onChange}
                          disabled={selectedPageType === "pillar"}
                        >
                          <option value="all">All</option>
                          {stateList?.map(({ state_name }) => {
                            return (
                              <option
                                value={state_name}
                                key={`s-${state_name}`}
                              >
                                {state_name}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="filter-title">Select City</label>
                        <select
                          className="form-select form-control selector-input"
                          name="selectedCity"
                          value={selectedCity}
                          onChange={onChange}
                          disabled={
                            selectedPageType === "pillar" ||
                            selectedPageType === "state"
                          }
                        >
                          <option value="all">All</option>
                          {selectedPageType === "city" &&
                            cityList?.map(({ city, id }) => {
                              return (
                                <option value={city} key={`city-${city}-${id}`}>
                                  {city}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                    </div>
                  )}
                  {selectedPageType === "other" && (
                    <div className="row filter-row">
                      <div className="col-md-12">
                        <label className="filter-title">Search Page</label>
                        <InputGroup>
                          <input
                            type="text"
                            className="form-control"
                            name="searchText"
                            placeholder="Search by keyword"
                            onChange={onChange}
                            value={searchText}
                          />
                          <div className="input-group-text">
                            <i class="fas fa-search-plus"></i>
                          </div>
                        </InputGroup>
                      </div>
                    </div>
                  )}

                  <br />
                  <div className="record-count-wrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        <ButtonComp
                          icon="sync"
                          onClick={() => {
                            getDataListHandler()
                          }}
                          toolTip="refresh"
                        />
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
                            field="page_type"
                            header="Page Type"
                            body={pageTypeBodyTemplate}
                            sortable
                          />
                          <Column
                            field="page_id"
                            header="Page Id"
                            body={pageIdBodyTemplate}
                            sortable
                          />
                          <Column
                            field="createdAt"
                            header="Created At"
                            body={createdAtBodyTemplate}
                            sortable
                          />
                          <Column
                            field="updatedAt"
                            header="Last Updated On"
                            body={lastUpdatedOnBodyTemplate}
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
                          //activePage={activePage}
                          //  itemsCountPerPage={limit}
                          // totalItemsCount={count}
                          pageRangeDisplayed={5}
                          //  onChange={handlePageChange}
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
  getStructureDataPageList,
  updateStructureCmsPageStatus,
  getseniorLivingtype,
  getAllUSStates,
  getStateCities,
  searchBlogByKeyword,
}

export default connect(mapStateToProps, mapDispatchToProps)(CMSPage)
