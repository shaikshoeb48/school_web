import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { asLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  teacherCode = '';
  adminCode = '';
  codeTeacher = '1234';
  codeAdmin = '1234';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkAdminCode() {
    if (this.adminCode == this.codeAdmin) {
      this.router.navigate(['/students']);
    } else {
      alert('Invalid Code');
    }
  }
  checkTeacherCode() {
    if (this.teacherCode == this.codeTeacher) {
      this.router.navigate(['/teachers-dashboard']);
    } else {
      alert('Invalid Code');
    }
  }
}
