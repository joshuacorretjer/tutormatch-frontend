import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(private http: HttpClient, private router: Router, private authService:AuthService) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
  
    const studentData = {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      major: this.major,
      year: this.year,
      password: this.password,
      role: 'student'
    };
  
    this.authService.registerStudent(studentData).subscribe({
      next: () => {
        alert('Student registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = 'Registration failed.';
      }
    });
  }
  
}
