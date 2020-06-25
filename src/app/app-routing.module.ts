import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassesComponent } from './classes/classes.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { StudentsComponent } from './students/students.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'classes', component: ClassesComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: 'afterLogin' , component: AfterLoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
