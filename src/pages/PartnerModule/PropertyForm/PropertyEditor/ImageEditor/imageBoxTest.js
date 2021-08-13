import React from "react";
import ImageLoader from "../../../../../../components/Common/AnimatedImageLoader/ImageLoader";

const ImageBox = React.memo(
  ({ url, onDelete, index }) => {
    return (
      <div className="img-box-wrapper">
        <div
          className="img-box"
          onClick={(e) => {
            e.preventDefault();
            window.open(url);
          }}
        >
          <div
            className="close-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(url);
              return false;
            }}
          >
            <i className="fa fa-times"></i>
          </div>
          <ImageLoader src={url} alt="photo" className="p-image" />
        </div>
      </div>
    );
  },
  () => {
    return false;
  }
);

export default ImageBox;
