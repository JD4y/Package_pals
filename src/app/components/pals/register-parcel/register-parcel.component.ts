import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface CourierServices {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register-parcel',
  templateUrl: './register-parcel.component.html',
  styleUrls: ['./register-parcel.component.scss'],
})
export class RegisterParcelComponent {
  courierServices: CourierServices[] = [
    { value: 'dhl', viewValue: 'DHL' },
    { value: 'ups', viewValue: 'UPS' },
  ];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
