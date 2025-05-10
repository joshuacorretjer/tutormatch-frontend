import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  account_type = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = {
      username_or_email: this.email,  // Match Flask key
      password: this.password,
      account_type: this.account_type
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('Login response:', res);
        this.authService.setUserSession(res.access_token);

        const role = this.authService.getUserRole();
        if (role === 'student') {
          this.router.navigate(['/studentdash']);
        } else if (role === 'tutor') {
          this.router.navigate(['/tutordash']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
