import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassesComponent } from './classes/classes.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { StudentsComponent } from './students/students.component';
import { AdminComponent } from './admin/admin.component';
import { TeachersDashboardComponent } from './teachers-dashboard/teachers-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ElearningComponent } from './elearning/elearning.component';
import { PresentationComponent } from './presentation/presentation.component';


const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'classes', component: ClassesComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: 'afterLogin' , component: AfterLoginComponent},
  {path: 'teachers-dashboard' , component: TeachersDashboardComponent},
  {path: 'student-dashboard' , component: StudentDashboardComponent},
  {path: 'e-learning' , component: ElearningComponent},
  {path: 'presentation' , component: PresentationComponent},
  {path: 'presentation/:className' , component: PresentationComponent},
  {path: 'e-learning/:className' , component: ElearningComponent},
  { path: 'student-dashboard/:studentMobile/:className', component: StudentDashboardComponent }

  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
