import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {

  // constructor(private db: AngularFireDatabase) { }
  constructor(@Inject('firebaseProject1') private db: AngularFireDatabase) { }


  getStudentDetails(className, mobileNumber) {
    return this.db.list('classes/' + className + '/students' + '/' + mobileNumber).snapshotChanges();
  }
 
  getNotes(className, subjectName): Observable<any> {
    return this.db.list('classes/' + className + '/' + subjectName + '/notes').snapshotChanges();

  }
    getResources(className, subjectName): Observable<any> {
      //console.log(className);
      return this.db.list('classes/' + className + '/' + subjectName + '/resources').snapshotChanges();
  
    }
  
}
