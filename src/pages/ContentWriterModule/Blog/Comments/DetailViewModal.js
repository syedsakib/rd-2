import React, { Fragment, useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import { formatDate } from "../../../../store/utils/util";

const DetailViewModal = ({ openModal, hideModal, commentDetail }) => {
  const hideModalHandler = () => {
    hideModal("detail", null);
  };

  return (
    <Modal isOpen={openModal} toggle={hideModalHandler} size="lg">
      <div className="modal-header" style={{ textAlign: "center" }}>
        <h5 className="modal-title mt-0">Comment Detail</h5>
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
      {commentDetail && (
        <div className="modal-body">
          <h5 className="pt-3">Article</h5>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open(`/post/${commentDetail.article.slug}`);
            }}
          >
            {commentDetail.article.title}
          </a>

          <h5 className="pt-4">Commented By</h5>
          <p className="font-weight-bold">{commentDetail.fUserName}</p>

          <h5 className="pt-4">User Type</h5>
          <p>{commentDetail.userType}</p>

          <h5 className="pt-4">User Email</h5>
          <p>{commentDetail.fUserEmail}</p>

          <h5 className="pt-4">Comment</h5>
          <p>{commentDetail.content}</p>

          {commentDetail.status !== "Pending" && (
            <Fragment>
              <h5 className="pt-4">{`${commentDetail.status} By`}</h5>
              <p>
                {commentDetail.adminDetail
                  ? `${commentDetail.adminDetail.firstName} ${commentDetail.adminDetail.lastName}`
                  : "n/a"}
              </p>

              <h5 className="pt-4">{`${commentDetail.status} On`}</h5>
              <p>{formatDate(commentDetail.approvedOn)}</p>
            </Fragment>
          )}
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

export default connect(null, mapDispatchToProps)(DetailViewModal);
