import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDashboardService } from '../services/student-dashboard.service';
import { AngularFireStorage } from '@angular/fire/storage';

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
  constructor(private activatedRoute: ActivatedRoute, private studentDashboardService: StudentDashboardService,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {

    this.mobileNumber = this.activatedRoute.snapshot.paramMap.get('mobileNumber');
    this.className = this.activatedRoute.snapshot.paramMap.get('className');
    this.studentDashboardService.getStudentDetails(this.className, this.mobileNumber).subscribe((result: any) => {
      console.log(result);
      this.studentName = result[1].payload.val();
    });
    //this.studentDashboardService.getSubjectDetails();
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

}
