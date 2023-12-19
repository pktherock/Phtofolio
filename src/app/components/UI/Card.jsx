import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { CameraIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

function Card({ imgUrl, imageTitle, handleEdit, handleDelete, albumId }) {
  const navigate = useNavigate();

  return (
    <div
      className="relative group max-w-xs rounded-lg overflow-hidden shadow-xl bg-yellow-600 hover:bg-yellow-300 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        !imgUrl && navigate(albumId, { state: { albumName: imageTitle } });
      }}
    >
      {imgUrl ? (
        <img className="w-full p-2 h-64" src={imgUrl} alt="Gallery Image" />
      ) : (
        <CameraIcon className="w-full p-2 h-64" />
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
  albumId: PropTypes.string.isRequired,
};

export default Card;
