import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ErrorView from "components/Common/ErrorView/ErrorView";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

import { addPromotion } from "../../../store/Actions/partnerAction";

const PromotionModal = ({
  openModal,
  hideModal,
  callBack,
  itemDetail,
  addPromotion,
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
    startDate: new Date(),
    endDate: "",
    promotionText: "",
    promotionTitle: "",
  });

  const { startDate, endDate, promotionText, promotionTitle } = formData;

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
      startDate: null,
      endDate: null,
      promotionText: "",
      promotionTitle: "",
    });
  };
  const onSubmitHandler = async () => {
    try {
      if (!itemDetail || !itemDetail.id) {
        throw "No property detail found";
      }
      if (!startDate) {
        throw "Start date is required";
      }
      if (!endDate) {
        throw "End date is required";
      }
      toggleLoader(true);
      let result = await addPromotion({
        startDate,
        endDate,
        promotionText,
        itemId: itemDetail.id,
        promotionTitle,
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
  const hideModalHandler = () => {
    hideModal();
    clearForm();
  };

  const handleDateChange = (value, type) => {
    updateFormData({
      ...formData,
      [type]: value,
    });
  };

  return (
    <Modal isOpen={openModal} toggle={hideModalHandler} size="lg">
      <div className="modal-header" style={{ textAlign: "center" }}>
        <h5 className="modal-title mt-0">Promotion Form</h5>
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
                    <label className="pro-lbl-1" htmlFor="promotionTitle">
                      Title{" "}
                      <sup className="lbl-star" style={{ color: "red" }}>
                        *
                      </sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="promotionTitle"
                      placeholder=""
                      name="promotionTitle"
                      value={promotionTitle}
                      onChange={(e) => onChange(e)}
                      ref={register({
                        required: {
                          value: true,
                          message: errorTexts["required"],
                        },
                      })}
                    />
                    {errors["promotionTitle"] &&
                      errors["promotionTitle"].type === "required" && (
                        <ErrorView message={errors["promotionTitle"].message} />
                      )}
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="startDate">
                      Start Date{" "}
                      <sup className="lbl-star" style={{ color: "red" }}>
                        *
                      </sup>
                    </label>
                    <DatePicker
                      minDate={new Date()}
                      selected={startDate}
                      onChange={(value) => {
                        handleDateChange(value, "startDate");
                      }}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="pro-lbl-1" htmlFor="endDate">
                      End Date{" "}
                      <sup className="lbl-star" style={{ color: "red" }}>
                        *
                      </sup>
                    </label>
                    <DatePicker
                      minDate={startDate}
                      selected={endDate}
                      onChange={(value) => {
                        handleDateChange(value, "endDate");
                      }}
                      disabled={!startDate}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="promotionText">
                      Promotion <sup className="lbl-star">*</sup>
                    </label>
                    <textArea
                      type="textArea"
                      className="form-control"
                      id="promotionText"
                      placeholder="Write description"
                      name="promotionText"
                      value={promotionText}
                      onChange={onChange}
                      ref={register({
                        required: {
                          value: true,
                          message: errorTexts["required"],
                        },
                      })}
                      rows="5"
                    />
                    {errors["promotionText"] &&
                      errors["promotionText"].type === "required" && (
                        <ErrorView message={errors["promotionText"].message} />
                      )}
                  </div>
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

const mapDispatchToProps = { addPromotion };

export default connect(mapStateToProps, mapDispatchToProps)(PromotionModal);
