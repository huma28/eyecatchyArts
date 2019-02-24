import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-contect-us',
  templateUrl: './contect-us.component.html',
  styleUrls: ['./contect-us.component.scss']
})
export class ContectUsComponent implements OnInit {
  contactUsList: AngularFireList<any>;
  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
    this.getContactusList();
  }
  
  getContactusList() {
    this.contactUsList = this.db.list('contactUsList');
    return this.contactUsList;
  }
  onSubmit(data) {
    // this.paintingForm.paintingName = this.paintingData.name;
    const date = new Date();
    // this.paintingForm.dateMsg = date.toString();
    this.contactUsList.push(
      {name: "huma"}
      // this.paintingForm
    ).then((data) =>{
      // this.modalRef.hide();
      // this.openSuccessModal(templateModal);

    });
    // this.formDataSaved = true;
  }

}
