import { Component } from '@angular/core';
import { Posts } from '../model';
import { AlbumsService, } from '../albums.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  imports: [RouterModule, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  posts: Posts[] = [];

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }
}
