import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-book-session-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-session-form.component.html',
  styleUrl: './book-session-form.component.css'
})
export class BookSessionFormComponent {

  @Input() tutorName: string = '';
  @Input() studentName: string = '';
  @Input() studentEmail: string = '';
  @Output() closeModal = new EventEmitter<void>();

  formData = {
    topic: '',
    date: '',
    time: '',
    duration: '',
    type: '',
    notes: ''
  };

  constructor(private bookingService: BookingService) {}


  submitForm() {
    this.bookingService.addBooking({
      tutor: this.tutorName,
      student: this.studentName,
      email: this.studentEmail,
      ...this.formData
    });

    alert("Session booked successfully!");
    this.closeModal.emit(); 
  }
}
