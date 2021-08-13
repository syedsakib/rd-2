import React, { Fragment, useRef } from "react";
import { connect } from "react-redux";
import { updatePropertyDetail } from "../../../../../store/Actions/scrapeAction";
import { toastr } from "react-redux-toastr";
import ImageBox from "./imageBox";
import "./imageEditor.scss";
import { toBase64, generateRandomId } from "../../../../../store/utils/util";

const ImageEditor = ({ property, onChangeHandler }) => {
  const fileUploadField = useRef();

  const removeImageHandler = (imageItem) => {
    let imgList = property.imageList;
    imgList = imgList.filter((item) => item.id != imageItem.id);
    onChangeHandler(imgList);
  };

  const addImage = async (fileList) => {
    try {
      let imgList = property.imageList;
      let imgCount = imgList.length;
      let limit = 1024 * 1024 * 2;
      let counter = 0;
      for (let file of fileList) {
        counter++;
        if (imgCount + counter > 10) {
          throw "Max 10 Images is allowed";
        }
        let fileSize = file.size;
        if (fileSize > limit) {
          throw "File size can't be more than 2MB";
        }
        let baseString = await toBase64(file);
        let id = generateRandomId();
        imgList.push({
          id,
          url: baseString,
          file,
        });
      }
      onChangeHandler(imgList);
    } catch (e) {
      console.log(e);
      toastr.error("Error", e.toString());
    }
  };

  return (
    <React.Fragment>
      <div className="p-image-editor-wrapper">
        <div className="file-uploader-box">
          <input
            type="file"
            className="hidden-input d-none"
            accept="image/*"
            ref={fileUploadField}
            multiple={true}
            onChange={() => {
              let fileList = fileUploadField.current.files;
              if (fileList && fileList.length > 0) {
                addImage(fileList);
              }
            }}
          />
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
        <Fragment>
          <div className="p-image-editor-inner-wrapper">
            <div className="property-image-list">
              {property &&
                property.imageList &&
                property.imageList.map((item, index) => {
                  return (
                    <ImageBox
                      key={`pImages-${index}`}
                      item={item}
                      onDelete={removeImageHandler}
                    />
                  );
                })}
            </div>
          </div>
        </Fragment>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
});

const mapDispatchToProps = { updatePropertyDetail };

export default connect(mapStateToProps, mapDispatchToProps)(ImageEditor);
