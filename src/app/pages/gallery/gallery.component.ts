import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../app.firebase.service';

import { PictureConfig } from '../../pictureConfig';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  paitingsList = [];
  showPaintingList = [];
  
  constructor(private router: Router,
              private firebaseService:FirebaseService) {}

  ngOnInit() {
    // call function of get all list of painting request form here
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
    this.showPaintingList = this.paitingsList;
  }

  clickOnItem(id) {
    this.router.navigate(['detail', id]);
  }

  tabClicked(type) {
    switch(type){
      case 1:
      this.showPaintingList = this.paitingsList.filter((item) => item.type == 1 );
      return;
      case 2:
      this.showPaintingList = this.paitingsList.filter((item) => item.type == 2 )
      return;
      case 3:
      this.showPaintingList = this.paitingsList.filter((item) => item.type == 3 )
      return;
      case 4:
      this.showPaintingList = this.paitingsList.filter((item) => item.type == 4 )
      return;
      case 5:
      this.showPaintingList = this.paitingsList.filter((item) => item.type == 5 )
      return;
      default:
      this.showPaintingList = this.paitingsList;
    }
  }

}
