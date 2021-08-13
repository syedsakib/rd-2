import React from "react";
import ImageLoader from "components/Common/ImageLoader/ImageLoader";

const ImageBox = React.memo(
  ({ item, onDelete }) => {
    return (
      <div className="img-box-wrapper">
        <div
          className="img-box"
          onClick={(e) => {
            e.preventDefault();
            window.open(item.url);
          }}
        >
          <div
            className="close-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(item);
              return false;
            }}
          >
            <i className="fa fa-times"></i>
          </div>
          <ImageLoader src={item.url} alt="photo" className="p-image" />
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    console.log(`PrevProps`, prevProps);
    console.log(`Next Props`, nextProps);
    if (prevProps.id != nextProps.id) {
      return false;
    }
    return false;
  }
);

export default ImageBox;
