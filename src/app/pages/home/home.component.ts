import { Component, OnInit } from '@angular/core';
import { PictureConfig } from '../../pictureConfig';
import { HostListener} from "@angular/core";
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
  @HostListener("window:scroll", [])
  onWindowScroll() {
  //we'll do some stuff here when the window is scrolled

  let height = document.getElementById('animateDiv');
  // console.log('height------', height.offsetHeight, height.offsetTop, window.pageYOffset);
  let scroll = window.pageYOffset;
    if (scroll > 500) {
      height.classList.remove('opacityZero');
      height.classList.add('animate');
    }
  }
}
