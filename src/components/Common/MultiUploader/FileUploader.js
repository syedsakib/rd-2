import React, { useState } from "react"
import ImageUploader from "react-images-upload"
import "react-dropzone-uploader/dist/styles.css"
import Dropzone from "react-dropzone-uploader"
import "./fileUploader.scss"
const FileUploader = ({ onSubmit, onRemove, initialFiles }) => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = (data, status) => {
    console.log(status, data.meta, data.file)
    if (status === "done") {
      console.log(data)
      onSubmit([data])
    } else if (status === "removed") {
      //onRemove();
    }
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = files => {
    console.log(files.map(f => f.meta))
    onSubmit(files)
  }
  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*,application/*"
      initialFiles={initialFiles || []}
      canCancel={false}
      canRemove={false}
    />
  )
}

export default FileUploader
