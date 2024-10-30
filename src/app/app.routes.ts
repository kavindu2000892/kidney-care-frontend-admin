import { Routes } from '@angular/router';
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SignupComponent } from "./components/signup/signup.component";
import {DoctorComponent} from "./components/doctor/doctor.component";
import {NurseComponent} from "./components/nurse/nurse.component";
import {PatientComponent} from "./components/patient/patient.component";
import {TreatmentComponent} from "./components/treatment/treatment.component";
import {RoutineComponent} from "./components/routine/routine.component";
import {SignsComponent} from "./components/signs/signs.component";
import {VisitsComponent} from "./components/visits/visits.component";
import {SummeryComponent} from "./components/summery/summery.component";
import {UpcomingComponent} from "./components/upcoming/upcoming.component";

import { authGuard } from "./guards/auth.guard"; // Ensure the guard is correctly imported

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, canActivate: [authGuard] }, // AuthGuard added for login
  { path: 'signup', component: SignupComponent, canActivate: [authGuard] },  // AuthGuard added for signup
  { path: 'dashboard', component: DashboardComponent }, // AuthGuard for dashboard
   {path:'doctors', component:DoctorComponent},
   {path:'nurses' , component:NurseComponent} ,
   {path:'patient' , component:PatientComponent},
   {path:'treatment' , component:TreatmentComponent},
   {path:'routine' , component:RoutineComponent},
   {path:'signs' , component:SignsComponent},
   {path:'visits' , component:VisitsComponent},
   {path:'summery' , component:SummeryComponent},
   {path:'upcoming' , component:UpcomingComponent},
];
