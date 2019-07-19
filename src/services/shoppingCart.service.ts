import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Routes, Router,RouterModule } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/share';
@Injectable()
export class ShoppingCartService {
  constructor() {
  }

  public subjectValue = new Subject<any>();
  addCart=0;
  productList=JSON.parse(localStorage.getItem('addedCart'));
  addedList: any;
   //set Subject For cart
  setSubjectForCart(item){
    this.addCart++;
    this.productList = JSON.parse(localStorage.getItem('addedCart'));
    this.productList.push(item);
    console.log('set subject', this.addCart);
    localStorage.setItem('addedCart', JSON.stringify(this.productList));
    this.subjectValue.next({value: this.productList.length, list:this.productList});
  } 

  getSubjectForCart(): Observable<any> {
    return this.subjectValue.asObservable();
  }

  getProductList() {
    this.addedList = localStorage.getItem('addedCart');
    return JSON.parse(this.addedList);
  }

  removeItem(index) {
    console.log('remove--------------', index);
    this.productList.splice(index, 1);
    this.addCart--;
    localStorage.setItem('addedCart', JSON.stringify(this.productList));
    this.subjectValue.next({value: this.productList.length, list:this.productList});
  }

}