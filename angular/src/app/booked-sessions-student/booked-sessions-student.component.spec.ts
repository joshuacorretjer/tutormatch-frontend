import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedSessionsStudentComponent } from './booked-sessions-student.component';

describe('BookedSessionsStudentComponent', () => {
  let component: BookedSessionsStudentComponent;
  let fixture: ComponentFixture<BookedSessionsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedSessionsStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedSessionsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
