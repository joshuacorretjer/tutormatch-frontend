import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TutorregComponent } from './tutorreg/tutorreg.component';
import { StudentregComponent } from './studentreg/studentreg.component';
import { StudentdashComponent } from './studentdash/studentdash.component';
import { TutorDashComponent } from './tutordash/tutordash.component';
import { TutorSearchComponent } from './tutor-search/tutor-search.component';
import { HomepageComponent } from './homepage/homepage.component';


export const routes: Routes = [
    { path: '', component: HomepageComponent }, // Redirect default path to login
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tutorreg', component: TutorregComponent },
    { path: 'studentreg', component: StudentregComponent },
    {path: 'studentdash', component: StudentdashComponent},
    {path: 'tutordash', component: TutorDashComponent},
    {path: 'tutor-search', component: TutorSearchComponent}
];

