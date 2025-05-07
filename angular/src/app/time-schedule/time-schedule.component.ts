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
  tutorEmail: string = 'tutor@example.com'; // Replace with actual user context

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSchedule();
  }

  loadSchedule(): void {
    this.http.get<any[]>(`http://localhost:5000/api/schedule?tutor=${this.tutorEmail}`).subscribe({
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

    const payload = {
      tutorEmail: this.tutorEmail,
      date: this.slot.date,
      time: this.slot.time
    };

    this.http.post('http://localhost:5000/api/schedule', payload).subscribe({
      next: (res: any) => {
        this.schedule.push(res); // Assuming backend returns the new slot with ID
        this.slot = { date: new Date(), time: '' };
      },
      error: (err) => {
        console.error('Error saving schedule:', err);
      }
    });
  }

  removeSlot(slot: any): void {
    this.http.delete(`http://localhost:5000/api/schedule/${slot.id}`).subscribe({
      next: () => {
        this.schedule = this.schedule.filter(s => s.id !== slot.id);
      },
      error: (err) => {
        console.error('Failed to delete slot:', err);
      }
    });
  }
}
