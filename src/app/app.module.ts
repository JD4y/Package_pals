import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CollectorComponent } from './components/collector/collector.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { HistoryComponent } from './components/shared/history/history.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { PalsComponent } from './components/pals/pals.component';
import { RegisterParcelComponent } from './components/pals/register-parcel/register-parcel.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActiveJobComponent } from './components/collector/active-job/active-job.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QrComponent } from './components/qr/qr.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    AppComponent,
    CollectorComponent,
    HeaderComponent,
    HistoryComponent,
    PalsComponent,
    RegisterParcelComponent,
    ProfileComponent,
    ActiveJobComponent,
    QrComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

