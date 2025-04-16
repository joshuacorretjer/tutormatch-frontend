import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StudentdashComponent } from './studentdash.component';

describe('StudentdashComponent', () => {
  let component: StudentdashComponent;
  let fixture: ComponentFixture<StudentdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    providers: [
      {
      provide: ActivatedRoute,
      useValue: {
        params: of({}),
        snapshot: { paramMap: {} }
      }
    }
    ],
      imports: [StudentdashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
