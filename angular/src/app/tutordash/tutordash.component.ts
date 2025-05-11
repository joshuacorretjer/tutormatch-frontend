import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from '../course-list/course-list.component';
import { BookedSessionsTutorComponent } from '../booked-sessions-tutor/booked-sessions-tutor.component';
import { TimeScheduleComponent } from '../time-schedule/time-schedule.component';
import { RouterModule, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-tutordash',
  standalone: true,
  imports: [RouterModule, CommonModule, CourseListComponent, BookedSessionsTutorComponent, TimeScheduleComponent],
  templateUrl: './tutordash.component.html',
  styleUrl: './tutordash.component.css'
})
export class TutorDashComponent implements OnInit {
  activeTab = 'tutors';
  menuOpen = false;
  profileImage = 'assets/default-profile.png';
  name = '';
  email = '';

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.name = `${data.first_name} ${data.last_name}`;
        this.email = data.email;
      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });
  }

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
    console.log('Logout');
    this.router.navigate(['/login']);
  }
}