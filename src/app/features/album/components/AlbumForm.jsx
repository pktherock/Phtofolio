import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { XCircleIcon } from "@heroicons/react/24/solid";
import useAlbum from "../contexts/AlbumContext";

function AlbumForm({ album, setAlbum }) {
  const [albumName, setAlbumName] = useState("");

  const { addAlbum, updateAlbum } = useAlbum();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (album) {
      // update
      updateAlbum(album.id, albumName.trim());
      setAlbumName("");
      setAlbum(null);
      return;
    }

    // create
    addAlbum(albumName.trim());
    setAlbumName("");
  };

  useEffect(() => {
    if (album) {
      setAlbumName(album.albumName);
    }
  }, [album]);

  return (
    <form className="flex justify-center bg-gray-200 shadow-lg p-5 rounded-md" onSubmit={handleSubmit}>
      <div className="relative flex w-2/3 items-center">
        <input
          className="flex h-12 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-lg placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Album name"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          required
        />
        {albumName && (
          <button
            type="button"
            onClick={() => setAlbumName("")}
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
        {album ? "Update Album" : "Add Album"}
      </button>
    </form>
  );
}

AlbumForm.propTypes = {
  album: PropTypes.object,
  setAlbum: PropTypes.func,
};

export default AlbumForm;
