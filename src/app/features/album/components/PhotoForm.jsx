import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { XCircleIcon } from "@heroicons/react/24/solid";
import { albumService, alertService } from "../../../services";
import { HashLoader } from "react-spinners";

function PhotoForm({ imageInfo, setImageInfo, albumId }) {
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!(title.trim() && imgUrl.trim())) {
      alertService.warn("title and imageUrl is required!");
      return;
    }
    try {
      if (imageInfo) {
        // update
        await albumService.updatePhoto(albumId, imageInfo.id, title, imgUrl);
        setImageInfo(null);
        alertService.success("Photo updated successfully!");
      } else {
        // add photo
        const data = {
          title,
          imgUrl,
          albumId,
        };
        await albumService.addPhoto(data);
        alertService.success("Photo added successfully!");
      }
    } catch (error) {
      console.log(error);
      alertService.error(error.code);
    } finally {
      setLoading(false);
      setTitle("");
      setImgUrl("");
    }
  };

  useEffect(() => {
    if (imageInfo) {
      setTitle(imageInfo.title);
      setImgUrl(imageInfo.imgUrl);
    }
  }, [imageInfo]);

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-20">
          <HashLoader
            loading={loading}
            cssOverride={{
              display: "block",
              margin: "0 auto",
            }}
            color="teal"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <form
        className="flex flex-col justify-center items-center bg-gray-200 shadow-lg p-5 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="relative w-2/3 items-center my-3">
          <input
            className="flex h-12 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-lg placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 pr-12"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {title && (
            <button
              type="button"
              onClick={() => setTitle("")}
              className="absolute top-1/2 transform -translate-y-1/2 right-0 mt-0.4 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none h-10 w-10"
            >
              <XCircleIcon />
            </button>
          )}
        </div>
        <div className="relative w-2/3 items-center my-4">
          <input
            className="flex h-12 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-lg placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 pr-12"
            type="url"
            placeholder="Image Url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            required
          />
          {imgUrl && (
            <button
              type="button"
              onClick={() => setImgUrl("")}
              className="absolute top-1/2 transform -translate-y-1/2 right-0 mt-0.4 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none h-10 w-10"
            >
              <XCircleIcon />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="rounded-md bg-black ml-2 px-5 py-3 text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          {imageInfo ? "Update Photo" : "Add Photo"}
        </button>
      </form>
    </>
  );
}

PhotoForm.propTypes = {
  albumId: PropTypes.string.isRequired,
  imageInfo: PropTypes.object,
  setImageInfo: PropTypes.func,
};
export default PhotoForm;
