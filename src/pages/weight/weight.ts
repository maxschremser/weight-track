import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AlertController} from "ionic-angular/index";

/**
 * Generated class for the WeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weight',
  templateUrl: 'weight.html',
})
export class WeightPage {
  weight: number;
  fett: number;
  water: number;

  constructor(private storage:Storage, private alertCtrl:AlertController, public navCtrl:NavController, public navParams:NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeightPage');
  }

  addWeight(weight: HTMLInputElement, fett: HTMLInputElement, water: HTMLInputElement) {
    let exists = false;
    this.weight = +weight.value;
    this.fett = +fett.value;
    this.water = +water.value;

    console.log("add clicked", new Date().getTime(), weight.value, fett.value, water.value);
    this.storage.keys().then((keys) => {
      keys.forEach((key: any) => {
        if (key === '_settings' || isNaN(key))
          return;

        let d = new Date();
        d.setTime(key);

        const entryDate = this.getFormattedDate(d);
        if (entryDate === this.today) {
          exists = true;
        }
      });
      this.showPromptAndAdd(exists);
    });
  }

  get today() {
    return this.getFormattedDate(new Date());
  }

  getFormattedDate(d:Date) {
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
  }

  showPromptAndAdd(exists: boolean) {
    console.log('exists', exists);
    if (exists) {
      const confirm = this.alertCtrl.create({
        title: 'Eintrag überschreiben ?',
        message: 'Für heute existiert bereits ein Eintrag, willst du den wirklich überschreiben ?',
        buttons: [
          {
            text: 'Nein',
            role: 'cancel'
          },
          {
            text: 'Ja',
            handler: () => {
              exists = false;
            }
          }
        ]
      });
      confirm.present();
    }
    if (!exists) {
      this.storage.set('' + new Date().getTime(), {weight: this.weight, fett: this.fett, water: this.water})
    }

  }

}
