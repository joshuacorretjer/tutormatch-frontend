import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booked-sessions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booked-sessions.component.html',
  styleUrl: './booked-sessions.component.css'
})
export class BookedSessionsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.http.get<any[]>('http://localhost:5000/api/bookings').subscribe({
      next: (response) => {
        this.bookings = response;
        console.log('Fetched bookings:', response);
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }
}
