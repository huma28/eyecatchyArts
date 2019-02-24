import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from 'lodash';
import * as firebase from 'firebase';
import { Router, NavigationEnd } from '@angular/router';

interface photos {
  url?: string;
  name?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data: any;
  // public photoStream: firebaseObjectObservable<photos>
  photoStream: any;
  constructor(public db: AngularFireDatabase, private router: Router) {
    // this.data = this.db.list('/banners');
    // db.collection("cities");
    // this.photoStream = this.db.list('/images');

  }
  ngOnInit() {
    console.log("now----");
    this.db.list('/banners').valueChanges().subscribe(data => {
      console.log("data-", data);
    });
    this.data = this.db.list('/banners').valueChanges();
    // const ref = firebase.database().ref('banners/images');
    console.log("refff", this.data);

    // ref.on("value", function(snapshot) {
    //   console.log(snapshot.val());
    // }, function (errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });



    // console.log("init", storageRef.child('/banners/images'));
    // this.db.list('/banners/images').valueChanges().subscribe(data => {
    //   console.log("data-", data);
    // })
    // this.data = this.db.list('/banners/images/images');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });

  }

  title = 'app';
  // ngAfterViewChecked() {
  //   window.scrollTo(0, 150);
  // }
}
