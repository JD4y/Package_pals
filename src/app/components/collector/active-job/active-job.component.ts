import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  statuspackage2 = true;
  statuspackage3 = true;
  statuspackage4 = true;
  statuspackage5 = true;

  constructor(public googleService: GoogleMetricsService) {}

  public displayMap() {
    this.googleService.openGoogleMaps(
      this.packageToCalc[0].latitude,
      this.packageToCalc[0].longitude,
      this.packageToCalc[1].latitude,
      this.packageToCalc[1].longitude
    );
  }

  public enablePackage2() {
    this.statuspackage2 = !this.statuspackage2;
  }

  public enablePackage3() {
    this.statuspackage3 = !this.statuspackage3;
  }

  public enablePackage4() {
    this.statuspackage4 = !this.statuspackage4;
  }
  public enablePackage5() {
    this.statuspackage5 = !this.statuspackage5;
  }
}
