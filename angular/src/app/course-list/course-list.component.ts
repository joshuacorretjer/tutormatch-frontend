import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';  // Adjust the path

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  classes: any[] = [];
  filteredClasses: any[] = [];
  searchText: string = '';
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  currentSortColumn: string = '';

  isTutor: boolean = false;
  tutorId: string | null = null;
  joinedClassIds: Set<string> = new Set(); // Track joined classes

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    const userId = this.authService.getUserId();

    this.isTutor = role === 'tutor';

    if (this.isTutor && userId) {
      this.http.get<any>(`http://127.0.0.1:5000/api/tutor/user/${userId}`).subscribe({
        next: (data) => {
          this.tutorId = data.id;  // Actual tutor ID from DB
          console.log('Fetched Tutor ID:', this.tutorId);
          this.fetchJoinedClasses(this.tutorId!);
        },
        error: (err) => {
          console.error('Failed to fetch tutor profile:', err);
        }
      });
    }

    this.fetchClasses();
  }

  fetchClasses(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/api/classes').subscribe({
      next: (data) => {
        this.classes = data.map(c => ({
          id: c.id,
          subjectName: c.subject.name,
          subjectCode: c.subject.code,
          classSection: c.section,
          tutorCount: c.tutor_count
        }));
        this.filteredClasses = [...this.classes];
      },
      error: (err) => {
        console.error('Failed to fetch classes:', err);
      }
    });
  }

  fetchJoinedClasses(tutorId: string): void {
    console.log('Tutor ID:', this.tutorId);
    this.http.get<any[]>(`http://127.0.0.1:5000/api/tutor/${tutorId}/classes`).subscribe({
      next: (data) => {
        this.joinedClassIds = new Set(data.map(cls => cls.id));
      },
      error: (err) => {
        console.error('Failed to fetch joined classes:', err);
      }
    });
  }

  sortBy(column: string): void {
    if (this.currentSortColumn === column) {
      this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortColumn = column;
      this.sortDirection[column] = 'asc';
    }

    const direction = this.sortDirection[column];

    this.filteredClasses.sort((a, b) => {
      const valueA = typeof a[column] === 'string' ? a[column].toLowerCase() : a[column];
      const valueB = typeof b[column] === 'string' ? b[column].toLowerCase() : b[column];

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  filterCourses(event: Event): void {
    const input = event.target as HTMLInputElement;
    const search = input.value.toLowerCase();

    this.filteredClasses = this.classes.filter(course =>
      course.subjectName.toLowerCase().includes(search) ||
      course.subjectCode.toLowerCase().includes(search) ||
      course.classSection.toLowerCase().includes(search)
    );

    if (this.currentSortColumn) {
      this.sortBy(this.currentSortColumn);
    }
  }

  confirmJoin(classId: string): void {
    const confirmed = window.confirm('Are you sure you want to join this class?');
    if (confirmed) {
      this.associateWithClass(classId);
    }
  }

  associateWithClass(classId: string): void {
    if (!this.tutorId) return;

    this.http.post(`http://127.0.0.1:5000/api/tutor/${this.tutorId}/classes`, {
      class_ids: [classId]
    }).subscribe({
      next: () => {
        this.joinedClassIds.add(classId); // Mark as joined
        this.fetchClasses(); // Optionally refresh class list to update tutor count
      },
      error: (err) => {
        console.error('Failed to associate class:', err);
      }
    });
  }
}
