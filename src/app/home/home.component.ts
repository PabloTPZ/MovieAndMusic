import {
  Component,  
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { IonSearchbar } from "@ionic/angular";
import { ApiService } from "../api/api.service";
import { SongModel, SongResponse } from "../song/song.model";
import { catchError,map } from "rxjs/operators";
import { Subscription, throwError, timer, Observable } from "rxjs";
import { AlerMessage } from "../alert/alert.message";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnDestroy, OnInit {
  
  @ViewChild('search', { static: false}) search: IonSearchbar;
  
  soungs: SongModel[];
  mediaOption = "musicVideo";
  artisOption = "Shakira";
  serviceMultimedia: Subscription;
  serviceAlerMessage: Subscription;
  idTrack = -1;



  constructor(
    public service: ApiService, 
    public alert: AlerMessage) {}

  ngOnInit() {
    this.dataMultimedia(this.artisOption, this.mediaOption);
    this.eventClick();
  }

  ngOnDestroy() {
    this.serviceMultimedia.unsubscribe();
    this.serviceAlerMessage.unsubscribe();
  }

  dataMultimedia(artistName, mediaName) {
    this.serviceMultimedia = this.service.searchSongs(artistName, mediaName)
    .pipe(
      map((data: any) => this.modifyObject(data)),
      catchError(err => throwError(err.message)))
    .subscribe((data: SongResponse) => {
      this.soungs = data.results
      console.log("Data", data);
    },
    error => {
      this.alert.openAlert("Server error")
    });
  }

  modifyObject(data): any {
    data.results.forEach(function(data) {
      var color = Math.floor(0x1000000 * Math.random()).toString(16);
      data.color = '#' + ('000000' + color).slice(-6);
    })
    return data
  }

  searchArtist(event) {
    this.dataMultimedia(event.target.value ? event.target.value: this.artisOption, this.mediaOption);
  }

  movieOrMusic(event) {
    if (event.detail.checked) {
      this.mediaOption = "movie"
      this.artisOption = "a";
    } 
    else {
      this.mediaOption = "musicVideo"
      this.artisOption = "Shakira";
    }
    this.dataMultimedia(this.artisOption, this.mediaOption)
  }

  rowClick(id: number) {  
    if (this.idTrack === -1) {
      this.idTrack = id
    }
    else if (this.idTrack != id) {
      this.idTrack = id
    }
    else {
      this.idTrack = -1
    }
  }

  eventClick() {
    this.serviceAlerMessage = this.alert.newItemEvent.subscribe((isClick)=> {
      if (isClick) {
       this.dataMultimedia(this.artisOption, this.mediaOption);
      } 
    })
  }

  timerItem(position: number) {
    const count = (max, counter = position) => () => {
      console.log(counter);
      counter = max <= 1 ? 0 : max - counter;
    };

    setInterval(count(20), 500);  
    //return timer(200, 200).pipe(map(i => start - position)).subscribe(val => console.log(val));
  }
}