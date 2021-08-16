import React, { useState, useEffect } from "react";
import AttachFileBox from "./attachFileBox";
import FileUploader from "components/Common/MultiUploader/FileUploader";

import {
  uploadAttachFiles,
  removeAttachedFile,
  getEmailAttachedFiles,
} from "../../../../store/Actions/mailAction";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

const AttachBottomSection = ({
  uploadAttachFiles,
  removeAttachedFile,
  getEmailAttachedFiles,
  templateId,
}) => {
  const [isLoading, setLoader] = useState(false);
  const [appState, updateAppState] = useState({
    fileList: [],
  });
  const { fileList } = appState;

  useEffect(() => {
    if (templateId) {
      getFileList(templateId);
    }
  }, [templateId]);

  const getFileList = async (tempId) => {
    try {
      let result = await getEmailAttachedFiles(tempId);
      if (result) {
        updateAppState({
          ...appState,
          fileList: result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onFileUploadHandler = async (fileList) => {
    try {
      console.log(fileList);
      if (fileList.length > 0) {
        setLoader(true);
        let result = await uploadAttachFiles({ templateId }, fileList);
        if (result) {
          getFileList(templateId);
        }
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  };

  const onFileRemoveHandler = async (fileKey) => {
    try {
      setLoader(true);
      let result = await removeAttachedFile(templateId, fileKey);
      if (result) {
        let newList = fileList.filter((item) => item.fileKey !== fileKey);
        updateAppState({
          ...appState,
          fileList: newList,
        });
      }
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  };
  return (
    <div className="row">
      {isLoading ? (
        <div className="user-db-loader">
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        </div>
      ) : null}
      <div className="col-sm-12">
        <div className="form-group">
          <label htmlFor="title">Attachments</label>
          <div>
            {fileList && fileList.length > 0 ? (
              <AttachFileBox
                fileList={fileList}
                onRemove={onFileRemoveHandler}
              />
            ) : (
              <div className="default-text-wrapper">
                <h3 className="default-text">No Attached File Found</h3>
              </div>
            )}
          </div>
          <FileUploader onSubmit={onFileUploadHandler} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  uploadAttachFiles,
  removeAttachedFile,
  getEmailAttachedFiles,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttachBottomSection);
