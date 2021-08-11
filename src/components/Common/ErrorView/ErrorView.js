import React from "react"
import "./errorView.scss"

const ErrorView = ({ message }) => {
  return (
    <div className="form-error-wrapper">
      <span className="form-error-text">{message}</span>
    </div>
  )
}

export default ErrorView
