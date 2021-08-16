import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Table } from "reactstrap";
import ButtonComp from "components/Common/Button/Button";
import RoomTypeModalForm from "./roomTypeModalForm";
import NoteViewerModal from "./NoteViewerModal";
import RoomTypeEditModalForm from "./roomTypeEditModalForm";

const RoomTypeForm = ({ property, onChangeHandler, appSize, userDetails }) => {
  // app states
  const [modalState, updateModalState] = useState({
    openModalName: null,
    selectedModalData: null,
  });

  // destructure states
  const { openModalName, selectedModalData } = modalState;

  const openModal = (modalName, data) => {
    updateModalState({
      openModalName: modalName,
      selectedModalData: data,
    });
  };
  const closeModal = () => {
    updateModalState({
      openModalName: null,
      selectedModalData: null,
    });
  };

  const addNewRoom = (roomItem) => {
    let newList = property.roomList;
    newList.push(roomItem);
    onChangeHandler(newList);
  };

  const updateRoom = (roomItem) => {
    let newList = property.roomList.map((item) => {
      if (item.id === roomItem.id) {
        return {
          ...item,
          ...roomItem,
        };
      }
      return item;
    });
    onChangeHandler(newList);
  };

  const removeRoom = (roomItem) => {
    let newList = property.roomList.filter((item) => item.id !== roomItem.id);
    onChangeHandler(newList);
  };

  return (
    <div className="room-type-editor-wrapper">
      <div className="room-type-editor-header">
        <div className="room-type-editor-inner-header">
          <ButtonComp
            icon="plus"
            onClick={(e) => {
              openModal("room", {});
            }}
            toolTip="Add New Room"
            btnClass="normal"
            label="Add"
          />
        </div>
      </div>
      <div className="room-type-editor-body">
        {property && property.roomList && property.roomList.length > 0 ? (
          <div className="udb-property-listing-table udb-table-outer hc-list-wrapper">
            <div className="table-wrapper">
              <Table
                hover
                className="table-outline mb-0 d-none d-sm-table table-mx-tdwidth"
              >
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">#No</th>
                    <th className="text-center">Type</th>
                    <th className="text-center">Capacity</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Description</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="hc-list-wrapper">
                  {property &&
                    property.roomList &&
                    property.roomList.map((roomItem, index) => {
                      const {
                        roomType,
                        capacity,
                        roomPrice,
                        description,
                        roomStatus,
                        id,
                        roomTypeTitle,
                      } = roomItem;
                      return (
                        <tr key={`rm-${id}`}>
                          <td className="text-center">
                            <div className="hc-col-text">{index + 1}</div>
                          </td>
                          <td className="text-center">
                            <div className="hc-col-text">{roomTypeTitle}</div>
                          </td>
                          <td className="text-center">
                            <div className="hc-col-text">{capacity}</div>
                          </td>
                          <td className="text-center">
                            <div className="hc-col-text">{roomPrice}$</div>
                          </td>
                          <td className="text-center">
                            <div className="hc-col-text">{roomStatus}</div>
                          </td>
                          <td className="text-center">
                            <div className="hc-col-text d-flex justify-content-center">
                              {description ? (
                                <ButtonComp
                                  icon="eye"
                                  onClick={(e) => {
                                    openModal("note", roomItem);
                                  }}
                                  toolTip="View Note"
                                  btnClass="normal"
                                />
                              ) : (
                                "n/a"
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="table-action-btn-wrapper long-table-action-btn-wrapper d-flex justify-content-center">
                              <div className="table-action-btn-box">
                                <ButtonComp
                                  icon="edit"
                                  onClick={(e) => {
                                    openModal("roomEdit", roomItem);
                                  }}
                                  toolTip="Edit Room Detail"
                                  btnClass="normal"
                                />
                              </div>
                              <div className="table-action-btn-box">
                                <ButtonComp
                                  icon="trash"
                                  onClick={(e) => {
                                    removeRoom(roomItem);
                                  }}
                                  toolTip="Remove"
                                  btnClass="danger"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="default-view-wrapper text-center">
            <h4 className="default-view-text p-5"> Add New Rooms</h4>
          </div>
        )}
      </div>
      <RoomTypeModalForm
        openModal={openModalName === "room"}
        hideModal={closeModal}
        itemDetail={selectedModalData}
        appSize={appSize}
        callBack={addNewRoom}
      />
      <RoomTypeEditModalForm
        openModal={openModalName === "roomEdit"}
        hideModal={closeModal}
        itemDetail={selectedModalData}
        appSize={appSize}
        callBack={updateRoom}
      />
      <NoteViewerModal
        openModal={openModalName === "note"}
        hideModal={closeModal}
        itemDetail={selectedModalData}
        appSize={appSize}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoomTypeForm);
