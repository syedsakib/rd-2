import React from "react";
import "./attachFileBox.scss";
import AttachFileItem from "./attachFileItem";

const AttachFileBox = ({ fileList, onRemove }) => {
  return (
    <div className="attach-file-box-wrapper">
      {fileList.map((fileItem, index) => {
        return (
          <AttachFileItem
            fileItem={fileItem}
            key={`fI-${index}`}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
};

export default AttachFileBox;
