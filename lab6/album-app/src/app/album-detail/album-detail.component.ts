import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlbumsService } from '../albums.service';
import { Album } from '../model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-album-detail',
  imports: [RouterModule, FormsModule],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album !: Album; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    const albumId = Number(this.route.snapshot.paramMap.get('id'));

    if (albumId) {
      this.albumsService.getAlbum(albumId).subscribe((data: Album) => {
        this.album = data;
      });
    }
  }

  saveChanges(): void {
    this.albumsService.updateAlbum(this.album).subscribe(() => {
      alert('Album updated successfully!');
    });
  }

  goBack(): void {
    this.router.navigate(['/albums']);
  }
}
