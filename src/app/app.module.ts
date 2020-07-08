import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, NgZone } from '@angular/core';
import { HomeComponent } from './home/home.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassesComponent } from './classes/classes.component';
import { LoginComponent } from './login/login.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { StudentsComponent } from './students/students.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { TeachersDashboardComponent } from './teachers-dashboard/teachers-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AngularFireDatabaseSchWebProject, AngularFireStorageSchWebProject, AngularFireDatabaseSchAdminProject } from './firebase.factory';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { ElearningComponent } from './elearning/elearning.component';
import { SafePipe } from './SafePipe';
import { PresentationComponent } from './presentation/presentation.component';




@NgModule({
  declarations: [
    AppComponent,
    ClassesComponent,
    HomeComponent,
    LoginComponent,
    AfterLoginComponent,
    StudentsComponent,
    AdminComponent,
    TeachersDashboardComponent,
    StudentDashboardComponent,
    ElearningComponent,
    SafePipe,
    PresentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: 'env',
      useValue: environment
    },
    {
      provide: 'firebaseProject1',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFireDatabaseSchWebProject
    },
    {
      provide: 'firebaseStorageProject1',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFireStorageSchWebProject
    },
    {
      provide: 'firebaseProject2',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFireDatabaseSchAdminProject
    }

  ],
  bootstrap: [AppComponent],

  entryComponents: [
  ]


})
export class AppModule { }
