import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album, Photo } from './model';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/${id}`);
  }

  updateAlbum(album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.apiUrl}/${album.id}`, album);
  }

  deleteAlbum(id : number) : Observable<any>{
    return this.http.delete<Album>(`${this.apiUrl}/${id}`)
  }

  getAlbumPhotos(albumId : number) {
    return this.http.get<Photo[]>(`${this.apiUrl}/${albumId}/photos`)
  }
}
