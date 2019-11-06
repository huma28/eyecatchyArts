import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Routes, Router,RouterModule } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/share';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ShoppingCartService {
  constructor(private firebase: AngularFireDatabase, private _firebaseAuth: AngularFireAuth,) {
  }

  public subjectValue = new Subject<any>();
  addCart=0;
  productList=JSON.parse(localStorage.getItem('addedCart')) || [] ;
  addedList: any;
  orders: any;
  allDetail:any;
   //set Subject For cart
  // setSubjectForCart(item){
  //   this.addCart++;
  //   this.productList = JSON.parse(localStorage.getItem('addedCart')) || [];
  //   this.productList.push(item);
  //   console.log('set subject', this.addCart);
  //   localStorage.setItem('addedCart', JSON.stringify(this.productList));
  //   this.subjectValue.next({value: this.productList.length, list:this.productList});
  // } 

  getSubjectForCart(): Observable<any> {
    return this.subjectValue.asObservable();
  }

  getProductList() {
    this.addedList = localStorage.getItem('addedCart');
    let uid = this._firebaseAuth.auth.currentUser.uid;
    this.orders = this.firebase.list(`allUsers/${uid}/orders`);
    return this.orders
  }

  removeItem(index) {
    let uid = this._firebaseAuth.auth.currentUser.uid;
    this.allDetail = this.firebase.list(`allUsers/${uid}/orders`);

    this.allDetail.snapshotChanges().subscribe(item => {
      let itemKey = item[index].key;
      let deleteItem = this.firebase.object(`allUsers/${uid}/orders/` + itemKey);
      console.log('delete item', deleteItem);
      deleteItem.remove();
      this.allDetail.off();
      }); 

    this.addCart--;
    // localStorage.setItem('addedCart', JSON.stringify(this.productList));
    // this.subjectValue.next({value: this.productList.length, list:this.productList});    //temporary comment
  }

  removeAllItem() {
    localStorage.removeItem('addedCart');
    this.productList = [];
    this.subjectValue.next({value: this.productList.length, list:this.productList});
  }

  async setUserDetail(data){
    let uid = this._firebaseAuth.auth.currentUser.uid;
    this.allDetail = this.firebase.list(`allUsers/${uid}/orders`);
    this.allDetail.push(data);
    this.allDetail.valueChanges().subscribe(item => {
    this.subjectValue.next({value: this.allDetail.length, list:this.allDetail});
    });  
  
    // this.userData.next({ name: this.userDetails.displayName,  email: this.userDetails.email, });
  }

}