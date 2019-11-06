import { Component, OnInit } from '@angular/core';
import { PictureConfig } from '../../pictureConfig';
import { HostListener} from "@angular/core";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
    
    
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let height = document.getElementById('animateDiv');
   let scroll = window.pageYOffset;
    if (scroll > 500) {
      height.classList.remove('opacityZero');
      height.classList.add('animate');
    }
  }
}
