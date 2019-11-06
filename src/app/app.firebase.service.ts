import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import * as firebase from 'firebase';

import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'; 
// import {FileUpload} from './models/fileupload';
// @Injectable()
 
@Injectable()
export class FirebaseService {
    list: AngularFireList<any>;
    detail: AngularFireList<any>;
    allDetail: AngularFireList<any>;
    allOrders = [];
private user: Observable<firebase.User>;
private userDetails: firebase.User = null;
public userData = new Subject<any>();
  constructor(private firebase: AngularFireDatabase, private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log('subscribe user in auth service', this.userDetails);
          this.userData.next({ name: this.userDetails.displayName,  email: this.userDetails.email, });
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  isLoggedIn() {
    if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }

  async setUserDetail(data){
    let uid = this._firebaseAuth.auth.currentUser.uid;
    this.allDetail = this.firebase.list(`allUsers/${uid}/orders`);
    this.allDetail.push(data);
  
    // this.userData.next({ name: this.userDetails.displayName,  email: this.userDetails.email, });
  }

  getUserDataObservable(): Observable<any> {
    return this.userData.asObservable();
  }
  getUserData() {
    return this.userDetails;
  }

  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }

  getBanner() {
    this.list = this.firebase.list('paintingList');
    return this.list;
  }

  paintingDetail(id) {
    this.detail = this.firebase.list(`paintingList/${id}`);
    return this.detail;
  }

  doRegister(){
    let tempValue = { email: 'humasadiya@gmail.com',
                  password: 'hrhk'}
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(tempValue.email, tempValue.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }


}