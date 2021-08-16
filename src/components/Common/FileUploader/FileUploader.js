import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { toBase64 } from "../../../store/utils/util";
import FileItem from "./FileItem";
import "./fileuploader.scss";

const FileUploader = ({ initialList, onAdd, onDelete }) => {
  const fileUploadField = useRef();
  const [fileList, updateFileList] = useState({ list: [], count: 0 });
  const { list, count } = fileList;
  useEffect(() => {
    if (initialList) {
      let iList = initialList || [];
      updateFileList({
        list: iList,
        count: iList.length,
      });
    }
  }, [initialList]);

  const addImage = async (file) => {
    try {
      let baseString = await toBase64(file);
      let id = count + 1;
      list.push({
        url: baseString,
        id,
        isUploading: true,
      });
      updateFileList({
        list: list,
        count: list.length,
      });

      // upload photo
      let result = await onAdd({ uploadFor: "photos" }, file);

      if (result) {
        let newList = [...list];
        let item = newList.filter((f) => f.id === id);
        if (item[0]) {
          item[0].isUploading = false;
          item[0].id = result.photoId + Date.now();
          updateFileList({
            list: newList,
            count: newList.length,
          });
        }
      } else {
        let newList = list.filter((f) => f.id !== id);
        updateFileList({
          list: newList,
          count: newList.length,
        });
        console.log(`Delete the file`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fileRemoveHandler = async (item) => {
    try {
      let newList = list.filter((l) => l.id !== item.id);
      let result = await onDelete(item.id);
      if (result) {
        updateFileList({
          list: newList,
          count: newList.length,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="custom-file-uploader">
      <input
        type="file"
        className="hidden-input"
        ref={fileUploadField}
        onChange={() => {
          let file = fileUploadField.current.files[0];
          addImage(file);
        }}
      />
      <div className="file-item-list-wrapper">
        {list &&
          list.map((item) => {
            return (
              <FileItem
                item={item}
                key={`f-${item.id}`}
                onFileRemove={fileRemoveHandler}
              />
            );
          })}
        <div className="file-item-wrapper file-item-uploader">
          <div
            className="file-item"
            onClick={() => {
              fileUploadField.current.click();
            }}
          >
            <span className="btn-text">+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(FileUploader);
