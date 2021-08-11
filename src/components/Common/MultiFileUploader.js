import React, { useRef, useState } from "react"

const MultiFileUploader = ({ onChangeHandler }) => {
  const companyPhotoUploader = useRef()
  const [photoCount, updatePhotoCount] = useState(0)
  return (
    // <div className="file-btn-wrapper">
    //   <span className="btn btn-default btn-file">
    //     {`${photoCount} file selected`}
    //     <input
    //       multiple
    //       ref={companyPhotoUploader}
    //       type="file"
    //       accept="image/*"
    //       onChange={() => {
    //         let fileList = companyPhotoUploader.current.files
    //         let totalFIle = fileList.length
    //         updatePhotoCount(totalFIle)
    //         onChangeHandler(fileList)
    //       }}
    //     />
    //   </span>
    // </div>
    <div className="input-group mb-3">
      <label className="input-group-text px-5 py-4" for="File01">
        {`${photoCount} file selected`}
      </label>
      <input
        type="file"
        ref={companyPhotoUploader}
        multiple
        accept="image/*"
        onChange={() => {
          let fileList = companyPhotoUploader.current.files
          let totalFIle = fileList.length
          updatePhotoCount(totalFIle)
          onChangeHandler(fileList)
        }}
        className="form-control"
        id="File01"
      />
    </div>
  )
}

export default MultiFileUploader
