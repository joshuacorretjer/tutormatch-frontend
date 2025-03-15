import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorreg',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tutorreg.component.html',
  styleUrl: './tutorreg.component.css'
})
export class TutorregComponent {
  constructor(private router: Router) { }

  onSubmit() {
    // Perform any form validation or API calls if needed
    console.log('Sign-up successful');

    this.router.navigate(['/tutordash']);
  }


}
