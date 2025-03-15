import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-studentdash',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './studentdash.component.html',
  styleUrl: './studentdash.component.css'
})
export class StudentdashComponent {
  menuOpen = false;
  profileImage: string = 'assets/images/profile.jpg';

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

}
