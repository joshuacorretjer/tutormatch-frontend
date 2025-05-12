import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from '../environments/environment';

interface Tutor {
  id: string;
  name: string;
  hourly_rate: number;
  bio: string;
  average_rating: number;
  upcoming_slots: { id: string, start_time: string, end_time?: string }[]; // end_time is optional
}

@Component({
  selector: 'app-tutor-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tutor-search.component.html',
  styleUrls: ['./tutor-search.component.css']
})
export class TutorSearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  availabilityFilterControl = new FormControl('');
  minRatingFilterControl = new FormControl<number | null>(null);

  page = 1;
  perPage = 10;
  totalTutors = 0;
  tutors: Tutor[] = [];

  studentEmail = '';
  studentName = '';

  selectedTutor: Tutor | null = null;

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.studentEmail = this.authService.getUserEmail() ?? '';
    this.studentName = this.authService.getUserName() ?? '';
    this.fetchTutors();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.page = 1;
        this.fetchTutors();
      });

    this.availabilityFilterControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.page = 1;
        this.fetchTutors();
      });

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
    if (query) params = params.set('query', query);

    const availability = this.availabilityFilterControl.value;
    if (availability) params = params.set('availability', availability);

    const minRating = this.minRatingFilterControl.value;
    if (minRating !== null) params = params.set('min_rating', minRating.toString());

    this.http
      .get<{ tutors: Tutor[]; total: number; page: number; per_page: number }>(
        `${environment.apiUrl}/api/student/tutors`,
        { params }
      )
      .subscribe({
        next: (res) => {
          console.log('API Response:', res); // Debugging the API response

          this.tutors = res.tutors;
          this.totalTutors = res.total;

          // Calculate end_time for each slot if not available
          this.tutors.forEach((tutor) => {
            tutor.upcoming_slots.forEach((slot) => {
              if (!slot.end_time) {
                const startTime = new Date(slot.start_time);
                const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
                slot.end_time = endTime.toISOString();
              }
            });
          });

          console.log('Processed Tutors:', this.tutors); // Debugging the processed tutor data
        },
        error: (err) => {
          console.error('Failed to load tutors:', err);
        },
      });
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

  openSlotPopup(tutor: Tutor): void {
    this.selectedTutor = tutor;
  }

  closeSlotPopup(): void {
    this.selectedTutor = null;
  }

  bookSession(slotId: string): void {
    const data = { slot_id: slotId };

    this.http.post(`${environment.apiUrl}/api/student/sessions`, data).subscribe(
      (response: any) => {
        if (response.message === 'Session booked') {
          console.log('Session booked successfully:', response);
          alert('Session booked successfully!');
          console.log('Session ID:', response.session_id);

          // ✅ Remove the booked slot from the selectedTutor's slots
          if (this.selectedTutor) {
            this.selectedTutor.upcoming_slots = this.selectedTutor.upcoming_slots.filter(slot => slot.id !== slotId);
          }

          // Optionally close the modal if all slots are booked
          if (this.selectedTutor?.upcoming_slots.length === 0) {
            this.closeSlotPopup();
          }
        } else {
          console.error('Booking failed:', response);
          alert('Failed to book the session. Please try again.');
        }
      },
      (error) => {
        console.error('Error during booking:', error);
        alert('An error occurred while booking the session. Please try again later.');
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
