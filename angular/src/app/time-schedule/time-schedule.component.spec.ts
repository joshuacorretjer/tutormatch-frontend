import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TimeScheduleComponent } from './time-schedule.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { of, Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

describe('TimeScheduleComponent', () => {
  let component: TimeScheduleComponent;
  let fixture: ComponentFixture<TimeScheduleComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  let routerEvents$: Subject<any>;

  beforeEach(async () => {
    routerEvents$ = new Subject<any>();

    await TestBed.configureTestingModule({
      imports: [
        TimeScheduleComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/time-schedule',
            events: routerEvents$.asObservable()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeScheduleComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load schedule on init', () => {
    localStorage.setItem('access_token', 'test-token');

    const req = httpMock.expectOne('http://127.0.0.1:5000/api/tutor/availability');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');

    req.flush([{ id: 1, start_time: '2025-05-12T10:00:00Z', end_time: '2025-05-12T11:00:00Z' }]);
    expect(component.schedule.length).toBe(1);
  });

  it('should reload schedule on NavigationEnd event', () => {
    localStorage.setItem('access_token', 'test-token');

    // Simulate navigation event
    routerEvents$.next(new NavigationEnd(1, '/some-path', '/time-schedule'));

    const req = httpMock.expectOne('http://127.0.0.1:5000/api/tutor/availability');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should add a new slot', () => {
    localStorage.setItem('access_token', 'test-token');
    component.slot = { date: new Date('2025-05-12'), time: '10:00' };

    component.addSlot();

    const req = httpMock.expectOne('http://127.0.0.1:5000/api/tutor/availability');
    expect(req.request.method).toBe('POST');

    req.flush({ id: 123, start_time: '...', end_time: '...' });
    expect(component.schedule.length).toBe(1);
    expect(component.slot.time).toBe('');
  });

  it('should remove a slot after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    localStorage.setItem('access_token', 'test-token');
    component.schedule = [{ id: 123, start_time: '...', end_time: '...' }];

    component.removeSlot({ id: 123, start_time: '...', end_time: '...' });

    const req = httpMock.expectOne('http://127.0.0.1:5000/api/tutor/availability/123');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    expect(component.schedule.length).toBe(0);
  });

  it('should not remove slot if user cancels confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.schedule = [{ id: 123, start_time: '...', end_time: '...' }];
    component.removeSlot(component.schedule[0]);

    // No HTTP request should be made
    httpMock.expectNone('http://127.0.0.1:5000/api/tutor/availability/123');
    expect(component.schedule.length).toBe(1);
  });
});
