import { Component } from '@angular/core';
import { ApiService } from './api/api.service';
import { SongResponse } from './song/song.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private api: ApiService) {}

  ngAfterViewInit(): void {
    const artist = "Shakira";
    const media = "musicVideo"; // Or movie
    this.api.searchSongs(artist, media).subscribe(
      (data: SongResponse) => {

        console.log("Data", data);
        console.log("Data", data.results[0]);
      },
      error => {}
    );
  }
}
