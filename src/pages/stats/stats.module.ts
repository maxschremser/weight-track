import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {StatsPage} from './stats';
import {StorageProvider} from '../../providers/storage/storage';

@NgModule({
  declarations: [
    StatsPage,
  ],
  imports: [
    IonicPageModule.forChild(StatsPage)
  ],
  providers: [
    StorageProvider
  ]
})
export class StatsPageModule {
}
