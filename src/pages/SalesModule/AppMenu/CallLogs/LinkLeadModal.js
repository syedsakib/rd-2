import React, { useState, useEffect, useRef, Fragment } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
//import "../../../../assets/scss/pages/homeCareDashboard.scss";
import { toastr } from "react-redux-toastr";
import ErrorView from "components/Common/ErrorView/ErrorView";
import { useForm } from "react-hook-form";
import {
  searchLeadList,
  linkLogToLead,
} from "../../../../store/Actions/callAction";
import SearchSelect from "components/Common/SearchSelect/SearchSelect";

const LinkLeadModal = ({
  openModal,
  hideModal,
  searchLeadList,
  modalBodyData,
  linkLogToLead,
  callBack,
}) => {
  const [formData, updateFormData] = useState({
    leadId: "",
    leadTitle: "",
    inputValue: "",
  });
  const [isLoading, setLoader] = useState(false);
  const [suggestedList, updateSuggestedList] = useState([]);
  const { leadId, inputValue, leadTitle } = formData;

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  };

  const onFormSubmit = async () => {
    try {
      if (!leadId) {
        throw "No Lead has been selected";
      }
      if (!modalBodyData) {
        throw "No Log Data Found";
      }
      setLoader(true);
      console.log(modalBodyData);
      const { direction, fromNumber, toNumber } = modalBodyData;
      let number = direction === "Incoming" ? fromNumber : toNumber;
      let result = await linkLogToLead({
        phoneNumber: number,
        leadId,
        leadTitle,
        leadOf: "agency",
      });
      console.log(result);
      setLoader(false);
      callBack();
      hideModalHandler();
    } catch (e) {
      console.log(e);
      setLoader(false);
      toastr.error("Error", e.toString());
    }
  };

  const handleKeyWordChange = async (value) => {
    let val = value;
    updateFormData({
      ...formData,
      inputValue: val,
    });
    if (val) {
      let result = await searchLeadList("agency", val);
      console.log(result);
      let optionList = result.map((item) => ({
        label: `${item.business.title} (${item.business.city},${item.business.state} ${item.business.zipCode})`,
        value: item,
      }));
      updateSuggestedList(optionList);
    }
  };

  const onSelectHandler = (value) => {
    if (value) {
      const { hc_business_id } = value;
      const valueLabel = `${value.business.title} (${value.business.city},${value.business.state} ${value.business.zipCode})`;
      updateFormData({
        ...formData,
        inputValue: valueLabel,
        leadId: hc_business_id,
        leadTitle: value.business.title,
      });
    }
  };

  const hideModalHandler = () => {
    hideModal();
    updateSuggestedList([]);
    updateFormData({
      ...formData,
      leadId: "",
      leadTitle: "",
      inputValue: "",
    });
  };

  return (
    <Modal isOpen={openModal} toggle={hideModalHandler} className="modal-lg">
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myModalLabel">
          Link to a Lead
        </h5>
        <button
          type="button"
          onClick={hideModalHandler}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="user-db-right-area">
          <div>
            {isLoading ? (
              <div className="user-db-loader">
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              </div>
            ) : null}
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="basic-information-form-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <SearchSelect
                        onChange={handleKeyWordChange}
                        options={suggestedList}
                        onSelect={onSelectHandler}
                        required={true}
                        labelName="Search Agency"
                        name="lead"
                        id="lead"
                        inputClassName={"form-control"}
                        placeHolder={"Search by title/phone/email"}
                        value={inputValue}
                        ref={register({
                          required: {
                            value: true,
                            message: errorTexts["required"],
                          },
                        })}
                      />
                      {errors["lead"] && errors["lead"].type === "required" && (
                        <ErrorView message={errors["lead"].message} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4" style={{ textAlign: "end" }}>
                <button
                  type="button"
                  className="btn btn-danger mx-3"
                  onClick={hideModalHandler}
                >
                  Go Back
                </button>
                <button type="submit" className="btn btn-info">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
});

const mapDispatchToProps = { searchLeadList, linkLogToLead };

export default connect(mapStateToProps, mapDispatchToProps)(LinkLeadModal);
