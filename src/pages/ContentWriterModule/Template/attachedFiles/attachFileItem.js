import React from "react";
import CustomButton from "components/Common/Button/Button";

const AttachFileItem = ({
  fileItem: { fileName, fileUrl, fileKey },
  onRemove,
}) => {
  return (
    <div className="attach-file-item-wrapper">
      <div className="attach-file-item-inner-wrapper">
        <div className="file-title-wrapper">
          <h3
            className="file-title"
            onClick={() => {
              window.open(fileUrl);
            }}
          >
            {fileName}
          </h3>
        </div>
        <div className="file-action-wrapper">
          <CustomButton
            onClick={() => {
              onRemove(fileKey);
            }}
            toolTip="Remove"
            icon={"times"}
            btnClass="danger"
          />
        </div>
      </div>
    </div>
  );
};

export default AttachFileItem;
