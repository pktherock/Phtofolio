import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

import { db } from "../../config";

class AlbumService {
  getAllAlbums = async () => {
    return collection(db, "albums");
  };

  getAllPhotos = async (albumId) => {
    return collection(db, "albums", albumId, "photos");
  };

  addAlbum = async (albumName) => {
    const album = {
      albumName,
      createdAt: new Date().toISOString(),
    };
    // add doc to the firestore and return album with docId
    const docRef = await addDoc(collection(db, "albums"), album);
    album.id = docRef.id;
    return album;
  };

  updateAlbum = async (id, albumName) => {
    return await updateDoc(doc(db, "albums", id), { albumName });
  };

  deleteAlbum = async (id) => {
    return await deleteDoc(doc(db, "albums", id));
  };
}

const albumService = new AlbumService();

export default albumService;
