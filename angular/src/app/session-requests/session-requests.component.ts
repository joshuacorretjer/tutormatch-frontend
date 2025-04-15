import { Component, OnInit } from '@angular/core';
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

  acceptRequest(req: any): void {
    console.log('Accepted request:', req);
    // You can later update status, call API, or remove it from the list
  }
  
  declineRequest(req: any): void {
    console.log('Declined request:', req);
    // Same as above — show message or update status
  }
  

  ngOnInit(): void {
    // Eventually replace this with API call
    this.requests = [
      {
        topic: 'Calculus',
        student: 'Alice Smith',
        date: '2024-04-18',
        time: '2:00 PM',
        notes: 'Need help with derivatives',
        status: 'pending'
      },
      {
        topic: 'Programming',
        student: 'John Doe',
        date: '2024-04-20',
        time: '11:00 AM',
        notes: 'None',
        status: 'pending'
      }
    ];

  }
}
