import React from "react";
import ImageLoader from "../../../../../../components/Common/AnimatedImageLoader/ImageLoader";
import { Draggable } from "react-beautiful-dnd";
import { getPhotoUrl } from "../../../../../../store/utils/util";

const ImageBox = React.memo(
  ({ item, onDelete, index, openModal }) => {
    return (
      <Draggable draggableId={`"draggable-${index}"`} index={index}>
        {(provided, snapshot) => (
          <div
            className="img-box-wrapper"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className="img-box"
              onClick={(e) => {
                e.preventDefault();
                window.open(getPhotoUrl(item.image_url));
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
              <div
                className="info-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal(item);
                  return false;
                }}
              >
                <i className="fa fa-info"></i>
              </div>
              <ImageLoader
                src={getPhotoUrl(item.image_url)}
                alt="photo"
                className="p-image"
              />
            </div>
          </div>
        )}
      </Draggable>
    );
  },
  () => {
    return false;
  }
);

export default ImageBox;
