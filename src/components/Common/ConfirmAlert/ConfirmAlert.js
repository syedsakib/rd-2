import React from "react"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import "./confirmAlert.scss"

const showConfirmAlert = ({ title, desc, handler, yesBtnText, noBtnText }) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-confirm-ui">
          <h1 className="c-title">{title}</h1>
          <div className="confirm-body">
            <p>{desc}</p>
          </div>
          <div className="c-btn-wrapper">
            <button
              className="table-status-btn  btn btn-danger"
              onClick={() => {
                handler(2)
                onClose()
              }}
            >
              {noBtnText || "No"}
            </button>
            <button
              onClick={() => {
                handler(1)
                onClose()
              }}
              className="table-status-btn btn-view-status btn btn-secondary"
            >
              {yesBtnText || "Yes, Delete it!"}
            </button>
          </div>
        </div>
      )
    },
  })
}

export default showConfirmAlert
