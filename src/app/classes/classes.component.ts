import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

 mobileNumber;
 value;
 data : {
   8074318421
 };

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  focusoutHandler(refVar) {
    console.log(refVar.value);
    this.value = refVar.value;
}

  rotate(){
    console.log(this.value)
    if(this.value == 8074318421 || this.value == 9133425894){
      console.log("yesssss");
      this.router.navigate(['afterLogin'])
    } else{
      window.alert(" Invalid Number")
    }
  }

}
