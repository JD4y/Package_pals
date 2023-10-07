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
    const origin = this.packageToCalc[0].longitude + ', ' + this.packageToCalc[0].latitude;
    const target = this.packageToCalc[1].longitude + ', ' + this.packageToCalc[1].latitude;

    const travelMode = 'bicycling';
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${target}&travelmode=${travelMode}`;
    const googleMapsAppUrl: string = `comgooglemaps://?saddr=${origin}&daddr=${target}`;
    window.location.href = googleMapsAppUrl;
    // this.googleService
    //   .openGoogleMaps(origin, target)
    //   .subscribe(x => window.open(googleMapsUrl, '_blank'));
  }

  parcels: string[] = [
    '#1 Package',
    '#2 Package',
    '#3 Package',
    '#4 Package',
    '#5 Package',
  ];
}
