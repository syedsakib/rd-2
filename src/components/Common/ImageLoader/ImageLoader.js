import React from "react"
import Loader from "react-loader-spinner"
import ImageLoader from "react-image"

//import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { getDefaultHomeImage } from "../../../store/utils/util"

const Image = ({ src, alt, lheight, lWidth, ...rest }) => (
  <ImageLoader
    src={[src, getDefaultHomeImage()]}
    alt={alt}
    {...rest}
    loader={
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
          height={lheight || 80}
          width={lWidth || 80}
          timeOut={10 * 1000}
          style={{
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </div>
    }
    unloader={<div>No Image</div>}
  />
)
/*
const Image = ({ src, alt, ...rest }) => {
  return <LazyLoadImage alt={alt} src={src} {...rest} />;
};*/

export default Image
