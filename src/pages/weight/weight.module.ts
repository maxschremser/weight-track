import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {WeightPage} from './weight';
import {FormsModule} from '@angular/forms';
import {StorageProvider} from '../../providers/storage/storage';
import {AlertProvider} from '../../providers/alert/alert';
import {StorageService} from '../../providers/storage/storage.service';

@NgModule({
  declarations: [
    WeightPage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(WeightPage),
  ],
  providers: [
    AlertProvider,
    StorageProvider,
    StorageService
  ]
})
export class WeightPageModule {
}
