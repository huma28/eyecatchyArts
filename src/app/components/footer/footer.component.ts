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
    address: '',
    message: '',
    paintingName: '',
    dateMsg: '',
  }
  paintingRequestList: AngularFireList<any>;

  ngOnInit() {
    this.getPaintingRequestList();
  }
  
  getPaintingRequestList() {
    this.paintingRequestList = this.db.list('paintingRequestList');
    // console.log('painting list---------', this.paintingRequestList);
    return this.paintingRequestList;
  }
  goTo(url) {
    window.open(url);
    // this.document.location.href = url;
  }
  onSubmit() {
    // this.paintingForm.paintingName = this.paintingData.name;
    const date = new Date();
    this.paintingForm.dateMsg = date.toString();

    console.log('submit---', this.paintingForm );
    this.paintingRequestList.push(
      this.paintingForm
    ).then((data) =>{
      console.log('successfull');
      // this.modalRef.hide();
      // this.openSuccessModal(templateModal);

    });
    // this.formDataSaved = true;
  }
}
