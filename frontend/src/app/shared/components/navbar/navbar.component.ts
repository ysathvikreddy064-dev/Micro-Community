import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  template: `
  <mat-toolbar color=\"primary\">
    <span style=\"cursor:pointer\" (click)=\"router.navigate(['/'])\">Micro-Community</span>
    <span class=\"spacer\"></span>
    <button mat-button (click)=\"router.navigate(['/submit'])\">Report Issue</button>
    <button mat-button (click)=\"router.navigate(['/my-issues'])\">My Issues</button>
    <button mat-button (click)=\"router.navigate(['/admin'])\">Admin</button>
    <button mat-button (click)=\"router.navigate(['/login'])\">Login</button>
  </mat-toolbar>
  `,
  styles: [`.spacer{flex:1 1 auto}`]
})
export class NavbarComponent {
  constructor(public router: Router) {}
}
