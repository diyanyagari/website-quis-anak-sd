import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Session1Component } from './session1/session1.component';
import { Session2Component } from './session2/session2.component';
import { Session3Component } from './session3/session3.component';
import { Session4Component } from './session4/session4.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'session1', component: Session1Component },
  { path: 'session2', component: Session2Component },
  { path: 'session3', component: Session3Component },
  { path: 'session4', component: Session4Component },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
