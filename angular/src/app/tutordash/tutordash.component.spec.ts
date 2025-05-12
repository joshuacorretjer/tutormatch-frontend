import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TutorDashComponent } from './tutordash.component';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { of, throwError } from 'rxjs';

describe('TutorDashComponent', () => {
  let component: TutorDashComponent;
  let fixture: ComponentFixture<TutorDashComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockProfileService: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockProfileService = jasmine.createSpyObj('ProfileService', ['getProfile']);

    await TestBed.configureTestingModule({
      imports: [TutorDashComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ProfileService, useValue: mockProfileService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorDashComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load profile on init', () => {
    const mockProfile = { first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com' };
    mockProfileService.getProfile.and.returnValue(of(mockProfile));

    component.ngOnInit();

    expect(component.name).toBe('Jane Doe');
    expect(component.email).toBe('jane@example.com');
  });

  it('should handle profile load error', () => {
    spyOn(console, 'error');
    mockProfileService.getProfile.and.returnValue(throwError(() => new Error('Failed')));

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Failed to load profile', jasmine.any(Error));
  });

  it('should set active tab', () => {
    component.setActiveTab('sessions');
    expect(component.activeTab).toBe('sessions');
  });

  it('should toggle menu', () => {
    const initial = component.menuOpen;
    component.toggleMenu();
    expect(component.menuOpen).toBe(!initial);
  });

  it('should trigger file input click', () => {
    const clickSpy = jasmine.createSpy('click');
    const mockInput = { click: clickSpy } as any;
    spyOn(document, 'getElementById').and.returnValue(mockInput);

    component.triggerFileInput();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should upload profile image', fakeAsync(() => {
    const fileContent = 'data:image/png;base64,FAKE_IMAGE';
    const file = new File([fileContent], 'test.png', { type: 'image/png' });
    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    const readerMock = {
      readAsDataURL: jasmine.createSpy('readAsDataURL'),
      onload: null as ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null,
      result: 'data:image/png;base64,FAKE_IMAGE_RESULT'
    };

    spyOn(window as any, 'FileReader').and.returnValue(readerMock);

    component.uploadProfileImage(event);

    if (readerMock.onload) {
      readerMock.onload({} as ProgressEvent<FileReader>);
    }

    expect(component.profileImage).toBe('data:image/png;base64,FAKE_IMAGE_RESULT');
  }));

  it('should navigate to login on logout', () => {
    component.logout();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
