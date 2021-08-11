import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import ImageLoader from "../ImageLoader/ImageLoader"

const CarouselSlider = React.memo(
  ({ imageList, state, name, sliceCount }) => {
    return (
      <Carousel showThumbs={false} infiniteLoop={true}>
        {imageList.slice(0, sliceCount || 5).map((imageSrc, imageItemIndex) => {
          return (
            <div key={`img-${imageItemIndex}`}>
              <ImageLoader src={imageSrc} alt={name} />
            </div>
          )
        })}
      </Carousel>
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.imageList.length !== nextProps.imageList.length) {
      return false
    } else if (prevProps.id !== nextProps.id) {
      return false
    }
    return true
  }
)

export default CarouselSlider
