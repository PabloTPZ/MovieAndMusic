import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { ApiService } from "./api/api.service";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AlerMessage } from "./alert/alert.message";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, ],
  bootstrap: [AppComponent],
  providers: [ApiService, AlerMessage]
})
export class AppModule {}
