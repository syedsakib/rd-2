import React, { useRef, useState } from "react";

const MultiFileUploader = ({ onChangeHandler }) => {
  const companyPhotoUploader = useRef();
  const [photoCount, updatePhotoCount] = useState(0);
  return (
    <div className="file-btn-wrapper">
      <span className="btn btn-default btn-file">
        {`${photoCount} file selected`}
        <input
          multiple
          ref={companyPhotoUploader}
          type="file"
          accept="image/*"
          onChange={() => {
            let fileList = companyPhotoUploader.current.files;
            let totalFIle = fileList.length;
            updatePhotoCount(totalFIle);
            onChangeHandler(fileList);
          }}
        />
      </span>
    </div>
  );
};

export default MultiFileUploader;
