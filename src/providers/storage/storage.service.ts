import {Storage} from '@ionic/storage';
import {Entry} from '../../models/entry';
import {Dataset} from '../../models/dataset';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {getFormattedDate, getFormattedDateTime} from '../utils';

@Injectable()
export class StorageService {

  private _emptyDatasets = [
    new Dataset('Gewicht'),
    new Dataset('Wasser'),
    new Dataset('Fett')
  ];

  constructor(private storage: Storage) {
  }

  getEmptyDataset() {
    return this._emptyDatasets;
  }

  getDatasets(): Observable<any> {
    return Observable.create((emitter) => {
      let entries: Entry[] = [];
      this.storage.forEach((entry: Entry, key) => {
        entry.time = +key;
        entries.push(entry);
      }).then(() => {
        let labels: string[] = [];
        let dataset = this._emptyDatasets;
        entries.sort((a: Entry, b: Entry) => {
          return a.time - b.time;
        });
        for (let i = 0; i < entries.length; i++) {
          let entry = entries[i];
          let d = new Date(+entry.time);
          labels.push(getFormattedDateTime(d));
          dataset[0].data.push(entry.weight);
          dataset[1].data.push(entry.water);
          dataset[2].data.push(entry.fett);
        }

        emitter.next({
          labels: labels,
          dataset: dataset
        });
        // emitter.complete();
      });
    });
  }

  getLabels(): Observable<any> {
    return Observable.create((emitter) => {
      let labels: string[] = [];
      this.storage.forEach((entry: Entry, key) => {
        let d = new Date();
        d.setTime(+key);
        labels.push(getFormattedDate(d));
      }).then(() => {
        emitter.next(labels);
        // emitter.complete();
      });
    });
  }

  getEntries(): Observable<any> {
    return Observable.create((emitter) => {
      let entries: Entry[] = [];
      this.storage.forEach((entry: Entry, key) => {
        entry.time = +key;
        entries.push(entry);
      }).then(() => {
        entries = entries.sort((a, b) => {
          return a.time - b.time;
        });
        console.log('storage read entries: ' + entries.length);
        emitter.next(entries);
        // emitter.complete();
      });
    });
  }

  hasEntryForToday(): Observable<any> {
    return Observable.create((emitter) => {
      let today = getFormattedDate(new Date());
      let d = new Date();
      let exists = false;
      this.storage.forEach((e: Entry, key) => {
        if (key === '_settings')
          return;
        d.setTime(+key);
        if (today === getFormattedDate(d)) {
          exists = true;
        }
      }).then(() => {
        emitter.next(exists);
        // emitter.complete();
      });
    });
  }

  addEntry(entry: Entry): Observable<any> {
    return Observable.create((emitter) => {
      const time = new Date().getTime();
      entry.time = time;
      this.storage.set('' + time, entry).then(() => {
        emitter.next(entry);
        // emitter.complete();
      });
    });
  }

  updateEntry(entry: Entry): Observable<any> {
    return Observable.create((emitter) => {
      this.storage.forEach((_entry: Entry, key) => {
        _entry.time = +key;
        if (_entry.time == entry.time) {
          this.storage.set('' + entry.time, entry);
        }
      }).then(() => {
        emitter.next(entry);
        // observable.complete();
      });
    });
  }

  deleteEntry(entry: Entry): Observable<any> {
    return Observable.create((emitter) => {
      let key = '' + entry.time;
      this.storage.remove(key).then(() => {
        emitter.next({
          time: key,
          deleted: true
        });
        let d = new Date();
        d.setTime(+key);
        console.log('deleteEntry: ', getFormattedDateTime(d));
        // emitter.complete();
      });
    });
  }
}
