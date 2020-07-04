import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { async } from '@angular/core/testing';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  classes = [];
  studentForm: FormGroup;
  classNumber: string;
  students = [];
  studentName: string;
  studentMobile: string;
  isEdit = false;
  notificationForm: FormGroup;
  notifications: any;
  constructor(private studentService: StudentService, private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.studentForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      studentMobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      //classNumber: ['', Validators.required],
    });

    this.notificationForm = this.formBuilder.group({
      notification: ['', Validators.required],
    });

    // this.studentService.getClasses().subscribe(action => {
    //   //this.classes = action;
    //   console.log(action);
    //   this.classes = [];
    //   action.forEach(element => {
    //     const num = Number(element.key.split('-')[1]);
    //     console.log(num);
    //     if (num >= 6) {
    //       this.classes.push(element);
    //     }

    //   });

    // });

    this.notificationService.getNotifications().subscribe((result) => {
      console.log(result);
      this.notifications = result;
    });

  }


  onFormSubmit() {

    // if (this.isEdit) {

    //   this.studentService.editStudent(this.studentForm.value,this.classNumber);
    //   this.isEdit = false;
    //   return;
    // }

    console.log(this.studentForm.value);
    this.studentService.uploadDataToAfs(this.studentForm.value, this.classNumber).then(_ => {
      alert('Data Saved Successfully');
      this.studentForm.reset();
    });
  }

  onSelectChange($event) {
    this.classNumber = $event.target.value;
    console.log($event.target.value);
    this.studentService.getStudentData(this.classNumber).subscribe((result) => {
      console.log('result', result);
      this.students = result;

    });
  }
  async confirmDelete(student) {
    const isDelete = confirm('Are you sure want to delete it?');

    if (isDelete) {
      this.studentService.deleteStudent(this.classNumber, student.studentMobile);
    }
    return;
  }

  setEditParams(student) {
    this.studentName = student.studentName;
    this.studentMobile = student.studentMobile;
    this.isEdit = true;
  }

  cleanInputs() {
    this.studentName = '';
    this.studentMobile = '';
  }

  onNotifySubmit() {
    this.studentService.addNotification(this.notificationForm.value).then((result) => {

      alert('Notification Added Successfully');
      this.notificationForm.reset();
    }).catch((err) => {
      alert('Some error occured');
    });

  }
  deleteNotification(notification) {
    this.notificationService.deleteNotification(notification);


  }
}
