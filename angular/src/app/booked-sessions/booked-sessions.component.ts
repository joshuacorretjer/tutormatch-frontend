import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booked-sessions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booked-sessions.component.html',
  styleUrl: './booked-sessions.component.css'
})
export class BookedSessionsComponent implements OnInit{
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookings = this.bookingService.getBookings();
    console.log("Loaded bookings:", this.bookings);

  }
}
