import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentreg',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './studentreg.component.html',
  styleUrl: './studentreg.component.css'
})
export class StudentregComponent {
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  major = '';
  year: number | null = null;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const studentData = {
      username: this.username,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
      account_type: 'student',
      major: this.major,
      year: this.year
    };

    this.http.post('http://localhost:5000/api/register', studentData).subscribe({
      next: () => {
        alert('Student registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Registration failed.';
      }
    });
  }
}
