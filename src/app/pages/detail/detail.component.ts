import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ItemDetail } from 'modals/itemDetail';
import * as _ from 'lodash';
import { FirebaseService } from '../../app.firebase.service';
import { ShoppingCartService } from 'services/shoppingCart.service';
import {Observable} from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';

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
    count: number = 1;
    showAnimation: boolean =  false;
    alreadyAddedInCart: boolean = false;
    paitingDetail = { name : '',
                      description: '',
                      prize: '',
                      size: '',
                      };
    constructor(
      private route: ActivatedRoute,
      private firebaseService:FirebaseService,
      public shoppingCartService: ShoppingCartService,
      private router: Router) { }
  
    ngOnInit() {
      // this.shoppingCartService.setSubjectForCart();
      this.route.params.subscribe((params) => {
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
  
    galleryImage(detail) {
      let galleryImgArray = [];
      let images = detail.images || ['assets/images/other/Not_available_icon.jpg', 'assets/images/other/Not_available_icon.jpg']
      _.forEach(images, (data) => {
        galleryImgArray.push({
          small: data,
          medium: data,
          big: data
        });
      });
      this.galleryImages = galleryImgArray;
    }
  
    getDetail(id) {
     let x = this.firebaseService.paintingDetail(id);
     let obj = {};
      x.snapshotChanges().subscribe(item => {
        for(let ele in item) {
          let i = item[ele].payload.toJSON();
          let key = item[ele].key;
          this.paitingDetail[key] = i;
          this.galleryImage( this.paitingDetail) ;
        }
        this.checkInCart();
      })
      this.imgSliderFun();
    }

    checkInCart() {
      let list = this.shoppingCartService.getProductList();
     
      list.valueChanges().subscribe(item => {
        let obj = item.find(data => data.name === this.paitingDetail.name);
        if (obj) {
          this.alreadyAddedInCart = true;
        }
        else {
          this.alreadyAddedInCart = false;
        }
        });
    }

    addToCart() {

      if  ( this.firebaseService.isLoggedIn() ) {
        this.showAnimation = true;
        // this.shoppingCartService.setSubjectForCart(this.paitingDetail);
        this.shoppingCartService.setUserDetail(this.paitingDetail);
        this.checkInCart();
      }
      else {
        this.router.navigate(['login']);
      }
    }
}
