import { Component, OnInit, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { class6Subjects, class7Subjects, class8Subjects, class9Subjects, class10Subjects } from '../subject';
import { class6Chapters } from '../chapter';
import { class7Chapters } from '../class-7-chapters';
import { class8Chapters } from '../class-8-chapters';
import { class9Chapters } from '../class-9-chapters';
import { class10Chapters } from '../class-10-chapters';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {
className = '';
subjects = [];
subjectName = '';
chapters = [];
chapter = '';
presentations = [];
  constructor(private elementRef: ElementRef,private activatedRoute: ActivatedRoute,@Inject('firebaseProject2') private db: AngularFireDatabase,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
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

  }
  ngAfterViewInit() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://sdk.canva.com/v1/embed.js";
    s.crossOrigin="anonymous";
    this.elementRef.nativeElement.appendChild(s);
  }

  onSelectSubjectChange($event) {
    this.subjectName = $event.target.value;
    console.log(this.className);
    if (this.className == 'class-6') {
      class6Chapters.forEach(chapter => {
        if (chapter.subject == $event.target.value) {
          console.log(chapter.chapters);
          this.chapters = chapter.chapters;
        }
      });
    }
    if (this.className == 'class-7') {
      class7Chapters.forEach(chapter => {
        if (chapter.subject == $event.target.value) {
          console.log(chapter.chapters);
          this.chapters = chapter.chapters;
        }
      });
    }
    if (this.className == 'class-8') {
      class8Chapters.forEach(chapter => {
        if (chapter.subject == $event.target.value) {
          console.log(chapter.chapters);
          this.chapters = chapter.chapters;
        }
      });
    }
    if (this.className == 'class-9') {
      class9Chapters.forEach(chapter => {
        if (chapter.subject == $event.target.value) {
          console.log(chapter.chapters);
          this.chapters = chapter.chapters;
        }
      });
    }
    if (this.className == 'class-10') {
      class10Chapters.forEach(chapter => {
        if (chapter.subject == $event.target.value) {
          console.log(chapter.chapters);
          this.chapters = chapter.chapters;
        }
      });
    }

  }

  onSelectChapterChange($event) {
    this.chapter = $event.target.value;
    this.db.list(this.className + '/' + this.subjectName + '/' + this.chapter + '/presentation-links/').valueChanges().subscribe((result) => {
      console.log(result);
      ///this.list = [];
      // this.list = result;
      // const video = [];
      // result.forEach((element: any) => {
      //   video['title'] = element['title'];
      //   element = element['link'].split('/watch?v=');
      //   element = element[0] + '/embed/' + element[1];
      //   video['link'] = element;
      //   this.list.push(video);
      //   console.log(element);
      // });

      this.presentations = result;
      this.cdr.detectChanges();
      this.ngAfterViewInit();
    });
  }

}
