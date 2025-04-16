import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TutorDashComponent } from './tutordash.component';

describe('TutordashComponent', () => {
  let component: TutorDashComponent;
  let fixture: ComponentFixture<TutorDashComponent>;

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
      imports: [TutorDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
