import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TutorSearchComponent } from '../tutor-search/tutor-search.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { BookedSessionsStudentComponent } from '../booked-sessions-student/booked-sessions-student.component';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-studentdash',
  standalone: true,
  imports: [RouterModule, CommonModule, TutorSearchComponent, CourseListComponent, BookedSessionsStudentComponent],
  templateUrl: './studentdash.component.html',
  styleUrl: './studentdash.component.css'
})
export class StudentdashComponent implements OnInit {
  menuOpen = false;
  profileImage = 'assets/images/profile.jpg';
  activeTab = 'home';
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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    console.log('Logout');
    this.router.navigate(['/login']);
  }

  triggerFileInput(): void {
    const input = document.getElementById('profileUpload') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  uploadProfileImage(event: Event) {
    const input = document.getElementById('profileUpload') as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.profileImage = e.target?.result as string || this.profileImage;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
