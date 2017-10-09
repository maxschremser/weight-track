import {Component} from '@angular/core';
import {IonicPage, ToastController, ViewController} from 'ionic-angular';
import {StorageProvider} from '../../providers/storage/storage';
import {AlertProvider, UPDATE_ENTRY_DIALOG} from '../../providers/alert/alert';

@IonicPage()

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  entries$;

  constructor(private view: ViewController, private storage: StorageProvider, private alert: AlertProvider, private toast: ToastController) {
  }

  ionViewDidEnter() {
    this.getEntries();
  }

  getToast() {
    return this.toast;
  }

  getEntries(event?:any) {
    this.entries$ = this.storage.getEntries();
    if (event)
      event.complete();
  }

  prompt(entry, doUpdate, doDelete) {
    this.alert.create(UPDATE_ENTRY_DIALOG, entry, this.view, doUpdate, doDelete).present();
  }

  updateEntry(entry) {
    this.prompt(entry, this.doUpdate, this.doDelete);
  }

  doCancel() {
    console.log("Cancel");
  }

  doDelete(entry) {
    console.log("Delete", entry);
    this.storage.deleteEntry(entry).subscribe(() => {
      this.view.instance.getToast().create({
        message: 'Eintrag gelöscht',
        duration: 2000,
        position: 'bottom'
      }).present();
      this.view.instance.getEntries();
    });
  }

  doUpdate(entry) {
    console.log("Update");
    this.storage.updateEntry(entry).subscribe(() => {
      this.view.instance.getToast().create({
        message: 'Eintrag gespeichert',
        duration: 2000,
        position: 'bottom'
      }).present();
      this.view.instance.getEntries();
    });
  }
}
