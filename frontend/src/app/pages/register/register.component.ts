import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  fullName = '';
  email = '';
  password = '';
  area = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    this.auth.register({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      area: this.area
    }).subscribe(() => this.router.navigate(['/']));
  }
}
