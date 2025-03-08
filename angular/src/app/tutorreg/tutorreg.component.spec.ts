import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorregComponent } from './tutorreg.component';

describe('TutorregComponent', () => {
  let component: TutorregComponent;
  let fixture: ComponentFixture<TutorregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorregComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
