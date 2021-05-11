import { Component, Input, OnInit, VERSION } from "@angular/core";
import { SongModel } from "./song.model";

@Component({
  selector: "app-song",
  templateUrl: "./song.component.html",
  styleUrls: ["./song.component.scss"]
})
export class SongComponent implements OnInit {
  @Input() currentSong: SongModel;
  @Input() idTrack: number;
  @Input() timer: number;
  
  constructor() {}

  ngOnInit(): void {}

}
