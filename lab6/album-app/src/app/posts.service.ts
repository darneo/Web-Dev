import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from './model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.apiUrl);
  }
}
