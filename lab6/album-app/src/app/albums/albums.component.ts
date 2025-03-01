import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../albums.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Album } from '../model';

@Component({
  selector: 'app-albums',
  imports: [CommonModule, RouterModule],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];

  constructor(private albumsService: AlbumsService, private router: Router) {}

  ngOnInit(): void {
    this.albumsService.getAlbums().subscribe(data => {
      this.albums = data;
    });
  }

  deleteAlbum(id: number): void {
    this.albumsService.deleteAlbum(id).subscribe(() => {
      this.albums = this.albums.filter(album => album.id !== id);
    });
  }

  openAlbum(id: number): void {
    this.router.navigate(['/albums', id]);
  }
}