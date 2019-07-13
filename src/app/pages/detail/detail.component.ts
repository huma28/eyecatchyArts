import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ItemDetail } from 'modals/itemDetail';
import * as _ from 'lodash';
import { FirebaseService } from '../../app.firebase.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ShoppingCartService } from 'services/shoppingCart.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    response: any;
    detailData: any;
    selectedOptions = [];
    more: boolean = false;
    count: number = 0;
    paitingsList = {};
    // paitingsList: Observable<any>;
    constructor(
      private route: ActivatedRoute,
      private firebaseService:FirebaseService,
      public shoppingCartService: ShoppingCartService) { }
  
    ngOnInit() {
      // this.shoppingCartService.setSubjectForCart();
      this.route.params.subscribe((params) => {
        console.log("param", params, params.id)
        this.getDetail(params.id);
      });

   
    }
  
    imgSliderFun() {
      this.galleryOptions = [
        {
          width: '100%',
          height: '600px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
        },
        // max-width 800
        {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
        },
        // max-width 400
        {
          breakpoint: 400,
          preview: false
        }
      ];
      this.galleryImages = [];
    }
  
    galleryImage(images) {
      let galleryImgArray = [];
  
      _.forEach(images.images, (data) => {
        galleryImgArray.push({
          small: data,
          medium: data,
          big: data
        });
      });
      this.galleryImages = galleryImgArray;
      console.log('images-----------', this.galleryImages);
    }
  
    getDetail(id) {
     let x = this.firebaseService.paintingDetail();
      x.snapshotChanges().subscribe(item => {
        for(let ele in item) {
          let i = item[ele].payload.toJSON();
          let key = item[ele].key;
          this.paitingsList[key] = i;
          // this.paitingsList.push({[key]: i});
          console.log('finalllllll--', this.paitingsList);
          // let images = this.paitingsList;
          this.galleryImage( this.paitingsList) ;
        }
      })
      this.imgSliderFun();
   
    }

    addToCart() {
      console.log('add to cart----');
      let item = {name: 'painting name'};
      this.shoppingCartService.setSubjectForCart(item);
      // let xyz ={name: "huma"};
      // this.shoppingCartService.setSubjectForHeader(xyz);
    }
}
