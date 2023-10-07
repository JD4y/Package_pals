import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
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
export class ActiveJobComponent implements OnInit {
  @Input() activeJobs: Job[] = [];
  @Input() packageToCalc: Package[] = [];

  statuspackage2 = true;
  statuspackage3 = true;
  statuspackage4 = true;
  statuspackage5 = true;


  constructor(public googleService: GoogleMetricsService) {

  }
  ngOnInit(): void {
    this.packageToCalc = [
      { id: 1, longitude: 40.7366, latitude: -73.99062 },
      { id: 2, longitude: 40.726, latitude: -73.9918 },
      { id: 3, longitude: 40.7387, latitude: -73.9856 },
    ];
  }

  public displayMap() {
    const origin = '51.351480051453706, 6.2545763787356625';
    const target = '51.411071898915864, 6.344627266784644';

    const travelMode = 'bicycling';
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${target}&travelmode=${travelMode}`;
    const googleMapsAppUrl: string = `comgooglemaps://?saddr=${origin}&daddr=${target}`;
    window.location.href = googleMapsAppUrl;
    // this.googleService
    //   .openGoogleMaps(origin, target)
    //   .subscribe(x => window.open(googleMapsUrl, '_blank'));
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
