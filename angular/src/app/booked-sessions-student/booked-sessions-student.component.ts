import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatListModule } from '@angular/material/list'; // <-- Import MatListModule
import { environment } from '../environments/environment';

@Component({
  selector: 'app-booked-sessions-student',
  standalone: true,
  imports: [CommonModule, MatListModule], // <-- Add MatListModule here
  templateUrl: './booked-sessions-student.component.html',
  styleUrl: './booked-sessions-student.component.css'
})
export class BookedSessionsStudentComponent implements OnInit {
  bookings: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.http.get<any[]>(`${environment.apiUrl}/api/student/sessions`).subscribe({
      next: (response) => {
        this.bookings = response;
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }
}
