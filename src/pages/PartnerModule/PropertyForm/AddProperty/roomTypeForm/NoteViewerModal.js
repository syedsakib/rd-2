import React, { Fragment, useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect } from "react-redux";

const NoteViewerModal = ({ openModal, hideModal, itemDetail, appSize }) => {
  const hideModalHandler = () => {
    hideModal();
  };
  return (
    <div>
      <Modal
        isOpen={openModal}
        toggle={hideModalHandler}
        className="modal-survey"
      >
        <ModalHeader toggle={hideModalHandler}>
          <div className="modal-title">Room Description</div>
        </ModalHeader>
        <ModalBody>
          {itemDetail && (
            <div className="detail-modal-body-wrapper">
              <div className="content-row-wrapper">
                <div className="content-column">
                  <p className="content-value">{itemDetail.description}</p>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(NoteViewerModal);
