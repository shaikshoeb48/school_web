import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private db: AngularFireDatabase) { }

  getStudentDetails(mobileNumber, className) {
    return this.db.object('classes/' + className + '/' + mobileNumber).valueChanges();
  }

}
