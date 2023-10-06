import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

export interface Job {
  id: number,
  time: Date,
  payment: number,
  distance: number
}

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss']
})

export class CollectorComponent implements OnInit {

  public newJobs: Job[] = [];
  public activeJobs: Job[] = [];

  constructor() { }

  ngOnInit(): void {
    this.newJobs = [
      { id: 1, time: new Date('2023-10-06'), payment: 1.45, distance: 12.55 },
      { id: 2, time: new Date('2023-10-07'), payment: 9.22, distance: 55.12 },
      { id: 3, time: new Date('2023-10-08'), payment: 13.98, distance: 2.15 },
      { id: 4, time: new Date('2023-10-06'), payment: 1.45, distance: 12.55 },
      { id: 5, time: new Date('2023-10-07'), payment: 9.22, distance: 55.12 },
      { id: 6, time: new Date('2023-10-08'), payment: 13.98, distance: 2.15 }
    ];
  }

  public takeJob(job: Job): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.activeJobs.push(job);
        this.newJobs = this.newJobs.filter(x => x.id != job.id);
      }
    })
  }

}


