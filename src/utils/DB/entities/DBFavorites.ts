/* eslint-disable prettier/prettier */

import { Album } from "./DBAlbum";
import { Artist } from "./DBArtist";
import { Track } from "./DBTrack";

interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface ResponseFavorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class Favorite implements Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor() {
    this.albums = [];
    this.artists = [];
    this.tracks = [];
  }

}

export default class DBFavorites {
  protected favs: Favorite = new Favorite();

  async getAll(): Promise<Favorite> {
    return this.favs;
  }

  async findTrack(id: string): Promise<boolean> {
    const idx = this.favs.tracks.findIndex((el) => el === id);
    return idx !== -1;
  }

  async addTrack(id: string): Promise<void> {
    this.favs.tracks.push(id);
  }

  async deleteTrack(id: string): Promise<void> {
    const idx = this.favs.tracks.findIndex((el) => el === id);
    if (idx === -1) return;
    this.favs.tracks.splice(idx, 1);
  }

  async findAlbum(id: string): Promise<boolean> {
    const idx = this.favs.albums.findIndex((el) => el === id);
    return idx !== -1;
  }


  async addAlbum(id: string): Promise<void> {
    this.favs.albums.push(id);
  }

  async deleteAlbum(id: string): Promise<void> {
    const idx = this.favs.albums.findIndex((el) => el === id);
    if (idx === -1) return;
    this.favs.albums.splice(idx, 1);
  }

  async findArtist(id: string): Promise<boolean> {
    const idx = this.favs.artists.findIndex((el) => el === id);
    return idx !== -1;
  }

  async addArtist(id: string): Promise<void> {
    this.favs.artists.push(id);
  }

  async deleteArtist(id: string): Promise<void> {
    const idx = this.favs.artists.findIndex((el) => el === id);
    if (idx === -1) return;
    this.favs.artists.splice(idx, 1);
  }
}
