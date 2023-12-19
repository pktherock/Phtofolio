import PropTypes from "prop-types";
import ReactImageGallery from "react-image-gallery";

import { XMarkIcon } from "@heroicons/react/24/solid";

function FullScreenCarousel({ images, handleClose, startIndex }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-90 flex justify-center items-center">
      <XMarkIcon
        className="absolute top-4 right-4 text-white cursor-pointer h-12 w-12 hover:text-gray-300"
        onClick={handleClose}
      />
      <ReactImageGallery
        items={images}
        startIndex={startIndex}
        showThumbnails={true}
      />
    </div>
  );
}

FullScreenCarousel.propTypes = {
  images: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  startIndex: PropTypes.number,
};

export default FullScreenCarousel;
