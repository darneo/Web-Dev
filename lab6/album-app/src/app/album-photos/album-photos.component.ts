import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AlbumsService } from '../albums.service';
import { Photo } from '../model';

@Component({
  selector: 'app-album-photos',
  imports: [CommonModule],
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {
  photos : Photo[] = [] 
  id !: number;
  loaded : boolean = false; 
  
  constructor(
    private route : ActivatedRoute ,
    private router: Router,
    private albumsService : AlbumsService,
    ){
  }

  ngOnInit(){
    this.route.paramMap.subscribe((params) => {
      const albumId = Number(params.get('id'));
      this.id = albumId;
      this.loaded = false; 
      this.albumsService.getAlbumPhotos(albumId).subscribe({
        next : (photos : Photo[]) => {
          this.photos = photos ;
          this.loaded = true ;  
        }
      })
    })
  }
  goBack(): void{
    this.router.navigate(['/albums',this.id]);
  }
}
