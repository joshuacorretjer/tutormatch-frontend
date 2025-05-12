import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentregComponent } from './studentreg.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentregComponent', () => {
  let component: StudentregComponent;
  let fixture: ComponentFixture<StudentregComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentregComponent, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentregComponent);
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

  it('should show error message if passwords do not match', () => {
    component.password = '12345';
    component.confirmPassword = '54321';

    component.onSubmit();

    expect(component.errorMessage).toBe('Passwords do not match');
  });

  it('should send registration request and navigate on success', () => {
    spyOn(window, 'alert');
    const navigateSpy = spyOn(router, 'navigate');

    component.username = 'student123';
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.email = 'john@example.com';
    component.password = 'abc123';
    component.confirmPassword = 'abc123';
    component.major = 'Computer Science';
    component.year = 2;

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:5000/api/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.username).toBe('student123');
    req.flush({});

    expect(window.alert).toHaveBeenCalledWith('Student registered successfully!');
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should show error message on registration failure', () => {
    component.username = 'student123';
    component.firstName = 'Jane';
    component.lastName = 'Smith';
    component.email = 'jane@example.com';
    component.password = 'abc123';
    component.confirmPassword = 'abc123';
    component.major = 'Math';
    component.year = 3;

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:5000/api/register');
    req.flush('Error', { status: 400, statusText: 'Bad Request' });

    expect(component.errorMessage).toBe('Registration failed.');
  });
});
