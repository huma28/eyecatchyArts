import { Component, OnInit } from '@angular/core';
import { PictureConfig } from '../../pictureConfig';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  banners: object[];
  constructor() { 
     this.banners = PictureConfig.banners;
  }

  ngOnInit() {
  }

}
