import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSessionFormComponent } from './book-session-form.component';

describe('BookSessionFormComponent', () => {
  let component: BookSessionFormComponent;
  let fixture: ComponentFixture<BookSessionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSessionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
