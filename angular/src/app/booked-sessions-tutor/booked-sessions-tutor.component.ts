import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatListModule } from '@angular/material/list'; // <-- Import MatListModule
import { environment } from '../environments/environment';

@Component({
  selector: 'app-booked-sessions-tutor',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './booked-sessions-tutor.component.html',
  styleUrl: './booked-sessions-tutor.component.css'
})
export class BookedSessionsTutorComponent implements OnInit {
  bookings: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.http.get<any[]>(`${environment.apiUrl}/api/tutor/sessions`).subscribe({
      next: (response) => {
        console.log('Bookings:', response);
        this.bookings = response;
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }
  /*
  cancelSession(sessionId: string): void {
    const confirmed = confirm('Are you sure you want to cancel this session?');

    if (confirmed) {
      this.http.delete(`http://127.0.0.1:5000/api/tutor/sessions/${sessionId}`).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(session => session.id !== sessionId);
        },
        error: (err) => {
          console.error('Error cancelling session:', err);
        }
      });
    }
  }
  */
}
