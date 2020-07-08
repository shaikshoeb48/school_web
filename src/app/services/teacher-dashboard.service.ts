import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import {  } from '../subject';

@Injectable({
  providedIn: 'root'
})
export class TeacherDashboardService {

  fileupload = false;

  private eventCallback = new Subject<string>();
  eventCallback$ = this.eventCallback.asObservable();

  // constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  constructor(@Inject('firebaseProject1') private db: AngularFireDatabase,
    @Inject('firebaseStorageProject1') private storage: AngularFireStorage) { }



  addResource(className, subject, resource) {
    const date = Date.now();
    console.log(date);
    const itemRef = this.db.object('classes' + '/' + className + '/' + subject + '/resources/' + date);
    return itemRef.update(resource);
  }

  getResource(className, subjectName): Observable<any> {
    //console.log(className);
    return this.db.list('classes/' + className + '/' + subjectName + '/resources').snapshotChanges();

  }
  editResource(className, subject, resource, key) {
    const itemRef = this.db.object('classes' + '/' + className + '/' + subject + '/resources/' + key);
    return itemRef.update(resource);
  }
  deleteResource(className, subject, key) {
    return this.db.object('classes' + '/' + className + '/' + subject + '/resources/' + key).remove();
  }

  uploadDataToAfs(value, className, subject, file) {

    console.log(file);
    // console.log(value);
    // const userRef = this.db.object('classes/' + className + '/' + subject+'/'+'notes');
    console.log(value.noteTitle)
    const date = Date.now();
    value.fileName = date + '-' + file.name;

    // value.fileName = value.fileName.split(' ').join('_');
    // console.log(date);
    const itemRef = this.db.object('classes' + '/' + className + '/' + subject + '/' + 'notes' + '/' + date);
    return itemRef.update(value).then((result) => {
      const success = this.uploadNoteFile(file, date);
      console.log('success', success);
      return success;

    });


  }

  uploadNoteFile(file, date) {
    // upload profile picture

    try {
      const fileName = file.name;
      const localpath1 = date + '-' + fileName;
      // localpath1 = localpath1.split(' ').join('_');
      // console.log(localpath1);
      const ref1 = this.storage.ref(localpath1);
      const task1 = ref1.put(file);
      task1.then(result => {
        console.log(result);
        this.fileupload = true;
        this.eventCallback.next(this.fileupload + '');
      });
      task1.catch(error => {
        console.log('file error', error);
        return false;
      });

      // return true;

    } catch (error) {
      console.log('parent error', error);
      return false;
    }
    return true;
  }

  getNotesData(className, subjectName) {
    return this.db.list('classes/' + className + '/' + subjectName + '/notes').snapshotChanges();

  }
  editNotes(value, className, subject, file, notesKey, oldFileName) {
    // console.log(file);
    const date = notesKey;
    value.fileName = date + '-' + file.name;

    const itemRef = this.db.object('classes' + '/' + className + '/' + subject + '/' + 'notes' + '/' + date);
    return itemRef.update(value).then(async (result) => {
      await this.deleteUploadedFile(oldFileName);
      console.log('deleted');
      const success = await this.uploadNoteFile(file, date);
      console.log('success', success);
      return success;

    });

  }
  async deleteUploadedFile(oldFileName) {
    await this.storage.storage.ref(oldFileName).delete();
  }

  deleteNotesAndFile(className, subject, note) {
    return this.db.object('classes' + '/' + className + '/' + subject + '/notes/' + note.key).remove().then((res) => {
      console.log('filename', note.payload.val().fileName);
      const filename = note.payload.val().fileName;
      this.deleteUploadedFile(filename);
    });

  }
}
