import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { albumService, alertService } from "../../../services";
import { onSnapshot } from "firebase/firestore";
import { HashLoader } from "react-spinners";
import PhotoForm from "./PhotoForm";
import { Card } from "../../../components";
import { Container } from "../../../components";

import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

function Album() {
  const { albumId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { albumName } = state;

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [showImgForm, setShowImgForm] = useState(false);

  const handleEdit = (photo) => {
    if (photo) {
      setPhoto(photo);
      setShowImgForm(true);
    }
  };

  const handleDelete = async (id) => {
    const isConfirm = confirm("Are you sure? want to delete");
    if (!isConfirm) return;
    try {
      setLoading(true);
      await albumService.deletePhoto(albumId, id);
      alertService.success("Photo deleted successfully!");
    } catch (error) {
      console.log(error);
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    let unsubscribe;
    async function fetchAllAlbumPhotos() {
      try {
        const albumRef = await albumService.getAllPhotos(albumId);
        unsubscribe = onSnapshot(albumRef, (snapShot) => {
          const photos = snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(photos);
          setPhotos(photos);
        });
      } catch (error) {
        console.log(error);
        alertService.error("Error while fetching album photos!");
        alertService.error(error.code);
      } finally {
        setLoading(false);
      }
    }

    fetchAllAlbumPhotos();

    return () => {
      unsubscribe && unsubscribe();
      console.log("Album unsubscribe successfully.");
    };
  }, [albumId]);

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

      <Container>
        {showImgForm && (
          <PhotoForm
            imageInfo={photo}
            setImageInfo={setPhoto}
            albumId={albumId}
          />
        )}
        <div className="flex justify-between my-7">
          <ArrowUturnLeftIcon
            onClick={() => navigate(-1)}
            className="h-12 w-12 p-3 font-bold bg-white border rounded-full shadow-xl hover:shadow-md hover:bg-gray-400"
          />
          <p className="text-3xl font-bold">
            Images in <span className="text-blue-600">{albumName}</span> Album
          </p>
          <button
            type="button"
            className="rounded-md bg-yellow-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            onClick={() => {
              setShowImgForm(!showImgForm);
              setPhoto(null);
            }}
          >
            {showImgForm ? "Cancel" : "Add Photo"}
          </button>
        </div>

        {photos.length === 0 && (
          <h1 className="text-3xl font-semibold">
            No Image found in the album
          </h1>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Card
              key={photo.id}
              albumId={photo.id}
              imageTitle={photo.title}
              imgUrl={photo.imgUrl}
              handleEdit={(e) => {
                e.stopPropagation();
                handleEdit(photo);
              }}
              handleDelete={(e) => {
                e.stopPropagation();
                handleDelete(photo.id);
              }}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Album;
