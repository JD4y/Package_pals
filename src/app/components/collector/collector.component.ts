import { Component } from '@angular/core';
import { GoogleMetricsService } from 'src/app/data-services/google-metrics.service';
import Swal from 'sweetalert2';

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

export interface PackageCalc {
  startId: number;
  endId: number;
  distance: number;
}

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss'],
})
export class CollectorComponent {
  public activeJobs: Job[] = [];
  public newJobs: Job[] = [];
  public packageToCalc: Package[] = [];

  constructor(public googleService: GoogleMetricsService) {}

  ngOnInit(): void {
    this.newJobs = [
      { id: 1, time: new Date('2023-10-06'), payment: 1.45, distance: 12.55 },
      { id: 2, time: new Date('2023-10-07'), payment: 9.22, distance: 55.12 },
      { id: 3, time: new Date('2023-10-08'), payment: 13.98, distance: 2.15 },
      { id: 4, time: new Date('2023-10-06'), payment: 1.45, distance: 12.55 },
      { id: 5, time: new Date('2023-10-07'), payment: 9.22, distance: 55.12 },
      { id: 6, time: new Date('2023-10-08'), payment: 13.98, distance: 2.15 },
    ];

    this.packageToCalc = [
      { id: 1, longitude: 40.7366, latitude: -73.99062 },
      { id: 2, longitude: 40.726, latitude: -73.9918 },
      { id: 3, longitude: 40.7387, latitude: -73.9856 },
    ];

    this.generateCombinations(this.packageToCalc);
  }

  public takeJob(job: Job): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.activeJobs.push(job);
        this.newJobs = this.newJobs.filter((x) => x.id != job.id);
      }
    })
  }


  public displayMap() {
    const origin = this.packageToCalc[0].longitude + ', ' + this.packageToCalc[0].latitude;
    const target = this.packageToCalc[1].longitude + ', ' + this.packageToCalc[1].latitude;
    const travelMode = 'bicycling'; 
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${target}&travelmode=${travelMode}`;
    this.googleService
      .openGoogleMaps(origin, target)
      .subscribe(x => window.open(googleMapsUrl, '_blank'));
  }

  private generateCombinations(locations: Package[]): PackageCalc[] {
    const numLocations = locations.length;
    var result: PackageCalc[] = [];

    for (let i = 0; i < numLocations; i++) {
      for (let j = i + 1; j < numLocations; j++) {
        var calc = this.googleService.calculateDistance(
          locations[i].latitude,
          locations[i].longitude,
          locations[j].latitude,
          locations[j].longitude
        );

        var packageCalc: PackageCalc = {
          startId: locations[i].id,
          endId: locations[j].id,
          distance: calc,
        };
        result.push(packageCalc);
      }
    }
    return result;
  }
}
