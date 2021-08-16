import React from "react";
import { Modal } from "reactstrap";
import { connect } from "react-redux";

const PartnerPropertyDetailModal = ({ openModal, hideModal, itemDetail }) => {
  const hideModalHandler = () => {
    hideModal("detail", null);
  };

  return (
    <Modal isOpen={openModal} toggle={hideModalHandler} size="lg">
      <div className="modal-header" style={{ textAlign: "center" }}>
        <h5 className="modal-title mt-0">Promotion Description</h5>
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
      {itemDetail && (
        <div className="modal-body">
          <h5 className="pt-4">Details:</h5>
          <p className="font-weight-bold">{itemDetail.description}</p>
        </div>
      )}
      <div className="modal-footer">
        <button
          type="button"
          onClick={hideModalHandler}
          className="btn btn-info "
          data-dismiss="modal"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(PartnerPropertyDetailModal);
