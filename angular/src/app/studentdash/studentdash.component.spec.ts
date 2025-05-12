import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentdashComponent } from './studentdash.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { TutorSearchComponent } from '../tutor-search/tutor-search.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { BookedSessionsStudentComponent } from '../booked-sessions-student/booked-sessions-student.component';

describe('Sanity check', () => {
  it('runs a dummy test', () => {
    expect(true).toBeTrue();
  });
});

describe('StudentdashComponent', () => {
  let component: StudentdashComponent;
  let fixture: ComponentFixture<StudentdashComponent>;
  let mockProfileService: jasmine.SpyObj<ProfileService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockProfileService = jasmine.createSpyObj('ProfileService', ['getProfile']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [StudentdashComponent, TutorSearchComponent, CourseListComponent, BookedSessionsStudentComponent],
      providers: [
        { provide: ProfileService, useValue: mockProfileService },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentdashComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load profile on init', () => {
    const mockProfile = { first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com' };
    mockProfileService.getProfile.and.returnValue(of(mockProfile));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.name).toBe('Alice Smith');
    expect(component.email).toBe('alice@example.com');
  });

  it('should log error if profile fails to load', () => {
    spyOn(console, 'error');
    mockProfileService.getProfile.and.returnValue(throwError(() => new Error('Profile load failed')));

    fixture.detectChanges(); // triggers ngOnInit

    expect(console.error).toHaveBeenCalledWith('Failed to load profile', jasmine.any(Error));
  });

  it('should toggle menu', () => {
    expect(component.menuOpen).toBeFalse();
    component.toggleMenu();
    expect(component.menuOpen).toBeTrue();
    component.toggleMenu();
    expect(component.menuOpen).toBeFalse();
  });

  it('should change active tab', () => {
    component.setActiveTab('courses');
    expect(component.activeTab).toBe('courses');
  });

  it('should navigate to login on logout', () => {
    component.logout();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should update profile image on file upload', () => {
    const dummyFile = new Blob([''], { type: 'image/png' });
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'profileUpload';
    document.body.appendChild(fileInput);

    const file = new File([dummyFile], 'test.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });

    const changeEvent = new Event('change');
    const readerSpy = spyOn(window as any, 'FileReader').and.callFake(() => {
      return {
        readAsDataURL: (blob: Blob) => {
          component.profileImage = 'data:image/png;base64,testimage';
          component.profileImage = 'data:image/png;base64,testimage'; // simulate reader result
        },
        onload: null
      };
    });

    component.uploadProfileImage(changeEvent);
    expect(component.profileImage).toContain('data:image/png');
    document.body.removeChild(fileInput);
  });
});
