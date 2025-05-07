import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorreg',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutorreg.component.html',
  styleUrl: './tutorreg.component.css'
})
export class TutorregComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  gpa: number | null = null;
  courseTutored = '';
  extraInfo = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      gpa: this.gpa,
      courseTutored: this.courseTutored,
      extraInfo: this.extraInfo,
      role: 'tutor'
    };

    this.http.post('http://localhost:5000/api/register', payload).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Registration failed';
      }
    });
  }
}
