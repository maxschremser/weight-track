import {Entry} from '../../models/entry';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {List} from 'immutable';
import {asObservable} from './asObservable';
import {StorageService} from './storage.service';

@Injectable()
export class StorageProvider {

  constructor(private service: StorageService) {
    this.loadDatasets();
  }

  private _entries: BehaviorSubject<List<Entry>> = new BehaviorSubject(List([]));

  get entries() {
    return asObservable(this._entries);
  }

  loadDatasets() {

  }

  getDatasets() {
    let obs = this.service.getDatasets();

    obs.subscribe(datasets => {
      console.log('datasets from service: ', datasets);
    });

    return obs;
  }

  getLabels() {
    let obs = this.service.getLabels();

    obs.subscribe(labels => {
      console.log("labels from service: ", labels);
    });

    return obs;
  }

  getEntries() {
    let obs = this.service.getEntries();

    obs.subscribe(entries => {
      console.log("Entries from service", entries);
    });

    return obs;
  }

  getEmptyDataset() {
    return this.service.getEmptyDataset();
  }

  hasEntryForToday() {
    let obs = this.service.hasEntryForToday();

    obs.subscribe(hasEntry => {
      console.log("hasEntryForToday from service: ", hasEntry);
    });

    return obs;
  }

  addEntry(entry: Entry) {
    let obs = this.service.addEntry(entry);

    obs.subscribe(entries => {
      console.log("Entries added from service", entries);
    });

    return obs;
  }

  updateEntry(entry: Entry) {
    let obs = this.service.updateEntry(entry);

    obs.subscribe(entries => {
      console.log("Entries updated from service", entries);
    });

    return obs;
  }

  deleteEntry(entry: Entry) {
    let obs = this.service.deleteEntry(entry);

    obs.subscribe(entries => {
      console.log("Entries deleted from service", entries);
    });

    return obs;
  }

}
