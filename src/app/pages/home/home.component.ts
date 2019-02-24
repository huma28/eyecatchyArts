import { Component, OnInit } from '@angular/core';
import { PictureConfig } from '../../pictureConfig';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  multiSlider: object[];

  constructor() { 
    this.multiSlider = PictureConfig.multiSlider;
  }

  ngOnInit() {
  }

}
