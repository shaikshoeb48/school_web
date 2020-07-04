import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  // constructor(private db: AngularFireDatabase) { }
  constructor(@Inject('firebaseProject1') private db: AngularFireDatabase) { }
  

  getStudentDetails(mobileNumber, className) {
    console.log('get student deetails');
    return this.db.object('classes/' + className + '/students/' + mobileNumber).valueChanges();
  }

}
