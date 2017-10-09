import {Injectable} from '@angular/core';
import {StorageProvider} from '../storage/storage';
import {Alert, AlertController, ViewController} from 'ionic-angular';
import {Entry} from '../../models/entry';
import {getFormattedDateTime} from '../utils';

export const ENTRY_EXISTS_DIALOG = 1;
export const UPDATE_ENTRY_DIALOG = 2;

@Injectable()
export class AlertProvider {

  constructor(private alert: AlertController, private storage: StorageProvider) {
  }

  create(ID: number, entry: Entry, view: ViewController, updateHandler?: any, deleteHandler?: any): Alert {
    let dialog = {};
    let alert: Alert;
    switch (ID) {
      case ENTRY_EXISTS_DIALOG:
        dialog = {
          title: 'Eintrag überschreiben ?',
          message: 'Für heute existiert bereits ein Eintrag!',
          buttons: [
            {
              text: 'Abbrechen',
              role: 'cancel'
            },
            {
              text: 'Hinzufügen',
              handler: updateHandler,
              storage: this.storage,
              entry: entry,
              view: view
            },
            {
              text: 'Überschreiben',
              handler: deleteHandler,
              storage: this.storage,
              entry: entry,
              view: view
            }
          ]
        };
        break;

      case UPDATE_ENTRY_DIALOG:
        let d = new Date();
        d.setTime(entry.time);
        dialog = {
          title: 'Eintrag ändern',
          message: getFormattedDateTime(d),
          inputs: [
            {
              type: 'number',
              name: 'weight',
              placeholder: 'Gewicht',
              value: entry.weight
            }, {
              type: 'number',
              name: 'fett',
              placeholder: 'Fett',
              value: entry.fett
            }, {
              type: 'number',
              name: 'water',
              placeholder: 'Wasser',
              value: entry.water
            },
            {
              type: 'hidden',
              name: 'time',
              value: entry.time
            }
          ],
          buttons: [
            {
              text: 'Abbrechen',
              role: 'cancel'
            },
            {
              text: 'Löschen',
              handler: deleteHandler,
              storage: this.storage,
              entry: entry,
              view: view
            },
            {
              text: 'Speichern',
              handler: updateHandler,
              storage: this.storage,
              entry: entry,
              view: view
            }
          ]
        };
        break;
    }
    alert = this.alert.create(dialog);
    return alert;
  }
}
