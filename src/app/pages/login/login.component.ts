import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ItemDetail } from 'modals/itemDetail';
import * as _ from 'lodash';
import { FirebaseService } from '../../app.firebase.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ShoppingCartService } from 'services/shoppingCart.service';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

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
    // paitingsList: Observable<any>;
    constructor(
      private route: ActivatedRoute,
      private firebaseService:FirebaseService,
      public shoppingCartService: ShoppingCartService,
      private router: Router) { }
  
    ngOnInit() {
      
    }
    tryRegister(){
      this.firebaseService.doRegister()
      .then(res => {
        // console.log('res--------', res);
        // this.errorMessage = "";
        // this.successMessage = "Your account has been created";
      }, err => {
        console.log('err---------', err);
        // this.errorMessage = err.message;
        // this.successMessage = "";
      })
    }
  
    signInWithGoogle() {
      this.firebaseService.signInWithGoogle()
      .then((res) => {
          this.router.navigate(['home'])
        })
      .catch((err) => console.log(err));
    }

    logout() {
      this.firebaseService.logout();
    }

}
