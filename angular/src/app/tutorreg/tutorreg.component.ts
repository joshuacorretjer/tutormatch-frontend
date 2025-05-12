//import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

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

  constructor(private http: HttpClient, private router: Router) {}
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

    const payload = {
      username: this.username,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
      account_type: 'tutor',
      hourly_rate: this.hourlyRate,
      //classes: this.coursesTutored,
      bio: this.extraInfo
    };

    this.http.post(`${environment.apiUrl}/api/register`, payload).subscribe({
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
