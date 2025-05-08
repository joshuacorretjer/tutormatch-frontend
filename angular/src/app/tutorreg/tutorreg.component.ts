//import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tutorreg',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutorreg.component.html',
  styleUrl: './tutorreg.component.css'
})
//export class TutorregComponent implements OnInit {
export class TutorregComponent {
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  hourlyRate: number | null = null;
  //coursesTutored: string[] = [];
  extraInfo = '';
  errorMessage = '';

  //availableClasses: any[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}
/*
  ngOnInit() {
    this.http.get<any[]>('http://localhost:5000/api/classes').subscribe({
      next: (data) => {
        this.availableClasses = data;
      },
      error: (err) => {
        console.error('Failed to fetch classes', err);
        this.errorMessage = 'Failed to load classes';
      }
    });
  }
*/
onSubmit() {
  if (this.password !== this.confirmPassword) {
    this.errorMessage = 'Passwords do not match';
    return;
  }

  const tutorData = {
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
    hourlyRate: this.hourlyRate,
    extraInfo: this.extraInfo,
    role: 'tutor'
  };

  this.authService.registerTutor(tutorData).subscribe({
    next: () => {
      alert('Tutor registered successfully!');
      this.router.navigate(['/login']);
    },
    error: (err: any) => {
      console.error(err);
      this.errorMessage = 'Registration failed.';
    }
  });
}

}
