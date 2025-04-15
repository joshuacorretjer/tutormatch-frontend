import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-time-schedule',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './time-schedule.component.html',
  styleUrl: './time-schedule.component.css'
})
export class TimeScheduleComponent {
  schedule: { date: Date; time: string }[] = [];
  slot = { date: new Date(), time: '' };

  addSlot() {
    if (this.slot.date && this.slot.time) {
      this.schedule.push({ ...this.slot });
      this.slot = { date: new Date(), time: '' };
    }
  }

  removeSlot(slot: any) {
    this.schedule = this.schedule.filter(s => s !== slot);
  }
}
