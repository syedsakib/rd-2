import React, { useEffect, useRef, useState } from "react";
import ImageLoader from "../ImageLoader/ImageLoader";
import { toBase64 } from "../../../store/utils/util";

const SingleFileUploader = React.memo(
  ({ initialLogo, onChangeHandler }) => {
    const companyLogoUploader = useRef();
    const [fileLogo, updateFileLogo] = useState();
    useEffect(() => {
      if (initialLogo) {
        updateFileLogo(initialLogo);
      }
    }, [initialLogo]);
    return (
      <div className="logo-field-wrapper">
        <input
          type="file"
          className="hidden-input"
          ref={companyLogoUploader}
          onChange={async () => {
            let file = companyLogoUploader.current.files[0];
            let baseString = await toBase64(file);
            updateFileLogo(baseString);
            onChangeHandler(file, baseString);
          }}
        />
        <div
          className="logo-field-inner-wrapper"
          onClick={() => {
            companyLogoUploader.current.click();
          }}
        >
          <ImageLoader
            src={fileLogo}
            className="c-logo"
            lWidth={40}
            lheight={40}
          />
        </div>
      </div>
    );
  },
  (prevProps, newProps) => {
    if (prevProps.initialLogo !== newProps.initialLogo) {
      return false;
    }
    return true;
  }
);

export default SingleFileUploader;
