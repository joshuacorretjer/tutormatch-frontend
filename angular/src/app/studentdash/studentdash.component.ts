import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { TutorSearchComponent } from '../tutor-search/tutor-search.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { BookedSessionsComponent } from '../booked-sessions/booked-sessions.component';

@Component({
  selector: 'app-studentdash',
  standalone: true,
  imports: [RouterModule, CommonModule, TutorSearchComponent, CourseListComponent, BookedSessionsComponent],
  templateUrl: './studentdash.component.html',
  styleUrl: './studentdash.component.css'
})
export class StudentdashComponent {
  menuOpen = false;
  profileImage: string = 'assets/images/profile.jpg';
  activeTab: string = 'home';

  constructor(private router: Router) {}

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
