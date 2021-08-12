import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  updatePropertyDetail,
  getPropertyPhotos,
} from "../../../../../../store/Actions/scrapeAction";
import { toastr } from "react-redux-toastr";
import LoaderComponent from "components/Common/Loader/LoaderComponent";
import ImageBox from "./imageBox";
import "./imageEditor.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ImageInfoModal from "./imageInfoModal";

const ImageEditor = ({ property, updatePropertyDetail, getPropertyPhotos }) => {
  const [selectedData, updateSelectedList] = useState({
    rows: [],
    count: 0,
  });
  const [isLoading, toggleLoader] = useState(false);
  const [modalState, updateModalState] = useState(null);
  const { rows, count } = selectedData;

  useEffect(() => {
    if (property && property.isImageScraped === 1) {
      getPhotoList(property.boom_hash);
    }
  }, [property]);

  const getPhotoList = async (id) => {
    try {
      let result = await getPropertyPhotos(id);
      console.log(`Photo List`, result);
      if (result) {
        const { rows, count } = result;
        // add those
        updateSelectedList({
          rows,
          count,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeImageHandler = (sItem) => {
    const newList = rows.filter((item) => item.id !== sItem.id);
    updateSelectedList({
      rows: newList,
      count: newList.length,
    });
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!property) {
        throw "No property data found";
      }
      toggleLoader(true);
      let selectedList = rows.map((item) => item.id);
      let result = await updatePropertyDetail(property.boom_hash, "image", {
        imageList: selectedList,
      });
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
      toastr.error("Error", e.toString());
    }
  };

  const onDragEnd = (props) => {
    try {
      // the only one that is required
      if (props.source && props.destination) {
        let sourceIndex = props.source.index;
        let destIndex = props.destination.index;
        // console.log(`Source Index`, sourceIndex);
        // console.log(`Dest Index`, destIndex);
        let newList = rows;
        // console.log(`Prev List`, newList);
        newList.splice(destIndex, 0, newList.splice(sourceIndex, 1)[0]);
        // console.log(`New List`, newList);
        updateSelectedList({
          rows: newList,
          count: newList.length,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const openInfoModal = (data) => {
    console.log(`Entered`);
    updateModalState({
      isOpen: true,
      itemData: data,
    });
  };

  const closeInfoModal = (data) => {
    updateModalState(null);
  };

  const refreshDataHandler = (sItem, data) => {
    try {
      let newList = rows.map((item) => {
        if (sItem.id === item.id) {
          item.alt_attribute = data.altText;
        }
        return item;
      });
      updateSelectedList({ rows: newList, count: newList.length });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        <h5 style={{ color: "red" }}>
          Note: You need to update to save changes
        </h5>
      </div>
      {rows && rows.length > 0 ? (
        <div className="p-image-editor-wrapper">
          <div className="p-image-editor-inner-wrapper">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable-1" type="CARD">
                {(provided, snapshot) => (
                  <div
                    className="property-image-list"
                    ref={provided.innerRef}
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? "#f9fafa"
                        : "white",
                    }}
                    {...provided.droppableProps}
                  >
                    {rows.map((item, index) => {
                      return (
                        <ImageBox
                          key={`pImages-${index}`}
                          item={item}
                          onDelete={removeImageHandler}
                          index={index}
                          openModal={openInfoModal}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="row mt-4">
              <div className="col-sm-12">
                <div className="form-footer text-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    onClick={onFormSubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="default-text-wrapper">
          <h3 className="default-text">No Image Found</h3>
        </div>
      )}
      {modalState && modalState.isOpen && (
        <ImageInfoModal
          openModal={modalState.isOpen}
          hideModal={closeInfoModal}
          item={modalState.itemData}
          callBack={refreshDataHandler}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
});

const mapDispatchToProps = { updatePropertyDetail, getPropertyPhotos };

export default connect(mapStateToProps, mapDispatchToProps)(ImageEditor);
