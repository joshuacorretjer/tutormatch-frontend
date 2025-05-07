import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-requests.component.html',
  styleUrl: './session-requests.component.css'
})
export class SessionRequestsComponent implements OnInit {
  requests: any[] = [];
  tutorEmail = 'tutor@example.com'; // TODO: Replace with actual logged-in tutor email

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.http.get<any[]>(`http://localhost:5000/api/session-requests?tutor=${this.tutorEmail}`).subscribe({
      next: (res) => {
        this.requests = res;
      },
      error: (err) => {
        console.error('Failed to load session requests:', err);
      }
    });
  }

  acceptRequest(req: any): void {
    this.updateRequestStatus(req, 'accepted');
  }

  declineRequest(req: any): void {
    this.updateRequestStatus(req, 'declined');
  }

  private updateRequestStatus(req: any, status: string): void {
    this.http.put(`http://localhost:5000/api/session-requests/${req.id}`, { status }).subscribe({
      next: () => {
        req.status = status; // update UI immediately
      },
      error: (err) => {
        console.error(`Failed to ${status} request:`, err);
      }
    });
  }
}
