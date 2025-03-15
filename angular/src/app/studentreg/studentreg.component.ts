import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentreg',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './studentreg.component.html',
  styleUrl: './studentreg.component.css'
})
export class StudentregComponent {
  constructor(private router: Router) { }

  onSubmit() {
    // Perform any form validation or API calls if needed
    console.log('Sign-up successful');

    this.router.navigate(['/studentdash']);
  }

}
