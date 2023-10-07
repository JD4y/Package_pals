import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  collector = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  public showQR(): void {
    console.log();
    this.router.navigate(['./qr']);
  }
}
