import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from '../course-list/course-list.component';
import { SessionRequestsComponent } from '../session-requests/session-requests.component';
import { TimeScheduleComponent } from '../time-schedule/time-schedule.component';


@Component({
  selector: 'app-tutordash',
  standalone: true,
  imports: [CommonModule, CourseListComponent, SessionRequestsComponent, TimeScheduleComponent],
  templateUrl: './tutordash.component.html',
  styleUrl: './tutordash.component.css'
})
export class TutorDashComponent {
  activeTab: string = 'tutors';
  menuOpen = false;
  profileImage: string = 'assets/default-profile.png';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('profileUpload') as HTMLInputElement;
    fileInput?.click();
  }

  uploadProfileImage(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.profileImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  logout() {
    // redirect to homepage/login etc.
  }
}