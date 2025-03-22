import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses = [
    { code: 'CSCI101', name: 'Introduction to Computer Science', credits: 3 },
    { code: 'MATH202', name: 'Calculus II', credits: 4 },
    { code: 'PHYS150', name: 'Physics I: Mechanics', credits: 4 },
    { code: 'ENGL101', name: 'English Composition', credits: 3 },
    { code: 'CHEM105', name: 'General Chemistry I', credits: 4 },
    { code: 'BIO110', name: 'Principles of Biology', credits: 3 },
    { code: 'STAT201', name: 'Introduction to Statistics', credits: 3 },
    { code: 'HIST210', name: 'World History', credits: 3 },
    { code: 'ECON101', name: 'Microeconomics', credits: 3 },
    { code: 'ART120', name: 'Fundamentals of Drawing', credits: 2 },
    { code: 'PSYC100', name: 'Intro to Psychology', credits: 3 },
    { code: 'SOCI101', name: 'Introduction to Sociology', credits: 3 },
    { code: 'PHIL101', name: 'Ethics and Society', credits: 3 },
    { code: 'CSCI204', name: 'Data Structures', credits: 4 },
    { code: 'CSCI330', name: 'Software Engineering', credits: 4 }
  ];

  searchText: string = '';
  filteredCourses: any[] = [];
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  currentSortColumn: string = '';
  

  constructor() {}

  ngOnInit(): void {
    this.filteredCourses = [...this.courses];
  }

  sortBy(column: string): void {
    if (this.currentSortColumn === column) {
      this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortColumn = column;
      this.sortDirection[column] = 'asc';
    }
  
    const direction = this.sortDirection[column];
  
    this.filteredCourses.sort((a, b) => {
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
  
    this.filteredCourses = this.courses.filter(course =>
      course.name.toLowerCase().includes(search) ||
      course.code.toLowerCase().includes(search)
    );
  
    if (this.currentSortColumn) {
      this.sortBy(this.currentSortColumn); // re-apply sort after filtering
    }
  }
  

}
