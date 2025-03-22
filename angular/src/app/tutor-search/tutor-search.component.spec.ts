import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSearchComponent } from './tutor-search.component';

describe('TutorSearchComponent', () => {
  let component: TutorSearchComponent;
  let fixture: ComponentFixture<TutorSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
