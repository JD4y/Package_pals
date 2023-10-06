import { Component, Input } from '@angular/core';
import { GoogleMetricsService } from 'src/app/data-services/google-metrics.service';

export interface Job {
  id: number;
  time: Date;
  payment: number;
  distance: number;
}

export interface Package {
  longitude: number;
  latitude: number;
  id: number;
}

@Component({
  selector: 'app-active-job',
  templateUrl: './active-job.component.html',
  styleUrls: ['./active-job.component.scss'],
})
export class ActiveJobComponent {
  @Input() activeJobs: Job[] = [];
  @Input() packageToCalc: Package[] = [];

  constructor(public googleService: GoogleMetricsService) { }

  public displayMap() {
    const origin = this.packageToCalc[0].latitude + ', ' + this.packageToCalc[0].longitude;
    const target = this.packageToCalc[1].latitude + ', ' + this.packageToCalc[1].longitude;

    this.googleService.openGoogleMaps(
      origin,
      target
    );
  }

  parcels: string[] = [
    '#1 Package',
    '#2 Package',
    '#3 Package',
    '#4 Package',
    '#5 Package',
  ];
}
