/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { createContext } from "react";

export const AlbumContext = createContext({
  albums: [
    {
      id: 1,
      albumName: "hello world",
      createdAt: new Date().toISOString(),
    },
  ],
  addAlbum: (albumName) => {},
  updateAlbum: (id) => {},
  deleteAlbum: (id) => {}
});

export const AlbumProvider = AlbumContext.Provider;

const useAlbum = () => useContext(AlbumContext);

export default useAlbum;
