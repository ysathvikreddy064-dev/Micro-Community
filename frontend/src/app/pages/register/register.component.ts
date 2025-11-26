import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  template: `
  <mat-card>
    <h2>Register</h2>
    <form (ngSubmit)=\"submit()\">
      <mat-form-field class=\"full\"><input matInput placeholder=\"Full name\" [(ngModel)]=\"fullName\" name=\"fullName\"></mat-form-field>
      <mat-form-field class=\"full\"><input matInput placeholder=\"Email\" [(ngModel)]=\"email\" name=\"email\"></mat-form-field>
      <mat-form-field class=\"full\"><input matInput placeholder=\"Password\" type=\"password\" [(ngModel)]=\"password\" name=\"password\"></mat-form-field>
      <mat-form-field class=\"full\"><input matInput placeholder=\"Area (optional)\" [(ngModel)]=\"area\" name=\"area\"></mat-form-field>
      <button mat-raised-button color=\"primary\">Register</button>
    </form>
  </mat-card>
  `,
  styles:[`.full{width:100%}`]
})
export class RegisterComponent {
  fullName=''; email=''; password=''; area='';
  constructor(private auth: AuthService, private router: Router) {}
  submit(){ this.auth.register({fullName:this.fullName,email:this.email,password:this.password,area:this.area}).subscribe(()=>this.router.navigate(['/'])); }
}
