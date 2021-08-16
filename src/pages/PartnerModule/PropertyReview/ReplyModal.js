import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";

import ErrorView from "components/Common/ErrorView/ErrorView";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

import { replyToSeniorLivingReview } from "../../../store/Actions/partnerAction";

const ReplyModal = ({
  openModal,
  hideModal,
  callBack,
  itemDetail,
  replyToSeniorLivingReview,
}) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  };

  const [isLoading, toggleLoader] = useState(false);
  const [formData, updateFormData] = useState({
    replyContent: "",
  });

  const hideModalHandler = () => {
    hideModal("detail", null);
    clearForm();
  };

  const { replyContent } = formData;

  useEffect(() => {
    if (itemDetail && itemDetail.reply_content) {
      updateFormData({
        ...formData,
        replyContent: itemDetail.reply_content,
      });
    }
  }, [itemDetail]);

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearForm = () => {
    updateFormData({
      replyContent: "",
    });
  };
  const onSubmitHandler = async () => {
    try {
      if (!itemDetail) {
        throw "No Review data found";
      }
      toggleLoader(true);
      let result = await replyToSeniorLivingReview({
        itemId: itemDetail.id,
        replyContent,
      });
      if (result) {
        callBack();
        hideModalHandler();
      }
      toggleLoader(false);
    } catch (e) {
      toggleLoader(false);
      toastr.error("Error", e.toString());
    }
  };

  return (
    <Modal isOpen={openModal} toggle={hideModalHandler} size="lg">
      <div className="modal-header" style={{ textAlign: "center" }}>
        <h5 className="modal-title mt-0">
          {" "}
          Reply to{" "}
          <span className="highlight-text">
            {itemDetail && itemDetail.fUserName}
          </span>
        </h5>
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
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <textArea
                      type="textArea"
                      className="form-control"
                      id="replyContent"
                      placeholder="Enter Description"
                      name="replyContent"
                      value={replyContent}
                      onChange={onChange}
                      ref={register({
                        required: {
                          value: true,
                          message: errorTexts["required"],
                        },
                      })}
                      rows="5"
                    />
                    {errors["replyContent"] &&
                      errors["replyContent"].type === "required" && (
                        <ErrorView message={errors["replyContent"].message} />
                      )}
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
                    Submit
                  </button>
                </div>
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
  appSize: state.global.appSize,
});

const mapDispatchToProps = { replyToSeniorLivingReview };

export default connect(mapStateToProps, mapDispatchToProps)(ReplyModal);
