import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  submitForm() {
    const booking = {
      tutorName: this.tutorName,
      studentName: this.studentName,
      studentEmail: this.studentEmail,
      ...this.formData
    };

    this.http.post('http://localhost:5000/api/sessions', booking).subscribe({
      next: () => {
        alert('Session booked successfully!');
        this.closeModal.emit();
      },
      error: (err) => {
        console.error('Booking failed:', err);
        alert('There was an error booking the session.');
      }
    });
  }
}
