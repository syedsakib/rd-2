import React, { useEffect } from "react";
import ImageLoader from "../ImageLoader/ImageLoader";
import Loader from "react-loader-spinner";

const FileItem = React.memo(
  ({ item, onFileRemove, onFileAdd }) => {
    const removeHandler = () => {
      onFileRemove(item);
    };
    return (
      <div className="file-item-wrapper">
        <div className="file-item">
          {!item.isUploading && (
            <div className="delete-file-btn-wrapper" onClick={removeHandler}>
              <span className="delete-file-btn">
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            </div>
          )}
          {item.isUploading ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="loader-class-img"
            >
              <Loader
                type="ThreeDots"
                color="#F96472"
                height={40}
                width={40}
                timeOut={10 * 1000}
                style={{
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </div>
          ) : (
            <ImageLoader
              src={item.url}
              alt="img"
              className="file-logo"
              lheight={40}
              lWidth={40}
            />
          )}
        </div>
      </div>
    );
  },
  (prevState, newState) => {
    console.log(prevState);
    console.log(newState);
    if (prevState.item.id !== newState.item.id) {
      return false;
    }
    return true;
  }
);

export default FileItem;
