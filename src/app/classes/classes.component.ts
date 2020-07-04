import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../services/classes.service';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  mobileNumber;
  className;
  value;
  data: {
    8074318421
  };
  message = '';

  numbertext = '';

  constructor(private router: Router, private classesService: ClassesService) { }

  ngOnInit(): void {
  }

  focusoutHandler(refVar) {
    console.log(refVar.value);
    this.mobileNumber = refVar.value;
  }

  async rotate() {
    console.log(this.mobileNumber);

    await this.classesService.getStudentDetails(this.mobileNumber, this.className).subscribe((result) => {
      if (result == null) {
        alert('No record found');

      } else {
        this.message = 'Success';
        this.numbertext = '';
        alert('Success');
        // this.router.navigate(['afterLogin']);
        // this.router.navigate(['student-dashboard',this.mobileNumber,this.className]);
        // this.router.navigate(['game', { mobileNumber: this.mobileNumber, className: this.className }]);
        console.log(this.mobileNumber, this.className);
        this.router.navigate(['student-dashboard', { mobileNumber: this.mobileNumber, className: this.className }]);
      }
    });


    // if (this.value == 8074318421 || this.value == 9133425894) {
    //   console.log("yesssss");
    //   this.router.navigate(['afterLogin'])
    // } else {
    //   window.alert(" Invalid Number")
    // }
  }

  storeButtonText($event) {
    console.log($event.target.textContent);
    this.className = $event.target.textContent;
  }

}
