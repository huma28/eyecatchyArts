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
  productList=[];
   //set Subject For cart
  setSubjectForCart(item){
    this.addCart++;
    this.productList.push(item);
    console.log('set subject', this.addCart);
    this.subjectValue.next({value: this.addCart, list:this.productList});
  } 

  getSubjectForCart(): Observable<any> {
    return this.subjectValue.asObservable();
  }

  getProductList() {
    return this.productList;
  }
}