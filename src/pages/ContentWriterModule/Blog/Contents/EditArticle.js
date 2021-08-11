import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useRef } from "react";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";
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
import ErrorView from "components/Common/ErrorView/ErrorView";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";
import { useForm } from "react-hook-form";
import ReactTags from "components/Common/ReactTags/ReactTags";
import TinyMCEEditor from "components/Common/Editor/TinyMCEEDitor";

//redux & actions
import {
  getEditArticleData,
  editArticle,
  getOnlyWriter,
  getTagList,
} from "../../../../store/Actions/adminAction";
import { getCategorytype } from "../../../../store/Actions/userAction";

import LoaderComponent from "components/Common/Loader/LoaderComponent";

const EditArticle = ({
  getEditArticleData,
  getOnlyWriter,
  getCategorytype,
  editArticle,
  getTagList,
  match: { params },
}) => {
  // declare states
  const history = useHistory();
  const [appState, updateAppState] = useState({
    isLoading: false,
  });
  const [formFieldData, updateFormFieldData] = useState({
    writerList: [],
    categoryList: [],
    articleData: null,
  });
  const [formData, updateFormData] = useState({
    title: "",
    category: "0",
    writer: "0",
    metaDesc: "",
    altText: "",
    metaKeyword: "",
    metaTitle: "",
    urlTitle: "",
  });
  const [editorContent, updateEditorContent] = useState({
    content: "",
    initialContent: "",
  });
  const [imageContent, updateImageContent] = useState({
    coverImage: "",
    coverImageData: "",
  });
  const [tagData, updateTagData] = useState({
    tagList: [],
    suggestionList: [],
    prevTags: [],
  });
  const [articleId, updateArticleId] = useState(null);
  const { isLoading } = appState;
  const { writerList, categoryList, articleData } = formFieldData;
  const { content, initialContent } = editorContent;
  const { coverImage, coverImageData } = imageContent;
  const {
    title,
    category,
    writer,
    metaDesc,
    altText,
    metaKeyword,
    metaTitle,
    urlTitle,
  } = formData;
  const { tagList, suggestionList, prevTags } = tagData;
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
  };

  useEffect(() => {
    console.log(`Params `, params);
    if (params && params.id) {
      updateArticleId(params.id);
    }
  }, []);

  useEffect(() => {
    if (articleId) {
      getFormDataList();
    }
  }, [articleId]);

  useEffect(() => {
    if (suggestionList && suggestionList.length > 0) {
      getArticleData();
    }
  }, [suggestionList]);

  const getArticleData = async () => {
    try {
      let articleData = await getEditArticleData(articleId);
      if (articleData) {
        updateFormData({
          ...formData,
          title: articleData.title,
          category: articleData.categoryId,
          writer: articleData.writerId,
          metaDesc: articleData.metaDesc,
          altText: articleData.altText,
          metaKeyword: articleData.metaKeyword,
          metaTitle: articleData.metaTitle,
          urlTitle: articleData.urlTitle,
        });
        updateImageContent({
          ...imageContent,
          coverImageData: articleData.image,
        });
        updateEditorContent({
          ...editorContent,
          initialContent: articleData.content,
          content: articleData.content,
        });
        if (
          articleData.tags &&
          articleData.tags.length > 0 &&
          articleData.tags[0].tag
        ) {
          let prevTags = articleData.tags.map((item) => ({
            id: item.tag.id,
            name: item.tag.title,
          }));
          console.log(prevTags);
          updateTagData({
            ...tagData,
            tagList: prevTags,
            prevTags,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getFormDataList = async () => {
    try {
      let wList = await getOnlyWriter();
      let cList = await getCategorytype();
      let tList = await getTagList();
      if (wList && cList) {
        updateFormFieldData({
          writerList: wList,
          categoryList: cList,
        });
        if (tList) {
          let mappedSuggestionList = tList.rows.map((item) => {
            return {
              id: item.id,
              name: item.title,
            };
          });
          console.log(`Mapped Suggestion List `, mappedSuggestionList);
          updateTagData({
            ...tagData,
            suggestionList: mappedSuggestionList,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleLoader = (value) => {
    updateAppState({
      ...appState,
      isLoading: value,
    });
  };

  const onFormSubmit = async (e) => {
    try {
      if (!articleId) {
        throw "No article Id found";
      }

      if (
        !category ||
        category == 0 ||
        !writer ||
        writer == 0 ||
        content === ""
      ) {
        throw "Please fill all the field";
      }
      if (tagList.length === 0) {
        throw "Please select at least one tag";
      }
      const postData = {
        title,
        metaDesc,
        altText,
        category,
        writer,
        metaKeyword,
        metaTitle,
        urlTitle,
      };
      toggleLoader(true);
      let result = await editArticle({
        formData: postData,
        content,
        imageData: coverImage,
        id: articleId,
        tags: tagList.map((item) => item.id),
      });
      toggleLoader(false);
      if (result) {
        setTimeout(() => {
          history.push("/cw/blog");
        }, 1000);
        console.log(result);
      }
    } catch (e) {
      toggleLoader(false);
      toastr.error("Error", e.toString());
    }
  };

  const onChangeCoverPic = async (file) => {
    try {
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        let base64File = URL.createObjectURL(file);
        updateImageContent({
          coverImage: file,
          coverImageData: base64File,
        });
      } else {
        throw "Please drag image only!";
      }
    } catch (e) {
      toastr.error("Error", e.toString());
    }
  };

  const clearForm = () => {
    updateFormData({
      title: "",
      category: "0",
      writer: "0",
      metaDesc: "",
      altText: "",
      metaTitle: "",
      metaKeyword: "",
      urlTitle: "",
    });
  };

  const onChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onContentChangeHandler = (newContent) => {
    updateEditorContent({
      ...editorContent,
      content: newContent,
    });
  };

  const onChangeTag = (tags) => {
    updateTagData({
      ...tagData,
      tagList: tags,
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>BoomersHub | Admin Dashboard </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="CW" breadcrumbItem="edit article data" />

          <Row>
            <Col lg="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="row filter-row">
                    {isLoading ? (
                      <LoaderComponent />
                    ) : (
                      <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="row">
                          <div className="col-sm-12">
                            <label className="">
                              H1 Tag{" "}
                              <sup
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                *
                              </sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              id="title"
                              onChange={(e) => onChange(e)}
                              value={title}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["title"] &&
                              errors["title"].type === "required" && (
                                <ErrorView message={errors["title"].message} />
                              )}
                          </div>
                          <div className="col-sm-12 mt-3">
                            <label className="">
                              URL Title{" "}
                              <sup
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                *
                              </sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="urlTitle"
                              id="urlTitle"
                              onChange={(e) => onChange(e)}
                              value={urlTitle}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["urlTitle"] &&
                              errors["urlTitle"].type === "required" && (
                                <ErrorView
                                  message={errors["urlTitle"].message}
                                />
                              )}
                          </div>
                          <div className="col-sm-12 col-md-6 mt-3">
                            <label className="">
                              Category{" "}
                              <sup
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                *
                              </sup>
                            </label>
                            <select
                              className="form-select form-control selector-input"
                              value={category}
                              onChange={(e) => onChange(e)}
                              name="category"
                              id="category"
                            >
                              <option value={0} disabled>
                                Select Category
                              </option>
                              {categoryList &&
                                categoryList.map(({ id, title }) => {
                                  return (
                                    <option key={`cat-${id}`} value={id}>
                                      {title}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="col-sm-12 col-md-6 mt-3">
                            <label className="">
                              Writers{" "}
                              <sup
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                *
                              </sup>
                            </label>
                            <select
                              className="form-select form-control selector-input"
                              value={writer}
                              onChange={(e) => onChange(e)}
                              name="writer"
                              id="writer"
                            >
                              <option value={0} disabled>
                                Select Writer
                              </option>
                              {writerList &&
                                writerList.map(({ id, name }) => {
                                  return (
                                    <option key={`wr-${id}`} value={id}>
                                      {name}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="col-sm-12 mt-3">
                            <label className="">
                              Meta Descriptione{" "}
                              <sup
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                *
                              </sup>
                            </label>
                            <input
                              value={metaDesc}
                              type="text"
                              className="form-control"
                              name="metaDesc"
                              id="metaDesc"
                              onChange={(e) => onChange(e)}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["metaDesc"] &&
                              errors["metaDesc"].type === "required" && (
                                <ErrorView
                                  message={errors["metaDesc"].message}
                                />
                              )}
                          </div>
                          <div className="col-sm-12 mt-3">
                            <label className="">
                              Alt Text{" "}
                              <sup
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                *
                              </sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="altText"
                              id="altText"
                              onChange={(e) => onChange(e)}
                              value={altText}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["altText"] &&
                              errors["altText"].type === "required" && (
                                <ErrorView
                                  message={errors["altText"].message}
                                />
                              )}
                          </div>
                          <div className="col-sm-12 mt-3">
                            <label className="">
                              Meta Title{" "}
                              <sup
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                *
                              </sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="metaTitle"
                              id="metaTitle"
                              onChange={(e) => onChange(e)}
                              value={metaTitle}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["metaTitle"] &&
                              errors["metaTitle"].type === "required" && (
                                <ErrorView
                                  message={errors["metaTitle"].message}
                                />
                              )}
                          </div>
                          <div className="col-sm-12 mt-3">
                            <label className="">
                              Meta KeyWords{" "}
                              <sup
                                className="lbl-star"
                                style={{ color: "red" }}
                              >
                                *
                              </sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="metaKeyword"
                              id="metaKeyword"
                              onChange={(e) => onChange(e)}
                              value={metaKeyword}
                              ref={register({
                                required: {
                                  value: true,
                                  message: errorTexts["required"],
                                },
                              })}
                            />
                            {errors["metaKeyword"] &&
                              errors["metaKeyword"].type === "required" && (
                                <ErrorView
                                  message={errors["metaKeyword"].message}
                                />
                              )}
                          </div>
                          <div className="row mt-5">
                            <div className="col-sm-12">
                              <div className="form-group">
                                <label className="pro-lbl-1">
                                  Upload Image{" "}
                                </label>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <StyledDropZone
                                      onDrop={(file) => onChangeCoverPic(file)}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    {coverImageData && coverImageData !== "" ? (
                                      <div>
                                        <figure className="upload-img-outer">
                                          <img
                                            className="rounded ms-2"
                                            alt="cover image"
                                            width="200"
                                            height="115"
                                            src={coverImageData}
                                          />
                                        </figure>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-5">
                            <div className="col-sm-12">
                              <label className="">
                                Content{" "}
                                <sup
                                  className="lbl-star"
                                  style={{ color: "red" }}
                                >
                                  *
                                </sup>
                              </label>
                              <div className="col-sm-12">
                                <TinyMCEEditor
                                  onChange={onContentChangeHandler}
                                  value={initialContent}
                                />
                              </div>
                            </div>
                          </div>
                          {suggestionList && suggestionList.length > 0 && (
                            <div className="row pt-5">
                              <div className="col=sm-12">
                                <label className="">
                                  Tags{" "}
                                  <sup
                                    className="lbl-star"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </sup>
                                </label>
                                <ReactTags
                                  suggestionList={suggestionList}
                                  onChange={onChangeTag}
                                />
                              </div>
                            </div>
                          )}
                          <div className="text-center mt-4">
                            <Link
                              className="btn btn-danger  btn-label btn-lg mx-2"
                              to="/cw/blog"
                            >
                              <i className="bx bx-block label-icon"></i> Cancel
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-primary  btn-label btn-lg"
                            >
                              <i className="bx bx-check-double label-icon"></i>{" "}
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
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
  getEditArticleData,
  getOnlyWriter,
  getCategorytype,
  editArticle,
  getTagList,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
