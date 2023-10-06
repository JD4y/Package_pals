import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from "@googlemaps/google-maps-services-js";


@Injectable({
  providedIn: 'root'
})
export class GoogleMetricsService {

  private apiUrl = 'https://maps.googleapis.com/maps/api/directions/json';

  constructor(public httpClient: HttpClient) { }

  public calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const earthRadiusKm = 6371;

    const lat1Rad = this.toRadians(lat1);
    const lon1Rad = this.toRadians(lon1);
    const lat2Rad = this.toRadians(lat2);
    const lon2Rad = this.toRadians(lon2);

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;
    return distance;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  public openGoogleMaps(startLon: number, startLat: number, targetLon: number, targetLat: number) {
     const httpOptions = {
       headers: new HttpHeaders({
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
         'Access-Control-Allow-Headers': 'Origin'
       })
     }
    // this.httpClient.get(this.apiUrl + '?origin=' + startLon + ', ' + startLat + '&destination=' + targetLon + ', ' + targetLat + '&key=' + environment.googleMapsKey)
    //   .subscribe(x => console.log(x));
    this.httpClient.get('http://localhost:4200/google/maps/api/directions/json?destination=Montreal&origin=Toronto&key=' + environment.googleMapsKey, httpOptions).subscribe(x => console.log(x));
  }

}
