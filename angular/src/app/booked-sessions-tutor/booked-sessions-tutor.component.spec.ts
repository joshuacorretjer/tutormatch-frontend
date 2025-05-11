import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedSessionsTutorComponent } from './booked-sessions-tutor.component';

describe('BookedSessionsTutorComponent', () => {
  let component: BookedSessionsTutorComponent;
  let fixture: ComponentFixture<BookedSessionsTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedSessionsTutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedSessionsTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
