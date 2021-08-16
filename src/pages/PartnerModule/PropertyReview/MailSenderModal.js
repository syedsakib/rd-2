import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";

import ErrorView from "components/Common/ErrorView/ErrorView";
import LoaderComponent from "components/Common/Loader/LoaderComponent";
import CustomEditor from "components/Common/Editor/TinyMCEShort";

import { sendMailToUsers } from "../../../store/Actions/partnerAction";

const MailSenderModal = ({
  openModal,
  hideModal,
  emailTemplate,
  sendMailToUsers,
  itemDetail,
}) => {
  const [formData, updateFormData] = useState({
    email: "",
    subject: "",
  });
  const [isLoading, setLoader] = useState(false);
  const [editorContent, updateEditorContent] = useState({
    content: "",
    initialContent: "",
  });
  const { content, initialContent } = editorContent;
  const { email, subject } = formData;

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  };

  useEffect(() => {
    if (emailTemplate && itemDetail) {
      let url = window.location.href;
      let arr = url.split("/");
      let domain = arr[0] + "//" + arr[2];
      console.log(`Domain ${domain}`);
      let em_content = emailTemplate.content;
      em_content = handlebars.compile(em_content);
      em_content = em_content({
        LINK: `${itemDetail.pUrl}`,
        CREDENTIALS: `${itemDetail.businessTitle}`,
      });
      updateEditorContent({
        ...editorContent,
        initialContent: em_content,
        content: em_content,
      });
      updateFormData({
        ...formData,
        subject: emailTemplate.subject,
      });
    }
  }, [emailTemplate, itemDetail]);

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async () => {
    try {
      if (!itemDetail) {
        throw "No Data found";
      }
      if (!content || content === "") {
        throw "Content is required";
      }
      setLoader(true);
      let result = await sendMailToUsers({
        emailList: email,
        subject,
        content,
        itemId: itemDetail.id,
        templateId: emailTemplate.id,
      });
      if (result) {
        hideModalHandler();
      }
      setLoader(false);
    } catch (e) {
      console.log(e);
      setLoader(false);
      toastr.error(e.toString());
    }
  };

  const onContentChangeHandler = (newContent) => {
    updateEditorContent({
      ...editorContent,
      content: newContent,
    });
  };

  const hideModalHandler = () => {
    hideModal("detail", null);
    updateFormData({
      ...formData,
      email: "",
      subject: "",
    });
    updateEditorContent({
      ...editorContent,
      initialContent: "",
      content: "",
    });
  };

  return (
    <Modal isOpen={openModal} toggle={hideModalHandler} size="lg">
      <div className="modal-header" style={{ textAlign: "center" }}>
        <h5 className="modal-title mt-0">Send Mail</h5>
        <button
          onClick={hideModalHandler}
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {isLoading ? (
          <LoaderComponent />
        ) : (
          <>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="email">
                      Email{" "}
                      <sup className="lbl-star" style={{ color: "red" }}>
                        *
                      </sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Ex. mail1@a.com, mail2@b.com, mail3@b.com"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      ref={register({
                        required: {
                          value: true,
                          message: errorTexts["required"],
                        },
                      })}
                    />
                    {errors["subject"] &&
                      errors["subject"].type === "required" && (
                        <ErrorView message={errors["subject"].message} />
                      )}
                  </div>
                </div>
              </div>

              <div className="row pt-4">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="subject">
                      Subject{" "}
                      <sup className="lbl-star" style={{ color: "red" }}>
                        *
                      </sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="Enter Subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => onChange(e)}
                      ref={register({
                        required: {
                          value: true,
                          message: errorTexts["required"],
                        },
                      })}
                    />
                    {errors["subject"] &&
                      errors["subject"].type === "required" && (
                        <ErrorView message={errors["subject"].message} />
                      )}
                  </div>
                </div>
              </div>

              <div className="row pt-4">
                <div className="col-sm-12">
                  <label className="pro-lbl-1" htmlFor="subject">
                    Content{" "}
                    <sup className="lbl-star" style={{ color: "red" }}>
                      *
                    </sup>
                  </label>
                  <CustomEditor
                    onChange={onContentChangeHandler}
                    value={initialContent}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={hideModalHandler}
                  className="btn btn-danger mx-3"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-info"
                  data-dismiss="modal"
                >
                  Send Mail
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
});

const mapDispatchToProps = { sendMailToUsers };

export default connect(mapStateToProps, mapDispatchToProps)(MailSenderModal);
