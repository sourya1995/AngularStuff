import { Component } from '@angular/core';
import { NgFeaturesService } from './ng-features.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'exploring-angular';
  features: Array<object>;
  constructor(private ngFeatures: NgFeaturesService){}
  ngOnInit() {
    this.features = this.ngFeatures.getFeatures();
  }
}
