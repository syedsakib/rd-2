import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Loader from "react-loader-spinner";
import ErrorView from "components/Common/ErrorView/ErrorView";
import { useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const RoomTypeEditModalForm = ({
  openModal,
  hideModal,
  callBack,
  itemDetail,
  pRoomTypeList,
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
    roomTypeTitle: "",
    roomType: "",
    capacity: "",
    roomPrice: "",
    description: "",
    roomStatus: "",
    careCost: "",
    inclusiveCost: "",
  });

  const {
    roomType,
    capacity,
    roomPrice,
    description,
    roomStatus,
    careCost,
    inclusiveCost,
    roomTypeTitle,
  } = formData;

  useEffect(() => {
    if (itemDetail && itemDetail.id) {
      updateFormData({
        roomTypeTitle: itemDetail.roomTypeTitle,
        roomType: itemDetail.roomType,
        capacity: itemDetail.capacity,
        roomPrice: itemDetail.roomPrice,
        description: itemDetail.description,
        roomStatus: itemDetail.roomStatus,
        careCost: itemDetail.careCost,
        inclusiveCost: itemDetail.inclusiveCost,
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
      roomTypeTitle: "",
      roomType: "",
      capacity: "",
      roomPrice: "",
      description: "",
      roomStatus: "",
      careCost: "",
      inclusiveCost: "",
    });
  };
  const onSubmitHandler = async () => {
    try {
      console.log(formData);

      if (!itemDetail) {
        throw "No Room detail found";
      }
      if (!roomType || roomType === "#") {
        throw "Room Type is required";
      }
      if (!roomStatus || roomStatus === "#") {
        throw "Room Status is required";
      }
      callBack({
        id: itemDetail.id,
        roomType,
        capacity,
        roomPrice,
        description,
        roomStatus,
        careCost,
        inclusiveCost,
        roomTypeTitle,
      });
      hideModalHandler();
    } catch (e) {
      toggleLoader(false);
      toastr.error("Error", e.toString());
    }
  };
  const hideModalHandler = () => {
    hideModal();
    clearForm();
  };

  const onTypeChangeHandler = (e) => {
    try {
      let sValue = e.target.value;
      if (sValue !== "#") {
        let sp = pRoomTypeList.rows.filter((item) => item.id == sValue)[0];
        updateFormData({
          ...formData,
          roomTypeTitle: sp.title,
          roomType: sp.id,
        });
      } else {
        updateFormData({
          ...formData,
          roomTypeTitle: "",
          roomType: sValue,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
        toggle={hideModalHandler}
        className="modal-inquiry modal-lg"
      >
        <ModalHeader toggle={hideModalHandler}>
          Update Room Information
        </ModalHeader>
        <ModalBody>
          {isLoading ? (
            <div className="modal-loader-wrapper">
              <LoaderComponent />
            </div>
          ) : null}
          <div className="lead-form-body-wrapper">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="info-section-row">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="email">
                        Room Type{" "}
                        <sup className="lbl-star" style={{ color: "red" }}>
                          *
                        </sup>
                      </label>
                      <select
                        className="form-control selector-input"
                        value={roomType}
                        name="roomType"
                        onChange={onTypeChangeHandler}
                      >
                        <option value="#">Select Type</option>
                        {pRoomTypeList &&
                          pRoomTypeList.rows &&
                          pRoomTypeList.rows.map((rItem) => {
                            let key = rItem.id;
                            return (
                              <option key={key} value={key}>
                                {rItem.title}
                              </option>
                            );
                          })}
                      </select>
                      {errors["roomType"] &&
                        errors["roomType"].type === "required" && (
                          <ErrorView message={errors["roomType"].message} />
                        )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="email">
                        Capacity{" "}
                        <sup className="lbl-star" style={{ color: "red" }}>
                          *
                        </sup>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="capacity"
                        placeholder="Enter room capacity"
                        name="capacity"
                        value={capacity}
                        onChange={onChange}
                        ref={register({
                          required: {
                            value: true,
                            message: errorTexts["required"],
                          },
                        })}
                      />
                      {errors["capacity"] &&
                        errors["capacity"].type === "required" && (
                          <ErrorView message={errors["capacity"].message} />
                        )}
                    </div>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="email">
                        Base Price{" "}
                        <sup className="lbl-star" style={{ color: "red" }}>
                          *
                        </sup>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="roomPrice"
                        placeholder="Enter Base price"
                        name="roomPrice"
                        value={roomPrice}
                        onChange={onChange}
                        ref={register({
                          required: {
                            value: true,
                            message: errorTexts["required"],
                          },
                        })}
                      />
                      {errors["roomPrice"] &&
                        errors["roomPrice"].type === "required" && (
                          <ErrorView message={errors["roomPrice"].message} />
                        )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="email">Care Cost</label>
                      <input
                        type="number"
                        className="form-control"
                        id="careCost"
                        placeholder="Enter Care Cost"
                        name="careCost"
                        value={careCost}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="email">Inclusive Cost</label>
                      <input
                        type="number"
                        className="form-control"
                        id="inclusiveCost"
                        placeholder="Enter Inclusive Cost"
                        name="inclusiveCost"
                        value={inclusiveCost}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="email">
                        Status{" "}
                        <sup className="lbl-star" style={{ color: "red" }}>
                          *
                        </sup>
                      </label>
                      <select
                        className="form-control selector-input"
                        value={roomStatus}
                        name="roomStatus"
                        onChange={onChange}
                      >
                        <option value="#">Select Room Status</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                      </select>
                      {errors["roomStatus"] &&
                        errors["roomStatus"].type === "required" && (
                          <ErrorView message={errors["roomStatus"].message} />
                        )}
                    </div>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="email">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        placeholder="Short Description about the room..."
                        name="description"
                        value={description}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-footer-wrapper py-3 text-end">
                <button type="submit" className="btn btn-info">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
  pRoomTypeList: state.scrape.pRoomTypeList,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomTypeEditModalForm);
