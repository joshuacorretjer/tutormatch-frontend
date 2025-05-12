import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpHeaders } from '@angular/common/http'
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-time-schedule',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './time-schedule.component.html',
  styleUrl: './time-schedule.component.css'
})
export class TimeScheduleComponent implements OnInit {
  schedule: any[] = [];
  slot = { date: new Date(), time: '' };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadSchedule();

    // Reload schedule if navigating back to this component
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.router.url.includes('time-schedule')) {
        this.loadSchedule();
      }
    });
  }
  loadSchedule(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>(`${environment.apiUrl}/api/tutor/availability`, { headers }).subscribe({
      next: (res) => {
        this.schedule = res;
      },
      error: (err) => {
        console.error('Failed to load schedule:', err);
      }
    });
  }

  addSlot(): void {
    if (!this.slot.date || !this.slot.time) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const dateStr = new Date(this.slot.date).toISOString().split('T')[0];
    const startTime = new Date(`${dateStr}T${this.slot.time}:00`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const payload = {
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString()
    };

    this.http.post(`${environment.apiUrl}/api/tutor/availability`, payload, { headers }).subscribe({
      next: (res: any) => {
        this.schedule.push(res);
        this.slot = { date: new Date(), time: '' };
      },
      error: (err) => {
        console.error('Error saving availability:', err);
      }
    });
  }

  removeSlot(slot: any): void {
    if (!window.confirm(`Are you sure you want to delete this time slot?\n${new Date(slot.start_time).toLocaleString()} - ${new Date(slot.end_time).toLocaleTimeString()}`)) {
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.delete(`${environment.apiUrl}/api/tutor/availability/${slot.id}`, { headers }).subscribe({
      next: () => {
        this.schedule = this.schedule.filter(s => s.id !== slot.id);
      },
      error: (err) => {
        console.error('Failed to delete slot:', err);
      }
    });
  }
}
