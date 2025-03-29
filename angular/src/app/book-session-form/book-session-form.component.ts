import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  formData = {
    topic: '',
    date: '',
    time: '',
    duration: '',
    type: '',
    notes: ''
  };

  submitForm() {
    console.log("Booking submitted:", {
      tutor: this.tutorName,
      student: this.studentName,
      email: this.studentEmail,
      ...this.formData
    });
    alert("Session booked successfully!");
  }
}
