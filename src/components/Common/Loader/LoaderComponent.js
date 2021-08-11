import React from "react"
import Loader from "react-loader-spinner"

const LoaderComponent = () => {
  return (
    <div
      style={{
        display: " flex",
        textAlign: "center",
        justifyContent: "center",
        marginTop: "15%",
      }}
    >
      <Loader type="ThreeDots" color="#495057" height={80} width={80} />
    </div>
  )
}

export default LoaderComponent
