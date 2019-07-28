import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footer: any = AppConfig.MENUS;
  constructor( @Inject(DOCUMENT) private document: any,  public db: AngularFireDatabase,) { 
  }
  paintingData: any;
  paintingForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
    dateMsg: '',
  }
  contactRequestList: AngularFireList<any>;

  ngOnInit() {
    this.getContactRequestList();
  }
  
  getContactRequestList() {
    this.contactRequestList = this.db.list('contactUsList');
    return this.contactRequestList;
  }
  goTo(url) {
    window.open(url);
  }
  onSubmit() {
    const date = new Date();
    this.paintingForm.dateMsg = date.toString();
    this.contactRequestList.push(
      this.paintingForm
    ).then((data) =>{
      console.log('successfull');
    });
  }
}
