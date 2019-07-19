import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FirebaseService } from '../../app.firebase.service';

import { PictureConfig } from '../../pictureConfig';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  // modalRef: BsModalRef;
  multiSlider: object[];
  url: any;
  paintingData: any;
  formDataSaved = false;
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

  listingData: any;
  page: number = 1;
  paitingsList = [];
  paitingDetail = [];
  
  constructor(private modalService: BsModalService,
              public db: AngularFireDatabase,
              private router: Router,
              private firebaseService:FirebaseService) {
                  this.multiSlider = PictureConfig.multiSlider;
  }
  // openModalImg(template: TemplateRef<any>, url) {
  //   this.url = url;
  //   // this.modalRef = this.modalService.show(template);
  // }
  // openModalBuy(template: TemplateRef<any>, data ) {
  //   this.paintingForm = {
  //     name: '',
  //     email: '',
  //     phone: '',
  //     address: '',
  //     message: '',
  //     paintingName: '',
  //     dateMsg: '',
  //   }
  //   this.formDataSaved = false;
  //   this.paintingData = data;
  //   // this.modalRef = this.modalService.show(template);
  // }
  // openSuccessModal(template) {
  //   // this.modalRef = this.modalService.show(template);
  // }

  ngOnInit() {
    // call function of get all list of painting request form here
    this.getPaintingRequestList();
    this.getAllPaintings();
  }
  getAllPaintings() {
    var x = this.firebaseService.getBanner();
    x.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.paitingsList.push(y);
      })
    })
  }

  getPaintingRequestList() {
    this.paintingRequestList = this.db.list('paintingRequestList');
    // console.log('painting list---------', this.paintingRequestList);
    return this.paintingRequestList;
  }

  onSubmit(data, templateForm, templateModal: TemplateRef<any>) {
    this.paintingForm.paintingName = this.paintingData.name;
    const date = new Date();
    this.paintingForm.dateMsg = date.toString();
    this.paintingRequestList.push(
      this.paintingForm
    ).then((data) => {
      // this.modalRef.hide();
      // this.openSuccessModal(templateModal);
    });
    this.formDataSaved = true;
  }

  clickOnItem(id) {
    this.router.navigate(['detail', id]);
  }

}
