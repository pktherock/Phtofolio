import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

import { AlbumProvider } from "./AlbumContext";
import { albumService, alertService } from "../../../services";
import { ClipLoader, ClockLoader, RingLoader } from "react-spinners";

function AlbumContextProvider({ children }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const addAlbum = async (albumName) => {
    setLoading(true);
    try {
      const album = await albumService.addAlbum(albumName);
      setAlbums([album, ...albums]);
      alertService.success("Album added successfully!");
    } catch (error) {
      console.log("Error in addAlbum function..", error);
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  const updateAlbum = async (id, albumName) => {
    setLoading(true);
    try {
      await albumService.updateAlbum(id, albumName);
      setAlbums((albums) =>
        albums.map((album) =>
          album.id === id ? { ...album, albumName } : album
        )
      );
      alertService.success("Album updated successfully!");
    } catch (error) {
      console.log("Error in updateAlbum function..", error);
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  const deleteAlbum = async (id) => {
    setLoading(true);
    try {
      await albumService.deleteAlbum(id);
      setAlbums((albums) => albums.filter((album) => album.id !== id));
      alertService.success("Album deleted successfully!");
    } catch (error) {
      console.log("Error in deleteAlbum function..", error);
      alertService.error(error.code);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    let unsubscribe;
    async function fetchAlbums() {
      try {
        const albumsRef = await albumService.getAllAlbums();
        unsubscribe = onSnapshot(albumsRef, (snapShot) => {
          const albums = snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(albums);
          setAlbums(albums);
        });
      } catch (error) {
        console.log(error);
        alertService.error("Error while fetching albums from database!");
      } finally {
        setLoading(false);
      }
    }
    fetchAlbums();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <AlbumProvider value={{ albums, addAlbum, updateAlbum, deleteAlbum }}>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-20">
          <RingLoader
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
      {children}
    </AlbumProvider>
  );
}

AlbumContextProvider.propTypes = {
  children: PropTypes.any,
};

export default AlbumContextProvider;
