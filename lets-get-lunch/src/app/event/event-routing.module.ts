import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from './event-create/event-create.component';
import { AuthGuard } from '../guards/auth/auth.guard';
import { EventViewComponent } from './event-view/event-view.component';

const routes: Routes = [
  { path: '', component: EventCreateComponent, canActivate: [AuthGuard]},
  { path: ':id', component: EventViewComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
