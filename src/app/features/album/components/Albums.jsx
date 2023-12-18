import { useState } from "react";

import { Card, Container } from "../../../components";
import AlbumForm from "./AlbumForm";
import useAlbum from "../contexts/AlbumContext";
import { alertService } from "../../../services";

function Albums() {
  const [showForm, setShowForm] = useState(false);
  const [album, setAlbum] = useState(null);

  const { albums, deleteAlbum } = useAlbum();

  const handleEdit = (album) => {
    setAlbum(album);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (id === album?.id) {
      return alertService.warn(
        "You can not Update and delete at once, please update first!"
      );
    }
    const isConfirm = confirm("Are you sure? want to delete?");
    if (!isConfirm) return;
    deleteAlbum(id);
  };

  return (
    <Container>
      {showForm && <AlbumForm album={album} setAlbum={setAlbum} />}
      <div className="flex justify-between my-7">
        <p className="text-3xl font-bold">Albums</p>
        <button
          type="button"
          className="rounded-md bg-yellow-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          onClick={() => {
            setShowForm(!showForm);
            setAlbum(null);
          }}
        >
          {showForm ? "Cancel" : "Create Album"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums.map((album) => (
          <Card
            key={album.id}
            imageTitle={album.albumName}
            handleEdit={() => handleEdit(album)}
            handleDelete={() => handleDelete(album.id)}
          />
        ))}
      </div>
    </Container>
  );
}

export default Albums;
