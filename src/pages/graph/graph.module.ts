import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GraphPage} from './graph';
import {ChartsModule} from 'ng2-charts';
import {StorageProvider} from '../../providers/storage/storage';

@NgModule({
  declarations: [
    GraphPage
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(GraphPage),
  ],
  providers: [
    StorageProvider
  ]
})
export class GraphPageModule {
}
