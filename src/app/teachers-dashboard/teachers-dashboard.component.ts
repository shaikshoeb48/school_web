import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentDashboardService } from '../services/student-dashboard.service';
import { TeacherDashboardService } from '../services/teacher-dashboard.service';
import { class6Subjects, class7Subjects, class8Subjects, class9Subjects, class10Subjects } from '../subject';

@Component({
  selector: 'app-teachers-dashboard',
  templateUrl: './teachers-dashboard.component.html',
  styleUrls: ['./teachers-dashboard.component.css']
})
export class TeachersDashboardComponent implements OnInit {

  notes = [];
  notesForm: FormGroup;
  notesFile: any;
  noteTitle = '';
  noteFile: any;
  resources = [];
  resourcesForm: FormGroup;
  class = '';
  subject = '';
  resourceName = '';
  resourceKey = '';
  isResourceEdit = false;
  isNotesEdit = false;
  noteFileName = '';
  notesKey = '';
  notesSubmitDisabled = false;
  previousFile = false;
  resourceTitle= '';
  subjects = [];
  constructor(private formBuilder: FormBuilder, private teacherDashboardService: TeacherDashboardService) { }

  ngOnInit(): void {
    this.notesForm = this.formBuilder.group({
      noteTitle: ['', Validators.required],
      noteFile: ['', Validators.required]
    });
    this.resourcesForm = this.formBuilder.group({
      resourceName: ['', Validators.required],
      resourceTitle: ['',Validators.required]
    });


  }
  onSelectClassChange($event) {
    this.class = $event.target.value;
    if (this.class == 'class-6') {
      this.subjects = class6Subjects.subjects;
    }
    if (this.class == 'class-7') {
      this.subjects = class7Subjects.subjects;
    }
    if (this.class == 'class-8') {
      this.subjects = class8Subjects.subjects;
    }
    if (this.class == 'class-9') {
      this.subjects = class9Subjects.subjects;
    }
    if (this.class == 'class-10') {
      this.subjects = class10Subjects.subjects;
    }
    this.getResources();
    this.getNotes();
  }

  onSelectSubjectChange($event) {

    this.subject = $event.target.value;
    this.getResources();
    this.getNotes();
  }
  getResources() {
    console.log(this.class);
    console.log(this.subject);
    if (this.class == '#' || this.subject == '#' || this.class == '' || this.subject == '') {

      return;
    }
    this.resources = [];
    this.teacherDashboardService.getResource(this.class, this.subject).subscribe((result) => {
      console.log(result);
      this.resources = result;
    });
  }

  getNotes() {
    if (this.class == '#' || this.subject == '#' || this.class == '' || this.subject == '') {

      return;
    }
    this.teacherDashboardService.getNotesData(this.class, this.subject).subscribe((result) => {
      this.notes = result;
    });
  }

  confirmDelete(note) {
    const isDelete = confirm('Are you sure want to delete it?');

    if (isDelete) {
      console.log(note.fileName);
      this.teacherDashboardService.deleteNotesAndFile(this.class, this.subject, note);
    }
    return;
  }

  setEditParams(note) {

    this.isNotesEdit = true;
    this.noteTitle = note.payload.val().noteTitle;
    this.noteFileName = note.payload.val().fileName;
    this.notesKey = note.key;
    this.previousFile = true;
  }
  cleanResourceInputs() {
    this.resourcesForm.reset();
  }
  cleanNotesInputs() {
    this.notesForm.reset();
  }
  onFormSubmit() {
    this.notesSubmitDisabled = true;
    if (this.class == '#' || this.subject == '#' || this.class == '' || this.subject == '') {
      alert('Please select both class and subject.');
      this.notesSubmitDisabled = false;
      return;
    }

    if (this.isNotesEdit) {
      this.teacherDashboardService.editNotes(this.notesForm.value, this.class, this.subject, this.notesFile,
        this.notesKey, this.noteFileName).then((res) => {
          alert('Notes Edited Successfully');
          this.isNotesEdit = false;
          this.notesForm.reset();
          this.notesSubmitDisabled = false;
          this.previousFile = false;
        });
      return;
    }

    this.teacherDashboardService.uploadDataToAfs(this.notesForm.value, this.class, this.subject, this.notesFile)
    let count = 0;
    this.teacherDashboardService.eventCallback$.subscribe((data) => {
      if (data == 'true') {
        count = count + 1;
      }
      if (count == 1) {
        alert('Data Saved Successfully');
        this.notesSubmitDisabled = false;
        count = 0;

        this.notesForm.reset();
      }

    });
  }
  fileChange(event) {
    this.notesFile = event.target.files[0];
  }
  onResourceFormSubmit() {
    if (this.class == '#' || this.subject == '#' || this.class == '' || this.subject == '') {
      alert('Please select both class and subject.');
      return;
    }

    if (this.isResourceEdit) {
      this.teacherDashboardService.editResource(this.class, this.subject, this.resourcesForm.value, this.resourceKey).then((res) => {
        alert('Resource Edited Successfully');
        this.isResourceEdit = false;
        this.resourcesForm.reset();
      });

      return;
    }

    this.teacherDashboardService.addResource(this.class, this.subject, this.resourcesForm.value).then((result) => {
      alert('Resource Added Successfully');
      this.resourcesForm.reset();
    });

  }

  setResourceEditParams(resource) {
    this.isResourceEdit = true;
    this.resourceName = resource.payload.val().resourceName;
    this.resourceTitle = resource.payload.val().resourceTitle;
    this.resourceKey = resource.key;


  }
  confirmResourceDelete(key) {
    const isDelete = confirm('Are you sure want to delete it?');

    console.log(key);
    if (isDelete) {
      this.teacherDashboardService.deleteResource(this.class, this.subject, key);
    }
    return;
  }
}
