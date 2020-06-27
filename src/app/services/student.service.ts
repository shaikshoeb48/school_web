import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  classes: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { }

  getClasses() {
    return this.db.list('classes', ref => ref.orderByValue()).snapshotChanges();
  }

  uploadDataToAfs(value, classNumber) {


    // const shaHash = sha512.sha512_256(value.email);
    const userRef = this.db.object('classes/' + classNumber + '/students/' + value.studentMobile);

    return userRef.update(value).then((result) => {
      console.log('saved');
      console.log('success', result);
      return result;

    });

  }

  getStudentData(className) {
    console.log(className);
    return this.db.list('classes/' + className+'/students').valueChanges();
  }


  // editStudent(studentDetails, classNumber) {

  // }

  deleteStudent(classNumber, studentMobile) {

    //this.db.object('classes/' + classNumber + '/' + studentMobile).remove();

    const itemRef = this.db.object('classes/' + classNumber + '/students/' + studentMobile);
    itemRef.remove();

  }

  addNotification(notification) {
    // const shaHash = sha512.sha512_256(value.email);
    const date = Date.now();
    console.log(date);
    const userRef = this.db.object('notifications/' + date);

    return userRef.update(notification).then((result) => {
      console.log('notification saved');
      return result;

    });
  }

}
