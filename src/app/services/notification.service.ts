import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

//  constructor(private db: AngularFireDatabase) { }

  constructor(@Inject('firebaseProject1') private db: AngularFireDatabase) { }


  deleteNotification(notification){
    this.db.object('notifications/' + notification.key).remove();

  }

  getNotifications(){
    return this.db.list('notifications').snapshotChanges();
  }

}
