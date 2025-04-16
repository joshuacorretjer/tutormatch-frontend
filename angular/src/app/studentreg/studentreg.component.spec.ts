import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentregComponent } from './studentreg.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('StudentregComponent', () => {
  let component: StudentregComponent;
  let fixture: ComponentFixture<StudentregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StudentregComponent ],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: { paramMap: {} }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty input fields initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect((compiled.querySelector('#name') as HTMLInputElement).value).toBe('');
    expect((compiled.querySelector('#email') as HTMLInputElement).value).toBe('');
    expect((compiled.querySelector('#password') as HTMLInputElement).value).toBe('');
  });

  it('should call onSubmit when button is clicked', () => {
    spyOn(component, 'onSubmit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
