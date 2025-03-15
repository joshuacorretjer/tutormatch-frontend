import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutordashComponent } from './tutordash.component';

describe('TutordashComponent', () => {
  let component: TutordashComponent;
  let fixture: ComponentFixture<TutordashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutordashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutordashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
