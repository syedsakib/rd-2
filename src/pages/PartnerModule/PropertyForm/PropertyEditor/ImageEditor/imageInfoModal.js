import React, { useState, useEffect } from "react";
import ErrorView from "../../../../../../components/Common/ErrorView/ErrorView";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { updatePropertyPhotoDetail } from "../../../../../../store/Actions/scrapeAction";
import "react-phone-number-input/style.css";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { toastr } from "react-redux-toastr";

const ImageInfoAddForm = ({
  openModal,
  hideModal,
  item,
  callBack,
  updatePropertyPhotoDetail,
}) => {
  const [formData, updateFormData] = useState({
    altTag: "",
    title: "",
  });
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const errorTexts = {
    required: "This field is required",
    pattern: "Numbers and special chars not allowed",
  };

  const { altTag, title } = formData;

  useEffect(() => {
    if (item) {
      updateFormData({
        ...formData,
        altTag: item.alt_attribute,
      });
    }
  }, [item]);

  const onFormSubmit = async () => {
    try {
      if (!item) {
        throw "No ItemData Found";
      }
      let result = await updatePropertyPhotoDetail({
        photoId: item.id,
        altText: altTag,
      });
      if (result) {
        callBack(item, { altText: altTag });
        hideModalHandler();
      }
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  const onChangeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const hideModalHandler = () => {
    hideModal();
    updateFormData({
      altTag: "",
      title: "",
    });
  };

  return (
    <div>
      <Modal isOpen={openModal} toggle={hideModalHandler} className="modal-lg">
        <ModalHeader toggle={hideModal}>
          <div className="modal-title">Update Information</div>
        </ModalHeader>
        <ModalBody>
          <div className="modal-body-wrapper">
            <div className="note-form-wrapper">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="basic-information-form-wrapper">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="altTag">
                          Alt Text{" "}
                          <sup className="lbl-star" style={{ color: "red" }}>
                            *
                          </sup>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="altTag"
                          name="altTag"
                          value={altTag}
                          onChange={onChangeHandler}
                          ref={register({
                            required: {
                              value: true,
                              message: errorTexts["required"],
                            },
                          })}
                        />
                        {errors["altTag"] &&
                          errors["altTag"].type === "required" && (
                            <ErrorView message={errors["altTag"].message} />
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="form-footer-wrapper pt-4 text-end">
                    <div className="form-footer-wrapper">
                      <button type="submit" className="btn btn-info">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = { updatePropertyPhotoDetail };

export default connect(null, mapDispatchToProps)(ImageInfoAddForm);
