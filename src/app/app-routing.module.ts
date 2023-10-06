import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { CollectorComponent } from './components/collector/collector.component';
import { HistoryComponent } from './components/shared/history/history.component';

const routes: Routes = [
  { path: 'receiver', component: ReceiverComponent },
  { path: 'collector', component: CollectorComponent },
  { path: 'history', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
