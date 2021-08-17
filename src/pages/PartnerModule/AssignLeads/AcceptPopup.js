import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { acceptAssignedLead } from "../../../store/Actions/adviserAction";

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      redirect: false,
      dataChange: false,
      loader: false,
    };
  }

  toggle = () => {
    this.props.close();
  };

  acceptLead = async () => {
    this.setState({
      loader: true,
    });
    await this.props.dispatch(
      acceptAssignedLead("Open", this.props.assignLeadId, this.props.leadId)
    );
    this.setState({
      loader: false,
    });
    this.props.close(true);
  };

  rejectLead = async () => {
    this.setState({
      loader: true,
    });
    await this.props.dispatch(
      acceptAssignedLead("Rejected", this.props.assignLeadId, this.props.leadId)
    );
    this.setState({
      loader: false,
    });
    this.props.close(true);
  };

  render() {
    return (
      <div>
        {this.state.loader ? (
          <div className="user-db-loader">
            <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
          </div>
        ) : null}
        <Modal
          isOpen={this.props.show}
          toggle={this.toggle}
          className={this.props.className}
          className="login-popup assigned-popup availability-cus"
        >
          <ModalHeader toggle={this.toggle}>
            {this.props.openFor == "Accept" ? (
              <div className="center">Accept</div>
            ) : (
              <div className="center">Reject</div>
            )}
          </ModalHeader>
          <ModalBody>
            {this.props.openFor == "Accept" ? (
              <div className="modal-body-msg-wrapper">
                <p className="modal-body-msg">
                  Do you <span className="highlight-text">accept</span> this
                  Lead information following the agreement with BoomersHub?
                </p>
              </div>
            ) : (
              <div className="modal-body-msg-wrapper">
                <p className="modal-body-msg">
                  Do you <span className="highlight-text">reject</span> this
                  Lead information following the agreement with BoomersHub?
                </p>
              </div>
            )}
            {this.props.openFor == "Accept" ? (
              <button className="common-btn mr-3" onClick={this.acceptLead}>
                Accept
              </button>
            ) : (
              <button className="common-btn mr-3" onClick={this.rejectLead}>
                Reject
              </button>
            )}
            <button className="common-btn" onClick={this.props.close}>
              Cancel
            </button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { products: state.products, cart: state.cart };
};
export default connect(mapStateToProps)(Primary);
