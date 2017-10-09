import { Component } from '@angular/core';

import {WeightPage} from "../weight/weight";
import {GraphPage} from "../graph/graph";
import {StatsPage} from "../stats/stats";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WeightPage;
  tab2Root = GraphPage;
  tab3Root = StatsPage;

  constructor() {

  }

}
