import { AlertController } from "@ionic/angular";
import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AlerMessage {

    newItemEvent = new EventEmitter<boolean>();

    constructor(private alert: AlertController) { }

    openAlert(message: string) {
        this.alert.create({
            backdropDismiss: false,
            header: "Message",
            subHeader: message,
            buttons: [
                {
                    text: "Refresh",
                    handler: (data) => {
                        this.newItemEvent.emit(true)
                    }
                }
            ]
        }).then((elment) => {
            elment.present()
        })
        this.newItemEvent.emit(false)
    }
}