import {Component, ViewChild} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {BaseChartDirective} from 'ng2-charts';
import {StorageProvider} from '../../providers/storage/storage';
import {Dataset} from '../../models/dataset';

@IonicPage()
@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
})

export class GraphPage {
  lineChartType = 'line';
  lineChartOptions = {
    responsive: true
  };
  lineChartLabels: string[];
  lineChartData: Dataset[] = this.storage.getEmptyDataset();
  @ViewChild(BaseChartDirective) private chart: BaseChartDirective;

  constructor(private screenOrientation: ScreenOrientation, private storage: StorageProvider) {
    // console.log(storage.driver);
    if (this.screenOrientation != null) {
      this.screenOrientation.onChange().subscribe(() => {
        console.log(this.screenOrientation.type);
        this.getDatasets();
        this.chart.chart.update();
      });
    }
  }

  getDatasets() {
    this.storage.getDatasets().subscribe((entries) => {
      console.log('chart entries: ', entries);
      this.lineChartData = entries['dataset'];
      this.lineChartLabels = entries['labels'];
    });

  }

  ionViewDidEnter() {
    this.getDatasets();
  }
}
