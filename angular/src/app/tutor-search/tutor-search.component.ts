import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tutor-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutor-search.component.html',
  styleUrl: './tutor-search.component.css'
})
export class TutorSearchComponent implements OnInit {
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
        profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        name: 'Brandon Lee',
        topics: ['Programming', 'Data Structures'],
        profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg'
      },
      {
        name: 'Sara Ahmed',
        topics: ['Biology', 'Chemistry'],
        profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg'
      },
      {
        name: 'Carlos Martínez',
        topics: ['Spanish', 'Literature'],
        profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg'
      },
      {
        name: 'Emily Chen',
        topics: ['English', 'Creative Writing'],
        profilePicture: 'https://randomuser.me/api/portraits/women/5.jpg'
      },
      {
        name: 'David Kim',
        topics: ['Calculus', 'Algebra'],
        profilePicture: 'https://randomuser.me/api/portraits/men/6.jpg'
      },
      {
        name: 'Natalie Vega',
        topics: ['History', 'Political Science'],
        profilePicture: 'https://randomuser.me/api/portraits/women/7.jpg'
      },
      {
        name: 'Leonardo Silva',
        topics: ['Economics', 'Statistics'],
        profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg'
      },
      {
        name: 'Amara Singh',
        topics: ['Philosophy', 'Sociology'],
        profilePicture: 'https://randomuser.me/api/portraits/women/9.jpg'
      },
      {
        name: 'Noah Johnson',
        topics: ['Computer Science', 'Machine Learning'],
        profilePicture: 'https://randomuser.me/api/portraits/men/10.jpg'
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
  
}
