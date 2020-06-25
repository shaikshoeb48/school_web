import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notifications: any;
  constructor(private route: Router, private notificationService: NotificationService) {


  }

  ngOnInit(): void {

    this.notificationService.getNotifications().subscribe((result)=>{
      console.log(result);
      this.notifications = result;
    });

  }

  deleteNotification(notification) {
    this.notificationService.deleteNotification(notification);


  }




}
