import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TutorregComponent } from './tutorreg.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('TutorregComponent', () => {
  let component: TutorregComponent;
  let fixture: ComponentFixture<TutorregComponent>;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [TutorregComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorregComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set error message if passwords do not match', () => {
    component.password = 'test123';
    component.confirmPassword = 'wrong123';
    component.onSubmit();
    expect(component.errorMessage).toBe('Passwords do not match');
  });

  it('should make HTTP POST on valid form and navigate to login', fakeAsync(() => {
    component.username = 'tutor1';
    component.firstName = 'Test';
    component.lastName = 'User';
    component.email = 'test@example.com';
    component.password = 'pass123';
    component.confirmPassword = 'pass123';
    component.hourlyRate = 25;
    component.extraInfo = 'Bio';

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:5000/api/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.username).toBe('tutor1');

    req.flush({});  // simulate success

    tick();  // simulate async delay
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should set errorMessage on registration error', fakeAsync(() => {
    component.password = component.confirmPassword = 'pass123';
    component.username = 'tutor1';
    component.email = 'fail@example.com';

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:5000/api/register');
    req.flush('Error', { status: 400, statusText: 'Bad Request' });

    tick();
    expect(component.errorMessage).toBe('Registration failed');
  }));
});
