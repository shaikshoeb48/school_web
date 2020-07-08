import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { NotificationService } from '../services/notification.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  list = [];
  notifications: any;
  constructor(private elementRef:ElementRef,private route: Router, private notificationService: NotificationService,
    @Inject('firebaseProject2') private db: AngularFireDatabase) { }
  //  constructor() { }


  ngOnInit(): void {

    this.notificationService.getNotifications().subscribe((result) => {
      console.log(result);
      this.notifications = result;
    });


    // this.db.list('vid-links').valueChanges().subscribe((result) => {
    //   console.log(result);
    //   this.list = result;
    // })

  }

  deleteNotification(notification) {
    this.notificationService.deleteNotification(notification);


  }


  ngAfterViewInit() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://sdk.canva.com/v1/embed.js";
    s.crossOrigin="anonymous";
    this.elementRef.nativeElement.appendChild(s);
  }

}
