import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { connect } from "react-redux";
import { formatDate } from "../../../store/utils/util";
import ReactStars from "react-rating-stars-component";

const PartnerPropertyDetailModal = ({ openModal, hideModal, itemDetail }) => {
  const hideModalHandler = () => {
    hideModal("detail", null);
  };

  return (
    <Modal isOpen={openModal} toggle={hideModalHandler} size="lg">
      <div className="modal-header" style={{ textAlign: "center" }}>
        <h5 className="modal-title mt-0">Review Detail</h5>
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
          <h5 className="pt-3">Property</h5>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open(itemDetail.pUrl);
            }}
          >
            {itemDetail.property.businessTitle}
          </a>

          <h5 className="pt-4">Reviewed By</h5>
          <p className="font-weight-bold">{itemDetail.fUserName}</p>

          <h5 className="pt-4">User Type</h5>
          <p>{itemDetail.user_type}</p>

          <h5 className="pt-4">User Email</h5>
          <p>{itemDetail.fUserEmail}</p>

          <h5 className="pt-4">Comment</h5>
          <p>{itemDetail.review_content}</p>

          <h5 className="pt-4">Rating</h5>
          <p>
            <ReactStars
              count={5}
              activeColor="#ffd700"
              edit={false}
              value={itemDetail.rating}
            />
          </p>

          {itemDetail.reply_content && (
            <Fragment>
              <h5 className="pt-4">Reply</h5>
              <p>{itemDetail.reply_content}</p>
            </Fragment>
          )}

          {itemDetail.status !== "Pending" && (
            <Fragment>
              <h5 className="pt-4">{`${itemDetail.status} By`}</h5>
              <p>
                {itemDetail.adminDetail
                  ? `${itemDetail.adminDetail.user.firstName} ${itemDetail.adminDetail.user.lastName}`
                  : "N/A"}
              </p>

              <h5 className="pt-4">{`${itemDetail.status} On`}</h5>
              <p>{formatDate(itemDetail.monitoredOn)}</p>
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

export default connect(null, mapDispatchToProps)(PartnerPropertyDetailModal);
