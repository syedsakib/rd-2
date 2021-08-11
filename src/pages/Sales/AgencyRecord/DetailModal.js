import React, { Fragment, useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import RecordItem from "./RecordItem"
import { connect } from "react-redux"
import { toastr } from "react-redux-toastr"

import { getSaleRecordComparisonData } from "../../../store/Actions/adminAction"

const DetailViewModal = ({
  openModal,
  hideModal,
  getSaleRecordComparisonData,
  recordId,
}) => {
  const [appState, updateAppState] = useState({
    isLoading: true,
  })
  const [recordData, updateRecordData] = useState({
    sales: null,
    agency: null,
  })

  const { sales, agency } = recordData
  const { isLoading } = appState

  useEffect(() => {
    if (recordId) {
      getRecordData(recordId)
    }
  }, [recordId])

  const getRecordData = async recordId => {
    try {
      const result = await getSaleRecordComparisonData(recordId)
      console.log(result)
      if (result) {
        updateRecordData({
          sales: result.saleRecord,
          agency: result.agencyRecord,
        })
      }
      updateAppState({
        ...appState,
        isLoading: false,
      })
    } catch (e) {
      console.log(e)
      toastr.error("Error", e.toString())
    }
  }

  return (
    <div>
      <Modal
        isOpen={openModal}
        toggle={hideModal}
        className="modal-survey modal-lg"
      >
        <ModalHeader toggle={hideModal}>
          <div className="modal-title" style={{ textAlign: "center" }}>
            Agency Data View
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="sale-record-modal-body-wrapper">
            {!isLoading ? (
              <Fragment>
                {sales && agency ? (
                  <div className="sale-record-inner-body">
                    <RecordItem title="Original Record" record={agency} />
                    <RecordItem title="Sales Record" record={sales} />
                  </div>
                ) : (
                  <div className="default-text-wrapper mx-auto">
                    <h3
                      className="default-text"
                      style={{ textAlign: "center" }}
                    >
                      No Record found
                    </h3>
                  </div>
                )}
              </Fragment>
            ) : (
              <div className="default-text-wrapper">
                <h3 className="default-text" style={{ textAlign: "center" }}>
                  Fetching Data...
                </h3>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

const mapDispatchToProps = {
  getSaleRecordComparisonData,
}

export default connect(null, mapDispatchToProps)(DetailViewModal)
