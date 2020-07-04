import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-elearning',
  templateUrl: './elearning.component.html',
  styleUrls: ['./elearning.component.css']
})
export class ElearningComponent implements OnInit {
  className = '';
  list = [];
  constructor(@Inject('firebaseProject2') private db: AngularFireDatabase, private _sanitizer: DomSanitizer, 
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.className = this.activatedRoute.snapshot.paramMap.get('className');

    this.db.list(this.className + '/video-links').valueChanges().subscribe((result) => {
      console.log(result);
      this.list = [];
      // this.list = result;
      result.forEach((element: any) => {
        element = element['link'].split('/watch?v=');
        element = element[0] + '/embed/' + element[1];
        this.list.push(element);
        console.log(element);
      });

    });

  }
  // getSanitizedResourceURL(){
  //   const newList = [];
  //   this.list.forEach(element => {
  //     newList.push(this._sanitizer.bypassSecurityTrustResourceUrl(element['link']));
  //   });
  //   this.list = newList;
  // }
}
