import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookSessionFormComponent } from '../book-session-form/book-session-form.component';

@Component({
  selector: 'app-tutor-search',
  standalone: true,
  imports: [CommonModule, FormsModule, BookSessionFormComponent],
  templateUrl: './tutor-search.component.html',
  styleUrl: './tutor-search.component.css'
})
export class TutorSearchComponent implements OnInit {
  showBookingModal = false;
  selectedTutor: any = null;

  studentName = '';
  studentEmail = '';

  tutors: any[] = [];
  filteredTutors: any[] = [];
  filterText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTutors();
  }

  fetchTutors(): void {
    this.http.get<any[]>('http://localhost:5000/api/tutors').subscribe({
      next: (res) => {
        this.tutors = res;
        this.filteredTutors = [...res];
      },
      error: (err) => {
        console.error('Failed to load tutors:', err);
      }
    });
  }

  filterTutors(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterText = input.value.toLowerCase();

    this.filteredTutors = this.tutors.filter(tutor =>
      tutor.name.toLowerCase().includes(this.filterText) ||
      tutor.topics.some((topic: string) =>
        topic.toLowerCase().includes(this.filterText)
      )
    );
  }

  openBookingForm(tutor: any) {
    this.showBookingModal = true;
    this.selectedTutor = tutor;
    document.body.classList.add('modal-open');
  }

  closeBookingForm() {
    this.showBookingModal = false;
    document.body.classList.remove('modal-open');
  }
}
