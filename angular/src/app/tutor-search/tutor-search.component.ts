import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
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
  showBookingModal: boolean = false;
  tutors: any[] = [];
  filterText: string = '';
  filteredTutors: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // ✅ Assign mock data directly here
    this.tutors = [
      {
        name: 'Alice Rodriguez',
        topics: ['Math', 'Physics'],
        profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
        rating: 4.5
      },
      {
        name: 'Brandon Lee',
        topics: ['Programming', 'Data Structures'],
        profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg',
        rating: 4.8
      },
      {
        name: 'Sara Ahmed',
        topics: ['Biology', 'Chemistry'],
        profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg',
        rating: 2.5
      },
      {
        name: 'Carlos Martínez',
        topics: ['Spanish', 'Literature'],
        profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg',
        rating: 3.5
      },
      {
        name: 'Emily Chen',
        topics: ['English', 'Creative Writing'],
        profilePicture: 'https://randomuser.me/api/portraits/women/5.jpg',
        rating: 4.0
      },
      {
        name: 'David Kim',
        topics: ['Calculus', 'Algebra'],
        profilePicture: 'https://randomuser.me/api/portraits/men/6.jpg',
        rating: 1.5
      },
      {
        name: 'Natalie Vega',
        topics: ['History', 'Political Science'],
        profilePicture: 'https://randomuser.me/api/portraits/women/7.jpg',
        rating: 3.0
      },
      {
        name: 'Leonardo Silva',
        topics: ['Economics', 'Statistics'],
        profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg',
        rating: 5.0
      },
      {
        name: 'Amara Singh',
        topics: ['Philosophy', 'Sociology'],
        profilePicture: 'https://randomuser.me/api/portraits/women/9.jpg',
        rating: 4.2
      },
      {
        name: 'Noah Johnson',
        topics: ['Computer Science', 'Machine Learning'],
        profilePicture: 'https://randomuser.me/api/portraits/men/10.jpg',
        rating: 2.0
      }
    ];

    this.filteredTutors = this.tutors;
    
  }

  filterTutors(event: Event): void {
    const input = event.target as HTMLInputElement;
    const text = input.value.toLowerCase();
  
    this.filteredTutors = this.tutors.filter((tutor: any) =>
      tutor.name.toLowerCase().includes(text) ||
      tutor.topics.some((topic: string) => 
        topic.toLowerCase().includes(text)
      )
    );
  }

  showBookingForm = false;
  selectedTutor: any = null;

  studentName: string = '';
  studentEmail: string = '';

  openBookingForm(tutor: any) {
    this.showBookingForm = true;
    this.selectedTutor = tutor;
    document.body.classList.add('modal-open');
  }
  closeBookingForm() {
    this.showBookingForm = false;
    document.body.classList.remove('modal-open');
  }

  
}
