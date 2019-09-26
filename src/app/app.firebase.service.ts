import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import * as firebase from 'firebase';

import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
// import {FileUpload} from './models/fileupload';
// @Injectable()
 
@Injectable()
export class FirebaseService {
    list: AngularFireList<any>;
    detail: AngularFireList<any>;
    
private user: Observable<firebase.User>;
private userDetails: firebase.User = null;
  constructor(private firebase: AngularFireDatabase, private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log('subscribe user in auth service', this.userDetails);
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
  setUserDetail(){
    console.log("current user--------", this._firebaseAuth.auth.currentUser, "----uid", this._firebaseAuth.auth.currentUser.uid, "database-----",  );
    console.log(this.userDetails.displayName, this.userDetails.email, this.userDetails.photoURL);
    let uid = this._firebaseAuth.auth.currentUser.uid;
    let ref2 = this.firebase.database.ref('allUsers');
    let order = [1, 2, 3];
    ref2.child(uid).set({
      name: this.userDetails.displayName || 'Friend',
      email: this.userDetails.email,
      photo: this.userDetails.photoURL,
      orders: order,
      history: [4, 5]
    });
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
    console.log('huma---', this.detail);
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