import MetaTags from "react-meta-tags"
import React, { useState, useEffect, useRef } from "react"
import { toastr } from "react-redux-toastr"
import { connect } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap"

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb"
import ErrorView from "components/Common/ErrorView/ErrorView"
import { useForm } from "react-hook-form"
import CustomEditor from "components/Common/Editor/Editor"

//redux & actions
import {
  getCurrentNews,
  updateNews,
} from "../../../../store/Actions/adminAction"

import LoaderComponent from "components/Common/Loader/LoaderComponent"

const NewsPortal = ({
  getCurrentNews,
  updateNews,
  userDetails,
  isAuthenticated,
}) => {
  // declare states
  const history = useHistory()
  const [appState, updateAppState] = useState({
    isLoading: false,
  })
  const [formData, updateFormData] = useState({
    title: "",
  })
  const [editorContent, updateEditorContent] = useState({
    content: "",
    initialContent: "",
  })
  const { isLoading } = appState
  const { content, initialContent } = editorContent
  const { title } = formData
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })
  const errorTexts = {
    required: "This field is required",
  }

  useEffect(() => {
    getFormData()
  }, [])

  const getFormData = async () => {
    try {
      let result = await getCurrentNews()
      console.log(result)
      if (result) {
        updateFormData({
          ...formData,
          title: result.title,
        })
        updateEditorContent({
          ...editorContent,
          initialContent: result.content,
          content: result.content,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const toggleLoader = value => {
    updateAppState({
      ...appState,
      isLoading: value,
    })
  }

  const onFormSubmit = async e => {
    try {
      if (!content || content === "") {
        throw "Content is required"
      }
      toggleLoader(true)
      let result = await updateNews(title, content)
      toggleLoader(false)
    } catch (e) {
      toggleLoader(false)
      toastr.error("Error", e.toString())
    }
  }
  const onChange = e => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const onContentChangeHandler = newContent => {
    updateEditorContent({
      ...editorContent,
      content: newContent,
    })
  }

  if (isAuthenticated && !userDetails) {
    toastr.error("Error", "You need to login first")
    history.push("/admin/login")
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="CW" breadcrumbItem="manage news" />

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
                              Title{" "}
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
                              onChange={e => onChange(e)}
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
                                <CustomEditor
                                  onChange={onContentChangeHandler}
                                  value={initialContent}
                                />
                              </div>
                            </div>
                          </div>

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
  )
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.loggedInUser,
  isAuthenticated: state.global.isAuthenticated,
})

const mapDispatchToProps = {
  getCurrentNews,
  updateNews,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPortal)
