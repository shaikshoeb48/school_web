import { NgZone } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire';

export function AngularFireStorageSchWebProject(platformId: Object, zone: NgZone) {

    return new AngularFireStorage(FIREBASE_OPTIONS, 'schweb-ea667', 'schweb-ea667.appspot.com', platformId, zone);
}


export function AngularFireDatabaseSchWebProject(platformId: Object, zone: NgZone) {

    return new AngularFireDatabase(FIREBASE_OPTIONS, 'schweb-ea667', 'https://schweb-ea667.firebaseio.com', platformId, zone);
}

export function AngularFireDatabaseSchAdminProject(platformId: Object, zone: NgZone) {

    return new AngularFireDatabase(FIREBASE_OPTIONS, 'sch-admin', 'https://sch-admin.firebaseio.com', platformId, zone);
}
