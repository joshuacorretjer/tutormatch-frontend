import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TutorSearchComponent } from './tutor-search.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

describe('TutorSearchComponent', () => {
  let component: TutorSearchComponent;
  let fixture: ComponentFixture<TutorSearchComponent>;
  let httpMock: HttpTestingController;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      getUserEmail: () => 'student@example.com',
      getUserName: () => 'Student Name'
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [TutorSearchComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorSearchComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges(); // triggers ngOnInit
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tutors on init', fakeAsync(() => {
    const mockTutors = [
      {
        id: '1',
        name: 'Tutor One',
        hourly_rate: 50,
        bio: 'Math tutor',
        average_rating: 4.5,
        upcoming_slots: [{ id: 's1', start_time: new Date().toISOString() }]
      }
    ];

    const req = httpMock.expectOne((req) =>
      req.url === 'http://127.0.0.1:5000/api/student/tutors'
    );
    expect(req.request.method).toBe('GET');

    req.flush({
      tutors: mockTutors,
      total: 1,
      page: 1,
      per_page: 10
    });

    tick();

    expect(component.tutors.length).toBe(1);
    expect(component.totalTutors).toBe(1);
    expect(component.tutors[0].name).toBe('Tutor One');
    expect(component.tutors[0].upcoming_slots[0].end_time).toBeDefined();
  }));

  it('should navigate pages correctly', fakeAsync(() => {
    component.totalTutors = 30;
    component.perPage = 10;
    component.page = 1;

    component.nextPage();
    let req = httpMock.expectOne((req) => req.url.includes('/api/student/tutors'));
    expect(component.page).toBe(2);
    req.flush({ tutors: [], total: 30, page: 2, per_page: 10 });
    tick();

    component.prevPage();
    req = httpMock.expectOne((req) => req.url.includes('/api/student/tutors'));
    expect(component.page).toBe(1);
    req.flush({ tutors: [], total: 30, page: 1, per_page: 10 });
    tick();
  }));

  it('should book a session and update the tutor’s slots', fakeAsync(() => {
    const slotId = 's1';
    component.selectedTutor = {
      id: '1',
      name: 'Tutor One',
      hourly_rate: 50,
      bio: '',
      average_rating: 5,
      upcoming_slots: [
        { id: slotId, start_time: new Date().toISOString(), end_time: undefined }
      ]
    };

    spyOn(window, 'alert');

    component.bookSession(slotId);
    const req = httpMock.expectOne('http://127.0.0.1:5000/api/student/sessions');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.slot_id).toBe(slotId);

    req.flush({ message: 'Session booked', session_id: 'session123' });
    tick();

    expect(window.alert).toHaveBeenCalledWith('Session booked successfully!');
    expect(component.selectedTutor.upcoming_slots.length).toBe(0);
    expect(component.selectedTutor).toBeNull(); // modal closed
  }));

  it('should clean up subscriptions on destroy', () => {
    const nextSpy = spyOn(component['destroy$'], 'next');
    const completeSpy = spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
