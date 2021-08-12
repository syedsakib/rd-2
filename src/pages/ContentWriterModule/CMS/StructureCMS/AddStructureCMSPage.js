import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { toastr } from "react-redux-toastr";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  InputGroup,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";
import { slugify } from "../../../../store/utils/util";
import Switch from "react-switch";

//redux & actions
import {
  editStructurePageCmsData,
  getStructureDataPageList,
  updateStructureCmsPageStatus,
} from "../../../../store/Actions/cmsAction";
import { getseniorLivingtype } from "../../../../store/Actions/partnerAction";
import {
  getAllUSStates,
  getStateCities,
  searchBlogByKeyword,
} from "../../../../store/Actions/userAction.js";

import LoaderComponent from "components/Common/Loader/LoaderComponent";
import TinyMceEditor from "components/Common/Editor/TinyMCEEDitor";
import ButtonComp from "components/Common/Button/Button";
import SearchSelect from "components/Common/SearchSelect/SearchSelect";

const AddStructureCMSPage = ({
  editStructurePageCmsData,
  getStructureDataPageList,
  updateStructureCmsPageStatus,
  getseniorLivingtype,
  getAllUSStates,
  getStateCities,
  searchBlogByKeyword,
}) => {
  // declare states
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  };
  // declare states
  const [formData, updateFormData] = useState({
    selectedCareType: "",
    selectedState: "",
    selectedCity: "",
    selectedBlog: "",
    selectedPageType: "#",
    otherPageId: "",
    content: "",
  });
  const [isLoading, toggleLoader] = useState(false);
  const [stateList, updateStateList] = useState(null);
  const [cityList, updateCityList] = useState(null);
  const [careTypes, updateCareTypes] = useState([]);
  const [suggestedArticleList, updateSuggestedArticleList] = useState([]);
  const [searchBoxState, updateSearchBoxState] = useState({
    articleSearchInput: "",
    citySearchInput: "",
  });

  // destructure states
  const {
    selectedPageType,
    selectedCity,
    selectedBlog,
    selectedCareType,
    selectedState,
    otherPageId,
    content,
  } = formData;
  const { articleSearchInput, citySearchInput } = searchBoxState;

  const [editorContent, updateEditorContent] = useState({
    initialContent: content || "",
  });
  const { initialContent } = editorContent;

  // app functions
  useEffect(() => {
    getCareTypeDataHandler();
    getUsStateHandler();
  }, []);

  useEffect(() => {
    // clearStateHandler();
  }, [selectedPageType]);

  useEffect(() => {
    if (selectedState && selectedState !== "all") {
      getCitiesHandler();
    }
  }, [selectedState]);

  const updateSearchBoxStateHandler = (newState) => {
    updateSearchBoxState({
      ...searchBoxState,
      ...newState,
    });
  };

  const updateFormDataHandler = (newState) => {
    updateFormData({
      ...formData,
      ...newState,
    });
  };

  const clearStateHandler = () => {
    updateFormData({
      otherPageId: "",
      selectedCareType: "#",
      selectedState: "#",
      selectedCity: "#",
      selectedBlog: "",
    });
    updateSearchBoxStateHandler({
      articleSearchInput: "",
      citySearchInput: "",
    });
    updateSuggestedArticleList([]);
  };

  const getCareTypeDataHandler = async () => {
    try {
      toggleLoader(true);
      let result = await getseniorLivingtype();
      if (result) {
        updateCareTypes(result);
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
    }
  };

  const getUsStateHandler = async () => {
    try {
      toggleLoader(true);
      let result = await getAllUSStates();
      //console.log(`Us State List `, result);
      if (result) {
        updateStateList(result);
      }
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
    }
  };

  const getCitiesHandler = async () => {
    try {
      toggleLoader(true);
      let result = await getStateCities({
        state: selectedState,
      });
      //console.log(`${selectedState} City List `, result);
      if (result) {
        updateCityList(result);
        toggleLoader(false);
      }
    } catch (e) {
      console.log(e);
      toggleLoader(false);
    }
  };

  const onSubmit = async () => {
    onSubmitHandler();
  };

  const onSubmitPublish = async () => {
    onSubmitHandler(true);
  };

  const onSubmitHandler = async (shouldPublish) => {
    try {
      console.log(`Form Data `, formData);

      if (isLoading) throw "A Process is in progress. Try again later";

      if (!selectedPageType || selectedPageType === "#")
        throw "Please select a page type";

      if (
        selectedPageType === "pillar" &&
        (!selectedCareType || selectedCareType === "#")
      )
        throw "Please select a care type";

      if (
        selectedPageType === "state" &&
        (!selectedCareType ||
          selectedCareType === "#" ||
          !selectedState ||
          selectedState === "#")
      )
        throw "Care Type & state needs to be selected for State page type";

      if (
        selectedPageType === "city" &&
        (!selectedCareType ||
          selectedCareType === "#" ||
          !selectedState ||
          selectedState === "#" ||
          !selectedCity ||
          selectedCity === "#")
      )
        throw "Care Type & state needs to be selected for State page type";

      if (selectedPageType === "blog" && (!selectedBlog || selectedBlog === ""))
        throw "Please select an article";

      if (selectedPageType === "other" && (!otherPageId || otherPageId === ""))
        throw "Page Id is required";

      if (!content || content === "") throw "Content is required";

      const pageId = generatePageId();

      toggleLoader(true);

      const result = await editStructurePageCmsData({
        selectedPageType,
        pageId,
        faqContent: content,
        itemId: null,
        shouldPublish,
      });
      if (result) {
      }
      toggleLoader(false);
    } catch (e) {
      toggleLoader(false);
      toastr.error("Error", e.toString());
      console.log(e);
    }
  };

  const generatePageId = () => {
    switch (selectedPageType) {
      case "blog":
        return selectedBlog;
      case "pillar":
        return slugify(selectedCareType);
      case "state":
        return `${slugify(selectedCareType)}-${selectedState}`;
      case "city":
        return `${slugify(selectedCareType)}-${selectedState}-${selectedCity}`;
      case "other":
        return slugify(otherPageId);
      default:
        return null;
    }
  };

  const onChange = (e) => {
    const element = e.target;
    const name = element.name;
    const value = element.value;
    updateFormDataHandler({
      [name]: value,
    });
  };

  const handleArticleKeyWordChange = async (value) => {
    let val = value;
    updateSearchBoxStateHandler({
      articleSearchInput: val,
    });
    updateFormDataHandler({
      selectedBlog: "",
    });
    if (val) {
      let result = await dispatch(
        searchBlogByKeyword({
          searchText: val,
          limit: 10,
        })
      );
      if (result) {
        //console.log(`Article List `, result);
        let optionList = result.rows.map((item) => ({
          label: `(${item?.categoryDetail?.title}) ${item.title}`,
          value: item,
        }));
        updateSuggestedArticleList(optionList);
      }
    }
  };

  const onArticleSelectHandler = (value) => {
    if (value) {
      const { id, categoryDetail, title, urlTitle, slug } = value;
      const valueLabel = `(${categoryDetail?.title}) ${title}`;
      updateFormDataHandler({
        selectedBlog: `blog/${slug}`,
      });
      updateSearchBoxStateHandler({
        articleSearchInput: valueLabel,
      });
    }
  };

  const onContentChangeHandler = (newContent) => {
    updateFormDataHandler({ content: newContent });
  };

  //TABLE COMPONENTS END

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="CW" breadcrumbItem="add structure data" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="col-md-12 text-end">
                    <div className="db-btn-group">
                      <Link
                        to="/cw/cms/structure"
                        title="Add Contact"
                        color="info"
                        className="btn btn-danger btn-label"
                      >
                        <i className="bx bx-block label-icon"></i>
                        Go Back
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    <div className="col-md-12">
                      <label className="">Select Page Type</label>
                      <select
                        className="form-select form-control selector-input"
                        name="selectedPageType"
                        value={selectedPageType}
                        onChange={onChange}
                      >
                        <option value="#" disabled>
                          Select Page Type
                        </option>
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
                          <option value="#">Select Care Type</option>
                          {careTypes?.map(({ title, id }) => {
                            return (
                              <option value={title} key={`c-${title}-${id}`}>
                                {title}
                              </option>
                            );
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
                            );
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
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  )}
                  {selectedPageType === "other" && (
                    <div className="row filter-row">
                      <div className="col-md-12">
                        <label className="filter-title">
                          {" "}
                          Page Id <sup className="lbl-star">*</sup>
                        </label>
                        <InputGroup>
                          <input
                            type="text"
                            name="otherPageId"
                            placeholder="ex: adviser-registration/contact-us"
                            onChange={onChange}
                            value={otherPageId}
                            className="form-control"
                          />
                          <div className="input-group-text">
                            <i className="fas fa-search-plus"></i>
                          </div>
                        </InputGroup>
                      </div>
                    </div>
                  )}

                  <br />

                  {isLoading ? (
                    <LoaderComponent />
                  ) : (
                    <div className="">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="pro-lbl-1" htmlFor="content">
                              Content{" "}
                              <span className="highlight-text">
                                Block (H3 = Question) (P = Answer)
                              </span>{" "}
                              <sup className="lbl-star">*</sup>
                            </label>
                            <TinyMceEditor
                              onChange={onContentChangeHandler}
                              value={initialContent}
                              height={550}
                              name={"content"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-5">
                        <Link
                          className="btn btn-danger  btn-label btn-lg mx-2"
                          to="/cw/cms/structure"
                        >
                          <i className="bx bx-block label-icon"></i> Cancel
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-primary  btn-label btn-lg"
                          onClick={onSubmitPublish}
                        >
                          <i className="bx bx-check-double label-icon"></i> Save
                          Changes
                        </button>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
});

const mapDispatchToProps = {
  editStructurePageCmsData,
  getStructureDataPageList,
  updateStructureCmsPageStatus,
  getseniorLivingtype,
  getAllUSStates,
  getStateCities,
  searchBlogByKeyword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStructureCMSPage);
