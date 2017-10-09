import {Component, OnInit} from '@angular/core';
import {IonicPage, ToastController, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Entry} from '../../models/entry';
import {StorageProvider} from '../../providers/storage/storage';
import {AlertProvider, ENTRY_EXISTS_DIALOG} from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-weight',
  templateUrl: 'weight.html',
})
export class WeightPage implements OnInit {
  entry: Entry = new Entry();

  form: FormGroup;

  constructor(private fb: FormBuilder, private view: ViewController, private storage: StorageProvider, private alert: AlertProvider,
              private toast: ToastController) {
  }

  get today() {
    return this.getFormattedDate(new Date());
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      weight: this.fb.control('', Validators.required),
      fett: this.fb.control(''),
      water: this.fb.control('')
    });
  }

  ionViewDidEnter() {
    this.clearForm();
  }

  getToast() {
    return this.toast;
  }

  addWeight(form) {
    this.entry.weight = +form.get('weight').value;
    this.entry.fett = +form.get('fett').value;
    this.entry.water = +form.get('water').value;
    this.showPromptAndAdd();
  }

  getFormattedDate(d: Date) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  showPromptAndAdd() {
    this.storage.hasEntryForToday().subscribe((e) => {
      console.log('hasEntry: ', e);
      if (e === true) {
        const confirm = this.alert.create(ENTRY_EXISTS_DIALOG, this.entry, this.view, this.addEntry, this.updateEntry);
        confirm.present();
      } else {
        this.addEntry();
      }
    });
  }

  // is called either from the AlertController or from this Component
  addEntry() {
    this.storage.addEntry(this.entry).subscribe(() => {
      this.view.instance.getToast().create({
          message: 'Gewicht hinzugefügt',
          duration: 2000,
          position: 'bottom'
        }).present();
      this.view.instance.clearForm();
      });
  }

  // is called either from the AlertController or from this Component
  updateEntry() {
    this.storage.updateEntry(this.entry).subscribe(() => {
      this.view.instance.getToast().create({
        message: 'Gewicht gespeichert',
        duration: 2000,
        position: 'bottom'
      }).present();
    });
  }

  clearForm() {
    this.form.get('weight').setValue('');
    this.form.get('fett').setValue('');
    this.form.get('water').setValue('');
  }

}
