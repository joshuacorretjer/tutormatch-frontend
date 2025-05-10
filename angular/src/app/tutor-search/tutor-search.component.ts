import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BookSessionFormComponent } from '../book-session-form/book-session-form.component';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

interface Tutor {
  id: string;
  name: string;
  hourly_rate: number;
  bio: string;
  average_rating: number;
  upcoming_slots: string[];
}

@Component({
  selector: 'app-tutor-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BookSessionFormComponent],
  templateUrl: './tutor-search.component.html',
  styleUrls: ['./tutor-search.component.css']
})
export class TutorSearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  availabilityFilterControl = new FormControl(''); // Reactive form for availability
  minRatingFilterControl = new FormControl<number | null>(null); // Reactive form for rating

  page = 1;
  perPage = 10;
  totalTutors = 0;

  tutors: Tutor[] = [];

  studentEmail = '';
  studentName = '';

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    // Ensure student info is correctly fetched from localStorage
    this.studentEmail = this.authService.getUserEmail() ?? '';
    this.studentName = this.authService.getUserName() ?? '';
    this.fetchTutors();

    // Listen to search input with debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.page = 1;
        this.fetchTutors();
      });

    // Listen to availability filter changes
    this.availabilityFilterControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.page = 1;
        this.fetchTutors();
      });

    // Listen to min rating filter changes
    this.minRatingFilterControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.page = 1;
        this.fetchTutors();
      });
  }

  fetchTutors(): void {
    let params = new HttpParams()
      .set('page', this.page)
      .set('per_page', this.perPage);

    const query = this.searchControl.value ?? '';
    if (query) {
      params = params.set('query', query);
    }

    const availability = this.availabilityFilterControl.value;
    if (availability) {
      params = params.set('availability', availability);
    }

    const minRating = this.minRatingFilterControl.value;
    if (minRating !== null) {
      params = params.set('min_rating', minRating.toString());
    }

    // Debugging: Log params before making the API call
    console.log(params.toString());

    this.http
      .get<{ tutors: Tutor[]; total: number; page: number; per_page: number }>(
        'http://127.0.0.1:5000/api/student/tutors',
        { params }
      )
      .subscribe({
        next: (res) => {
          console.log('API response:', res); // Log API response
          this.tutors = res.tutors;
          this.totalTutors = res.total;
          console.log('Tutors:', this.tutors);
        },
        error: (err) => {
          console.error('Failed to load tutors:', err);
        },
      });
  }

  applyFilters(): void {
    this.page = 1;
    this.fetchTutors();
  }

  nextPage(): void {
    if ((this.page * this.perPage) < this.totalTutors) {
      this.page++;
      this.fetchTutors();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchTutors();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}