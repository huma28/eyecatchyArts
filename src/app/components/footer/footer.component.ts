import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AppConfig } from '../../app.config';
import { FormSubmitService } from 'services/formSubmit.service';
import { ToasterService } from 'services/toaster.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footer: any = AppConfig.MENUS;
  constructor( @Inject(DOCUMENT) private document: any,  public db: AngularFireDatabase, public formSubmitService: FormSubmitService, private toasterService: ToasterService) { 
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
      let body = {
        name: this.paintingForm.name,
        email: this.paintingForm.email,
        subject: "Your contect request to eyecatchyArts",
        text: 'We received your request and will contact you soon.'
      }
     let  email = this.formSubmitService.sendMail(body);
     console.log('mail Send----, email');
     
     email.subscribe((data) => {
        console.log('response-------email', data);
        this.toasterService.showSuccess('Your request successfully submitted');},
     (error) => {
      console.log('error-------email', error);
      this.toasterService.showError('Something went wrong');
     }
    );
    });
  }
}
