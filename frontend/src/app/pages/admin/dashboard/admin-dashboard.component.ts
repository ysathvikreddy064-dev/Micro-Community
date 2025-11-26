import { Component } from '@angular/core';
@Component({
  template: `
  <mat-card>
    <h2>Admin Dashboard</h2>
    <p>Quick links:</p>
    <button mat-raised-button color=\"primary\" routerLink=\"/admin/issues\">Issues</button>
    <button mat-raised-button color=\"accent\" routerLink=\"/admin\">Map</button>
  </mat-card>
  `
})
export class AdminDashboardComponent {}
