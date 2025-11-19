import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  template: `
  <mat-card>
    <h2>Login</h2>
    <form (ngSubmit)=\"submit()\">
      <mat-form-field class=\"full\"><input matInput placeholder=\"Email\" [(ngModel)]=\"email\" name=\"email\"></mat-input></mat-form-field>
      <mat-form-field class=\"full\"><input matInput placeholder=\"Password\" type=\"password\" [(ngModel)]=\"password\" name=\"password\"></mat-input></mat-form-field>
      <button mat-raised-button color=\"primary\">Login</button>
    </form>
  </mat-card>
  `,
  styles:[`.full{width:100%}`]
})
export class LoginComponent {
  email=''; password='';
  constructor(private auth: AuthService, private router: Router) {}
  submit(){ this.auth.login(this.email, this.password).subscribe(() => this.router.navigate(['/'])); }
}
