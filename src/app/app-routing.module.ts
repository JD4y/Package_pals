import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectorComponent } from './components/collector/collector.component';
import { HistoryComponent } from './components/shared/history/history.component';
import { PalsComponent } from './components/pals/pals.component';
import { RegisterParcelComponent } from './components/pals/register-parcel/register-parcel.component';
import { ProfileComponent } from './components/shared/profile/profile.component';

const routes: Routes = [
  { path: 'pals', component: PalsComponent },
  { path: '', redirectTo: '/pals', pathMatch: 'full' },
  { path: 'collector', component: CollectorComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'register-parcel', component: RegisterParcelComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
