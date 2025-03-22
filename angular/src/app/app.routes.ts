import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TutorregComponent } from './tutorreg/tutorreg.component';
import { StudentregComponent } from './studentreg/studentreg.component';
import { StudentdashComponent } from './studentdash/studentdash.component';
import { TutordashComponent } from './tutordash/tutordash.component';
import { TutorSearchComponent } from './tutor-search/tutor-search.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect default path to login
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tutorreg', component: TutorregComponent },
    { path: 'studentreg', component: StudentregComponent },
    {path: 'studentdash', component: StudentdashComponent},
    {path: 'tutordash', component: TutordashComponent},
    {path: 'tutor-search', component: TutorSearchComponent}
];

