import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDashboardService } from '../services/student-dashboard.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { class6Subjects, class7Subjects, class8Subjects, class9Subjects, class10Subjects } from '../subject';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  studentName = '';
  mobileNumber = '';
  className = '';
  notes = [];
  resources = [];
  link = '';
  showLink = false;
  subjects = [];
  // constructor(private activatedRoute: ActivatedRoute, private studentDashboardService: StudentDashboardService,
  // private storage: AngularFireStorage) { }
  constructor(private activatedRoute: ActivatedRoute, private studentDashboardService: StudentDashboardService,
    @Inject('firebaseStorageProject1') private storage: AngularFireStorage, private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user == '' || user == null) {
      alert('Please login');
      this.router.navigate(['classes']);

    }
    console.log(user);
    this.mobileNumber = this.activatedRoute.snapshot.paramMap.get('mobileNumber');
    this.className = this.activatedRoute.snapshot.paramMap.get('className');
    if (this.className == 'class-6') {
      this.subjects = class6Subjects.subjects;
    }
    if (this.className == 'class-7') {
      this.subjects = class7Subjects.subjects;
    }
    if (this.className == 'class-8') {
      this.subjects = class8Subjects.subjects;
    }
    if (this.className == 'class-9') {
      this.subjects = class9Subjects.subjects;
    }
    if (this.className == 'class-10') {
      this.subjects = class10Subjects.subjects;
    }



    this.studentDashboardService.getStudentDetails(this.className, this.mobileNumber).subscribe((result: any) => {
      console.log(result);
      this.studentName = result[1].payload.val();
    });
    // this.studentDashboardService.getSubjectDetails();
  }

  onSelectSubjectChange($event) {

    this.studentDashboardService.getNotes(this.className, $event.target.value).subscribe((result) => {
      for (let index = 0; index < result.length; index++) {
        console.log(result[index]);
        console.log(result[index].payload.val().fileName);
        const fileName = result[index].payload.val().fileName;
        this.storage.ref(fileName).getDownloadURL().subscribe(url => {
          console.log(url);
          result[index].fileLink = url;

          console.log(result[index].fileLink);
        });

      }
      this.notes = result;
    });
    this.studentDashboardService.getResources(this.className, $event.target.value).subscribe((result) => {
      this.resources = result;
      console.log(result);
    });
  }

  downloadFile(fileLink, fileName) {
    FileSaver.saveAs(fileLink, fileName);
  }
  linkIsYoutube(resourceName) {
    const str: string = resourceName;
    const substring = 'youtube';
    return str.toLowerCase().includes(substring);
  }

  setResourceName(link) {

    link = link.split('/watch?v=');
    link = link[0] + '/embed/' + link[1];
    this.link = link;
    this.showLink = true;
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('mobileNumber');
    localStorage.removeItem('className');
    this.router.navigate(['classes']);
  }
}
