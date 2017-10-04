import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {WeightPage} from "../pages/weight/weight";
import {GraphPage} from "../pages/graph/graph";
import {StatsPage} from "../pages/stats/stats";
import {WeightPageModule} from "../pages/weight/weight.module";
import {GraphPageModule} from "../pages/graph/graph.module";
import {StatsPageModule} from "../pages/stats/stats.module";

@NgModule({
  declarations: [
    MyApp,
    //WeightPage,
    //GraphPage,
    //StatsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    WeightPageModule,
    GraphPageModule,
    StatsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WeightPage,
    GraphPage,
    StatsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
