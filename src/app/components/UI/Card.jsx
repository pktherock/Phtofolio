import PropTypes from "prop-types";
import { CameraIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

function Card({ imgUrl, imageTitle, handleEdit, handleDelete }) {
  return (
    <div className="relative group max-w-xs rounded-lg overflow-hidden shadow-xl bg-yellow-600 hover:bg-yellow-300">
      {imgUrl ? (
        <img className="w-full p-2" src={imgUrl} alt="Gallery Image" />
      ) : (
        <CameraIcon className="w-full p-2" />
      )}
      <div className="absolute flex right-0 top-0 mt-1 mr-1 opacity-0 group-hover:opacity-100 transition-opacity gap-1">
        <PencilIcon
          onClick={handleEdit}
          className="text-green-700 hover:text-green-400 w-10 h-10"
        />
        <TrashIcon
          onClick={handleDelete}
          className="text-red-700 hover:text-red-500 w-10 h-10"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{imageTitle}</div>
      </div>
    </div>
  );
}

Card.propTypes = {
  imgUrl: PropTypes.string,
  imageTitle: PropTypes.string,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Card;
