import React, { useState, useEffect } from "react";
import { Button, Modal } from "reactstrap";
import { connect } from "react-redux";
import ErrorView from "components/Common/ErrorView/ErrorView";
import { useForm } from "react-hook-form";
import { addTag } from "../../../../store/Actions/adminAction";
import { toastr } from "react-redux-toastr";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AddTagModal = ({ openModal, hideModal, callBack, addTag, tagData }) => {
  const [isLoading, setLoader] = useState(false);
  const [formData, updateFormData] = useState({
    title: "",
    description: "",
  });
  const { title, description } = formData;
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  };

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
      setLoader(true);
      let result = await addTag(title, description);
      setLoader(false);
      if (result) {
        callBack();
        hideModalHandler();
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const hideModalHandler = () => {
    hideModal("insert");
  };

  return (
    <>
      <Modal isOpen={openModal} toggle={hideModalHandler}>
        <div className="modal-header">
          <h5 className="modal-title mt-0">Add New Tag</h5>
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
          <div className="payment-source-add-modal">
            {isLoading ? (
              <LoaderComponent />
            ) : (
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="title">
                        Title{" "}
                        <sup className="lbl-star" style={{ color: "red" }}>
                          *
                        </sup>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={title}
                        onChange={onChange}
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
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="description">
                        Description{" "}
                        <sup className="lbl-star" style={{ color: "red" }}>
                          *
                        </sup>
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        onChange={onChange}
                        value={description}
                        ref={register({
                          required: {
                            value: true,
                            message: errorTexts["required"],
                          },
                        })}
                        rows="5"
                      />
                      {errors["description"] &&
                        errors["description"].type === "required" && (
                          <ErrorView message={errors["description"].message} />
                        )}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={hideModalHandler}
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <Button
                    type="submit"
                    onClick={onFormSubmit}
                    className="btn btn-success"
                    //data-dismiss="modal"
                  >
                    Save
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
});

const mapDispatchToProps = { addTag };

export default connect(mapStateToProps, mapDispatchToProps)(AddTagModal);
